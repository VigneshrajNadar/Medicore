require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database');
const Doctor = require('./models/Doctor');

// Sample doctors data
const sampleDoctors = [
    {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@medicore.com',
        phone: '+919876543210',
        specialization: 'Cardiology',
        qualification: 'MBBS, MD, DM (Cardiology)',
        experience_years: 15,
        hospital_name: 'Apollo Hospitals',
        hospital_address: '123, MG Road, Mumbai, Maharashtra',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        latitude: 19.0760,
        longitude: 72.8777,
        consultation_fee: 1500,
        available_days: 'Monday, Tuesday, Wednesday, Thursday, Friday',
        available_time_slots: '09:00-13:00,16:00-19:00',
        languages: 'English, Hindi, Marathi',
        about: 'Experienced Cardiology specialist with 15 years of practice. Committed to providing the highest quality healthcare services.',
        is_verified: true,
        rating: 4.8,
        total_reviews: 120,
        profile_image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop'
    },
    {
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@medicore.com',
        phone: '+919876543211',
        specialization: 'Dermatology',
        qualification: 'MBBS, MD (Dermatology)',
        experience_years: 10,
        hospital_name: 'Fortis Healthcare',
        hospital_address: '456, Park Street, Delhi, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        latitude: 28.7041,
        longitude: 77.1025,
        consultation_fee: 1200,
        available_days: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
        available_time_slots: '10:00-14:00,17:00-20:00',
        languages: 'English, Hindi',
        about: 'Dermatologist with expertise in skin care and cosmetic procedures.',
        is_verified: true,
        rating: 4.6,
        total_reviews: 95,
        profile_image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop'
    },
    {
        name: 'Dr. Amit Patel',
        email: 'amit.patel@medicore.com',
        phone: '+919876543212',
        specialization: 'Orthopedics',
        qualification: 'MBBS, MS (Orthopedics)',
        experience_years: 12,
        hospital_name: 'Max Healthcare',
        hospital_address: '789, Commercial Street, Bangalore, Karnataka',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        latitude: 12.9716,
        longitude: 77.5946,
        consultation_fee: 1300,
        available_days: 'Monday, Wednesday, Friday, Saturday',
        available_time_slots: '09:00-13:00,15:00-18:00',
        languages: 'English, Hindi, Kannada',
        about: 'Orthopedic surgeon specializing in joint replacements and sports injuries.',
        is_verified: true,
        rating: 4.7,
        total_reviews: 85
    }
];

async function seedDoctors() {
    try {
        await connectDB();

        console.log('[Seed] Clearing existing doctors...');
        await Doctor.deleteMany({});

        console.log('[Seed] Inserting sample doctors...');
        await Doctor.insertMany(sampleDoctors);

        console.log(`[Seed] Successfully seeded ${sampleDoctors.length} doctors!`);
        process.exit(0);
    } catch (error) {
        console.error('[Seed] Error:', error);
        process.exit(1);
    }
}

seedDoctors();
