const { registeruser, loginuser, forgotpassword, otpcheck, resetpassword } = require("../contoller/auth/authContol")
const catchAsync = require("../services/catchAsync")
const router = require("express").Router()
//api 
router.route("/register").post(catchAsync(registeruser))
router.route("/login").post(catchAsync(loginuser))
router.route("/forgotpassword").post(catchAsync(forgotpassword))
router.route("/otpcheck").post(catchAsync(otpcheck))
router.route("/resetpassword",).post(catchAsync(resetpassword))

module.exports = router 