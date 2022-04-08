const {Router} = require("express");
const authRouter = Router();
const { body, validationResult } = require('express-validator');
const { createUser, login, logout } = require("../controllers/authController");

/**
 * Get all doctors details
 */
authRouter.route("/signup").post(createUser);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);




module.exports = {
    authRouter
}
