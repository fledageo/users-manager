const { Schema, model } = require("mongoose");


const PermissionsSchema = new Schema({
    read: [String],
    update: [String]   
}, { _id: false })

const RoleSchema = new Schema({
    name: { type: String, required: true, enum: ["admin", "editor", "user"] },
    invite: {type: Boolean},
    delete:{type: Boolean},
    permissions: {type: PermissionsSchema}
})

module.exports = model("role", RoleSchema);