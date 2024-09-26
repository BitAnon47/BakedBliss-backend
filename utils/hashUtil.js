const CryptoJS = require('crypto-js');

// Hash password
const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

// Compare password
const comparePassword = (inputPassword, storedHash) => {
  return CryptoJS.SHA256(inputPassword).toString() === storedHash;
};

module.exports = { hashPassword, comparePassword };
