const Expenditure = require("../models/expenditure");
const Asset = require("../models/asset");

exports.createExpenditure = async (req, res) => {
    try {
        const { assetId, baseId, quantity, reason } = req.body;

        const asset = await Asset.findOne({ _id: assetId, baseId });
        if (!asset || asset.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        asset.quantity -= quantity;
        await asset.save();

        const expenditure = await Expenditure.create({
            assetId,
            baseId,
            quantity,
            reason,
            dateExpended: new Date()
        });

        res.status(201).json(expenditure);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getExpenditures = async (req, res) => {
    res.json(await Expenditure.find());
};
