const category = require("../models/category");
const product = require("../models/product");

const getAllProductsDB = async () => {
    return await product.find({}).select("title slug images").populate("category");
};

const getAllCategoriesDB =async () =>{
    return await category.find({});
}

const getProductByCategoryDB = async (slug) => {
    const cd = await category.findOne({slug})
    if(!cd){
        return {
            error:"Category not found"
        };
    }
    return await product.find({category:cd._id}).select("title slug images");   
}

const getProductBySlugDB = async (slug) => {
    return await product.findOne({slug}).populate("category");
}

module.exports = {getAllProductsDB,getProductByCategoryDB,getAllCategoriesDB,getProductBySlugDB}