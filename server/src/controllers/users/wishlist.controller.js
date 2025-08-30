const {
  addWLItemDB,
  getWLItemsDB,
  deleteWLItemDB,
  deleteAllWLItemDB,
  moveToCartDB,
} = require("../../services/users/wishlist.service");

const getWLItems = async (req, res) => {
  try {
    const data = await getWLItemsDB(req.user.id);
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const addWLItem = async (req, res) => {
  if (!req.body.item) {
    return res.json({ success: false, error: "All fields are required" });
  }

  try {
    const data = await addWLItemDB(req.user.id, req.body.item);
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const deleteWLItem = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteWLItemDB(id, req.user.id);
    return res.json({ success: true, data: "Wishlist item deleted successfully!" });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const deleteAllWLItems = async (req, res) => {
  try {
    await deleteAllWLItemDB(req.user.id);
    return res.json({ success: true, data: "All wishlist items deleted successfully!" });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const moveToCart = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await moveToCartDB(id, req.user.id);
    if (!data) {
      return res.json({ success: false, error: "something went wrong!" });
    }

    return res.json({ success: true, message: "Wishlist item moved to cart successfully!" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "something went wrong!" });
  }
};

module.exports = { getWLItems, addWLItem, deleteWLItem, deleteAllWLItems, moveToCart };

// const { getwishlistItemDB, addwishlistItemDB, updatewishlistItemDB, deletewishlistItemDB } = require("../../services/users/wishlist.service");


// const getwishlistItem = async (req,res) => {
//     const {id} = req.user;

//     try {
//         const data = await getwishlistItemDB(id);
//         res.status(200).json({
//             success:true,
//             message:"Wishlist fetched successfully",
//             data:data,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             error:"Something went wrong"
//         });
//     }
// };

// const addwishlistItem = async (req,res) => {
//     const {id:userId} = req.user;
//     const {item} = req.body;

//     if(!item){
//         return res.status(400).json({
//             success:false,
//             error:"All fields are required",
//             required:["item"]
//         })
//     }
//     try {
//         const data = await addwishlistItemDB(userId, item);
//         if (data.error) {
//             return res.json({success: false, error: data.error})
//         }
//         res.status(200).json({
//             success:true,
//             message:"Item added successfully in wishlist",
//             data:data,
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             error:"Something went wrong"
//         })
//     }
// };

// // const updatewishlistItem = async (req,res) => {
// //     const {id:userId} = req.user;
// //     const {id:wishlistId} = req.params;
// //     const {update} = req.body;
    
// //     if(!update){
// //         return res.status(400).json({
// //             success:false,
// //             message:"Item is required",
// //             required:["items"]
// //         });
// //     }
// //     try {
// //         const data = await updatewishlistItemDB(userId,wishlistId,update);
// //         res.status(200).json({
// //             success:true,
// //             message:"Wishlist updated successfully",
// //             data:data,
// //         });
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({
// //             success:false,
// //             error:"Something went wrong"
// //         })
// //     }
// // };

// const deletewishlistItem = async (req,res) => {
//     const {id:userId} = req.user;
//     const {id:wishlistItemId} = req.params;
//     try {
//         await deletewishlistItemDB(userId, wishlistItemId);
//         res.status(200).json({
//             success:true,
//             message:"Item deleted successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             success:false,
//             error:"Something went wrong"
//         })
//     }
// };


// module.exports = {getwishlistItem,addwishlistItem,deletewishlistItem};