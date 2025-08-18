const wishlist = require("../../models/wishlist");

const getwishlistItemDB = async (id) => {
    return await wishlist.find({user:id}).populate;
};

const addwishlistItemDB = async (user,item) => {
    const wishlistItem = await wishlist.findOne({user, item});

    if(!wishlistItem){
        const data = new wishlist({user,item});
        return await data.save();
    } else{
        return { error:"This item is already in wishlist" };
    }
};

const updatewishlistItemDB = async (wishlistId,items) => {
    return await wishlist.findByIdAndUpdate(wishlistId , {items}, {new:true})
};

const deletewishlistItemDB = async (user, item) => {
    return await wishlist.findOneAndDelete({ user, item })
};

module.exports = {getwishlistItemDB,addwishlistItemDB,updatewishlistItemDB,deletewishlistItemDB}