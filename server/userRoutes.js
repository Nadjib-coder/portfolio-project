import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getConnectedClient } from "./database.js";
const router = express.Router();

const getUserCollection = () => {
  const client = getConnectedClient();
  return client.db("todosdb").collection("users");
};

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ mssg: "Username and password required" });
  }

  const userCollection = getUserCollection();
  const existingUser = await userCollection.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ mssg: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userCollection.insertOne({
    username,
    password: hashedPassword,
  });

  res.status(201).json({ mssg: "User registered", userId: newUser.insertedId });
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userCollection = getUserCollection();
  const user = await userCollection.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ mssg: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ mssg: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ mssg: "Invalid token" });
    req.userId = user.userId;
    next();
  });
};

export { authenticateToken };
export default router;
