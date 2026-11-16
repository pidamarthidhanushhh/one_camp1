const initialResources = [
  {
    id: "python-basics-demo",
    title: "Python Basics — quick starter",
    subject: "Python",
    course: "Python Basics · Foundations",
    format: "Study set · 4 topics",
    rating: null,
    ratings: 0,
    aiScore: null,
    facultyScore: null,
    author: "Campus demo",
    summary: "",
    tags: ["Python Basics", "Getting started"],
    topicsCovered: [
      "Python Basics",
      "Installation",
      "Data types (int, float, bool, string, list)",
      "Variables and Expressions",
    ],
    focusTopics: [],
    cover: "cs",
    pythonBasicsDemo: true,
    college: "Matrusri Engineering College",
    department: "CSE",
    year: 1,
    section: "All sections",
    semester: 2,
    subject: "Python",
    facultyReviewed: true,
    facultyReviewer: "Demo faculty",
    isDemoData: true,
  },
  {
    id: "bio-cell-cycle",
    title: "Cell Biology — the visual guide",
    subject: "Biology",
    course: "BIO 204 · Cell biology",
    format: "PDF · 18 pages",
    rating: 4.9,
    ratings: 128,
    aiScore: 96,
    facultyScore: 4.8,
    author: "Maya Chen",
    summary: "A clear, diagram-led guide to cell structure, mitosis, and the cell cycle. The key processes are broken into short sections with labelled visuals and a concise recap at the end.",
    tags: ["Cell biology", "Diagrams", "Midterm prep"],
    cover: "biology",
  },
  {
    id: "cs-algorithms",
    title: "Algorithms, without the headache",
    subject: "Computer science",
    course: "CS 210 · Data structures",
    format: "PDF · 24 pages",
    rating: 4.8,
    ratings: 94,
    aiScore: 93,
    facultyScore: null,
    author: "Jordan Lee",
    summary: "Friendly walkthroughs of sorting, searching, and Big-O. Each concept comes with a worked example and a short practice problem, making it a solid quick review before the exam.",
    tags: ["Algorithms", "Worked examples", "Exam review"],
    cover: "cs",
  },
  {
    id: "business-cases",
    title: "A practical guide to case studies",
    subject: "Business",
    course: "BUS 301 · Strategy",
    format: "PDF · 12 pages",
    rating: 4.7,
    ratings: 76,
    aiScore: 91,
    facultyScore: 4.6,
    author: "Sam Patel",
    summary: "A compact framework for breaking down business cases, from defining the problem to presenting a recommendation. Includes annotated examples and a one-page checklist.",
    tags: ["Case studies", "Frameworks", "Quick read"],
    cover: "business",
  },
  {
    id: "design-principles",
    title: "Design principles: a field guide",
    subject: "Design",
    course: "DES 110 · Visual communication",
    format: "PDF · 16 pages",
    rating: 4.9,
    ratings: 112,
    aiScore: 95,
    facultyScore: null,
    author: "Emi Park",
    summary: "An approachable visual reference for hierarchy, contrast, balance, and whitespace. Strong examples make each principle memorable without overwhelming the reader.",
    tags: ["Visual design", "Examples", "Foundations"],
    cover: "design",
  },
  {
    id: "math-calculus",
    title: "Calculus II — integrals made clear",
    subject: "Mathematics",
    course: "MATH 202 · Integral calculus",
    format: "PDF · 21 pages",
    rating: 4.6,
    ratings: 63,
    aiScore: 89,
    facultyScore: 4.7,
    author: "Noah Williams",
    summary: "A step-by-step refresher on integration techniques, with worked examples and a short formula sheet. Most useful for revisiting methods before a problem set.",
    tags: ["Calculus", "Worked examples", "Formula sheet"],
    cover: "math",
  },
  {
    id: "bio-genetics",
    title: "Genetics: the exam-day cheat sheet",
    subject: "Biology",
    course: "BIO 204 · Genetics",
    format: "PDF · 9 pages",
    rating: 4.5,
    ratings: 51,
    aiScore: 88,
    facultyScore: null,
    author: "Ava Morgan",
    summary: "A concise review of inheritance patterns, Punnett squares, and core genetics vocabulary. Best used as a last-minute recap alongside your full lecture notes.",
    tags: ["Genetics", "Quick review", "Practice"],
    cover: "biology",
  },
];

const collegeName = "Matrusri Engineering College";
const sectionsByDepartment = {
  CSE: ["CSE-A", "CSE-B", "CSE-C", "CSE-D", "CSE-DS"],
  Civil: [],
  EEE: [],
  ECE: [],
};
const departmentCatalog = {
  CSE: {
    1: [{ subject: "DSA", semester: 1 }, { subject: "Python", semester: 2 }],
    2: [{ subject: "Probability and Statistics", semester: 3 }, { subject: "Software Engineering", semester: 4 }],
    3: [{ subject: "Operating Systems (OS)", semester: 5 }, { subject: "Social Network Security (SNS)", semester: 6 }],
    4: [{ subject: "Deep Learning (DL)", semester: null }, { subject: "Transformers", semester: null }],
  },
  Civil: {
    1: [{ subject: "Engineering Mechanics", semester: 1 }, { subject: "Engineering Geology", semester: 2 }],
    2: [{ subject: "Surveying", semester: 3 }, { subject: "Strength of Materials", semester: 4 }],
    3: [{ subject: "Geotechnical Engineering", semester: 5 }, { subject: "Structural Analysis", semester: 6 }],
    4: [{ subject: "Reinforced Concrete Design", semester: null }, { subject: "Transportation Engineering", semester: null }],
  },
  EEE: {
    1: [{ subject: "Circuit Theory", semester: 1 }, { subject: "Electrical Machines", semester: 2 }],
    2: [{ subject: "Power Systems", semester: 3 }, { subject: "Control Systems", semester: 4 }],
    3: [{ subject: "Power Electronics", semester: 5 }, { subject: "Electrical Measurements", semester: 6 }],
    4: [{ subject: "Electrical Drives", semester: null }, { subject: "Renewable Energy Systems", semester: null }],
  },
  ECE: {
    1: [{ subject: "Electronic Devices and Circuits", semester: 1 }, { subject: "Digital Logic Design", semester: 2 }],
    2: [{ subject: "Signals and Systems", semester: 3 }, { subject: "Analog Circuits", semester: 4 }],
    3: [{ subject: "Digital Communications", semester: 5 }, { subject: "Microprocessors and Microcontrollers", semester: 6 }],
    4: [{ subject: "VLSI Design", semester: null }, { subject: "Embedded Systems", semester: null }],
  },
};
const demoFaculty = {
  CSE: "Dr. Ananya Rao",
  Civil: "Prof. K. Srinivas",
  EEE: "Dr. Meera Reddy",
  ECE: "Prof. S. Kumar",
};

function createCollegeDemoResources() {
  let resourceNumber = 0;
  return Object.entries(departmentCatalog).flatMap(([department, years]) =>
    Object.entries(years).flatMap(([year, courses]) =>
      courses.map(({ subject, semester }, courseIndex) => {
        resourceNumber += 1;
        const facultyScore = 4.6 + ((resourceNumber * 7) % 5) / 10;
        return {
          id: `mec-demo-${department.toLowerCase()}-${year}-${courseIndex + 1}`,
          title: `${subject} · Faculty starter notes`,
          subject,
          course: `${department} · Year ${year}${semester ? ` · Sem ${semester}` : " · Semester mapping pending"}`,
          format: "Faculty resource · sample",
          rating: 4.4 + ((resourceNumber * 3) % 6) / 10,
          ratings: 18 + resourceNumber * 3,
          aiScore: 86 + (resourceNumber % 12),
          facultyScore,
          facultyReviewed: true,
          facultyReviewer: demoFaculty[department],
          author: demoFaculty[department],
          summary: `Illustrative faculty-reviewed starter material for ${subject}. This curriculum entry is sample data and should be checked against the current college syllabus.`,
          tags: [department, `Year ${year}`, subject],
          cover: department === "CSE" ? "cs" : department === "Civil" ? "other" : "math",
          college: collegeName,
          department,
          year: Number(year),
          section: "All sections",
          semester,
          isDemoData: true,
        };
      }),
    ),
  );
}

const collegeDemoResources = createCollegeDemoResources();
const defaultCrates = [{
  id: "mec-demo-cse-2",
  code: "MEC-CSE2",
  title: "CSE · Year 2 Faculty Materials",
  description: "Sample crate with Year 2 CSE curriculum resources. Enter code MEC-CSE2 to join.",
  department: "CSE",
  year: 2,
  section: "All sections",
  semester: null,
  creatorRole: "Faculty",
  creatorName: "Dr. Ananya Rao",
  createdAt: "2026-10-01T00:00:00.000Z",
  isDemoData: true,
}];

const storageKeys = {
  saved: "campus.saved.v1",
  uploads: "campus.uploads.v1",
  crates: "campus.crates.v1",
  joinedCrates: "campus.joined-crates.v1",
  announcements: "campus.announcements.v1",
  readAnnouncements: "campus.read-announcements.v1",
  materialUpdates: "campus.material-updates.v1",
  readMaterialUpdates: "campus.read-material-updates.v1",
  ratings: "campus.resource-ratings.v1",
  recentlyViewedPdfs: "campus.recently-viewed-pdfs.v1",
  theme: "campus.theme.v1",
  planner: "campus.study-planner.v1",
  learningProgress: "campus.learning-progress.v1",
  learningActivities: "campus.learning-activity.v1",
  documentNotes: "campus.document-notes.v1",
};

