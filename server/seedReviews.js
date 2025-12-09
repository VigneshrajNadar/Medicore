const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'apollo.db');
const db = new sqlite3.Database(dbFile);

// Sample doctor reviews data
const testReviews = [
  {
    user_id: 1,
    doctor_id: 1,
    appointment_id: 1,
    rating: 5,
    review_text: 'Dr. Kumar is an excellent cardiologist. He explained everything clearly and was very patient with my questions. The treatment was effective and I feel much better now.'
  },
  {
    user_id: 1,
    doctor_id: 2,
    appointment_id: 2,
    rating: 4,
    review_text: 'Good consultation with Dr. Sharma. She was professional and knowledgeable. The waiting time was a bit long but the quality of care was worth it.'
  },
  {
    user_id: 2,
    doctor_id: 3,
    appointment_id: 3,
    rating: 5,
    review_text: 'Outstanding experience! Dr. Patel is very thorough and caring. The video consultation worked perfectly and I got all my concerns addressed.'
  },
  {
    user_id: 3,
    doctor_id: 4,
    appointment_id: 4,
    rating: 3,
    review_text: 'Average experience. The doctor was knowledgeable but seemed rushed. The consultation was shorter than expected.'
  },
  {
    user_id: 1,
    doctor_id: 5,
    rating: 4,
    review_text: 'Dr. Reddy is very experienced and professional. The diagnosis was accurate and the treatment plan worked well. Would recommend.'
  },
  {
    user_id: 2,
    doctor_id: 1,
    rating: 5,
    review_text: 'Second visit with Dr. Kumar and again excellent care. Follow-up was comprehensive and the staff is very helpful.'
  },
  {
    user_id: 3,
    doctor_id: 2,
    rating: 4,
    review_text: 'Dr. Sharma has great bedside manner. She takes time to listen and explain things properly. Very satisfied with the treatment.'
  },
  {
    user_id: 1,
    doctor_id: 3,
    rating: 5,
    review_text: 'Amazing doctor! Dr. Patel goes above and beyond for his patients. Very thorough and caring. Highly recommend!'
  }
];

// Function to seed doctor reviews
const seedReviews = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing reviews
      db.run('DELETE FROM doctor_reviews', (err) => {
        if (err) {
          console.error('Error clearing reviews:', err);
          return reject(err);
        }
        console.log('Cleared existing doctor reviews');

        // Insert reviews
        const insertStmt = db.prepare(`
          INSERT INTO doctor_reviews (user_id, doctor_id, appointment_id, rating, review_text)
          VALUES (?, ?, ?, ?, ?)
        `);

        let inserted = 0;
        let errors = 0;

        testReviews.forEach((review, index) => {
          insertStmt.run([
            review.user_id,
            review.doctor_id,
            review.appointment_id,
            review.rating,
            review.review_text
          ], (err) => {
            if (err) {
              console.error(`Error inserting review ${index + 1}:`, err);
              errors++;
            } else {
              inserted++;
              console.log(`Inserted review ${index + 1} for doctor ${review.doctor_id}`);
            }

            // Check if all reviews have been processed
            if (inserted + errors === testReviews.length) {
              insertStmt.finalize();
              console.log(`Successfully seeded ${inserted} doctor reviews`);
              if (errors > 0) {
                console.log(`Failed to insert ${errors} reviews`);
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
seedReviews().then(() => {
  console.log('Doctor reviews seeding completed!');
  
  // Show summary
  db.get('SELECT COUNT(*) as count FROM doctor_reviews', (err, row) => {
    if (!err) {
      console.log(`Total doctor reviews in database: ${row.count}`);
    }
    
    // Show average rating per doctor
    db.all('SELECT doctor_id, AVG(rating) as avg_rating, COUNT(*) as review_count FROM doctor_reviews GROUP BY doctor_id', (err, rows) => {
      if (!err && rows.length > 0) {
        console.log('\nDoctor rating summary:');
        rows.forEach(row => {
          console.log(`  Doctor ${row.doctor_id}: ${row.avg_rating.toFixed(1)} stars (${row.review_count} reviews)`);
        });
      }
      
      db.close(() => {
        console.log('Database connection closed');
        process.exit(0);
      });
    });
  });
}).catch(err => {
  console.error('Error seeding doctor reviews:', err);
  db.close(() => {
    process.exit(1);
  });
});
