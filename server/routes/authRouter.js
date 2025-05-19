const AuthController = require("../controllers/AuthController.js")
const e = require("express")
const router = e.Router()

router.post("/login", AuthController.login)
router.post("/token/verify", AuthController.verifyToken)

module.exports = router