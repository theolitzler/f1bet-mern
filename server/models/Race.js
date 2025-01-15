const db = require('../config/databaseConnection');
const fs = require('fs');
const path = require('path');

const initializeRaces = () => {
    const sqlFile = path.join(__dirname, '../scripts/races.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    db.exec(sql, (err) => {
        if (err) {
            console.error('Error initializing races:', err.message);
        } else {
            console.log('Races table initialized successfully');
        }
    });
};

db.run(`
    CREATE TABLE IF NOT EXISTS races (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        date DATETIME NOT NULL,
        location VARCHAR(100) NOT NULL,
        countryCode VARCHAR(3) NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating races table:', err.message);
    } else {
        // Initialize data after table creation
        initializeRaces();
    }
});

const addRace = (name, date, location) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO races (name, date, location) VALUES (?, ?, ?)`;
        db.run(query, [name, date, location], function (err) {
            if (err) reject(err);
            resolve(this.lastID);
        });
    });
};

const getAllTheRaces = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM races`;
        db.all(query, [], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

const getTheRaceById = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM races WHERE id = ?`;
        db.get(query, [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

module.exports = { addRace, getAllTheRaces, getTheRaceById };
