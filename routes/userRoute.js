const { getUsers, deleteUser } = require("../contoller/admin/users/userController")
const isAuthenticated = require("../middleware/authCheck")
const restrictTo = require("../middleware/restrictTo")

const router = require("express").Router()

router.route("/users").get(isAuthenticated,restrictTo('Admin'),getUsers)
router.route("/users/:id").delete(isAuthenticated,restrictTo("Admin"),deleteUser)


module.exports = router 