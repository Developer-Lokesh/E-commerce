const Address = require("../../models/address");

const getAddressesDB = async (userId) => {
  return await Address.find({ user: userId });
};

const addAddressDB = async (data) => {
  const newAddress = new Address(data);
  return await newAddress.save();
};

const updateAddressDB = async (id, updateData) => {
  return await Address.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAddressDB = async (id) => {
  return await Address.findByIdAndDelete(id);
};

module.exports = { getAddressesDB, addAddressDB, updateAddressDB, deleteAddressDB };

















































// const User = require("../../models/user");

// const registerUser = async ({ name, email, password }) => {
//   const newUser = new User({ name, email, password });
//   return await newUser.save();
// };

// const findUserByEmail = async (email) => {
//   return await User.findOne({ email });
// };

// const getProfileDB = async (id) => {
//   return await User.findById(id).populate("addresses");
// };

// module.exports = { registerUser, findUserByEmail, getProfileDB };