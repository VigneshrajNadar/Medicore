const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../server/apollo_clone.db');

// Create database connection
const db = new sqlite3.Database(dbPath);

// Doctor data generator
function generateDoctorData() {
  const categories = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Dermatology',
    'Pediatrics', 'Gynecology', 'Urology', 'Gastroenterology', 'Endocrinology',
    'Psychiatry', 'Ophthalmology', 'ENT', 'Pulmonology', 'Nephrology',
    'Hematology', 'Rheumatology', 'Emergency Medicine', 'Family Medicine', 'Internal Medicine'
  ];

  const specializations = {
    'Cardiology': ['Interventional Cardiologist', 'Cardiac Surgeon', 'Pediatric Cardiologist', 'Cardiac Electrophysiologist', 'Preventive Cardiologist'],
    'Neurology': ['Neurologist', 'Neurosurgeon', 'Pediatric Neurologist', 'Stroke Specialist', 'Movement Disorder Specialist'],
    'Orthopedics': ['Joint Replacement Surgeon', 'Spine Surgeon', 'Sports Medicine', 'Pediatric Orthopedist', 'Trauma Specialist'],
    'Oncology': ['Medical Oncologist', 'Surgical Oncologist', 'Radiation Oncologist', 'Pediatric Oncologist', 'Hematologic Oncologist'],
    'Dermatology': ['Cosmetic Dermatologist', 'Surgical Dermatologist', 'Pediatric Dermatologist', 'Laser Specialist', 'Aesthetic Dermatologist']
  };

  const hospitals = [
    {
      name: 'Apollo Main Hospital',
      location: '21 Greams Lane, Off Greams Road, Chennai - 600006, Tamil Nadu',
      directions: 'Located near Anna Salai, opposite to Express Avenue Mall. Metro station: Thousand Lights (5 min walk)',
      phone: '+91-44-2829-0200',
      city: 'Chennai'
    },
    {
      name: 'Fortis Hospital',
      location: 'Sector 62, Phase 8, Sahibzada Ajit Singh Nagar, Punjab 160062',
      directions: 'Located on Chandigarh-Mohali highway, near Phase 8 market. Bus routes: 1, 2, 3, 4',
      phone: '+91-172-469-2222',
      city: 'Chandigarh'
    },
    {
      name: 'Manipal Hospital',
      location: '98, HAL Airport Road, Kodihalli, Bangalore - 560017',
      directions: 'Located on HAL Airport Road, near Indiranagar. Metro: Indiranagar station (10 min walk)',
      phone: '+91-80-2502-4444',
      city: 'Bangalore'
    },
    {
      name: 'Max Super Speciality Hospital',
      location: '1, 2, Press Enclave Marg, Saket, New Delhi - 110017',
      directions: 'Located in Saket, near Select Citywalk Mall. Metro: Saket station (5 min walk)',
      phone: '+91-11-4055-4055',
      city: 'New Delhi'
    },
    {
      name: 'Medanta - The Medicity',
      location: 'CH Baktawar Singh Rd, Medicity, Islampur Colony, Sector 38, Gurugram, Haryana 122001',
      directions: 'Located on Delhi-Gurugram highway, near Cyber City. Metro: Huda City Centre (15 min drive)',
      phone: '+91-124-414-1414',
      city: 'Gurugram'
    },
    {
      name: 'Kokilaben Dhirubhai Ambani Hospital',
      location: 'Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai - 400058',
      directions: 'Located in Andheri West, near Four Bungalows. Metro: Andheri station (10 min drive)',
      phone: '+91-22-3099-9999',
      city: 'Mumbai'
    },
    {
      name: 'Artemis Hospital',
      location: 'Sector 51, Gurugram, Haryana 122001',
      directions: 'Located in Sector 51, near Cyber City. Metro: Huda City Centre (20 min drive)',
      phone: '+91-124-676-7000',
      city: 'Gurugram'
    },
    {
      name: 'Narayana Health',
      location: '258/A, Bommasandra Industrial Area, Anekal Taluk, Bangalore - 560099',
      directions: 'Located in Bommasandra, near Electronic City. Bus routes: 365, 366, 367',
      phone: '+91-80-2222-2222',
      city: 'Bangalore'
    },
    {
      name: 'Global Hospital',
      location: '35, Dr. E Borges Road, Parel, Mumbai - 400012',
      directions: 'Located in Parel, near Lower Parel station. Local train: Parel station (5 min walk)',
      phone: '+91-22-6760-6760',
      city: 'Mumbai'
    },
    {
      name: 'Aster Hospital',
      location: 'Al Maktoum Street, Al Qusais, Dubai, UAE',
      directions: 'Located in Al Qusais, near Al Qusais Metro Station. Metro: Al Qusais (3 min walk)',
      phone: '+971-4-440-0500',
      city: 'Dubai'
    }
  ];

  const maleNames = [
    'Dr. Rajesh Kumar', 'Dr. Amit Patel', 'Dr. Sanjay Verma', 'Dr. Rakesh Malhotra', 'Dr. Anil Kumar',
    'Dr. Vikram Singh', 'Dr. Arjun Kapoor', 'Dr. Rohit Malhotra', 'Dr. Deepak Sharma', 'Dr. Manoj Gupta',
    'Dr. Suresh Reddy', 'Dr. Prakash Iyer', 'Dr. Harish Mehta', 'Dr. Naresh Joshi', 'Dr. Mahesh Desai'
  ];

  const femaleNames = [
    'Dr. Priya Sharma', 'Dr. Neha Gupta', 'Dr. Anjali Mehta', 'Dr. Meena Desai', 'Dr. Ananya Reddy',
    'Dr. Nandini Iyer', 'Dr. Sunita Reddy', 'Dr. Kavita Patel', 'Dr. Rekha Singh', 'Dr. Smita Kumar',
    'Dr. Radha Sharma', 'Dr. Lakshmi Devi', 'Dr. Geeta Patel', 'Dr. Uma Reddy', 'Dr. Shobha Iyer'
  ];

  const photos = [
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face'
  ];

  const hospitalPhotos = [
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop'
  ];

  const doctors = [];
  let doctorId = 1;

  categories.forEach((category, categoryIndex) => {
    const categorySpecializations = specializations[category] || [
      `${category} Specialist`, `Senior ${category} Consultant`, `Head of ${category}`, 
      `Pediatric ${category}`, `${category} Surgeon`
    ];

    categorySpecializations.forEach((specialization, specIndex) => {
      for (let i = 0; i < 5; i++) { // 5 doctors per specialization
        const isMale = Math.random() > 0.5;
        const names = isMale ? maleNames : femaleNames;
        const name = names[Math.floor(Math.random() * names.length)];
        const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];
        const photo = photos[Math.floor(Math.random() * photos.length)];
        const hospitalPhoto = hospitalPhotos[Math.floor(Math.random() * hospitalPhotos.length)];
        
        const experience = Math.floor(Math.random() * 20) + 5; // 5-25 years
        const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5-5.0
        const charges = Math.floor(Math.random() * 2000) + 1000; // 1000-3000

        const doctor = {
          id: `doc_${category.toLowerCase()}_${doctorId}`,
          name: name,
          category: category,
          specialization: specialization,
          experience: experience,
          rating: parseFloat(rating),
          photo: photo,
          about: `Expert ${specialization} with ${experience} years of experience in ${category.toLowerCase()}. Specializes in advanced treatments and patient care.`,
          availableSlots: JSON.stringify(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']),
          hospital: hospital.name,
          hospitalLocation: hospital.location,
          hospitalDirections: hospital.directions,
          hospitalPhone: hospital.phone,
          hospitalPhoto: hospitalPhoto,
          city: hospital.city,
          consultant: Math.random() > 0.7 ? 'Senior Consultant' : 'Consultant',
          languages: JSON.stringify(['English', 'Hindi']),
          charges: charges,
          facilities: JSON.stringify(['24/7 Emergency Care', 'ICU', 'Modern Equipment', 'Patient Care']),
          education: JSON.stringify([
            'MBBS - Top Medical College',
            'MD - Specialization',
            'Additional Training'
          ]),
          awards: JSON.stringify([
            'Excellence Award',
            'Best Doctor Recognition'
          ]),
          experience_history: JSON.stringify([
            'Current Position - Present',
            'Previous Experience'
          ]),
          services: JSON.stringify([
            'Primary Consultation',
            'Specialized Treatment',
            'Follow-up Care'
          ])
        };

        doctors.push(doctor);
        doctorId++;
      }
    });
  });

  return doctors.slice(0, 150); // Ensure exactly 150 doctors
}

