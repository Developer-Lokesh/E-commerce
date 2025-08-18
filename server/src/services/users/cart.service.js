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
    const saved = await data.save();

    return{
    success:true,
    message:"Item added successfully",
    data:saved,
  };
  } else {
    // return error
    return {
      success:false,
      message:"This item is already exist in cart"
    }
  };
 
}

const updateCartItemDB = async (cartId, quantity) => {
  return await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true });
};

const deleteCartDB =async (id) => {
  await Cart.findByIdAndDelete(id)
}


module.exports = { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartDB };



































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
