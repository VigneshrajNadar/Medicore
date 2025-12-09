const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'apollo_clone.db');
const db = new sqlite3.Database(dbPath);
const doctors = require('./doctorData');

// Enable foreign key constraints
db.get("PRAGMA foreign_keys = ON");

// Sample user data
const users = [
  {
    userId: 'user_123',
    name: 'Vignesh Raj',
    email: 'vignesh@example.com',
    address: '123 Apollo Street, Chennai, TN',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    userId: 'user_124',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    address: '456 MG Road, Bangalore, KA',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    userId: 'user_125',
    name: 'Amit Patel',
    email: 'amit@example.com',
    address: '789 Andheri East, Mumbai, MH',
    photo: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
];

// Sample orders data
const orders = [
  {
    orderId: 'APO' + Math.floor(100000 + Math.random() * 900000),
    userId: 'user_123',
    date: '2025-07-24',
    status: 'Delivered',
    items: JSON.stringify([
      { name: 'Paracetamol 500mg', qty: 2, price: 40 },
      { name: 'Vitamin C Tablets', qty: 1, price: 120 }
    ]),
    total: 200,
    address: '123 Apollo Street, Chennai, TN',
    payment: 'Credit Card'
  },
  {
    orderId: 'APO' + Math.floor(100000 + Math.random() * 900000),
    userId: 'user_123',
    date: '2025-07-25',
    status: 'Shipped',
    items: JSON.stringify([
      { name: 'Cough Syrup', qty: 1, price: 90 }
    ]),
    total: 90,
    address: '123 Apollo Street, Chennai, TN',
    payment: 'UPI'
  },
  {
    orderId: 'APO' + Math.floor(100000 + Math.random() * 900000),
    userId: 'user_124',
    date: '2025-07-26',
    status: 'Processing',
    items: JSON.stringify([
      { name: 'Antihistamine', qty: 1, price: 150 },
      { name: 'Multivitamin', qty: 2, price: 200 }
    ]),
    total: 350,
    address: '456 MG Road, Bangalore, KA',
    payment: 'Net Banking'
  }
];

// Sample appointments data
const appointments = [
  {
    userId: 'user_123',
    doctorId: doctors.find(d => d.category === 'Cardiology').id,
    date: '2025-09-15',
    time: '10:30',
    status: 'Scheduled',
    notes: 'Regular heart checkup',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'user_123',
    doctorId: doctors.find(d => d.category === 'Dermatology').id,
    date: '2025-09-20',
    time: '12:00',
    status: 'Scheduled',
    notes: 'Skin consultation',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'user_124',
    doctorId: doctors.find(d => d.category === 'Neurology').id,
    date: '2025-09-18',
    time: '14:30',
    status: 'Confirmed',
    notes: 'Headache consultation',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'user_125',
    doctorId: doctors.find(d => d.category === 'Orthopedics').id,
    date: '2025-09-22',
    time: '11:00',
    status: 'Completed',
    notes: 'Knee pain follow-up',
    createdAt: new Date('2025-08-15').toISOString()
  }
];

// Function to clear existing data
function clearTables() {
  return new Promise((resolve, reject) => {
    const tables = ['appointments', 'orders', 'doctors', 'users'];
    let completed = 0;
    
    if (tables.length === 0) return resolve();
    
    tables.forEach(table => {
      db.run(`DELETE FROM ${table}`, (err) => {
        if (err) {
          console.error(`Error clearing table ${table}:`, err);
          return reject(err);
        }
        console.log(`Cleared table: ${table}`);
        completed++;
        if (completed === tables.length) resolve();
      });
    });
  });
}

// Function to reset autoincrement counters
function resetAutoincrement() {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM sqlite_sequence", (err) => {
      if (err) {
        console.error("Error resetting autoincrement counters:", err);
        return reject(err);
      }
      console.log("Reset autoincrement counters");
      resolve();
    });
  });
}

// Function to insert data
function insertData(table, data) {
  return new Promise((resolve, reject) => {
    if (!data || data.length === 0) {
      console.log(`No data to insert into ${table}`);
      return resolve();
    }

    const columns = Object.keys(data[0]).join(', ');
    const placeholders = Object.keys(data[0]).map(() => '?').join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      const stmt = db.prepare(query);
      let error = null;
      
      data.forEach(item => {
        if (error) return; // Skip if we already have an error
        
        stmt.run(Object.values(item), function(err) {
          if (err && !error) {
            error = err;
            console.error(`Error inserting into ${table}:`, err);
            db.run('ROLLBACK');
            return reject(err);
          }
        });
      });
      
      stmt.finalize(err => {
        if (err && !error) {
          error = err;
          console.error(`Error finalizing statement for ${table}:`, err);
          db.run('ROLLBACK');
          return reject(err);
        }
        
        if (!error) {
          db.run('COMMIT', (err) => {
            if (err) {
              console.error(`Error committing transaction for ${table}:`, err);
              return reject(err);
            }
            console.log(`Successfully inserted ${data.length} records into ${table}`);
            resolve();
          });
        }
      });
    });
  });
}

// Main seeding function
async function seed() {
  console.log('Starting database seeding...');
  
  try {
    // Clear existing data first
    console.log('Clearing existing data...');
    await clearTables();
    await resetAutoincrement();
    
    // Insert users
    await insertData('users', users);
    
    // Insert doctors
    await insertData('doctors', doctors);
    
    // Insert orders
    await insertData('orders', orders);
    
    // Insert appointments
    await insertData('appointments', appointments);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

// Run the seed function
seed();
