const Transfer = require("../models/transfer");

exports.createTransfer = async (req, res) => {
    try {
        const transfer = await Transfer.create({
            fromBaseId: req.body.fromBaseId,
            toBaseId: req.body.toBaseId,
            materialId: req.body.materialId,
            quantity: req.body.quantity,
            createdBy: req.user.userId
        });

        res.status(201).json({ success: true, transfer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTransfers = async (req, res) => {
    const transfers = await Transfer.find();
    res.json(transfers);
};
