const Assignment = require("../models/assignment");

exports.createAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.create({
            assetId: req.body.assetId,
            baseId: req.body.baseId,
            quantity: req.body.quantity,
            assignedTo: req.body.assignedTo
        });

        res.status(201).json({ success: true, assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAssignments = async (req, res) => {
    res.json(await Assignment.find());
};
