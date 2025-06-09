import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const PORT = process.env.PORT || 3000;

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});
console.log(`Server is running on port http://localhost:${PORT}`);
