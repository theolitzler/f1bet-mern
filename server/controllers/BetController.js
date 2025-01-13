const Bet = require('../models/Bet');
const BetPrediction = require('../models/BetPrediction');

const createBet = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { raceId, predictions } = req.body;
        const userId = req.user.id;

        const newBet = await Bet.addBet(userId, raceId);

        const predictionsData = predictions.map(prediction => ({
            bet_id: newBet.id,
            driver_id: prediction.id,
            predicted_position: prediction.position
        }));

        await BetPrediction.bulkCreate(predictionsData);

        res.status(201).json({ message: 'Bet and predictions saved successfully' });
    } catch (error) {
        console.error('Bet creation error:', error);
        res.status(500).json({ 
            error: 'Failed to create bet',
            details: error.message 
        });
    }
};

const getBet = async (req, res) => {
    const { userId } = req.query;
    try {
        const bets = await getBetsByUser(userId);
        res.status(200).json(bets);
    } catch (error) {
        console.error('Error retrieving bets:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve bets',
            details: error.message 
        });
    }
};

const getBetByID = async (req, res) => {
    const { betId } = req.params;
    try {
        const bet = await getBetById(betId);
        if (bet) {
            res.status(200).json(bet);
        } else {
            res.status(404).json({ error: 'Bet not found' });
        }
    } catch (error) {
        console.error('Error retrieving bet:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve bet',
            details: error.message 
        });
    }
};

module.exports = { createBet, getBet, getBetByID };