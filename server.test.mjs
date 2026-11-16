import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { assertProductionConfiguration, createServer } from "./server.mjs";

const server = createServer();
let baseUrl;

before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test("serves the app from the same origin as the analysis API", async () => {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Share a resource/);
});

test("refuses production startup when required OIDC or database settings are missing or placeholders", () => {
  assert.doesNotThrow(() => assertProductionConfiguration({ NODE_ENV: "development" }));
  assert.throws(
    () => assertProductionConfiguration({ NODE_ENV: "production" }),
    /OIDC_ISSUER.*DATABASE_URL/,
  );
  const productionEnvironment = {
    NODE_ENV: "production",
    OIDC_ISSUER: "https://identity.example.edu",
    OIDC_CLIENT_ID: "replace-with-client-id",
    OIDC_CLIENT_SECRET: "replace-with-client-secret",
    OIDC_REDIRECT_URI: "http://localhost:3000/auth/callback",
    OIDC_ALLOWED_EMAIL_DOMAINS: "matrusri.edu.in",
    SESSION_SECRET: "replace-with-at-least-32-random-bytes",
    CAMPUS_ORGANIZATION_ID: "00000000-0000-4000-8000-000000000001",
    CAMPUS_ORGANIZATION_NAME: "Matrusri Engineering College",
    DATABASE_URL: "postgresql://campus:replace-me@localhost:5432/campus",
    DATABASE_SSL: "false",
    GEMINI_API_KEY: "replace-with-a-server-side-Gemini-key",
  };
  assert.throws(() => assertProductionConfiguration(productionEnvironment), /placeholder or invalid/);
  Object.assign(productionEnvironment, {
    OIDC_ISSUER: "https://login.matrusri.edu.in",
    OIDC_CLIENT_ID: "campus-production-client",
    OIDC_CLIENT_SECRET: "production-client-secret-from-a-secret-manager",
    OIDC_REDIRECT_URI: "https://campus.matrusri.edu.in/auth/callback",
    SESSION_SECRET: "s".repeat(48),
    CAMPUS_ORGANIZATION_ID: "68b0047b-56b4-4d99-ae84-aaece956a30a",
    DATABASE_URL: "postgresql://campus:secret@db.matrusri.edu.in:5432/campus",
    DATABASE_SSL: "true",
  });
  delete productionEnvironment.GEMINI_API_KEY;
  assert.doesNotThrow(() => assertProductionConfiguration(productionEnvironment));

  const initialDeployment = { ...productionEnvironment, OIDC_SETUP_PENDING: "true", RENDER_EXTERNAL_URL: "https://campus-pilot.onrender.com" };
  delete initialDeployment.OIDC_CLIENT_ID;
  delete initialDeployment.OIDC_CLIENT_SECRET;
  delete initialDeployment.OIDC_REDIRECT_URI;
  assert.doesNotThrow(() => assertProductionConfiguration(initialDeployment));
  initialDeployment.OIDC_SETUP_PENDING = "false";
  assert.throws(() => assertProductionConfiguration(initialDeployment), /OIDC_CLIENT_ID.*OIDC_CLIENT_SECRET/);
});

test("shows a setup message instead of a dead sign-in button while OIDC is pending", async () => {
  const previousIssuer = process.env.OIDC_ISSUER;
  const previousPending = process.env.OIDC_SETUP_PENDING;
  try {
    process.env.OIDC_ISSUER = "https://accounts.google.com";
    process.env.OIDC_SETUP_PENDING = "true";
    const response = await fetch(`${baseUrl}/`);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /Secure campus sign-in is being configured/);
    assert.doesNotMatch(html, /id="oidc-login"/);
    assert.doesNotMatch(html, /CampusStudent2026!/);
  } finally {
    if (previousIssuer === undefined) delete process.env.OIDC_ISSUER;
    else process.env.OIDC_ISSUER = previousIssuer;
    if (previousPending === undefined) delete process.env.OIDC_SETUP_PENDING;
    else process.env.OIDC_SETUP_PENDING = previousPending;
  }
});

test("serves standalone role workspaces without the login page", async () => {
  for (const pathname of ["/student", "/admin"]) {
    const response = await fetch(`${baseUrl}${pathname}`);
    assert.equal(response.status, 200, `${pathname} should load the app`);
    assert.match(response.headers.get("content-type"), /^text\/html/);
    const html = await response.text();
    assert.match(html, new RegExp(`data-workspace-page="${pathname.slice(1)}"`));
    assert.match(html, /id="app-shell">/);
    assert.doesNotMatch(html, /id="login-page"/);
  }
});

