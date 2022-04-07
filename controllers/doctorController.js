const doctor = require("../services/doctor.service");

const getDoctors = async (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 100;

    try{
        res.status(200).json(await doctor.getDoctors(page, count));
    } catch (err) {
        res.status(400).json(err).send();
    }
};

const createDoctor = async (req, res) => {
    try{
        const DoctorData = {
            name: req.body.name
        };


        res.status(201).json(await doctor.createDoctor(DoctorData));
    }catch(err){
        res.status(400).json(err).send();
    }
}
module.exports = {
    getDoctors,
    createDoctor
}