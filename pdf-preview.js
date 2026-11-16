import * as pdfjsLib from "/node_modules/pdfjs-dist/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/node_modules/pdfjs-dist/build/pdf.worker.mjs";

let pdfDocument = null;
let loadingTask = null;
let renderTask = null;
let pageNumber = 1;
let zoom = 1;
let generation = 0;
let renderFrame = 0;

const canvas = document.querySelector("#pdf-preview-canvas");
const context = canvas.getContext("2d", { alpha: false });
const container = document.querySelector("#pdf-preview-frame-wrap");
const emptyState = document.querySelector("#pdf-preview-empty");
const pageLabel = document.querySelector("#pdf-page-label");
const zoomLabel = document.querySelector("#pdf-zoom-label");
const previousButton = document.querySelector("#pdf-previous-page");
const nextButton = document.querySelector("#pdf-next-page");

function updateControls() {
  if (!pdfDocument) return;
  pageLabel.textContent = `Page ${pageNumber} of ${pdfDocument.numPages}`;
  zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
  previousButton.disabled = pageNumber <= 1;
  nextButton.disabled = pageNumber >= pdfDocument.numPages;
  document.dispatchEvent(new CustomEvent("campus:pdf-page-change", { detail: { pageNumber, pageCount: pdfDocument.numPages } }));
}

async function renderPage() {
  if (!pdfDocument) return;
  renderTask?.cancel();
  renderTask = null;

  const activeGeneration = generation;
  const page = await pdfDocument.getPage(pageNumber);
  if (activeGeneration !== generation) return;

  const baseViewport = page.getViewport({ scale: 1 });
  const availableWidth = Math.max(container.clientWidth - 28, 240);
  const fitScale = Math.min(availableWidth / baseViewport.width, 1.5);
  const viewport = page.getViewport({ scale: fitScale * zoom });
  const outputScale = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.ceil(viewport.width * outputScale);
  canvas.height = Math.ceil(viewport.height * outputScale);
  canvas.style.width = `${Math.ceil(viewport.width)}px`;
  canvas.style.height = `${Math.ceil(viewport.height)}px`;
  context.clearRect(0, 0, canvas.width, canvas.height);

  renderTask = page.render({
    canvasContext: context,
    viewport,
    transform: outputScale === 1 ? null : [outputScale, 0, 0, outputScale, 0, 0],
  });

  try {
    await renderTask.promise;
  } catch (error) {
    if (error.name !== "RenderingCancelledException") throw error;
  } finally {
    if (activeGeneration === generation) renderTask = null;
  }
}

async function renderAndUpdate() {
  try {
    await renderPage();
    updateControls();
    return true;
  } catch (error) {
    if (error.name !== "RenderingCancelledException") {
      console.error("Could not render the PDF page:", error);
      emptyState.textContent = "Could not render this PDF page. Open the original PDF to view it.";
      emptyState.hidden = false;
      canvas.hidden = true;
      return false;
    }
    return false;
  }
}

export async function open(blob) {
  const activeGeneration = ++generation;
  renderTask?.cancel();
  await loadingTask?.destroy();
  loadingTask = null;
  pdfDocument = null;
  pageNumber = 1;
  zoom = 1;
  emptyState.hidden = false;
  emptyState.textContent = "Preparing PDF page…";

  const data = new Uint8Array(await blob.arrayBuffer());
  if (activeGeneration !== generation) return;
  loadingTask = pdfjsLib.getDocument({ data, useSystemFonts: true });
  pdfDocument = await loadingTask.promise;
  if (activeGeneration !== generation) {
    await pdfDocument.destroy();
    return;
  }

  emptyState.hidden = true;
  canvas.hidden = false;
  updateControls();
  if (!await renderAndUpdate()) {
    throw new Error(emptyState.textContent || "Could not render this PDF page.");
  }
}

export async function goToPage(targetPage) {
  if (!pdfDocument) return;
  pageNumber = Math.min(pdfDocument.numPages, Math.max(1, Math.trunc(Number(targetPage) || 1)));
  await renderAndUpdate();
}

export async function close() {
  generation += 1;
  cancelAnimationFrame(renderFrame);
  renderTask?.cancel();
  renderTask = null;
  const oldTask = loadingTask;
  loadingTask = null;
  pdfDocument = null;
  if (oldTask) await oldTask.destroy();
  canvas.hidden = true;
  canvas.width = 0;
  canvas.height = 0;
}

previousButton.addEventListener("click", () => {
  if (pageNumber > 1) {
    pageNumber -= 1;
    void renderAndUpdate();
  }
});

nextButton.addEventListener("click", () => {
  if (pdfDocument && pageNumber < pdfDocument.numPages) {
    pageNumber += 1;
    void renderAndUpdate();
  }
});

document.querySelector("#pdf-zoom-out").addEventListener("click", () => {
  zoom = Math.max(0.5, Math.round((zoom - 0.15) * 100) / 100);
  void renderAndUpdate();
});

document.querySelector("#pdf-zoom-in").addEventListener("click", () => {
  zoom = Math.min(2.5, Math.round((zoom + 0.15) * 100) / 100);
  void renderAndUpdate();
});

const resizeObserver = new ResizeObserver(() => {
  if (!pdfDocument) return;
  cancelAnimationFrame(renderFrame);
  renderFrame = requestAnimationFrame(() => void renderAndUpdate());
});
resizeObserver.observe(container);
