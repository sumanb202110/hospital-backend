const { Doctor } = require("../models/doctor");
const logger = require("../logger");

/**
 * Get all doctors data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getDoctors = async (page, count, sortBy) => {
    try {
        let snapshot;
        if (sortBy == "name") {
            snapshot = await Doctor
                .orderBy("name")
                .offset((page - 1) * count)
                .limit(count)
                .get();
        }else if (sortBy == "location") {
            snapshot = await Doctor
                .orderBy("name")
                .offset((page - 1) * count)
                .limit(count)
                .get();
        } else {
            snapshot = await Doctor
                .offset((page - 1) * count)
                .limit(count)
                .get();
        }

        return {
            count: snapshot.size,
            data: snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
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

const getDoctorById = async (id) => {
    try {
        const response = await (await Doctor.doc(id).get()).data();
        return response;
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
const createDoctor = async (id, doctorData) => {
    try {
        await Doctor.doc(id).set(doctorData);
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
const updateDoctor = async (id, doctorData) => {
    try {
        await Doctor.doc(id).set(doctorData);
        return "Successfully updated";
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};

const deleteDoctor = async (id) => {
    try {
        await Doctor.doc(id).delete();
        return;
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
    updateDoctor,
    deleteDoctor,
    getDoctorById
};