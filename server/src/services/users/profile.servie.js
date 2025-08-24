const Cart = require("../../models/cart");
const User = require("../../models/user");
const Wishlist = require("../../models/wishlist");

const getProfileDB = async (id) => {
    const user =  await User.findById(id).select("-password -__v");

    const cart = await Cart.find({user:user.id});
    const wishlist = await Wishlist.find({user:user.id});

    return {user, cart, wishlist};
}

module.exports = {getProfileDB}