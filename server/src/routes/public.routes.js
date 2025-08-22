const express = require("express");
const {getAllCategories,getAllProducts,getProductByCategory,getProductBySlug} = require("../controllers/public.controller")
const router = express.Router();

// List all product
router.get("/products", getAllProducts);

// List all categories
router.get("/categories", getAllCategories);

// Products by category
router.get("/products/:category", getProductByCategory);

// Product details
router.get("/product/:slug", getProductBySlug);

module.exports = router;