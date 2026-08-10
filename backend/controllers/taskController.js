// controllers/taskController.js
// Business logic + request/response handling. Routes just point here.

const taskModel = require("../models/taskModel");

// GET /api/dashboard
async function getDashboardSummary(req, res) {
  try {
    const summary = await taskModel.getSummary();
    res.status(200).json({ summary });
  } catch (err) {
    console.error("Error fetching dashboard summary:", err.message);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
}

// GET /api/tasks
async function getTasks(req, res) {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

// POST /api/tasks
async function createTask(req, res) {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: "title and dueDate are required" });
    }

    const newTask = await taskModel.createTask({
      title,
      description,
      priority,
      status,
      dueDate,
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ error: "Failed to create task" });
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;

    const existing = await taskModel.getTaskById(id);
    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await taskModel.updateTask(id, {
      title,
      description,
      priority,
      status,
      dueDate,
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ error: "Failed to update task" });
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const deleted = await taskModel.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", id: deleted.id });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
}

// PATCH /api/tasks/:id/status
async function markTaskComplete(req, res) {
  try {
    const { id } = req.params;
    // Allow an explicit status in the body, but default to "Completed"
    // since this endpoint's stated purpose is "mark complete".
    const status = req.body.status || "Completed";

    const existing = await taskModel.getTaskById(id);
    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await taskModel.updateTaskStatus(id, status);
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task status:", err.message);
    res.status(500).json({ error: "Failed to update task status" });
  }
}

module.exports = {
  getDashboardSummary,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskComplete,
};
