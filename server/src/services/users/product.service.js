const Product = require("../models/Product");

// const createProductDB = async (productData) => {
//   return await Product.create(productData);
// };

const getAllProductsDB = async () => {
  return await Product.find().populate("category");
};

const getProductByIdDB = async (id) => {
  return await Product.findById(id).populate("category");
};

module.exports = {
  // createProductDB,
  getAllProductsDB,
  getProductByIdDB,
};
