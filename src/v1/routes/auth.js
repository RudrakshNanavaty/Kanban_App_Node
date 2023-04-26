const router = require("express").Router()
const userController = require("../controllers/user")
const { body } = require("express-validator")
const validation = require("../handlers/validation")
const tokenHandler = require("../handlers/tokenHandler")
const User = require("../models/user")

router.post(
	"/signup",

	// checking if password is less than 8 characters
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be atleast 8 characters."),

	// checking if username already exists
	body("username").custom(async value => {
		return User.findOne({ username: value }).then(user => {
			// return a rejected Promise if user exists
			if (user) return Promise.reject("Username already exists.")
		})
	}),

	validation.validate,
	userController.signup
)

router.post(
	"/login",

	// checking if password is less than 8 characters
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be atleast 8 characters."),

	validation.validate,
	userController.login
)

router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
	res.status(200).json({ user: req.user })
})

module.exports = router
