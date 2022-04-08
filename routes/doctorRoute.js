const {Router} = require("express");
const doctorRouter = Router();
const {getDoctors, createDoctor, updateDoctor} = require("../controllers/doctorController")
const { body, validationResult } = require('express-validator');

/**
 * Get all doctors details
 */
doctorRouter.route("/").get(getDoctors);

/**
 * Create new doctor
 */
doctorRouter.route("/").post(
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