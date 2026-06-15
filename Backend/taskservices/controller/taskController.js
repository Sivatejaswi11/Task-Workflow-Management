const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK
router.post("/createtask", async (req, res) => {
  try {
    const taskData = {
      ...req.body,
     assignedTo: req.body.assignedTo?.trim()?.toLowerCase()
    };

    await Task.create(taskData);

    res.status(200).json({
      message: "Task Created"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET ALL TASKS (ADMIN)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET USER TASKS (FIXED 🔥)
router.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();

    const tasks = await Task.find({
      assignedTo: email
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Task Updated",
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;