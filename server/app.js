const express = require("express");
const dotenv = require("dotenv");
// const cors = require("cors");
const router = require("./routes");
const app = express();
// app.use(cors());

dotenv.config();

app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listing on http://localhost:${port}`);
});