test("includes the dedicated Raze study workspace for students", async () => {
  const response = await fetch(`${baseUrl}/student`);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /data-view="raze"/);
  assert.match(html, /id="raze-view"/);
  assert.match(html, /id="raze-material-query"/);
  assert.match(html, /data-raze-prompt=/);
  const razeStart = html.indexOf('<section class="raze-page"');
  const razeEnd = html.indexOf('<section class="crates-page"', razeStart);
  const razeMarkup = html.slice(razeStart, razeEnd);
  assert.ok(razeMarkup.indexOf('id="raze-recent-section"') < razeMarkup.indexOf('class="raze-search-card"'));
  assert.ok(razeMarkup.indexOf('class="raze-chat-section"') < razeMarkup.indexOf('class="raze-search-card"'));
  assert.doesNotMatch(razeMarkup, /Share a resource|upload-trigger/i);
});

test("provides a Home shortcut and a dedicated notification center", async () => {
  const response = await fetch(`${baseUrl}/student`);
  const html = await response.text();
  assert.match(html, /id="home-button"/);
  assert.match(html, /id="notification-panel"/);
  assert.match(html, /id="notification-list"/);
  assert.doesNotMatch(html, /id="student-announcements"/);
  assert.doesNotMatch(html, /class="search-hint"/);
});

test("provides suggested and new-upload resource feeds on Discover", async () => {
  const response = await fetch(`${baseUrl}/student`);
  const html = await response.text();
  assert.match(html, /data-resource-feed="suggested" aria-pressed="true"/);
  assert.match(html, /data-resource-feed="new" aria-pressed="false"/);
  assert.match(html, /id="resource-feed-hint"/);
  for (const department of ["all", "cse", "data-science", "eee", "ece", "mech", "civil"]) {
    assert.match(html, new RegExp(`data-department-feed="${department}"`));
  }
});

test("provides accessible account actions and a custom sign-out confirmation", async () => {
  const response = await fetch(`${baseUrl}/`);
  const html = await response.text();
  assert.match(html, /id="toggle-password-visibility"/);
  assert.match(html, /id="login-feedback"/);
  assert.match(html, /id="account-menu"/);
  assert.match(html, /data-account-action="saved"/);
  assert.match(html, /data-account-action="admin"/);
  assert.match(html, /id="sign-out-dialog"/);
  assert.match(html, /id="confirm-sign-out"/);
  const profileTrigger = html.match(/id="profile-button"[^>]*>[\s\S]*?<\/button>/);
  assert.ok(profileTrigger);
  assert.doesNotMatch(profileTrigger[0], /Sign out/);
});

test("provides theme controls on the login and workspace pages", async () => {
  const loginResponse = await fetch(`${baseUrl}/`);
  const loginHtml = await loginResponse.text();
  assert.equal((loginHtml.match(/data-theme-toggle/g) || []).length, 2);
  assert.match(loginHtml, /name="theme-color"/);

  const workspaceResponse = await fetch(`${baseUrl}/student`);
  const workspaceHtml = await workspaceResponse.text();
  assert.equal((workspaceHtml.match(/data-theme-toggle/g) || []).length, 1);
});

test("serves the PDF.js renderer and worker with an ES module content type", async () => {
  const [renderer, worker] = await Promise.all([
    fetch(`${baseUrl}/node_modules/pdfjs-dist/build/pdf.mjs`),
    fetch(`${baseUrl}/node_modules/pdfjs-dist/build/pdf.worker.mjs`),
  ]);
  assert.equal(renderer.status, 200);
  assert.equal(worker.status, 200);
  assert.match(renderer.headers.get("content-type"), /^text\/javascript/);
  assert.match(worker.headers.get("content-type"), /^text\/javascript/);
});

test("does not expose local environment or project files through static hosting", async () => {
  for (const pathname of ["/.env", "/server.mjs", "/package.json", "/PROJECT_REPORT_FOR_GEMINI.md"]) {
    const response = await fetch(`${baseUrl}${pathname}`);
    assert.equal(response.status, 404, `${pathname} should not be publicly accessible`);
  }
});

