const Bet = require('../models/Bet');

// Controller to post a bet
exports.createBet = async (req, res, next) => {
    try {
        // Extract userId, raceId and prediction from the request body
        const { userId, raceId, prediction } = req.body;

        // Check if a Bet with the same id already exists
        // const existingBet = await Bet.findOne({ userId, raceId });

        // if (existingBet) {
        //     // If the bet already exists, edit the existing one
        //
        // }

        // Create a new Bet object with the provided data
        const data = {
            userId: userId,
            raceId: raceId,
            prediction: prediction
        };

        // Save the new Bet to the database
        await Bet.create(data);

        // Return a 201 Created response with a success message
        res.status(201).json({ success: true, message: "Bet successfully added!" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// Controller to update a bet
// exports.updateBet = async (req, res, next) => {
//     try {
//         // Extract the bet, category, and isCompleted from the request body
//         const { userId, raceId, prediction } = req.body;
//
//         // Find the existing Bet item by user and race ID
//         const existingBet = await Bet.findOne({ userId: userId, raceId: raceId });
//
//         if (!existingBet) {
//             // If the Bet item is not found, return a 404 Not Found response
//             return res.status(404).json({ success: false, message: "bet not found!" });
//         }
//
//         // Create an object with the updated data
//         const data = { userId, raceId, prediction };
//
//         // Update the Bet item in the database
//         await Bet.updateOne({ userId: userId, raceId: raceId }, { $set: data });
//
//         // Return a 200 OK response with a success message
//         res.status(200).json({ success: true, message: "Bet successfully edited!" });
//     } catch (error) {
//         // Pass any errors to the error-handling middleware
//         next(error);
//     }
// }

// Controller to get a bet by ID
// exports.getBetByID = async (req, res, next) => {
//
// }

// Controller to get all bets by Race
// exports.getBetByRace = async (req, res, next) => {
//
// }

// Controller to get all bets by User
// exports.getBetByID = async (req, res, next) => {
//
// }