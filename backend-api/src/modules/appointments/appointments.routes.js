const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Appointment = require('./appointment.model');

// @route    GET api/appointments
// @desc     Get all user appointments
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id }).sort({ date: -1 });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/appointments
// @desc     Create an appointment
// @access   Private
router.post('/', auth, async (req, res) => {
    const { providerName, providerType, date, time, reason, location, notes } = req.body;

    try {
        const newAppointment = new Appointment({
            user: req.user.id,
            providerName,
            providerType,
            date,
            time,
            reason,
            location,
            notes
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/appointments/:id
// @desc     Update appointment
// @access   Private
router.put('/:id', auth, async (req, res) => {
    const { status, date, time, notes } = req.body;

    const appointmentFields = {};
    if (status) appointmentFields.status = status;
    if (date) appointmentFields.date = date;
    if (time) appointmentFields.time = time;
    if (notes) appointmentFields.notes = notes;

    try {
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

        // Make sure user owns appointment
        if (appointment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: appointmentFields },
            { new: true }
        );

        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/appointments/:id
// @desc     Delete appointment
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

        // Make sure user owns appointment
        if (appointment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Appointment.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Appointment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
