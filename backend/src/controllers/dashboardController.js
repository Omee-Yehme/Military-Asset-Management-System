const Asset = require("../models/asset");
const Purchase = require("../models/purchase");
const Transfer = require("../models/transfer");
const Assignment = require("../models/assignment");
const Expenditure = require("../models/expenditure");

exports.getDashboard = async (req, res) => {
    try {
        const { date, equipmentType } = req.query;

        const baseId =
            req.user.role === "Admin" ? req.query.baseId : req.user.baseId;

        // ---- Asset Filter ----
        const assetFilter = {};
        if (baseId) assetFilter.baseId = baseId;
        if (equipmentType) assetFilter.type = equipmentType;

        const assets = await Asset.find(assetFilter);

        // ---- Date filter for transactions ----
        let dateFilter = {};
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);

            dateFilter = {
                createdAt: { $gte: start, $lte: end },
            };
        }

        const results = [];

        for (const asset of assets) {
            const purchases = await Purchase.aggregate([
                {
                    $match: {
                        assetId: asset._id,
                        ...(baseId ? { baseId } : {}),
                        ...dateFilter,
                    },
                },
                { $group: { _id: null, total: { $sum: "$quantity" } } },
            ]);

            const transferIn = await Transfer.aggregate([
                {
                    $match: {
                        assetId: asset._id,
                        ...(baseId ? { toBaseId: baseId } : {}),
                        ...dateFilter,
                    },
                },
                { $group: { _id: null, total: { $sum: "$quantity" } } },
            ]);

            const transferOut = await Transfer.aggregate([
                {
                    $match: {
                        assetId: asset._id,
                        ...(baseId ? { fromBaseId: baseId } : {}),
                        ...dateFilter,
                    },
                },
                { $group: { _id: null, total: { $sum: "$quantity" } } },
            ]);

            const assignments = await Assignment.aggregate([
                {
                    $match: {
                        assetId: asset._id,
                        ...(baseId ? { baseId } : {}),
                        ...dateFilter,
                    },
                },
                { $group: { _id: null, total: { $sum: "$quantity" } } },
            ]);

            const expenditures = await Expenditure.aggregate([
                {
                    $match: {
                        assetId: asset._id,
                        ...(baseId ? { baseId } : {}),
                        ...dateFilter,
                    },
                },
                { $group: { _id: null, total: { $sum: "$quantity" } } },
            ]);

            const purchaseQty = purchases[0]?.total || 0;
            const transferInQty = transferIn[0]?.total || 0;
            const transferOutQty = transferOut[0]?.total || 0;
            const assignedQty = assignments[0]?.total || 0;
            const expendedQty = expenditures[0]?.total || 0;

            const openingBalance =
                asset.quantity +
                assignedQty +
                expendedQty -
                purchaseQty -
                transferInQty +
                transferOutQty;

            const closingBalance =
                openingBalance +
                purchaseQty +
                transferInQty -
                transferOutQty -
                assignedQty -
                expendedQty;

            results.push({
                assetId: asset._id,
                assetName: asset.name,
                type: asset.type,
                openingBalance,
                purchases: purchaseQty,
                transferIn: transferInQty,
                transferOut: transferOutQty,
                assigned: assignedQty,
                expended: expendedQty,
                closingBalance,
            });
        }

        res.json(results);
    } catch (err) {
        console.error("Dashboard error:", err);
        res.status(500).json({ error: err.message });
    }
};



exports.deleteDashboard = async (req, res) => {
    try {
        const assetId = req.params.id;

        await Asset.findByIdAndDelete(assetId);
        await Purchase.deleteMany({ assetId });
        await Transfer.deleteMany({ assetId });
        await Assignment.deleteMany({ assetId });
        await Expenditure.deleteMany({ assetId });

        res.status(200).json({ message: "Asset and all related records deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
