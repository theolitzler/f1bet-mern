const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Fonction de connexion à la base de données SQLite
const db = new sqlite3.Database(path.resolve(__dirname, '../database.db'), (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données SQLite :', err.message);
    } else {
        console.log('Connexion réussie à la base de données SQLite!');
    }
});

module.exports = db;