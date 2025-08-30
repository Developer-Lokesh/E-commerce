const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cart");
const WishList = require("../../models/wishlist");

const getWLItemsDB = async (userId) => {
  return await WishList.find({ user: userId }).populate("item").exec();
};

const addWLItemDB = async (userId, productId) => {
  const data = new WishList({ user: userId, item: productId });
  return await data.save();
};

const deleteWLItemDB = async (id) => {
  return await WishList.findOneAndDelete({ item: id });
};

const deleteAllWLItemDB = async (userId) => {
  return await WishList.deleteMany({ user: userId });
};

const moveToCartDB = async (id, userId) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await WishList.findOneAndDelete({ item: id }, { session });
      await Cart.findOneAndUpdate(
        { user: userId, item: id },
        { $inc: { quantity: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true, session }
      );
    });
    return {};
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getWLItemsDB, addWLItemDB, deleteWLItemDB, deleteAllWLItemDB, moveToCartDB };

// const wishlist = require("../../models/wishlist");

// const getwishlistItemDB = async (id) => {
//     return await wishlist.find({user:id}).populate;
// };

// const addwishlistItemDB = async (user,item) => {
//     const wishlistItem = await wishlist.findOne({user, item});

//     if(!wishlistItem){
//         const data = new wishlist({user,item});
//         return await data.save();
//     } else{
//         return { error:"This item is already in wishlist" };
//     }
// };

// const updatewishlistItemDB = async (wishlistId,items) => {
//     return await wishlist.findByIdAndUpdate(wishlistId , {items}, {new:true})
// };

// const deletewishlistItemDB = async (user, item) => {
//     return await wishlist.findOneAndDelete({ user, item })
// };

// module.exports = {getwishlistItemDB,addwishlistItemDB,updatewishlistItemDB,deletewishlistItemDB}