const userModel = require("../models/userModel");


// Get all users
async function getUsers(req, res) {

    try {

        const users = await userModel.getAllUsers();

        res.json(users);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to fetch users"

        });

    }

}


// Create User
async function createUser(req, res) {

    try {

        const {

            username,

            password,

            role

        } = req.body;


        if (!username || !password) {

            return res.status(400).json({

                message: "Username and password are required"

            });

        }


        const user = await userModel.createUser({

            username,

            password,

            role

        });


        res.status(201).json(user);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to create user"

        });

    }

}


// Delete User
async function deleteUser(req, res) {

    try {

        const existingUser = await userModel.getUserById(req.params.id);


        if (!existingUser) {

            return res.status(404).json({

                message: "User not found"

            });

        }


        // Default admin cannot be deleted
        if (existingUser.username === "cloudadmin") {

            return res.status(400).json({

                message: "Default admin cannot be deleted"

            });

        }


        await userModel.deleteUser(req.params.id);


        res.json({

            message: "User deleted successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to delete user"

        });

    }

}


module.exports = {

    getUsers,

    createUser,

    deleteUser

};
