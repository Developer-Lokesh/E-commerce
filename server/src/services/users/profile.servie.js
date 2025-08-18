const user = require("../../models/user")

const getProfileDB = async (id) => {
    return await user.findById(id).select("-password -__v")
}

module.exports = {getProfileDB}