const oidcMode = document.body.dataset.authMode === "oidc";
let storageNamespace = oidcMode ? null : "demo";
function scopedStorageKey(key) {
  if (key === storageKeys.theme) return key;
  if (oidcMode) return storageNamespace ? `${key}.user.${storageNamespace}` : null;
  return key;
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const state = {
  resources: [...collegeDemoResources, ...initialResources, ...readStorage(storageKeys.uploads, [])],
  saved: new Set(readStorage(storageKeys.saved, [])),
  userRole: null,
  view: "discover",
  query: "",
  filters: { department: "", year: "", section: "", semester: "", subject: "" },
  sortByRating: true,
  resourceFeed: "suggested",
  departmentFeed: "all",
  crates: readStorage(storageKeys.crates, defaultCrates),
  joinedCrates: new Set(readStorage(storageKeys.joinedCrates, [])),
  announcements: readStorage(storageKeys.announcements, []),
  readAnnouncements: new Set(readStorage(storageKeys.readAnnouncements, [])),
  materialUpdates: readStorage(storageKeys.materialUpdates, []),
  readMaterialUpdates: new Set(readStorage(storageKeys.readMaterialUpdates, [])),
  resourceRatings: readStorage(storageKeys.ratings, {}),
  recentlyViewedPdfIds: readStorage(storageKeys.recentlyViewedPdfs, []),
  chatMessages: loadChatMessages(),
  savedArtifacts: [],
  plannerTasks: readStorage(storageKeys.planner, []),
  plannerMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  selectedPlannerDate: localDateKey(new Date()),
  learningProgress: readStorage(storageKeys.learningProgress, {}),
  learningActivities: readStorage(storageKeys.learningActivities, []),
  documentNotes: readStorage(storageKeys.documentNotes, {}),
  libraryFilter: "all",
  libraryQuery: "",
  uploadFilter: "all",
  chatBusy: false,
  activeCrateId: null,
  activeResource: null,
  analyzedPdf: null,
  analysisController: null,
  summaryController: null,
  studyTool: null,
  razeSelectedResourceId: null,
  razeSummaryController: null,
  razeStudyTool: null,
  pdfDatabasePromise: null,
  pdfPreviewModule: null,
  pendingPdfPage: null,
  processingPollTimer: null,
  processingPollAttempts: 0,
  toastTimeout: null,
};

state.resources.forEach((resource) => {
  const savedRating = state.resourceRatings[resource.id];
  if (savedRating) {
    resource.rating = savedRating.rating;
    resource.ratings = savedRating.ratings;
  }
});

const grid = document.querySelector("#resource-grid");
const searchInput = document.querySelector("#search-input");
const savedCount = document.querySelector("#saved-count");
const toast = document.querySelector("#toast");
const uploadModal = document.querySelector("#upload-modal");
const detailModal = document.querySelector("#detail-modal");
const assistantPanel = document.querySelector("#study-buddy-panel");
const assistantLauncher = document.querySelector("#assistant-launcher");
const razeChatHost = document.querySelector("#raze-chat-host");
const assistantWidget = document.querySelector("#assistant-widget");
let loginRole = "student";
const demoAccounts = {
  student: { email: "student@matrusri.edu.in", password: "CampusStudent2026!", name: "Student Demo", initials: "ST" },
  admin: { email: "admin@campus.demo", password: "CampusAdmin2026!", name: "Campus Admin", initials: "CA" },
};

function showDemoSession(role, identity = null) {
  const account = identity
    ? {
      email: identity.email,
      name: identity.display_name || identity.email,
      initials: (identity.display_name || identity.email).split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(),
    }
    : demoAccounts[role];
  if (!account) return;
  if (identity) activateIdentityStorage(identity);
  const roleLabel = identity
    ? identity.role === "admin" ? "Campus administrator" : identity.role === "faculty" ? "Faculty" : "Student account"
    : role === "admin" ? "Faculty / admin demo" : "Student account";
  state.userRole = role;
  document.title = role === "admin" ? "Campus — Admin Workspace" : "Campus — Student Workspace";
  document.body.dataset.workspace = role;
  const loginPage = document.querySelector("#login-page");
  if (loginPage) loginPage.hidden = true;
  document.querySelector("#app-shell").hidden = false;
  document.querySelector("#assistant-widget").hidden = false;
  document.querySelector("#profile-name").textContent = account.name;
  document.querySelector("#profile-role").textContent = roleLabel;
  document.querySelector("#workspace-label").textContent = role === "admin" ? "Administration" : "Student space";
  document.querySelector("#sidebar-workspace-label").textContent = role === "admin" ? "GOVERNANCE" : "YOUR SPACE";
  document.querySelector("#profile-avatar").textContent = account.initials;
  document.querySelector("#topbar-avatar").textContent = account.initials;
  document.querySelector("#account-menu-avatar").textContent = account.initials;
  document.querySelector("#account-menu-name").textContent = account.name;
  document.querySelector("#account-menu-role").textContent = roleLabel;
  document.querySelectorAll("[data-account-role]").forEach((item) => {
    item.hidden = item.dataset.accountRole !== role;
  });
  closeAccountMenu();
  document.querySelector(".crate-create-card").hidden = role !== "admin";
  document.querySelector(".notification-menu").hidden = role !== "student";
  document.querySelectorAll(".student-nav-link").forEach((link) => {
    link.hidden = role !== "student";
  });
  document.querySelector(".admin-nav-link").hidden = role !== "admin";
  document.querySelector(".crates-nav-link").hidden = false;
  renderResources();
  setView(role === "admin" ? "admin" : "discover");
  if (identity) void loadPersistentDocuments();
}

function activateIdentityStorage(identity) {
  storageNamespace = identity.id;
  state.userId = identity.id;
  state.resources = [...collegeDemoResources, ...initialResources, ...readStorage(storageKeys.uploads, [])];
  state.saved = new Set(readStorage(storageKeys.saved, []));
  state.crates = readStorage(storageKeys.crates, defaultCrates);
  state.joinedCrates = new Set(readStorage(storageKeys.joinedCrates, []));
  state.announcements = readStorage(storageKeys.announcements, []);
  state.readAnnouncements = new Set(readStorage(storageKeys.readAnnouncements, []));
  state.materialUpdates = readStorage(storageKeys.materialUpdates, []);
  state.readMaterialUpdates = new Set(readStorage(storageKeys.readMaterialUpdates, []));
  state.resourceRatings = readStorage(storageKeys.ratings, {});
  state.recentlyViewedPdfIds = readStorage(storageKeys.recentlyViewedPdfs, []);
  state.chatMessages = loadChatMessages();
  state.plannerTasks = readStorage(storageKeys.planner, []);
  state.learningProgress = readStorage(storageKeys.learningProgress, {});
  state.learningActivities = readStorage(storageKeys.learningActivities, []);
  state.documentNotes = readStorage(storageKeys.documentNotes, {});
}

async function loadPersistentDocuments() {
  try {
    const response = await fetch("/api/documents", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) throw new Error("Could not load your saved documents.");
    const payload = await response.json();
    const localUploads = state.resources.filter((resource) => resource.isUploaded && !resource.serverBacked);
    state.resources = [...collegeDemoResources, ...initialResources, ...localUploads, ...(payload.documents || [])];
    renderResources();
    if (state.view === "admin") renderAdminDashboard();
    if (state.view === "raze") renderRazeResources(document.querySelector("#raze-material-query").value);
    void loadSavedStudyArtifacts();
    scheduleProcessingStatusRefresh();
  } catch (error) {
    console.error("Could not load server-backed Campus documents:", error);
    showToast(error.message || "Could not load saved documents.");
  }
}

function scheduleProcessingStatusRefresh() {
  clearTimeout(state.processingPollTimer);
  const pending = state.resources.some((resource) => resource.serverBacked && !["ready", "failed", "deleted"].includes(resource.processingStatus));
  if (!pending || state.processingPollAttempts >= 60) {
    if (!pending) state.processingPollAttempts = 0;
    state.processingPollTimer = null;
    return;
  }
  state.processingPollTimer = setTimeout(async () => {
    state.processingPollAttempts += 1;
    await loadPersistentDocuments();
    renderResources();
  }, 5_000);
}

async function loadSavedStudyArtifacts() {
  if (!oidcMode) return;
  try {
    const response = await fetch("/api/artifacts", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) throw new Error("Could not load saved study artifacts.");
    const payload = await response.json();
    state.savedArtifacts = Array.isArray(payload.artifacts) ? payload.artifacts : [];
    renderSavedStudyArtifacts();
  } catch (error) {
    console.error("Could not load saved Raze study artifacts:", error);
  }
}

function renderSavedStudyArtifacts() {
  const section = document.querySelector("#raze-saved-artifacts");
  if (!section) return;
  section.hidden = !state.savedArtifacts.length;
  section.innerHTML = state.savedArtifacts.length
    ? `<div class="raze-recent-heading"><div><span class="raze-section-kicker">YOUR STUDY LIBRARY</span><h3>Saved study artifacts</h3></div><span>${state.savedArtifacts.length} SAVED</span></div><div class="raze-saved-artifact-list">${state.savedArtifacts.map((artifact) => `<article class="raze-saved-artifact"><button type="button" class="raze-saved-artifact-open" data-open-saved-artifact="${escapeHtml(artifact.id)}"><span>${escapeHtml(artifact.kind.replaceAll("_", " "))}</span><strong>${escapeHtml(artifact.title)}</strong><small>${escapeHtml(artifact.document_title)} · version ${escapeHtml(artifact.version_number)}</small></button><button type="button" class="raze-saved-artifact-remove" data-delete-saved-artifact="${escapeHtml(artifact.id)}" aria-label="Remove ${escapeHtml(artifact.title)}">Remove</button></article>`).join("")}</div>`
    : "";
}

async function persistGeneratedArtifact(resource, kind, title, content) {
  if (!oidcMode || !resource.serverBacked) return false;
  const response = await fetch("/api/artifacts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ documentId: resource.id, kind: kind.replaceAll("-", "_"), title, content }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Could not save this study artifact.");
  state.savedArtifacts.unshift({ ...payload.artifact, document_title: resource.title, version_number: resource.versionNumber || 1 });
  state.savedArtifacts = state.savedArtifacts.slice(0, 100);
  renderSavedStudyArtifacts();
  return true;
}

async function restoreOidcSession() {
  const requestedRole = window.location.pathname === "/admin"
    ? "admin"
    : window.location.pathname === "/student"
      ? "student"
      : null;
  try {
    const response = await fetch("/api/session", { credentials: "same-origin", cache: "no-store" });
    if (response.status === 401) {
      if (requestedRole) window.location.replace("/");
      const params = new URLSearchParams(window.location.search);
      if (params.has("auth_error")) {
        setLoginFeedback("Campus sign-in could not be completed. Check account eligibility and try again.", "error");
        window.history.replaceState({}, "", "/");
      }
      return;
    }
    if (!response.ok) throw new Error("Campus sign-in is temporarily unavailable.");
    const identity = await response.json();
    const role = identity.role === "student" ? "student" : "admin";
    if (!requestedRole || requestedRole !== role) {
      window.location.replace(role === "admin" ? "/admin" : "/student");
      return;
    }
    showDemoSession(role, identity);
  } catch (error) {
    if (requestedRole) window.location.replace("/");
    else setLoginFeedback(error.message || "Campus sign-in is temporarily unavailable.", "error");
  }
}

function restoreDemoSession() {
  if (document.body.dataset.authMode === "oidc") {
    void restoreOidcSession();
    return;
  }
  try {
    const savedSession = JSON.parse(sessionStorage.getItem("campus.demo-session.v1"));
    const requestedRole = window.location.pathname === "/admin"
      ? "admin"
      : window.location.pathname === "/student"
        ? "student"
        : null;
    const hasValidSession = savedSession && demoAccounts[savedSession.role]?.email === savedSession.email;
    if (hasValidSession && !requestedRole) {
      window.location.replace(savedSession.role === "admin" ? "/admin" : "/student");
      return;
    }
    if (hasValidSession && requestedRole === savedSession.role) {
      showDemoSession(savedSession.role);
      return;
    }
    if (requestedRole) window.location.replace("/");
  } catch (error) {
    console.warn("Could not restore the demo sign-in.", error);
    if (window.location.pathname === "/student" || window.location.pathname === "/admin") {
      window.location.replace("/");
    }
  }
}

function setLoginRole(role) {
  const account = demoAccounts[role];
  if (!account) return;
  loginRole = role;
  const isAdmin = role === "admin";
  const form = document.querySelector("#login-form");
  form.classList.toggle("admin-login-card", isAdmin);
  document.querySelectorAll("[data-login-role]").forEach((button) => {
    const isSelected = button.dataset.loginRole === role;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  document.querySelector("#login-role-icon").innerHTML = isAdmin
    ? '<svg viewBox="0 0 24 24"><path d="M12 3 19 6v5c0 4.7-2.7 8-7 10-4.3-2-7-5.3-7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>'
    : '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20v-1.5a7.5 7.5 0 0 1 15 0V20z"/></svg>';
  document.querySelector("#login-role-eyebrow").textContent = isAdmin ? "FACULTY & ADMIN" : "FOR STUDENTS";
  document.querySelector("#login-role-title").textContent = isAdmin ? "Admin sign in" : "Student sign in";
  document.querySelector("#login-role-description").textContent = isAdmin
    ? "Create faculty Crates and organize materials for your students."
    : "Discover notes, save resources, and join your class Crates.";
  document.querySelector("#login-email-label").textContent = isAdmin ? "Admin email" : "College email";
  document.querySelector("#login-email").value = account.email;
  document.querySelector("#login-password").value = account.password;
  document.querySelector("#login-password").type = "password";
  document.querySelector("#toggle-password-visibility").textContent = "Show";
  document.querySelector("#toggle-password-visibility").setAttribute("aria-label", "Show password");
  document.querySelector("#toggle-password-visibility").setAttribute("aria-pressed", "false");
  document.querySelector("#login-submit").innerHTML = `Sign in as ${isAdmin ? "admin" : "student"} <span aria-hidden="true">→</span>`;
  document.querySelector("#demo-credential-title").textContent = `${isAdmin ? "Admin" : "Student"} demo credentials`;
  document.querySelector("#demo-credential-email").textContent = account.email;
  document.querySelector("#demo-credential-password").textContent = account.password;
  setLoginFeedback("");
}

function setLoginFeedback(message, stateName = "") {
  const feedback = document.querySelector(document.body.dataset.authMode === "oidc" ? "#oidc-feedback" : "#login-feedback");
  feedback.textContent = message;
  feedback.hidden = !message;
  if (stateName) feedback.dataset.state = stateName;
  else delete feedback.dataset.state;
}

function restoreLoginFeedback() {
  try {
    const message = sessionStorage.getItem("campus.login-feedback.v1");
    if (!message) return;
    sessionStorage.removeItem("campus.login-feedback.v1");
    setLoginFeedback(message, "success");
  } catch (error) {
    console.error("Could not restore the sign-in status message.", error);
    setLoginFeedback("You are signed out. Sign in again to continue.", "success");
  }
}

function signInDemo(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const role = loginRole;
  const account = demoAccounts[role];
  const email = form.elements.email.value.trim().toLowerCase();
  const password = form.elements.password.value;
  if (!account || email !== account.email || password !== account.password) {
    setLoginFeedback("Those demo credentials don’t match. Check the sample credentials below and try again.", "error");
    form.elements.password.focus();
    return;
  }
  try {
    sessionStorage.setItem("campus.demo-session.v1", JSON.stringify({ role, email }));
  } catch (error) {
    console.error("Could not save the demo sign-in session.", error);
    setLoginFeedback("Could not start the demo session. Check browser storage settings and try again.", "error");
    return;
  }
  setLoginFeedback(`Signing in to your ${role === "admin" ? "admin" : "student"} workspace…`, "success");
  document.querySelector("#login-submit").disabled = true;
  window.location.assign(role === "admin" ? "/admin" : "/student");
}

async function signOutDemo() {
  if (document.body.dataset.authMode === "oidc") {
    try {
      const response = await fetch("/auth/logout", { method: "POST", credentials: "same-origin" });
      if (!response.ok) throw new Error("Could not end this session.");
      state.userRole = null;
      window.location.replace("/");
    } catch (error) {
      const message = document.querySelector("#sign-out-error");
      message.textContent = error.message || "Could not end this session. Please try again.";
      message.hidden = false;
    }
    return;
  }
  try {
    sessionStorage.removeItem("campus.demo-session.v1");
  } catch (error) {
    console.error("Could not clear the demo sign-in session.", error);
    const message = document.querySelector("#sign-out-error");
    message.textContent = "Could not end this session. Check browser storage settings and try again.";
    message.hidden = false;
    return;
  }
  try {
    sessionStorage.setItem("campus.login-feedback.v1", "You’ve signed out successfully. Sign in again whenever you’re ready.");
  } catch (error) {
    console.warn("Could not save the sign-out confirmation message.", error);
  }
  state.userRole = null;
  state.view = "discover";
  document.body.removeAttribute("data-workspace");
  document.title = "Campus — your study space";
  window.location.replace("/");
}

function closeAccountMenu({ restoreFocus = false } = {}) {
  const menu = document.querySelector("#account-menu");
  const triggers = [document.querySelector("#profile-button"), document.querySelector("#topbar-profile-button")];
  if (!menu) return;
  const activeTrigger = triggers.find((trigger) => trigger?.dataset.accountMenuTrigger === "true") || triggers[0];
  menu.hidden = true;
  menu.style.left = "";
  menu.style.top = "";
  triggers.forEach((trigger) => {
    trigger?.setAttribute("aria-expanded", "false");
    if (trigger) trigger.dataset.accountMenuTrigger = "false";
  });
  if (restoreFocus) activeTrigger?.focus();
}

function positionAccountMenu(trigger) {
  const menu = document.querySelector("#account-menu");
  const anchor = trigger.getBoundingClientRect();
  const menuBounds = menu.getBoundingClientRect();
  const sidebar = document.querySelector(".sidebar");
  const sidebarBounds = sidebar.getBoundingClientRect();
  const sideTrigger = trigger.id === "profile-button";
  const intendedLeft = sideTrigger
    ? Math.max(anchor.right + 12, sidebarBounds.right + 14)
    : anchor.right - menuBounds.width;
  const left = Math.max(12, Math.min(intendedLeft, window.innerWidth - menuBounds.width - 12));
  const belowTop = anchor.bottom + 10;
  const aboveTop = anchor.top - menuBounds.height - 10;
  const top = belowTop + menuBounds.height <= window.innerHeight - 12
    ? belowTop
    : Math.max(12, aboveTop);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function toggleAccountMenu(event) {
  const menu = document.querySelector("#account-menu");
  const trigger = event.currentTarget;
  const triggers = [document.querySelector("#profile-button"), document.querySelector("#topbar-profile-button")];
  if (!menu.hidden) {
    closeAccountMenu();
    return;
  }
  triggers.forEach((item) => {
    item?.setAttribute("aria-expanded", String(item === trigger));
    if (item) item.dataset.accountMenuTrigger = item === trigger ? "true" : "false";
  });
  menu.hidden = false;
  positionAccountMenu(trigger);
  menu.querySelector("button:not([hidden])")?.focus();
}

function repositionAccountMenu() {
  const menu = document.querySelector("#account-menu");
  if (menu.hidden) return;
  const trigger = [document.querySelector("#profile-button"), document.querySelector("#topbar-profile-button")]
    .find((item) => item?.dataset.accountMenuTrigger === "true");
  if (trigger) positionAccountMenu(trigger);
}

function handleAccountAction(action) {
  closeAccountMenu();
  if (action === "notifications") {
    const panel = document.querySelector("#notification-panel");
    panel.hidden = false;
    document.querySelector("#notification-button").setAttribute("aria-expanded", "true");
    renderNotificationCenter();
    return;
  }
  setView(action);
  document.querySelector(".main-content").scrollTo({ top: 0, behavior: "smooth" });
}

function readStorage(key, fallback) {
  const storageKey = scopedStorageKey(key);
  if (!storageKey) return fallback;
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    return stored ?? fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from local storage.`, error);
    return fallback;
  }
}

function persist(key, value) {
  const storageKey = scopedStorageKey(key);
  if (!storageKey) return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
    return true;
  } catch (error) {
    showToast("Couldn't save this change in your browser.");
    console.error(`Could not write ${key} to local storage.`, error);
    return false;
  }
}

function applyTheme(theme) {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = resolvedTheme;
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const label = nextTheme === "dark" ? "Dark mode" : "Light mode";
    button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    button.setAttribute("aria-pressed", String(resolvedTheme === "dark"));
    button.querySelector(".theme-toggle-label").textContent = label;
    button.title = `Switch to ${nextTheme} theme`;
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    resolvedTheme === "dark" ? "#17191a" : "#f6f7f2",
  );
}

function setTheme(theme) {
  if (!persist(storageKeys.theme, theme)) return;
  applyTheme(theme);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function overallScore(resource) {
  const scores = [];
  if (resource.aiScore != null) scores.push({ value: resource.aiScore, weight: 0.6 });
  if (resource.rating != null) scores.push({ value: resource.rating * 20, weight: 0.25 });
  if (resource.facultyScore != null) scores.push({ value: resource.facultyScore * 20, weight: 0.15 });
  if (scores.length === 0) return 0;
  const totalWeight = scores.reduce((sum, score) => sum + score.weight, 0);
  return Math.round(scores.reduce((sum, score) => sum + score.value * score.weight, 0) / totalWeight);
}

function matchesDepartmentFeed(resource) {
  if (state.view !== "discover" || state.departmentFeed === "all") return true;
  const department = String(resource.department || "").trim().toLowerCase();
  const section = String(resource.section || "").trim().toLowerCase();
  const course = String(resource.course || "").trim().toLowerCase();
  switch (state.departmentFeed) {
    case "cse":
      return department === "cse" && section !== "cse-ds" && !course.includes("data science");
    case "data-science":
      return ["data science", "cse-ds", "cse data science"].includes(department)
        || (department === "cse" && (section === "cse-ds" || course.includes("data science")));
    case "eee":
      return ["eee", "electrical and electronics engineering"].includes(department);
    case "ece":
      return ["ece", "electronics and communication engineering"].includes(department);
    case "mech":
      return ["mech", "mechanical", "mechanical engineering", "me"].includes(department);
    case "civil":
      return ["civil", "civil engineering"].includes(department);
    default:
      return true;
  }
}

function getVisibleResources() {
  let visible = state.resources.filter((resource) => {
    const canSeeUnpublished = state.userRole === "admin" || state.view === "uploads";
    const isPublished = !resource.isUploaded || !resource.reviewStatus || resource.reviewStatus === "approved";
    if (!canSeeUnpublished && !isPublished) return false;
    const matchesFilters = Object.entries(state.filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "section" && resource.section === "All sections") return true;
      return String(resource[key] ?? "").toLowerCase() === value.toLowerCase();
    });
    const text = `${collegeName} ${resource.title} ${resource.subject} ${resource.course} ${resource.department || ""} ${resource.year ? `year ${resource.year}` : ""} ${resource.section || ""} ${resource.semester ? `semester ${resource.semester}` : ""} ${resource.tags?.join(" ") ?? ""} ${resource.facultyReviewer || ""}`.toLowerCase();
    const matchesQuery = !state.query || text.includes(state.query.toLowerCase());
    const matchesView = state.view !== "saved" || state.saved.has(resource.id);
    const matchesUploads = state.view !== "uploads" || resource.isUploaded;
    return matchesFilters && matchesQuery && matchesView && matchesUploads && matchesDepartmentFeed(resource);
  });

  if (state.view === "discover" && state.resourceFeed === "new") {
    visible = visible
      .filter((resource) => resource.isUploaded)
      .sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0));
  } else if (state.sortByRating) {
    visible = [...visible].sort((a, b) => {
      const facultyPriority = Number(b.facultyReviewed || b.facultyScore != null) - Number(a.facultyReviewed || a.facultyScore != null);
      if (facultyPriority) return facultyPriority;
      const facultyScoreDifference = (b.facultyScore ?? -1) - (a.facultyScore ?? -1);
      if (facultyScoreDifference) return facultyScoreDifference;
      return overallScore(b) - overallScore(a) || (b.rating ?? -1) - (a.rating ?? -1);
    });
  } else {
    visible = [...visible].sort((a, b) => {
      const facultyPriority = Number(b.facultyReviewed || b.facultyScore != null) - Number(a.facultyReviewed || a.facultyScore != null);
      if (facultyPriority) return facultyPriority;
      const facultyScoreDifference = (b.facultyScore ?? -1) - (a.facultyScore ?? -1);
      return facultyScoreDifference || (b.createdAt || "").localeCompare(a.createdAt || "");
    });
  }
  return visible;
}

function getNotifications() {
  const announcements = state.announcements
    .filter((announcement) => announcement.published !== false)
    .map((announcement) => ({
      id: announcement.id,
      kind: "announcement",
      title: announcement.title,
      body: announcement.body,
      author: announcement.author || "Campus admin",
      createdAt: announcement.createdAt,
      isRead: state.readAnnouncements.has(announcement.id),
    }));
  const materialUpdates = state.materialUpdates.map((update) => ({
    id: update.id,
    kind: "material",
    title: update.title,
    body: update.body,
    author: update.author || "Resource owner",
    createdAt: update.createdAt,
    isRead: state.readMaterialUpdates.has(update.id),
  }));
  return [...announcements, ...materialUpdates]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

function renderNotificationCenter() {
  const list = document.querySelector("#notification-list");
  if (!list) return;
  const notifications = getNotifications();
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;
  const button = document.querySelector("#notification-button");
  const count = document.querySelector("#notification-count");
  document.querySelector("#notification-dot").hidden = unreadCount === 0;
  count.hidden = unreadCount === 0;
  count.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
  button.setAttribute("aria-label", unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications");
  document.querySelector("#mark-all-notifications-read").disabled = unreadCount === 0;
  list.innerHTML = notifications.length
    ? notifications.map((notification) => `
      <article class="student-announcement${notification.isRead ? " is-read" : ""}">
        <span class="announcement-icon" aria-hidden="true">${notification.kind === "material" ? "↻" : "✦"}</span>
        <div class="student-announcement-copy">
          <div class="announcement-meta"><strong>${escapeHtml(notification.title)}</strong><time>${new Date(notification.createdAt).toLocaleDateString()}</time></div>
          <p>${escapeHtml(notification.body)}</p>
          <span class="announcement-author">${escapeHtml(notification.author)} · ${notification.kind === "material" ? "Saved material update" : "Campus announcement"}</span>
        </div>
        <button class="announcement-read-button" type="button" data-mark-notification-read="${escapeHtml(notification.id)}" data-notification-kind="${notification.kind}" ${notification.isRead ? "disabled" : ""}>${notification.isRead ? "Read" : "Mark read"}</button>
      </article>`).join("")
    : '<div class="announcement-empty">You’re all caught up. Campus news and saved-material updates will appear here.</div>';
}

function recordSavedMaterialUpdate(resource, body, author = "Resource owner") {
  if (!state.saved.has(resource.id)) return;
  const update = {
    id: `material-update-${crypto.randomUUID()}`,
    resourceId: resource.id,
    title: resource.title,
    body,
    author,
    createdAt: new Date().toISOString(),
  };
  state.materialUpdates.unshift(update);
  state.materialUpdates = state.materialUpdates.slice(0, 100);
  if (!persist(storageKeys.materialUpdates, state.materialUpdates)) {
    state.materialUpdates = state.materialUpdates.filter((item) => item.id !== update.id);
    return;
  }
  renderNotificationCenter();
}

function markNotificationRead(kind, id) {
  if (state.userRole !== "student") return;
  const readIds = kind === "announcement" ? state.readAnnouncements : state.readMaterialUpdates;
  const storageKey = kind === "announcement" ? storageKeys.readAnnouncements : storageKeys.readMaterialUpdates;
  if (readIds.has(id)) return;
  readIds.add(id);
  if (!persist(storageKey, [...readIds])) {
    readIds.delete(id);
    return;
  }
  renderNotificationCenter();
}

function markAllNotificationsRead() {
  if (state.userRole !== "student") return;
  const previousAnnouncements = new Set(state.readAnnouncements);
  const previousMaterialUpdates = new Set(state.readMaterialUpdates);
  state.announcements.forEach((announcement) => state.readAnnouncements.add(announcement.id));
  state.materialUpdates.forEach((update) => state.readMaterialUpdates.add(update.id));
  const announcementsSaved = persist(storageKeys.readAnnouncements, [...state.readAnnouncements]);
  const updatesSaved = persist(storageKeys.readMaterialUpdates, [...state.readMaterialUpdates]);
  if (!announcementsSaved) state.readAnnouncements = previousAnnouncements;
  if (!updatesSaved) state.readMaterialUpdates = previousMaterialUpdates;
  renderNotificationCenter();
}

function resourceUpdateSignature(resource) {
  return JSON.stringify({
    title: resource.title,
    subject: resource.subject,
    course: resource.course,
    format: resource.format,
    summary: resource.summary,
    tags: resource.tags,
    topicsCovered: resource.topicsCovered,
    focusTopics: resource.focusTopics,
    license: resource.license,
    aiScore: resource.aiScore,
    facultyScore: resource.facultyScore,
  });
}

function syncUploadedResources(rawValue) {
  let uploads;
  try {
    uploads = rawValue ? JSON.parse(rawValue) : [];
    if (!Array.isArray(uploads)) throw new Error("Saved resources are not a list.");
  } catch (error) {
    console.error("Could not read updated resources from another Campus tab.", error);
    showToast("Could not load a resource update from another tab.");
    return;
  }
  const previousUploads = state.resources.filter((resource) => resource.isUploaded);
  const previousById = new Map(previousUploads.map((resource) => [resource.id, resource]));
  const incomingById = new Map(uploads.map((resource) => [resource.id, resource]));
  state.resources = [...collegeDemoResources, ...initialResources, ...uploads];
  state.resources.forEach((resource) => {
    const savedRating = state.resourceRatings[resource.id];
    if (savedRating) {
      resource.rating = savedRating.rating;
      resource.ratings = savedRating.ratings;
    }
  });
  if (state.userRole === "student") {
    uploads.forEach((resource) => {
      const previous = previousById.get(resource.id);
      if (
        previous &&
        state.saved.has(resource.id) &&
        resourceUpdateSignature(previous) !== resourceUpdateSignature(resource)
      ) {
        recordSavedMaterialUpdate(resource, "The owner updated details for a material in your library.", resource.author || "Resource owner");
      }
    });
  }
  renderResources();
  if (state.view === "admin") renderAdminDashboard();
  if (state.view === "uploads") renderUploadsPanel();
  if (state.activeResource) {
    state.activeResource = incomingById.get(state.activeResource.id) || state.activeResource;
  }
}

function renderAdminDashboard() {
  const stats = document.querySelector("#admin-stat-grid");
  const reviewList = document.querySelector("#admin-review-list");
  const pending = state.resources
    .filter((resource) => resource.isUploaded && resource.reviewStatus === "pending")
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  const publishedCount = state.resources.filter((resource) =>
    !resource.isUploaded || !resource.reviewStatus || resource.reviewStatus === "approved",
  ).length;
  stats.innerHTML = [
    { label: "Published resources", value: publishedCount, detail: "Includes clearly marked sample materials", icon: "▤" },
    { label: "Awaiting review", value: pending.length, detail: "New student uploads", icon: "◷" },
    { label: "Faculty Crates", value: state.crates.length, detail: "Saved in this browser", icon: "▦" },
    { label: "Joined Crates", value: state.joinedCrates.size, detail: "This browser only", icon: "↗" },
  ].map((stat) => `<article class="admin-stat-card"><span class="admin-stat-icon">${stat.icon}</span><span class="admin-stat-label">${stat.label}</span><strong>${stat.value}</strong><small>${stat.detail}</small></article>`).join("");
  document.querySelector("#review-queue-count").textContent = `${pending.length} pending`;
  reviewList.innerHTML = pending.length
    ? pending.map((resource) => `
      <article class="admin-review-item">
        <div class="admin-review-main"><span class="admin-review-type">${escapeHtml(resource.department || "Campus")} · ${escapeHtml(resource.subject)}</span><h4>${escapeHtml(resource.title)}</h4><p>${escapeHtml(resource.course)} · ${escapeHtml(resource.author || "Student")}</p></div>
        <div class="admin-review-actions"><button class="button button-light" type="button" data-review-resource="${escapeHtml(resource.id)}" data-review-status="changes_requested">Request changes</button><button class="button button-dark" type="button" data-review-resource="${escapeHtml(resource.id)}" data-review-status="approved">Approve &amp; publish</button></div>
      </article>`).join("")
    : '<div class="admin-empty"><strong>You’re all caught up.</strong><span>New student uploads will appear here for review.</span></div>';
  renderAdminAnnouncements();
}

function renderAdminAnnouncements() {
  const list = document.querySelector("#admin-announcement-list");
  if (!list) return;
  const announcements = [...state.announcements].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  list.innerHTML = announcements.length
    ? `<h4 class="admin-list-title">Published updates</h4>${announcements.map((announcement) => `
      <article class="admin-announcement-item"><div><strong>${escapeHtml(announcement.title)}</strong><p>${escapeHtml(announcement.body)}</p><time>${new Date(announcement.createdAt).toLocaleString()}</time></div><button class="admin-remove-button" type="button" data-delete-announcement="${escapeHtml(announcement.id)}" aria-label="Delete ${escapeHtml(announcement.title)}">Remove</button></article>`).join("")}`
    : '<div class="announcement-empty">No updates have been published yet.</div>';
}

function createAnnouncement(event) {
  event.preventDefault();
  if (state.userRole !== "admin") return;
  const form = event.currentTarget;
  const title = form.elements.title.value.trim();
  const body = form.elements.body.value.trim();
  if (!title || !body) return;
  const announcement = {
    id: `announcement-${crypto.randomUUID()}`,
    title,
    body,
    author: "Campus Admin",
    createdAt: new Date().toISOString(),
    published: true,
  };
  state.announcements.unshift(announcement);
  if (!persist(storageKeys.announcements, state.announcements)) {
    state.announcements.shift();
    return;
  }
  form.reset();
  document.querySelector("#announcement-status").textContent = "Update published to the student notification centre.";
  renderAdminDashboard();
  renderNotificationCenter();
}

function removeAnnouncement(id) {
  if (state.userRole !== "admin") return;
  const previous = state.announcements;
  state.announcements = previous.filter((announcement) => announcement.id !== id);
  if (!persist(storageKeys.announcements, state.announcements)) {
    state.announcements = previous;
    return;
  }
  state.readAnnouncements.delete(id);
  persist(storageKeys.readAnnouncements, [...state.readAnnouncements]);
  renderAdminDashboard();
  renderNotificationCenter();
}

function updateResourceReview(id, status) {
  if (state.userRole !== "admin" || !["approved", "changes_requested"].includes(status)) return;
  const resource = state.resources.find((item) => item.id === id && item.isUploaded);
  if (!resource) return;
  const previousStatus = resource.reviewStatus;
  const uploads = state.resources.filter((item) => item.isUploaded);
  resource.reviewStatus = status;
  if (!persist(storageKeys.uploads, uploads)) {
    resource.reviewStatus = previousStatus;
    return;
  }
  renderAdminDashboard();
  renderResources();
  recordSavedMaterialUpdate(
    resource,
    status === "approved"
      ? "Faculty reviewed this saved material and approved it for Discover."
      : "Faculty reviewed this saved material and requested changes.",
    "Campus faculty",
  );
  const notice = status === "approved"
    ? `${resource.title} is approved and now appears in Discover.`
    : `Changes requested for ${resource.title}. It remains in the student’s uploads.`;
  showToast(notice);
}

function resourceMarkup(resource) {
  const isSaved = state.saved.has(resource.id);
  const savedLabel = isSaved ? "Remove from my library" : "Save to my library";
  const faculty = resource.facultyScore == null
    ? ""
    : `<span class="faculty-mark"><span>✦</span> ${resource.facultyScore.toFixed(1)} faculty</span>`;
  const facultyLabel = resource.facultyScore == null
    ? ""
    : `<span class="faculty-pick-label">${resource.isUploaded ? "FACULTY REVIEWED" : "SAMPLE FACULTY REVIEW"}</span>`;
  const coverLabel = resource.isDemoData && resource.facultyScore != null
    ? "FACULTY SAMPLE"
    : "STUDY RESOURCE";
  const aiLabel = resource.aiScore == null ? "AI review pending" : `AI ${resource.aiScore}`;
  const aiClass = resource.aiScore == null ? " pending" : "";
  const ratingMarkup = resource.rating == null
    ? `<span class="rating-count">New upload</span>`
    : `<span class="rating-star" aria-hidden="true">★</span><span class="rating-score">${resource.rating.toFixed(1)}</span><span class="rating-count">(${resource.ratings})</span>`;
  const title = escapeHtml(resource.title);
  const subject = escapeHtml(resource.subject);
  const course = escapeHtml(resource.course);
  const format = escapeHtml(resource.format || "New upload");
  const license = escapeHtml(resource.license || "Sharing terms not specified");
  const reviewStatus = resource.reviewStatus === "pending"
    ? '<span class="upload-review-status pending">AWAITING REVIEW</span>'
    : resource.reviewStatus === "changes_requested"
      ? '<span class="upload-review-status changes">CHANGES REQUESTED</span>'
      : "";
  const processingStatus = resource.processingStatus && resource.processingStatus !== "ready"
    ? `<span class="processing-status processing-${escapeHtml(resource.processingStatus)}">${escapeHtml(({ queued: "INDEXING QUEUED", extracting: "READING PDF", chunking: "PREPARING PAGES", embedding: "INDEXING CONTENT", failed: "NEEDS ATTENTION", validating: "CHECKING FILE" })[resource.processingStatus] || resource.processingStatus.toUpperCase().replaceAll("_", " "))}</span>`
    : resource.serverBacked && resource.processingStatus === "ready" ? '<span class="processing-status processing-ready">READY FOR RAZE</span>' : "";
  const processingProgress = resource.serverBacked && resource.processingStatus && !["ready", "failed", "deleted"].includes(resource.processingStatus)
    ? `<div class="resource-processing-progress"><progress max="100" value="${({ queued: 18, validating: 30, extracting: 48, chunking: 65, embedding: 82, indexing: 92 })[resource.processingStatus] || 12}" aria-label="PDF processing progress"></progress><span>We’ll add this to Raze as soon as indexing finishes.</span></div>`
    : "";
  const processingRecovery = resource.serverBacked && resource.processingStatus === "failed"
    ? `<div class="processing-recovery"><span>${escapeHtml(resource.processingHelp || "This PDF needs attention before Raze can use it.")}</span>${resource.isUploaded ? `<button type="button" data-retry-document="${escapeHtml(resource.id)}">Retry indexing</button>` : ""}</div>`
    : "";

  return `
    <article class="resource-card" data-open-resource="${escapeHtml(resource.id)}">
      <div class="resource-cover cover-${escapeHtml(resource.cover || "other")}">
        <span class="cover-label">${subject.toUpperCase()} · ${coverLabel}</span>
        <span class="cover-title">${escapeHtml(resource.coverTitle || resource.subject)}</span>
        <span class="cover-decor"></span>
        <button class="save-button${isSaved ? " saved" : ""}" type="button" aria-label="${savedLabel}" aria-pressed="${isSaved}" data-save-resource="${escapeHtml(resource.id)}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.8L6 21z"/></svg>
        </button>
      </div>
      <div class="resource-info">
        <div class="resource-meta"><span class="subject-label">${subject}</span><span class="format-label">${format}</span></div>
        <h3 class="resource-title"><button class="resource-title-button" type="button" data-open-resource="${escapeHtml(resource.id)}">${title}</button></h3>
        <p class="resource-course">${course}</p>
        <p class="resource-license">${license}</p>
        ${reviewStatus}
        ${processingStatus}
        ${processingProgress}
        ${processingRecovery}
        <div class="resource-foot"><span class="rating-cluster">${ratingMarkup}</span><span class="ai-score${aiClass}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/></svg> ${aiLabel}</span></div>
        ${faculty ? `<div class="resource-meta faculty-resource-meta"><span class="faculty-mark">${faculty}</span>${facultyLabel}</div>` : ""}
      </div>
    </article>`;
}

function renderResources() {
  const visible = getVisibleResources();
  const isNewFeed = state.view === "discover" && state.resourceFeed === "new";
  document.querySelector("#resource-result-count").textContent = `${visible.length} ${visible.length === 1 ? "resource" : "resources"}${state.view === "uploads" ? " in your uploads" : state.view === "saved" ? " in your library" : " found"}`;
  const filterLabels = { department: "Department", year: "Year", section: "Section", semester: "Semester", subject: "Subject" };
  const activeFilters = Object.entries(state.filters).filter(([, value]) => value);
  document.querySelector("#active-filter-chips").innerHTML = activeFilters.map(([key, value]) => `<button class="active-filter-chip" type="button" data-clear-filter="${key}" aria-label="Remove ${filterLabels[key]} filter ${escapeHtml(value)}">${filterLabels[key]}: ${escapeHtml(value)} <span aria-hidden="true">×</span></button>`).join("");
  document.querySelector("#clear-filters").hidden = !activeFilters.length && !state.query && state.departmentFeed === "all";
  document.querySelectorAll("[data-resource-feed]").forEach((button) => {
    const isActive = button.dataset.resourceFeed === state.resourceFeed;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  document.querySelectorAll("[data-department-feed]").forEach((button) => {
    const isActive = button.dataset.departmentFeed === state.departmentFeed;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  document.querySelector("#resource-feed-hint").textContent = isNewFeed
    ? "Recently uploaded, faculty-approved materials"
    : "Picked using ratings and faculty reviews";
  document.querySelector("#sort-button").hidden = isNewFeed;
  savedCount.textContent = String(state.saved.size);
  if (visible.length === 0) {
    const emptyTitle = state.view === "saved"
      ? "Your library is ready for its first save."
      : isNewFeed && !state.query
        ? "No new materials just yet."
        : "No resources found just yet.";
    const emptyCopy = state.view === "uploads"
      ? "Share a resource and help your classmates out."
      : isNewFeed && !state.query
        ? "New, faculty-approved uploads will appear here."
        : "Try another search or choose a different subject.";
    const hasSearchFilters = Boolean(state.query || Object.values(state.filters).some(Boolean) || state.departmentFeed !== "all");
    const emptyAction = state.view === "uploads"
      ? '<button class="button button-light upload-trigger" type="button">Share a resource →</button>'
      : hasSearchFilters ? '<button class="button button-light" type="button" data-clear-discovery>Clear search and filters</button>' : "";
    grid.innerHTML = `<div class="empty-state"><strong>${emptyTitle}</strong>${emptyCopy}${emptyAction ? `<div class="empty-state-actions">${emptyAction}</div>` : ""}</div>`;
  } else {
    grid.innerHTML = visible.map(resourceMarkup).join("");
  }
}

function renderLibraryPanel() {
  const savedResources = state.resources.filter((resource) => state.saved.has(resource.id));
  const recentSaved = savedResources.filter((resource) => state.recentlyViewedPdfIds.includes(resource.id));
  const query = state.libraryQuery.trim().toLowerCase();
  let visible = state.libraryFilter === "recent" ? recentSaved : savedResources;
  if (query) visible = visible.filter((resource) => `${resource.title} ${resource.subject} ${resource.course} ${resource.tags?.join(" ") || ""}`.toLowerCase().includes(query));
  document.querySelector("#library-stats").innerHTML = [
    { icon: "▤", label: "On your shelf", value: savedResources.length, detail: "resources saved" },
    { icon: "◷", label: "Ready to revisit", value: recentSaved.length, detail: "opened recently" },
    { icon: "✦", label: "Courses represented", value: new Set(savedResources.map((resource) => resource.subject).filter(Boolean)).size, detail: "different subjects" },
  ].map((item) => `<article class="collection-stat-card"><span class="collection-stat-icon">${item.icon}</span><span><small>${item.label}</small><strong>${item.value}</strong><em>${item.detail}</em></span></article>`).join("");
  document.querySelectorAll("[data-library-filter]").forEach((button) => button.classList.toggle("active", button.dataset.libraryFilter === state.libraryFilter));
  document.querySelector("#library-results-label").textContent = `${visible.length} ${visible.length === 1 ? "resource" : "resources"}${state.libraryFilter === "recent" ? " opened recently" : " saved"}`;
  document.querySelector("#library-resource-grid").innerHTML = visible.length
    ? visible.map(resourceMarkup).join("")
    : `<div class="collection-empty"><span>${state.libraryFilter === "recent" ? "◷" : "▤"}</span><strong>${state.libraryFilter === "recent" ? "No recently opened saves" : query ? "No saved resources match that search" : "Your study shelf is ready"}</strong><p>${state.libraryFilter === "recent" ? "Open a saved resource and it will be easy to find here next time." : query ? "Try a different title, subject, or course." : "Save a useful course resource from Discover and it will be waiting here."}</p>${!savedResources.length ? '<button type="button" class="button button-blue" data-view="discover">Explore resources <span aria-hidden="true">→</span></button>' : ""}</div>`;
}

function renderUploadsPanel() {
  const uploads = state.resources.filter((resource) => resource.isUploaded).sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  const countFor = (status) => uploads.filter((resource) => (resource.reviewStatus || "approved") === status).length;
  const visible = state.uploadFilter === "all" ? uploads : uploads.filter((resource) => (resource.reviewStatus || "approved") === state.uploadFilter);
  document.querySelector("#upload-stats").innerHTML = [
    { icon: "▤", label: "Shared by you", value: uploads.length, detail: "total resources" },
    { icon: "◷", label: "In review", value: countFor("pending"), detail: "awaiting a decision" },
    { icon: "✓", label: "Published", value: countFor("approved"), detail: "visible to classmates" },
  ].map((item) => `<article class="collection-stat-card upload-stat-card"><span class="collection-stat-icon">${item.icon}</span><span><small>${item.label}</small><strong>${item.value}</strong><em>${item.detail}</em></span></article>`).join("");
  document.querySelectorAll("[data-upload-filter]").forEach((button) => button.classList.toggle("active", button.dataset.uploadFilter === state.uploadFilter));
  document.querySelector("#upload-results-label").textContent = `${visible.length} ${visible.length === 1 ? "resource" : "resources"}${state.uploadFilter === "all" ? " shared by you" : state.uploadFilter === "pending" ? " awaiting review" : state.uploadFilter === "approved" ? " published" : " needing changes"}`;
  document.querySelector("#upload-resource-grid").innerHTML = visible.length
    ? visible.map(resourceMarkup).join("")
    : `<div class="collection-empty"><span>${state.uploadFilter === "pending" ? "◷" : state.uploadFilter === "approved" ? "✓" : "↗"}</span><strong>${uploads.length ? "Nothing in this review stage" : "Your first contribution starts here"}</strong><p>${uploads.length ? "Choose another status above to see your other uploads." : "Share helpful course notes and keep track of their review right here."}</p>${!uploads.length ? '<button type="button" class="button button-dark upload-trigger">＋ Share your first resource</button>' : ""}</div>`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(state.toastTimeout);
  state.toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function persistLearningState() {
  persist(storageKeys.planner, state.plannerTasks);
  persist(storageKeys.learningProgress, state.learningProgress);
  persist(storageKeys.learningActivities, state.learningActivities.slice(0, 30));
}

function recordLearningActivity(action, details, resourceId = null) {
  state.learningActivities = [{ id: crypto.randomUUID(), action, details, resourceId, at: new Date().toISOString() }, ...state.learningActivities].slice(0, 30);
  persist(storageKeys.learningActivities, state.learningActivities);
  if (state.view === "discover") renderLearningDashboard();
}

function getResourceProgress(resourceId) {
  const progress = state.learningProgress[resourceId];
  if (!progress?.pageCount) return 0;
  return Math.max(0, Math.min(100, Math.round((progress.maxPage / progress.pageCount) * 100)));
}

function getStudyStreak() {
  const completeDates = new Set(state.plannerTasks.filter((task) => task.done).map((task) => task.dueDate));
  let cursor = new Date();
  if (!completeDates.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (completeDates.has(localDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function renderLearningDashboard() {
  const top = document.querySelector("#learning-dashboard-top");
  const viewedResource = state.recentlyViewedPdfIds.map((id) => state.resources.find((item) => item.id === id)).find(Boolean);
  const continueResource = viewedResource || state.resources.find((item) => item.serverBacked && item.processingStatus === "ready") || state.resources.find((item) => item.isUploaded || item.pythonBasicsDemo || !item.isDemoData) || null;
  const progress = continueResource ? getResourceProgress(continueResource.id) : 0;
  const streak = getStudyStreak();
  top.innerHTML = `<section class="continue-learning-card">
      <div class="continue-learning-copy"><span class="modal-eyebrow">${viewedResource ? "PICK UP WHERE YOU LEFT OFF" : "A GOOD PLACE TO START"}</span><h2>${continueResource ? escapeHtml(continueResource.title) : "Your next study session"}</h2><p>${continueResource ? `${escapeHtml(continueResource.subject || "Study material")} · ${progress ? `${progress}% of the PDF explored` : "Open your notes and begin"}` : "Choose a course resource and make a little progress today."}</p><div class="continue-progress-track"><span style="width:${progress}%"></span></div><button type="button" class="button button-blue" ${continueResource ? `data-open-resource="${escapeHtml(continueResource.id)}"` : `data-view="discover"`}>${viewedResource ? "Continue learning" : "Open a resource"}<span aria-hidden="true">→</span></button></div>
      <div class="continue-learning-art" aria-hidden="true"><span class="learning-art-spark">✦</span><span class="learning-art-page"><i></i><i></i><i></i><b></b></span><span class="learning-art-orbit"></span></div>
    </section>
    <section class="streak-card"><div class="streak-card-heading"><span class="streak-fire">♨</span><div><span class="modal-eyebrow">YOUR STUDY STREAK</span><h3>${streak} ${streak === 1 ? "day" : "days"}</h3></div></div><div class="streak-week-dots">${Array.from({ length: 7 }, (_, index) => {
      const date = new Date(); date.setDate(date.getDate() - (6 - index));
      const dateKey = localDateKey(date);
      const done = state.plannerTasks.some((task) => task.done && task.dueDate === dateKey);
      return `<span class="${done ? "complete" : ""}" aria-label="${done ? "Study session completed" : "No session completed"}"></span>`;
    }).join("")}</div><p>${streak ? "Lovely rhythm. Keep it going." : "A short session today starts your streak."}</p><button type="button" class="text-button" data-view="planner">Open your planner →</button></section>`;

  const grouped = new Map();
  state.resources.filter((resource) => !resource.isUploaded || !resource.reviewStatus || resource.reviewStatus === "approved")
    .forEach((resource) => {
      const subject = resource.subject || "Other courses";
      if (!grouped.has(subject)) grouped.set(subject, []);
      grouped.get(subject).push(getResourceProgress(resource.id));
    });
  const subjectColors = ["green", "coral", "sage"];
  const subjectProgress = [...grouped.entries()].slice(0, 3).map(([subject, values], index) => ({
    subject,
    progress: Math.round(values.reduce((sum, value) => sum + value, 0) / values.length),
    color: subjectColors[index],
  }));
  document.querySelector("#subject-progress-list").innerHTML = subjectProgress.length
    ? subjectProgress.map((item) => `<button type="button" class="subject-progress-item" data-filter-subject="${escapeHtml(item.subject)}"><span class="subject-progress-ring ${item.color}" style="--progress:${item.progress}%"><strong>${item.progress}%</strong></span><span class="subject-progress-name">${escapeHtml(item.subject)}</span><small>${item.progress ? "In progress" : "Ready when you are"}</small></button>`).join("")
    : '<div class="learning-empty-state">Explore a resource to start a subject progress ring.</div>';

  document.querySelector("#learning-activity-list").innerHTML = state.learningActivities.length
    ? state.learningActivities.slice(0, 4).map((activity) => `<button type="button" class="learning-activity-row"${activity.resourceId ? ` data-open-resource="${escapeHtml(activity.resourceId)}"` : ""}><span class="learning-activity-mark">${activity.action === "Completed a study task" ? "✓" : activity.action === "Finished a quiz" ? "✦" : "↗"}</span><span><strong>${escapeHtml(activity.action)}</strong><small>${escapeHtml(activity.details)}</small></span><time>${escapeHtml(new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(activity.at)))}</time></button>`).join("")
    : '<div class="learning-empty-state">Finish a short session or open a PDF. Your recent study activity will appear here.</div>';
}

function plannerMonthLabel(date) {
  return new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(date);
}

function renderStudyPlanner() {
  const month = state.plannerMonth;
  const grid = document.querySelector("#planner-calendar-grid");
  document.querySelector("#planner-month-label").textContent = plannerMonthLabel(month);
  const firstWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1 - firstWeekday);
  grid.innerHTML = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate); date.setDate(startDate.getDate() + index);
    const dateKey = localDateKey(date);
    const dayTasks = state.plannerTasks.filter((task) => task.dueDate === dateKey);
    const complete = dayTasks.length > 0 && dayTasks.every((task) => task.done);
    const inMonth = date.getMonth() === month.getMonth();
    const today = dateKey === localDateKey(new Date());
    const selected = dateKey === state.selectedPlannerDate;
    return `<button class="planner-day${inMonth ? "" : " outside-month"}${today ? " today" : ""}${selected ? " selected" : ""}${complete ? " all-complete" : ""}" type="button" role="gridcell" data-planner-date="${dateKey}" aria-label="${escapeHtml(new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(date))}${dayTasks.length ? `, ${dayTasks.length} study tasks` : ""}" aria-pressed="${selected}"><span class="planner-day-number">${date.getDate()}</span>${dayTasks.length ? `<span class="planner-day-task-count">${complete ? "✓" : dayTasks.length}</span><span class="planner-day-dots">${dayTasks.slice(0, 3).map((task) => `<i class="${task.done ? "done" : ""}"></i>`).join("")}</span>` : ""}</button>`;
  }).join("");

  const selectedDate = new Date(`${state.selectedPlannerDate}T12:00:00`);
  document.querySelector("#planner-task-date-label").textContent = localDateKey(selectedDate) === localDateKey(new Date()) ? "TODAY'S FOCUS" : "YOUR FOCUS";
  document.querySelector("#planner-task-date-title").textContent = new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long" }).format(selectedDate);
  document.querySelector("#planner-task-date").value = state.selectedPlannerDate;
  const tasks = state.plannerTasks.filter((task) => task.dueDate === state.selectedPlannerDate).sort((a, b) => Number(a.done) - Number(b.done));
  const completed = tasks.filter((task) => task.done).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  document.querySelector("#planner-completion-label").textContent = `${percent}% complete`;
  document.querySelector("#planner-completion-bar").style.width = `${percent}%`;
  document.querySelector("#planner-clear-completed").hidden = !completed;
  document.querySelector("#planner-task-list").innerHTML = tasks.length
    ? tasks.map((task) => `<article class="planner-task-row${task.done ? " task-done" : ""}"><button class="planner-task-check" type="button" data-toggle-planner-task="${escapeHtml(task.id)}" aria-label="${task.done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${task.done}">${task.done ? "✓" : ""}</button><div class="planner-task-copy"><strong>${escapeHtml(task.title)}</strong><p>${escapeHtml(task.description || task.subject || "A focused study session")}</p>${task.subject ? `<span>${escapeHtml(task.subject)}</span>` : ""}</div><span class="planner-task-duration">${escapeHtml(task.duration)}m</span><button class="planner-task-remove" type="button" data-remove-planner-task="${escapeHtml(task.id)}" aria-label="Remove ${escapeHtml(task.title)}">×</button></article>`).join("")
    : `<div class="planner-empty-state"><span>✦</span><strong>No tasks planned for this day</strong><small>Add a focused session, or ask Raze to help shape your week.</small><button class="button button-light" type="button" data-add-planner-task>Add a study task</button></div>`;

  const streak = getStudyStreak();
  document.querySelector("#planner-streak-card").innerHTML = `<div class="planner-streak-heading"><span class="streak-fire">♨</span><div><span class="modal-eyebrow">STUDY STREAK</span><h3>${streak} ${streak === 1 ? "day" : "days"}</h3></div><span class="streak-encouragement">${streak ? "Keep it up!" : "Start today"}</span></div><div class="streak-week-dots">${Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - 6 + index); const complete = state.plannerTasks.some((task) => task.done && task.dueDate === localDateKey(date)); return `<span class="${complete ? "complete" : ""}"></span>`; }).join("")}</div><p>Little and often works better than last-minute cramming.</p>`;
}

function openPlannerTaskForm() {
  const details = document.querySelector("#planner-add-task-details");
  details.open = true;
  document.querySelector("#planner-task-date").value = state.selectedPlannerDate;
  document.querySelector("#planner-task-title").focus();
}

function renderDocumentNotes() {
  const host = document.querySelector("#document-notes-list");
  if (!host || !state.activeResource) return;
  const notes = state.documentNotes[state.activeResource.id] || [];
  host.innerHTML = notes.length ? notes.map((note) => `<article class="document-note-card" data-note-color="${escapeHtml(note.color)}"><button class="document-note-page" type="button" data-note-page="${note.pageNumber}">Page ${note.pageNumber} <span>↗</span></button><p>${escapeHtml(note.text)}</p><button class="document-note-remove" type="button" data-remove-document-note="${escapeHtml(note.id)}" aria-label="Delete note">×</button></article>`).join("") : '<p class="topic-empty">Save a thought while you read. Your notes stay with this resource.</p>';
}

function currentPdfPage() {
  const match = document.querySelector("#pdf-page-label")?.textContent.match(/Page (\d+)/);
  return Number(match?.[1]) || 1;
}

function generateLocalStudyPlan() {
  const resource = state.resources.find((item) => item.id === state.razeSelectedResourceId) || state.resources.find((item) => item.serverBacked && item.processingStatus === "ready") || state.resources.find((item) => item.isUploaded || item.pythonBasicsDemo || !item.isDemoData);
  if (!resource) {
    showToast("Open a study resource first so Raze can plan around your course.");
    setView("discover");
    return;
  }
  const topics = resource.topicsCovered?.length ? resource.topicsCovered : [resource.subject || resource.title];
  const plan = [
    { offset: 0, title: `Review ${topics[0]}`, description: "Read the key pages and write down one question.", duration: 30 },
    { offset: 1, title: `Make flashcards for ${topics[1] || topics[0]}`, description: "Turn the most important terms into active recall prompts.", duration: 25 },
    { offset: 2, title: `Quiz yourself on ${resource.subject || resource.title}`, description: "Check what you remember, then revisit missed ideas.", duration: 30 },
  ];
  const today = new Date();
  const additions = plan.map((step) => {
    const due = new Date(today); due.setDate(today.getDate() + step.offset);
    return { id: crypto.randomUUID(), title: step.title, description: step.description, dueDate: localDateKey(due), subject: resource.subject || resource.course, duration: step.duration, done: false, sourceId: resource.id, createdAt: new Date().toISOString() };
  });
  state.plannerTasks = [...state.plannerTasks, ...additions];
  state.selectedPlannerDate = localDateKey(today);
  state.plannerMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  persistLearningState();
  recordLearningActivity("Created a 3-day study plan", resource.title, resource.id);
  renderStudyPlanner();
  showToast("A three-day plan is ready. Adjust any session to fit your week.");
}

function setView(view) {
  if (state.userRole === "admin" && !["admin", "crates"].includes(view)) {
    showToast("That workspace is available to student accounts.");
    return;
  }
  if (state.userRole === "student" && view === "admin") {
    showToast("Admin sign-in is required for the admin dashboard.");
    return;
  }
  state.view = view;
  const viewCopy = {
    discover: ["Discover", "A little more <em>in sync.</em>", "Find the notes, guides, and good advice your next study session needs.", "Picked for your next study session", "Faculty-reviewed resources rank first; student ratings add another signal."],
    planner: ["Study planner", "Make progress, <em>one session at a time.</em>", "A calm plan for your courses, study time, and next small win.", "Your study calendar", "A manageable plan helps you keep learning without cramming."],
    saved: ["My library", "Your own little <em>study shelf.</em>", "All the resources you’ve saved, ready when you need them.", "Saved for later", "Your trusted study picks, all in one place."],
    uploads: ["My uploads", "Good notes deserve to <em>travel.</em>", "Keep track of the resources you’ve shared with your campus.", "Your shared resources", "Resources you’ve added to your campus library."],
    raze: ["Raze AI", "Study smarter, <em>together.</em>", "Your campus-aware study partner.", "Raze AI", "Find materials, ask questions, and practice what you’re learning."],
    crates: ["Crates", "A classroom for <em>every course.</em>", "Join a faculty crate with a code, or create one for your students.", "Crates for your classes", "Curriculum resources organized by department, year, section, and semester."],
    admin: ["Admin", "A healthier <em>study community.</em>", "Review student uploads and keep everyone informed.", "Admin dashboard", "Review, publish, and organize resources for your campus."],
  }[view];

  document.querySelector("#breadcrumb-current").textContent = viewCopy[0];
  document.querySelector("#page-title").innerHTML = viewCopy[1];
  document.querySelector("#page-subtitle").textContent = viewCopy[2];
  document.querySelector("#resource-heading").textContent = viewCopy[3];
  document.querySelector("#resource-description").textContent = viewCopy[4];
  document.querySelector(".live-pill").innerHTML = `<span></span> ${view === "discover" ? "FACULTY REVIEWED · TOP RATED" : view === "saved" ? "SAVED RESOURCES" : view === "uploads" ? "YOUR UPLOADS" : view === "planner" ? "YOUR STUDY RHYTHM" : view === "raze" ? "YOUR STUDY PARTNER" : view === "admin" ? "CAMPUS OVERVIEW" : "CLASSROOM CRATES"}`;
  document.querySelectorAll(".nav-link[data-view]").forEach((link) => {
    const isActive = link.dataset.view === view;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
  document.querySelector(".hero-banner").hidden = view !== "discover";
  document.querySelector(".welcome-row").hidden = ["planner", "saved", "uploads"].includes(view);
  document.querySelector(".search-panel").hidden = ["crates", "admin", "raze", "planner", "saved", "uploads"].includes(view);
  document.querySelector("#curriculum-filter-panel").hidden = ["crates", "admin", "raze", "planner", "saved", "uploads"].includes(view) || document.querySelector("#curriculum-filter-panel").dataset.open !== "true";
  document.querySelector("#learning-dashboard").hidden = view !== "discover";
  document.querySelector("#resource-section").hidden = ["crates", "admin", "raze", "planner", "saved", "uploads"].includes(view);
  document.querySelector("#planner-view").hidden = view !== "planner";
  document.querySelector("#library-view").hidden = view !== "saved";
  document.querySelector("#uploads-view").hidden = view !== "uploads";
  document.querySelector("#resource-feed-toolbar").hidden = view !== "discover";
  document.querySelector("#crates-view").hidden = view !== "crates";
  document.querySelector("#admin-view").hidden = view !== "admin";
  document.querySelector("#raze-view").hidden = view !== "raze";
  document.querySelector(".welcome-row > .upload-trigger").hidden = ["crates", "admin", "raze", "planner", "uploads"].includes(view);
  document.body.dataset.studentView = view;
  setRazeChatDocked(view === "raze");
  if (view === "crates") renderCrates();
  else if (view === "admin") renderAdminDashboard();
  else if (view === "planner") renderStudyPlanner();
  else if (view === "saved") renderLibraryPanel();
  else if (view === "uploads") renderUploadsPanel();
  else if (view === "raze") {
    renderRazeResources(document.querySelector("#raze-material-query").value);
    renderSelectedRazeResource();
    renderRazeRecentPdfs();
  } else {
    if (view === "discover") renderLearningDashboard();
    renderResources();
  }
  renderNotificationCenter();
}

function setRazeChatDocked(isDocked) {
  if (!assistantPanel || !razeChatHost || !assistantWidget) return;
  if (isDocked) {
    assistantWidget.classList.add("is-docked");
    razeChatHost.append(assistantPanel);
    assistantPanel.classList.add("raze-chat-embedded");
    setAssistantOpen(true);
    return;
  }
  if (assistantPanel.parentElement === razeChatHost) {
    assistantWidget.insertBefore(assistantPanel, assistantLauncher);
  }
  assistantPanel.classList.remove("raze-chat-embedded");
  assistantWidget.classList.remove("is-docked");
  setAssistantOpen(false);
}

function getRazeResources(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  return state.resources
    .filter((resource) => {
      const isPublished = !resource.isUploaded || !resource.reviewStatus || resource.reviewStatus === "approved";
      if (!isPublished) return false;
      if (!terms.length) return true;
      const searchableText = `${resource.title} ${resource.subject} ${resource.course} ${resource.department || ""} ${resource.tags?.join(" ") || ""} ${resource.topicsCovered?.join(" ") || ""}`.toLowerCase();
      return terms.every((term) => searchableText.includes(term));
    })
    .sort((a, b) => {
      const reviewed = Number(b.facultyReviewed || b.facultyScore != null) - Number(a.facultyReviewed || a.facultyScore != null);
      return reviewed || overallScore(b) - overallScore(a) || (b.rating ?? 0) - (a.rating ?? 0);
    })
    .slice(0, 6);
}

function renderRazeResources(query = "") {
  const results = document.querySelector("#raze-material-results");
  if (!results) return;
  if (!query.trim()) {
    results.innerHTML = `<div class="raze-search-hint">Search notes, lectures, or course topics from across Campus.</div>`;
    return;
  }
  const matches = getRazeResources(query);
  if (!matches.length) {
    results.innerHTML = `<div class="raze-empty-results"><strong>No matching campus materials yet.</strong><span>Try a broader subject or topic. You can still ask Raze for study help.</span></div>`;
    return;
  }
  results.innerHTML = matches.map((resource, index) => {
    const isSelected = state.razeSelectedResourceId === resource.id;
    const score = overallScore(resource);
    const rating = resource.rating == null ? "New" : `★ ${resource.rating.toFixed(1)}`;
    const access = resource.isUploaded || resource.pythonBasicsDemo ? "AI study tools available" : "Listing only · no PDF attached";
    return `<button type="button" class="raze-result${isSelected ? " selected" : ""}" data-select-raze-resource="${escapeHtml(resource.id)}">
      <span class="raze-result-rank">${index + 1}</span>
      <span class="raze-result-copy"><strong>${escapeHtml(resource.title)}</strong><small>${escapeHtml(resource.subject)} · ${escapeHtml(resource.course)}</small><small>${escapeHtml(access)}</small></span>
      <span class="raze-result-score"><strong>${score ? `AI ${score}` : "AI review"}</strong><small>${escapeHtml(rating)}${resource.facultyScore == null ? "" : ` · Faculty ${resource.facultyScore.toFixed(1)}`}</small></span>
    </button>`;
  }).join("");
}

function renderRazeRecentPdfs() {
  const section = document.querySelector("#raze-recent-section");
  const list = document.querySelector("#raze-recent-list");
  const ids = Array.isArray(state.recentlyViewedPdfIds) ? state.recentlyViewedPdfIds : [];
  const recentResources = ids
    .map((id) => state.resources.find((resource) => resource.id === id))
    .filter(Boolean);
  section.hidden = recentResources.length === 0;
  list.innerHTML = recentResources.map((resource) => `
    <button class="raze-recent-item${state.razeSelectedResourceId === resource.id ? " selected" : ""}" type="button" data-select-raze-resource="${escapeHtml(resource.id)}">
      <span class="raze-recent-file" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 3.8A1.8 1.8 0 0 1 7.8 2h7.6L20 6.6v13.6a1.8 1.8 0 0 1-1.8 1.8H6a2 2 0 0 1-2-2z"/><path d="M14.5 2v5H20M8 12h8m-8 4h8"/></svg></span>
      <span class="raze-recent-copy"><strong>${escapeHtml(resource.title)}</strong><small>${escapeHtml(resource.subject)} · ${escapeHtml(resource.course)}</small></span>
      <span class="raze-recent-arrow" aria-hidden="true">↗</span>
    </button>`).join("");
}

function recordRecentlyViewedPdf(resource) {
  const previous = Array.isArray(state.recentlyViewedPdfIds) ? state.recentlyViewedPdfIds : [];
  const next = [resource.id, ...previous.filter((id) => id !== resource.id)].slice(0, 5);
  state.recentlyViewedPdfIds = next;
  if (!persist(storageKeys.recentlyViewedPdfs, next)) {
    state.recentlyViewedPdfIds = previous;
    return;
  }
  if (state.view === "raze") renderRazeRecentPdfs();
  recordLearningActivity("Opened a study resource", resource.title, resource.id);
}

function renderSelectedRazeResource() {
  const section = document.querySelector("#raze-selected-resource");
  const razePage = document.querySelector("#raze-view");
  const resource = state.resources.find((item) => item.id === state.razeSelectedResourceId);
  const contextLabel = document.querySelector("#chat-context span:last-child");
  if (!resource) {
    razePage.classList.remove("has-selection");
    section.hidden = true;
    section.replaceChildren();
    if (contextLabel) contextLabel.textContent = "No document connected";
    return;
  }
  razePage.classList.add("has-selection");
  if (contextLabel) {
    contextLabel.textContent = resource.isUploaded || resource.pythonBasicsDemo
      ? `Selected: ${resource.title}`
      : `Selected listing: ${resource.title} · PDF unavailable`;
  }
  const canGenerate = resource.isUploaded || resource.pythonBasicsDemo;
  section.hidden = false;
  section.innerHTML = `<div class="raze-selected-heading"><div><span class="modal-eyebrow">SELECTED MATERIAL</span><h3>${escapeHtml(resource.title)}</h3><p>${escapeHtml(resource.subject)} · ${escapeHtml(resource.course)}</p></div><div class="raze-selected-heading-actions"><button type="button" class="text-button" data-open-resource="${escapeHtml(resource.id)}">Open material</button><button type="button" class="text-button" data-clear-raze-resource>Clear</button></div></div>
    <div class="raze-selected-details"><span>${resource.facultyScore == null ? "Faculty score not yet available" : `✦ Faculty ${resource.facultyScore.toFixed(1)}`}</span><span>${resource.rating == null ? "No community ratings yet" : `★ ${resource.rating.toFixed(1)} community`}</span><span>AI score ${overallScore(resource) || "pending"}</span></div>
    ${canGenerate
      ? `<div class="raze-actions"><button type="button" class="button button-dark" data-raze-summary="quick">Quick review</button><button type="button" class="button button-light" data-raze-summary="study-guide">Create 4–5 page study guide</button><button type="button" class="button button-light" data-raze-tool="quiz">Make a quiz</button><button type="button" class="button button-light" data-raze-tool="flashcards">Make flashcards</button><button type="button" class="button button-light" data-raze-tool="mock-test">Build a mock test</button></div>`
      : `<div class="raze-material-unavailable"><strong>This listing has no attached PDF.</strong><span>AI summaries and practice need the actual document. Raze can still help you search, and the material details are available above.</span></div>`}
    <p class="raze-action-status" id="raze-action-status" role="status" aria-live="polite" hidden></p>
    <div class="raze-summary-result" id="raze-summary-result" hidden></div>`;
  const result = section.querySelector("#raze-summary-result");
  if (result && resource.studyGuide) {
    result.innerHTML = `<span class="modal-eyebrow">YOUR STUDY GUIDE</span>${renderChatMarkdown(resource.studyGuide)}`;
    result.hidden = false;
  } else if (result && resource.quickSummary) {
    result.innerHTML = `<span class="modal-eyebrow">QUICK REVIEW</span>${renderChatMarkdown(resource.quickSummary)}`;
    result.hidden = false;
  }
}

function getRazeStudyContext() {
  const resource = state.resources.find((item) => item.id === state.razeSelectedResourceId);
  if (!resource) return undefined;
  const summary = resource.studyGuide || resource.quickSummary || resource.summary || "";
  return {
    title: resource.title,
    course: resource.course,
    ...(oidcMode && resource.serverBacked ? { documentId: resource.id } : {}),
    summary: summary.slice(0, 5000),
    topics: (resource.topicsCovered || resource.tags || []).slice(0, 20),
  };
}

async function getRazePdfPayload(resource) {
  if (resource.pythonBasicsDemo) {
    return { topics: pythonTopicNames };
  }
  if (!resource.isUploaded) {
    throw new Error("This listing does not have a PDF available for AI study tools.");
  }
  const pdf = await getSavedResourcePdf(resource.id);
  if (!pdf) {
    throw new Error("The original PDF is unavailable on this device. Upload it again to use Raze study tools.");
  }
  return { pdfBase64: bytesToBase64(new Uint8Array(await pdf.arrayBuffer())) };
}

async function generateRazeSummary(mode) {
  const resource = state.resources.find((item) => item.id === state.razeSelectedResourceId);
  const status = document.querySelector("#raze-action-status");
  const resultElement = document.querySelector("#raze-summary-result");
  if (!resource || !status || !resultElement) return;
  state.razeSummaryController?.abort();
  const controller = new AbortController();
  state.razeSummaryController = controller;
  status.hidden = false;
  status.dataset.state = "loading";
  status.textContent = mode === "study-guide" ? "Reading the full PDF and creating your study guide…" : "Reviewing the material…";
  resultElement.hidden = true;
  try {
    const documentPayload = await getRazePdfPayload(resource);
    const response = await fetch("/api/generate-study-summary", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resourceTitle: resource.title, ...documentPayload, detailStyle: mode === "study-guide" }),
      signal: controller.signal,
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Summary generation failed (HTTP ${response.status}).`);
    if (state.razeSelectedResourceId !== resource.id) return;
    if (mode === "study-guide") resource.studyGuide = payload.summary;
    else resource.quickSummary = payload.summary;
    resource.topicsCovered = payload.topicsCovered;
    resultElement.innerHTML = `<span class="modal-eyebrow">${mode === "study-guide" ? "4–5 PAGE STUDY GUIDE" : "QUICK REVIEW"}</span>${renderChatMarkdown(payload.summary)}`;
    resultElement.hidden = false;
    if (resource.isUploaded) {
      const uploads = state.resources.filter((item) => item.isUploaded);
      if (!persist(storageKeys.uploads, uploads)) {
        throw new Error("The guide was created but could not be saved to this browser. Check storage and try again.");
      }
    }
    const savedRemotely = await persistGeneratedArtifact(
      resource,
      mode === "study-guide" ? "study_guide" : "quick_review",
      mode === "study-guide" ? `${resource.title} study guide` : `${resource.title} quick review`,
      { summary: payload.summary, topicsCovered: payload.topicsCovered || [] },
    );
    status.dataset.state = "success";
    status.textContent = `${mode === "study-guide" ? "Study guide" : "Quick review"} created from the selected material.${savedRemotely ? " Saved to your study library." : ""}`;
    renderRazeResources(document.querySelector("#raze-material-query").value);
  } catch (error) {
    if (error.name === "AbortError") return;
    status.dataset.state = "error";
    status.textContent = error.message || "Raze couldn’t create the study guide. Please try again.";
  }
}

