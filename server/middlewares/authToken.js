const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header.split(" ")[1]
    if (!token) {
        return res.status(400).json({ status: "error", message: 'Token missing' })
    }
    
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        const exist = await User.findById(verified.userId)
        if (exist) {
            req.user = verified
            console.log(req.user)
            next()
        }else{
            res.status(400).json({ status: "error", message: 'No User' })
        }
    } catch (error) {
        return res.status(400).json({ status: "error", message: 'Invalid or expired token' })
    }
}