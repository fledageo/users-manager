const e = require("express")
const UserController = require("../controllers/UserController")
const authToken = require("../middlewares/authToken")
const checkPermission = require("../middlewares/checkPermission")
const router = e.Router()

router.get("/all", authToken ,UserController.getAllUsers)
router.post("/invite", authToken, checkPermission("invite") ,authToken ,UserController.inviteUser)
router.delete("/delete/:id", authToken, checkPermission("delete"), UserController.deleteUser)
router.patch("/update/:id", authToken, checkPermission("update"), UserController.updateUser)

router.post("/activate", UserController.userActivate)
router.post("/reset/password", UserController.sendResetToken)
router.post("/change/password", UserController.changePassword)


module.exports = router