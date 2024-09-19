const express = require("express");
const router = express.Router();

let tasks = []; // In-memory "database"

// Get all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// Create a new task
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  if (title) task.title = title;
  if (typeof completed === "boolean") task.completed = completed;
  res.json(task);
});

// Delete a task
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

module.exports = router;
