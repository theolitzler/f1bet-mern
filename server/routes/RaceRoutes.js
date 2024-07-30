const express = require("express");
const raceRouter = express.Router();
const raceController = require("../controllers/RaceController");

// Define routes and their respective handlers //

raceRouter.get("/all", raceController.getAllRaces);
raceRouter.get("/upcoming", raceController.getUpcomingRaces);
raceRouter.get("/completed", raceController.getCompletedRaces);
// raceRouter.get("/:id", raceController.getRaceById);

module.exports = raceRouter;