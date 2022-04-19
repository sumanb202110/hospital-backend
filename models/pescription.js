const {db} = require("../firebase");

const Pescription = db.collection("pescription");

module.exports = {
    Pescription
};