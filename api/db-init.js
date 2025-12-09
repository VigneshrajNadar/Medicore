// Database initialization for Vercel serverless
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join('/tmp', 'apollo.db');
const sourceDbPath = path.join(__dirname, '..', 'server', 'apollo.db');

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        // Check if database exists in /tmp
        if (!fs.existsSync(dbPath)) {
            // Copy database from source
            if (fs.existsSync(sourceDbPath)) {
                fs.copyFileSync(sourceDbPath, dbPath);
                console.log('Database copied to /tmp');
            } else {
                // Create new database if source doesn't exist
                const db = new sqlite3.Database(dbPath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Create tables
                        db.serialize(() => {
                            // Users table
                            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT,
                password TEXT,
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
                specialization TEXT NOT NULL,
                qualification TEXT,
                experience INTEGER,
                consultation_fee REAL,
                rating REAL DEFAULT 0,
                total_reviews INTEGER DEFAULT 0,
                hospital_name TEXT,
                hospital_address TEXT,
                city TEXT,
                state TEXT,
                available_days TEXT,
                available_time_slots TEXT,
                profile_image TEXT,
                is_active INTEGER DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
              )`);

                            // Appointments table
                            db.run(`CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                doctor_id INTEGER NOT NULL,
                appointment_date TEXT NOT NULL,
                appointment_time TEXT NOT NULL,
                consultation_type TEXT,
                symptoms TEXT,
                notes TEXT,
                appointment_status TEXT DEFAULT 'pending',
                total_amount REAL,
                payment_status TEXT DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (doctor_id) REFERENCES doctors(id)
              )`);

                            // Reviews table
                            db.run(`CREATE TABLE IF NOT EXISTS doctor_reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                doctor_id INTEGER NOT NULL,
                appointment_id INTEGER,
                rating INTEGER NOT NULL,
                review_text TEXT,
                review_date TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (doctor_id) REFERENCES doctors(id),
                FOREIGN KEY (appointment_id) REFERENCES appointments(id)
              )`);

                            // Orders table
                            db.run(`CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                total_amount REAL NOT NULL,
                status TEXT DEFAULT 'pending',
                payment_method TEXT,
                shipping_address TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
              )`, (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    console.log('Database tables created');
                                    db.close();
                                    resolve();
                                }
                            });
                        });
                    }
                });
            }
        } else {
            resolve();
        }
    });
}

module.exports = { initializeDatabase, dbPath };
