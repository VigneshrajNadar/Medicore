
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'apollo.db');
const db = new sqlite3.Database(dbPath);

const userId = 6; // Based on previous inspection

db.all(`
    SELECT 
      a.*,
      d.name as doctor_name,
      d.specialization,
      d.hospital_name,
      d.consultation_fee
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    WHERE a.user_id = ?
`, [userId], (err, rows) => {
    if (err) console.error(err);
    else console.log(JSON.stringify(rows, null, 2));
});

db.close();
