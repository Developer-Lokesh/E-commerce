const { getAllUsersDB } = require("../../services/admin/user.service");

const getAllUsers = async (req, res) => {
  const data = await getAllUsersDB();
  return res.json({ success: true, data });
};

module.exports = { getAllUsers };