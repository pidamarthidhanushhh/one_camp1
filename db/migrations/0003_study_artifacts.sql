CREATE TABLE study_artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_document_version_id uuid NOT NULL REFERENCES document_versions(id) ON DELETE RESTRICT,
  artifact_kind text NOT NULL CHECK (artifact_kind IN ('study_guide', 'quick_review', 'flashcards', 'quiz', 'mock_test')),
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 180),
  content jsonb NOT NULL CHECK (jsonb_typeof(content) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX study_artifacts_owner_recent_idx
  ON study_artifacts (organization_id, owner_user_id, created_at DESC);
CREATE INDEX study_artifacts_source_idx ON study_artifacts (source_document_version_id);
