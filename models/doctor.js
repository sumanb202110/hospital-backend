const {db} = require("../firebase");

const Doctor = db.collection('doctor');

module.exports = {
    Doctor
};