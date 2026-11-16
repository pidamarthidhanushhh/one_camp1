import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function storageRoot() {
  return path.resolve(process.env.PRIVATE_STORAGE_DIR || path.join(projectRoot, ".private-storage"));
}

function resolveObjectPath(objectKey) {
  if (typeof objectKey !== "string" || !/^[a-f0-9-]{36}\/[a-f0-9-]{36}\/[a-f0-9-]{36}\/[a-f0-9]{64}\.pdf$/i.test(objectKey)) {
    throw new Error("Invalid private object key.");
  }
  const root = storageRoot();
  const resolved = path.resolve(root, ...objectKey.split("/"));
  if (!resolved.startsWith(`${root}${path.sep}`)) throw new Error("Private object path is outside storage.");
  return resolved;
}

export async function putPrivateObject(objectKey, bytes) {
  const destination = resolveObjectPath(objectKey);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, bytes, { flag: "wx", mode: 0o600 });
}

export async function getPrivateObject(objectKey) {
  return readFile(resolveObjectPath(objectKey));
}

export async function deletePrivateObject(objectKey) {
  await rm(resolveObjectPath(objectKey), { force: true });
}
