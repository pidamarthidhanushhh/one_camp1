import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const defaultChunkCharacters = 3_200;
const defaultOverlapCharacters = 350;
const maxPdfBytes = 12 * 1024 * 1024;

function normalizePageText(items) {
  const text = items.map((item) => {
    if (typeof item.str !== "string") return "";
    return `${item.str}${item.hasEOL ? "\n" : " "}`;
  }).join("");
  return text
    .replace(/[\t ]+\n/g, "\n")
    .replace(/\n[\t ]+/g, "\n")
    .replace(/[\t ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function chooseSplitPoint(text, target) {
  const minimum = Math.floor(target * 0.65);
  for (const separator of ["\n\n", "\n", ". ", " "]) {
    const index = text.lastIndexOf(separator, target);
    if (index >= minimum) return index + separator.length;
  }
  return target;
}

function chunkPage(page, maxCharacters, overlapCharacters) {
  const text = page.text.trim();
  if (!text) return [];
  const chunks = [];
  let offset = 0;

  while (offset < text.length) {
    const target = Math.min(offset + maxCharacters, text.length);
    const end = target < text.length ? offset + chooseSplitPoint(text.slice(offset, target), target - offset) : target;
    const content = text.slice(offset, end).trim();
    if (content) {
      const heading = content.match(/^(?:chapter\s+\d+|unit\s+\d+|\d+(?:\.\d+)*\s+)[^\n]{1,140}/i)?.[0];
      chunks.push({
        chunkNumber: chunks.length,
        pageStart: page.pageNumber,
        pageEnd: page.pageNumber,
        sectionHeading: heading || null,
        content,
      });
    }
    if (end >= text.length) break;
    offset = Math.max(offset + 1, end - overlapCharacters);
  }
  return chunks;
}

export async function extractPdfPages(input) {
  const data = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (data.byteLength > maxPdfBytes) throw new Error("The PDF exceeds the 12 MB upload limit.");
  if (data.byteLength < 5 || String.fromCharCode(...data.subarray(0, 5)) !== "%PDF-") {
    throw new Error("The uploaded file is not a valid PDF.");
  }

  const loadingTask = getDocument({ data, useSystemFonts: true, isEvalSupported: false });
  let document;
  try {
    document = await loadingTask.promise;
    const pages = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = normalizePageText(content.items);
      pages.push({
        pageNumber,
        text,
        extractionMethod: text ? "text" : "empty",
        extractionQuality: text ? 1 : 0,
      });
      page.cleanup();
    }
    return { pageCount: document.numPages, pages };
  } finally {
    if (document) await document.destroy();
    else await loadingTask.destroy();
  }
}

export function chunkPdfPages(pages, {
  maxCharacters = defaultChunkCharacters,
  overlapCharacters = defaultOverlapCharacters,
} = {}) {
  if (!Array.isArray(pages)) throw new TypeError("pages must be an array.");
  if (!Number.isInteger(maxCharacters) || maxCharacters < 500) {
    throw new RangeError("maxCharacters must be an integer of at least 500.");
  }
  if (!Number.isInteger(overlapCharacters) || overlapCharacters < 0 || overlapCharacters >= maxCharacters) {
    throw new RangeError("overlapCharacters must be a non-negative integer smaller than maxCharacters.");
  }

  return pages.flatMap((page) => chunkPage(page, maxCharacters, overlapCharacters))
    .map((chunk, chunkNumber) => ({ ...chunk, chunkNumber }));
}
