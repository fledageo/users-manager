const { Schema, model } = require("mongoose");

const fields = ["fullName","phone","status","email"]

const PermissionsSchema = new Schema({
    view: [{type:String, enum: null}],  
    edit: [{type:String, enum: [...fields, '*']}],    
    delete: {type: Boolean, required: true},   
    invite: {type: Boolean, required: true}    
}, { _id: false })

const RoleSchema = new Schema({
    name: { type: String, required: true, enum: ["admin", "editor", "user"] },
    permissions: [PermissionsSchema],
})

module.exports = model("Role", RoleSchema);