const bcrypt = require("bcrypt")
const User = require("../models/User")

module.exports = async function(roleAdmin){
    const isAdminExist = await User.findOne({role: roleAdmin})
    if(!isAdminExist && roleAdmin){
        const admin = {
            email: process.env.ADMIN_LOGIN,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD,8),
            role: roleAdmin
        }
        
        const createAdmin = await User.create(admin)
        return createAdmin
    }   
}