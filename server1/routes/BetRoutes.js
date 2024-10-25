const express = require("express");
const betRouter = express.Router();
const betController = require("../controllers/BetController");
// const checkAuth = require('../middlewares/AuthMiddleware');

// Define routes and their respective handlers //

betRouter.post("/", betController.createBet);
betRouter.get("/", betController.getBet);
betRouter.get("/:betId", betController.getBetByID);

module.exports = betRouter;