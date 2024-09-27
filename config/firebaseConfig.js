const admin = require('firebase-admin');
const serviceAccount = require('d:/Paractice/Firebase db secret key/baked-blissed-firebase-adminsdk-qk2zr-65da07f37c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };
