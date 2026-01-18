require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database');
const User = require('./models/User');

const cleanupUsers = async () => {
    try {
        await connectDB();

        console.log('\n=== CLEANING UP USERS ===\n');

        // Delete all users except john@example.com
        const result = await User.deleteMany({
            email: { $ne: 'john@example.com' }
        });

        console.log(`✅ Deleted ${result.deletedCount} users`);
        console.log('✅ Kept: john@example.com\n');

        // Verify remaining users
        const remainingUsers = await User.find().select('-password');
        console.log('=== REMAINING USERS ===\n');
        remainingUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Role: ${user.role || 'user'}\n`);
        });

        await mongoose.disconnect();
        console.log('✅ Database cleanup completed\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error cleaning up database:', error.message);
        process.exit(1);
    }
};

cleanupUsers();
