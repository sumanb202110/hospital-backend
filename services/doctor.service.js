const { Doctor } = require("../models/doctor");
const logger = require("../logger");

/**
 * Get all doctors data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getDoctors = async (page, count) => {
    try {
        const snapshot = await Doctor
            .offset((page-1)*count)
            .limit(count)
            .get();
        return {
            count: snapshot.size,
            data: snapshot.docs.map((doc) => {
                return {
                    docId: doc.id,
                    data: doc.data()
                };
            })
        };

    } catch (err) {
        logger.error(err);
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
        logger.error(err);
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
        logger.error(err);
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