// Import the todo item data modal
const ToDo = require("../models/ToDo");

// Controller to create a new ToDo
exports.createToDo = async (req, res, next) => {
    try {
        // Extract task and category from the request body
        const { task, category } = req.body;

        // Check if a ToDo with the same task already exists
        const existingToDo = await ToDo.findOne({ task });

        if (existingToDo) {
            // If the task already exists, return a 400 Bad Request response
            return res.status(400).json({ success: false, message: "Task already exists!" });
        }

        // Create a new ToDo object with the provided data
        const data = {
            task: task,
            category: category
        };

        // Save the new ToDo to the database
        await ToDo.create(data);

        // Return a 201 Created response with a success message
        res.status(201).json({ success: true, message: "Task successfully added!" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// Controller to get all ToDo items
exports.getAllToDo = async (req, res, next) => {
    try {
        // Retrieve all ToDo items from the database
        const allToDo = await ToDo.find();

        // Return a 200 OK response with the retrieved ToDo items
        res.status(200).json({ success: true, message: allToDo });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// Controller to get a ToDo item by ID
exports.getToDoById = async (req, res, next) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;

        // Find the ToDo item by ID
        const toDo = await ToDo.findOne({ _id: id });

        if (!toDo) {
            // If the ToDo item is not found, return a 404 Not Found response
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        // Return a 200 OK response with the found ToDo item
        res.status(200).json({ success: true, message: toDo });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// Controller to edit a ToDo item by ID
exports.editToDo = async (req, res, next) => {
    try {
        // Extract the task, category, and isCompleted from the request body
        const { task, category, isCompleted } = req.body;
        // Extract the ID from the request parameters
        const { id } = req.params;

        // Find the existing ToDo item by ID
        const existingToDo = await ToDo.findOne({ _id: id });

        if (!existingToDo) {
            // If the ToDo item is not found, return a 404 Not Found response
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        // Create an object with the updated data
        const data = { task, category, isCompleted };

        // Update the ToDo item in the database
        await ToDo.updateOne({ _id: id }, { $set: data });

        // Return a 200 OK response with a success message
        res.status(200).json({ success: true, message: "Task successfully edited!" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// Controller to delete a ToDo item by ID
exports.deleteToDo = async (req, res, next) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;

        // Find the existing ToDo item by ID
        const existingToDo = await ToDo.findOne({ _id: id });

        if (!existingToDo) {
            // If the ToDo item is not found, return a 404 Not Found response
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        // Delete the ToDo item from the database
        await ToDo.deleteOne({ _id: id });

        // Return a 200 OK response with a success message
        res.status(200).json({ success: true, message: "Task successfully deleted!" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};