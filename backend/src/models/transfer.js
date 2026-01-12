const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
    fromBaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: true
    },
    toBaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: true
    },
    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    initiatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Transfer", transferSchema);
