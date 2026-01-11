const Base = require("../models/base");

// Create a new Base (Admin only)
exports.createBase = async (req, res) => {
    try {
        const base = await Base.create(req.body);
        res.status(201).json({
            success: true,
            base
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all Bases (All roles can see)
exports.getBases = async (req, res) => {
    try {
        const bases = await Base.find();
        res.json(bases);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Base (Admin only)
exports.updateBase = async (req, res) => {
    try {
        const base = await Base.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!base) {
            return res.status(404).json({ message: "Base not found" });
        }
        res.json(base);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Base (Admin only)
exports.deleteBase = async (req, res) => {
    try {
        await Base.findByIdAndDelete(req.params.id);
        res.json({ message: "Base deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
