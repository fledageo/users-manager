const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/mailSender")
const bcrypt = require("bcrypt")

class UserController {
    async getAllUsers(req, res) {
        const { userId, role } = req.user
        try {
            const adminRoleId = await Role.findOne({ name: "admin" }, "_id")
            const allUsers = await User.find({ role: { $ne: adminRoleId } }).populate("role", "name")

            if (allUsers) {
                res.status(200).json({ status: "ok", payload: { allUsers, currentUser: { _id: userId, role } } })
            }
        } catch (error) {
            console.log(error)
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



    async userActivate(req, res) {
        const { user, _id } = req.body
        const passHash = await bcrypt.hash(user.password, 8)

        try {
            const updated = await User.findByIdAndUpdate(_id, {
                fullName: user.fullName,
                phone: user.phone,
                password: passHash,
                status: "active",
            })
            res.status(200).json({ status: "ok" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: 'Something went wrong...' })
        }
    }

    async sendResetToken(req, res) {
        const { email } = req.body
        try {
            const exist = await User.findOne({ email: email })
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


    async changePassword(req, res) {
        const { newPassword, userId } = req.body
        const passHash = await bcrypt.hash(newPassword, 8)
        try {
            const updated = await User.findByIdAndUpdate(userId, {
                password: passHash
            })
            if (updated) {
                res.status(200).json({ status: "ok", message: "Password has been changed" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "something went wrong..." })
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id
        try {
            const deleted = await User.findByIdAndDelete(id)
            res.status(200).json({ status: "ok", message: "User has been deleted", payload: deleted })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "something went wrong..." })
        }
    }

    async updateUser(req, res) {
        const id = req.params.id
        const data = req.body
        try {
            if (data.role) {
                const roleId = await Role.findOne({ name: data.role }, "_id")
                data.role = roleId
            }
            const updated = await User.findByIdAndUpdate(id, { $set: data }, { new: true }).populate("role", "name");
            res.status(200).json({ status: "ok", message: "User has been updated", payload:updated})

        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "something went wrong..." })

        }
    }

}

module.exports = new UserController()