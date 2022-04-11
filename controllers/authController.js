const user = require("../services/auth.service");

const createUser = async (req, res) => {
    try{
        res.status(201).json(await user.createUser(req.body.email, req.body.password, req.body.name));
    }catch(err){
        console.log(err);
    }
};

const login = async (req, res) => {
    try{
        res.status(200).json(await user.login(req.body.email, req.body.password));
    }catch(err){
        console.log(err);
    }
};

const logout = async(req, res) => {
    try{
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