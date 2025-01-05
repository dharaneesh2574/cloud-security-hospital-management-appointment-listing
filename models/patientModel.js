const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    UHID: String,
    age: Number,
    totalAppointments: Number,
    lastVisit: String
});

module.exports = mongoose.model('Patient', patientSchema);
