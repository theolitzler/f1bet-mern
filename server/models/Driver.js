const db = require('../config/databaseConnection.js');

db.run(`
    CREATE TABLE IF NOT EXISTS drivers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        pilotNumber INTEGER NOT NULL,
        team VARCHAR(100),
        nationality VARCHAR(50)
    )
`);

const addDriver = (name, pilotNumber, team, nationality) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO drivers (name, pilotNumber, team, nationality) VALUES (?, ?, ?, ?)`;
        db.run(query, [name, pilotNumber, team, nationality], function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
};

const getAllTheDrivers = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM drivers`;
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = { addDriver, getAllTheDrivers };
