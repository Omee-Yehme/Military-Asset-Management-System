const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken({
            userId: user._id,
            role: user.role,
            baseId: user.baseId
        });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, baseId: user.baseId } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }

}

    exports.register = async (req, res) => {
        try {
            const { name, email, password, role, baseId } = req.body;

            if (role !== "Admin" && !baseId) {
                return res.status(400).json({ message: "baseId required for this role" });
            }

            const exists = await User.findOne({ email });
            if (exists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
                baseId: role === "Admin" ? null : baseId
            });

            res.status(201).json({
                success: true,
                message: "User created successfully"
            });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    };


