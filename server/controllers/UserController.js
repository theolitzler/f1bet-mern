const { getUserByEmail } = require('../models/User');

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve user',
            details: error.message 
        });
    }
};

module.exports = { getUserById };