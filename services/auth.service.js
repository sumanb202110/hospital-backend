const {auth} = require("../firebase");
const axios = require("axios");
const logger = require("../logger");


const login = async (email, password) => {
    //eslint-disable-next-line
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

    try {
        const response = await axios.post(url,{
            "email": email,
            "password": password,
            "returnSecureToken": true
        });
        
        return response.data;
    } catch (err) {
        logger.error("login error", err);
    }
};

const createUser = async (email, password, name) => {
    try {
        const response = await auth.createUser({
            email: email,
            password: password,
            displayName: name
        });
        return response;
    } catch (error) {
        logger.error("Error creating new user:", error);
    }
};

const revokeToken = async (uid) => {
    try {
        await auth.revokeRefreshTokens(uid);
        return;
    } catch (err) {
        logger.error(err);
    }
};
module.exports = {
    createUser,
    login,
    revokeToken
};