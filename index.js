const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // For enabling CORS
const helmet = require('helmet');  // For securing HTTP headers
const morgan = require('morgan');  // For logging requests
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());  // Enable CORS
app.use(helmet());  // Secure HTTP headers
app.use(morgan('tiny'));  // Log requests

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the BakedBliss App');
});

// Ordering cart maintaining routes here
app.use('/baseApi/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
