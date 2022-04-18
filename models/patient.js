const {db} = require("../firebase");

const Patient = db.collection("patient");

module.exports = {
    Patient
};