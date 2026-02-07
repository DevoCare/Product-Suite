const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['medication', 'lab', 'allergy', 'immunization'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    details: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: String,
    provider: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Record', RecordSchema);
