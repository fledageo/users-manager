const e = require("express")
const authRouter= require("./authRouter.js")
const userRouter = require("./userRouter.js")

const router = e.Router()

router.use("/auth",authRouter)
router.use("/user", userRouter)

module.exports = router
