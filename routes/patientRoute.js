const {Router} = require("express");
const patientRouter = Router();
const {getPatients, createPatient, updatePatient, deletePatient, getPatientById} = require("../controllers/patientController");
const { body, validationResult, param } = require("express-validator");
const { authCheck } = require("../middlewares/authCheck");

/**
 * Get all patients details
 */
patientRouter.route("/").get(authCheck, getPatients);
patientRouter.route("/:id").get(
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
    getPatientById
);


/**
 * Create new patient
 */
patientRouter.route("/").post(
    authCheck,
    // name must be a string
    body("name").isString(),
    // phone no as per rule
    body("phone").isMobilePhone(),
    // email must be as per rule
    body("email").isEmail(),
    // DOB must be date
    body("dob").isDate(),
    // address must be string
    body("address").isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()});
        }
        next();
    },
    createPatient
);

/**
 * update patient route
 */
patientRouter.route("/:id").patch(
    authCheck,
    // id must be string
    body("id").isString(),
    // name must be a string
    body("name").isString(),
    // phone no as per rule
    body("phone").isMobilePhone(),
    // email must be as per rule
    body("email").isEmail(),
    // DOB must be date
    body("dob").isDate(),
    // address must be string
    body("address").isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()});
        }
        next();
    },
    updatePatient
);

/**
 * delete patient route
 */
patientRouter.route("/:id").delete(
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
    deletePatient
);

module.exports = {
    patientRouter
};