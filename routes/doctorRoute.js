const {Router} = require("express");
const doctorRouter = Router();
const {getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctorById} = require("../controllers/doctorController");
const { body, validationResult, param } = require("express-validator");
const { authCheck } = require("../middlewares/authCheck");

/**
 * Get all doctors details
 */
doctorRouter.route("/").get(authCheck, getDoctors);
doctorRouter.route("/:id").get(
    authCheck,
    // id must be a string
    param("id").isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()});
        }
        next();
    },
    getDoctorById
);


/**
 * Create new doctor
 */
doctorRouter.route("/").post(
    authCheck,
    // name must be a string
    body("name").isString(),
    // description must be string
    body("description").isString(),
    // phone no as per rule
    body("phone").isMobilePhone(),
    // email must be as per rule
    body("email").isEmail(),
    // education must be string
    body("education").isString(),
    // location must be string
    body("location").isString(),
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

doctorRouter.route("/:id").patch(
    authCheck,
    // id must be a string
    param("id").isString(),
    // name must be a string
    body("name").isString(),
    // description must be string
    body("description").isString(),
    // phone no as per rule
    body("phone").isMobilePhone(),
    // email must be as per rule
    body("email").isEmail(),
    // education must be string
    body("education").isString(),
    // location must be string
    body("location").isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()});
        }
        next();
    },
    updateDoctor
);

doctorRouter.route("/:id").delete(
    authCheck,
    // id must be a string
    param("id").isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()});
        }
        next();
    },
    deleteDoctor
);

module.exports = {
    doctorRouter
};