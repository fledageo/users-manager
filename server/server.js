require('dotenv').config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const router = require("./routes/mainRouter.js")
const initAdmin = require('./utils/initAdmin')
const initRoles = require('./utils/initRoles.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("MongoDB connected")
    app.listen(PORT,() => console.log(`server is running on PORT ${PORT}`))
    initRoles()
})
.catch(err => {
    console.log("Something went wrong...DB connection error")
    console.log(err)
})



