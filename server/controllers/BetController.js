const Bet = require('../models/Bet');
const BetPrediction = require('../models/BetPrediction');

// Crée un nouveau pari
const createBet = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { raceId, predictions } = req.body;
        const userId = req.user.id;

        const existingBet = await Bet.verifyHasBetForRace(userId, raceId);
        if (existingBet) {
            return res.status(400).json({ error: 'You have already placed a bet for this race' });
        }

        // Crée le pari
        const newBet = await Bet.addBet(userId, raceId);

        // Ajoute les prédictions
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

// Récupère tous les paris d'un utilisateur
const getBet = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const userId = req.user.id;
        const bets = await Bet.getBetsByUser(userId);
        res.status(200).json(bets);
    } catch (error) {
        console.error('Error fetching bets:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des paris.' });
    }
};

// Récupère un pari par son ID
const getBetByID = async (req, res) => {
    try {
        const { betId } = req.params;
        const bet = await Bet.getBetById(betId);

        if (bet) {
            res.status(200).json(bet);
        } else {
            res.status(404).json({ error: 'Pari non trouvé.' });
        }
    } catch (error) {
        console.error('Error fetching bet by ID:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du pari.' });
    }
};

// Vérifie si l'utilisateur a déjà parié sur une course
const hasBetForRace = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { raceId } = req.query;
        const userId = req.user.id;

        const hasBet = await Bet.verifyHasBetForRace(userId, raceId);
        res.json({ hasBet });
    } catch (error) {
        console.error('Error checking bet status:', error);
        res.status(500).json({ error: 'Failed to check bet status' });
    }
};

module.exports = { createBet, getBet, getBetByID, hasBetForRace };
