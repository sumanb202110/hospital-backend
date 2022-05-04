const patient = require("../services/patient.service");
const logger = require("../logger");


/**
 * Get specific doctors details
 * @param {object} req 
 * @param {object} res 
 */
const getPatients = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 100;
    const sortBy = req.query.sortBy;
    const name = req.query.name;

    try{
        res.status(200).json(await patient.getPatients(page, count, sortBy, name));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * get specific patient details by id
 * 
 * @param {object} req 
 * @param {object} res 
 */
const getPatientById = async (req, res) => {
    try{
        res.status(200).json(await patient.getPatientById(req.params.id));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * Create new patient
 * 
 * @param {object} req 
 * @param {object} res 
 */
const createPatient = async (req, res) => {
    try{
        const PatientData = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            dob: req.body.dob,
            address: req.body.address
        };


        res.status(201).json(await patient.createPatient(`P${Date.now().toString(16)}`, PatientData));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * update specific patient details
 * 
 * @param {object} req 
 * @param {object} res 
 */
const updatePatient = async (req, res) => {
    try{
        const PatientData = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            dob: req.body.dob,
            address: req.body.address
        };


        res.status(200).json(await patient.updatePatient(req.params.id, PatientData));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * delete specific patient
 * 
 * @param {object} req 
 * @param {object} res 
 */
const deletePatient = async (req, res) => {
    try{
        res.status(204).json(await patient.deletePatient(req.params.id));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};
module.exports = {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};