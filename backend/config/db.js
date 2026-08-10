// config/db.js
// Sets up a single, reusable PostgreSQL connection pool for the whole app.

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Quick sanity check on startup so connection issues are obvious immediately
// instead of surfacing as a confusing error on the first API request.
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err.message);
    return;
  }
  console.log("✅ Connected to PostgreSQL database:", process.env.DB_NAME);
  release();
});

module.exports = pool;
