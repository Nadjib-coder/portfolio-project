import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";
import { connectToMongoDB } from "./database.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

dotenv.config();

app.use("/api", router);

const port = process.env.PORT || 5000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
startServer();
