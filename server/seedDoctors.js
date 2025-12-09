const db = require('./db-fixed');
const path = require('path');

// Doctor specializations
const specializations = [
  'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'General Medicine',
  'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry',
  'Pulmonology', 'Radiology', 'Surgery', 'Urology', 'Gynecology',
  'Ophthalmology', 'ENT', 'Dental', 'Physiotherapy', 'Ayurveda',
  'Homeopathy', 'Naturopathy', 'Sports Medicine', 'Emergency Medicine', 'Critical Care'
];

// Hospital names
const hospitals = [
  'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals',
  'KIMS Hospitals', 'Narayana Health', 'Medanta', 'Artemis Hospital',
  'BLK Super Speciality Hospital', 'Saket City Hospital', 'Indraprastha Apollo',
  'Kokilaben Dhirubhai Ambani Hospital', 'Tata Memorial Hospital', 'AIIMS Delhi',
  'Safdarjung Hospital', 'Ram Manohar Lohia Hospital', 'Lady Hardinge Medical College',
  'Guru Teg Bahadur Hospital', 'Lok Nayak Hospital', 'Deen Dayal Upadhyay Hospital'
];

// Cities and states
const cities = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Delhi', state: 'Delhi' },
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Kanpur', state: 'Uttar Pradesh' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Indore', state: 'Madhya Pradesh' },
  { city: 'Thane', state: 'Maharashtra' },
  { city: 'Bhopal', state: 'Madhya Pradesh' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { city: 'Pimpri-Chinchwad', state: 'Maharashtra' },
  { city: 'Patna', state: 'Bihar' },
  { city: 'Vadodara', state: 'Gujarat' },
  { city: 'Ghaziabad', state: 'Uttar Pradesh' }
];

// Qualifications
const qualifications = [
  'MBBS, MD', 'MBBS, MS', 'MBBS, DNB', 'MBBS, FRCS', 'MBBS, MRCP',
  'MBBS, FACS', 'MBBS, PhD', 'MBBS, DM', 'MBBS, MCh', 'MBBS, Fellowship'
];

// Languages
const languages = [
  'English, Hindi', 'English, Hindi, Marathi', 'English, Hindi, Tamil',
  'English, Hindi, Telugu', 'English, Hindi, Bengali', 'English, Hindi, Gujarati',
  'English, Hindi, Kannada', 'English, Hindi, Malayalam', 'English, Hindi, Punjabi',
  'English, Hindi, Urdu'
];

// Available days
const availableDays = [
  'Monday, Tuesday, Wednesday, Thursday, Friday',
  'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
  'Tuesday, Wednesday, Thursday, Friday, Saturday',
  'Monday, Wednesday, Friday, Saturday',
  'Tuesday, Thursday, Saturday'
];

// Time slots
const timeSlots = [
  '09:00-17:00', '10:00-18:00', '08:00-16:00', '11:00-19:00',
  '09:00-13:00, 16:00-20:00', '10:00-14:00, 17:00-21:00'
];

