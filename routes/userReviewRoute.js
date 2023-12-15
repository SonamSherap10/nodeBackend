const { createReview, getReview, deleteReview } = require("../contoller/admin/users/userReview/userReview")
const Authcheck = require("../middleware/authCheck")
const RestrictTO = require("../middleware/restrictTo")
const catchAsync = require ( "../services/catchAsync")
const router = require("express").Router()

router.route("/:id").post(Authcheck,RestrictTO("Customer"),catchAsync(createReview))
.delete(Authcheck,catchAsync(deleteReview))

router.route("/getReview").get(Authcheck,catchAsync(getReview))
module.exports = router 