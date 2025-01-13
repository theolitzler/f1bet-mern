const { getBetById } = require('../models/Bet');

const checkBetOwnership = async (req, res, next) => {
    const betId = req.params.id;
    const userId = req.user.id;
    try {
        const bet = await getBetById(betId);
        if (!bet || bet.user_id !== userId) {
            return res.status(403).json({ error: 'Accès refusé.' });
        }
        next();
    } catch (error) {
        console.error('Error checking bet ownership:', error);
        res.status(500).json({ 
            error: 'Server error',
            details: error.message 
        });
    }
};

module.exports = checkBetOwnership;