const { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartItemDB } = require("../../services/users/cart.service");

const getCartItems = async (req, res) => {
  const { id } = req.user;

  try {
    const data = await getCartItemsDB(id);
    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "something went wrong!",
    });
  }
};

const addCartItem = async (req, res) => {
  const { id } = req.user;
  const { item, quantity } = req.body;

  if ((!item, !quantity)) {
    return res.json({ success: false, error: "All fields are required", required: ["item", "quantity"] });
  }

  try {
    const data = await addCartItemDB(id, item, quantity);
    if (data.error) {
      return res.json({ success: false, error: data.error });
    }
    return res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const updateCartItem = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const data = await updateCartItemDB(userId, id, quantity);
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteCartItemDB(id);
    return res.json({ success: true, data: "Cart item deleted successfully!" });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

module.exports = { getCartItems, addCartItem, updateCartItem, deleteCartItem };

// const { default: mongoose } = require("mongoose");
// const Cart = require("../../models/cart");
// const WishList = require("../../models/wishlist");

// const getWLItemsDB = async (userId) => {
//   return await WishList.find({ user: userId }).populate("item").exec();
// };

// const addWLItemDB = async (userId, productId) => {
//   const data = new WishList({ user: userId, item: productId });
//   return await data.save();
// };

// const deleteWLItemDB = async (id) => {
//   return await WishList.findOneAndDelete({ item: id });
// };

// const deleteAllWLItemDB = async (userId) => {
//   return await WishList.deleteMany({ user: userId });
// };

// const moveToCartDB = async (id, userId) => {
//   const session = await mongoose.startSession();

//   try {
//     await session.withTransaction(async () => {
//       await WishList.findOneAndDelete({ item: id }, { session });
//       await Cart.findOneAndUpdate(
//         { user: userId, item: id },
//         { $inc: { quantity: 1 } },
//         { new: true, upsert: true, setDefaultsOnInsert: true, session }
//       );
//     });
//     return {};
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// module.exports = { getWLItemsDB, addWLItemDB, deleteWLItemDB, deleteAllWLItemDB, moveToCartDB };

// const { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartDB } = require("../../services/users/cart.service");

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

//   if ((!item || !quantity)) {
//     return res.json({
//        success: false,
//        error: "All fields are required",
//        required: ["item", "quantity"],
//       });
//   }

//   const result = await addCartItemDB(id, item, quantity);
//   if(result.success){
//     return res.status(200).json(result);
//   }
//   else{
//     return res.status(400).json(result)
//   }

//   // try {
//   //   const data = await addCartItemDB(id, item, quantity);
//   //   return res.json({ success: true, data });
//   // } catch (error) {
//   //   console.log(error);
//   //   return res.json({ success: false, 
//   //     error: "something went wrong!" 
//   //   });
//   // }
// };

// const updateCartItem = async (req, res) => {
//   const { id: cartId } = req.params;
//   const { quantity } = req.body;

//   if (!quantity) {
//     return res.json({ success: false, 
//       error: "All fields are required", 
//       required: ["quantity"] 
//     });
//   }

//   try {
//     const data = await updateCartItemDB(cartId, quantity);
//     return res.json({ success: true, data });
//   } catch (error) {
//     return res.json({ success: false, 
//       error: "something went wrong!" 
//     });
//   }
// };

// const deleteCartItem = async (req,res) => {
//   const {id} = req.params;
//   try {
//     await deleteCartDB(id);
//     res.status(200).json({
//       success:true,
//       message:"Item deleted successfully"
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(501).json({
//       success:false,
//       error:"Something went wrong"
//     });
//   }
// };

// module.exports = { getCartItems, addCartItem, updateCartItem, deleteCartItem };