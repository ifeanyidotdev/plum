import { Hono } from "hono";
import { connectToDatabase } from "./database";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectToDatabase();
  Bun.serve({
    port: PORT,
    fetch: app.fetch,
  });
  console.log(`Server is running on port http://localhost:${PORT}`);
}

startServer();
