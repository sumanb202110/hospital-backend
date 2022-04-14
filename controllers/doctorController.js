const doctor = require("../services/doctor.service");

const getDoctors = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 100;

    try{
        res.status(200).json(await doctor.getDoctors(page, count));
    } catch (err) {
        res.status(400).json(err).send();
    }
};

const createDoctor = async (req, res) => {
    try{
        const DoctorData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            phoneNo: req.bosy.phoneNo,
            email: req.body.email,
            education: req.body.education,
            location: req.body.location
        };


        res.status(201).json(await doctor.createDoctor(DoctorData));
    }catch(err){
        res.status(400).json(err).send();
    }
};

const updateDoctor = async (req, res) => {
    try{
        const DoctorData = {
            name: req.body.name
        };


        res.status(201).json(await doctor.updateDoctor(DoctorData));
    }catch(err){
        res.status(400).json(err).send();
    }
};
module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor
};