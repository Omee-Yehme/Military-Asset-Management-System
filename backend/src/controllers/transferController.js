const Transfer = require("../models/transfer");
const Asset = require("../models/asset");

exports.createTransfer = async (req, res) => {
    try {
        const { assetId, fromBaseId, toBaseId, quantity } = req.body;

        const fromAsset = await Asset.findOne({ _id: assetId, baseId: fromBaseId });
        if (!fromAsset || fromAsset.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock at source base" });
        }

        fromAsset.quantity -= quantity;
        await fromAsset.save();

        let toAsset = await Asset.findOne({ _id: assetId, baseId: toBaseId });
        if (!toAsset) {
            toAsset = await Asset.create({
                name: fromAsset.name,
                type: fromAsset.type,
                baseId: toBaseId,
                quantity: 0
            });
        }

        toAsset.quantity += quantity;
        await toAsset.save();

        const transfer = await Transfer.create({
            assetId,
            fromBaseId,
            toBaseId,
            quantity,
            transferDate: new Date(),
            initiatedBy: req.user.userId
        });

        res.status(201).json(transfer);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTransfers = async (req, res) => {
    res.json(await Transfer.find());
};
