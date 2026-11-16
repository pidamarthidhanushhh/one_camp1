import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { closeDatabasePool, getDatabasePool } from "./db.mjs";

const migrationDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "db", "migrations");
const pool = getDatabasePool();
const client = await pool.connect();

try {
  await client.query("SELECT pg_advisory_lock($1::bigint)", [7_340_221_019]);
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name text PRIMARY KEY,
      sha256 char(64) NOT NULL,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  const files = (await readdir(migrationDirectory))
    .filter((name) => /^\d+_[a-z0-9_-]+\.sql$/i.test(name))
    .sort();

  for (const name of files) {
    const sql = await readFile(path.join(migrationDirectory, name), "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const existing = await client.query("SELECT sha256 FROM schema_migrations WHERE name = $1", [name]);
    if (existing.rowCount) {
      if (existing.rows[0].sha256.trim() !== checksum) {
        throw new Error(`Applied migration ${name} has changed. Create a new migration instead of editing it.`);
      }
      console.log(`Already applied: ${name}`);
      continue;
    }

    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (name, sha256) VALUES ($1, $2)", [name, checksum]);
      await client.query("COMMIT");
      console.log(`Applied: ${name}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  }
} finally {
  try {
    await client.query("SELECT pg_advisory_unlock($1::bigint)", [7_340_221_019]);
  } finally {
    client.release();
    await closeDatabasePool();
  }
}
