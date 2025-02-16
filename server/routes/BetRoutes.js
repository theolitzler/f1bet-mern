const express = require("express");
const router = express.Router();
const betController = require("../controllers/BetController");
const verifyToken = require("../middlewares/AuthMiddleware");

// Define routes and their respective handlers //
router.post("/", verifyToken, betController.createBet);
router.get("/", betController.getBet);
router.get("/:betId", betController.getBetByID);
router.get("/check/:raceId", verifyToken, betController.hasBetForRace);

module.exports = router;
