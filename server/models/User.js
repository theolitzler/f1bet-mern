const db = require('../config/databaseConnection');

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

const addUser = (username, email, passwordHash) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
        db.run(query, [username, email, passwordHash], function (err) {
            if (err) {
                reject(new Error(`Failed to add user: ${err.message}`));
            } else {
                resolve(this.lastID);
            }
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.get(query, [email], (err, row) => {
            if (err) {
                reject(new Error(`Failed to retrieve user by email: ${err.message}`));
            } else {
                resolve(row);
            }
        });
    });
};

module.exports = { addUser, getUserByEmail };