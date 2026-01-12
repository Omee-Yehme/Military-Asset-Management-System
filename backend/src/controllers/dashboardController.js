const Asset = require("../models/asset");
const Purchase = require("../models/purchase");
const Transfer = require("../models/transfer");
const Assignment = require("../models/assignment");
const Expenditure = require("../models/expenditure");

exports.getDashboard = async (req, res) => {
    const filter = req.user.role === "Admin"
        ? {}
        : { baseId: req.user.baseId };

    const assets = await Asset.find(filter);

    const purchases = await Purchase.find(filter);
    const assignments = await Assignment.find(filter);
    const expenditures = await Expenditure.find(filter);

    const transfersIn = await Transfer.find({
        toBaseId: req.user.baseId
    });

    const transfersOut = await Transfer.find({
        fromBaseId: req.user.baseId
    });

    const openingBalance =
        purchases.reduce((s, p) => s + p.quantity, 0);

    const assigned =
        assignments.reduce((s, a) => s + a.quantity, 0);

    const expended =
        expenditures.reduce((s, e) => s + e.quantity, 0);

    const transferInQty =
        transfersIn.reduce((s, t) => s + t.quantity, 0);

    const transferOutQty =
        transfersOut.reduce((s, t) => s + t.quantity, 0);

    const closingBalance =
        assets.reduce((s, a) => s + a.quantity, 0);

    res.json({
        openingBalance,
        closingBalance,
        netMovement:
            openingBalance + transferInQty - transferOutQty,
        assigned,
        expended
    });
};
