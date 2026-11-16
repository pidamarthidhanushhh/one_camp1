-- Raze persistent document intelligence foundation.
-- Requires PostgreSQL with the pgvector extension available.
-- Apply through the project's migration runner after Phase 1 infrastructure is configured.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_issuer text NOT NULL,
  identity_subject text NOT NULL,
  email text NOT NULL,
  display_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (identity_issuer, identity_subject)
);

CREATE TABLE organization_memberships (
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
  department text,
  year smallint CHECK (year BETWEEN 1 AND 4),
  section text,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, user_id)
);

CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  owner_user_id uuid REFERENCES users(id) ON DELETE RESTRICT,
  source_kind text NOT NULL CHECK (source_kind IN ('campus_resource', 'personal_upload')),
  access_scope text NOT NULL CHECK (access_scope IN ('organization', 'department', 'crate', 'owner')),
  publication_state text NOT NULL DEFAULT 'pending'
    CHECK (publication_state IN ('pending', 'approved', 'changes_requested', 'removed')),
  title text NOT NULL,
  course text,
  subject text,
  department text,
  academic_year smallint CHECK (academic_year BETWEEN 1 AND 4),
  section text,
  semester smallint CHECK (semester BETWEEN 1 AND 8),
  tags text[] NOT NULL DEFAULT '{}',
  topics_covered text[] NOT NULL DEFAULT '{}',
  focus_topics text[] NOT NULL DEFAULT '{}',
  ai_score smallint CHECK (ai_score BETWEEN 0 AND 100),
  sharing_label text,
  lifecycle_state text NOT NULL DEFAULT 'uploaded'
    CHECK (lifecycle_state IN ('uploaded', 'validating', 'queued', 'extracting', 'chunking', 'embedding', 'indexing', 'ready', 'failed', 'quarantined', 'deleting', 'deleted')),
  active_version_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((source_kind = 'personal_upload' AND owner_user_id IS NOT NULL AND access_scope = 'owner') OR source_kind = 'campus_resource')
);

CREATE TABLE document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_number integer NOT NULL CHECK (version_number > 0),
  content_sha256 char(64) NOT NULL,
  object_key text NOT NULL,
  original_filename text NOT NULL,
  content_type text NOT NULL,
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  page_count integer CHECK (page_count > 0),
  extraction_config text,
  embedding_provider text,
  embedding_model text,
  embedding_dimensions integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_id, version_number),
  UNIQUE (document_id, content_sha256),
  UNIQUE (document_id, id)
);

ALTER TABLE documents
  ADD CONSTRAINT documents_active_version_fk
  FOREIGN KEY (id, active_version_id) REFERENCES document_versions(document_id, id)
  DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE document_permissions (
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  subject_kind text NOT NULL CHECK (subject_kind IN ('user', 'organization', 'department', 'crate')),
  subject_id text NOT NULL,
  permission text NOT NULL CHECK (permission IN ('read', 'manage')),
  granted_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (document_id, subject_kind, subject_id, permission)
);

CREATE TABLE document_processing_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_version_id uuid NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'validating', 'extracting', 'chunking', 'embedding', 'indexing', 'ready', 'failed', 'quarantined', 'cancelled')),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  locked_until timestamptz,
  last_error_code text,
  last_error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE document_pages (
  document_version_id uuid NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  page_number integer NOT NULL CHECK (page_number > 0),
  extracted_text text NOT NULL DEFAULT '',
  extraction_quality real CHECK (extraction_quality BETWEEN 0 AND 1),
  extraction_method text NOT NULL CHECK (extraction_method IN ('text', 'ocr', 'mixed', 'empty')),
  PRIMARY KEY (document_version_id, page_number)
);

CREATE TABLE document_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_version_id uuid NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  chunk_number integer NOT NULL CHECK (chunk_number >= 0),
  section_heading text,
  page_start integer NOT NULL CHECK (page_start > 0),
  page_end integer NOT NULL CHECK (page_end >= page_start),
  content text NOT NULL,
  search_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
  embedding vector(768),
  embedding_model text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_version_id, chunk_number)
);

CREATE TABLE document_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE document_collection_items (
  collection_id uuid NOT NULL REFERENCES document_collections(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (collection_id, document_id)
);

CREATE INDEX organization_memberships_user_idx ON organization_memberships(user_id);
CREATE INDEX documents_org_scope_state_idx ON documents(organization_id, access_scope, lifecycle_state);
CREATE INDEX documents_owner_idx ON documents(owner_user_id) WHERE owner_user_id IS NOT NULL;
CREATE INDEX document_versions_hash_idx ON document_versions(content_sha256);
CREATE INDEX processing_jobs_status_created_idx ON document_processing_jobs(status, created_at);
CREATE INDEX processing_jobs_ready_idx ON document_processing_jobs(next_attempt_at, created_at)
  WHERE status IN ('queued', 'failed');
CREATE INDEX document_pages_version_idx ON document_pages(document_version_id, page_number);
CREATE INDEX document_chunks_search_idx ON document_chunks USING gin(search_vector);
CREATE INDEX document_chunks_embedding_idx ON document_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX collection_items_document_idx ON document_collection_items(document_id);
