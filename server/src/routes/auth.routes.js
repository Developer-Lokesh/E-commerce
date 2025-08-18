const express = require("express");
const { register, login } = require("../controllers/users/auth.controller");
const users = require("../models/user"); 

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

// router.get("/all", async (req, res) => {
//     try {
//         const userinfo = await users.find();
//         res.json({
//             success: true,
//             userinfo
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Error fetching users",
//             error: err.message
//         });
//     }
// });

module.exports = router;
