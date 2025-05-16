const e = require("express")
const UserController = require("../controllers/UserController")
const authToken = require("../middlewares/authToken")
const router = e.Router()

router.get("/all", authToken ,UserController.getAllUsers)

module.exports = router