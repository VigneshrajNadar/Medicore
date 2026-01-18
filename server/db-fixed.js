const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Use /tmp for serverless (Vercel)
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const dbPath = isServerless
  ? '/tmp/apollo.db'
  : path.join(__dirname, 'apollo.db');

console.log('[DB] Using database at:', dbPath);

const db = new sqlite3.Database(dbPath);

// Initialize schema
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        address TEXT,
        city TEXT,
        state TEXT,
        pincode TEXT,
        date_of_birth TEXT,
        gender TEXT,
        blood_group TEXT,
        emergency_contact TEXT,
        emergency_contact_relation TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Doctors table
      db.run(`CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        specialization TEXT NOT NULL,
        qualification TEXT NOT NULL,
        experience_years INTEGER NOT NULL,
        hospital_name TEXT NOT NULL,
        hospital_address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        pincode TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        consultation_fee DECIMAL(10,2) NOT NULL,
        consultation_duration INTEGER DEFAULT 30,
        available_days TEXT NOT NULL,
        available_time_slots TEXT NOT NULL,
        languages TEXT,
        about TEXT,
        education TEXT,
        awards TEXT,
        publications TEXT,
        profile_image TEXT,
        rating DECIMAL(3,2) DEFAULT 0.0,
        total_reviews INTEGER DEFAULT 0,
        is_verified BOOLEAN DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Appointments table
      db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        appointment_status TEXT DEFAULT 'scheduled',
        consultation_type TEXT DEFAULT 'in-person',
        symptoms TEXT,
        notes TEXT,
        total_amount DECIMAL(10,2) NOT NULL,
        payment_status TEXT DEFAULT 'pending',
        payment_method TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (doctor_id) REFERENCES doctors (id)
      )`);

      // Doctor Reviews table
      db.run(`CREATE TABLE IF NOT EXISTS doctor_reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        appointment_id INTEGER,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT,
        review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_verified BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (doctor_id) REFERENCES doctors (id),
        FOREIGN KEY (appointment_id) REFERENCES appointments (id)
      )`);

      // Orders table
      db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status TEXT DEFAULT 'pending',
        payment_method TEXT,
        shipping_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`);

      // Order Items table
      db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders (id)
      )`, (err) => {
        if (err) {
          console.error('[DB] Error creating tables:', err);
          reject(err);
        } else {
          console.log('[DB] All tables created/verified successfully');
          resolve();
        }
      });
    });
  });
};

// Initialize on load
if (isServerless) {
  console.log('[DB] Serverless environment detected - initializing database on each invocation');
  initializeDatabase().then(() => {
    // Add sample doctors for testing in serverless
    db.get("SELECT COUNT(*) as count FROM doctors", (err, result) => {
      if (!err && result.count === 0) {
        console.log('[DB] No doctors found, seeding sample data...');
        const sampleDoctors = [
          {
            name: 'Dr. Rajesh Kumar',
            email: 'rajesh.kumar@apollo.com',
            phone: '+919876543210',
            specialization: 'Cardiology',
            qualification: 'MBBS, MD',
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
            available_time_slots: '09:00-17:00',
            languages: 'English, Hindi'
          },
          {
            name: 'Dr. Priya Sharma',
            email: 'priya.sharma@apollo.com',
            phone: '+919876543211',
            specialization: 'Dermatology',
            qualification: 'MBBS, MD',
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
            available_time_slots: '10:00-18:00',
            languages: 'English, Hindi'
          }
        ];

        sampleDoctors.forEach(doctor => {
          db.run(`INSERT INTO doctors (
            name, email, phone, specialization, qualification, experience_years,
            hospital_name, hospital_address, city, state, pincode, latitude, longitude,
            consultation_fee, available_days, available_time_slots, languages
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              doctor.name, doctor.email, doctor.phone, doctor.specialization,
              doctor.qualification, doctor.experience_years, doctor.hospital_name,
              doctor.hospital_address, doctor.city, doctor.state, doctor.pincode,
              doctor.latitude, doctor.longitude, doctor.consultation_fee,
              doctor.available_days, doctor.available_time_slots, doctor.languages
            ],
            (err) => {
              if (err) console.error('[DB] Error seeding doctor:', doctor.name, err);
              else console.log('[ DB] Seeded doctor:', doctor.name);
            });
        });
      }
    });
  }).catch(err => {
    console.error('[DB] Failed to initialize database:', err);
  });
}

module.exports = db;
module.exports.initializeDatabase = initializeDatabase;
