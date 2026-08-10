const pool = require("../config/db");


async function login(req, res) {

    try {

        const { username, password } = req.body;


        if (!username || !password) {

            return res.status(400).json({
                message: "Username and password required"
            });

        }


        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );


        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "Invalid username or password"
            });

        }


        const user = result.rows[0];


        if (user.password !== password) {

            return res.status(401).json({
                message: "Invalid username or password"
            });

        }


        res.json({

            message: "Login successful",

            user: {

                id: user.id,

                username: user.username,

                role: user.role

            }

        });


    } catch(error) {


        console.error(error);


        res.status(500).json({

            message: "Server error"

        });


    }

}


module.exports = {
    login
};
