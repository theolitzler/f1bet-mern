const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId; // Ajoute l'userId décodé dans req pour utilisation ultérieure
    next();
  });
};

module.exports = verifyToken;
