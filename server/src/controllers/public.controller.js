const { getAllProductsDB, getAllCategoriesDB, getProductByCategoryDB, getProductBySlugDB } = require("../services/public.service");


const getAllProducts = async(req,res) => {
    try {
        const data = await getAllProductsDB();
        return res.json({
            success:true,
            message:"Get all product successfully",
            data:data,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            error: "Something went wrong"
        })
    }
};

const getAllCategories = async(req,res) => {
    try {
        const data = await getAllCategoriesDB();
        return res.json({
            success:true,
            data,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            error:"Something went wrong"
        });
    }
};

const getProductByCategory = async(req,res) => {
    const {category} = req.params;
    // console.log(category)
    try {
        const data = await getProductByCategoryDB(category);
        // console.log("this is data",data, "getproductbycategory");
        if(data.error){
            return res.json({
                success:false,
                error:data.error
            })
        }
        return res.json({
            success:true,
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            error:"Something went wrong"
        })
    }
};

const getProductBySlug =async (req,res) => {
    const {slug} = req.params;
    try {
        const data = await getProductBySlugDB(slug)
        if(!data) {
            return res.status(404).json({
                success:false,
                error:"Product not found"
            });
        }
        return res.json({
            success:true,
            data,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            error:"Something went wrong"
        })
    }
};

module.exports = {getAllProducts,getAllCategories,getProductByCategory,getProductBySlug}
