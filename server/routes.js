import express from "express";
import { ObjectId } from "mongodb";
import { getConnectedClient } from "./database.js";
import { authenticateToken } from "./userRoutes.js"; // Import the auth middleware

const router = express.Router();

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("tasks");
  return collection;
};

// GET /tasks
router.get("/tasks", authenticateToken, async (req, res) => {
  const collection = getCollection();
  const tasks = await collection.find({ userId: req.userId }).toArray();
  res.status(200).json(tasks);
});

// POST /tasks
router.post("/tasks", authenticateToken, async (req, res) => {
  const collection = getCollection();
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ mssg: "Error no task found" });
  }

  const newTask = await collection.insertOne({
    task: JSON.stringify(task),
    status: false,
    userId: req.userId,
  });

  res.status(201).json({ task, status: false, _id: newTask.insertedId });
});

// DELETE /tasks/:id
router.delete("/tasks/:id", authenticateToken, async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedTask = await collection.deleteOne({ _id, userId: req.userId });

  res.status(200).json(deletedTask);
});

// PUT /tasks/:id
router.put("/tasks/:id", authenticateToken, async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ mssg: "Invalid status" });
  }

  const updatedTask = await collection.updateOne(
    { _id, userId: req.userId },
    { $set: { status: !status } }
  );

  res.status(200).json(updatedTask);
});

export default router;
