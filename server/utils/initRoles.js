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
            update: ["email", "fullName", "phone", "role"]
        }
    },
    {
        name: "editor",
        permissions: {
            read: ["email", "fullName", "phone", "status"],
            update: ["fullName", "phone"]
        }
    },
    {
        name: "user",
        permissions: {
            read: ["email", "fullName", "phone"]
        }
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