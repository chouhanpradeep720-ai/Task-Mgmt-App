const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");


// Get all users
router.get("/", userController.getUsers);


// Create user
router.post("/", userController.createUser);


// Delete user
router.delete("/:id", userController.deleteUser);


module.exports = router;
