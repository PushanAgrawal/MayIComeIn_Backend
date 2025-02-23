
const express = require("express");
const router = express.Router();
const otpRoutes = require("./otpRoutes");
const loginRoutes = require("./loginRoutes");
const teachersRoutes = require("./teachersRoutes");
router.use("/otp", otpRoutes);
router.use("/loginRoutes", loginRoutes);
router.use("/teachersRoutes", teachersRoutes);

module.exports = router;
