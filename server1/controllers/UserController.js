const User = require('../models/User');

exports.getRankings = async (req, res) => {
    try {
        // Fetch all users sorted by totalPoints in descending order
        const rankings = await User.find().sort({ totalPoints: -1 }).select('username totalPoints');
        res.status(200).json(rankings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rankings' });
    }
};