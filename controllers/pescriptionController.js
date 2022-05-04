const pescription = require("../services/pescription.service");
const logger = require("../logger");
const { getDoctorById } = require("../services/doctor.service");
const { getPatientById } = require("../services/patient.service");

/**
 * get pescriptions
 * 
 * @param {object} req 
 * @param {object} res 
 */
const getPescriptions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 100;

    try{
        res.status(200).json(await pescription.getPescriptions(page, count));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * get specific pescription details by id
 * 
 * @param {object} req 
 * @param {object} res 
 */
const getPescriptionById = async (req, res) => {
    try{
        res.status(200).json(await pescription.getPescriptionById(req.params.id));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * create new pescription
 * 
 * @param {obect} req 
 * @param {object} res 
 */
const createPescription = async (req, res) => {
    try{
        const PescriptionData = {
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            medicines : req.body.medicines,
            time: new Date(),
            temp: req.body.temp,
            bp: req.body.bp
        };

        const doctorData = await getDoctorById(PescriptionData.doctorId);
        const patientData = await getPatientById(PescriptionData.patientId);
        if(doctorData.name != "" && doctorData.name != undefined){
            if(patientData.name != "" && patientData.name != undefined){
                res.status(201).json(await pescription.createPescription(`PR${Date.now().toString(16)}`, PescriptionData));
            }
        } 

    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * update specific pescription details
 * 
 * @param {object} req 
 * @param {object} res 
 */
const updatePescription = async (req, res) => {
    try{
        const PescriptionData = {
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            medicines : req.body.medicines,
            updateTime: new Date(),
            temp: req.body.temp,
            bp: req.body.bp
        };
        const doctorData = await getDoctorById(PescriptionData.doctorId);
        const patientData = await getPatientById(PescriptionData.patientId);
        if(doctorData.name != "" && doctorData.name != undefined){
            if(patientData.name != "" && patientData.name != undefined){
                res.status(200).json(await pescription.updatePescription(req.params.id, PescriptionData));
            }
        } 
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

/**
 * delete specific pescription 
 * 
 * @param {object} req 
 * @param {object} res 
 */
const deletePescription = async (req, res) => {
    try{
        res.status(204).json(await pescription.deletePescription(req.params.id));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

module.exports = {
    getPescriptions,
    getPescriptionById,
    createPescription,
    updatePescription,
    deletePescription
};