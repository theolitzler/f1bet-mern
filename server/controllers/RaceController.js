const mongoose = require("mongoose");
const Race = require("../models/Race");

// Controller to get all Race items
exports.getAllRaces = async (req, res, next) => {
  try {
    const races = await Race.find();
    res.status(200).json({ success: true, message: races });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

exports.getUpcomingRaces = async (req, res, next) => {
  try {
    const currentDate = new Date();

    const allRaces = await Race.find();
    const upcomingRaces = allRaces.filter(race => new Date(race.date) > currentDate);
    const races = upcomingRaces.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({ success: true, message: races });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

exports.getCompletedRaces = async (req, res, next) => {
  try {
    const currentDate = new Date();

    const allRaces = await Race.find();
    const completedRaces = allRaces.filter(race => new Date(race.date) < currentDate);
    const races = completedRaces.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({ success: true, message: races });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Controller to get a Race item by ID
exports.getRaceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const races = await Race.findOne({ _id: id });

    if (!races) {
      return res
        .status(404)
        .json({ success: false, message: "Race not found!" });
    }

    res.status(200).json({ success: true, message: races });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};
