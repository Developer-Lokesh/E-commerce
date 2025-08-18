const {
  createProductDB,
  getAllProductsDB,
  getProductByIdDB,
} = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsDB();
    return res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdDB(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    return res.json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};