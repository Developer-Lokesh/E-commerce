const express = require("express");
const { getwishlistItem, addwishlistItem, deletewishlistItem } = require("../../controllers/users/wishlist.controller");


const router = express.Router();

router.get("/",getwishlistItem);
router.post("/",addwishlistItem);
// router.put("/:id",updatewishlistItem);
router.delete("/:id",deletewishlistItem);

module.exports = router