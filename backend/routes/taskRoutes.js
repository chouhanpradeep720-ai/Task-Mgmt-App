// routes/taskRoutes.js
// Routes only define endpoints and point to controller functions — no logic here.

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
// add route
router.get("/dashboard", taskController.getDashboardSummary);
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/:id/status", taskController.markTaskComplete);

module.exports = router;
