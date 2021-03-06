const { Patient } = require("../models/patient");
const logger = require("../logger");

/**
 * Get all patients data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getPatients = async (page, count, sortBy, name) => {
    try {
        let snapshot = await Patient;

        // check name and include name filter
        if (name != undefined && name != "") {
            snapshot = await snapshot.where("name", "==", name);
        }


        // check name and include name sort
        if (sortBy == "name" && !(name != undefined && name != "")) {
            snapshot = await snapshot.orderBy("name");

        }

        // pagination
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
 * get patient details by id
 * 
 * @param {string} id 
 * @returns 
 */
const getPatientById = async (id) => {
    try {
        const response = await (await Patient.doc(id).get()).data();
        return response;
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};

/**
 * Create new patient
 * 
 * @param {Object} patientData 
 * @returns 
 */
const createPatient = async (id, patientData) => {
    try {
        await Patient.doc(id).set(patientData);
        return;
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};

/**
 * Update patient data for a specific patient
 * @param {Object} patientData 
 * @returns 
 */
const updatePatient = async (id, patientData) => {
    try {
        await Patient.doc(id).set(patientData);
        return "Successfully updated";
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};

/**
 * delete patinet
 * 
 * @param {string} id 
 * @returns 
 */
const deletePatient = async (id) => {
    try {
        await Patient.doc(id).delete();
        return;
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};


module.exports = {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientById
};