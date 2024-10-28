const { addBet, getBetsByUser } = require('../models/Bet');

const createBet = async (req, res) => {
    const { userId, raceId } = req.body;
    try {
        const betId = await addBet(userId, raceId);
        res.status(201).json({ id: betId, userId, raceId });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du pari.' });
    }
};

const getUserBets = async (req, res) => {
    const { userId } = req.params;
    try {
        const bets = await getBetsByUser(userId);
        res.status(200).json(bets);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des paris.' });
    }
};

module.exports = { createBet, getUserBets };
