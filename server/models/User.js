const {Schema,model} = require("mongoose")

const User = new Schema({
    email:{type:String},
    password:{type:String},
    role:{type: Schema.Types.ObjectId, ref:"role"},
    fullName:{type:String},
    phone:{type:String},
    status:{type:String, num:["invited", "active"]},
    photo:{type: Schema.Types.ObjectId, ref:"photo"}
})

module.exports = model("user",User)