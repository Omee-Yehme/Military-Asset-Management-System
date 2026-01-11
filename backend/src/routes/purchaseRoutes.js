const express = require("express");
const router = express.Router();
const { createPurchase, getPurchases } = require("../controllers/purchaseController");
const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const baseGuard = require("../middlewares/baseGuard");

router.post("/", auth, rbac("canPurchase"), baseGuard, createPurchase);
router.get("/", auth, rbac("canPurchase"), getPurchases);

module.exports = router;
