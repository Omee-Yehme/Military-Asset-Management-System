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
    const filter = req.user.role === "Admin"
        ? {}
        : { baseId: req.user.baseId };

    res.json(await Purchase.find(filter));
};