test("reports missing server-side Gemini configuration without exposing credentials", async () => {
  const previousKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  try {
    const response = await fetch(`${baseUrl}/api/analyze-pdf`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pdfBase64: "JVBERi0=" }),
    });
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "PDF analysis is not configured. Set GEMINI_API_KEY on the server.",
    });
  } finally {
    if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previousKey;
  }
});

test("explains that AI features are off in the presentation demo", async () => {
  const previousMode = process.env.NODE_ENV;
  const previousKey = process.env.GEMINI_API_KEY;
  process.env.NODE_ENV = "demo";
  delete process.env.GEMINI_API_KEY;
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", text: "Explain cell division" }] }),
    });
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "Raze is turned off in this presentation demo.",
    });
  } finally {
    if (previousMode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousMode;
    if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previousKey;
  }
});

test("rejects invalid PDFs before contacting Gemini", async () => {
  const previousKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = "test-key-not-used";
  try {
    const response = await fetch(`${baseUrl}/api/analyze-pdf`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pdfBase64: Buffer.from("not a PDF").toString("base64") }),
    });
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: "The selected file is not a valid PDF under 12 MB.",
    });
  } finally {
    if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previousKey;
  }
});

test("returns editable metadata from Gemini without sending the key in the URL", async () => {
  let upstreamRequest;
  const analysisServer = createServer({
    getApiKey: () => "test-secret",
    fetchGemini: async (url, options) => {
      upstreamRequest = { url, options };
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                resourceTitle: "Cell biology review",
                subject: "Anatomy",
                course: "BIO 204",
                tags: ["Cells", "Mitosis"],
                topicsCovered: ["Cell structure", "Mitosis"],
                focusTopics: ["Chromosome separation"],
                aiScore: 92,
              }),
            }],
          },
        }],
      }), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  await new Promise((resolve) => analysisServer.listen(0, "127.0.0.1", resolve));
  try {
    const pdf = Buffer.from("%PDF-1.7\nsample");
    const response = await fetch(`http://127.0.0.1:${analysisServer.address().port}/api/analyze-pdf`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pdfBase64: pdf.toString("base64") }),
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      resourceTitle: "Cell biology review",
      subject: "Anatomy",
      course: "BIO 204",
      tags: ["Cells", "Mitosis"],
      topicsCovered: ["Cell structure", "Mitosis"],
      focusTopics: ["Chromosome separation"],
      aiScore: 92,
    });
    assert.equal(new URL(upstreamRequest.url).search, "");
    assert.equal(upstreamRequest.options.headers["x-goog-api-key"], "test-secret");
    const requestBody = JSON.parse(upstreamRequest.options.body);
    assert.equal(requestBody.contents[0].parts[1].inline_data.mime_type, "application/pdf");
    assert.equal(requestBody.contents[0].parts[1].inline_data.data, pdf.toString("base64"));
  } finally {
    await new Promise((resolve, reject) => analysisServer.close((error) => error ? reject(error) : resolve()));
  }
});

test("keeps Raze conversational and sends recent turns to Gemini", async () => {
  let upstreamRequest;
  let upstreamCalls = 0;
  const chatServer = createServer({
    getApiKey: () => "test-secret",
    fetchGemini: async (url, options) => {
      upstreamCalls += 1;
      upstreamRequest = { url, options };
      if (upstreamCalls === 1) {
        return new Response(JSON.stringify({
          error: { message: "Model capacity temporarily unavailable." },
        }), { status: 503, headers: { "content-type": "application/json" } });
      }
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{ text: "A variable is a named place to store a value." }],
          },
        }],
      }), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  await new Promise((resolve) => chatServer.listen(0, "127.0.0.1", resolve));
  try {
    const endpoint = `http://127.0.0.1:${chatServer.address().port}/api/chat`;
    const conversation = [
      { role: "model", text: "Hi, what are you studying?" },
      { role: "user", text: "Explain variables simply." },
    ];
    const request = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: conversation,
        studyContext: {
          title: "Python starter",
          course: "Python Basics",
          summary: "Variables store values for later use.",
          topics: ["Variables"],
        },
      }),
    };
    const busyResponse = await fetch(endpoint, request);
    assert.equal(busyResponse.status, 502);
    assert.deepEqual(await busyResponse.json(), {
      error: "The AI service is busy. Please try again shortly.",
    });

    const response = await fetch(endpoint, request);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      reply: "A variable is a named place to store a value.",
      citations: [],
    });
    assert.equal(new URL(upstreamRequest.url).search, "");
    assert.equal(upstreamRequest.options.headers["x-goog-api-key"], "test-secret");
    const requestBody = JSON.parse(upstreamRequest.options.body);
    assert.match(requestBody.systemInstruction.parts[0].text, /personal academic study assistant/);
    assert.match(requestBody.systemInstruction.parts[0].text, /Variables store values for later use/);
    assert.match(requestBody.systemInstruction.parts[0].text, /this is not the full PDF/);
    assert.deepEqual(requestBody.contents, conversation.map(({ role, text }) => ({ role, parts: [{ text }] })));
    assert.equal(upstreamCalls, 2);
  } finally {
    await new Promise((resolve, reject) => chatServer.close((error) => error ? reject(error) : resolve()));
  }
});

