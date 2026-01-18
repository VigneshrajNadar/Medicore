require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database');
const User = require('./models/User');
const Doctor = require('./models/Doctor');

const checkDatabase = async () => {
    try {
        await connectDB();

        console.log('\n=== USERS IN DATABASE ===\n');
        const users = await User.find().select('-password');

        if (users.length === 0) {
            console.log('❌ No users found in database');
            console.log('\n💡 Run "npm run seed:users" to add demo users');
        } else {
            console.log(`✅ Found ${users.length} users:\n`);
            users.forEach((user, index) => {
                console.log(`${index + 1}. ${user.name}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Role: ${user.role || 'user'}`);
                console.log(`   Created: ${user.created_at}\n`);
            });
        }

        console.log('\n=== DOCTORS IN DATABASE ===\n');
        const doctors = await Doctor.find();

        if (doctors.length === 0) {
            console.log('❌ No doctors found in database');
            console.log('\n💡 Run "npm run seed:doctors" to add demo doctors');
        } else {
            console.log(`✅ Found ${doctors.length} doctors:\n`);
            doctors.forEach((doctor, index) => {
                console.log(`${index + 1}. ${doctor.name} - ${doctor.specialization}`);
                console.log(`   Hospital: ${doctor.hospital_name}`);
                console.log(`   Fee: ₹${doctor.consultation_fee}\n`);
            });
        }

        await mongoose.disconnect();
        console.log('✅ Database check completed\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error checking database:', error.message);
        process.exit(1);
    }
};

checkDatabase();
