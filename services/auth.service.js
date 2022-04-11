const { auth } = require("../firebase")
const axios = require("axios")

const login = async (email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

    try{
        const response = await axios.post(url,{
            "email": email,
            "password": password,
            "returnSecureToken": true
        });
        return response.data;
    }catch(err){
        console.log("login error", err);
    }
};

const createUser = async (email, password, name) => {
    try{
        const response = await auth.createUser({
            email: email,
            password: password,
            displayName: name
        });
        return userRecord;
    }catch(error){
        console.log('Error creating new user:', error);
    }
};

const revokeToken = async (uid) => {
    try{
        const response = await auth.revokeRefreshTokens(uid);
        console.log("logout", uid);
        return; 
    }catch(err){
        console.log(err);
    }
}
module.exports = {
    createUser,
    login,
    revokeToken
}