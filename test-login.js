require('dotenv').config();
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5001/api';

async function testLogin() {
    try {
        console.log('Testing login with demo users...\n');

        // Test users
        const testUsers = [
            { email: 'john@example.com', password: 'password123', name: 'John Doe' },
            { email: 'admin@medicore.com', password: 'admin123', name: 'Admin User' },
            { email: 'vigneshrajnadar@gmail.com', password: 'password123', name: 'Vigneshraj Nadar' }
        ];

        for (const testUser of testUsers) {
            console.log(`Testing: ${testUser.name} (${testUser.email})`);

            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: testUser.email,
                    password: testUser.password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Login successful!`);
                console.log(`   Token: ${data.token ? 'Received' : 'Missing'}`);
                console.log(`   User ID: ${data.user.id}`);
                console.log(`   Role: ${data.user.role}\n`);
            } else {
                const error = await response.json();
                console.log(`❌ Login failed: ${error.error}\n`);
            }
        }

        console.log('Login tests completed!');
    } catch (error) {
        console.error('Test error:', error.message);
    }
}

testLogin();
