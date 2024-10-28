const express = require('express');
const router = express.Router();
const { createRace, getRaceById } = require('../controllers/RaceController');

router.post('/create', createRace);
router.get('/:id', getRaceById);

module.exports = router;
