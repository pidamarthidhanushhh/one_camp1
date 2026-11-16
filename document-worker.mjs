import path from "node:path";
import { fileURLToPath } from "node:url";
import { chunkPdfPages, extractPdfPages } from "./document-processing.mjs";
import { getDatabasePool, closeDatabasePool } from "./db.mjs";
import { getPrivateObject } from "./private-storage.mjs";

const embeddingModel = process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";
const embeddingDimensions = 768;
const maxAttempts = 5;
const stopping = { value: false };

async function claimJob() {
  const pool = getDatabasePool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `WITH candidate AS (
         SELECT id FROM document_processing_jobs
         WHERE attempt_count < $1 AND (
           (status IN ('queued', 'failed') AND next_attempt_at <= now())
           OR (status IN ('validating', 'extracting', 'chunking', 'embedding', 'indexing') AND locked_until < now())
         )
         ORDER BY next_attempt_at, created_at
         FOR UPDATE SKIP LOCKED LIMIT 1
       )
       UPDATE document_processing_jobs j
       SET status = 'validating', attempt_count = j.attempt_count + 1,
           locked_until = now() + interval '10 minutes', updated_at = now(),
           last_error_code = NULL, last_error_message = NULL
       FROM candidate c WHERE j.id = c.id
       RETURNING j.id, j.document_version_id, j.attempt_count`,
      [maxAttempts],
    );
    if (!result.rowCount) {
      await client.query("COMMIT");
      return null;
    }
    const job = result.rows[0];
    const document = await client.query(
      `SELECT d.id AS document_id, d.organization_id, dv.object_key, dv.content_sha256
       FROM document_versions dv JOIN documents d ON d.id = dv.document_id
       WHERE dv.id = $1`,
      [job.document_version_id],
    );
    await client.query("UPDATE documents SET lifecycle_state = 'validating', updated_at = now() WHERE id = $1", [document.rows[0].document_id]);
    await client.query("COMMIT");
    return { ...job, ...document.rows[0] };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function updateStage(job, stage) {
  await getDatabasePool().query(
    `UPDATE document_processing_jobs SET status = $2, locked_until = now() + interval '10 minutes', updated_at = now() WHERE id = $1`,
    [job.id, stage],
  );
  await getDatabasePool().query(
    "UPDATE documents SET lifecycle_state = $2, updated_at = now() WHERE id = $1",
    [job.document_id, stage],
  );
}

function normalizeVector(values) {
  if (!Array.isArray(values) || values.length !== embeddingDimensions || !values.every(Number.isFinite)) {
    throw Object.assign(new Error("Gemini returned an invalid embedding vector."), { code: "INVALID_EMBEDDING" });
  }
  const magnitude = Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
  if (!magnitude) throw Object.assign(new Error("Gemini returned an empty embedding vector."), { code: "INVALID_EMBEDDING" });
  return values.map((value) => value / magnitude);
}

