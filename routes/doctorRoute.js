const {Router} = require("express");
const doctorRouter = Router();
const {getDoctors, createDoctor, updateDoctor} = require("../controllers/doctorController")
const { body, validationResult } = require('express-validator');
const { authCheck } = require("../middlewares/authCheck");

/**
 * Get all doctors details
 */
doctorRouter.route("/").get(authCheck, getDoctors);

/**
 * Create new doctor
 */
doctorRouter.route("/").post(
    authCheck,
    // name must be a string
    body('name').isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()});
        }
        next();
    },
    createDoctor
);

doctorRouter.route("/").patch(
    authCheck,
    // name must be a string
    body('name').isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()});
        }
        next();
    },
    updateDoctor
)

module.exports = {
    doctorRouter
};