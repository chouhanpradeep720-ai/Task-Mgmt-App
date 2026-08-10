const pool = require("../config/db");

// Get all users
async function getAllUsers() {

    const result = await pool.query(
        `SELECT
            id,
            username,
            role,
            created_at AS "createdAt"
        FROM users
        ORDER BY id ASC`
    );

    return result.rows;

}


// Get single user by ID
async function getUserById(id) {

    const result = await pool.query(
        `SELECT *
         FROM users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];

}


// Create user
async function createUser({ username, password, role }) {

    const result = await pool.query(
        `INSERT INTO users
        (username, password, role)
        VALUES ($1, $2, $3)
        RETURNING
        id,
        username,
        role,
        created_at AS "createdAt"`,
        [
            username,
            password,
            role || "user"
        ]
    );

    return result.rows[0];

}


// Delete user
async function deleteUser(id) {

    const result = await pool.query(
        `DELETE FROM users
        WHERE id = $1
        RETURNING id`,
        [id]
    );

    return result.rows[0];

}


module.exports = {

    getAllUsers,

    getUserById,

    createUser,

    deleteUser

};
