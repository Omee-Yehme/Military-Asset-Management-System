const Purchase = require("../models/purchase");

exports.createPurchase = async (req, res) => {
    const { assetId, baseId, quantity } = req.body;

    const purchase = await Purchase.create({
        assetId,
        baseId,
        quantity,
        purchaseDate: new Date(),
        addedBy: req.user.userId
    });

    res.status(201).json(purchase);
};

exports.getPurchases = async (req, res) => {
    const filter =
        req.user.role === "Admin"
            ? {}
            : { baseId: req.user.baseId };

    const purchases = await Purchase.find(filter);
    res.json(purchases);
};
