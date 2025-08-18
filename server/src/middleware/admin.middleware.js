module.exports  = (req, res, next) =>{
    if(req.user.role !== "admin"){
        // unauthorized access 
        return res.status(403).json({
            success:false,
            error:"Access denied",
        })
    }
    next();
}