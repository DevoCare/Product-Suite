const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    providerName: {
        type: String,
        required: true
    },
    providerSpecialty: String,
    providerAvatar: String,
    locationId: String,
    locationName: String,
    locationAddress: String,
    date: {
        type: Date,
        required: true
    },
    startTime: String,
    endTime: String,
    appointmentType: String,
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'checked-in', 'completed', 'cancelled', 'no-show'],
        default: 'scheduled'
    },
    confirmationRequired: { type: Boolean, default: false },
    canCancel: { type: Boolean, default: true },
    canReschedule: { type: Boolean, default: true },
    telehealth: { type: Boolean, default: false },
    telehealthUrl: String,
    preVisitInstructions: String,
    formsRequired: [String],
    reason: String,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
