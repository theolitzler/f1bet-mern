const express = require('express');
const router = express.Router();
const { createDriver, getAllDrivers} = require('../controllers/DriverController');

router.post('/create', createDriver);
router.get('/', getAllDrivers);

module.exports = router;