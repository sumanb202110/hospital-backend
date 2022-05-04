const doctor = require("../services/doctor.service");
const logger = require("../logger");

/**
 * get doctors 
 * 
 * @param {object} req 
 * @param {object} res 
 */
const getDoctors = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 100;
    const sortBy = req.query.sortBy;
    const name = req.query.name;
    const location = req.query.location;



    try{
        res.status(200).json(await doctor
            .getDoctors(page, count, sortBy, name, location));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * get doctors by id 
 * 
 * @param {object} req 
 * @param {object} res 
 */
const getDoctorById = async (req, res) => {
    try{
        res.status(200).json(await doctor.getDoctorById(req.params.id));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * create new doctors
 * 
 * @param {object} req 
 * @param {object} res 
 */
const createDoctor = async (req, res) => {
    try{
        const DoctorData = {
            name: req.body.name,
            description: req.body.description,
            phone: req.body.phone,
            email: req.body.email,
            education: req.body.education,
            location: req.body.location
        };


        res.status(201).json(await doctor.createDoctor(`D${Date.now().toString(16)}`, DoctorData));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * update specific doctor details
 * 
 * @param {object} req 
 * @param {object} res 
 */
const updateDoctor = async (req, res) => {
    try{
        const DoctorData = {
            name: req.body.name,
            description: req.body.description,
            phone: req.body.phone,
            email: req.body.email,
            education: req.body.education,
            location: req.body.location
        };


        res.status(200).json(await doctor.updateDoctor(req.params.id, DoctorData));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * delete specific doctor
 * 
 * @param {object} req 
 * @param {object} res 
 */
const deleteDoctor = async (req, res) => {
    try{
        res.status(204).json(await doctor.deleteDoctor(req.params.id));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};