async function generateRazePractice(kind) {
  const resource = state.resources.find((item) => item.id === state.razeSelectedResourceId);
  const status = document.querySelector("#raze-action-status");
  if (!resource || !status) return;
  status.hidden = false;
  status.dataset.state = "loading";
  status.textContent = `Creating your ${kind === "mock-test" ? "mock test" : kind} from the selected material…`;
  try {
    const documentPayload = await getRazePdfPayload(resource);
    const response = await fetch("/api/generate-study-tools", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resourceTitle: resource.title, tool: kind, ...documentPayload }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Could not create study practice (HTTP ${response.status}).`);
    if (state.razeSelectedResourceId !== resource.id) return;
    state.razeStudyTool = { kind, title: payload.title, items: payload.items, answers: {}, revealed: new Set(), known: new Set(), learning: new Set(), filter: "all", index: 0 };
    renderRazePractice();
    const savedRemotely = await persistGeneratedArtifact(resource, kind, payload.title, { items: payload.items });
    status.dataset.state = "success";
    status.textContent = `${payload.items.length} ${kind === "flashcards" ? "flashcards" : "questions"} created from the selected material.${savedRemotely ? " Saved to your study library." : ""}`;
  } catch (error) {
    status.dataset.state = "error";
    status.textContent = error.message || "Raze couldn’t create practice right now. Please try again.";
  }
}

function renderRazePractice() {
  const section = document.querySelector("#raze-practice-section");
  const tool = state.razeStudyTool;
  if (!tool) {
    section.hidden = true;
    section.replaceChildren();
    return;
  }
  section.hidden = false;
  if (tool.kind === "flashcards") {
    tool.known ||= new Set();
    tool.learning ||= new Set();
    tool.filter ||= "all";
    const visible = tool.items.map((_, index) => index).filter((index) => tool.filter === "still-learning" ? tool.learning?.has(index) : tool.filter === "unseen" ? !tool.known?.has(index) && !tool.learning?.has(index) : true);
    if (!visible.length) {
      section.innerHTML = `<div class="raze-practice-heading"><div><span class="modal-eyebrow">FLASHCARDS COMPLETE</span><h3>${escapeHtml(tool.title)}</h3></div><button type="button" class="text-button" data-clear-raze-tool>Close</button></div><p class="learning-empty-state">Nothing in this filter yet. Change filters to keep going.</p><div class="raze-card-filters">${["all", "unseen", "still-learning"].map((filter) => `<button type="button" data-raze-card-filter="${filter}" class="${tool.filter === filter ? "active" : ""}">${filter === "all" ? "All cards" : filter === "unseen" ? "Unseen" : "Still learning"}</button>`).join("")}</div>`;
      return;
    }
    const position = Math.min(tool.index || 0, visible.length - 1);
    const index = visible[position];
    const item = tool.items[index];
    tool.index = position;
    section.innerHTML = `<div class="raze-practice-heading"><div><span class="modal-eyebrow">FLASHCARDS · ${position + 1} OF ${visible.length}</span><h3>${escapeHtml(tool.title)}</h3></div><button type="button" class="text-button" data-clear-raze-tool>Close</button></div>
      <div class="raze-card-stats"><span>✓ ${tool.known?.size || 0} know it</span><span>↻ ${tool.learning?.size || 0} still learning</span><span>${tool.items.length - (tool.known?.size || 0) - (tool.learning?.size || 0)} remaining</span></div>
      <button type="button" class="raze-flashcard${tool.revealed.has(index) ? " revealed" : ""}" data-reveal-raze-card><strong>${renderChatMarkdown(tool.revealed.has(index) ? item.back : item.front)}</strong><small>${tool.revealed.has(index) ? "Answer · click to show prompt" : "Click to reveal answer"}</small></button>
      <div class="raze-practice-controls"><button type="button" class="button button-learning" data-raze-card-rate="learning"${!tool.revealed.has(index) ? " disabled" : ""}>↻ Still learning</button><button type="button" class="button button-known" data-raze-card-rate="known"${!tool.revealed.has(index) ? " disabled" : ""}>✓ Know it</button></div>
      <div class="raze-card-filters">${["all", "unseen", "still-learning"].map((filter) => `<button type="button" data-raze-card-filter="${filter}" class="${tool.filter === filter ? "active" : ""}">${filter === "all" ? "All cards" : filter === "unseen" ? "Unseen" : "Still learning"}</button>`).join("")}<button type="button" data-raze-card-shuffle>⤨ Shuffle</button></div>
      <div class="raze-practice-controls secondary"><button type="button" class="button button-light" data-raze-card-step="-1"${position === 0 ? " disabled" : ""}>Previous</button><button type="button" class="button button-dark" data-raze-card-step="1"${position >= visible.length - 1 ? " disabled" : ""}>Next card</button></div>`;
    return;
  }
  section.innerHTML = `<div class="raze-practice-heading"><div><span class="modal-eyebrow">${tool.kind === "mock-test" ? "MOCK TEST" : "QUICK QUIZ"} · ${tool.items.length} QUESTIONS</span><h3>${escapeHtml(tool.title)}</h3></div><button type="button" class="text-button" data-clear-raze-tool>Close</button></div>
    <div class="raze-question-list">${tool.items.map((item, index) => {
      const selected = tool.answers[index];
      const revealed = tool.revealed.has(index);
      const correct = selected === item.answerIndex;
      return `<article class="raze-question"><h4>${index + 1}. ${escapeHtml(item.question)}</h4><div class="raze-answer-options">${item.options.map((option, optionIndex) => `<button type="button" class="raze-answer-option${selected === optionIndex ? " chosen" : ""}${revealed && optionIndex === item.answerIndex ? " correct" : ""}${revealed && selected === optionIndex && !correct ? " incorrect" : ""}" data-raze-answer="${index}:${optionIndex}"${revealed ? " disabled" : ""}>${escapeHtml(option)}</button>`).join("")}</div>
        ${revealed ? `<p class="raze-answer-feedback" data-state="${correct ? "correct" : "incorrect"}">${correct ? "Correct. " : `Not quite. Correct answer: ${escapeHtml(item.options[item.answerIndex])}. `}${escapeHtml(item.explanation)}</p>` : `<button type="button" class="button button-light" data-check-raze-answer="${index}"${selected == null ? " disabled" : ""}>Check answer</button>`}</article>`;
    }).join("")}</div>`;
}

function addSelectOptions(select, options, selectedValue = "") {
  const fragment = document.createDocumentFragment();
  for (const { value, label } of options) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    fragment.append(option);
  }
  select.replaceChildren(fragment);
  if (options.some((option) => option.value === String(selectedValue))) select.value = String(selectedValue);
  else select.value = options[0]?.value || "";
}

function yearLabel(year) {
  return `${year}${year === 1 ? "st" : year === 2 ? "nd" : year === 3 ? "rd" : "th"} Year`;
}

function departmentOptions() {
  return Object.keys(departmentCatalog).map((department) => ({ value: department, label: department }));
}

function courseOptions(department, year) {
  const courses = Object.entries(departmentCatalog).flatMap(([branch, years]) =>
    Object.entries(years).flatMap(([classYear, courses]) =>
      courses.map((course) => ({ ...course, department: branch, year: Number(classYear) })),
    ),
  );
  return courses.filter((course) =>
    (!department || course.department === department) &&
    (!year || course.year === Number(year)),
  );
}

function updateCurriculumFilters() {
  const department = document.querySelector("#filter-department");
  const year = document.querySelector("#filter-year");
  const section = document.querySelector("#filter-section");
  const semester = document.querySelector("#filter-semester");
  const subject = document.querySelector("#filter-subject");

  addSelectOptions(department, [{ value: "", label: "All departments" }, ...departmentOptions()], state.filters.department);
  addSelectOptions(year, [{ value: "", label: "All years" }, ...[1, 2, 3, 4].map((item) => ({ value: String(item), label: yearLabel(item) }))], state.filters.year);
  const sectionValues = state.filters.department
    ? sectionsByDepartment[state.filters.department]
    : Object.values(sectionsByDepartment).flat();
  addSelectOptions(section, [
    { value: "", label: "All sections" },
    ...sectionValues.map((item) => ({ value: item, label: item.replace("-", " - ") })),
  ], state.filters.section);

  const semesters = [...new Set(courseOptions(state.filters.department, state.filters.year)
    .map((course) => course.semester)
    .filter((item) => item != null))].sort((a, b) => a - b);
  addSelectOptions(semester, [
    { value: "", label: "All semesters" },
    ...semesters.map((item) => ({ value: String(item), label: `Semester ${item}` })),
  ], state.filters.semester);

  const subjects = new Set(courseOptions(state.filters.department, state.filters.year)
    .filter((course) => !state.filters.semester || String(course.semester) === state.filters.semester)
    .map((course) => course.subject));
  state.resources.forEach((resource) => {
    if (
      resource.subject &&
      (!state.filters.department || resource.department === state.filters.department) &&
      (!state.filters.year || String(resource.year) === state.filters.year) &&
      (!state.filters.semester || String(resource.semester) === state.filters.semester)
    ) subjects.add(resource.subject);
  });
  addSelectOptions(subject, [
    { value: "", label: "All subjects" },
    ...[...subjects].sort((a, b) => a.localeCompare(b)).map((item) => ({ value: item, label: item })),
  ], state.filters.subject);
}

function updateAcademicFormOptions(prefix) {
  const department = document.querySelector(`#${prefix}-department`);
  const year = document.querySelector(`#${prefix}-year`);
  const section = document.querySelector(`#${prefix}-section`);
  const semester = document.querySelector(`#${prefix}-semester`);
  if (!department || !year || !section || !semester) return;

  const fallbackDepartment = prefix === "upload" ? "CSE" : "CSE";
  addSelectOptions(department, departmentOptions(), department.value || fallbackDepartment);
  const yearOptions = [1, 2, 3, 4].map((item) => ({ value: String(item), label: yearLabel(item) }));
  addSelectOptions(year, yearOptions, year.value || (prefix === "upload" ? "1" : "2"));
  const sections = sectionsByDepartment[department.value] || [];
  const sectionOptions = [
    { value: "All sections", label: "All sections" },
    ...sections.map((item) => ({ value: item, label: item.replace("-", " - ") })),
  ];
  addSelectOptions(section, sectionOptions, section.value || (prefix === "crate" ? "All sections" : sections.length ? "" : "All sections"));
  const semesters = courseOptions(department.value, year.value).map((course) => course.semester).filter((item) => item != null);
  addSelectOptions(semester, [
    { value: prefix === "crate" ? "all" : "", label: prefix === "crate" ? "Entire year" : "Choose semester" },
    ...[...new Set(semesters)].sort((a, b) => a - b).map((item) => ({ value: String(item), label: `Semester ${item}` })),
    ...(Number(year.value) === 4 ? [{ value: "unmapped", label: "Year 4 · mapping pending" }] : []),
  ], semester.value || (Number(year.value) === 4 ? "unmapped" : ""));
}

function crateMaterials(crate) {
  return state.resources.filter((resource) =>
    resource.college === collegeName &&
    resource.department === crate.department &&
    Number(resource.year) === Number(crate.year) &&
    (!crate.semester || String(resource.semester) === String(crate.semester)) &&
    (crate.section === "All sections" || resource.section === "All sections" || resource.section === crate.section),
  );
}

function renderCrates() {
  const list = document.querySelector("#crate-list");
  const joined = state.crates.filter((crate) => state.joinedCrates.has(crate.id));
  list.innerHTML = state.crates.length
    ? state.crates.map((crate) => {
      const isJoined = state.joinedCrates.has(crate.id);
      return `
        <article class="crate-card">
          <div class="crate-card-top"><span class="crate-mark">▦</span><span class="crate-card-code">${escapeHtml(crate.code)}</span></div>
          <h4>${escapeHtml(crate.title)}</h4>
          <p>${escapeHtml(crate.description || "Faculty-shared course resources.")}</p>
          <div class="crate-card-scope">${escapeHtml(crate.department)} · ${escapeHtml(yearLabel(Number(crate.year)))} · ${crate.semester ? `Sem ${escapeHtml(crate.semester)}` : "All semesters / mapping pending"}</div>
          <div class="crate-card-footer"><span>${isJoined ? `${crateMaterials(crate).length} materials` : `${escapeHtml(crate.creatorRole)} crate`}</span><button class="button ${isJoined ? "button-light" : "button-dark"}" type="button" ${isJoined ? `data-open-crate="${escapeHtml(crate.id)}"` : `data-join-code="${escapeHtml(crate.code)}"`}>${isJoined ? "Open crate" : "Join with code"}</button></div>
          ${state.userRole === "admin" ? `<button class="crate-reset-code" type="button" data-reset-crate-code="${escapeHtml(crate.id)}">Reset join code</button>` : ""}
        </article>`;
    }).join("")
    : '<div class="empty-state"><strong>No crates yet.</strong>Create a crate or join using a faculty code.</div>';

  const materialsSection = document.querySelector("#crate-materials-section");
  const crate = state.crates.find((item) => item.id === state.activeCrateId && state.joinedCrates.has(item.id));
  if (!crate) {
    state.activeCrateId = null;
    materialsSection.hidden = true;
    materialsSection.replaceChildren();
    return;
  }
  const resources = crateMaterials(crate);
  materialsSection.hidden = false;
  materialsSection.innerHTML = `
    <div class="crate-materials-heading"><div><span class="modal-eyebrow">JOINED CRATE · ${escapeHtml(crate.code)}</span><h3>${escapeHtml(crate.title)}</h3><p>${escapeHtml(crate.description || "Faculty-shared course materials.")}</p></div><button class="button button-light" type="button" id="close-crate-materials">Back to crates</button></div>
    ${resources.length
    ? `<div class="resource-grid crate-resource-grid">${resources.map(resourceMarkup).join("")}</div>`
    : '<div class="empty-state"><strong>No matching demo materials.</strong>Faculty can add resources after a real classroom backend is connected.</div>'}`;
  if (joined.length === 0) document.querySelector("#crate-materials-section").hidden = true;
}

function resetCrateCode(id) {
  if (state.userRole !== "admin") return;
  const crate = state.crates.find((item) => item.id === id);
  if (!crate) return;
  const previousCode = crate.code;
  crate.code = generateCrateCode();
  if (!persist(storageKeys.crates, state.crates)) {
    crate.code = previousCode;
    return;
  }
  renderCrates();
  renderAdminDashboard();
  showToast(`New join code for ${crate.title}: ${crate.code}`);
}

function joinCrate(code) {
  const normalizedCode = code.trim().toUpperCase().replace(/\s+/g, "");
  const crate = state.crates.find((item) => item.code.toUpperCase() === normalizedCode);
  const status = document.querySelector("#join-crate-status");
  if (!crate) {
    status.textContent = "We couldn’t find that code. Check it with your faculty and try again.";
    status.dataset.state = "error";
    return;
  }
  if (state.joinedCrates.has(crate.id)) {
    status.textContent = `You already joined ${crate.title}.`;
    status.dataset.state = "success";
    state.activeCrateId = crate.id;
    renderCrates();
    return;
  }
  state.joinedCrates.add(crate.id);
  if (!persist(storageKeys.joinedCrates, [...state.joinedCrates])) {
    state.joinedCrates.delete(crate.id);
    status.textContent = "Could not save your crate membership in this browser.";
    status.dataset.state = "error";
    return;
  }
  state.activeCrateId = crate.id;
  status.textContent = `Joined ${crate.title}.`;
  status.dataset.state = "success";
  renderCrates();
  renderAdminDashboard();
}

function createCrate(event) {
  event.preventDefault();
  if (state.userRole !== "admin") {
    showToast("Sign in with the faculty/admin demo account to create a crate.");
    return;
  }
  const department = document.querySelector("#crate-department").value;
  const year = Number(document.querySelector("#crate-year").value);
  const semesterValue = document.querySelector("#crate-semester").value;
  const crate = {
    id: `crate-${crypto.randomUUID()}`,
    code: generateCrateCode(),
    title: document.querySelector("#crate-title").value.trim(),
    description: document.querySelector("#crate-description").value.trim(),
    department,
    year,
    section: document.querySelector("#crate-section").value,
    semester: semesterValue && semesterValue !== "all" && semesterValue !== "unmapped" ? Number(semesterValue) : null,
    creatorRole: "Faculty / admin demo",
    creatorName: document.querySelector("#profile-name").textContent,
    createdAt: new Date().toISOString(),
    isDemoData: true,
  };
  const status = document.querySelector("#create-crate-status");
  state.crates.unshift(crate);
  if (!persist(storageKeys.crates, state.crates)) {
    state.crates.shift();
    status.textContent = "Could not save this crate in the browser. Check storage availability and try again.";
    status.dataset.state = "error";
    return;
  }
  document.querySelector("#crate-title").value = "";
  document.querySelector("#crate-description").value = "";
  status.innerHTML = `Crate created. Share this join code with students: <strong>${escapeHtml(crate.code)}</strong>`;
  status.dataset.state = "success";
  renderCrates();
  renderAdminDashboard();
}

function generateCrateCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const code = `MEC-${[...bytes].map((byte) => alphabet[byte % alphabet.length]).join("")}`;
  return state.crates.some((crate) => crate.code === code) ? generateCrateCode() : code;
}

