import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";
import { connectToMongoDB } from "./database.js";
import path from "path";
import { fileURLToPath } from "url";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

// Serve static files (React build files)
app.use(express.static(path.join(__dirname, "build")));

// Handle all other routes and send them to the React app
app.get("/api/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

dotenv.config();

const port = process.env.PORT || 10000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
startServer();
