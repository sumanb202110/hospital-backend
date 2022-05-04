const user = require("../services/auth.service");


/**
 * Create new user
 * 
 * @param {object} req 
 * @param {object} res 
 */
const createUser = async (req, res) => {
    try{
        res.status(201).json(await user.createUser(req.body.email, req.body.password, req.body.name));
    }catch(err){
        console.log(err);
    }
};

/**
 * Login 
 * 
 * @param {object} req 
 * @param {object} res 
 */
const login = async (req, res) => {
    try{
        res.status(200).json(await user.login(req.body.email, req.body.password));
    }catch(err){
        console.log(err);
    }
};

/**
 * logout function
 * 
 * @param {object} req 
 * @param {object} res 
 */
const logout = async(req, res) => {
    try{
        // revoke token
        await user.revokeToken(req.uid);
        res.status(200).send();
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    createUser,
    login,
    logout
};