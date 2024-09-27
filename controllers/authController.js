const { db } = require('../config/firebaseConfig'); // Import Firestore
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Sign-up function
const signUpUser = async (req, res) => {
  try {
    const { fullName, email, password, profilePicture, addresses, phoneNumber } = req.body;

    // Check if user already exists
    const userSnapshot = await db.collection('User').doc(email).get();
    if (userSnapshot.exists) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Encrypt the password using crypto-js
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

    // Create new user object
    const newUser = {
      fullName,
      email,
      password: encryptedPassword,
      profilePicture: profilePicture || null,
      addresses: addresses || [],
      phoneNumber: phoneNumber || null,
      dateJoined: new Date().toISOString(),
    };

    // Save user in Firestore
    await db.collection('User').doc(email).set(newUser);
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "An error occurred during signup." });
  }
};

// Sign-in function
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user data from Firestore
    const userSnapshot = await db.collection('User').doc(email).get();
    if (!userSnapshot.exists) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const userData = userSnapshot.data();

    // Decrypt stored password
    const decryptedPassword = CryptoJS.AES.decrypt(userData.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

    // Compare passwords
    if (decryptedPassword !== password) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ email: userData.email, fullName: userData.fullName }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({ error: "An error occurred during sign-in." });
  }
};

module.exports = { signUpUser, signInUser };