function toggleSaved(id) {
  if (state.saved.has(id)) {
    state.saved.delete(id);
    showToast("Removed from your library.");
  } else {
    state.saved.add(id);
    showToast("Saved to your library.");
  }
  persist(storageKeys.saved, [...state.saved]);
  renderResources();
  if (state.view === "saved") renderLibraryPanel();
  if (state.activeResource?.id === id && detailModal.open) updateDetailSaveButton();
}

function saveResourceRating(score) {
  const resource = state.activeResource;
  if (state.userRole !== "student" || !resource) {
    showToast("Sign in as a student to rate study materials.");
    return;
  }
  if (!Number.isInteger(score) || score < 1 || score > 5) return;
  if (resource.isUploaded && resource.reviewStatus && resource.reviewStatus !== "approved") {
    showToast("This upload can be rated after it is approved.");
    return;
  }
  const previous = state.resourceRatings[resource.id];
  const count = resource.ratings || 0;
  const total = (resource.rating || 0) * count - (previous?.myRating || 0) + score;
  const nextCount = previous?.myRating ? count : count + 1;
  const nextRating = Math.round((total / nextCount) * 10) / 10;
  const nextRatings = {
    ...state.resourceRatings,
    [resource.id]: { rating: nextRating, ratings: nextCount, myRating: score },
  };
  if (!persist(storageKeys.ratings, nextRatings)) return;
  state.resourceRatings = nextRatings;
  resource.rating = nextRating;
  resource.ratings = nextCount;
  renderResources();
  document.querySelectorAll("[data-resource-rating]").forEach((button) => {
    const value = Number(button.dataset.resourceRating);
    button.classList.toggle("selected", value <= score);
    button.setAttribute("aria-pressed", String(value === score));
  });
  const communityStat = document.querySelectorAll(".detail-stat")[1];
  if (communityStat) {
    communityStat.querySelector("strong").textContent = `${nextRating.toFixed(1)} / 5`;
    communityStat.querySelector("small").textContent = `${nextCount} student ratings`;
  }
  document.querySelector("#resource-rating-status").textContent = `Thanks — your rating is ${score} out of 5. You can update it anytime.`;
}

