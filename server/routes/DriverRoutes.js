const express = require('express');
const router = express.Router();
const { createDriver, getAllDriversController} = require('../controllers/DriverController');

router.post('/create', createDriver);
router.get('/', getAllDriversController);

module.exports = router;
