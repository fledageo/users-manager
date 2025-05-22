module.exports = function (action) {
    return async (req, res, next) => {
        try {
            const role = req.user.role;
            const currentUser = req.user

            if (action === "update") {
                const data = req.body
                const allowedFields = role.permissions.update || []
                const needUpdate = Object.keys(data)

                const notAllowedFields = needUpdate.filter(field => !allowedFields.includes(field))

                if (notAllowedFields.length > 0) {
                    return res.status(400).json({ status: "error", message: `You don't have permission to update: ${notAllowedFields.join(", ")}` });
                }
                if(role.scope === "own" && req.params.id !== currentUser.userId){
                    return res.status(400).json({ status: "error", message: `You can only update your own profile` });
                }

            }

            if (action === "invite" && !role.invite) {
                return res.status(400).json({ status: "error", message: "You don't have permission: invite" })
            }
            if (action === "delete" && !role.delete) {
                return res.status(400).json({ status: "error", message: "You don't have permission: delete" })
            }

            next()
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: "Something went wrong..." });
        }
    }
}
