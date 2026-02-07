const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Record = require('../models/Record');

// @route    GET api/records
// @desc     Get all user health records
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const records = await Record.find({ user: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/records
// @desc     Add a health record
// @access   Private
router.post('/', auth, async (req, res) => {
    const { type, name, details, date, status, provider } = req.body;

    try {
        const newRecord = new Record({
            user: req.user.id,
            type,
            name,
            details,
            date,
            status,
            provider
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
