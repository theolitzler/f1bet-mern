const { getUserByEmail } = require('../models/User');

const checkUserExists = async (req, res, next) => {
    const { email } = req.body;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }
        next();
    } catch (error) {
        console.error('Error checking user existence:', error);
        res.status(500).json({ 
            error: 'Server error',
            details: error.message 
        });
    }
};

module.exports = checkUserExists;