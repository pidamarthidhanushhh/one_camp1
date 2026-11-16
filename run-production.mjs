import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const processes = ["server.mjs", "document-worker.mjs"].map((file) => ({
  name: file,
  child: spawn(process.execPath, [path.join(root, file)], {
    cwd: root,
    env: process.env,
    stdio: "inherit",
  }),
  exited: false,
}));

let stopping = false;
let exitCode = 0;
let forceStopTimer;

function stop(code = 0, signal = "SIGTERM") {
  if (stopping) return;
  stopping = true;
  exitCode = code;
  for (const processInfo of processes) {
    if (!processInfo.exited) processInfo.child.kill(signal);
  }
  forceStopTimer = setTimeout(() => {
    for (const processInfo of processes) {
      if (!processInfo.exited) processInfo.child.kill("SIGKILL");
    }
  }, 10_000);
  forceStopTimer.unref();
}

for (const processInfo of processes) {
  processInfo.child.once("error", (error) => {
    console.error(`Could not start ${processInfo.name}:`, error.message);
    stop(1);
  });
  processInfo.child.once("close", (code, signal) => {
    processInfo.exited = true;
    if (!stopping) {
      console.error(`${processInfo.name} exited unexpectedly (${signal || code}).`);
      stop(code || 1);
    }
    if (processes.every(({ exited }) => exited)) {
      clearTimeout(forceStopTimer);
      process.exitCode = exitCode;
    }
  });
}

process.on("SIGINT", () => stop(0, "SIGINT"));
process.on("SIGTERM", () => stop(0, "SIGTERM"));
