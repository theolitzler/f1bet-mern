const mongoose = require('mongoose');
const Driver = require('../models/Driver');
const Race = require("../models/Race");

// Controller to get all Drivers
exports.getAllDrivers = async (req, res, next) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json({ success: true, message: drivers });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};