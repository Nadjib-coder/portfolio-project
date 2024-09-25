import express from "express";
const router = express.Router();
import { ObjectId } from "mongodb";
import { getConnectedClient } from "./database.js";

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("tasks");
  return collection;
};

// GET /tasks
router.get("/tasks", async (req, res) => {
  const collection = getCollection();
  const tasks = await collection.find({}).toArray();
  res.status(200).json(tasks);
});

// POST /tasks
router.post("/tasks", async (req, res) => {
  const collection = getCollection();
  let { task } = req.body;

  if (!task) {
    return res.status(400).json({ mssg: "Error no task found" });
  }

  task = typeof task === "string" ? task : JSON.stringify(task);

  const newTask = await collection.insertOne({ task, status: false });

  res.status(201).json({ task, status: false, _id: newTask.insertedId });
});

// DELETE /tasks/:id
router.delete("/tasks/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedTask = await collection.deleteOne({ _id });

  res.status(200).json(deletedTask);
});

// PUT /tasks/:id
router.put("/tasks/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ mssg: "Invalid status" });
  }

  const updatedTask = await collection.updateOne(
    { _id },
    { $set: { status: !status } }
  );

  res.status(200).json(updatedTask);
});

export default router;
