const db = require('../config/databaseConnection');

db.run(`
    CREATE TABLE IF NOT EXISTS race_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        race_id INTEGER NOT NULL,
        driver_id INTEGER NOT NULL,
        actual_position INTEGER NOT NULL,
        FOREIGN KEY (race_id) REFERENCES races(id),
        FOREIGN KEY (driver_id) REFERENCES drivers(id)
    )
`);

const addRaceResult = (raceId, driverId, position) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO race_results (race_id, driver_id, actual_position) VALUES (?, ?, ?)`;
        db.run(query, [raceId, driverId, position], function (err) {
            if (err) reject(err);
            resolve(this.lastID);
        });
    });
};

module.exports = { addRaceResult };
