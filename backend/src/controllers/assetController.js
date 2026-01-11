const Asset = require("../models/asset");

/**
 * Create Asset
 * Admin → any base
 * BaseCommander → only own base (enforced by baseGuard)
 */
exports.createAsset = async (req, res) => {
    try {
        const asset = await Asset.create(req.body);
        res.status(201).json({
            success: true,
            asset
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Get Assets
 * Admin → all
 * Others → only their base
 */
exports.getAssets = async (req, res) => {
    try {
        const filter =
            req.user.role === "Admin"
                ? {}
                : { baseId: req.user.baseId };

        const assets = await Asset.find(filter);
        res.json(assets);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Update Asset Quantity
 */
exports.updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.json(asset);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Delete Asset (Admin only)
 */
exports.deleteAsset = async (req, res) => {
    try {
        await Asset.findByIdAndDelete(req.params.id);
        res.json({ message: "Asset deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
