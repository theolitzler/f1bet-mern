const express = require("express");
const raceRouter = express.Router();
const betController = require("../controllers/BetController");
// const checkAuth = require('../middlewares/AuthMiddleware');

// Define routes and their respective handlers //

raceRouter.post("/", betController.createBet);
raceRouter.get("/", betController.getBetsByRace);
raceRouter.get("/:betId", betController.getBetByID);

module.exports = raceRouter;