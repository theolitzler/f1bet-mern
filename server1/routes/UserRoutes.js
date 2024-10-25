const express = require('express');
const router = express.Router();
const { getRankings } = require('../controllers/UserController');

// Add a route for fetching rankings
router.get('/rankings', getRankings);

module.exports = router;