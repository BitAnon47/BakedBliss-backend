const express = require('express');
const { createProduct } = require('../controllers/productUploadController');
const { searchProducts,getProductById,getProductsByCategory } = require('../controllers/productController'); // Existing search controller
const router = express.Router();


// Route for searching products
router.get('/search', searchProducts); // Keep the existing search route

router.post('/upload', createProduct);

// Route to get product by ID
router.get('/:product_id', getProductById);
router.get('/category/:category_name', getProductsByCategory);

module.exports = router;
