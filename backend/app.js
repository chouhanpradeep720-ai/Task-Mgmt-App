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
const client = require("prom-client");


const app = express();

// ---- Core middleware ----
app.use(cors());
app.use(express.json());


// Node.js default metrics
client.collectDefaultMetrics();


// ---- HTTP Metrics ----

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

const httpRequestsInProgress = new client.Gauge({
  name: "http_requests_in_progress",
  help: "Number of HTTP requests currently being processed",
  labelNames: ["method"],
});


// ---- HTTP Metrics Middleware ----
app.use((req, res, next) => {
  // Don't monitor Prometheus scraping itself
  if (req.path === "/metrics") {
    return next();
  }

  const start = process.hrtime();

  httpRequestsInProgress.inc({ method: req.method });

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const durationInSeconds = diff[0] + diff[1] / 1e9;

    const route = req.baseUrl + (req.route?.path || "");
    const statusCode = res.statusCode.toString();

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route,
        status_code: statusCode,
      },
      durationInSeconds
    );

    httpRequestsInProgress.dec({
      method: req.method,
    });
  });

  next();
});

// ---- Health check (handy for Docker/Kubernetes readiness probes later) ----
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ---- Readiness probe (handy for Docker/Kubernetes readiness probes later) ----
app.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    res.status(200).json({ status: 'READY' });
  } catch (error) {
    res.status(503).json({ status: 'NOT_READY' });
  }
});

// ---- Prometheus metrics endpoint ----
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
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