// Generate random doctor data
function generateDoctorData() {
  const specialization = specializations[Math.floor(Math.random() * specializations.length)];
  const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];
  const cityData = cities[Math.floor(Math.random() * cities.length)];
  const qualification = qualifications[Math.floor(Math.random() * qualifications.length)];
  const language = languages[Math.floor(Math.random() * languages.length)];
  const availableDay = availableDays[Math.floor(Math.random() * availableDays.length)];
  const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
  
  // Generate realistic names
  const firstNames = ['Dr. Rajesh', 'Dr. Priya', 'Dr. Amit', 'Dr. Sunita', 'Dr. Kumar', 'Dr. Meera', 'Dr. Sanjay', 'Dr. Anjali', 'Dr. Vikram', 'Dr. Neha', 'Dr. Arjun', 'Dr. Kavya', 'Dr. Rohan', 'Dr. Zara', 'Dr. Aditya', 'Dr. Ishita', 'Dr. Karan', 'Dr. Diya', 'Dr. Vivaan', 'Dr. Myra'];
  const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Verma', 'Gupta', 'Malhotra', 'Kapoor', 'Joshi', 'Reddy', 'Chopra', 'Mehta', 'Bhatt', 'Desai', 'Shah', 'Iyer', 'Menon', 'Nair', 'Pillai', 'Kaur'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  // Generate email
  const email = `${firstName.toLowerCase().replace('dr. ', '').replace(' ', '')}${lastName.toLowerCase()}@apollo.com`;
  
  // Generate phone
  const phone = `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  
  // Generate experience (1-30 years)
  const experienceYears = Math.floor(Math.random() * 30) + 1;
  
  // Generate consultation fee based on specialization and experience
  let baseFee = 500;
  if (specialization.includes('Cardiology') || specialization.includes('Neurology') || specialization.includes('Oncology')) {
    baseFee = 1500;
  } else if (specialization.includes('Surgery') || specialization.includes('Orthopedics')) {
    baseFee = 1200;
  } else if (specialization.includes('Dermatology') || specialization.includes('Ophthalmology')) {
    baseFee = 800;
  }
  
  const consultationFee = baseFee + (experienceYears * 50) + Math.floor(Math.random() * 200);
  
  // Generate address
  const streetNames = ['MG Road', 'Park Street', 'Marine Drive', 'Connaught Place', 'Commercial Street', 'Brigade Road', 'Linking Road', 'Hill Road', 'Carter Road', 'Juhu Beach Road'];
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
  const streetNumber = Math.floor(Math.random() * 200) + 1;
  const hospitalAddress = `${streetNumber}, ${streetName}, ${cityData.city}, ${cityData.state}`;
  
  // Generate coordinates (approximate for India)
  const latitude = 8.4 + (Math.random() * 28.6); // India latitude range
  const longitude = 68.1 + (Math.random() * 97.4); // India longitude range
  
  // Generate rating
  const rating = (3.5 + Math.random() * 1.5).toFixed(1);
  const totalReviews = Math.floor(Math.random() * 500) + 10;
  
  return {
    name,
    email,
    phone,
    specialization,
    qualification,
    experience_years: experienceYears,
    hospital_name: hospital,
    hospital_address: hospitalAddress,
    city: cityData.city,
    state: cityData.state,
    pincode: Math.floor(Math.random() * 900000) + 100000,
    latitude,
    longitude,
    consultation_fee: consultationFee,
    consultation_duration: 30,
    available_days: availableDay,
    available_time_slots: timeSlot,
    languages: language,
    about: `Experienced ${specialization} specialist with ${experienceYears} years of practice. Committed to providing the highest quality healthcare services.`,
    education: `${qualification} from prestigious medical institutions with specialized training in ${specialization}.`,
    awards: experienceYears > 10 ? 'Best Doctor Award, Medical Excellence Award' : 'Young Achiever Award',
    publications: experienceYears > 5 ? `${Math.floor(Math.random() * 20) + 5} research papers published in international journals` : 'Contributing to medical research',
    profile_image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
    rating: parseFloat(rating),
    total_reviews: totalReviews,
    is_verified: Math.random() > 0.2,
    is_active: Math.random() > 0.1
  };
}

// Seed doctors
function seedDoctors() {
  console.log('Starting to seed doctors...');
  
  const doctors = [];
  for (let i = 0; i < 500; i++) {
    doctors.push(generateDoctorData());
  }
  
  const stmt = db.prepare(`
    INSERT INTO doctors (
      name, email, phone, specialization, qualification, experience_years,
      hospital_name, hospital_address, city, state, pincode, latitude, longitude,
      consultation_fee, consultation_duration, available_days, available_time_slots,
      languages, about, education, awards, publications, profile_image,
      rating, total_reviews, is_verified, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  doctors.forEach((doctor, index) => {
    stmt.run([
      doctor.name,
      doctor.email,
      doctor.phone,
      doctor.specialization,
      doctor.qualification,
      doctor.experience_years,
      doctor.hospital_name,
      doctor.hospital_address,
      doctor.city,
      doctor.state,
      doctor.pincode,
      doctor.latitude,
      doctor.longitude,
      doctor.consultation_fee,
      doctor.consultation_duration,
      doctor.available_days,
      doctor.available_time_slots,
      doctor.languages,
      doctor.about,
      doctor.education,
      doctor.awards,
      doctor.publications,
      doctor.profile_image,
      doctor.rating,
      doctor.total_reviews,
      doctor.is_verified ? 1 : 0,
      doctor.is_active ? 1 : 0
    ], (err) => {
      if (err) {
        console.error(`Error inserting doctor ${index + 1}:`, err);
      } else {
        console.log(`Inserted doctor ${index + 1}: ${doctor.name}`);
      }
    });
  });
  
  stmt.finalize((err) => {
    if (err) {
      console.error('Error finalizing statement:', err);
    } else {
      console.log('Successfully seeded 500 doctors!');
      db.close();
    }
  });
}

// Run the seeding
seedDoctors();
