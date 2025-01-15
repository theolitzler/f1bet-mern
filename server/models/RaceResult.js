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

const getRaceResults = (raceId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT rr.*, d.name as driver_name, d.team
            FROM race_results rr
            JOIN drivers d ON rr.driver_id = d.id
            WHERE rr.race_id = ?
            ORDER BY rr.actual_position ASC
        `;
        db.all(query, [raceId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = { addRaceResult, getRaceResults };
