// models/taskModel.js
// All raw SQL lives here. Controllers call these functions and never touch SQL directly.
//
// Note: columns are aliased with AS "camelCase" so the JSON keys returned to the
// frontend match the API contract exactly (dueDate, not due_date).

const pool = require("../config/db");

// ---- Dashboard ----

async function getSummary() {
  const totalResult = await pool.query("SELECT COUNT(*)::int AS count FROM tasks");
  const completedResult = await pool.query(
    "SELECT COUNT(*)::int AS count FROM tasks WHERE status = 'Completed'"
  );
  const pendingResult = await pool.query(
    "SELECT COUNT(*)::int AS count FROM tasks WHERE status != 'Completed'"
  );

  return {
    totalTasks: totalResult.rows[0].count,
    completedTasks: completedResult.rows[0].count,
    pendingTasks: pendingResult.rows[0].count,
  };
}

// ---- Tasks CRUD ----

const TASK_COLUMNS = `
  id,
  title,
  description,
  priority,
  status,
  TO_CHAR(due_date, 'YYYY-MM-DD') AS "dueDate",
  created_at AS "createdAt"
`;

async function getAllTasks() {
  const result = await pool.query(
    `SELECT ${TASK_COLUMNS} FROM tasks ORDER BY created_at DESC`
  );
  return result.rows;
}

async function getTaskById(id) {
  const result = await pool.query(
    `SELECT ${TASK_COLUMNS} FROM tasks WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function createTask({ title, description, priority, status, dueDate }) {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, priority, status, due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING ${TASK_COLUMNS}`,
    [title, description, priority, status || "Pending", dueDate]
  );
  return result.rows[0];
}

async function updateTask(id, { title, description, priority, status, dueDate }) {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1,
         description = $2,
         priority = $3,
         status = $4,
         due_date = $5
     WHERE id = $6
     RETURNING ${TASK_COLUMNS}`,
    [title, description, priority, status, dueDate, id]
  );
  return result.rows[0];
}

async function deleteTask(id) {
  const result = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rows[0];
}

async function updateTaskStatus(id, status) {
  const result = await pool.query(
    `UPDATE tasks
     SET status = $1
     WHERE id = $2
     RETURNING ${TASK_COLUMNS}`,
    [status, id]
  );
  return result.rows[0];
}

module.exports = {
  getSummary,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
