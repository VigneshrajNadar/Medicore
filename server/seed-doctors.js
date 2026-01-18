require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database');
const Doctor = require('./models/Doctor');

const specializations = [
    'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'General Medicine',
    'Neurology', 'Oncology', 'Gynecology', 'Ophthalmology', 'ENT',
    'Psychiatry', 'Dentistry', 'Urology', 'Gastroenterology', 'Pulmonology'
];

const cities = [
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Delhi', state: 'Delhi' },
    { name: 'Bangalore', state: 'Karnataka' },
    { name: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Hyderabad', state: 'Telangana' },
    { name: 'Kolkata', state: 'West Bengal' },
    { name: 'Pune', state: 'Maharashtra' },
    { name: 'Ahmedabad', state: 'Gujarat' },
    { name: 'Jaipur', state: 'Rajasthan' },
    { name: 'Lucknow', state: 'Uttar Pradesh' }
];

const hospitals = [
    'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals',
    'Care Hospitals', 'Narayana Health', 'Medanta', 'Global Hospitals',
    'Aster DM Healthcare', 'Columbia Asia'
];

const languages = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Gujarati'];

const firstNames = ['Rajesh', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Anjali', 'Deepak', 'Meera', 'Rahul', 'Sneha', 'Sanjay', 'Kavita', 'Arjun', 'Pooja', 'Vijay', 'Anita', 'Rohan', 'Swati', 'Manish', 'Ritu'];
const lastNames = ['Kumar', 'Sharma', 'Patel', 'Singh', 'Gupta', 'Verma', 'Reddy', 'Iyer', 'Nair', 'Desai', 'Joshi', 'Chopra', 'Malhotra', 'Bansal', 'Shah', 'Mehta', 'Kulkarni', 'Naidu', 'Rao', 'Das'];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomLanguages() {
    const count = Math.floor(Math.random() * 3) + 1;
    const selected = [];
    for (let i = 0; i < count; i++) {
        const lang = getRandomElement(languages);
        if (!selected.includes(lang)) selected.push(lang);
    }
    return selected.join(', ');
}

function generateDoctors(count) {
    const doctors = [];
    for (let i = 0; i < count; i++) {
        const firstName = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);
        const name = `Dr. ${firstName} ${lastName}`;
        const cityObj = getRandomElement(cities);
        const spec = getRandomElement(specializations);
        const hospital = getRandomElement(hospitals);

        doctors.push({
            name,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@medicore.com`,
            phone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            specialization: spec,
            qualification: 'MBBS, MD',
            experience_years: Math.floor(Math.random() * 25) + 5,
            hospital_name: hospital,
            hospital_address: `${Math.floor(Math.random() * 999)}, MG Road, ${cityObj.name}`,
            city: cityObj.name,
            state: cityObj.state,
            pincode: `${Math.floor(100000 + Math.random() * 900000)}`,
            consultation_fee: Math.floor(500 + Math.random() * 2000),
            available_days: 'Monday, Tuesday, Wednesday, Thursday, Friday',
            available_time_slots: '09:00-13:00,16:00-19:00',
            languages: getRandomLanguages(),
            about: `Experienced ${spec} specialist with a focus on patient-centric care.`,
            is_verified: true,
            rating: parseFloat((4 + Math.random()).toFixed(1)),
            total_reviews: Math.floor(Math.random() * 200) + 20,
            profile_image: `https://i.pravatar.cc/150?u=${firstName}${lastName}${i}`
        });
    }
    return doctors;
}

async function seedDoctors() {
    try {
        await connectDB();

        console.log('[Seed] Clearing existing doctors...');
        await Doctor.deleteMany({});

        const doctorsCount = 550;
        console.log(`[Seed] Generating ${doctorsCount} doctors...`);
        const doctors = generateDoctors(doctorsCount);

        console.log('[Seed] Inserting doctors...');
        await Doctor.insertMany(doctors);

        console.log(`[Seed] Successfully seeded ${doctors.length} doctors!`);
        process.exit(0);
    } catch (error) {
        console.error('[Seed] Error:', error);
        process.exit(1);
    }
}

seedDoctors();
