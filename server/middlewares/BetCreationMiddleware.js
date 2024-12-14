const validateBetCreation = (raceId, predictions) => {
    // Validation du raceId
    if (!raceId || typeof raceId !== 'number') {
        return 'Invalid race ID';
    }

    // Validation des prédictions
    if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
        return 'No predictions provided';
    }

    // Vérification que chaque prédiction a un ID et une position
    const invalidPrediction = predictions.find(
        pred => !pred.id || typeof pred.id !== 'number' || 
                !pred.position || typeof pred.position !== 'number'
    );

    if (invalidPrediction) {
        return 'Invalid prediction format';
    }

    // Vérification que les positions sont uniques
    const positions = predictions.map(pred => pred.position);
    const uniquePositions = new Set(positions);
    if (positions.length !== uniquePositions.size) {
        return 'Duplicate positions not allowed';
    }

    return null; // Aucune erreur de validation
};

module.exports = { validateBetCreation };