const { verifyToken } = require('../utils/jwtUtil');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ msg: 'Invalid token, authorization denied' });
  }

  req.user = decoded; // Attach user data to request object
  next();
};

module.exports = authMiddleware;
