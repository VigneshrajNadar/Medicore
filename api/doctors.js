// Vercel Serverless Function for Doctors API
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database connection
const dbPath = path.join('/tmp', 'apollo.db');
let db;

function getDb() {
    if (!db) {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Database connection error:', err);
            }
        });
    }
    return db;
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
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
