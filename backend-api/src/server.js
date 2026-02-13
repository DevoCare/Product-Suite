require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define Modular Routes
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/appointments', require('./modules/appointments/appointments.routes'));
app.use('/api/records', require('./modules/records/records.routes'));

// Base API Health Check
app.get('/api', (req, res) => {
    res.json({
        status: 'success',
        message: 'DevoCare Modular API is operational',
        endpoints: ['/auth', '/appointments', '/records']
    });
});

app.get('/', (req, res) => {
    res.send('DevoCare Patient API is running (Modular)');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
