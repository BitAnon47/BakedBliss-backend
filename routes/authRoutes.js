const express = require('express');
const { signUpUser, signInUser, socialLogin } = require('../controllers/authController');
const { getUserProfile } = require('../controllers/userProfileController'); // Import getUserProfile
const { authenticateToken } = require('../middleware/authMiddleware'); // Make sure middleware is properly imported
const router = express.Router();

// Route for sign-up
router.post('/users/register', signUpUser);

// Route for sign-in
router.post('/users/signin', signInUser);

// Route for social login (Facebook, Google, etc.)
router.post('/users/social-login', socialLogin);

// Route for getting user profile (protected)
router.get('/users/profile/:user_id', authenticateToken, getUserProfile); // Apply token verification

module.exports = router;
