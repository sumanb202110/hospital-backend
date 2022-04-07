const {db} = require("../db");

const Doctor = db.collection('doctor');

module.exports = {
    Doctor
};