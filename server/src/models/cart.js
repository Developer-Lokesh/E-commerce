const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user",required:true},
    item:{type:mongoose.Schema.Types.ObjectId, ref:"Product",required:true},
    quantity:{type:Number,required:true,min:1},
});
const cart = mongoose.model("cart",cartSchema);
module.exports = cart;