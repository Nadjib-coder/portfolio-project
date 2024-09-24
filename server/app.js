import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";
import connectToMongoDB from "./database.js";
const app = express();
app.use(cors());

dotenv.config();

app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
