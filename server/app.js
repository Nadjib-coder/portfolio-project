const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello people" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listing on http://localhost:${port}`);
});
