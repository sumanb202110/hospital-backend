const { Pescription } = require("../models/pescription");
const logger = require("../logger");

/**
 * Get all pescriptions data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getPescriptions = async (page, count) => {
    try {
        // pagination
        const snapshot = await Pescription
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
 * get specific pascription details by id
 * 
 * @param {string} id 
 * @returns 
 */
const getPescriptionById = async (id) => {
    try {
        const response = await (await Pescription.doc(id).get()).data();
        return response;
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};

/**
 * Create new pescription
 * 
 * @param {Object} pescriptionData 
 * @returns 
 */
const createPescription = async (id, pescriptionData) => {
    try {
        await Pescription.doc(id).set(pescriptionData);
        return;
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};

/**
 * Update pescription data for a specific pescription
 * @param {Object} pescriptionData 
 * @param {id} string
 * @returns 
 */
const updatePescription = async (id, pescriptionData) => {
    try {
        await Pescription.doc(id).set(pescriptionData);
        return "Successfully updated";
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};

/**
 * delete pescription
 * 
 * @param {string} id 
 * @returns 
 */
const deletePescription = async (id) => {
    try {
        await Pescription.doc(id).delete();
        return;
    } catch (err) {
        logger.error(err);
        throw {
            msg: "Error"
        };
    }
};


module.exports = {
    getPescriptions,
    createPescription,
    updatePescription,
    deletePescription,
    getPescriptionById
};