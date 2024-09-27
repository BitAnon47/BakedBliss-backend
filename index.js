const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Authentication API!');
});

// Use the auth routes
app.use('/baseApi/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