test("generates an on-demand summary grounded in the uploaded PDF", async () => {
  let upstreamRequest;
  const summaryServer = createServer({
    getApiKey: () => "test-secret",
    fetchGemini: async (url, options) => {
      upstreamRequest = { url, options };
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                summary: "The document introduces Python variables and common data types.",
                topicsCovered: ["Variables", "Data types"],
              }),
            }],
          },
        }],
      }), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  await new Promise((resolve) => summaryServer.listen(0, "127.0.0.2", resolve));
  try {
    const pdf = Buffer.from("%PDF-1.7\nsample");
    const response = await fetch(`http://127.0.0.2:${summaryServer.address().port}/api/generate-study-summary`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resourceTitle: "Python starter", pdfBase64: pdf.toString("base64") }),
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      summary: "The document introduces Python variables and common data types.",
      topicsCovered: ["Variables", "Data types"],
    });
    assert.equal(new URL(upstreamRequest.url).search, "");
    assert.equal(upstreamRequest.options.headers["x-goog-api-key"], "test-secret");
    const requestBody = JSON.parse(upstreamRequest.options.body);
    assert.equal(requestBody.contents[0].parts[1].inline_data.mime_type, "application/pdf");
    assert.equal(requestBody.contents[0].parts[1].inline_data.data, pdf.toString("base64"));
  } finally {
    await new Promise((resolve, reject) => summaryServer.close((error) => error ? reject(error) : resolve()));
  }
});

test("creates a detailed study guide with an expanded output budget", async () => {
  let upstreamRequest;
  const guideText = "A grounded study point. ".repeat(550);
  const guideServer = createServer({
    getApiKey: () => "test-secret",
    fetchGemini: async (url, options) => {
      upstreamRequest = { url, options };
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                summary: guideText,
                topicsCovered: ["Core ideas"],
              }),
            }],
          },
        }],
      }), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  await new Promise((resolve) => guideServer.listen(0, "127.0.0.2", resolve));
  try {
    const pdf = Buffer.from("%PDF-1.7\nsample");
    const response = await fetch(`http://127.0.0.2:${guideServer.address().port}/api/generate-study-summary`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resourceTitle: "Lecture notes", pdfBase64: pdf.toString("base64"), detailStyle: true }),
    });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.summary, guideText.trim());
    const requestBody = JSON.parse(upstreamRequest.options.body);
    assert.equal(requestBody.generationConfig.maxOutputTokens, 6_500);
    assert.match(requestBody.contents[0].parts[0].text, /4–5 page-equivalent study guide/);
    assert.match(requestBody.contents[0].parts[0].text, /1,800–2,200 words/);
  } finally {
    await new Promise((resolve, reject) => guideServer.close((error) => error ? reject(error) : resolve()));
  }
});

test("limits summary requests without a PDF to the four Python Basics demo topics", async () => {
  let upstreamCalls = 0;
  const summaryServer = createServer({
    getApiKey: () => "test-secret",
    fetchGemini: async (_url, options) => {
      upstreamCalls += 1;
      assert.equal(JSON.parse(options.body).contents[0].parts.length, 1);
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                summary: "A short introduction to Python setup, core types, and expressions.",
                topicsCovered: ["Python Basics", "Installation", "Data types", "Variables and Expressions"],
              }),
            }],
          },
        }],
      }), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  await new Promise((resolve) => summaryServer.listen(0, "127.0.0.2", resolve));
  try {
    const response = await fetch(`http://127.0.0.2:${summaryServer.address().port}/api/generate-study-summary`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resourceTitle: "Python starter", topics: ["Machine learning"] }),
    });
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: "Choose an available PDF or one or more supported Python Basics topics.",
    });
    assert.equal(upstreamCalls, 0);

    const validResponse = await fetch(`http://127.0.0.2:${summaryServer.address().port}/api/generate-study-summary`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        resourceTitle: "Python starter",
        topics: [
          "Python Basics",
          "Installation",
          "Data types (int, float, bool, string, list)",
          "Variables and Expressions",
        ],
      }),
    });
    assert.equal(validResponse.status, 200);
    assert.match((await validResponse.json()).summary, /Python setup/);
    assert.equal(upstreamCalls, 1);
  } finally {
    await new Promise((resolve, reject) => summaryServer.close((error) => error ? reject(error) : resolve()));
  }
});

