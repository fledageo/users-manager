const Role = require("../models/Role")
const initAdmin = require("./initAdmin")

const roles = [
    {
        name: "admin",
        edit: "all",
        invite: true,
        delete: true,

        permissions: {
            read: ["email", "fullName", "phone", "status", "role"],
            update: ["photo","email", "fullName", "phone", "role"]
        },
        scope: "any"
    },
    {
        name: "editor",
        permissions: {
            read: ["email", "fullName", "phone", "status"],
            update: ["fullName", "phone"]
        },
        scope: "any"
    },
    {
        name: "user",
        permissions: {
            read: ["email", "fullName", "phone"],
            update: ["photo","fullName", "phone"]
        },
        scope: "own"
    }
]


module.exports = async function () {
    let roleAdmin;
    for (let role of roles) {
        const exist = await Role.findOne({ name: role.name })
        if (!exist) {
            const newRole = await Role.create(role)
            if (newRole.name === "admin") roleAdmin = newRole._id
        } else {
            if (exist.name === "admin") roleAdmin = exist._id
        }
    }

    if (roleAdmin) {
        initAdmin(roleAdmin)
    }
}