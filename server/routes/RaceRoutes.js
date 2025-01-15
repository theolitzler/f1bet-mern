const express = require('express');
const router = express.Router();
const { createRace, getAllRaces, getRaceById, calculateBetScores } = require('../controllers/RaceController');

router.post('/create', createRace);
router.get('/all', getAllRaces);
router.get('/:id', getRaceById);
router.post('/:id/calculate-scores', calculateBetScores);

module.exports = router;
