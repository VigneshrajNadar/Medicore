
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'apollo.db');
const db = new sqlite3.Database(dbPath);

console.log('Inspecting DB at:', dbPath);

db.serialize(() => {
    console.log("\n--- USERS ---");
    db.all("SELECT id, name, email, password FROM users", (err, rows) => {
        if (err) console.error(err);
        else console.table(rows);
    });
});

db.close();
