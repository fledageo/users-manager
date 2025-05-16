const bcrypt = require("bcrypt")
const User = require("../models/User")

module.exports = async function(roleAdmin){
    const isAdminExist = await User.findOne({role: roleAdmin})
    if(!isAdminExist && roleAdmin){
        const admin = {
            email:"admin",
            password: await bcrypt.hash("admin",8),
            role: roleAdmin
        }
        
        const createAdmin = await User.create(admin)
        return createAdmin
    }   
}