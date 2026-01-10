const user = require("../models/user");

const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "INvalid Credentials"
            })
        }
        const isMatch = await bycrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const { generateToken } = require("../utils/jwt")

        const token = generateToken({
            userId: user._id,
            role: user.role,
            baseId: user.baseId
        })


        res.json({ token })
    } catch (err) {
        res.status(500).json({ msg: "Server error!!!" })
    }
}




