// Function to create the doctors table if it doesn't exist
function createDoctorsTable(callback) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS doctors (
      id TEXT PRIMARY KEY,
      name TEXT,
      category TEXT,
      specialization TEXT,
      experience INTEGER,
      rating REAL,
      photo TEXT,
      about TEXT,
      availableSlots TEXT,
      hospital TEXT,
      hospitalLocation TEXT,
      hospitalDirections TEXT,
      hospitalPhone TEXT,
      hospitalPhoto TEXT,
      city TEXT,
      consultant TEXT,
      languages TEXT,
      charges REAL DEFAULT 0,
      facilities TEXT,
      education TEXT,
      awards TEXT,
      experience_history TEXT,
      services TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('Error creating doctors table:', err);
      return callback(err);
    }
    console.log('Doctors table created/verified');
    callback(null);
  });
}

// Function to clear existing doctors
function clearDoctors(callback) {
  db.run('DELETE FROM doctors', (err) => {
    if (err) {
      console.error('Error clearing doctors table:', err);
      return callback(err);
    }
    console.log('Cleared existing doctors');
    callback(null);
  });
}

// Function to insert doctors
function insertDoctors(doctors, callback) {
  const stmt = db.prepare(`
    INSERT INTO doctors (
      id, name, category, specialization, experience, rating, photo, about,
      availableSlots, hospital, hospitalLocation, hospitalDirections, hospitalPhone,
      hospitalPhoto, city, consultant, languages, charges, facilities, education,
      awards, experience_history, services
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  let completed = 0;
  let hasError = null;
  
  doctors.forEach(doctor => {
    stmt.run(
      doctor.id,
      doctor.name,
      doctor.category,
      doctor.specialization,
      doctor.experience,
      doctor.rating,
      doctor.photo,
      doctor.about,
      doctor.availableSlots,
      doctor.hospital,
      doctor.hospitalLocation,
      doctor.hospitalDirections,
      doctor.hospitalPhone,
      doctor.hospitalPhoto,
      doctor.city,
      doctor.consultant,
      doctor.languages,
      doctor.charges,
      doctor.facilities,
      doctor.education,
      doctor.awards,
      doctor.experience_history,
      doctor.services,
      (err) => {
        if (err) {
          console.error('Error inserting doctor:', err);
          hasError = err;
        } else {
          console.log(`Added doctor: ${doctor.name} (${doctor.hospital})`);
        }
        
        completed++;
        if (completed === doctors.length) {
          stmt.finalize();
          callback(hasError);
        }
      }
    );
  });
}

// Main function to run the seed process
function seedDatabase() {
  console.log('Starting comprehensive doctor database seeding...');
  
  const doctors = generateDoctorData();
  console.log(`Generated ${doctors.length} doctors with comprehensive information`);
  
  // Run in series to ensure proper sequencing
  createDoctorsTable((err) => {
    if (err) return handleError(err);
    
    clearDoctors((err) => {
      if (err) return handleError(err);
      
      insertDoctors(doctors, (err) => {
        if (err) return handleError(err);
        
        console.log('\nDatabase seeding completed successfully!');
        console.log(`Added ${doctors.length} doctors with comprehensive details.`);
        console.log('\nCategories included:');
        const categories = [...new Set(doctors.map(d => d.category))];
        categories.forEach(cat => {
          const count = doctors.filter(d => d.category === cat).length;
          console.log(`- ${cat}: ${count} doctors`);
        });
        db.close();
      });
    });
  });
}

// Error handler
function handleError(err) {
  console.error('Error during database seeding:', err);
  db.close();
  process.exit(1);
}

// Run the seed process
seedDatabase();
