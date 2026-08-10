// app.js
// Wires up middleware and routes. server.js is responsible for actually listening.

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const taskController = require("./controllers/taskController");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ---- Core middleware ----
app.use(cors());
app.use(express.json());

// ---- Health check (handy for Docker/Kubernetes readiness probes later) ----
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ---- Routes ----
// ---- Routes ----
app.get("/api/dashboard", taskController.getDashboardSummary);

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
// ---- 404 + error handling (must be last) ----
app.use(notFound);
app.use(errorHandler);

module.exports = app;
