const {Router} = require("express");
const authRouter = Router();
const { createUser, login, logout } = require("../controllers/authController");
const { authCheck } = require("../middlewares/authCheck");

/**
 * Signup route
 */
authRouter.route("/signup").post(createUser);

/**
 * login route
 */
authRouter.route("/login").post(login);

/**
 * logout route
 */
authRouter.route("/logout").post(authCheck, logout);




module.exports = {
    authRouter
};
