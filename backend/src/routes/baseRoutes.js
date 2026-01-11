const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const {
    createBase,
    getBases,
    updateBase,
    deleteBase
} = require("../controllers/baseController");

// Create a base (Admin only)
router.post("/", auth, rbac("canAccessAll"), createBase);

// Get all bases (everyone can view)
router.get("/", auth, getBases);

// Update base (Admin only)
router.put("/:id", auth, rbac("canAccessAll"), updateBase);

// Delete base (Admin only)
router.delete("/:id", auth, rbac("canAccessAll"), deleteBase);

module.exports = router;
