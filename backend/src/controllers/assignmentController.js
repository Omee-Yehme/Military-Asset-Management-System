const Assignment = require("../models/assignment");
const Asset = require("../models/asset");

exports.createAssignment = async (req, res) => {
    try {
        const { assetId, quantity, assignedTo, baseId: bodyBaseId } = req.body;

        if (!assetId) {
            return res.status(400).json({ message: "assetId is required" });
        }

        if (!quantity || Number(quantity) <= 0) {
            return res.status(400).json({ message: "quantity must be a positive number" });
        }

        // Determine target base: Admin must supply baseId in body
        const baseId = req.user && req.user.role === "Admin"
            ? bodyBaseId
            : req.user && req.user.baseId;

        if (!baseId) {
            return res.status(400).json({ message: "User has no base assigned" });
        }

        // Fetch asset by id then verify it belongs to the requested base
        const asset = await Asset.findById(assetId);

        // Debug info to help trace incorrect payloads
        console.log('createAssignment debug:', { user: req.user && { id: req.user._id, role: req.user.role, baseId: req.user.baseId }, body: req.body, asset: asset && { id: asset._id, baseId: asset.baseId, quantity: asset.quantity } });

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        if (asset.baseId.toString() !== baseId.toString()) {
            return res.status(404).json({ message: "Asset not found at this base" });
        }

        const qty = Number(quantity);
        if (asset.quantity < qty) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${asset.quantity}` });
        }

        asset.quantity -= qty;
        await asset.save();

        const assignment = await Assignment.create({
            assetId,
            baseId,
            quantity: qty,
            assignedTo
        });

        res.status(201).json({ success: true, assignment, remainingStock: asset.quantity });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAssignments = async (req, res) => {
    const data = await Assignment.find();
    res.json(data);
};
