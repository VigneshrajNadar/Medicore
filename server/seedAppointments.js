const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'apollo.db');
const db = new sqlite3.Database(dbFile);

// Helper function to format date to SQLite datetime string
function formatDate(date) {
  return new Date(date).toISOString().replace('T', ' ').replace('Z', '');
}

// Sample test data with proper data types and structure
const now = new Date();
const testAppointments = [
  {
    id: 'appt_1',
    doctorId: 'doc_1',
    userId: 'user_123',
    slot: formatDate(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)), // 3 days from now
    status: 'Booked',
    date: formatDate(now),
    notes: 'Regular checkup',
    doctorName: 'Dr. Ramesh Kumar',
    specialization: 'Cardiology',
    hospital: 'Apollo Hospital',
    doctorPhoto: 'https://img.icons8.com/color/96/000000/doctor-male.png',
    charges: 1500,
    hospitalAddress: '21 Greams Lane, Off Greams Road, Chennai - 600006, Tamil Nadu'
  },
  {
    id: 'appt_2',
    doctorId: 'doc_2',
    userId: 'user_123',
    slot: formatDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
    status: 'Completed',
    date: formatDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
    notes: 'Follow-up appointment',
    doctorName: 'Dr. Priya Sharma',
    specialization: 'Neurology',
    hospital: 'Fortis Hospital',
    doctorPhoto: 'https://img.icons8.com/color/96/000000/doctor-female.png',
    charges: 2000,
    hospitalAddress: 'Sector 62, Phase 8, Sahibzada Ajit Singh Nagar, Punjab 160062'
  },
  {
    id: 'appt_3',
    doctorId: 'doc_3',
    userId: 'user_123',
    slot: formatDate(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)), // 5 days ago
    status: 'Cancelled',
    date: formatDate(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
    notes: 'Rescheduled to next week',
    doctorName: 'Dr. Amit Patel',
    specialization: 'Orthopedics',
    hospital: 'Manipal Hospital',
    doctorPhoto: 'https://img.icons8.com/color/96/000000/doctor-male-2.png',
    charges: 1800,
    hospitalAddress: '98, HAL Airport Road, Kodihalli, Bangalore - 560017'
  }
];

// Function to seed appointments
const seedAppointments = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing test data
      db.run(`DELETE FROM appointments WHERE id LIKE 'appt_%'`, (err) => {
        if (err) {
          console.error('Error clearing test appointments:', err);
          return reject(err);
        }
        
        console.log('Cleared existing test appointments');
        
        // Prepare the insert statement
        const stmt = db.prepare(`
          INSERT INTO appointments (
            id, doctorId, userId, slot, status, date, notes,
            doctorName, specialization, hospital, doctorPhoto, charges, hospitalAddress
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        let completed = 0;
        const total = testAppointments.length;
        
        const checkComplete = () => {
          completed++;
          if (completed === total) {
            stmt.finalize();
            console.log(`Successfully inserted ${completed} appointments`);
            resolve();
          }
        };
        
        testAppointments.forEach(appt => {
          const values = [
            appt.id,
            appt.doctorId,
            appt.userId,
            appt.slot,
            appt.status,
            appt.date,
            appt.notes || null,
            appt.doctorName,
            appt.specialization,
            appt.hospital,
            appt.doctorPhoto,
            appt.charges,
            appt.hospitalAddress
          ];
          
          stmt.run(values, (err) => {
            if (err) {
              console.error('Error inserting appointment:', err);
              console.error('Values that caused error:', values);
              reject(err);
              return;
            }
            console.log(`Added appointment for user ${appt.userId} with doctor ${appt.doctorId}`);
            checkComplete();
          });
        });
      });
    });
  });
};

// Run the seed function
seedAppointments();

// Don't close the connection here - let the script end naturally
// The connection will be automatically closed when the script exits
