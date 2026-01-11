const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const baseGuard = require("../middlewares/baseGuard");

const assignmentController = require("../controllers/assignmentController");

router.post(
  "/",
  auth,
  rbac("assign"),
  baseGuard,
  assignmentController.createAssignment
);

router.get(
  "/",
  auth,
  rbac("viewAssignments"),
  assignmentController.getAssignments
);

module.exports = router;
