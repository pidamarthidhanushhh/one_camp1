import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import * as oidc from "openid-client";
import { getDatabasePool } from "./db.mjs";

const sessionCookieName = "campus_session";
const transactionCookieName = "campus_oidc_transaction";
const transactionMaxAgeSeconds = 600;
const defaultSessionSeconds = 8 * 60 * 60;
let configurationPromise;

export function isOidcEnabled() {
  return Boolean(process.env.OIDC_ISSUER);
}

function requiredSetting(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for OIDC sign-in.`);
  return value;
}

function settings() {
  const issuer = new URL(requiredSetting("OIDC_ISSUER"));
  const redirectUri = getOidcRedirectUri();
  const clientId = requiredSetting("OIDC_CLIENT_ID");
  const clientSecret = requiredSetting("OIDC_CLIENT_SECRET");
  const sessionSecret = requiredSetting("SESSION_SECRET");
  const organizationId = requiredSetting("CAMPUS_ORGANIZATION_ID");
  const organizationName = requiredSetting("CAMPUS_ORGANIZATION_NAME");
  const configuredSessionSeconds = Number(process.env.SESSION_TTL_SECONDS || defaultSessionSeconds);
  if (!Number.isInteger(configuredSessionSeconds) || configuredSessionSeconds < 300) {
    throw new Error("SESSION_TTL_SECONDS must be an integer of at least 300.");
  }
  const allowedDomains = requiredSetting("OIDC_ALLOWED_EMAIL_DOMAINS")
    .split(",").map((domain) => domain.trim().toLowerCase().replace(/^@/, "")).filter(Boolean);
  if (Buffer.byteLength(sessionSecret) < 32) throw new Error("SESSION_SECRET must contain at least 32 bytes.");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(organizationId)) {
    throw new Error("CAMPUS_ORGANIZATION_ID must be a UUID.");
  }
  if (allowedDomains.length === 0) throw new Error("Configure at least one OIDC_ALLOWED_EMAIL_DOMAINS entry.");
  if (issuer.protocol !== "https:" || redirectUri.protocol !== "https:") {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "production" || issuer.hostname !== "localhost" || redirectUri.hostname !== "localhost") {
      throw new Error("OIDC issuer and redirect URI must use HTTPS (localhost is allowed outside production).");
    }
  }
  return {
    issuer,
    redirectUri,
    clientId,
    clientSecret,
    sessionSecret,
    organizationId,
    organizationName,
    allowedDomains,
    sessionSeconds: Math.min(configuredSessionSeconds, 30 * 24 * 60 * 60),
  };
}

export function getOidcRedirectUri() {
  const configured = process.env.OIDC_REDIRECT_URI?.trim();
  if (configured) return new URL(configured);
  if (process.env.RENDER_EXTERNAL_URL) {
    return new URL("/auth/callback", process.env.RENDER_EXTERNAL_URL);
  }
  throw new Error("OIDC_REDIRECT_URI is required when the host does not provide RENDER_EXTERNAL_URL.");
}

function getConfiguration(config) {
  configurationPromise ??= oidc.discovery(config.issuer, config.clientId, config.clientSecret);
  return configurationPromise;
}

function encryptionKey(secret) {
  return createHash("sha256").update(secret).digest();
}

function seal(value, secret) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(secret), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

function unseal(value, secret) {
  const packed = Buffer.from(value, "base64url");
  if (packed.length < 29) throw new Error("Invalid OIDC transaction cookie.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(secret), packed.subarray(0, 12));
  decipher.setAuthTag(packed.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(packed.subarray(28)), decipher.final()]).toString("utf8"));
}

export function readCookie(request, name) {
  for (const part of (request.headers.cookie || "").split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0 || part.slice(0, separator).trim() !== name) continue;
    try { return decodeURIComponent(part.slice(separator + 1).trim()); } catch { return null; }
  }
  return null;
}

function cookieOptions(config) {
  const secure = process.env.NODE_ENV === "production" || config.redirectUri.protocol === "https:";
  return `Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function clearOidcTransactionCookie(config) {
  return `${transactionCookieName}=; ${cookieOptions(config)}; Max-Age=0`;
}

export function clearSessionCookie(config) {
  return `${sessionCookieName}=; ${cookieOptions(config)}; Max-Age=0`;
}

export async function beginOidcLogin() {
  const config = settings();
  const provider = await getConfiguration(config);
  const codeVerifier = oidc.randomPKCECodeVerifier();
  const codeChallenge = await oidc.calculatePKCECodeChallenge(codeVerifier);
  const state = oidc.randomState();
  const nonce = oidc.randomNonce();
  const authorizationUrl = oidc.buildAuthorizationUrl(provider, {
    redirect_uri: config.redirectUri.href,
    response_type: "code",
    scope: "openid email profile",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state,
    nonce,
  });
  const transactionCookie = `${transactionCookieName}=${encodeURIComponent(seal({ codeVerifier, state, nonce }, config.sessionSecret))}; ${cookieOptions(config)}; Max-Age=${transactionMaxAgeSeconds}`;
  return { authorizationUrl: authorizationUrl.href, transactionCookie };
}

function roleForEmail(email) {
  const normalized = email.toLowerCase();
  const admins = (process.env.CAMPUS_ADMIN_EMAILS || "").split(",").map((value) => value.trim().toLowerCase());
  const faculty = (process.env.CAMPUS_FACULTY_EMAILS || "").split(",").map((value) => value.trim().toLowerCase());
  if (admins.includes(normalized)) return "admin";
  if (faculty.includes(normalized)) return "faculty";
  return "student";
}

export async function completeOidcLogin(callbackUrl, transactionValue) {
  const config = settings();
  if (!transactionValue) throw new Error("The sign-in transaction expired. Please try again.");
  const transaction = unseal(transactionValue, config.sessionSecret);
  const provider = await getConfiguration(config);
  const currentUrl = new URL(config.redirectUri.href);
  currentUrl.search = callbackUrl.search;
  const tokens = await oidc.authorizationCodeGrant(provider, currentUrl, {
    pkceCodeVerifier: transaction.codeVerifier,
    expectedState: transaction.state,
    expectedNonce: transaction.nonce,
    idTokenExpected: true,
  });
  const claims = tokens.claims();
  if (!claims?.sub || typeof claims.email !== "string" || claims.email_verified !== true) {
    throw new Error("The identity provider did not return a verified email address.");
  }
  const email = claims.email.trim().toLowerCase();
  const domain = email.split("@").at(-1);
  if (!domain || !config.allowedDomains.includes(domain)) {
    throw new Error("This account is not allowed to access this Campus organization.");
  }

  const pool = getDatabasePool();
  const client = await pool.connect();
  const sessionToken = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(sessionToken).digest("hex");
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO organizations (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
      [config.organizationId, config.organizationName],
    );
    const userResult = await client.query(
      `INSERT INTO users (identity_issuer, identity_subject, email, display_name)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (identity_issuer, identity_subject)
       DO UPDATE SET email = EXCLUDED.email, display_name = EXCLUDED.display_name
       RETURNING id`,
      [config.issuer.href.replace(/\/$/, ""), claims.sub, email, String(claims.name || email).slice(0, 200)],
    );
    const userId = userResult.rows[0].id;
    await client.query(
      `INSERT INTO organization_memberships (organization_id, user_id, role)
       VALUES ($1, $2, $3) ON CONFLICT (organization_id, user_id) DO NOTHING`,
      [config.organizationId, userId, roleForEmail(email)],
    );
    const membership = await client.query(
      `SELECT u.id, u.email, u.display_name, m.role
       FROM users u JOIN organization_memberships m ON m.user_id = u.id
       WHERE u.id = $1 AND m.organization_id = $2`,
      [userId, config.organizationId],
    );
    if (!membership.rowCount) throw new Error("No Campus membership could be created for this account.");
    await client.query(
      "INSERT INTO auth_sessions (token_hash, user_id, organization_id, expires_at) VALUES ($1, $2, $3, now() + ($4::int * interval '1 second'))",
      [tokenHash, userId, config.organizationId, config.sessionSeconds],
    );
    await client.query("COMMIT");
    return { token: sessionToken, session: membership.rows[0], maxAge: config.sessionSeconds, cookie: cookieOptions(config) };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function getAuthenticatedSession(request) {
  const config = settings();
  const token = readCookie(request, sessionCookieName);
  if (!token) return null;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const result = await getDatabasePool().query(
    `SELECT u.id, u.email, u.display_name, m.role, s.organization_id, o.name AS organization_name
     FROM auth_sessions s
     JOIN users u ON u.id = s.user_id
     JOIN organizations o ON o.id = s.organization_id
     JOIN organization_memberships m ON m.user_id = u.id AND m.organization_id = s.organization_id
     WHERE s.token_hash = $1 AND s.expires_at > now() AND s.organization_id = $2`,
    [tokenHash, config.organizationId],
  );
  if (!result.rowCount) return null;
  await getDatabasePool().query("UPDATE auth_sessions SET last_seen_at = now() WHERE token_hash = $1", [tokenHash]);
  return result.rows[0];
}

export async function endAuthenticatedSession(request) {
  const token = readCookie(request, sessionCookieName);
  if (!token) return;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  await getDatabasePool().query("DELETE FROM auth_sessions WHERE token_hash = $1", [tokenHash]);
}

export function sessionCookie(token, maxAge, cookieAttributes) {
  return `${sessionCookieName}=${encodeURIComponent(token)}; ${cookieAttributes}; Max-Age=${maxAge}`;
}