function updateDetailSaveButton() {
  const button = document.querySelector("#detail-save-button");
  button.innerHTML = state.saved.has(state.activeResource.id) ? "Saved to my library ✓" : "Save to my library <span>↗</span>";
}

function supportsPythonStudyTools(resource) {
  if (resource.pythonBasicsDemo) return true;
  const searchableContent = [
    resource.title,
    resource.subject,
    resource.course,
    ...(resource.tags || []),
    ...(resource.topicsCovered || []),
  ].join(" ");
  return resource.isUploaded && /\bpython\b/i.test(searchableContent);
}

function openResource(id) {
  const resource = state.resources.find((item) => item.id === id);
  if (!resource) return;
  state.summaryController?.abort();
  state.summaryController = null;
  state.studyTool = null;
  state.activeResource = resource;
  document.querySelector("#detail-subject").textContent = `${resource.subject} · ${resource.course}`;
  document.querySelector("#detail-title").textContent = resource.title;
  const facultyValue = resource.facultyScore == null ? "Not rated" : `${resource.facultyScore.toFixed(1)} / 5`;
  const communityValue = resource.rating == null ? "New" : `${resource.rating.toFixed(1)} / 5`;
  const hasPythonStudyTools = supportsPythonStudyTools(resource);
  document.querySelector("#detail-content").innerHTML = `
    <div class="resource-preview-layout">
      <section class="pdf-preview-section">
        <div class="preview-section-heading"><div><span class="modal-eyebrow">RESOURCE PREVIEW</span><h3>Your PDF</h3></div><a class="pdf-open-link" id="pdf-open-link" target="_blank" rel="noopener" hidden>Open PDF ↗</a></div>
        <div class="pdf-preview-toolbar" id="pdf-preview-toolbar" hidden>
          <div class="pdf-page-controls">
            <button type="button" class="pdf-control-button" id="pdf-previous-page" aria-label="Previous PDF page" disabled>‹</button>
            <span id="pdf-page-label" aria-live="polite">Page 1 of 1</span>
            <button type="button" class="pdf-control-button" id="pdf-next-page" aria-label="Next PDF page" disabled>›</button>
          </div>
          <div class="pdf-zoom-controls">
            <button type="button" class="pdf-control-button" id="pdf-zoom-out" aria-label="Zoom out">−</button>
            <span id="pdf-zoom-label">100%</span>
            <button type="button" class="pdf-control-button" id="pdf-zoom-in" aria-label="Zoom in">+</button>
          </div>
        </div>
        <div class="pdf-preview-frame-wrap" id="pdf-preview-frame-wrap">
          <canvas id="pdf-preview-canvas" aria-label="Rendered PDF page" hidden></canvas>
          <p class="pdf-preview-empty" id="pdf-preview-empty">Loading PDF preview…</p>
        </div>
      </section>
      <div class="resource-ai-preview">
        <section class="ai-summary-panel">
          <span class="ai-panel-kicker">✦ AI STUDY GUIDE</span>
          <div class="summary-heading-row"><h3>Quick summary</h3><button class="button button-dark summary-create-button" id="create-ai-summary" type="button"${!resource.isUploaded && !resource.pythonBasicsDemo ? " disabled" : ""}>${resource.quickSummary ? "Regenerate AI summary" : "Create AI summary"}</button></div>
          <p class="summary-hint" id="summary-hint">${resource.pythonBasicsDemo
    ? "Optional · generated from the four Python Basics topics in this demo."
    : resource.isUploaded
      ? "Optional · generated from the full PDF when you choose."
      : "Upload a PDF to create an AI summary for this resource."}</p>
          <p class="detail-summary" id="ai-summary-result"${resource.quickSummary ? "" : " hidden"}>${escapeHtml(resource.quickSummary || "")}</p>
          <p class="summary-status" id="summary-status" role="status" aria-live="polite" hidden></p>
          <div class="detail-stats">
            <div class="detail-stat"><span>AI quality</span><strong>${resource.aiScore ?? "Pending"}</strong><small>Coverage &amp; clarity</small></div>
            <div class="detail-stat"><span>Community</span><strong>${communityValue}</strong><small>${resource.ratings ? `${resource.ratings} student ratings` : "Optional · not rated"}</small></div>
            <div class="detail-stat"><span>Faculty</span><strong>${facultyValue}</strong><small>${resource.facultyScore == null ? "Optional · not rated" : "Faculty review"}</small></div>
          </div>
          ${state.userRole === "student" && resource.isUploaded && resource.reviewStatus && resource.reviewStatus !== "approved"
    ? `<p class="upload-review-notice">${resource.reviewStatus === "pending" ? "This upload is waiting for a faculty/admin review before it appears in Discover." : "Faculty/admin requested changes. Your original upload is still saved in My uploads."}</p>`
    : state.userRole === "student"
      ? `<div class="student-rating-panel"><div><span class="modal-eyebrow">COMMUNITY FEEDBACK</span><h3>How helpful are these notes?</h3><p>Your rating helps classmates find useful material.</p></div><div class="resource-rating-controls" role="group" aria-label="Rate this resource">${[1, 2, 3, 4, 5].map((score) => `<button type="button" class="resource-rating-button${state.resourceRatings[resource.id]?.myRating >= score ? " selected" : ""}" data-resource-rating="${score}" aria-label="${score} out of 5 stars" aria-pressed="${state.resourceRatings[resource.id]?.myRating === score}">★</button>`).join("")}</div><p class="resource-rating-status" id="resource-rating-status" role="status" aria-live="polite">${state.resourceRatings[resource.id]?.myRating ? `Your rating: ${state.resourceRatings[resource.id].myRating} out of 5` : "Rating is optional; you can change it later."}</p></div>`
      : ""}
        </section>
        <section class="topic-list-panel">
          <div class="preview-section-heading"><div><span class="modal-eyebrow">FROM THE DOCUMENT</span><h3>Topics covered</h3></div><span class="topic-count">${resource.topicsCovered?.length || 0}</span></div>
          ${resource.topicsCovered?.length
    ? `<ul class="ai-topic-list">${resource.topicsCovered.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ul>`
    : '<p class="topic-empty">AI topic analysis is not available for this resource yet.</p>'}
        </section>
        <section class="topic-list-panel focus-panel">
          <div class="preview-section-heading"><div><span class="modal-eyebrow">STUDY PRIORITIES</span><h3>Focus on these</h3></div><span class="focus-mark">✦ AI</span></div>
          ${resource.focusTopics?.length
    ? `<ol class="ai-topic-list focus-topic-list">${resource.focusTopics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ol>`
    : '<p class="topic-empty">AI focus recommendations are not available for this resource yet.</p>'}
        </section>
        ${hasPythonStudyTools ? `
          <section class="topic-list-panel study-tools-panel">
            <div class="preview-section-heading"><div><span class="modal-eyebrow">${resource.pythonBasicsDemo ? "PYTHON BASICS · PROTOTYPE" : "PYTHON BASICS · QUICK PRACTICE"}</span><h3>Quick practice</h3></div><span class="focus-mark">4 topics</span></div>
            <p class="study-tools-copy">${resource.pythonBasicsDemo ? "Choose topics, then try a short quiz or flip through flashcards." : "Practice Python fundamentals from the notes you uploaded. Choose topics for a quick quiz or flashcards."}</p>
            <fieldset class="study-topic-options">
              <legend>Include topics</legend>
              ${pythonTopicNames.map((topic, index) => `<label><input type="checkbox" data-study-topic="${index}" checked><span>${escapeHtml(topic)}</span></label>`).join("")}
            </fieldset>
            <div class="study-tool-actions"><button class="button button-dark" id="start-python-quiz" type="button">Start quick quiz</button><button class="button button-light" id="start-python-flashcards" type="button">Study flashcards</button></div>
            <div id="study-tool-output" class="study-tool-output" aria-live="polite"></div>
          </section>` : ""}
        <section class="topic-list-panel document-notes-panel">
          <div class="preview-section-heading"><div><span class="modal-eyebrow">PDF LEARNING STUDIO</span><h3>Study notes</h3></div><span class="focus-mark">PAGE ${currentPdfPage()}</span></div>
          <form id="document-note-form" class="document-note-form"><label class="sr-only" for="document-note-input">Write a note for this page</label><textarea id="document-note-input" maxlength="600" rows="3" placeholder="Add a thought, question, or key takeaway…" required></textarea><div><label class="note-color-choice"><span>Label</span><select id="document-note-color"><option value="orange">Key idea</option><option value="purple">Question</option><option value="green">Remember</option><option value="blue">Example</option></select></label><button class="button button-blue" type="submit">Save page note</button></div></form>
          <div id="document-notes-list" class="document-notes-list"></div>
          <button type="button" class="button button-light document-ask-raze" data-ask-raze-resource="${escapeHtml(resource.id)}">Ask Raze about this PDF →</button>
        </section>
        <div class="resource-license-detail"><strong>Sharing terms</strong><span>${escapeHtml(resource.license || "Not specified — ask the contributor before reuse.")}</span></div>
        <div class="detail-tags">${(resource.tags || []).map((tag) => `<span class="detail-tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
    </div>`;
  updateDetailSaveButton();
  detailModal.showModal();
  renderDocumentNotes();
  void loadPdfPreview(resource);
}

const pythonTopicNames = [
  "Python Basics",
  "Installation",
  "Data types (int, float, bool, string, list)",
  "Variables and Expressions",
];

const pythonQuizQuestions = [
  {
    topic: 0,
    question: "What is Python?",
    options: ["A programming language", "A database", "A web browser"],
    answer: 0,
    explanation: "Python is a general-purpose programming language known for readable syntax.",
  },
  {
    topic: 1,
    question: "What is a sensible first step before running Python code locally?",
    options: ["Install Python from its official source", "Rename the computer", "Create a spreadsheet"],
    answer: 0,
    explanation: "Install a Python interpreter, then verify it is available from your terminal.",
  },
  {
    topic: 2,
    question: "Which value has the bool type?",
    options: ['"False"', "False", "0.5"],
    answer: 1,
    explanation: "False without quotes is a Boolean value; quoted text is a string.",
  },
  {
    topic: 3,
    question: "What does this expression evaluate to: 3 + 2 * 4?",
    options: ["20", "11", "14"],
    answer: 1,
    explanation: "Multiplication happens before addition, so 3 + (2 × 4) = 11.",
  },
];

const pythonFlashcards = [
  { topic: 0, front: "What does a Python interpreter do?", back: "It runs Python code by interpreting and executing its instructions." },
  { topic: 0, front: "What is a Python comment?", back: "A note for people reading the code; a single-line comment starts with #." },
  { topic: 1, front: "How can you check the installed Python version?", back: "Run `python --version` (or `python3 --version`) in a terminal." },
  { topic: 1, front: "What is pip commonly used for?", back: "Installing and managing Python packages." },
  { topic: 2, front: "What is the difference between 7 and 7.0?", back: "7 is an int; 7.0 is a float." },
  { topic: 2, front: "Which Python type stores an ordered, mutable collection?", back: "A list, usually written with square brackets, such as [1, 2, 3]." },
  { topic: 3, front: "What is a variable?", back: "A name bound to a value, for example `count = 3`." },
  { topic: 3, front: "What does operator precedence determine?", back: "The order in which parts of an expression are evaluated." },
];

function selectedPythonTopics() {
  return [...document.querySelectorAll("[data-study-topic]:checked")].map((checkbox) => Number(checkbox.dataset.studyTopic));
}

function renderStudyTool() {
  const output = document.querySelector("#study-tool-output");
  if (!output || !state.studyTool) return;
  const { mode, items, index, revealed, selectedChoice } = state.studyTool;
  if (items.length === 0) {
    output.innerHTML = '<p class="study-tool-message">Select at least one topic to begin.</p>';
    return;
  }
  const item = items[index];
  const topic = escapeHtml(pythonTopicNames[item.topic]);
  if (mode === "quiz") {
    output.innerHTML = `
      <div class="study-tool-progress">${index + 1} of ${items.length} · ${topic}</div>
      <h4 class="study-question">${escapeHtml(item.question)}</h4>
      <div class="quiz-options">${item.options.map((option, optionIndex) => {
    const answerClass = revealed && optionIndex === item.answer ? " is-correct" : revealed && optionIndex === selectedChoice ? " is-incorrect" : "";
    return `<button type="button" class="quiz-option${answerClass}" data-quiz-answer="${optionIndex}" ${revealed ? "disabled" : ""}>${escapeHtml(option)}</button>`;
  }).join("")}</div>
      <p class="quiz-feedback" id="quiz-feedback"${revealed ? "" : " hidden"}>${revealed ? escapeHtml(item.explanation) : ""}</p>
      <button type="button" class="button button-light study-next-button" id="study-next"${revealed ? "" : " hidden"}>${index + 1 === items.length ? "Finish quiz" : "Next question →"}</button>`;
  } else {
    output.innerHTML = `
      <div class="study-tool-progress">Flashcard ${index + 1} of ${items.length} · ${topic}</div>
      <button class="flashcard${revealed ? " flipped" : ""}" type="button" id="flashcard-toggle" aria-label="${revealed ? "Show flashcard question" : "Reveal flashcard answer"}">
        <span>${escapeHtml(revealed ? item.back : item.front)}</span>
        <small>${revealed ? "ANSWER · CLICK TO FLIP BACK" : "QUESTION · CLICK TO REVEAL"}</small>
      </button>
      <button type="button" class="button button-light study-next-button" id="study-next">${index + 1 === items.length ? "Finish cards" : "Next card →"}</button>`;
  }
}

function openPdfDatabase() {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("This browser does not support local PDF previews."));
  }
  if (!state.pdfDatabasePromise) {
    state.pdfDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("campus-resource-files", 1);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("pdfs")) {
          database.createObjectStore("pdfs", { keyPath: "resourceId" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Could not open local PDF storage."));
      request.onblocked = () => reject(new Error("Local PDF storage is blocked by another Campus tab."));
    });
  }
  return state.pdfDatabasePromise;
}

async function createResourceSummary() {
  const resource = state.activeResource;
  const button = document.querySelector("#create-ai-summary");
  const status = document.querySelector("#summary-status");
  const resultElement = document.querySelector("#ai-summary-result");
  if (!resource || !button || !status || !resultElement) return;

  state.summaryController?.abort();
  const controller = new AbortController();
  state.summaryController = controller;
  button.disabled = true;
  button.textContent = "Creating summary…";
  status.hidden = false;
  status.textContent = "Reading the material and preparing a concise overview…";
  status.dataset.state = "loading";

  try {
    let pdfBase64;
    if (resource.isUploaded) {
      const pdf = await getSavedResourcePdf(resource.id);
      if (!pdf) throw new Error("The original PDF is unavailable on this device. Upload it again to create a summary.");
      pdfBase64 = bytesToBase64(new Uint8Array(await pdf.arrayBuffer()));
    }

    const response = await fetch("/api/generate-study-summary", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        resourceTitle: resource.title,
        pdfBase64,
        topics: resource.pythonBasicsDemo ? pythonTopicNames : undefined,
      }),
      signal: controller.signal,
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Summary generation failed (HTTP ${response.status}).`);
    if (state.activeResource?.id !== resource.id || !detailModal.open) return;

    resource.quickSummary = payload.summary;
    resultElement.textContent = payload.summary;
    resultElement.hidden = false;
    const topicList = document.querySelector(".topic-list-panel:not(.focus-panel) .ai-topic-list");
    const topicCount = document.querySelector(".topic-list-panel:not(.focus-panel) .topic-count");
    if (Array.isArray(payload.topicsCovered) && topicList) {
      topicList.replaceChildren(...payload.topicsCovered.map((topic) => {
        const item = document.createElement("li");
        item.textContent = topic;
        return item;
      }));
      if (topicCount) topicCount.textContent = String(payload.topicsCovered.length);
    }
    if (resource.isUploaded) {
      const uploads = state.resources.filter((item) => item.isUploaded);
      persist(storageKeys.uploads, uploads);
    }
    status.textContent = resource.pythonBasicsDemo
      ? "AI summary created from the selected Python Basics topics."
      : "AI summary created from the full PDF.";
    status.dataset.state = "success";
    button.textContent = "Regenerate AI summary";
  } catch (error) {
    if (error.name === "AbortError") return;
    status.textContent = error.message || "Could not create the summary. Please try again.";
    status.dataset.state = "error";
  } finally {
    if (state.summaryController === controller) {
      state.summaryController = null;
      button.disabled = false;
      if (button.textContent === "Creating summary…") {
        button.textContent = resource.quickSummary ? "Regenerate AI summary" : "Create AI summary";
      }
    }
  }
}

