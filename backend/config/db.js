const { Pool } = require("pg");
require("dotenv").config();
const client = require("prom-client");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

  ssl: {
    rejectUnauthorized: false,
  },
});

// =====================================================
// PostgreSQL Pool Metrics
// =====================================================

const dbPoolTotalConnections = new client.Gauge({
  name: "db_pool_total_connections",
  help: "Total number of PostgreSQL connections in the pool",
});

const dbPoolIdleConnections = new client.Gauge({
  name: "db_pool_idle_connections",
  help: "Number of idle PostgreSQL connections in the pool",
});

const dbPoolWaitingRequests = new client.Gauge({
  name: "db_pool_waiting_requests",
  help: "Number of requests waiting for a PostgreSQL connection",
});

const dbPoolActiveConnections = new client.Gauge({
  name: "db_pool_active_connections",
  help: "Number of active PostgreSQL connections in the pool",
});

// =====================================================
// PostgreSQL Query Metrics
// =====================================================

const dbQueriesTotal = new client.Counter({
  name: "db_queries_total",
  help: "Total number of PostgreSQL queries",
});

const dbQueryErrorsTotal = new client.Counter({
  name: "db_query_errors_total",
  help: "Total number of PostgreSQL query errors",
});

const dbQueryDuration = new client.Histogram({
  name: "db_query_duration_seconds",
  help: "PostgreSQL query execution duration in seconds",
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

// =====================================================
// Pool Metrics Update
// =====================================================

setInterval(() => {
  dbPoolTotalConnections.set(pool.totalCount);
  dbPoolIdleConnections.set(pool.idleCount);
  dbPoolWaitingRequests.set(pool.waitingCount);
  dbPoolActiveConnections.set(
    pool.totalCount - pool.idleCount
  );
}, 5000);

// =====================================================
// Query Wrapper
// =====================================================

const originalQuery = pool.query.bind(pool);

pool.query = async (...args) => {
  const start = process.hrtime();

  try {
    const result = await originalQuery(...args);

    dbQueriesTotal.inc();

    return result;
  } catch (error) {
    dbQueriesTotal.inc();
    dbQueryErrorsTotal.inc();

    throw error;
  } finally {
    const diff = process.hrtime(start);

    const duration =
      diff[0] + diff[1] / 1e9;

    dbQueryDuration.observe(duration);
  }
};

// =====================================================
// PostgreSQL Connection Check
// =====================================================

pool.connect((err, client, release) => {
  if (err) {
    console.error(
      "❌ Failed to connect to PostgreSQL:",
      err.message
    );
    return;
  }

  console.log(
    "✅ Connected to PostgreSQL database:",
    process.env.DB_NAME
  );

  release();
});

module.exports = pool;