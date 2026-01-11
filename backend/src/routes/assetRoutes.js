const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const baseGuard = require("../middlewares/baseGuard");

const {
    createAsset,
    getAssets,
    updateAsset,
    deleteAsset
} = require("../controllers/assetController");

router.post(
    "/",
    auth,
    rbac("canAccessAll"), // Admin only
    createAsset
);

router.get(
    "/",
    auth,
    getAssets
);

router.put(
    "/:id",
    auth,
    rbac("canAccessAll"), // Admin only
    updateAsset
);

router.delete(
    "/:id",
    auth,
    rbac("canAccessAll"), // Admin only
    deleteAsset
);

module.exports = router;
