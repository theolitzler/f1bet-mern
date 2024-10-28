const db = require('../config/db')();

// Crée la table des utilisateurs si elle n'existe pas
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// Fonction pour ajouter un utilisateur
const addUser = (username, email, passwordHash) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
        db.run(query, [username, email, passwordHash], function (err) {
            if (err) reject(err);
            resolve(this.lastID); // Renvoie l'ID du nouvel utilisateur
        });
    });
};

// Fonction pour récupérer un utilisateur par son email
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.get(query, [email], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

module.exports = { addUser, getUserByEmail };
