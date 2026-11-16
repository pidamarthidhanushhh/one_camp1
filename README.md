# Campus — one_camp

Start the app with Node.js 22.13 or newer in the 22.x line, or Node.js 24 or newer. The PDF renderer does not support Node.js 23.

1. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to a newly created Gemini key.
2. Keep `.env` private; it is ignored by Git and the key is only read by the server. Revoke any key shared in chat and use a newly generated key.
3. Run `npm start` and open `http://localhost:3000`.

The landing page uses one sign-in form with a Student / Faculty & Admin role toggle:

- Student: `student@matrusri.edu.in` / `CampusStudent2026!`
- Faculty/admin: `admin@campus.demo` / `CampusAdmin2026!`

After sign-in, students are redirected to the standalone `/student` page and faculty/admin users to `/admin`. These are separate documents that do not include the login page; direct workspace URLs require a matching demo session in that browser tab.

These are public prototype credentials checked in browser JavaScript, not real authentication. The login form can reveal the password while typing; the account menu provides role-specific shortcuts and a confirmation before signing out. Admin controls are browser-local demonstrations; they do not secure data or provide server-side authorization. Do not use real passwords or sensitive information. Production sign-in requires a server-backed identity provider and role-based authorization.

Role-specific prototype workflows:

- **Appearance:** use the theme switch on the login screen or in either workspace to change the whole site, including Raze AI, between light and dark mode. The choice is saved in this browser and shared across Campus tabs.
- **Students:** discover and filter published campus resources, save materials, join a Crate with a code, read and acknowledge campus announcements and saved-material updates in the notification centre, rate useful resources, and submit PDFs to a moderation queue.
- **Faculty/admin:** review and approve/request changes to student uploads before publication, publish/remove campus announcements, create faculty Crates, reset their join codes, and view local resource/queue/Crate counters.
- **Sharing terms:** uploaders choose a sharing label; resource cards and previews surface it so students can distinguish study-only material from reuse permissions. The label is user-provided, not legally verified.

