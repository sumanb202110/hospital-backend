const {Router} = require("express");
const authRouter = Router();
const { createUser, login, logout } = require("../controllers/authController");
const { authCheck } = require("../middlewares/authCheck");

/**
 * Get all doctors details
 */
authRouter.route("/signup").post(createUser);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(authCheck, logout);




module.exports = {
    authRouter
};
