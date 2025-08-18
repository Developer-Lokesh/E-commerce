const express = require("express");
const { fetchAddresses, addAddress, updateAddress, deleteAddress } = require("../../controllers/users/address.controller");

const router = express.Router();

router.get("/", fetchAddresses);
router.post("/", addAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;