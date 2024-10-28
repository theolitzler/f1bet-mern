const { getUserById } = require('../models/User');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.id); // SQLite
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Veuillez vous authentifier.' });
  }
};

module.exports = authMiddleware;
