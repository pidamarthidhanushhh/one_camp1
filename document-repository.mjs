import { createHash, randomUUID } from "node:crypto";
import { deletePrivateObject, getPrivateObject, putPrivateObject } from "./private-storage.mjs";
import { getDatabasePool } from "./db.mjs";

const maxPdfBytes = 12 * 1024 * 1024;

function badRequest(message) {
  return Object.assign(new Error(message), { status: 400 });
}

function stringField(value, label, maxLength, { required = false } = {}) {
  if (value == null && !required) return null;
  if (typeof value !== "string") throw badRequest(`${label} must be text.`);
  const clean = value.trim();
  if ((required && !clean) || clean.length > maxLength) throw badRequest(`${label} is required and must be at most ${maxLength} characters.`);
  return clean || null;
}

function stringList(value, label, maximumItems, maximumLength) {
  if (value == null) return [];
  if (!Array.isArray(value) || value.length > maximumItems || !value.every((item) => typeof item === "string")) {
    throw badRequest(`${label} must be a list of up to ${maximumItems} text values.`);
  }
  return value.map((item) => item.trim().slice(0, maximumLength)).filter(Boolean);
}

function decodePdf(base64) {
  if (typeof base64 !== "string" || !base64 || base64.length > Math.ceil(maxPdfBytes * 1.4)) {
    throw badRequest("Choose a PDF no larger than 12 MB.");
  }
  const pdf = Buffer.from(base64, "base64");
  if (
    !pdf.length || pdf.length > maxPdfBytes || pdf.toString("base64").replace(/=+$/, "") !== base64.replace(/=+$/, "") ||
    pdf.toString("ascii", 0, 5) !== "%PDF-"
  ) {
    throw badRequest("The selected file is not a valid PDF under 12 MB.");
  }
  return pdf;
}

function documentResource(row) {
  const processingHelp = {
    NO_EXTRACTABLE_TEXT: "This PDF appears to be scanned. Try a text-readable PDF or contact Campus support for OCR help.",
    AI_NOT_CONFIGURED: "Raze indexing is not configured on the server yet. Contact Campus support before retrying.",
    EMBEDDING_REJECTED: "The document could not be indexed by the AI service. Check sharing permission, then retry.",
  };
  return {
    id: row.id,
    title: row.title,
    subject: row.subject || "Study material",
    course: row.course || "",
    format: row.page_count ? `PDF · ${row.page_count} pages` : "PDF · Processing",
    rating: null,
    ratings: 0,
    aiScore: row.ai_score,
    facultyScore: null,
    author: row.display_name || "Campus resource owner",
    summary: "",
    tags: row.tags || [],
    topicsCovered: row.topics_covered || [],
    focusTopics: row.focus_topics || [],
    cover: "other",
    license: row.sharing_label || "",
    isUploaded: row.owner_user_id === row.request_user_id,
    serverBacked: true,
    reviewStatus: row.publication_state,
    college: row.organization_name,
    department: row.department,
    year: row.academic_year,
    section: row.section,
    semester: row.semester,
    facultyReviewed: row.publication_state === "approved",
    createdAt: row.created_at,
    processingStatus: row.lifecycle_state,
    processingHelp: row.lifecycle_state === "failed"
      ? processingHelp[row.processing_error_code] || "The document could not be indexed. Try again, or upload a readable PDF if this keeps happening."
      : "",
  };
}

function accessSql() {
  return `(
    d.owner_user_id = $2
    OR (
      d.source_kind = 'campus_resource'
      AND d.publication_state = 'approved'
      AND (
        d.access_scope = 'organization'
        OR (d.access_scope = 'department' AND d.department = (
          SELECT m.department FROM organization_memberships m
          WHERE m.organization_id = $1 AND m.user_id = $2
        ))
        OR EXISTS (
          SELECT 1 FROM document_permissions p
          WHERE p.document_id = d.id AND p.permission = 'read'
            AND ((p.subject_kind = 'user' AND p.subject_id = $2::text)
              OR (p.subject_kind = 'organization' AND p.subject_id = $1::text)
              OR (p.subject_kind = 'department' AND p.subject_id = (
                SELECT m.department FROM organization_memberships m
                WHERE m.organization_id = $1 AND m.user_id = $2
              )))
        )
      )
    )
  )`;
}