async function getSavedResourcePdf(resourceId) {
  const resource = state.resources.find((item) => item.id === resourceId);
  if (oidcMode && resource?.serverBacked) {
    const response = await fetch(`/api/documents/${encodeURIComponent(resourceId)}/file`, {
      credentials: "same-origin",
      cache: "no-store",
    });
    if (!response.ok) throw new Error(response.status === 404 ? "This document is no longer available to this account." : "Could not load the private PDF.");
    return response.blob();
  }
  const database = await openPdfDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("pdfs", "readonly");
    const request = transaction.objectStore("pdfs").get(resourceId);
    request.onsuccess = () => resolve(request.result?.blob || null);
    request.onerror = () => reject(request.error || new Error("Could not load the saved PDF."));
  });
}

async function saveResourcePdf(resourceId, file) {
  const database = await openPdfDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction("pdfs", "readwrite");
    transaction.objectStore("pdfs").put({
      resourceId,
      fileName: file.name,
      blob: file,
      savedAt: new Date().toISOString(),
    });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Could not save this PDF on the device."));
    transaction.onabort = () => reject(transaction.error || new Error("Saving the PDF preview was cancelled."));
  });
}

async function loadPdfPreview(resource) {
  const canvas = document.querySelector("#pdf-preview-canvas");
  const emptyState = document.querySelector("#pdf-preview-empty");
  const openLink = document.querySelector("#pdf-open-link");
  const toolbar = document.querySelector("#pdf-preview-toolbar");
  canvas.hidden = true;
  toolbar.hidden = true;
  openLink.hidden = true;
  emptyState.hidden = false;
  emptyState.textContent = "Loading PDF preview…";

  try {
    const blob = await getSavedResourcePdf(resource.id);
    if (state.activeResource?.id !== resource.id || !detailModal.open) return;
    if (!blob) {
      state.pendingPdfPage = null;
      emptyState.textContent = "The original PDF is not stored for this resource in this browser. AI study details are shown alongside when available.";
      return;
    }

    state.pdfPreviewModule ??= import("./pdf-preview.js");
    const pdfPreview = await state.pdfPreviewModule;
    if (state.activeResource?.id !== resource.id || !detailModal.open) return;
    const temporaryUrl = URL.createObjectURL(blob);
    if (openLink.dataset.temporaryUrl) URL.revokeObjectURL(openLink.dataset.temporaryUrl);
    openLink.href = temporaryUrl;
    openLink.dataset.temporaryUrl = temporaryUrl;
    openLink.removeAttribute("download");
    openLink.setAttribute("aria-label", `Open ${resource.title} PDF in a new tab`);
    openLink.textContent = "Open original ↗";
    openLink.hidden = false;
    openLink.addEventListener("click", () => {
      URL.revokeObjectURL(temporaryUrl);
      delete openLink.dataset.temporaryUrl;
    }, { once: true });
    await pdfPreview.open(blob);
    if (state.pendingPdfPage != null && state.activeResource?.id === resource.id) {
      await pdfPreview.goToPage(state.pendingPdfPage);
      state.pendingPdfPage = null;
    }
    if (state.activeResource?.id !== resource.id || !detailModal.open) return;
    canvas.hidden = false;
    toolbar.hidden = false;
    emptyState.hidden = true;
    recordRecentlyViewedPdf(resource);
  } catch (error) {
    if (state.activeResource?.id !== resource.id || !detailModal.open) return;
    console.error("Could not load the resource PDF preview:", error);
    emptyState.textContent = error.message || "Could not load this PDF preview.";
    document.querySelector("#pdf-preview-canvas").hidden = true;
    document.querySelector("#pdf-preview-toolbar").hidden = true;
  }
}

function openUploadModal() {
  document.querySelector("#upload-form").reset();
  updateAcademicFormOptions("upload");
  document.querySelector("#file-name").textContent = "Choose a file or drag it here";
  document.querySelector("#subject-ai-hint").hidden = true;
  setAnalysisStatus("", "");
  state.analyzedPdf = null;
  state.analysisController?.abort();
  uploadModal.showModal();
}

function setAnalysisStatus(message, status, score) {
  const element = document.querySelector("#analysis-status");
  element.replaceChildren();
  element.hidden = !message;
  if (!message) {
    delete element.dataset.state;
    return;
  }
  element.dataset.state = status;
  const text = document.createElement("span");
  text.textContent = message;
  element.append(text);
  if (score != null) {
    const badge = document.createElement("strong");
    badge.className = "analysis-score";
    badge.textContent = `AI quality ${score}/100`;
    element.append(badge);
  }
}

