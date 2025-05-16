const User = require("../models/User");
const Role = require("../models/Role");

class UserController {
    async getAllUsers(req, res) {
        // console.log(req.user)
        try {
            const adminRoleId = await Role.findOne({name:"admin"}, "_id")
            const allUsers = await User.find({role: {$ne : adminRoleId}})
            
            if (allUsers) {
                res.status(200).json({ status: "ok", payload: allUsers })
            }
        } catch (error) {
            res.status(500).json({ status: "error", message: "Something went wrong..." })
        }
    }
}

module.exports = new UserController()