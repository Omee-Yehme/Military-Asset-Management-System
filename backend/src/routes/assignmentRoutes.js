const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const baseGuard = require("../middlewares/baseGuard");

const {
    createAssignment,
    getAssignments
} = require("../controllers/assignmentController");

router.post(
    "/",
    auth,
    rbac("canAccessBaseOnly"),
    baseGuard,
    createAssignment
);

router.get(
    "/",
    auth,
    rbac("canAccessBaseOnly"),
    getAssignments
);

module.exports = router;
