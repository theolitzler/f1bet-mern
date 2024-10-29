const express = require('express');
const router = express.Router();
const { createRace, getAllRaces, getRaceById} = require('../controllers/RaceController');

router.post('/create', createRace);
router.get('/all', getAllRaces);
router.get('/:id', getRaceById);

module.exports = router;
