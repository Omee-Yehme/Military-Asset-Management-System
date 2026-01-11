const permissions = require("../utils/permissions");

module.exports = (action) => {
    return (req, res, next) => {
        const role = req.user.role;
        const rolePermissions = permissions[role];

        if (!rolePermissions) {
            return res.status(403).json({ message: "Invalid role" });
        }

        if (rolePermissions.canAccessAll) {
            return next();
        }

        if (!rolePermissions[action]) {
            return res.status(403).json({
                message: "Access denied for this role"
            });
        }

        next();
    };
};
