const { getUserByEmail } = require('../models/User');

const checkUserExists = async (req, res, next) => {
    const { email } = req.body;
    try {
        const existingUser = await getUserByEmail(email); // SQLite
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Erreur du serveur.' });
    }
};

module.exports = checkUserExists;
