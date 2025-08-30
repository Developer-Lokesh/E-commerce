const Cart = require("../../models/cart");

const getCartItemsDB = async (id) => {
  return await Cart.find({ user: id });
  // .populate("item")
};

const addCartItemDB = async (user, item, quantity) => {
  // check if item is already in cart
  const cartItem = await Cart.findOne({ user, item });

  if (!cartItem) {
    const data = new Cart({ user, item, quantity });
    return await data.save();
  } else {
    return { error: "Item already in cart" };
  }
};

const updateCartItemDB = async (userId, itemId, quantity) => {
  if (!quantity) {
    return await Cart.findOneAndDelete({ user: userId, item: itemId });
  }
  return await Cart.findOneAndUpdate({ user: userId, item: itemId }, { quantity }, { new: true });
};

const deleteCartItemDB = async (id) => {
  return await Cart.findOneAndDelete({ item: id });
};

module.exports = { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartItemDB };

// const { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartItemDB } = require("../../services/users/");

// const getCartItems = async (req, res) => {
//   const { id } = req.user;

//   try {
//     const data = await getCartItemsDB(id);
//     return res.status(200).json({
//       success: true,
//       message: "Cart items fetched successfully!",
//       data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: "something went wrong!",
//     });
//   }
// };

// const addCartItem = async (req, res) => {
//   const { id } = req.user;
//   const { item, quantity } = req.body;

//   if ((!item, !quantity)) {
//     return res.json({ success: false, error: "All fields are required", required: ["item", "quantity"] });
//   }

//   try {
//     const data = await addCartItemDB(id, item, quantity);
//     if (data.error) {
//       return res.json({ success: false, error: data.error });
//     }
//     return res.json({ success: true, data });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, error: "something went wrong!" });
//   }
// };

// const updateCartItem = async (req, res) => {
//   const { id: userId } = req.user;
//   const { id } = req.params;
//   const { quantity } = req.body;

//   try {
//     const data = await updateCartItemDB(userId, id, quantity);
//     return res.json({ success: true, data });
//   } catch (error) {
//     return res.json({ success: false, error: "something went wrong!" });
//   }
// };

// const deleteCartItem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await deleteCartItemDB(id);
//     return res.json({ success: true, data: "Cart item deleted successfully!" });
//   } catch (error) {
//     return res.json({ success: false, error: "something went wrong!" });
//   }
// };

// module.exports = { getCartItems, addCartItem, updateCartItem, deleteCartItem };

// const Cart = require("../../models/cart");

// const getCartItemsDB = async (id) => {
//   return await Cart.find({ user: id });
//   // .populate("item")
// };

// const addCartItemDB = async (user, item, quantity) => {
//   // check if item is already in cart
//   const cartItem = await Cart.findOne({ user, item });

//   if (!cartItem) {
//     const data = new Cart({ user, item, quantity });
//     return await data.save();
//   } else {
//     return { error: "Item already in cart" };
//   }
// };

// const updateCartItemDB = async (userId, itemId, quantity) => {
//   if (!quantity) {
//     return await Cart.findOneAndDelete({ user: userId, item: itemId });
//   }
//   return await Cart.findOneAndUpdate({ user: userId, item: itemId }, { quantity }, { new: true });
// };

// const deleteCartItemDB = async (id) => {
//   return await Cart.findOneAndDelete({ item: id });
// };

// module.exports = { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartItemDB };



// const Cart = require("../../models/cart");

// const getCartItemsDB = async (id) => {
//   return await Cart.find({ user: id });
//   // .populate("item")
// };

// const addCartItemDB = async (user, item, quantity) => {
//   // check if item is already in cart
//   const cartItem = await Cart.findOne({ user, item });

//   if (!cartItem) {
//     const data = new Cart({ user, item, quantity });
//     const saved = await data.save();

//     return{
//     success:true,
//     message:"Item added successfully",
//     data:saved,
//   };
//   } else {
//     // return error
//     return {
//       success:false,
//       message:"This item is already exist in cart"
//     }
//   };
 
// }

// const updateCartItemDB = async (cartId, quantity) => {
//   return await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true });
// };

// const deleteCartDB =async (id) => {
//   await Cart.findByIdAndDelete(id)
// }


// module.exports = { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartDB };



































// const cart = require("../../models/cart");

// const getCartItemDB = async (id) => {
//     return await cart.find({user:id});
// }

// const addCartItemDB = async (user,item,quantity) =>{
//     const cartItem = await cart.findOne({user,item});

//     if(!cartItem){
//         const data = new cart({user,item,quantity});
//         return await data.save();
//     }
//     else{

//     }
//     return res.status(200).json({
//         success:true,
//         message:"Item added successfully",
//         data,
//     });
// }

// const updateCartItemDB = async (addCartItemDB,quantity) => {
//     return await cart.findByIdAndUpdate(cartId,{quantity},{new:true});
// }

// module.exports = {getCartItemDB,addCartItemDB,updateCartItemDB}
