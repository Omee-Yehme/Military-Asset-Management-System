const Purchase = require("../models/purchase");
const Asset = require("../models/asset");

exports.createPurchase = async (req, res) => {
    try {
        const { assetId, baseId, quantity } = req.body;

        const asset = await Asset.findOne({ _id: assetId, baseId });
        if (!asset) {
            return res.status(404).json({ message: "Asset not found for this base" });
        }

        asset.quantity += quantity;
        await asset.save();

        const purchase = await Purchase.create({
            assetId,
            baseId,
            quantity,
            purchaseDate: new Date(),
            addedBy: req.user.userId
        });

        res.status(201).json({ success: true, purchase });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getPurchases = async (req, res) => {
    try {
        const { baseName, assetName, date } = req.query;

        // Step 1 — Start with role security
        let filter = req.user.role === "Admin"
            ? {}
            : { baseId: req.user.baseId };

        // Step 2 — Base Name → baseId
        if (baseName) {
            const bases = await Base.find({
                name: { $regex: baseName, $options: "i" }
            });

            const baseIds = bases.map(b => b._id);

            filter.baseId = { $in: baseIds };
        }

        // Step 3 — Asset Name → assetId
        if (assetName) {
            const assets = await Asset.find({
                name: { $regex: assetName, $options: "i" }
            });

            const assetIds = assets.map(a => a._id);

            filter.assetId = { $in: assetIds };
        }

        // Step 4 — Date filter
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);

            filter.purchaseDate = { $gte: start, $lte: end };
        }

        // Step 5 — Fetch purchases
        const purchases = await Purchase.find(filter)
            .sort({ purchaseDate: -1 });

        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};