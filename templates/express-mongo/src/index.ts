import app from "./app";
import { connectToDatabase } from "./database";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const entrypoint = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
    await connectToDatabase();
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

entrypoint();
