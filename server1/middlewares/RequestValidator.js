// Todo request validation middleware
// This middleware function validates the request body for creating or editing a to-do item

exports.validateToDoRequest = (type, req, res, next) => {
    // Destructure the required fields from the request body
    const { task, category, isCompleted } = req.body;

    // Initialize an array to hold validation errors
    const errors = [];

    // Validate the 'task' field
    if (!task) {
        // If 'task' is missing, add an error message
        errors.push("Task name is required!");
    } else if (task.length < 3) {
        // If 'task' is less than 3 characters long, add an error message
        errors.push("Task name must be at least 3 characters long!");
    }

    // Define valid categories for the 'category' field
    const validCategories = ['Work', 'Personal', 'Home', 'Urgent'];

    // Validate the 'category' field
    if (!category) {
        // If 'category' is missing, add an error message
        errors.push("Category is required!");
    } else if (!validCategories.includes(category)) {
        // If 'category' is not in the list of valid categories, add an error message
        errors.push(`Invalid category. Please use one of the following: ${validCategories.join(', ')}.`);
    }

    // Validate the 'isCompleted' field if the request is for editing an existing to-do item
    if (type === "edit" && isCompleted === undefined) {
        // If 'isCompleted' is missing in an edit request, add an error message
        errors.push("IsCompleted is required!");
    } else if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
        // If 'isCompleted' is present but not a boolean, add an error message
        errors.push("IsCompleted must be a boolean!");
    }

    // If there are any validation errors, send a 400 Bad Request response with the errors
    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: errors });
    }

    // If no validation errors, proceed to the next route handler
    next();
};