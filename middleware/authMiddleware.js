const admin = require('firebase-admin');

/*
// Initialize Firebase Admin SDK (make sure you've already set up your credentials)
admin.initializeApp({
  credential: admin.credential.applicationDefault() // or use serviceAccountKey.json if needed
});
*/
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Extract the Firebase ID token from the header
    const idToken = authHeader.split('Bearer ')[1];

    // Verify the ID token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach the decoded token's user information to the request object
    req.user = decodedToken;

    // Proceed to the next middleware or the API route
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = authenticateToken;
