require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
    try {
        console.log('Testing MongoDB connection...');
        console.log('Connection URI:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB connection successful!');
        console.log('Database:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);

        await mongoose.disconnect();
        console.log('✅ Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('\n💡 Tip: Check your cluster address in the MongoDB URI');
            console.error('It should look like: cluster0.xxxxx.mongodb.net');
        }
        if (error.message.includes('authentication failed')) {
            console.error('\n💡 Tip: Check your username and password');
        }
        if (error.message.includes('IP')) {
            console.error('\n💡 Tip: Make sure your IP is whitelisted in MongoDB Atlas');
            console.error('Or add 0.0.0.0/0 to allow all IPs (for testing)');
        }
        process.exit(1);
    }
};

testConnection();
