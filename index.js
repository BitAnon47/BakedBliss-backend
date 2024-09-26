const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Initialize the app
const app = express();

// Connect Database
connectDB();

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
