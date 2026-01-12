const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId); // ✅ FIXED

        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }

        req.user = {
            userId: user._id,
            role: user.role,
            baseId: user.baseId || null
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
