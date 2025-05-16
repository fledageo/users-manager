const jwt = require("jsonwebtoken")

module.exports = (req,res,next) => {
    const header = req.headers['authorization'];
    const token = header.split(" ")[1]
    if(!token){
        return res.status(400).json({status:"error",message:'Token missing'})
    }
    
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({ status:"error", message: 'Invalid or expired token' })
    }
}