test("generates validated PDF-grounded quiz questions", async () => {
  let upstreamRequest;
  const quizItems = Array.from({ length: 5 }, (_, index) => ({
    question: `Question ${index + 1}?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answerIndex: 1,
    explanation: "The selected source explains this concept.",
  }));
  const toolServer = createServer({
    getApiKey: () => "test-secret",
    fetchGemini: async (url, options) => {
      upstreamRequest = { url, options };
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{ text: JSON.stringify({ title: "Lecture quiz", items: quizItems }) }],
          },
        }],
      }), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  await new Promise((resolve) => toolServer.listen(0, "127.0.0.2", resolve));
  try {
    const pdf = Buffer.from("%PDF-1.7\nsample");
    const response = await fetch(`http://127.0.0.2:${toolServer.address().port}/api/generate-study-tools`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resourceTitle: "Lecture notes", tool: "quiz", pdfBase64: pdf.toString("base64") }),
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { title: "Lecture quiz", items: quizItems });
    const requestBody = JSON.parse(upstreamRequest.options.body);
    assert.match(requestBody.contents[0].parts[0].text, /exactly 5 quiz questions/);
    assert.equal(requestBody.contents[0].parts[1].inline_data.data, pdf.toString("base64"));
    assert.equal(requestBody.generationConfig.responseSchema.properties.items.items.properties.answerIndex.type, "INTEGER");
  } finally {
    await new Promise((resolve, reject) => toolServer.close((error) => error ? reject(error) : resolve()));
  }
});

test("generates flashcards and a mock test with their expected item counts", async () => {
  const toolServer = createServer({
    getApiKey: () => "test-secret",
    fetchGemini: async (_url, options) => {
      const requestBody = JSON.parse(options.body);
      const prompt = requestBody.contents[0].parts[0].text;
      const isFlashcards = prompt.includes("flashcards");
      const items = isFlashcards
        ? Array.from({ length: 8 }, (_, index) => ({ front: `Prompt ${index + 1}`, back: `Answer ${index + 1}` }))
        : Array.from({ length: 10 }, (_, index) => ({
          question: `Mock question ${index + 1}?`,
          options: ["Alpha", "Beta", "Gamma", "Delta"],
          answerIndex: 2,
          explanation: "The notes support this answer.",
        }));
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{ text: JSON.stringify({ title: isFlashcards ? "Review cards" : "Practice exam", items }) }],
          },
        }],
      }), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  await new Promise((resolve) => toolServer.listen(0, "127.0.0.2", resolve));
  try {
    const endpoint = `http://127.0.0.2:${toolServer.address().port}/api/generate-study-tools`;
    const flashcardsResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        resourceTitle: "Python starter",
        tool: "flashcards",
        topics: ["Python Basics", "Installation"],
      }),
    });
    assert.equal(flashcardsResponse.status, 200);
    const flashcards = await flashcardsResponse.json();
    assert.equal(flashcards.title, "Review cards");
    assert.equal(flashcards.items.length, 8);
    assert.deepEqual(flashcards.items[0], { front: "Prompt 1", back: "Answer 1" });

    const mockTestResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        resourceTitle: "Python starter",
        tool: "mock-test",
        topics: ["Variables and Expressions"],
      }),
    });
    assert.equal(mockTestResponse.status, 200);
    const mockTest = await mockTestResponse.json();
    assert.equal(mockTest.title, "Practice exam");
    assert.equal(mockTest.items.length, 10);
    assert.equal(mockTest.items[0].answerIndex, 2);
  } finally {
    await new Promise((resolve, reject) => toolServer.close((error) => error ? reject(error) : resolve()));
  }
});
