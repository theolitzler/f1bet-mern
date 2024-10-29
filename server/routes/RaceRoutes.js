const express = require('express');
const router = express.Router();
const { createRace, getRaceByIdController} = require('../controllers/RaceController');

router.post('/create', createRace);
router.get('/:id', getRaceByIdController);

module.exports = router;
