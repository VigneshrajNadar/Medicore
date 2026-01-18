const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'apollo.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking tables in:', dbPath);

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('\nTables found:');
        console.table(tables);
    }
    db.close();
});
