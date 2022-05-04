const { auth } = require("../firebase");
const logger = require("../logger");

/**
 * check auth for protected routes
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns 
 */
const authCheck = async (req, res, next) => {
    try {
        if (!req?.headers["authorization"] || !req?.headers["authorization"].split("Bearer ")[1]) {
            return res.status(401).json({
                msg: "unauthorized access"
            }).send();
        }

        const authHeader = req?.headers["authorization"];
        const idToken = authHeader && authHeader.split("Bearer ")[1];

        if (idToken == null) {
            return res.status(401).json({
                msg: "unauthorized access"
            }).send();
        }

        const checkRevoked = true;
        const decodedToken = await auth.verifyIdToken(idToken, checkRevoked);
        const uid = decodedToken.uid;
        
        req.uid = uid;
        next();

    } catch (err) {
        logger.error(err);
        return res.status(401).json({
            msg: "unauthorized access"
        }).send();
    }
};

module.exports = {
    authCheck
};