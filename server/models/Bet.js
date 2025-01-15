const db = require('../config/databaseConnection');

db.run(`
    CREATE TABLE IF NOT EXISTS bets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        race_id INTEGER NOT NULL,
        score INTEGER DEFAULT NULL,
        is_scored INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (race_id) REFERENCES races(id),
        UNIQUE(user_id, race_id)
    )
`);

const addBet = (userId, raceId) => {
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
                reject(new Error(`Failed to create bet: ${err.message}`));
            } else if (this.changes === 0) {
                reject(new Error('Bet already exists for this user and race'));
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
            if (err) reject(new Error(`Failed to retrieve bets: ${err.message}`));
            resolve(rows);
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
            if (err) reject(new Error(`Failed to retrieve bet: ${err.message}`));
            resolve(row || null);
        });
    });
};

const getBetsByRace = (raceId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT b.id as bet_id, b.user_id, u.username,
                   bp.predicted_position, bp.driver_id, d.name as driver_name
            FROM bets b
            JOIN users u ON b.user_id = u.id
            JOIN bet_predictions bp ON b.id = bp.bet_id
            JOIN drivers d ON bp.driver_id = d.id
            WHERE b.race_id = ?
            ORDER BY b.id, bp.predicted_position ASC
        `;
        db.all(query, [raceId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Function to calculate scores for the bets
const calculateBetScores = async (raceId) => {
    try {
        const raceResults = await getRaceResults(raceId);
        const bets = await getBetsByRace(raceId);
        
        const resultPositions = new Map(
            raceResults.map(result => [result.driver_id, result.actual_position])
        );
        
        // Group bets by bet_id
        const betsByUser = bets.reduce((acc, bet) => {
            if (!acc[bet.bet_id]) {
                acc[bet.bet_id] = {
                    userId: bet.user_id,
                    username: bet.username,
                    predictions: []
                };
            }
            acc[bet.bet_id].predictions.push({
                driverId: bet.driver_id,
                predictedPosition: bet.predicted_position
            });
            return acc;
        }, {});

        // Calculate score for each bet
        for (const [betId, bet] of Object.entries(betsByUser)) {
            let score = 0;
            for (const prediction of bet.predictions) {
                const actualPosition = resultPositions.get(prediction.driverId);
                if (actualPosition === prediction.predictedPosition) {
                    score += 10; // Exact position match
                } else if (Math.abs(actualPosition - prediction.predictedPosition) === 1) {
                    score += 5; // Off by one position
                }
            }
            
            // Update bet score in database
            await updateBetScore(betId, score);
        }
    } catch (error) {
        console.error('Error calculating bet scores:', error);
        throw error;
    }
};

// Function to update bet score in database
const updateBetScore = (betId, score) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE bets 
            SET score = ?, is_scored = 1 
            WHERE id = ?
        `;
        db.run(query, [score, betId], function(err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

module.exports = { addBet, getBetsByUser, getBetById, calculateBetScores };