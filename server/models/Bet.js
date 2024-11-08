const db = require('../config/databaseConnection');

db.run(`
    CREATE TABLE IF NOT EXISTS bets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        race_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (race_id) REFERENCES races(id)
        UNIQUE(user_id, race_id)
    )
`);

const addBet = (userId, raceId) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO bets (user_id, race_id) VALUES (?, ?)`;
        db.run(query, [userId, raceId], function (err) {
            if (err) reject(err);
            resolve(this.lastID);
        });
    });
};

const getBetsByUser = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM bets WHERE user_id = ?`;
        db.all(query, [userId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

module.exports = { addBet, getBetsByUser };
