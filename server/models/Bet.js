const db = require('../config/databaseConnection');

db.run(`
    CREATE TABLE IF NOT EXISTS bets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        race_id INTEGER NOT NULL,
        score INTEGER DEFAULT NULL,  // Nouveau champ pour stocker le score
        is_scored BOOLEAN DEFAULT 0, // Indicateur si le pari a été scoré
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (race_id) REFERENCES races(id),
        UNIQUE(user_id, race_id)
    )
`);

const createBet = (userId, raceId) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO bets (user_id, race_id)
            SELECT ?, ? 
            WHERE NOT EXISTS (
                SELECT 1 FROM bets 
                WHERE user_id = ? AND race_id = ?
            )
        `;
        db.run(query, [userId, raceId, userId, raceId], function (err) {
            if (err) {
                reject(new Error(`Failed to create bet for user_id: ${userId}, race_id: ${raceId}. Error: ${err.message}`));
            } else if (this.changes === 0) {
                reject(new Error(`Bet already exists for user_id: ${userId}, race_id: ${raceId}`));
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

const getBetsByUser = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT b.*, r.name as race_name 
            FROM bets b
            JOIN races r ON b.race_id = r.id
            WHERE b.user_id = ?
        `;
        db.all(query, [userId], (err, rows) => {
            if (err) {
                reject(new Error(`Failed to retrieve bets for user_id: ${userId}. Error: ${err.message}`));
            } else {
                resolve(rows);
            }
        });
    });
};

const getBetById = (betId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT b.*, r.name as race_name, bp.driver_id, bp.predicted_position, d.name as driver_name
            FROM bets b
            JOIN races r ON b.race_id = r.id
            LEFT JOIN bet_predictions bp ON b.id = bp.bet_id
            LEFT JOIN drivers d ON bp.driver_id = d.id
            WHERE b.id = ?
        `;
        db.get(query, [betId], (err, row) => {
            if (err) {
                reject(new Error(`Failed to retrieve bet with id: ${betId}. Error: ${err.message}`));
            } else {
                resolve(row);
            }
        });
    });
};

module.exports = { createBet, getBetsByUser, getBetById };