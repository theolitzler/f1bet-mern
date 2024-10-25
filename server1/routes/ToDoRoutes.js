const express = require("express");
const toDoRouter = express.Router(); // Create a new router instance
const toDoController = require("../controllers/ToDoController"); // Import the ToDo controller
const { validateToDoRequest } = require("../middlewares/RequestValidator"); // Import the request validation middleware
const checkAuth = require('../middlewares/AuthMiddleware');

// Function to create validation middleware dynamically based on request type
const createValidationMiddleware = (type) => (req, res, next) => validateToDoRequest(type, req, res, next);

// Define routes and their respective handlers

// Route to handle creating a new ToDo item
toDoRouter.post("/new", checkAuth, createValidationMiddleware("create"), toDoController.createToDo);

// Route to handle retrieving all ToDo items
toDoRouter.get("/all", toDoController.getAllToDo);

// Route to handle retrieving a ToDo item by its ID
toDoRouter.get("/:id", toDoController.getToDoById);

// Route to handle editing/updating a ToDo item by its ID
toDoRouter.put("/:id", checkAuth, createValidationMiddleware("edit"), toDoController.editToDo);

// Route to handle deleting a ToDo item by its ID
toDoRouter.delete("/:id", toDoController.deleteToDo);

module.exports = toDoRouter; // Export the router for use in other parts of the application