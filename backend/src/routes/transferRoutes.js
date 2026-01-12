const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");

const {
    createTransfer,
    getTransfers
} = require("../controllers/transferController");

router.post(
    "/",
    auth,
    rbac("canTransfer"),
    createTransfer
);

router.get(
    "/",
    auth,
    rbac("canAccessBaseOnly"),
    getTransfers
);

module.exports = router;
