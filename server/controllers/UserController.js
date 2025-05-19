const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/mailSender")
const bcrypt = require("bcrypt")

class UserController {
    async getAllUsers(req, res) {
        try {
            const adminRoleId = await Role.findOne({ name: "admin" }, "_id")
            const allUsers = await User.find({ role: { $ne: adminRoleId } })

            if (allUsers) {
                res.status(200).json({ status: "ok", payload: allUsers })
            }
        } catch (error) {
            res.status(500).json({ status: "error", message: "Something went wrong..." })
        }
    }

    async inviteUser(req, res) {
        const { email } = req.body

        try {
            const userRoleId = await Role.findOne({ name: "user" }, "_id")

            const newUser = await User.create({
                email: email,
                role: userRoleId._id,
                status: "invited",
            })

            const inviteToken = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" })

            const send = await sendMail(email, inviteToken, "invite")
            if (send) {
                res.status(200).json({ status: "ok", message: "Invitation sent" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "Something went wrong..." })
        }
    }

    async verifyInvitationToken(req, res) {
        const token = req.body.token

        try {
            const verified = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findById(verified._id)


            res.status(200).json({ status: "ok", payload: verified._id })

        } catch (error) {
            cosnole.log(error)
            res.status(400).json({ status: "error", message: 'Invalid or expired activation token' })
        }
    }


    async userActivate(req, res) {
        const { user, _id } = req.body
        const passHash = await bcrypt.hash(user.password, 8)
        console.log(_id, "--id") //----------------------------------
        try {
            const updated = await User.findByIdAndUpdate(_id, {
                fullName: user.fullName,
                phone: user.phone,
                password: passHash,
                status: "active",
            })
            console.log(updated, "updated")
            res.status(200).json({ status: "ok" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: 'Something went wrong...' })
        }
    }

    async sendResetToken(req, res) {
        const { email } = req.body
        try {
            const exist = User.findOne({ email: email })
            if (exist) {
                const token = jwt.sign({ _id: exist._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
                const send = await sendMail(email, token, "reset")
                if (send) {
                    res.status(200).json({ status: "ok", message: "link sent" })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "something went wrong..." })
        }
    }

}

module.exports = new UserController()