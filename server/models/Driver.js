const db = require('../config/db')();

db.run(`
    CREATE TABLE IF NOT EXISTS drivers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        team VARCHAR(100),
        nationality VARCHAR(50)
    )
`);

const addDriver = (name, team, nationality) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO drivers (name, team, nationality) VALUES (?, ?, ?)`;
        db.run(query, [name, team, nationality], function (err) {
            if (err) reject(err);
            resolve(this.lastID);
        });
    });
};

const getAllDrivers = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM drivers`;
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

module.exports = { addDriver, getAllDrivers };