function setUploadBusy(isBusy, busyLabel = "Analyzing PDF…") {
  const submitButton = document.querySelector("#submit-upload");
  submitButton.disabled = isBusy;
  submitButton.textContent = isBusy ? busyLabel : "Add to my uploads →";
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

async function analyzePdfFile(file) {
  state.analysisController?.abort();
  state.analyzedPdf = null;
  document.querySelector("#resource-title").value = file.name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ").trim();
  document.querySelector("#resource-subject").value = "";
  document.querySelector("#subject-ai-hint").hidden = true;
  document.querySelector("#resource-course").value = "";

  if (file.size > 12 * 1024 * 1024) {
    setAnalysisStatus("PDFs must be 12 MB or smaller.", "error");
    return;
  }
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    setAnalysisStatus("Choose a PDF file to use AI analysis.", "error");
    return;
  }

  const controller = new AbortController();
  state.analysisController = controller;
  setUploadBusy(true);
  setAnalysisStatus("Reading your PDF and generating editable suggestions…", "loading");

  try {
    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    if (
      pdfBytes.length < 5 ||
      String.fromCharCode(...pdfBytes.subarray(0, 5)) !== "%PDF-"
    ) {
      throw new Error("This file doesn’t contain a valid PDF header. Choose a readable PDF and try again.");
    }
    const pdfBase64 = bytesToBase64(pdfBytes);
    const response = await fetch("/api/analyze-pdf", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pdfBase64 }),
      signal: controller.signal,
    });
    let result;
    try {
      result = await response.json();
    } catch (error) {
      throw new Error(response.ok
        ? "The analysis server returned an unreadable response. Please retry."
        : `The analysis server returned HTTP ${response.status}. Make sure Campus is running with npm start.`);
    }
    if (!response.ok) {
      throw new Error(result.error || `PDF analysis failed (HTTP ${response.status}).`);
    }

    state.analyzedPdf = { fileName: file.name, ...result };
    document.querySelector("#resource-title").value = result.resourceTitle;
    document.querySelector("#resource-subject").value = result.subject;
    document.querySelector("#subject-ai-hint").hidden = false;
    document.querySelector("#resource-course").value = result.course;
    setAnalysisStatus("Suggestions are ready. Review and edit every field before sharing.", "success", result.aiScore);
  } catch (error) {
    if (error.name === "AbortError") return;
    setAnalysisStatus(error.message || "Could not analyze this PDF. Please try again.", "error");
  } finally {
    if (state.analysisController === controller) {
      state.analysisController = null;
      setUploadBusy(false);
    }
  }
}

function loadChatMessages() {
  const greeting = {
    role: "model",
    text: "Hi, I’m Raze. What are you studying, or what would you like me to explain?",
  };
  const chatStorageKey = oidcMode
    ? storageNamespace ? `campus.raze-chat.v1.user.${storageNamespace}` : null
    : "campus.raze-chat.v1";
  if (!chatStorageKey) return [greeting];
  try {
    const saved = JSON.parse(sessionStorage.getItem(chatStorageKey));
    if (
      !Array.isArray(saved) ||
      saved.length > 30 ||
      saved.some((message) =>
        !["user", "model"].includes(message?.role) ||
        typeof message.text !== "string" ||
        message.text.length === 0 ||
        message.text.length > 8000
      )
    ) return [greeting];
    return saved.length ? saved : [greeting];
  } catch (error) {
    console.warn("Could not restore the Raze conversation.", error);
    return [greeting];
  }
}

function persistChatMessages() {
  const chatStorageKey = oidcMode
    ? storageNamespace ? `campus.raze-chat.v1.user.${storageNamespace}` : null
    : "campus.raze-chat.v1";
  if (!chatStorageKey) return;
  try {
    sessionStorage.setItem(chatStorageKey, JSON.stringify(state.chatMessages.slice(-30)));
  } catch (error) {
    console.warn("Could not save the Raze conversation in this browser session.", error);
  }
}

function renderChatMarkdown(markdown) {
  const codeBlocks = [];
  const withPlaceholders = String(markdown).replace(/```([\w-]*)\n([\s\S]*?)```/g, (_match, language, code) => {
    const placeholder = `RAZECODEBLOCK${codeBlocks.length}TOKEN`;
    codeBlocks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ""}>${escapeHtml(code.trimEnd())}</code></pre>`);
    return placeholder;
  });
  let html = escapeHtml(withPlaceholders)
    .replace(/^### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^## (.+)$/gm, "<h3>$1</h3>")
    .replace(/^# (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/`([^`\n]+)`/g, "<code>$1</code>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/_([^_\n]+)_/g, "<em>$1</em>")
    .replace(/^(?:[-*]|\d+\.)\s+(.+)$/gm, "• $1")
    .replace(/\n/g, "<br>");
  codeBlocks.forEach((block, index) => {
    html = html.replace(`RAZECODEBLOCK${index}TOKEN`, block);
  });
  return html;
}

function renderChatMessages() {
  const messages = document.querySelector("#chat-messages");
  if (!messages) return;
  const hasConversation = state.chatMessages.some((message) => message.role === "user");
  document.querySelector("#raze-view")?.classList.toggle("has-conversation", hasConversation);
  const visibleMessages = state.view === "raze" && !hasConversation
    ? []
    : state.chatMessages;
  messages.innerHTML = visibleMessages.map((message) => `
    <article class="chat-message chat-message-${message.role}">
      <span class="chat-message-label">${message.role === "user" ? "You" : "Raze"}</span>
      <div class="chat-message-body">${renderChatMarkdown(message.text)}${Array.isArray(message.citations) && message.citations.length ? `<div class="chat-citations"><strong>Sources · select to open page</strong>${message.citations.map((citation) => `<button class="chat-citation-link" type="button" data-citation-document="${escapeHtml(citation.documentId)}" data-citation-page="${escapeHtml(citation.pageStart)}">[${escapeHtml(citation.id)}] ${escapeHtml(citation.title)}${citation.section ? ` · ${escapeHtml(citation.section)}` : ""} · ${citation.pageStart === citation.pageEnd ? `p. ${escapeHtml(citation.pageStart)}` : `pp. ${escapeHtml(citation.pageStart)}–${escapeHtml(citation.pageEnd)}`} · v${escapeHtml(citation.versionNumber)}</button>`).join("")}</div>` : ""}</div>
    </article>`).join("");
  messages.scrollTop = messages.scrollHeight;
}

function setChatStatus(message = "", stateName = "") {
  const status = document.querySelector("#chat-status");
  status.textContent = message;
  status.hidden = !message;
  status.dataset.state = stateName;
}

async function submitStudyPrompt(prompt) {
  const text = prompt.trim();
  if (!text || state.chatBusy) return;
  const input = document.querySelector("#chat-input");
  const submitButton = document.querySelector("#chat-form button[type='submit']");
  state.chatMessages.push({ role: "user", text });
  state.chatMessages = state.chatMessages.slice(-30);
  const recentMessages = state.chatMessages.slice(-16);
  while (
    recentMessages.length > 1 &&
    recentMessages.reduce((total, message) => total + message.text.length, 0) > 12_000
  ) recentMessages.shift();
  persistChatMessages();
  renderChatMessages();
  state.chatBusy = true;
  input.disabled = true;
  submitButton.disabled = true;
  setChatStatus("Raze is thinking…", "loading");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: recentMessages.map(({ role, text: messageText }) => ({ role, text: messageText })),
        studyContext: getRazeStudyContext(),
      }),
    });
    let result;
    try {
      result = await response.json();
    } catch (error) {
      throw new Error(response.ok
        ? "Raze returned an unreadable response. Please try again."
        : `The AI service returned HTTP ${response.status}. Please try again.`);
    }
    if (!response.ok) throw new Error(result.error || "Raze could not answer right now. Please try again.");
    if (typeof result.reply !== "string" || !result.reply.trim()) {
      throw new Error("Raze returned an empty response. Please try again.");
    }
    state.chatMessages.push({ role: "model", text: result.reply.trim(), citations: Array.isArray(result.citations) ? result.citations : [] });
    state.chatMessages = state.chatMessages.slice(-30);
    persistChatMessages();
    renderChatMessages();
    setChatStatus();
  } catch (error) {
    state.chatMessages.pop();
    persistChatMessages();
    renderChatMessages();
    input.value = text;
    setChatStatus(error.message || "Raze could not answer right now. Your message is ready to retry.", "error");
  } finally {
    state.chatBusy = false;
    input.disabled = false;
    submitButton.disabled = false;
    if (!document.querySelector("#chat-status").hidden) input.focus();
  }
}

function setAssistantOpen(isOpen) {
  assistantPanel.hidden = !isOpen;
  assistantLauncher.setAttribute("aria-expanded", String(isOpen));
  assistantLauncher.setAttribute("aria-label", isOpen ? "Close Raze chat" : "Open Raze chat");
  if (isOpen) {
    renderChatMessages();
    document.querySelector("#chat-input").focus();
  }
}

document.addEventListener("click", async (event) => {
  if (event.target.closest("[data-clear-discovery]")) {
    document.querySelector("#clear-filters").click();
    return;
  }
  const citationLink = event.target.closest("[data-citation-document]");
  if (citationLink) {
    state.pendingPdfPage = Number(citationLink.dataset.citationPage) || 1;
    if (!state.resources.some((resource) => resource.id === citationLink.dataset.citationDocument)) {
      state.pendingPdfPage = null;
      showToast("That source is no longer available to your account.");
      return;
    }
    openResource(citationLink.dataset.citationDocument);
    return;
  }
  if (!event.target.closest(".profile-menu-wrap, #topbar-profile-button, #account-menu") && !document.querySelector("#account-menu").hidden) {
    closeAccountMenu();
  }
  if (!event.target.closest(".notification-menu") && !document.querySelector("#notification-panel").hidden) {
    document.querySelector("#notification-panel").hidden = true;
    document.querySelector("#notification-button").setAttribute("aria-expanded", "false");
  }
  const accountAction = event.target.closest("[data-account-action]");
  if (accountAction) {
    if (accountAction.dataset.accountRole === state.userRole) handleAccountAction(accountAction.dataset.accountAction);
    return;
  }
  const readNotificationButton = event.target.closest("[data-mark-notification-read]");
  if (readNotificationButton) {
    markNotificationRead(readNotificationButton.dataset.notificationKind, readNotificationButton.dataset.markNotificationRead);
    return;
  }
  const reviewButton = event.target.closest("[data-review-resource]");
  if (reviewButton) {
    updateResourceReview(reviewButton.dataset.reviewResource, reviewButton.dataset.reviewStatus);
    return;
  }
  const deleteAnnouncementButton = event.target.closest("[data-delete-announcement]");
  if (deleteAnnouncementButton) {
    removeAnnouncement(deleteAnnouncementButton.dataset.deleteAnnouncement);
    return;
  }
  const selectedRazeResource = event.target.closest("[data-select-raze-resource]");
  if (selectedRazeResource) {
    state.razeSelectedResourceId = selectedRazeResource.dataset.selectRazeResource;
    state.razeStudyTool = null;
    renderRazeResources(document.querySelector("#raze-material-query").value);
    renderSelectedRazeResource();
    renderRazePractice();
    renderRazeRecentPdfs();
    return;
  }
  const savedArtifactButton = event.target.closest("[data-open-saved-artifact]");
  if (savedArtifactButton) {
    const artifact = state.savedArtifacts.find((item) => item.id === savedArtifactButton.dataset.openSavedArtifact);
    if (!artifact) return;
    const resource = state.resources.find((item) => item.id === artifact.document_id);
    if (resource) {
      state.razeSelectedResourceId = resource.id;
      renderRazeResources(document.querySelector("#raze-material-query").value);
      renderSelectedRazeResource();
    }
    if (["study_guide", "quick_review"].includes(artifact.kind)) {
      const result = document.querySelector("#raze-summary-result");
      if (result) {
        result.innerHTML = `<span class="modal-eyebrow">${artifact.kind === "study_guide" ? "SAVED STUDY GUIDE" : "SAVED QUICK REVIEW"}</span>${renderChatMarkdown(artifact.content.summary || "")}`;
        result.hidden = false;
        result.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } else {
      state.razeStudyTool = { kind: artifact.kind.replaceAll("_", "-"), title: artifact.title, items: artifact.content.items || [], answers: {}, revealed: new Set(), known: new Set(), learning: new Set(), filter: "all", index: 0 };
      renderRazePractice();
      document.querySelector("#raze-practice-section")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    return;
  }
  const removeSavedArtifactButton = event.target.closest("[data-delete-saved-artifact]");
  if (removeSavedArtifactButton) {
    const artifactId = removeSavedArtifactButton.dataset.deleteSavedArtifact;
    removeSavedArtifactButton.disabled = true;
    try {
      const response = await fetch(`/api/artifacts/${encodeURIComponent(artifactId)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not remove the saved artifact.");
      state.savedArtifacts = state.savedArtifacts.filter((artifact) => artifact.id !== artifactId);
      renderSavedStudyArtifacts();
      showToast("Removed from your study library.");
    } catch (error) {
      removeSavedArtifactButton.disabled = false;
      showToast(error.message || "Could not remove the saved artifact.");
    }
    return;
  }
  if (event.target.closest("[data-clear-raze-resource]")) {
    state.razeSelectedResourceId = null;
    state.razeStudyTool = null;
    renderRazeResources(document.querySelector("#raze-material-query").value);
    renderSelectedRazeResource();
    renderRazePractice();
    renderRazeRecentPdfs();
    return;
  }
  const razeSummaryButton = event.target.closest("[data-raze-summary]");
  if (razeSummaryButton) {
    void generateRazeSummary(razeSummaryButton.dataset.razeSummary);
    return;
  }
  const razeToolButton = event.target.closest("[data-raze-tool]");
  if (razeToolButton) {
    void generateRazePractice(razeToolButton.dataset.razeTool);
    return;
  }
  if (event.target.closest("[data-clear-raze-tool]")) {
    state.razeStudyTool = null;
    renderRazePractice();
    return;
  }
  const revealRazeCard = event.target.closest("[data-reveal-raze-card]");
  if (revealRazeCard && state.razeStudyTool?.kind === "flashcards") {
    const index = state.razeStudyTool.index || 0;
    if (state.razeStudyTool.revealed.has(index)) state.razeStudyTool.revealed.delete(index);
    else state.razeStudyTool.revealed.add(index);
    renderRazePractice();
    return;
  }
  const razeCardStep = event.target.closest("[data-raze-card-step]");
  if (razeCardStep && state.razeStudyTool?.kind === "flashcards") {
    const tool = state.razeStudyTool;
    const visible = tool.items.map((_, index) => index).filter((index) => tool.filter === "still-learning" ? tool.learning.has(index) : tool.filter === "unseen" ? !tool.known.has(index) && !tool.learning.has(index) : true);
    tool.index = Math.max(0, Math.min(visible.length - 1, (tool.index || 0) + Number(razeCardStep.dataset.razeCardStep)));
    renderRazePractice();
    return;
  }
  const cardFilter = event.target.closest("[data-raze-card-filter]");
  if (cardFilter && state.razeStudyTool?.kind === "flashcards") { state.razeStudyTool.filter = cardFilter.dataset.razeCardFilter; state.razeStudyTool.index = 0; renderRazePractice(); return; }
  if (event.target.closest("[data-raze-card-shuffle]") && state.razeStudyTool?.kind === "flashcards") { state.razeStudyTool.items.sort(() => Math.random() - 0.5); state.razeStudyTool.index = 0; renderRazePractice(); return; }
  const cardRate = event.target.closest("[data-raze-card-rate]");
  if (cardRate && state.razeStudyTool?.kind === "flashcards") {
    const tool = state.razeStudyTool;
    const visible = tool.items.map((_, index) => index).filter((index) => tool.filter === "still-learning" ? tool.learning.has(index) : tool.filter === "unseen" ? !tool.known.has(index) && !tool.learning.has(index) : true);
    const index = visible[tool.index || 0];
    if (cardRate.dataset.razeCardRate === "known") { tool.known.add(index); tool.learning.delete(index); }
    else { tool.learning.add(index); tool.known.delete(index); }
    tool.index = Math.min(tool.index || 0, Math.max(0, visible.length - 2));
    renderRazePractice(); return;
  }
  const razeAnswer = event.target.closest("[data-raze-answer]");
  if (razeAnswer && state.razeStudyTool && !state.razeStudyTool.revealed.has(Number(razeAnswer.dataset.razeAnswer.split(":")[0]))) {
    const [questionIndex, optionIndex] = razeAnswer.dataset.razeAnswer.split(":").map(Number);
    state.razeStudyTool.answers[questionIndex] = optionIndex;
    renderRazePractice();
    return;
  }
  const checkRazeAnswer = event.target.closest("[data-check-raze-answer]");
  if (checkRazeAnswer && state.razeStudyTool) {
    const questionIndex = Number(checkRazeAnswer.dataset.checkRazeAnswer);
    state.razeStudyTool.revealed.add(questionIndex);
    renderRazePractice();
    return;
  }
  const suggestedPrompt = event.target.closest("[data-raze-prompt]");
  if (suggestedPrompt) {
    const input = document.querySelector("#chat-input");
    input.value = suggestedPrompt.dataset.razePrompt;
    document.querySelector("#chat-form").requestSubmit();
    return;
  }
  const ratingButton = event.target.closest("[data-resource-rating]");
  if (ratingButton) {
    saveResourceRating(Number(ratingButton.dataset.resourceRating));
    return;
  }
  if (event.target.closest("#admin-open-crates")) {
    setView("crates");
    return;
  }
  const summaryButton = event.target.closest("#create-ai-summary");
  if (summaryButton) {
    void createResourceSummary();
    return;
  }
  const quizButton = event.target.closest("#start-python-quiz");
  const flashcardsButton = event.target.closest("#start-python-flashcards");
  if (quizButton || flashcardsButton) {
    const selected = new Set(selectedPythonTopics());
    const mode = quizButton ? "quiz" : "flashcards";
    const source = mode === "quiz" ? pythonQuizQuestions : pythonFlashcards;
    state.studyTool = {
      mode,
      items: source.filter((item) => selected.has(item.topic)),
      index: 0,
      revealed: false,
      score: 0,
      selectedChoice: null,
    };
    renderStudyTool();
    return;
  }
  const quizAnswer = event.target.closest("[data-quiz-answer]");
  if (quizAnswer && state.studyTool?.mode === "quiz" && !state.studyTool.revealed) {
    const item = state.studyTool.items[state.studyTool.index];
    const choice = Number(quizAnswer.dataset.quizAnswer);
    state.studyTool.revealed = true;
    state.studyTool.selectedChoice = choice;
    if (choice === item.answer) state.studyTool.score += 1;
    renderStudyTool();
    return;
  }
  const flashcard = event.target.closest("#flashcard-toggle");
  if (flashcard && state.studyTool?.mode === "flashcards") {
    state.studyTool.revealed = !state.studyTool.revealed;
    renderStudyTool();
    return;
  }
  const nextStudyItem = event.target.closest("#study-next");
  if (nextStudyItem && state.studyTool) {
    if (state.studyTool.index + 1 < state.studyTool.items.length) {
      state.studyTool.index += 1;
      state.studyTool.revealed = false;
      state.studyTool.selectedChoice = null;
    } else {
      const completed = state.studyTool;
      state.studyTool = null;
      recordLearningActivity(completed.mode === "quiz" ? "Finished a quiz" : "Finished flashcards", `${completed.mode === "quiz" ? `${completed.score} of ${completed.items.length} correct` : `${completed.items.length} cards reviewed`} · ${state.activeResource?.title || "Study session"}`, state.activeResource?.id || null);
      const output = document.querySelector("#study-tool-output");
      output.textContent = completed.mode === "quiz"
        ? `Quiz complete — ${completed.score} of ${completed.items.length} correct.`
        : "Flashcard set complete — nice work!";
      return;
    }
    renderStudyTool();
    return;
  }
  const uploadTrigger = event.target.closest(".upload-trigger");
  if (uploadTrigger) {
    openUploadModal();
    return;
  }
  const closeButton = event.target.closest("[data-close-modal]");
  if (closeButton) {
    closeButton.closest("dialog").close();
    return;
  }
  const saveButton = event.target.closest("[data-save-resource]");
  if (saveButton) {
    event.stopPropagation();
    toggleSaved(saveButton.dataset.saveResource);
    return;
  }
  const retryIndexingButton = event.target.closest("[data-retry-document]");
  if (retryIndexingButton) {
    event.stopPropagation();
    retryIndexingButton.disabled = true;
    retryIndexingButton.textContent = "Queuing…";
    try {
      const response = await fetch(`/api/documents/${encodeURIComponent(retryIndexingButton.dataset.retryDocument)}/retry`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: "{}",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not retry indexing.");
      const resource = state.resources.find((item) => item.id === retryIndexingButton.dataset.retryDocument);
      if (resource) {
        resource.processingStatus = "queued";
        resource.processingHelp = "";
      }
      state.processingPollAttempts = 0;
      renderResources();
      scheduleProcessingStatusRefresh();
      showToast("Indexing queued. We’ll update the status as the PDF is prepared.");
    } catch (error) {
      retryIndexingButton.disabled = false;
      retryIndexingButton.textContent = "Retry indexing";
      showToast(error.message || "Could not retry indexing.");
    }
    return;
  }
  const resourceCard = event.target.closest("[data-open-resource]");
  if (resourceCard) {
    openResource(resourceCard.dataset.openResource);
    return;
  }
  const plannerDate = event.target.closest("[data-planner-date]");
  if (plannerDate) {
    state.selectedPlannerDate = plannerDate.dataset.plannerDate;
    const date = new Date(`${state.selectedPlannerDate}T12:00:00`);
    state.plannerMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    renderStudyPlanner();
    return;
  }
  const libraryFilter = event.target.closest("[data-library-filter]");
  if (libraryFilter) { state.libraryFilter = libraryFilter.dataset.libraryFilter; renderLibraryPanel(); return; }
  const uploadFilter = event.target.closest("[data-upload-filter]");
  if (uploadFilter) { state.uploadFilter = uploadFilter.dataset.uploadFilter; renderUploadsPanel(); return; }
  const plannerToggle = event.target.closest("[data-toggle-planner-task]");
  if (plannerToggle) {
    const task = state.plannerTasks.find((item) => item.id === plannerToggle.dataset.togglePlannerTask);
    if (task) {
      task.done = !task.done;
      persistLearningState();
      if (task.done) recordLearningActivity("Completed a study task", task.title, task.sourceId || null);
      renderStudyPlanner();
      if (state.view === "discover") renderLearningDashboard();
    }
    return;
  }
  const removeTask = event.target.closest("[data-remove-planner-task]");
  if (removeTask) {
    state.plannerTasks = state.plannerTasks.filter((task) => task.id !== removeTask.dataset.removePlannerTask);
    persistLearningState(); renderStudyPlanner(); return;
  }
  const plannerControls = {
    "#planner-prev-month": -1,
    "#planner-next-month": 1,
  };
  const monthControl = event.target.closest(Object.keys(plannerControls).join(","));
  if (monthControl) {
    state.plannerMonth.setMonth(state.plannerMonth.getMonth() + plannerControls[`#${monthControl.id}`]);
    renderStudyPlanner(); return;
  }
  if (event.target.closest("#planner-today")) {
    state.selectedPlannerDate = localDateKey(new Date());
    state.plannerMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    renderStudyPlanner(); return;
  }
  if (event.target.closest("#planner-quick-add, [data-add-planner-task]")) { openPlannerTaskForm(); return; }
  if (event.target.closest("#planner-generate-plan")) { generateLocalStudyPlan(); return; }
  if (event.target.closest("#planner-clear-completed")) {
    state.plannerTasks = state.plannerTasks.filter((task) => !(task.dueDate === state.selectedPlannerDate && task.done));
    persistLearningState(); renderStudyPlanner(); return;
  }
  const subjectProgress = event.target.closest("[data-filter-subject]");
  if (subjectProgress) {
    state.filters.subject = subjectProgress.dataset.filterSubject;
    searchInput.value = ""; state.query = ""; setView("discover"); renderResources();
    document.querySelector("#resource-section").scrollIntoView({ behavior: "smooth", block: "start" }); return;
  }
  const noteJump = event.target.closest("[data-note-page]");
  if (noteJump) { void state.pdfPreviewModule?.goToPage(Number(noteJump.dataset.notePage)); return; }
  const removeNote = event.target.closest("[data-remove-document-note]");
  if (removeNote && state.activeResource) {
    const resourceId = state.activeResource.id;
    state.documentNotes[resourceId] = (state.documentNotes[resourceId] || []).filter((note) => note.id !== removeNote.dataset.removeDocumentNote);
    persist(storageKeys.documentNotes, state.documentNotes); renderDocumentNotes(); return;
  }
  const askRaze = event.target.closest("[data-ask-raze-resource]");
  if (askRaze) {
    const resource = state.resources.find((item) => item.id === askRaze.dataset.askRazeResource);
    if (resource) {
      state.razeSelectedResourceId = resource.id;
      detailModal.close();
      setView("raze");
      const input = document.querySelector("#chat-input");
      input.value = `Help me understand the key ideas in “${resource.title}”.`;
      input.focus();
      renderSelectedRazeResource();
      showToast("Raze is ready with this PDF as context.");
    }
    return;
  }
  const viewLink = event.target.closest("[data-view]");
  if (viewLink) {
    setView(viewLink.dataset.view);
    return;
  }
});

document.querySelector("#planner-task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#planner-task-title").value.trim();
  if (!title) return;
  state.plannerTasks.push({
    id: crypto.randomUUID(), title,
    description: document.querySelector("#planner-task-description").value.trim(),
    dueDate: document.querySelector("#planner-task-date").value || state.selectedPlannerDate,
    subject: document.querySelector("#planner-task-subject").value.trim(),
    duration: Number(document.querySelector("#planner-task-duration").value),
    done: false, createdAt: new Date().toISOString(),
  });
  state.selectedPlannerDate = document.querySelector("#planner-task-date").value || state.selectedPlannerDate;
  const date = new Date(`${state.selectedPlannerDate}T12:00:00`);
  state.plannerMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  persistLearningState();
  recordLearningActivity("Added a study task", title);
  event.currentTarget.reset();
  document.querySelector("#planner-add-task-details").open = false;
  renderStudyPlanner();
  showToast("Study task added to your planner.");
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "document-note-form") return;
  event.preventDefault();
  if (!state.activeResource) return;
  const input = document.querySelector("#document-note-input");
  const text = input.value.trim();
  if (!text) return;
  const notes = state.documentNotes[state.activeResource.id] || [];
  state.documentNotes[state.activeResource.id] = [{
    id: crypto.randomUUID(), pageNumber: currentPdfPage(), text,
    color: document.querySelector("#document-note-color").value,
    createdAt: new Date().toISOString(),
  }, ...notes];
  persist(storageKeys.documentNotes, state.documentNotes);
  input.value = "";
  renderDocumentNotes();
  showToast(`Note saved on page ${currentPdfPage()}.`);
});

document.addEventListener("campus:pdf-page-change", (event) => {
  const resource = state.activeResource;
  if (!resource) return;
  const { pageNumber, pageCount } = event.detail;
  const previous = state.learningProgress[resource.id] || { maxPage: 0, pageCount };
  const previousPercent = Math.round(((previous.maxPage || 0) / (previous.pageCount || pageCount)) * 100);
  state.learningProgress[resource.id] = { maxPage: Math.max(previous.maxPage || 0, pageNumber), pageCount };
  persist(storageKeys.learningProgress, state.learningProgress);
  const currentPercent = getResourceProgress(resource.id);
  for (const milestone of [25, 50, 100]) {
    if (previousPercent < milestone && currentPercent >= milestone) {
      recordLearningActivity(milestone === 100 ? "Finished reading a PDF" : `Reached ${milestone}% of a PDF`, resource.title, resource.id);
      break;
    }
  }
  const label = document.querySelector(".document-notes-panel .focus-mark");
  if (label) label.textContent = `PAGE ${pageNumber}`;
  renderDocumentNotes();
  if (state.view === "discover") renderLearningDashboard();
});

document.addEventListener("keydown", (event) => {
  const accountMenu = document.querySelector("#account-menu");
  if (event.key === "Escape" && !accountMenu.hidden) {
    closeAccountMenu({ restoreFocus: true });
  }
  const notificationPanel = document.querySelector("#notification-panel");
  if (event.key === "Escape" && !notificationPanel.hidden) {
    notificationPanel.hidden = true;
    document.querySelector("#notification-button").setAttribute("aria-expanded", "false");
    document.querySelector("#notification-button").focus();
  }
  if (event.key === "Escape" && !assistantPanel.hidden && state.view !== "raze") {
    setAssistantOpen(false);
    assistantLauncher.focus();
  }
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value.trim();
  renderResources();
});
document.querySelector("#raze-material-query").addEventListener("input", (event) => {
  renderRazeResources(event.currentTarget.value);
});
document.querySelector("#library-search").addEventListener("input", (event) => {
  state.libraryQuery = event.currentTarget.value;
  renderLibraryPanel();
});

document.querySelector("#sort-button").addEventListener("click", (event) => {
  state.sortByRating = !state.sortByRating;
  event.currentTarget.setAttribute("aria-pressed", String(!state.sortByRating));
  event.currentTarget.setAttribute("aria-label", state.sortByRating ? "Sorted by faculty review and rating" : "Sorted by newest first");
  event.currentTarget.querySelector("span:nth-child(2)").textContent = state.sortByRating ? "Faculty picks" : "Faculty picks · newest";
  renderResources();
});

document.querySelectorAll("[data-resource-feed]").forEach((button) => {
  button.addEventListener("click", () => {
    state.resourceFeed = button.dataset.resourceFeed;
    renderResources();
  });
});

document.querySelectorAll("[data-department-feed]").forEach((button) => {
  button.addEventListener("click", () => {
    state.departmentFeed = button.dataset.departmentFeed;
    renderResources();
  });
});

document.querySelector("#filter-button").addEventListener("click", () => {
  const panel = document.querySelector("#curriculum-filter-panel");
  const button = document.querySelector("#filter-button");
  const isOpen = panel.dataset.open === "true";
  panel.dataset.open = String(!isOpen);
  panel.hidden = isOpen;
  button.setAttribute("aria-expanded", String(!isOpen));
});

for (const [selectId, filterKey] of [
  ["filter-department", "department"],
  ["filter-year", "year"],
  ["filter-section", "section"],
  ["filter-semester", "semester"],
  ["filter-subject", "subject"],
]) {
  document.querySelector(`#${selectId}`).addEventListener("change", (event) => {
    state.filters[filterKey] = event.currentTarget.value;
    if (filterKey === "department") {
      state.filters.section = "";
      state.filters.semester = "";
      state.filters.subject = "";
    } else if (filterKey === "year") {
      state.filters.semester = "";
      state.filters.subject = "";
    } else if (filterKey === "semester") {
      state.filters.subject = "";
    }
    updateCurriculumFilters();
    renderResources();
  });
}

document.querySelector("#active-filter-chips").addEventListener("click", (event) => {
  const chip = event.target.closest("[data-clear-filter]");
  if (!chip) return;
  state.filters[chip.dataset.clearFilter] = "";
  updateCurriculumFilters();
  renderResources();
});

document.querySelector("#clear-filters").addEventListener("click", () => {
  state.filters = { department: "", year: "", section: "", semester: "", subject: "" };
  state.query = "";
  searchInput.value = "";
  state.departmentFeed = "all";
  updateCurriculumFilters();
  renderResources();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !event.altKey && !event.ctrlKey && !event.metaKey &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
    const visibleSearch = !document.querySelector("#app-shell").hidden && !document.querySelector(".search-panel").hidden;
    if (visibleSearch) {
      event.preventDefault();
      searchInput.focus();
    }
  }
});

