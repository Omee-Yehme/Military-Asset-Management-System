const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const { createTransfer } = require("../controllers/transferController");

router.post(
  "/",
  auth,
  rbac("canTransfer"),
  createTransfer
);

module.exports = router;
