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
    materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Transfer", transferSchema);
