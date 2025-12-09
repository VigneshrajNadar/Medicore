// Vercel Serverless Function for Doctors API with auto-seeding
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const sampleDoctors = require('./sampleDoctors');

// Database connection
const dbPath = path.join('/tmp', 'apollo.db');
let db;
let isSeeded = false;

function getDb() {
    if (!db) {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Database connection error:', err);
            } else {
                console.log('Connected to database');
                initializeDatabase();
            }
        });
    }
    return db;
}

function initializeDatabase() {
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
        if (err) {
            console.error('Error creating doctors table:', err);
        } else {
            console.log('Doctors table ready');
            seedDoctorsIfEmpty();
        }
    });
}

function seedDoctorsIfEmpty() {
    if (isSeeded) return;

    db.get('SELECT COUNT(*) as count FROM doctors', [], (err, row) => {
        if (err) {
            console.error('Error checking doctors count:', err);
            return;
        }

        if (row.count === 0) {
            console.log('Seeding doctors...');
            const stmt = db.prepare(`
        INSERT INTO doctors (
          name, specialization, qualification, experience,
          consultation_fee, rating, total_reviews, hospital_name,
          hospital_address, city, state, available_days,
          available_time_slots, profile_image, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

            sampleDoctors.forEach(doctor => {
                stmt.run([
                    doctor.name,
                    doctor.specialization,
                    doctor.qualification,
                    doctor.experience,
                    doctor.consultation_fee,
                    doctor.rating,
                    doctor.total_reviews,
                    doctor.hospital_name,
                    doctor.hospital_address,
                    doctor.city,
                    doctor.state,
                    doctor.available_days,
                    doctor.available_time_slots,
                    doctor.profile_image,
                    doctor.is_active
                ]);
            });

            stmt.finalize((err) => {
                if (err) {
                    console.error('Error seeding doctors:', err);
                } else {
                    console.log(`Seeded ${sampleDoctors.length} doctors successfully!`);
                    isSeeded = true;
                }
            });
        } else {
            console.log(`Database already has ${row.count} doctors`);
            isSeeded = true;
        }
    });
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const database = getDb();

    if (req.method === 'GET') {
        const { specialization, city, hospital, minRating, maxPrice, availableDay, search } = req.query;

        let query = 'SELECT * FROM doctors WHERE is_active = 1';
        const params = [];

        if (specialization) {
            query += ' AND specialization = ?';
            params.push(specialization);
        }

        if (city) {
            query += ' AND city = ?';
            params.push(city);
        }

        if (hospital) {
            query += ' AND hospital_name LIKE ?';
            params.push(`%${hospital}%`);
        }

        if (minRating) {
            query += ' AND rating >= ?';
            params.push(parseFloat(minRating));
        }

        if (maxPrice) {
            query += ' AND consultation_fee <= ?';
            params.push(parseFloat(maxPrice));
        }

        if (availableDay) {
            query += ' AND available_days LIKE ?';
            params.push(`%${availableDay}%`);
        }

        if (search) {
            query += ' AND (name LIKE ? OR specialization LIKE ? OR hospital_name LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        database.all(query, params, (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: err.message });
            }
            console.log(`Returning ${rows.length} doctors`);
            res.status(200).json(rows);
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
