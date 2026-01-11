const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const baseGuard = require("../middlewares/baseGuard");
const {
    createExpenditure,
    getExpenditures
} = require("../controllers/expenditureController");

router.post(
    "/",
    auth,
    rbac("canExpend"),
    baseGuard,
    createExpenditure
);

router.get("/", auth, getExpenditures);

module.exports = router;
