const Address = require("../../models/address");
const {
  getAddressesDB,
  addAddressDB,
  updateAddressDB,
  deleteAddressDB,
} = require("../../services/users/address.service");


const fetchAddresses = async (req, res) => {
  const data = await getAddressesDB();
  return res.json({ success: true, data });
};

const addAddress = async (req, res) => {
  const { fullName, phone, line1, line2, landmark, city, postalCode, country, user } = req.body;

  if (!fullName || !phone || !line1 || !line2 || !landmark || !city || !postalCode || !country || !user) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: ["fullName", "phone", "line1", "line2", "landmark", "city", "postalCode", "country", "user"],
    });
  }

  // TODO: check user is exist
  // const existingUser = await us

  try {
    const data = await addAddressDB(req.body);
    return res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const updateAddress = async (req, res) => {
  const addressId = req.params.id;
  const updateData = req.body;
  try{
    const updatedaddress = await updateAddressDB(updateData,addressId);
    if(!updatedaddress){
      return res.json({
        success:false,
        message:"Address not found"
      });
    }
    return res.json({
      success:true,
      message:"Address updated successfully",
      data:updatedaddress
    })
  }catch(error){
    console.log(error);
    res.json({
      success:false,
      message:"Failed to update address"
    });
  }
};

const deleteAddress = async (req,res) => {
  const addressId = req.params.id;
  try{
    if(!addressId){
      return res.json({
        success:false,
        message:"Address Id is required"
      });
    }

        const deletedAddress = await deleteAddressDB(addressId);
    if(!addressDelete){
      return res.json({
        success:false,
        message:"Address not found"
      })
    }
    return res.json({
      success:true,
      message:"Address deleted successfully",
      data:addressDelete
    })
  }catch(error){
    console.log(error)
    return res.json({
      success:true,
      message:"Something went wrong"
    });
  }
};

module.exports = { fetchAddresses, addAddress, updateAddress, deleteAddress };