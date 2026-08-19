const pool = require("../config/db");

async function createAdmin() {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      console.log("⚠️ Admin credentials are not configured.");
      return;
    }

    const existingAdmin = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (existingAdmin.rows.length > 0) {
      console.log(`✅ Admin '${username}' already exists.`);
      return;
    }

    await pool.query(
      `INSERT INTO users (username, password, role)
       VALUES ($1, $2, 'admin')`,
      [username, password]
    );

    console.log(`✅ Admin '${username}' created successfully.`);
  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);
  }
}

module.exports = createAdmin;
