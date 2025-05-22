const bcrypt = require("bcrypt")
const User = require("../models/User")
const Role = require("../models/Role")

const roles = [
    {
        name: "admin",
        edit: "all",
        invite: true,
        delete: true,

        permissions: {
            read: ["email", "fullName", "phone", "status", "role"],
            update: ["photo", "email", "fullName", "phone", "role"]
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
            update: ["photo", "fullName", "phone"]
        },
        scope: "own"
    }
]

const initAdmin = async (roleAdmin) => {
    const isAdminExist = await User.findOne({ role: roleAdmin })
    if (!isAdminExist && roleAdmin) {
        const admin = {
            email: process.env.ADMIN_LOGIN,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 8),
            role: roleAdmin
        }

        const createAdmin = await User.create(admin)
        return createAdmin
    }
}


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