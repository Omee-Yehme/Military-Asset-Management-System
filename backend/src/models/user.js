const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
  role: {type: String, 
  enum: ["Admin", "BaseCommander", "LogisticsOfficer"],
  default: "LogisticsOfficer"},
  baseId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
})

module.exports = mongoose.model("User", userSchema)
