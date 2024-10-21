const express = require('express');
const { signUpUser, signInUser, socialLogin } = require('../controllers/authController');
const router = express.Router();

// Route for sign-up
router.post('/users/register', signUpUser);

// Route for sign-in
router.post('/users/signin', signInUser);

// Route for social login (Facebook, Google, etc.)
router.post('/users/social-login', socialLogin);

// Protected routes (require valid token)
router.get('/users/profile', verifyFirebaseToken, (req, res) => {
    // Example protected route for fetching user profile
    res.status(200).json({ message: 'Authorized access to profile', user: req.user });
  });

module.exports = router;
