const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const { authValidation } = require("../validations");
const { auth } = require("../middlewares/auth");

const router = express.Router();

// post routes -------------------
// login
router.post("/login", validate(authValidation.login), authController.userLogin);

// send OTP
router.post("/send-otp", validate(authValidation.sendOtp), authController.sendOtp);

// verify OTP
router.post("/verify-otp", validate(authValidation.verifyOtp), authController.verifyOtp);


// put routes --------------------
// forgot password
router.put("/forgot-password", validate(authValidation.forgotPassword), authController.forgotPassword);

// change password
router.put("/reset-password", auth({ usersAllowed: ["*"] }), validate(authValidation.changePassword), authController.changePassword);

module.exports = router;