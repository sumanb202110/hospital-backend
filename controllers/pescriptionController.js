const pescription = require("../services/pescription.service");
const logger = require("../logger");


const getPescriptions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 100;

    try{
        res.status(200).json(await pescription.getPescription(page, count));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

const getPescriptionById = async (req, res) => {
    try{
        res.status(200).json(await pescription.getPescriptionById(req.params.id));
    } catch (err) {
        logger.error(err);
        res.status(400).json(err).send();
    }
};

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


        res.status(201).json(await pescription.createPescription(req.body.id, PescriptionData));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

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

        res.status(200).json(await pescription.updatePescription(req.params.id, PescriptionData));
    }catch(err){
        logger.error(err);
        res.status(400).json(err).send();
    }
};

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