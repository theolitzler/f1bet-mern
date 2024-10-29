const { addRace, getAllTheRaces, getTheRaceById } = require('../models/Race');

const createRace = async (req, res) => {
    const { name, date, location } = req.body;
    try {
        const raceId = await addRace(name, date, location);
        res.status(201).json({ id: raceId, name, date, location });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la course.' });
    }
};

const getAllRaces = async (req, res) => {
    try {
        const races = await getAllTheRaces();
        res.status(200).json(races);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des courses.' });
    }
};

const getRaceById = async (req, res) => {
    const { id } = req.params;
    try {
        const race = await getTheRaceById(id);
        res.status(200).json(race);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la course.' });
    }
};

module.exports = { createRace, getAllRaces, getRaceById };
