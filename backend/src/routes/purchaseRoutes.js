const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const baseGuard = require("../middlewares/baseGuard");

const {
    createPurchase,
    getPurchases
} = require("../controllers/purchaseController");

router.post(
    "/",
    auth,
    rbac("canPurchase"),
    baseGuard,
    createPurchase
);

router.get(
    "/",
    auth,
    rbac("canAccessBaseOnly"),
    getPurchases
);

module.exports = router;
