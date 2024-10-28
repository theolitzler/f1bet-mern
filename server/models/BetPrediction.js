const db = require('../config/db')();

db.run(`
    CREATE TABLE IF NOT EXISTS bet_predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bet_id INTEGER NOT NULL,
        driver_id INTEGER NOT NULL,
        predicted_position INTEGER NOT NULL,
        FOREIGN KEY (bet_id) REFERENCES bets(id),
        FOREIGN KEY (driver_id) REFERENCES drivers(id)
    )
`);

const addPrediction = (betId, driverId, position) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO bet_predictions (bet_id, driver_id, predicted_position) VALUES (?, ?, ?)`;
        db.run(query, [betId, driverId, position], function (err) {
            if (err) reject(err);
            resolve(this.lastID);
        });
    });
};

module.exports = { addPrediction };
