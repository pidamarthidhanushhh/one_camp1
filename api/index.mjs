import { createServer } from "../server.mjs";

const server = createServer();
const rewrittenPathParameter = "__campus_path";

export function createVercelHandler(requestServer = server) {
  return (request, response) => {
    process.env.CAMPUS_PRESENTATION_MODE = "true";
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    const requestedPath = url.searchParams.get(rewrittenPathParameter);
    if (requestedPath) {
      if (
        !requestedPath.startsWith("/api/") &&
        !requestedPath.startsWith("/auth/") &&
        requestedPath !== "/student" &&
        requestedPath !== "/admin" &&
        !requestedPath.startsWith("/node_modules/pdfjs-dist/")
      ) {
        response.writeHead(400, { "content-type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ error: "Invalid routed path." }));
        return;
      }
      url.searchParams.delete(rewrittenPathParameter);
      request.url = `${requestedPath}${url.search}`;
    }
    requestServer.emit("request", request, response);
  };
}

export default createVercelHandler();
