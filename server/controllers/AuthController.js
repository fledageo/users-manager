const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class AuthController {

    async login(req, res) {
        try {
            const { email, password } = req.body
            const userExist = await User.findOne({ email: email })
            console.log(userExist)
            if (!userExist) {
                return res.status(400).json({ status: "error", message: "Wrong credentials: Email" })
            }
            console.log(userExist)

            const isValidPassword = await bcrypt.compare(password, userExist.password)
            if (!isValidPassword) {
                return res.status(400).json({ status: "error", message: "Wrong credentials: Password" })
            } else {
                const token = jwt.sign({ userId: userExist._id, role: userExist.role }, process.env.SECRET_KEY)

                res.status(200).json({ status: "ok", payload: {user: userExist, token} })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Server error' });
        }
    }

}

module.exports = new AuthController()