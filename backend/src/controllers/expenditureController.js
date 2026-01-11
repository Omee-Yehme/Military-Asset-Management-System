const Expenditure = require("../models/expenditure");

exports.createExpenditure = async (req, res) => {
    try {
        const expenditure = await Expenditure.create({
            assetId: req.body.assetId,
            baseId: req.body.baseId,
            quantity: req.body.quantity,
            reason: req.body.reason
        });

        res.status(201).json({ success: true, expenditure });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getExpenditures = async (req, res) => {
    res.json(await Expenditure.find());
};
