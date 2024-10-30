require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/AuthMiddleware');

const secretKey = process.env.JWT_SECRET;

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Authentication failed' });
    }
  });

  router.get('/me', authMiddleware, async (req, res) => {
    try {
      // Récupération de l'ID de l'utilisateur depuis le middleware authMiddleware
      const userId = req.userData.userId;
      // Récupération des informations de l'utilisateur depuis la base de données
      const user = await User.findById(userId).select('-password'); // Exclure le mot de passe
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user information' });
    }
  });

  module.exports = router;