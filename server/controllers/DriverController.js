const { addDriver, getAllTheDrivers } = require('../models/Driver');

const createDriver = async (req, res) => {
    const { name, team, nationality } = req.body;
    try {
        const driverId = await addDriver(name, team, nationality);
        res.status(201).json({ id: driverId, name, team, nationality });
    } catch (error) {
        console.error('Error creating driver:', error);
        res.status(500).json({ 
            error: 'Failed to create driver',
            details: error.message 
        });
    }
};

const getAllDrivers = async (req, res) => {
    try {
        const drivers = await getAllTheDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        console.error('Error retrieving drivers:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve drivers',
            details: error.message 
        });
    }
};

module.exports = { createDriver, getAllDrivers };