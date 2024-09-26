const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hashUtil');
const { generateToken } = require('../utils/jwtUtil');

// Signup logic
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    return res.status(201).json({ msg: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

// Login logic
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

module.exports = { signup, login };
