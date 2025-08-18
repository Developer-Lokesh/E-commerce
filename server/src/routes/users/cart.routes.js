const express = require("express");
const { getCartItems, addCartItem, updateCartItem, deleteCartItem } = require("../../controllers/users/cart.controller");

const router = express.Router();

router.get("/", getCartItems);
router.post("/", addCartItem);
router.put("/:id", updateCartItem); 
router.delete("/:id", deleteCartItem);

module.exports = router;