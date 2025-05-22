const { Schema, model } = require("mongoose");


const PermissionsSchema = new Schema({
    read: [String],
    update: [String]
}, { _id: false })

const RoleSchema = new Schema({
    name: { type: String, required: true, enum: ["admin", "editor", "user"] },
    invite: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    permissions: { type: PermissionsSchema },
    scope: { type: String, enum: ["own", "any"], default: "own" },
})

module.exports = model("role", RoleSchema);