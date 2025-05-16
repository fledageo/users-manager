const Role = require("../models/Role")
const initAdmin = require("./initAdmin")

const roles = [
    {
        name: "admin",
        edit: "all",
        invite: true,
        
        permissions: [
            { field: "fullName", actions: ["view", "edit"] },
            { field: "phone", actions: ["view", "edit"] },
            { field: "email", actions: ["view"] },
            { field: "role", actions: ["view", "edit"] },
            { field: "status", actions: ["view"] }
        ]
    },
    {
        name: "editor",
        permissions: [
            { field: "fullName", actions: ["view", "edit"] },
            { field: "phone", actions: ["view", "edit"] },
            { field: "email", actions: ["view"] },
            { field: "role", actions: ["view"] },
            { field: "status", actions: ["view"] }
        ]
    },
    {
        name: "user",
        permissions: [
            { field: "fullName", actions: ["view"] },
            { field: "phone", actions: ["view"] },
            { field: "email", actions: ["view"] },
            { field: "role", actions: ["view"] },
            { field: "status", actions: ["view"] }
        ]
    }
]


module.exports = async function () {
    let roleAdmin; 
    for (let role of roles) {
        const exist = await Role.findOne({name:role.name})
        if(!exist){
            const newRole = await Role.create(role)
            if(newRole.name === "admin") roleAdmin = newRole._id  
        }else{
            if(exist.name === "admin") roleAdmin = exist._id
        }        
    }

    if(roleAdmin){
        initAdmin(roleAdmin)
    }
}