const express = require("express");
// const authRoutes = require("../auth.routes");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.routes");
// const authMiddleware = require("../../middleware/auth.middleware");
const { getProfile } = require("../../controllers/users/profile.controller");

const cartRoutes = require("./cart.routes");
const wishlistRoutes = require("./wishlist.routes")

const router = express.Router();
router.get("/me", getProfile);

// router.use("/auth", authRoutes);
router.use("/address", addressRoutes);
router.use("/order", orderRoutes);
router.use("/cart",cartRoutes);
router.use("/wishlist", wishlistRoutes);

module.exports = router;