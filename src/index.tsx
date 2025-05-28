import { serve } from "bun";
import index from "./index.html";
import { after, set, get, pick } from "lodash";

const done = after(2, () => {
  set(globalThis, "Bun", {
    "version": "1.0.0",
    "versionName": "1.0.0",
  });
  const bun = get(globalThis, "Bun");
  console.log("Bun version:", bun.version);
  console.log("All files loaded");
});

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        done();
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
