// Error-handling middleware function
// This middleware function is used to handle errors that occur during the request-response cycle

exports.handleErrors = (error, req, res, next) => {
    // Log the error details to the console
    console.error("Error:", error);

    // Set the HTTP status code to 500 (Internal Server Error)
    // Send a JSON response with a success flag set to false and an error message
    res.status(500).json({ 
        success: false, 
        message: "Unable to process your request now. Please try again later!" 
    });
};