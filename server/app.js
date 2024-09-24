import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";
import { connectToMongoDB } from "./database.js";
const app = express();
app.use(cors());
app.use(express.json());

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
