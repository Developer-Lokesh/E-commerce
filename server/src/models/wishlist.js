const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true,unique:true},
    item:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true}
});
const wishlist = mongoose.model("wishlist",wishlistSchema);
module.exports = wishlist;