const Bet = require('../models/Bet');
const BetPrediction = require('../models/BetPrediction');

// Crée un nouveau pari
const createBet = async (req, res) => {
    const { raceId, predictions } = req.body; // `predictions` est un tableau de { driverId, predictedPosition }
    const userId = req.user.id; // Assure-toi que l'utilisateur est authentifié

    try {
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
        res.status(500).json({ error: 'Failed to create bet' });
    }

    // const { userId, raceId } = req.body;
    // try {
    //     const betId = await addBet(userId, raceId);
    //     res.status(201).json({ id: betId, userId, raceId });
    // } catch (error) {
    //     res.status(500).json({ error: 'Erreur lors de la création du pari.' });
    // }
};

// Récupère tous les paris d'un utilisateur
const getBet = async (req, res) => {
    const { userId } = req.query;
    try {
        const bets = await getBetsByUser(userId);
        res.status(200).json(bets);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des paris.' });
    }
};

// Récupère un pari par son ID
const getBetByID = async (req, res) => {
    const { betId } = req.params;
    try {
        const bet = await getBetById(betId);
        if (bet) {
            res.status(200).json(bet);
        } else {
            res.status(404).json({ error: 'Pari non trouvé.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du pari.' });
    }
};

module.exports = { createBet, getBet, getBetByID };