These features follow common learning-platform patterns: Google Classroom supports class join codes, announcements, shared materials, and instructor-managed coursework; OER Commons highlights resource licensing and educator feedback. See [Google Classroom overview](https://support.google.com/edu/classroom/answer/6020279?hl=en), [class creation](https://support.google.com/edu/classroom/answer/6020273?hl=en), [class announcements](https://support.google.com/edu/classroom/answer/6020270?hl=en), [joining with a class code](https://support.google.com/edu/classroom/answer/15605102?hl=en), and [OER Commons licensing and reuse](https://help.oercommons.org/support/solutions/articles/42000046846). Campus implements only a focused resource-library prototype, not assignments/grades, an institutional roster, shared server storage, or enforced permissions.

The discovery page defaults to Matrusri Engineering College and offers department, year, section, semester, and subject filters. CSE includes the subject and section examples supplied by the user; Civil, EEE, and ECE contain explicitly labeled sample curriculum data, with their section mappings pending confirmation. Year 1 maps to Semesters 1–2, Year 2 to 3–4, Year 3 to 5–6, and Year 4 semester mappings are pending confirmation. Sample faculty reviews are demo data and sort first by faculty score.

The Crates sidebar page demonstrates creating a faculty/admin classroom crate and joining by code (including sample code `MEC-CSE2`). Crates, memberships, resource metadata, and PDFs are saved only in the current browser; crate codes do not share content between students/devices yet. Real classrooms require authentication, server persistence, and authorized shared file storage.

PDF analysis is limited to 12 MB and uses Gemini on the server. Gemini infers a specific subject from the PDF and suggests a title, course/topic, tags, topics covered, focus topics, and quality score. Suggestions can be edited before adding the resource; summaries are not generated during upload. Clicking an uploaded resource opens a PDF.js-rendered page preview with page/zoom controls and its extracted topic list. The separate quick summary is created only when requested and summarizes the full PDF. The Python Basics prototype and uploaded resources identified as Python materials include topic selection, a short quiz, and flip-through flashcards limited to Python basics, installation, data types, and variables/expressions.

Raze has a dedicated student workspace with a dark, focused chat interface, an embedded study chat, on-demand quick reviews and longer 4–5 page-equivalent study guides, plus AI-generated quizzes, flashcards, and mock tests. In demo mode, uploaded PDFs and study state stay in the browser. In OIDC mode, a selected indexed document is searched server-side with PostgreSQL full-text and pgvector rankings; answers include clickable page citations tied to the exact document version. Saved guides, reviews, quizzes, flashcards, and mock tests are linked to source versions and appear in a personal study library. Practice answers are interactive; generated content should still be checked against course materials. The compact Raze chat remains available elsewhere in the student workspace.

The curriculum list is illustrative, not Matrusri's authoritative regulation or syllabus. References consulted: Matrusri Engineering College (`https://matrusri.edu.in/`), the JNTUH official syllabus catalogue (`https://jntuh.ac.in/syllabus`), and the Python beginner guide (`https://www.python.org/about/gettingstarted/`). Confirm exact branch subjects, sections, and year/semester mapping with the college before production use.

Resource metadata, crate memberships, and saves are stored in browser local storage; uploaded PDFs are stored in browser IndexedDB. This is not shared cloud storage. Browser storage is origin-specific, so use the same site address consistently (`localhost` and `127.0.0.1` have separate data). Closing a preview does not delete its PDF. Older/sample resources without an original uploaded PDF or topic analysis show an explicit unavailable message rather than invented document contents.

Run `npm test` for API validation tests. Tests do not call Gemini.

## Database and document foundation (coded, not deployment-verified)

The initial migrations are in `db/migrations/`: `0001_raze_document_foundation.sql` establishes organizations, memberships, document ownership and permission records, immutable document versions, processing jobs, extracted pages, searchable chunks, and collections; `0002_auth_sessions.sql` stores opaque session hashes; `0003_study_artifacts.sql` stores structured study outputs linked to source versions. They require PostgreSQL with pgvector installed.

`document-processing.mjs` extracts server-side PDF page text and page-aware overlapping chunks. `document-repository.mjs` now stores authenticated uploads in a private filesystem directory, records metadata/versions/jobs in PostgreSQL, lists only owner or approved permitted resources, and serves PDF bytes after access checks. The storage driver is local filesystem for development; production should point `PRIVATE_STORAGE_DIR` at a private persistent volume or replace it with an S3-compatible driver.

To apply migrations after provisioning a PostgreSQL database, set `DATABASE_URL` in `.env` and run `npm run db:migrate`. The runner serializes concurrent migration runs, records SHA-256 checksums, and refuses to silently accept edits to already-applied migrations. OIDC session, private document upload/list/file, failed-index retry, selected-document retrieval, and study artifact save/list/remove routes are database-backed. These migrations have not been applied in this environment. Moderation workflows, OCR, cloud object storage, and authenticated conversation history remain open.

For a no-cost presentation deployment, use the root `render.yaml` Blueprint. It serves the prototype with demo sign-in, no database, no paid disk, and no Gemini key. AI endpoints display a showcase-mode notice. The demo uses browser-local data and is not real authentication. Render's free web service sleeps after 15 minutes without traffic and its first request after sleep can take about a minute. For the paid, database-backed Google OIDC setup, use `render.production.yaml` and follow [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md). Shared resources, planner data, Crates, ratings, announcements, and moderation still need a later database-backed migration to sync across accounts and devices.

### OpenID Connect sign-in (coded, provider configuration required)

Set `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `OIDC_REDIRECT_URI`, `OIDC_ALLOWED_EMAIL_DOMAINS`, `SESSION_SECRET`, and the Campus organization settings in `.env`. Register the exact redirect URI with the provider. Outside production, `http://localhost` is accepted for local development; production requires HTTPS. Emails must be verified and match an allowed domain. New users receive the student role by default; list faculty and administrators in `CAMPUS_FACULTY_EMAILS` and `CAMPUS_ADMIN_EMAILS` or provision their database memberships. OIDC mode activates when `OIDC_ISSUER` is set and requires the database migration to be applied first.

The server uses Authorization Code with PKCE, encrypted short-lived transaction cookies, state and nonce validation, and opaque server-side sessions whose hashes are stored in PostgreSQL. The app suppresses demo credential fields and client-side demo account values in OIDC mode. Start the separate indexing worker with `npm run worker`; it extracts page text, chunks it, requests normalized 768-dimensional Gemini embeddings, and stores both text and vectors. This worker sends extracted academic text to Gemini, so deploy it only after the organization approves that data processing. Scanned PDFs currently fail with an OCR-needed status rather than becoming searchable without text.
