const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true
    },
    baseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    assignmentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
