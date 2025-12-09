// Vercel Serverless Function for Users API
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const database = getDb();

    if (req.method === 'GET') {
        database.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    } else if (req.method === 'POST') {
        const {
            name, email, phone, password, address, city, state, pincode,
            date_of_birth, gender, blood_group, emergency_contact, emergency_contact_relation
        } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
      INSERT INTO users (
        name, email, phone, password, address, city, state, pincode,
        date_of_birth, gender, blood_group, emergency_contact, emergency_contact_relation
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        database.run(
            query,
            [name, email, phone, hashedPassword, address, city, state, pincode,
                date_of_birth, gender, blood_group, emergency_contact, emergency_contact_relation],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({
                    id: this.lastID,
                    message: 'User created successfully'
                });
            }
        );
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
