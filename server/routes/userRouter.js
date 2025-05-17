const e = require("express")
const UserController = require("../controllers/UserController")
const authToken = require("../middlewares/authToken")
const router = e.Router()

router.get("/all", authToken ,UserController.getAllUsers)
router.post("/invite", authToken ,UserController.inviteUser)
router.post("/invite/verify", UserController.verifyInvitationToken)
router.post("/activate", UserController.userActivate)

module.exports = router