const db = require('../config/databaseConnection.js');
const fs = require('fs');
const path = require('path');

const initializeDrivers = () => {
    const sqlFile = path.join(__dirname, '../scripts/drivers.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    db.exec(sql, (err) => {
        if (err) {
            console.error('Error initializing drivers:', err.message);
        } else {
            console.log('Drivers table initialized successfully');
        }
    });
};

db.run(`
    CREATE TABLE IF NOT EXISTS drivers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        pilotNumber INTEGER NOT NULL,
        team VARCHAR(100),
        nationality VARCHAR(50)
    )
`, (err) => {
    if (err) {
        console.error('Error creating drivers table:', err.message);
    } else {
        // Initialize data after table creation
        initializeDrivers();
    }
});

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
