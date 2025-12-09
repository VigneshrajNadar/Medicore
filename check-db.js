const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'apollo_clone.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
  
  // List all tables
  db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
    if (err) {
      console.error('Error getting tables:', err.message);
      return;
    }
    console.log('\nTables in database:');
    console.table(tables);
    
    // Check doctors table if it exists
    const hasDoctors = tables.some(t => t.name === 'doctors');
    if (hasDoctors) {
      console.log('\nChecking doctors table structure:');
      db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='doctors';", [], (err, row) => {
        if (err) {
          console.error('Error getting doctors schema:', err.message);
        } else if (row) {
          console.log('Doctors table schema:');
          console.log(row.sql);
          
          // Get first 5 doctors
          db.all("SELECT id, name, hospital, city FROM doctors LIMIT 5;", [], (err, rows) => {
            if (err) {
              console.error('Error querying doctors:', err.message);
            } else {
              console.log('\nFirst 5 doctors:');
              console.table(rows);
            }
            db.close();
          });
        } else {
          console.log('No doctors table found');
          db.close();
        }
      });
    } else {
      console.log('No doctors table found in the database');
      db.close();
    }
  });
});
