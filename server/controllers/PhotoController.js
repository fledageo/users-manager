
// class PhotoController {

//     async login(req, res) {
//         try {
//             const { email, password } = req.body
//             const userExist = await User.findOne({ email: email }).populate("role")
//             if (!userExist) {
//                 return res.status(400).json({ status: "error", message: "Wrong credentials: Email" })
//             }

//             const isValidPassword = await bcrypt.compare(password, userExist.password)
//             if (!isValidPassword) {
//                 return res.status(400).json({ status: "error", message: "Wrong credentials: Password" })
//             } else {
//                 const token = jwt.sign({ userId: userExist._id, role: userExist.role }, process.env.SECRET_KEY)

//                 res.status(200).json({ status: "ok", payload: { user: userExist, token } })
//             }
//         } catch (error) {
//             console.log(error)
//             return res.status(500).json({ message: 'Server error' });
//         }
//     }


//     async verifyToken(req, res) {
//         const token = req.body.token

//         try {
//             const verified = jwt.verify(token, process.env.SECRET_KEY)
//             const user = await User.findById(verified._id)
//             if(user){
//                 res.status(200).json({ status: "ok", payload: verified._id })
//             }

//         } catch (error) {
//             console.log(error)
//             res.status(400).json({ status: "error", message: 'Invalid or expired activation token' })
//         }
//     }

// }

// module.exports = new AuthController()