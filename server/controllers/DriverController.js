const { addDriver, getAllTheDrivers } = require('../models/Driver');

const createDriver = async (req, res) => {
    const { name, team, nationality } = req.body;
    try {
        const driverId = await addDriver(name, team, nationality);
        res.status(201).json({ id: driverId, name, team, nationality });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du pilote.' });
    }
};

const getAllDrivers = async (req, res) => {
    try {
        const drivers = await getAllTheDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des pilotes.' });
    }
};

module.exports = { createDriver, getAllDrivers };
