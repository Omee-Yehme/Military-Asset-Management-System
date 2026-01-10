const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("./src/models/user")

mongoose.connect(process.env.MONGODB_URI)

async function createAdmin() {
  const hash = await bcrypt.hash("admin123", 10)

  await User.create({
    name: "Admin",
    email: "admin@military.com",
    passwordHash: hash,
    role: "Admin"
  })

  console.log("Admin created")
  process.exit()
}

createAdmin()
