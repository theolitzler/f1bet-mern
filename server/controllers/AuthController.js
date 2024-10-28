const { getUserByEmail, createUser } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await createUser(email, hashedPassword);
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Identifiants incorrects' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { registerUser, loginUser };
