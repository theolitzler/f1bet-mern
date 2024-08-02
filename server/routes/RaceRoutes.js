const express = require("express");
const raceRouter = express.Router();
const raceController = require("../controllers/RaceController");
const betController = require("../controllers/BetController");
// const checkAuth = require('../middlewares/AuthMiddleware');

// Define routes and their respective handlers //

raceRouter.get("/all", raceController.getAllRaces);
raceRouter.get("/upcoming", raceController.getUpcomingRaces);
raceRouter.get("/completed", raceController.getCompletedRaces);
raceRouter.get("/:id", raceController.getRaceById);
raceRouter.post("/:id/bet", betController.createBet);

module.exports = raceRouter;