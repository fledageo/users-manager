const {Schema,model} = require("mongoose")

const User = new Schema({
    email:{type:String},
    password:{type:String},
    role:{type: Schema.Types.ObjectId, ref:"role"},
    fullName:{type:String},
    phone:{type:String},
    status:{type:String, num:["invited", "active"]}
})

module.exports = model("user",User)