const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create a new Todo
router.post("/add", async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title
    });

    await newTodo.save();
    res.json({ message: "Todo created", todo: newTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Todos
router.get("/all", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Todo
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Todo updated", todo: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Todo
router.delete("/delete/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
