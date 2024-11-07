const { getUserByEmail, addUser } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await addUser(username, email, hashedPassword);
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur\n' + err });
    }
};

const loginUser = async (req, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET est manquant');
            return res.status(500).json({ error: 'Erreur de configuration du serveur' });
        }

        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Identifiants incorrects' });
        }

        if (!user.password_hash) {
            return res.status(500).json({ error: 'Erreur interne : mot de passe non défini pour cet utilisateur.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Identifiants incorrects' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
};

module.exports = { registerUser, loginUser };
