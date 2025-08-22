const category = require("../models/category");
const product = require("../models/product");
const Image = require("..//models/images")

const getAllProductsDB = async () => {
    let products =  await product.find({}).select("title slug price mrp category").lean();

    for (const e of products) {
        e.images = await Image.find({product_id:e._id}).limit(1)
    }
    return products
};

const getAllCategoriesDB =async () =>{
    return await category.find({});
}

const getProductByCategoryDB = async (slug) => {
    const cd = await category.findOne({slug});
    // console.log(cd);
    if(!cd){
        return {
            error:"Category not found"
        };
    }
    const products = await product.find({category:cd._id}).select("title slug price mrp").lean();   

    const productImage = await Promise.all(
        products.map(async(p) => {
            const image = await Image.find({product_id:p._id}).lean();
            return {...p, image}
        })
    );

    return {
        category:cd,
        products:productImage,
    }
   
}

const getProductBySlugDB = async (slug) => {
    const data =  await product.findOne({slug}).populate("category").lean()
    const images = await Image.find({ product_id: data._id})
    return { ...data, images}
}

module.exports = {getAllProductsDB,getProductByCategoryDB,getAllCategoriesDB,getProductBySlugDB}