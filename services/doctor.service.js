const { Doctor } = require("../models/doctor");

/**
 * Get all doctors data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getDoctors = async (req, res) => {
    try {
        const snapshot = await Doctor.get();
        return snapshot.docs.map((doc)=>{
            return {
                id: doc.id,
                data: doc.data()
            };
        });
    } catch (err) {
        console.log(err)
        throw {
            msg: "Error"
        };
    }
};

/**
 * Create new doctor
 * 
 * @param {Object} doctorData 
 * @returns 
 */
const createDoctor = async (doctorData) => {
    try {
        const response = await Doctor.add(doctorData);
        return;
    } catch (err) {
        throw {
            msg: "Error"
        };
    }
};

/**
 * Update doctor data for a specific doctor
 * @param {Object} doctorData 
 * @returns 
 */
const updateDoctor = async (doctorData) => {
    try {
        // const response = await Doctor.set(doctorData);
        return;
    } catch (err) {
        throw {
            msg: "Error"
        };
    }
}


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor
}