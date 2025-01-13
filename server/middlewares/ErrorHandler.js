const errorHandler = (err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        details: err.message 
    });
};

module.exports = errorHandler;