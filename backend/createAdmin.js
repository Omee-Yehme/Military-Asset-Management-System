require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/user");

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const existing = await User.findOne({ email: "admin@military.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@military.com",
      password: hashedPassword,
      role: "Admin"
    });

    console.log("Admin created successfully");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
