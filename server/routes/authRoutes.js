const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/AuthController');

// Route pour l'enregistrement des utilisateurs
router.post('/register', registerUser);

// Route pour la connexion des utilisateurs
router.post('/login', loginUser);

module.exports = router;
