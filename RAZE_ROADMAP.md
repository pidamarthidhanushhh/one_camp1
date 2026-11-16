# Raze product and implementation roadmap

## Product direction

Raze is Campus's document intelligence first academic assistant. It should help a student understand permitted Campus resources and their own uploads, work across documents the student selects, and complete useful study tasks. It is not an unrestricted agent: server-side policy checks govern every document and tool operation.

### Decisions carried forward from the product discussion

- Support Campus resources and private student uploads, with separate ownership and access rules.
- Work with the open document or documents the student explicitly selects. Do not search every accessible document by default.
- Persist document processing and indexes, track immutable document versions, and reuse indexes across conversations.
- Use PostgreSQL and pgvector initially, private object storage for originals, PDF.js for reading, and background workers for processing.
- Combine full-text and semantic retrieval, filter by permissions before returning evidence, and cite actual source pages.
- Build a bounded tool-using agent only after document retrieval and study tools are reliable. It may perform private study work automatically; sharing, permission changes, permanent deletion, and external communication require approval.
- Keep generated study artifacts structured, reusable, and linked to the exact source document versions.

## Five implementation phases

### Phase 1 — Application foundation and document security

**Goal:** establish the production boundary that all later features rely on.

- Replace demo sign-in with server-verified identity and roles.
- Define tenant, membership, document ownership, and access policies.
- Establish PostgreSQL migrations and private object storage configuration.
- Add authenticated API boundaries, request validation, quotas, and audit events.
- Move resource metadata and review status out of browser storage.

**Exit gate:** unauthorized users cannot read or mutate another user's records or documents; the core data model migrates cleanly in a deployment environment.

### Phase 2 — Persistent document ingestion and indexing

**Goal:** process each document version once and make it safely reusable.

- Upload originals to private storage and validate file size, type, integrity, ownership, and security status.
- Track version hashes and an explicit processing lifecycle: uploaded, validating, queued, extracting, chunking, embedding, indexing, ready, failed, quarantined, deleting, deleted.
- Extract page-aware text and structure; add OCR for scanned PDFs.
- Chunk by meaningful sections, preserve page references, and persist full text plus embeddings.
- Run processing asynchronously with safe retries and versioned extraction/embedding configuration.
- Keep content processing identity separate from owner and permissions so deduplication never grants access.

**Exit gate:** uploaded PDFs reach ready or a clear failure state; re-uploads create versions; unchanged versions reuse their index; revoked/deleted documents disappear from active retrieval immediately.

### Phase 3 — Document-grounded Raze and citations

**Goal:** answer questions from the open or selected documents with traceable evidence.

- Implement permission-filtered hybrid retrieval: PostgreSQL full-text search, pgvector similarity, metadata filtering, and reranking.
- Connect chat to retrieved chunks rather than summaries or client-supplied PDF contents.
- Return structured citations to document version, page, and section.
- Distinguish document evidence from general explanation and state when evidence is insufficient.
- Support follow-up questions within a conversation while resolving document access on every request.

**Exit gate:** a small academic evaluation set demonstrates relevant page retrieval, accurate citations, honest insufficient-evidence behavior, and cross-user isolation.

### Phase 4 — Study task engine and saved artifacts

**Goal:** turn selected material into usable study products.

- Generate validated summaries, study guides, quizzes, flashcards, and document comparisons from retrieved evidence.
- Store outputs as structured artifacts, not only chat text.
- Link every artifact to exact source document versions and pages.
- Let students revisit artifacts and report quality problems.

**Exit gate:** generated outputs pass schema validation, preserve source provenance, and remain readable after the conversation ends.

### Phase 5 — Bounded agent, academic context, and operations

**Goal:** let Raze complete multi-step study objectives reliably.

- Add a typed tool registry, intent/planning, policy checks, durable task/step records, bounded execution, result validation, and recovery.
- Add editable academic context and user-controlled conversation/preferences retention.
- Support selected-document workflows such as comparing syllabus coverage with notes and question papers.
- Add optional, quiet proactive suggestions only after the core workflows prove useful.
- Measure retrieval quality, citation correctness, permissions, latency, reliability, and AI/storage costs; add operational dashboards and incident recovery.

**Exit gate:** multi-step tasks resume safely after interruption, never exceed granted access, report limitations honestly, and meet agreed quality and cost targets.

## Current repository assessment

The active folder is a vanilla JavaScript frontend plus a small Node HTTP server. It has demo credentials, browser-local metadata, IndexedDB PDFs, and Gemini endpoints that accept client-provided PDF data. It does not currently contain Next.js, TypeScript, PostgreSQL, Drizzle, institutional authentication, object storage, background workers, or a persistent document index.

The phase plan therefore treats the existing interface and PDF.js viewer as reusable presentation pieces, while server identity, persistence, document processing, and Raze retrieval must be introduced deliberately.

### Work started

- Added the first relational migration draft and a checksum-aware, advisory-locked migration runner.
- Added a third migration for structured study artifacts, linked to the exact immutable source document version.
- Added a PostgreSQL connection pool module and environment configuration examples.
- Added a provider-neutral OpenID Connect Authorization Code + PKCE sign-in flow, verified-email domain allowlisting, database-backed sessions, server role provisioning, workspace/API session gates, and a dedicated auth-session migration.
- Added a server-side PDF.js extraction/chunking module that preserves page numbers and marks empty-text pages for OCR.
- Added authenticated private PDF upload/list/file APIs, version and processing-job records, per-user browser-local preference namespaces, and a private filesystem development store.
- Added a separate retrying document worker that extracts pages, chunks by page, requests 768-dimensional Gemini embeddings, and persists full-text plus vector indexes.
- Connected Raze to the explicitly selected, server-authorized indexed document. Retrieval fuses PostgreSQL full-text and pgvector ranks; the response carries source page, section, and immutable version citations into the chat UI.
- Added page-jump citation controls, a private saved-artifact library with removal, document processing progress, actionable failure explanations and retry, result counts, removable filter chips, keyboard search, skip navigation, visible focus states, and reduced-motion support.
- Current phase status: Phase 1 and initial vertical slices of Phases 2–4 are coded, but not deployment-verified. OCR, semantic reranking, multi-document retrieval, artifact page-level provenance, formal evaluation, audit events, moderation flows, and production object storage remain open.
- The migrations have not been applied: this environment has no PostgreSQL service or `psql`/Docker executable. OIDC issuer/client credentials and a database URL are also absent, so live sign-in, uploads, worker processing, and retrieval cannot yet run end to end. The current filesystem driver is development-only.

## First vertical slice

Deliver this before agent autonomy: verified student identity → upload private PDF → persist version and processing job → extract/index pages asynchronously → ask a question against that document → receive a page citation. Then add a published Campus resource and explicitly selected second document to prove shared-resource authorization and cross-document retrieval.

Do not advance a phase based on a working screen alone. Use each phase's exit gate as the release criterion.