export async function createPersonalDocument(payload, session) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw badRequest("Upload details are invalid.");
  const pdf = decodePdf(payload?.pdfBase64);
  const title = stringField(payload.title, "Title", 140, { required: true });
  const subject = stringField(payload.subject, "Subject", 100, { required: true });
  const course = stringField(payload.course, "Course", 120, { required: true });
  const filename = stringField(payload.filename, "Filename", 180, { required: true });
  if (!filename.toLowerCase().endsWith(".pdf")) throw badRequest("The uploaded filename must end in .pdf.");
  const department = stringField(payload.department, "Department", 80, { required: true });
  const section = stringField(payload.section, "Section", 80, { required: true });
  const year = Number(payload.year);
  const semester = payload.semester == null ? null : Number(payload.semester);
  const aiScore = Number(payload.aiScore);
  if (!Number.isInteger(year) || year < 1 || year > 4) throw badRequest("Year must be between 1 and 4.");
  if (semester != null && (!Number.isInteger(semester) || semester < 1 || semester > 8)) throw badRequest("Semester must be between 1 and 8.");
  if (!Number.isInteger(aiScore) || aiScore < 0 || aiScore > 100) throw badRequest("AI score must be between 0 and 100.");

  const tags = stringList(payload.tags, "Tags", 6, 40);
  const topicsCovered = stringList(payload.topicsCovered, "Topics", 20, 120);
  const focusTopics = stringList(payload.focusTopics, "Focus topics", 8, 120);
  const sharingLabel = stringField(payload.sharingLabel, "Sharing label", 120);
  const hash = createHash("sha256").update(pdf).digest("hex");
  const documentId = randomUUID();
  const versionId = randomUUID();
  const jobId = randomUUID();
  const objectKey = `${session.organization_id}/${session.id}/${documentId}/${hash}.pdf`;
  const pool = getDatabasePool();
  const client = await pool.connect();
  let fileWritten = false;
  try {
    await putPrivateObject(objectKey, pdf);
    fileWritten = true;
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO documents
        (id, organization_id, owner_user_id, source_kind, access_scope, publication_state, title, course, subject,
         department, academic_year, section, semester, tags, topics_covered, focus_topics, ai_score, sharing_label, lifecycle_state)
       VALUES ($1, $2, $3, 'personal_upload', 'owner', 'pending', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'queued')`,
      [documentId, session.organization_id, session.id, title, course, subject, department, year, section, semester, tags, topicsCovered, focusTopics, aiScore, sharingLabel],
    );
    await client.query(
      `INSERT INTO document_versions
        (id, document_id, version_number, content_sha256, object_key, original_filename, content_type, byte_size)
       VALUES ($1, $2, 1, $3, $4, $5, 'application/pdf', $6)`,
      [versionId, documentId, hash, objectKey, filename, pdf.byteLength],
    );
    await client.query("UPDATE documents SET active_version_id = $2 WHERE id = $1", [documentId, versionId]);
    await client.query(
      "INSERT INTO document_processing_jobs (id, document_version_id, status) VALUES ($1, $2, 'queued')",
      [jobId, versionId],
    );
    await client.query("COMMIT");
    return {
      id: documentId,
      title,
      subject,
      course,
      format: "PDF · Queued for indexing",
      rating: null,
      ratings: 0,
      aiScore,
      facultyScore: null,
      author: session.display_name,
      summary: "",
      tags,
      topicsCovered,
      focusTopics,
      cover: "other",
      license: sharingLabel || "",
      isUploaded: true,
      serverBacked: true,
      reviewStatus: "pending",
      college: session.organization_name,
      department,
      year,
      section,
      semester,
      facultyReviewed: false,
      createdAt: new Date().toISOString(),
      processingStatus: "queued",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    if (fileWritten) await deletePrivateObject(objectKey).catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

export async function listAccessibleDocuments(session) {
  const result = await getDatabasePool().query(
    `SELECT d.*, v.page_count, u.display_name, o.name AS organization_name,
       job.last_error_code AS processing_error_code, $2::uuid AS request_user_id
     FROM documents d
     JOIN organizations o ON o.id = d.organization_id
     LEFT JOIN users u ON u.id = d.owner_user_id
     LEFT JOIN document_versions v ON v.id = d.active_version_id AND v.document_id = d.id
     LEFT JOIN LATERAL (SELECT last_error_code FROM document_processing_jobs j WHERE j.document_version_id = v.id ORDER BY created_at DESC LIMIT 1) job ON true
     WHERE d.organization_id = $1 AND d.lifecycle_state <> 'deleted' AND ${accessSql()}
     ORDER BY d.created_at DESC LIMIT 300`,
    [session.organization_id, session.id],
  );
  return result.rows.map(documentResource);
}

export async function retryDocumentProcessing(documentId, session) {
  const client = await getDatabasePool().connect();
  try {
    await client.query("BEGIN");
    const selected = await client.query(
      `SELECT v.id AS version_id FROM documents d
       JOIN document_versions v ON v.id = d.active_version_id AND v.document_id = d.id
       WHERE d.id = $3 AND d.organization_id = $1 AND d.owner_user_id = $2 AND d.lifecycle_state = 'failed'
       FOR UPDATE OF d`,
      [session.organization_id, session.id, documentId],
    );
    if (!selected.rowCount) {
      await client.query("ROLLBACK");
      return false;
    }
    const queued = await client.query(
      `UPDATE document_processing_jobs SET status = 'queued', attempt_count = 0, next_attempt_at = now(),
         locked_until = NULL, last_error_code = NULL, last_error_message = NULL, finished_at = NULL, updated_at = now()
       WHERE document_version_id = $1`,
      [selected.rows[0].version_id],
    );
    if (!queued.rowCount) {
      await client.query("ROLLBACK");
      return false;
    }
    await client.query("UPDATE documents SET lifecycle_state = 'queued', updated_at = now() WHERE id = $1", [documentId]);
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function readAccessibleDocumentFile(documentId, session) {
  const result = await getDatabasePool().query(
    `SELECT v.object_key, v.original_filename
     FROM documents d JOIN document_versions v ON v.id = d.active_version_id AND v.document_id = d.id
     WHERE d.id = $3 AND d.organization_id = $1 AND d.lifecycle_state <> 'deleted' AND ${accessSql()}`,
    [session.organization_id, session.id, documentId],
  );
  if (!result.rowCount) return null;
  return { bytes: await getPrivateObject(result.rows[0].object_key), filename: result.rows[0].original_filename };
}

export async function searchAccessibleDocumentChunks(documentId, queryText, queryVector, session) {
  const query = String(queryText || "").trim().slice(0, 1200);
  if (!query) return [];
  const result = await getDatabasePool().query(
    `WITH q AS (SELECT websearch_to_tsquery('english', $4) AS terms),
     allowed AS (
       SELECT d.id AS document_id, d.title, v.id AS version_id, v.version_number,
         c.id AS chunk_id, c.section_heading, c.page_start, c.page_end, c.content, c.search_vector, c.embedding
       FROM documents d
       JOIN document_versions v ON v.id = d.active_version_id AND v.document_id = d.id
       JOIN document_chunks c ON c.document_version_id = v.id
       WHERE d.id = $3 AND d.organization_id = $1 AND d.lifecycle_state = 'ready' AND ${accessSql()}
     ),
     lexical AS (
       SELECT chunk_id, row_number() OVER (ORDER BY ts_rank_cd(search_vector, q.terms) DESC, page_start) AS position
       FROM allowed CROSS JOIN q WHERE search_vector @@ q.terms LIMIT 12
     ),
     semantic AS (
       SELECT chunk_id, row_number() OVER (ORDER BY embedding <=> $5::vector ASC) AS position
       FROM allowed WHERE embedding IS NOT NULL ORDER BY embedding <=> $5::vector ASC LIMIT 12
     ),
     fused AS (
       SELECT chunk_id, sum(1.0 / (60 + position)) AS score FROM (
         SELECT * FROM lexical UNION ALL SELECT * FROM semantic
       ) ranked GROUP BY chunk_id
     )
     SELECT a.document_id, a.title, a.version_id, a.version_number, a.section_heading,
       a.page_start, a.page_end, a.content
     FROM fused f JOIN allowed a ON a.chunk_id = f.chunk_id
     ORDER BY f.score DESC, a.page_start ASC LIMIT 6`,
    [session.organization_id, session.id, documentId, query, queryVector],
  );
  return result.rows.map((row, index) => ({
    id: index + 1,
    documentId: row.document_id,
    versionId: row.version_id,
    versionNumber: row.version_number,
    title: row.title,
    section: row.section_heading,
    pageStart: row.page_start,
    pageEnd: row.page_end,
    text: row.content.slice(0, 3200),
  }));
}

const artifactKinds = new Set(["study_guide", "quick_review", "flashcards", "quiz", "mock_test"]);

export async function createStudyArtifact(payload, session) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw badRequest("Artifact details are invalid.");
  const { documentId, kind, title, content } = payload;
  if (typeof documentId !== "string" || !/^[0-9a-f-]{36}$/i.test(documentId)) throw badRequest("Choose a valid source document.");
  if (!artifactKinds.has(kind)) throw badRequest("Choose a supported study artifact type.");
  if (typeof title !== "string" || !title.trim() || title.trim().length > 180) throw badRequest("Artifact title is required and must be at most 180 characters.");
  if (!content || typeof content !== "object" || Array.isArray(content) || Buffer.byteLength(JSON.stringify(content)) > 100_000) {
    throw badRequest("Artifact content must be a structured object under 100 KB.");
  }
  if (["study_guide", "quick_review"].includes(kind)) {
    if (typeof content.summary !== "string" || !content.summary.trim() || content.summary.length > 60_000 ||
      !Array.isArray(content.topicsCovered) || content.topicsCovered.length > 30 ||
      !content.topicsCovered.every((topic) => typeof topic === "string" && topic.length <= 120)) {
      throw badRequest("Summary content does not match the study artifact format.");
    }
  } else if (!Array.isArray(content.items) || content.items.length < 1 || content.items.length > 100) {
    throw badRequest("Practice artifact must contain 1 to 100 items.");
  } else if (kind === "flashcards") {
    if (!content.items.every((item) => item && typeof item.front === "string" && item.front.length <= 2_000 && typeof item.back === "string" && item.back.length <= 3_000)) {
      throw badRequest("Flashcards do not match the expected prompt and answer format.");
    }
  } else if (!content.items.every((item) => item && typeof item.question === "string" && item.question.length <= 2_000 &&
      Array.isArray(item.options) && item.options.length >= 2 && item.options.length <= 6 &&
      item.options.every((option) => typeof option === "string" && option.length <= 500) &&
      Number.isInteger(item.answerIndex) && item.answerIndex >= 0 && item.answerIndex < item.options.length &&
      typeof item.explanation === "string" && item.explanation.length <= 2_000)) {
    throw badRequest("Quiz questions do not match the expected answer format.");
  }
  const source = await getDatabasePool().query(
    `SELECT v.id AS version_id FROM documents d
     JOIN document_versions v ON v.id = d.active_version_id AND v.document_id = d.id
     WHERE d.id = $3 AND d.organization_id = $1 AND d.lifecycle_state = 'ready' AND ${accessSql()}`,
    [session.organization_id, session.id, documentId],
  );
  if (!source.rowCount) throw Object.assign(new Error("The selected source document is unavailable."), { status: 404 });
  const saved = await getDatabasePool().query(
    `INSERT INTO study_artifacts
      (organization_id, owner_user_id, source_document_version_id, artifact_kind, title, content)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb)
     RETURNING id, artifact_kind AS kind, title, content, created_at`,
    [session.organization_id, session.id, source.rows[0].version_id, kind, title.trim(), JSON.stringify(content)],
  );
  return saved.rows[0];
}

export async function listStudyArtifacts(session) {
  const result = await getDatabasePool().query(
    `SELECT a.id, a.artifact_kind AS kind, a.title, a.content, a.created_at,
       d.id AS document_id, d.title AS document_title, v.version_number
     FROM study_artifacts a
     JOIN document_versions v ON v.id = a.source_document_version_id
     JOIN documents d ON d.id = v.document_id
     WHERE a.organization_id = $1 AND a.owner_user_id = $2
     ORDER BY a.created_at DESC LIMIT 100`,
    [session.organization_id, session.id],
  );
  return result.rows;
}

export async function deleteStudyArtifact(artifactId, session) {
  const result = await getDatabasePool().query(
    `DELETE FROM study_artifacts WHERE id = $3 AND organization_id = $1 AND owner_user_id = $2 RETURNING id`,
    [session.organization_id, session.id, artifactId],
  );
  return result.rowCount > 0;
}
