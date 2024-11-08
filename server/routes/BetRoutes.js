const express = require("express");
const router = express.Router();
const betController = require("../controllers/BetController");
const checkAuth = require('../middlewares/AuthMiddleware');

// Define routes and their respective handlers //
router.post("/", checkAuth, betController.createBet);
router.get("/", betController.getBet);
router.get("/:betId", betController.getBetByID);

module.exports = router;