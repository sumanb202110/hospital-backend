const { Doctor } = require("../models/doctor");

/**
 * Get all doctors data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getDoctors = async () => {
    try {
        const snapshot = await Doctor.get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            };
        });
    } catch (err) {
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
        await Doctor.add(doctorData);
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
const updateDoctor = async () => {
    try {
        // const response = await Doctor.set(doctorData);
        // return;
    } catch (err) {
        throw {
            msg: "Error"
        };
    }
};


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor
};