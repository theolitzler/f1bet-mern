const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRoutes');
const betRoutes = require('./routes/BetRoutes');
const driverRoutes = require('./routes/driverRoutes');
const raceRoutes = require('./routes/raceRoutes');

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Définir les chemins pour chaque ressource
app.use('/api/auth', authRoutes);       // Routes d'authentification
app.use('/api/users', userRoutes);      // Routes pour les utilisateurs
app.use('/api/bets', betRoutes);        // Routes pour les paris
app.use('/api/drivers', driverRoutes);  // Routes pour les pilotes
app.use('/api/races', raceRoutes);      // Routes pour les courses

// Gestion des erreurs 404 pour les routes inconnues
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
});

app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