async function embedChunks(chunks) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw Object.assign(new Error("GEMINI_API_KEY is not configured for document indexing."), { code: "AI_NOT_CONFIGURED" });
  const vectors = [];
  for (let offset = 0; offset < chunks.length; offset += 16) {
    const batch = chunks.slice(offset, offset + 16);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(embeddingModel)}:batchEmbedContents`,
      {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          requests: batch.map((chunk) => ({
            model: `models/${embeddingModel}`,
            content: { parts: [{ text: chunk.sectionHeading ? `${chunk.sectionHeading}\n${chunk.content}` : chunk.content }] },
            embedContentConfig: { taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: embeddingDimensions },
          })),
        }),
        signal: AbortSignal.timeout(60_000),
      },
    );
    if (!response.ok) {
      const detail = await response.json().catch(() => ({}));
      throw Object.assign(new Error(detail.error?.message || `Embedding request failed (HTTP ${response.status}).`), {
        code: response.status === 429 || response.status >= 500 ? "EMBEDDING_RETRYABLE" : "EMBEDDING_REJECTED",
      });
    }
    const payload = await response.json();
    if (!Array.isArray(payload.embeddings) || payload.embeddings.length !== batch.length) {
      throw Object.assign(new Error("Gemini returned an incomplete embedding batch."), { code: "INVALID_EMBEDDING" });
    }
    vectors.push(...payload.embeddings.map((embedding) => normalizeVector(embedding.values)));
  }
  return vectors;
}

async function persistIndex(job, pages, chunks, vectors) {
  const pool = getDatabasePool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM document_chunks WHERE document_version_id = $1", [job.document_version_id]);
    await client.query("DELETE FROM document_pages WHERE document_version_id = $1", [job.document_version_id]);
    for (const page of pages) {
      await client.query(
        `INSERT INTO document_pages (document_version_id, page_number, extracted_text, extraction_quality, extraction_method)
         VALUES ($1, $2, $3, $4, $5)`,
        [job.document_version_id, page.pageNumber, page.text, page.extractionQuality, page.extractionMethod],
      );
    }
    for (let index = 0; index < chunks.length; index += 1) {
      const chunk = chunks[index];
      const vectorLiteral = `[${vectors[index].join(",")}]`;
      await client.query(
        `INSERT INTO document_chunks
          (document_version_id, chunk_number, section_heading, page_start, page_end, content, embedding, embedding_model)
         VALUES ($1, $2, $3, $4, $5, $6, $7::vector, $8)`,
        [job.document_version_id, chunk.chunkNumber, chunk.sectionHeading, chunk.pageStart, chunk.pageEnd, chunk.content, vectorLiteral, embeddingModel],
      );
    }
    await client.query(
      `UPDATE document_versions SET page_count = $2, embedding_provider = 'gemini', embedding_model = $3,
         embedding_dimensions = $4, extraction_config = 'pdfjs-page-text-v1'
       WHERE id = $1`,
      [job.document_version_id, pages.length, embeddingModel, embeddingDimensions],
    );
    await client.query("UPDATE documents SET lifecycle_state = 'ready', updated_at = now() WHERE id = $1", [job.document_id]);
    await client.query(
      "UPDATE document_processing_jobs SET status = 'ready', locked_until = NULL, finished_at = now(), updated_at = now() WHERE id = $1",
      [job.id],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function failJob(job, error) {
  const retryable = !["NO_EXTRACTABLE_TEXT", "EMBEDDING_REJECTED", "AI_NOT_CONFIGURED"].includes(error.code);
  const terminal = !retryable || job.attempt_count >= maxAttempts;
  const delaySeconds = Math.min(300, 10 * (2 ** Math.max(0, job.attempt_count - 1)));
  const errorMessage = String(error.message || "Document processing failed.").slice(0, 500);
  await getDatabasePool().query(
    `UPDATE document_processing_jobs SET status = 'failed', locked_until = NULL,
       next_attempt_at = CASE WHEN $2 THEN now() + ($3::int * interval '1 second') ELSE now() + interval '10 years' END,
       last_error_code = $4, last_error_message = $5, updated_at = now()
     WHERE id = $1`,
    [job.id, !terminal, delaySeconds, error.code || "PROCESSING_FAILED", errorMessage],
  );
  await getDatabasePool().query(
    "UPDATE documents SET lifecycle_state = 'failed', updated_at = now() WHERE id = $1",
    [job.document_id],
  );
  console.error(`Document processing failed (${job.id}, ${error.code || "PROCESSING_FAILED"}).`);
}

async function processJob(job) {
  let heartbeat;
  try {
    heartbeat = setInterval(() => {
      void getDatabasePool().query(
        "UPDATE document_processing_jobs SET locked_until = now() + interval '10 minutes', updated_at = now() WHERE id = $1",
        [job.id],
      ).catch((error) => console.error("Could not renew document job lease:", error.message));
    }, 60_000);
    heartbeat.unref();

    const pdf = await getPrivateObject(job.object_key);
    await updateStage(job, "extracting");
    const extracted = await extractPdfPages(pdf);
    if (!extracted.pages.some((page) => page.text.trim())) {
      throw Object.assign(new Error("No extractable PDF text was found; OCR is not configured yet."), { code: "NO_EXTRACTABLE_TEXT" });
    }
    await updateStage(job, "chunking");
    const chunks = chunkPdfPages(extracted.pages);
    if (!chunks.length) throw Object.assign(new Error("No searchable text chunks were created."), { code: "NO_EXTRACTABLE_TEXT" });
    await updateStage(job, "embedding");
    const vectors = await embedChunks(chunks);
    await updateStage(job, "indexing");
    await persistIndex(job, extracted.pages, chunks, vectors);
    console.log(`Indexed document version ${job.document_version_id} (${extracted.pageCount} pages, ${chunks.length} chunks).`);
  } catch (error) {
    await failJob(job, error);
  } finally {
    if (heartbeat) clearInterval(heartbeat);
  }
}

export async function runDocumentWorker({ pollMilliseconds = 1_500 } = {}) {
  process.on("SIGINT", () => { stopping.value = true; });
  process.on("SIGTERM", () => { stopping.value = true; });
  console.log(`Campus document worker started using ${embeddingModel} (${embeddingDimensions} dimensions).`);
  try {
    while (!stopping.value) {
      let job;
      try {
        job = await claimJob();
        if (job) await processJob(job);
        else await new Promise((resolve) => setTimeout(resolve, pollMilliseconds));
      } catch (error) {
        console.error("Document worker loop error:", error.message);
        await new Promise((resolve) => setTimeout(resolve, Math.max(pollMilliseconds, 5_000)));
      }
    }
  } finally {
    await closeDatabasePool();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  void runDocumentWorker();
}
