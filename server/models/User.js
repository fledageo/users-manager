const {Schema,model} = require("mongoose")

const User = new Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    role:{type: Schema.Types.ObjectId,ref:"role",require:true},
    fullName:{type:String},
    phone:{type:String},
    status:{type:String, num:["invited", "active"]}
})

module.exports = model("user",User)