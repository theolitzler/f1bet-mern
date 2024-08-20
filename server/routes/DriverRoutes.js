const express = require("express");
const driverRouter = express.Router();
const driverController = require("../controllers/DriverController");

driverRouter.get("/all", driverController.getAllDrivers);

module.exports = driverRouter;