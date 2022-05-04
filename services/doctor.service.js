const { Doctor } = require("../models/doctor");
const logger = require("../logger");

/**
 * Get all doctors data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getDoctors = async (page, count, sortBy, name, location) => {
    try {
        let snapshot = await Doctor;

        if (name != undefined && name != "") {
            snapshot = await snapshot.where("name", "==", name);
        }

        if (location != undefined && location != "") {
            snapshot = await snapshot
                .where("location", "==", location);
        }

        if (sortBy == "name" && !(name != undefined && name != "")) {
            snapshot = await snapshot.orderBy("name");

        } else if (sortBy == "location" && !(location != undefined && location != "")) {
            snapshot = await snapshot.orderBy("location");
        }

        snapshot = await snapshot
            .offset((page - 1) * count)
            .limit(count)
            .get();

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

/**
 * get doctor details by id function
 * 
 * @param {string} id 
 * @returns 
 */
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

/**
 * delete doctor
 * 
 * @param {string} id 
 * @returns 
 */
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