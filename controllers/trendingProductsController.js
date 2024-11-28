const { db } = require('../config/firebaseConfig'); // Adjust based on your database setup

const getTrendingProducts = async (req, res) => {
  try {
    // Retrieve distinct categories
    const categoriesSnapshot = await db.collection('Products').select('category').get();
    const categories = [...new Set(categoriesSnapshot.docs.map(doc => doc.data().category))];

    // Fetch one product per category
    const trendingProducts = [];
    for (const category of categories) {
      const productsSnapshot = await db.collection('Products')
        .where('category', '==', category)
        .limit(1)
        .get();

      productsSnapshot.forEach(doc => {
        trendingProducts.push({ id: doc.id, ...doc.data() });
      });
    }

    res.status(200).json({ message: "success", data: trendingProducts });
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({ message: "failed", error: "An error occurred while retrieving trending products." });
  }
};

// Main function for recommendations
const getRecommendations = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Fetch order history for the user
      const orderSnapshot = await db.collection('Orders').where('userId', '==', userId).get();
      
      // If no order history, fetch trending products
      if (orderSnapshot.empty) {
        const trendingProducts = await getTrendingProducts();
        return res.status(200).json({ message: "No order history found, showing trending products.", data: trendingProducts });
      }
  
      // Analyze order history if found
      const categoryCounts = {};
      orderSnapshot.forEach((doc) => {
        const orderData = doc.data();
        orderData.products.forEach((product) => {
          const category = product.category;
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
      });
  
      // Sort categories by frequency to find top categories
      const sortedCategories = Object.entries(categoryCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([category]) => category);
  
      // Fetch top products from these categories
      const recommendedProducts = [];
      for (const category of sortedCategories) {
        const productSnapshot = await db.collection('Products')
          .where('category', '==', category)
          .limit(3)
          .get();
  
        productSnapshot.forEach((doc) => {
          recommendedProducts.push(doc.data());
        });
      }
  
      res.status(200).json({ message: "success", data: recommendedProducts });
    } catch (error) {
      console.error("Error in fetching recommendations:", error);
      res.status(500).json({ message: "failed", error: "An error occurred while fetching recommendations." });
    }
  };



module.exports = { getTrendingProducts,getRecommendations};