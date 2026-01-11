const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ["Weapon", "Vehicle", "Ammunition"],
        required: true
    },
    baseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: true
    },
    quantity: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);
