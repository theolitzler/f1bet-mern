const db = require('../config/databaseConnection');

db.run(`
    CREATE TABLE IF NOT EXISTS bet_predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bet_id INTEGER NOT NULL,
        driver_id INTEGER NOT NULL,
        predicted_position INTEGER NOT NULL,
        FOREIGN KEY (bet_id) REFERENCES bets(id) ON DELETE CASCADE,
        FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
        UNIQUE(bet_id, driver_id)
    )
`);

const addPrediction = (betId, driverId, position) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO bet_predictions (bet_id, driver_id, predicted_position) VALUES (?, ?, ?)`;
        db.run(query, [betId, driverId, position], function (err) {
            if (err) reject(new Error(`Failed to add prediction: ${err.message}`));
            resolve(this.lastID);
        });
    });
};

const bulkCreate = (predictions) => {
    return new Promise((resolve, reject) => {
        if (predictions.length === 0) return resolve([]);

        const placeholders = predictions.map(() => '(?, ?, ?)').join(', ');
        const query = `
            INSERT OR REPLACE INTO bet_predictions (bet_id, driver_id, predicted_position) 
            VALUES ${placeholders}
        `;

        const values = predictions.flatMap(prediction => [
            prediction.bet_id,
            prediction.driver_id,
            prediction.predicted_position
        ]);

        db.run(query, values, function (err) {
            if (err) return reject(new Error(`Failed to bulk create predictions: ${err.message}`));
            resolve(this.changes);
        });
    });
};

module.exports = { addPrediction, bulkCreate };