const {Router} = require("express");
const doctorRouter = Router();
const {getDoctors, createDoctor} = require("../controllers/doctorController")

/**
 * Get all doctors details
 */
doctorRouter.route("/").get(getDoctors);

/**
 * Create new doctor
 */
doctorRouter.route("/").post(createDoctor);

module.exports = {
    doctorRouter
};