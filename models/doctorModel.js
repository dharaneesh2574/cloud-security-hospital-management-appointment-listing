const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    dept_name: String,
    ph_no: String,
    speciality: String,
    reg_no: String,
    appointments: [
        {
            patientId: String,
            appointmentDate: String,
            appointmentTime: String
        }
    ]
});

module.exports = mongoose.model('Doctor', doctorSchema);
