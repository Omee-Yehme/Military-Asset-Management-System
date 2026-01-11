const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema({
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
    reason: {
        type: String,
        required: true
    },
    dateExpended: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Expenditure", expenditureSchema);
