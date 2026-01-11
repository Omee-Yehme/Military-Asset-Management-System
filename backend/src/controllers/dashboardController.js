const Asset = require("../models/asset");
const Purchase = require("../models/purchase");
const Transfer = require("../models/transfer");
const Assignment = require("../models/assignment");
const Expenditure = require("../models/expenditure");

exports.getDashboard = async (req, res) => {
    const filter =
        req.user.role === "Admin"
            ? {}
            : { baseId: req.user.baseId };

    const assets = await Asset.find(filter);
    const purchases = await Purchase.find(filter);
    const transfers = await Transfer.find(filter);
    const assignments = await Assignment.find(filter);
    const expenditures = await Expenditure.find(filter);

    res.json({
        assets,
        purchases,
        transfers,
        assignments,
        expenditures
    });
};
