const { db } = require('../config/firebaseConfig'); // Import the Firestore config

// Search products by query with pagination
const searchProducts = async (req, res) => {
  try {
      const { query, page = 1, limit = 10 } = req.query; // Default page and limit
      const productsRef = db.collection('products');
      
      // Use `>=` and `<=` with '\uf8ff' for substring search
      const snapshot = await productsRef
          .where('title', '>=', query)
          .where('title', '<=', query + '\uf8ff') // '\uf8ff' ensures a range match for Firestore
          .limit(Number(limit))
          .get();

      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log(`Retrieved ${products.length} products.`); // Debug log

      res.status(200).json({ status: 'success', data: products });
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// Controller to get a product by its ID
const getProductById = async (req, res) => {
  const { product_id } = req.params;

  try {
    const productDoc = await db.collection('products').doc(product_id).get();

    if (!productDoc.exists) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    const productData = productDoc.data();
    return res.status(200).json({
      status: 'success',
      data: productData
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};



module.exports = { searchProducts , getProductById };  // Make sure to export it