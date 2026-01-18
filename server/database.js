const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medicore';

        await mongoose.connect(mongoURI);

        console.log('[MongoDB] Connected successfully');
        console.log('[MongoDB] Database:', mongoose.connection.name);
    } catch (error) {
        console.error('[MongoDB] Connection error:', error.message);
        // In production, we might want to retry or exit
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('[MongoDB] Disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('[MongoDB] Error:', err);
});

module.exports = connectDB;
