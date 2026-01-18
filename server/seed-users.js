require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./database');
const User = require('./models/User');

// Demo users
const demoUsers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+919999999999',
        role: 'user'
    },
    {
        name: 'Admin User',
        email: 'admin@medicore.com',
        password: 'admin123',
        phone: '+918888888888',
        role: 'admin'
    },
    {
        name: 'Vigneshraj Nadar',
        email: 'vigneshrajnadar@gmail.com',
        password: 'password123',
        phone: '+917777777777',
        role: 'user'
    }
];

async function seedUsers() {
    try {
        await connectDB();

        console.log('[Seed] Clearing existing users...');
        await User.deleteMany({});

        console.log('[Seed] Creating users with hashed passwords...');

        for (const userData of demoUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            await User.create({
                ...userData,
                password: hashedPassword
            });
            console.log(`[Seed] Created user: ${userData.email}`);
        }

        console.log(`[Seed] Successfully seeded ${demoUsers.length} users!`);
        process.exit(0);
    } catch (error) {
        console.error('[Seed] Error:', error);
        process.exit(1);
    }
}

seedUsers();
