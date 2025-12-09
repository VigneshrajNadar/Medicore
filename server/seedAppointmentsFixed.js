const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'apollo.db');
const db = new sqlite3.Database(dbFile);

// Helper function to format date to SQLite date string
function formatDate(date) {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Helper function to format time
function formatTime(date) {
  return date.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format
}

// Sample test data matching the database schema
const now = new Date();
const testAppointments = [
  {
    user_id: 1,
    doctor_id: 1,
    appointment_date: formatDate(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)), // 3 days from now
    appointment_time: '10:00',
    appointment_status: 'scheduled',
    consultation_type: 'in-person',
    symptoms: 'Regular checkup',
    notes: 'Patient needs routine health examination',
    total_amount: 1500.00,
    payment_status: 'pending'
  },
  {
    user_id: 1,
    doctor_id: 2,
    appointment_date: formatDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
    appointment_time: '14:30',
    appointment_status: 'completed',
    consultation_type: 'in-person',
    symptoms: 'Follow-up consultation',
    notes: 'Patient recovering well',
    total_amount: 2000.00,
    payment_status: 'paid'
  },
  {
    user_id: 2,
    doctor_id: 3,
    appointment_date: formatDate(new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000)), // tomorrow
    appointment_time: '09:00',
    appointment_status: 'scheduled',
    consultation_type: 'video',
    symptoms: 'Headache and dizziness',
    notes: 'Patient reports frequent headaches',
    total_amount: 1800.00,
    payment_status: 'pending'
  },
  {
    user_id: 3,
    doctor_id: 4,
    appointment_date: formatDate(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)), // 5 days ago
    appointment_time: '11:00',
    appointment_status: 'cancelled',
    consultation_type: 'in-person',
    symptoms: 'Joint pain',
    notes: 'Patient cancelled due to emergency',
    total_amount: 1200.00,
    payment_status: 'refunded'
  },
  {
    user_id: 1,
    doctor_id: 5,
    appointment_date: formatDate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)), // next week
    appointment_time: '15:30',
    appointment_status: 'scheduled',
    consultation_type: 'in-person',
    symptoms: 'Chest pain investigation',
    notes: 'Pre-operative consultation',
    total_amount: 2500.00,
    payment_status: 'pending'
  }
];

// Function to seed appointments
const seedAppointments = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing test appointments
      db.run('DELETE FROM appointments', (err) => {
        if (err) {
          console.error('Error clearing appointments:', err);
          return reject(err);
        }
        console.log('Cleared existing appointments');

        // Insert test appointments
        const insertStmt = db.prepare(`
          INSERT INTO appointments (
            user_id, doctor_id, appointment_date, appointment_time, 
            appointment_status, consultation_type, symptoms, notes, 
            total_amount, payment_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        let inserted = 0;
        let errors = 0;

        testAppointments.forEach((appointment, index) => {
          insertStmt.run([
            appointment.user_id,
            appointment.doctor_id,
            appointment.appointment_date,
            appointment.appointment_time,
            appointment.appointment_status,
            appointment.consultation_type,
            appointment.symptoms,
            appointment.notes,
            appointment.total_amount,
            appointment.payment_status
          ], (err) => {
            if (err) {
              console.error(`Error inserting appointment ${index + 1}:`, err);
              errors++;
            } else {
              inserted++;
              console.log(`Inserted appointment ${index + 1}`);
            }

            // Check if all appointments have been processed
            if (inserted + errors === testAppointments.length) {
              insertStmt.finalize();
              console.log(`Successfully seeded ${inserted} appointments`);
              if (errors > 0) {
                console.log(`Failed to insert ${errors} appointments`);
              }
              resolve();
            }
          });
        });
      });
    });
  });
};

// Run the seeding
seedAppointments().then(() => {
  console.log('Appointment seeding completed!');
  
  // Show summary
  db.get('SELECT COUNT(*) as count FROM appointments', (err, row) => {
    if (!err) {
      console.log(`Total appointments in database: ${row.count}`);
    }
    
    db.close(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  });
}).catch(err => {
  console.error('Error seeding appointments:', err);
  db.close(() => {
    process.exit(1);
  });
});
