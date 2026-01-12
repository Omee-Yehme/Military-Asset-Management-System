const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getDashboard , deleteDashboard } = require("../controllers/dashboardController");
const rbac = require("../middlewares/rbac");

router.get("/", auth, getDashboard);

router.delete("/:id", auth,rbac("canAccessAll"), deleteDashboard);

module.exports = router;
