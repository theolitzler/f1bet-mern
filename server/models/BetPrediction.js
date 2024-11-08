const db = require('../config/databaseConnection');

db.run(`
    CREATE TABLE IF NOT EXISTS bet_predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bet_id INTEGER REFERENCES bets(id) ON DELETE CASCADE,
        driver_id INTEGER REFERENCES drivers(id) ON DELETE CASCADE,
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

const bulkCreate = (predictions) => {
    return new Promise((resolve, reject) => {
        if (predictions.length === 0) return resolve([]);

        const placeholders = predictions.map(() => '(?, ?, ?)').join(', ');
        const query = `INSERT INTO bet_predictions (bet_id, driver_id, predicted_position) VALUES ${placeholders}`;

        const values = predictions.flatMap(prediction => [
            prediction.betId,
            prediction.driverId,
            prediction.position
        ]);

        db.run(query, values, function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
        });
    });
};

module.exports = { addPrediction, bulkCreate };
