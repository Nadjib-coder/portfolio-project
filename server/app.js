const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes");
const { connectToMongoDB } = require("./database");
const app = express();
app.use(cors());

dotenv.config();

app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${PORT}`);
});
