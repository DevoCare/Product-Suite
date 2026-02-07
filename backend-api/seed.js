require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const Record = require('./models/Record');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Appointment.deleteMany({});
        await Record.deleteMany({});

        // Create Demo Patient
        const user = new User({
            email: 'patient@demo.com',
            password: 'demo123',
            firstName: 'John',
            lastName: 'Smith',
            phone: '(555) 123-4567',
            dateOfBirth: new Date('1980-05-15'),
            mrn: 'MRN-12345',
            patientId: 'PAT-001',
            mfaEnabled: true
        });
        await user.save();
        console.log('Demo user created');

        // Create Appointments
        const appointments = [
            {
                user: user._id,
                providerName: 'Dr. Sarah Johnson',
                providerSpecialty: 'Internal Medicine',
                locationName: 'Main Clinic',
                locationAddress: '123 Medical Dr',
                date: new Date(Date.now() + 13 * 86400000),
                startTime: '10:00',
                endTime: '10:30',
                appointmentType: 'Annual Physical',
                status: 'confirmed'
            },
            {
                user: user._id,
                providerName: 'Dr. Michael Chen',
                providerSpecialty: 'Cardiology',
                locationName: 'Heart Center',
                locationAddress: '456 Cardiac Way',
                date: new Date(Date.now() + 30 * 86400000),
                startTime: '14:00',
                endTime: '14:45',
                appointmentType: 'Follow-up',
                status: 'scheduled',
                telehealth: true,
                telehealthUrl: 'https://telehealth.example.com/room/abc123'
            }
        ];
        await Appointment.insertMany(appointments);
        console.log('Appointments seeded');

        // Create Records
        const records = [
            {
                user: user._id,
                type: 'medication',
                name: 'Lisinopril',
                details: '10mg, Once daily',
                status: 'active',
                provider: 'Dr. Johnson'
            },
            {
                user: user._id,
                type: 'allergy',
                name: 'Penicillin',
                details: 'Hives, rash',
                status: 'active'
            },
            {
                user: user._id,
                type: 'lab',
                name: 'Comprehensive Metabolic Panel',
                date: new Date(),
                status: 'resulted'
            }
        ];
        await Record.insertMany(records);
        console.log('Health records seeded');

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
