const { db, initDb } = require('./db-fixed');
const fs = require('fs');
const path = require('path');

// Delete the existing database file if it exists
const dbPath = path.join(__dirname, 'apollo_clone.db');
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Removed existing database file');
}

// Run initialization and seeding
initDb().then(() => {
  console.log('Database initialized successfully');
  
  // Import and run the seed script
  require('./seed');
  
  // Close the database connection
  db.close(() => {
    console.log('Database seeding completed. You can now start the server.');
    process.exit(0);
  });
}).catch(err => {
  console.error('Error initializing database:', err);
  process.exit(1);
});
