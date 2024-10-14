const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // For enabling CORS
const helmet = require('helmet');  // For securing HTTP headers
const morgan = require('morgan');  // For logging requests
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());  // Enable CORS
app.use(helmet());  // Secure HTTP headers
app.use(morgan('tiny'));  // Log requests


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});



// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Authentication API!');
});

// Use the auth routes
app.use('/baseApi/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
