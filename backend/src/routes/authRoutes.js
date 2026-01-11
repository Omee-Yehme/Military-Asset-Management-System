const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController.js");
const auth = require("../middleware/auth.js");
const rbac = require("../middleware/rbac.js");
const { createPurchase } = require("../controllers/purchaseController.js");
const baseGuard = require("../middleware/baseGuard.js");


router.post("/login", login)

router.post("/register",register)

router.post(
    "/purchases",
    auth,
    rbac("canPurchase"),
    baseGuard,
    createPurchase
);

router.post(
    "/transfers",
    auth,
    rbac("canTransfer"),
    createTransfer
);

router.post(
    "/assignments",
    auth,
    rbac("canAccessBaseOnly"),
    baseGuard,
    assignAsset
);

router.get("/dashboard", auth, async (req, res) => {
    if(req.user.role === "Admin") {
        // Admin dashboard logic
    }
})


module.exports = router;