const express = require('express');
const router = express.Router();
const { getAllAppointments, getAppointmentsByUHID } = require('../controllers/appointmentController');

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Fetch all appointments from the database, including patient, doctor, and department details.
 *     responses:
 *       200:
 *         description: A list of all appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllAppointments);

/**
 * @swagger
 * /appointments/{uhid}:
 *   get:
 *     summary: Get appointments by UHID
 *     description: Fetch all appointments for a specific patient using their UHID.
 *     parameters:
 *       - in: path
 *         name: uhid
 *         required: true
 *         schema:
 *           type: string
 *         description: The UHID of the patient.
 *     responses:
 *       200:
 *         description: A list of appointments for the given UHID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal Server Error
 */
router.get('/:uhid', getAppointmentsByUHID);

module.exports = router;
