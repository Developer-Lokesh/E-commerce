const express = require("express");
const {
  getWLItems,
  addWLItem,
  deleteAllWLItems,
  deleteWLItem,
  moveToCart,
} = require("../../controllers/users/wishlist.controller");

const router = express.Router();

router.get("/", getWLItems);
router.post("/", addWLItem);
router.delete("/delete-all", deleteAllWLItems);
router.delete("/:id", deleteWLItem);

router.put("/move-to-cart/:id", moveToCart);

module.exports = router;

// const express = require("express");
// const { getwishlistItem, addwishlistItem, deletewishlistItem, moveToCart } = require("../../controllers/users/wishlist.controller");


// const router = express.Router();

// router.get("/", getwishlistItem);
// router.post("/", addwishlistItem);
// // router.put("/:id",updatewishlistItem);
// router.delete("/:id", deletewishlistItem);

// router.put("/move-to-cart/:id", moveToCart);


// module.exports = router