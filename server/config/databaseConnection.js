const sqlite3 = require('sqlite3').verbose();

// Fonction de connexion à la base de données SQLite
const connectDB = () => {
    const db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données SQLite :', err.message);
        } else {
            console.log('Connexion réussie à la base de données SQLite!');
        }
    });
    return db;
};

module.exports = connectDB;
