const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Admin", "BaseCommander", "LogisticsOfficer"],
    required: true
  },
  baseId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema)
