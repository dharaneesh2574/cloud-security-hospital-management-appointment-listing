const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Department = require('../models/departmentModel');

// Fetch All Appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = [];
        const patients = await Patient.find();

        for (const patient of patients) {
            const doctorAppointments = await Doctor.aggregate([
                { $unwind: '$appointments' },
                { $match: { 'appointments.patientId': patient.UHID } },
                {
                    $lookup: {
                        from: 'departments',
                        localField: 'dept_name',
                        foreignField: 'dept_name',
                        as: 'departmentDetails'
                    }
                },
                { $unwind: '$departmentDetails' },
                {
                    $project: {
                        patientName: `${patient.firstName} ${patient.lastName}`,
                        age: patient.age,
                        UHID: patient.UHID,
                        appointmentDate: '$appointments.appointmentDate',
                        appointmentTime: '$appointments.appointmentTime',
                        doctorName: '$name',
                        department: '$departmentDetails.dept_name'
                    }
                }
            ]);
            appointments.push(...doctorAppointments);
        }
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Fetch Appointment by UHID
exports.getAppointmentByUHID = async (req, res) => {
    const uhid = req.params.uhid;
    try {
        const patient = await Patient.findOne({ UHID: uhid });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const appointments = await Doctor.aggregate([
            { $unwind: '$appointments' },
            { $match: { 'appointments.patientId': uhid } },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'dept_name',
                    foreignField: 'dept_name',
                    as: 'departmentDetails'
                }
            },
            { $unwind: '$departmentDetails' },
            {
                $project: {
                    patientName: `${patient.firstName} ${patient.lastName}`,
                    age: patient.age,
                    UHID: patient.UHID,
                    appointmentDate: '$appointments.appointmentDate',
                    appointmentTime: '$appointments.appointmentTime',
                    doctorName: '$name',
                    department: '$departmentDetails.dept_name'
                }
            }
        ]);
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