for (const prefix of ["upload", "crate"]) {
  for (const suffix of ["department", "year"]) {
    document.querySelector(`#${prefix}-${suffix}`).addEventListener("change", () => {
      document.querySelector(`#${prefix}-section`).value = "";
      document.querySelector(`#${prefix}-semester`).value = "";
      updateAcademicFormOptions(prefix);
    });
  }
}

document.querySelector("#join-crate-form").addEventListener("submit", (event) => {
  event.preventDefault();
  joinCrate(document.querySelector("#crate-code").value);
});

document.querySelector("#create-crate-form").addEventListener("submit", createCrate);
document.querySelector("#announcement-form").addEventListener("submit", createAnnouncement);
document.querySelector("#fill-demo-crate-code").addEventListener("click", () => {
  document.querySelector("#crate-code").value = "MEC-CSE2";
  joinCrate("MEC-CSE2");
});

document.addEventListener("click", (event) => {
  const joinButton = event.target.closest("[data-join-code]");
  if (joinButton) {
    const code = joinButton.dataset.joinCode;
    document.querySelector("#crate-code").value = code;
    joinCrate(code);
    return;
  }
  const openCrateButton = event.target.closest("[data-open-crate]");
  if (openCrateButton) {
    state.activeCrateId = openCrateButton.dataset.openCrate;
    renderCrates();
    document.querySelector("#crate-materials-section").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const resetCrateButton = event.target.closest("[data-reset-crate-code]");
  if (resetCrateButton) {
    resetCrateCode(resetCrateButton.dataset.resetCrateCode);
    return;
  }
  if (event.target.closest("#close-crate-materials")) {
    state.activeCrateId = null;
    renderCrates();
  }
});

document.querySelector("#explore-button").addEventListener("click", () => {
  document.querySelector("#resource-section").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#chat-input");
  if (!input.value.trim() || state.chatBusy) return;
  void submitStudyPrompt(input.value);
  input.value = "";
});
document.querySelector("#chat-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    document.querySelector("#chat-form").requestSubmit();
  }
});

document.querySelector("#detail-save-button").addEventListener("click", () => {
  if (state.activeResource) toggleSaved(state.activeResource.id);
});

document.querySelector("#upload-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.querySelector("#resource-title").value.trim();
  const subject = document.querySelector("#resource-subject").value;
  const course = document.querySelector("#resource-course").value.trim();
  const department = document.querySelector("#upload-department").value;
  const year = Number(document.querySelector("#upload-year").value);
  const section = document.querySelector("#upload-section").value;
  const semesterValue = document.querySelector("#upload-semester").value;
  const file = document.querySelector("#file-input").files[0];
  if (!file || !title || !subject || !course || !department || !year || !section || !semesterValue) {
    showToast("Choose a PDF and complete its course and class details.");
    return;
  }
  if (!state.analyzedPdf || state.analyzedPdf.fileName !== file.name) {
    showToast("Wait for the PDF's AI review to finish before sharing.");
    return;
  }

  const resource = {
    id: `upload-${crypto.randomUUID()}`,
    title,
    subject,
    course,
    format: "PDF · AI reviewed",
    rating: null,
    ratings: 0,
    aiScore: state.analyzedPdf.aiScore,
    facultyScore: null,
    author: document.querySelector("#profile-name").textContent,
    summary: "",
    tags: state.analyzedPdf.tags,
    topicsCovered: state.analyzedPdf.topicsCovered,
    focusTopics: state.analyzedPdf.focusTopics,
    cover: ({ "Computer science": "cs", "Biology": "biology", "Business": "business", "Design": "design", "Mathematics": "math" })[subject] || "other",
    license: document.querySelector("#resource-license").value,
    isUploaded: true,
    reviewStatus: "pending",
    college: collegeName,
    department,
    year,
    section,
    semester: semesterValue === "unmapped" ? null : Number(semesterValue),
    facultyReviewed: false,
    createdAt: new Date().toISOString(),
  };
  setUploadBusy(true, "Saving securely…");
  try {
    if (oidcMode) {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          title: resource.title,
          subject: resource.subject,
          course: resource.course,
          filename: file.name,
          department: resource.department,
          year: resource.year,
          section: resource.section,
          semester: resource.semester,
          tags: resource.tags,
          topicsCovered: resource.topicsCovered,
          focusTopics: resource.focusTopics,
          aiScore: resource.aiScore,
          sharingLabel: resource.license,
          pdfBase64: bytesToBase64(new Uint8Array(await file.arrayBuffer())),
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not save this PDF.");
      Object.assign(resource, payload.resource);
    } else {
      await saveResourcePdf(resource.id, file);
      const uploads = [resource, ...state.resources.filter((item) => item.isUploaded)];
      if (!persist(storageKeys.uploads, uploads)) {
        setUploadBusy(false);
        state.resources.unshift(resource);
        uploadModal.close();
        state.analyzedPdf = null;
        setView("uploads");
        showToast("Your PDF is kept on this device, but its upload details could not be saved. Check browser storage and try again.");
        return;
      }
    }
  } catch (error) {
    console.error("Could not save the uploaded PDF:", error);
    showToast(error.message || "Could not save the PDF preview on this device.");
    setUploadBusy(false);
    return;
  }
  setUploadBusy(false);
  state.resources.unshift(resource);
  uploadModal.close();
  state.analyzedPdf = null;
  setView("uploads");
  showToast("Upload saved. It will appear in Discover after faculty/admin review.");
  if (oidcMode) void loadPersistentDocuments();
});

const fileInput = document.querySelector("#file-input");
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    document.querySelector("#file-name").textContent = file.name;
    analyzePdfFile(file);
  }
});

detailModal.addEventListener("close", () => {
  state.summaryController?.abort();
  state.summaryController = null;
  const openLink = document.querySelector("#pdf-open-link");
  if (openLink?.dataset.temporaryUrl) URL.revokeObjectURL(openLink.dataset.temporaryUrl);
  if (openLink) delete openLink.dataset.temporaryUrl;
  state.pdfPreviewModule?.then((preview) => preview.close()).catch((error) => {
    console.error("Could not close the PDF preview cleanly:", error);
  });
});

const dropZone = document.querySelector("#drop-zone");
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragging");
});
dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragging"));
dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragging");
  const file = event.dataTransfer.files[0];
  if (!file) return;
  const allowed = /\.pdf$/i.test(file.name);
  if (!allowed) {
    showToast("AI analysis currently supports PDF files only.");
    return;
  }
  if (file.size > 12 * 1024 * 1024) {
    showToast("That PDF is over 12 MB. Choose a smaller one.");
    return;
  }
  const transfer = new DataTransfer();
  transfer.items.add(file);
  fileInput.files = transfer.files;
  document.querySelector("#file-name").textContent = file.name;
  analyzePdfFile(file);
});

document.querySelector("#invite-button").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Campus link copied. Send it to a classmate!");
  } catch (error) {
    showToast("Copy this page link to invite a classmate.");
  }
});

const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", signInDemo);
  document.querySelectorAll("[data-login-role]").forEach((button) => {
    button.addEventListener("click", () => setLoginRole(button.dataset.loginRole));
  });
  setLoginRole("student");
  restoreLoginFeedback();
  document.querySelector("#toggle-password-visibility").addEventListener("click", (event) => {
    const password = document.querySelector("#login-password");
    const isVisible = password.type === "text";
    password.type = isVisible ? "password" : "text";
    event.currentTarget.textContent = isVisible ? "Show" : "Hide";
    event.currentTarget.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
    event.currentTarget.setAttribute("aria-pressed", String(!isVisible));
  });
}
document.querySelector("#profile-button").addEventListener("click", toggleAccountMenu);
document.querySelector("#topbar-profile-button").addEventListener("click", toggleAccountMenu);
window.addEventListener("resize", repositionAccountMenu);
document.querySelector(".sidebar").addEventListener("scroll", repositionAccountMenu, { passive: true });
document.querySelector("#open-sign-out").addEventListener("click", () => {
  closeAccountMenu();
  document.querySelector("#sign-out-error").hidden = true;
  document.querySelector("#sign-out-dialog").showModal();
  document.querySelector("#cancel-sign-out").focus();
});
document.querySelector("#cancel-sign-out").addEventListener("click", () => {
  document.querySelector("#sign-out-dialog").close();
  document.querySelector("#profile-button").focus();
});
document.querySelector("#close-sign-out").addEventListener("click", () => {
  document.querySelector("#sign-out-dialog").close();
  document.querySelector("#profile-button").focus();
});
document.querySelector("#confirm-sign-out").addEventListener("click", signOutDemo);
document.querySelector("#sign-out-dialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    event.currentTarget.close();
    document.querySelector("#profile-button").focus();
  }
});
document.querySelector("#sign-out-dialog").addEventListener("close", () => {
  document.querySelector("#profile-button").focus();
});
document.querySelector("#home-button").addEventListener("click", () => {
  setView(state.userRole === "admin" ? "admin" : "discover");
  document.querySelector(".main-content").scrollTo({ top: 0, behavior: "smooth" });
});
document.querySelector("#notification-button").addEventListener("click", (event) => {
  const panel = document.querySelector("#notification-panel");
  panel.hidden = !panel.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!panel.hidden));
  if (!panel.hidden) renderNotificationCenter();
});
document.querySelector("#mark-all-notifications-read").addEventListener("click", markAllNotificationsRead);
document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });
});
window.addEventListener("storage", (event) => {
  if (event.key === storageKeys.theme) {
    applyTheme(readStorage(storageKeys.theme, "light"));
  } else if (event.key === storageKeys.uploads) {
    syncUploadedResources(event.newValue);
    return;
  }
  if (event.key === storageKeys.announcements) {
    const announcements = readStorage(storageKeys.announcements, []);
    state.announcements = Array.isArray(announcements) ? announcements : [];
    renderNotificationCenter();
    if (state.view === "admin") renderAdminDashboard();
  } else if (event.key === storageKeys.readAnnouncements) {
    const readIds = readStorage(storageKeys.readAnnouncements, []);
    state.readAnnouncements = new Set(Array.isArray(readIds) ? readIds : []);
    renderNotificationCenter();
  } else if (event.key === storageKeys.materialUpdates) {
    const updates = readStorage(storageKeys.materialUpdates, []);
    state.materialUpdates = Array.isArray(updates) ? updates : [];
    renderNotificationCenter();
  } else if (event.key === storageKeys.readMaterialUpdates) {
    const readIds = readStorage(storageKeys.readMaterialUpdates, []);
    state.readMaterialUpdates = new Set(Array.isArray(readIds) ? readIds : []);
    renderNotificationCenter();
  } else if (event.key === storageKeys.saved) {
    const savedIds = readStorage(storageKeys.saved, []);
    state.saved = new Set(Array.isArray(savedIds) ? savedIds : []);
    renderResources();
    if (state.view === "saved") renderLibraryPanel();
  }
});
assistantLauncher.addEventListener("click", () => setAssistantOpen(assistantPanel.hidden));
document.querySelector("#assistant-close").addEventListener("click", () => {
  setAssistantOpen(false);
  assistantLauncher.focus();
});

applyTheme(readStorage(storageKeys.theme, "light"));
restoreDemoSession();
renderChatMessages();
renderResources();
updateCurriculumFilters();
updateAcademicFormOptions("upload");
updateAcademicFormOptions("crate");
