const express = require('express');
const { getAllAppointments, getAppointmentByUHID } = require('../controllers/appointmentController');

const router = express.Router();

// Route to fetch all appointments
router.get('/', getAllAppointments);

// Route to fetch appointments by UHID
router.get('/:uhid', getAppointmentByUHID);

module.exports = router;
