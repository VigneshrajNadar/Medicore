
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5001/api';

async function testBooking() {
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';

    try {
        // 0. Create User
        console.log('0. Creating User:', email);
        const createRes = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email,
                password,
                phone: '1234567890'
            })
        });
        const createData = await createRes.json();
        console.log('Create User Status:', createRes.status, createData);

        // 1. Login
        console.log('1. Logging in...');
        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) {
            console.error('Login failed:', loginData);
            return;
        }

        console.log('Login successful. User ID:', loginData.user.id);
        const token = loginData.token;
        const userId = loginData.user.id;

        // 2. Book Appointment
        console.log('2. Booking Appointment...');
        const appointmentPayload = {
            user_id: userId,
            doctor_id: 1,
            appointment_date: '2026-02-01',
            appointment_time: '14:00',
            consultation_type: 'in-person',
            symptoms: 'Test symptoms',
            notes: 'Debug script test'
        };

        const bookRes = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointmentPayload)
        });

        const bookData = await bookRes.json();
        console.log('Booking Response Status:', bookRes.status);
        console.log('Booking Response Body:', bookData);

    } catch (error) {
        console.error('Test script error:', error);
    }
}

testBooking();
