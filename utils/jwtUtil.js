const jwt = require('jsonwebtoken');

// Secret key (store securely in environment variables in production)
const JWT_SECRET = 'yourSecretKey';

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '2d', // Token expires in 2 days
  });
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // Invalid token
  }
};

module.exports = { generateToken, verifyToken };
