const user = require("../../models/user");


const getUserByEmail = async({email}) => {
   return await user.findOne({email});
};

// const loginDB = async ({email,password})=>{
    


//     const userinfo = await findUserDB({email});
//     console.log(userinfo)
//     if(!userinfo){
//         return {
//             success:false,
//             message:"User not found"
//         };
//     }
//     if(userinfo.password !== password){
//         return {
//             success:false,
//             message:"Invalid Password"
//         };
//     }


//     // generate token

//     return{
//         success:true,
//         message:"User logged in successfully",
//         data:userinfo
//     };
// };

const registerDB = async({name, email, password})=>{
    const userinfo = await user.findOne({email});
    if(userinfo){
        return {
            success:false,
            message:"user is already exist"
        };
    }
    const newUserinfo = new user({name,email,password});
    return await newUserinfo.save();
}



module.exports  = {
   getUserByEmail,
    registerDB
};