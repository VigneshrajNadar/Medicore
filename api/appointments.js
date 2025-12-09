// Vercel Serverless Function for Appointments API
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join('/tmp', 'apollo.db');
let db;

function getDb() {
    if (!db) {
        db = new sqlite3.Database(dbPath);
    }
    return db;
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const database = getDb();

    if (req.method === 'POST') {
        const {
            user_id,
            doctor_id,
            appointment_date,
            appointment_time,
            consultation_type,
            symptoms,
            notes
        } = req.body;

        const query = `
      INSERT INTO appointments (
        user_id, doctor_id, appointment_date, appointment_time,
        consultation_type, symptoms, notes, appointment_status, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
    `;

        database.run(
            query,
            [user_id, doctor_id, appointment_date, appointment_time, consultation_type, symptoms, notes],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({
                    id: this.lastID,
                    message: 'Appointment created successfully'
                });
            }
        );
    } else if (req.method === 'GET') {
        const { userId } = req.query;

        if (userId) {
            const query = `
        SELECT a.*, d.name as doctor_name, d.specialization, d.hospital_name
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.user_id = ?
        ORDER BY a.appointment_date DESC, a.appointment_time DESC
      `;

            database.all(query, [userId], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json(rows);
            });
        } else {
            res.status(400).json({ error: 'userId parameter required' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
