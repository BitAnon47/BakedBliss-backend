const express = require('express');
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Protected route (example)
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ msg: `Welcome, ${req.user.email}` });
});

module.exports = router;
