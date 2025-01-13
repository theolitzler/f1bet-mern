const { getUserByEmail, addUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await addUser(username, email, hashedPassword);
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ 
      error: "Failed to register user",
      details: err.message 
    });
  }
};

const loginUser = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET est manquant");
      return res.status(500).json({ error: "Erreur de configuration du serveur" });
    }

    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ 
      error: "Failed to log in user",
      details: err.message 
    });
  }
};

module.exports = { registerUser, loginUser };