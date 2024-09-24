import express from "express";

const router = express.Router();

// GET /tasks
router.get("/tasks", (req, res) => {
  res.status(200).json({ mssg: "GET REQUEST TO /api/tasks" });
});

// POST /tasks
router.post("/tasks", (req, res) => {
  res.status(201).json({ mssg: "POST REQUEST TO /api/tasks" });
});

// DELETE /tasks/:id
router.delete("/tasks/:id", (req, res) => {
  res.status(200).json({ mssg: "DELETE REQUEST TO /api/tasks/:id" });
});

// PUT /tasks/:id
router.put("/tasks/:id", (req, res) => {
  res.status(200).json({ mssg: "PUT REQUEST TO /api/tasks/:id" });
});

export default router;
