const { Router } = require("express");
const pescriptionRouter = Router();
const { getPescriptions, createPescription, updatePescription, deletePescription, getPescriptionById } = require("../controllers/pescriptionController");
const { body, validationResult, param } = require("express-validator");
const { authCheck } = require("../middlewares/authCheck");

/**
 * Get all doctors details
 */
pescriptionRouter.route("/").get(authCheck, getPescriptions);
pescriptionRouter.route("/:id").get(
    authCheck,
    // id must be a string
    param("id").isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        next();
    },
    getPescriptionById
);


/**
 * Create new doctor
 */
pescriptionRouter.route("/").post(
    authCheck,
    // patient id must be string
    body("patientId").isString(),
    // doctor id must be a string
    body("doctorId").isString(),
    // medicines must be array of objects
    body("medicines").isArray(Object),
    // medicine name must be string
    body("medicines.*.name").isString(),
    // medicine dose must be string
    body("medicines.*.dose").isString(),
    // medicine duration must be string
    body("medicines.*.duration").isNumeric(),
    // medicine other must be string
    body("medicines.*.other").isString(),
    // temp must be decimal
    body("temp").isDecimal(),
    // bp must be object
    body("bp").isObject({
        upper: Number,
        lower: Number
    }),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        next();
    },
    createPescription
);

pescriptionRouter.route("/:id").patch(
    authCheck,
    // patient id must be string
    body("patientId").isString(),
    // doctor id must be a string
    body("doctorId").isString(),
    // madcinis must be array of objects
    body("medicines").isArray(),
    // temp must be decimal
    body("temp").isDecimal(),
    // bp must be number
    body("bp").isNumeric(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        next();
    },
    updatePescription
);

pescriptionRouter.route("/:id").delete(
    authCheck,
    // id must be a string
    param("id").isString(),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        next();
    },
    deletePescription
);

module.exports = {
    pescriptionRouter
};