// Seed demo data for ApolloClone SQLite DB
const db = require('./db-fixed');

async function seedDatabase() {
  try {
    // Initialize database
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        // Enable foreign key constraints
        db.run('PRAGMA foreign_keys = ON');
        
        // Clear existing data (disable foreign keys temporarily)
        db.run('PRAGMA foreign_keys = OFF');
        
        db.run('DELETE FROM order_items', (err) => {
          if (err) return reject(err);
          
          db.run('DELETE FROM orders', (err) => {
            if (err) return reject(err);
            
            db.run('DELETE FROM users', (err) => {
              if (err) return reject(err);
              
              db.run('DELETE FROM doctors', (err) => {
                if (err) return reject(err);
                
                // Re-enable foreign keys
                db.run('PRAGMA foreign_keys = ON');
                resolve();
              });
            });
          });
        });
      });
    });

    // Insert sample user
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, phone, password, address, city, state, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        ['Vignesh Raj', 'vignesh@example.com', '+91-9876543210', 'password123', '123 Apollo Street', 'Chennai', 'Tamil Nadu', '600001'],
        (err) => {
          if (err) return reject(err);
          console.log('Added sample user');
          resolve();
        }
      );
    });

    // Insert sample orders
    const orders = [
      {
        user_id: 1,
        total_amount: 200,
        status: 'delivered',
        payment_method: 'Credit Card',
        shipping_address: '123 Apollo Street, Chennai, TN'
      },
      {
        user_id: 1,
        total_amount: 90,
        status: 'shipped',
        payment_method: 'Credit Card',
        shipping_address: '123 Apollo Street, Chennai, TN'
      }
    ];

    for (const order of orders) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address) VALUES (?, ?, ?, ?, ?)',
          [
            order.user_id, order.total_amount, order.status, order.payment_method, order.shipping_address
          ],
          function(err) {
            if (err) return reject(err);
            console.log(`Added order with ID ${this.lastID}`);
            
            // Add order items
            const items = order.user_id === 1 && order.total_amount === 200 ? 
              [
                { product_name: 'Paracetamol 500mg', quantity: 2, price: 40 },
                { product_name: 'Vitamin C Tablets', quantity: 1, price: 120 }
              ] : 
              [
                { product_name: 'Cough Syrup', quantity: 1, price: 90 }
              ];
            
            let itemsAdded = 0;
            items.forEach(item => {
              db.run(
                'INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)',
                [this.lastID, item.product_name, item.quantity, item.price],
                (err) => {
                  if (err) return reject(err);
                  itemsAdded++;
                  if (itemsAdded === items.length) {
                    resolve();
                  }
                }
              );
            });
          }
        );
      });
    }

    // Insert sample doctors
    const sampleDoctors = [
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@apollo.com',
        phone: '+91-9876543210',
        specialization: 'Cardiology',
        qualification: 'MBBS, MD Cardiology',
        experience_years: 15,
        hospital_name: 'Apollo Main Hospital',
        hospital_address: '21 Greams Lane, Off Greams Road, Chennai - 600006, Tamil Nadu',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600006',
        latitude: 13.0827,
        longitude: 80.2707,
        consultation_fee: 2500,
        consultation_duration: 30,
        available_days: 'Monday, Tuesday, Wednesday, Thursday, Friday',
        available_time_slots: '09:00-17:00',
        languages: 'English, Hindi, Tamil',
        about: 'Expert Interventional Cardiologist with 15 years of experience in cardiology. Specializes in advanced treatments and patient care.',
        education: 'MBBS - Madras Medical College, MD Cardiology - AIIMS Delhi, Fellowship in Interventional Cardiology',
        awards: 'Excellence Award 2020, Best Doctor Recognition 2019',
        publications: '25 research papers published in international journals',
        profile_image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
        rating: 4.8,
        total_reviews: 150,
        is_verified: 1,
        is_active: 1
      },
      {
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@fortis.com',
        phone: '+91-9876543211',
        specialization: 'Neurology',
        qualification: 'MBBS, MD Neurology',
        experience_years: 12,
        hospital_name: 'Fortis Hospital',
        hospital_address: 'Sector 62, Phase 8, Sahibzada Ajit Singh Nagar, Punjab 160062',
        city: 'Chandigarh',
        state: 'Punjab',
        pincode: '160062',
        latitude: 30.7333,
        longitude: 76.7794,
        consultation_fee: 2000,
        consultation_duration: 30,
        available_days: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
        available_time_slots: '10:00-18:00',
        languages: 'English, Hindi, Punjabi',
        about: 'Expert Neurologist with 12 years of experience in neurology. Specializes in advanced treatments and patient care.',
        education: 'MBBS - PGIMER Chandigarh, MD Neurology - AIIMS Delhi',
        awards: 'Excellence Award 2021, Best Doctor Recognition 2020',
        publications: '18 research papers published in international journals',
        profile_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        rating: 4.7,
        total_reviews: 120,
        is_verified: 1,
        is_active: 1
      }
    ];

    for (const doctor of sampleDoctors) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO doctors (
            name, email, phone, specialization, qualification, experience_years,
            hospital_name, hospital_address, city, state, pincode, latitude, longitude,
            consultation_fee, consultation_duration, available_days, available_time_slots,
            languages, about, education, awards, publications, profile_image,
            rating, total_reviews, is_verified, is_active
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            doctor.name, doctor.email, doctor.phone, doctor.specialization, doctor.qualification,
            doctor.experience_years, doctor.hospital_name, doctor.hospital_address, doctor.city,
            doctor.state, doctor.pincode, doctor.latitude, doctor.longitude, doctor.consultation_fee,
            doctor.consultation_duration, doctor.available_days, doctor.available_time_slots,
            doctor.languages, doctor.about, doctor.education, doctor.awards, doctor.publications,
            doctor.profile_image, doctor.rating, doctor.total_reviews, doctor.is_verified, doctor.is_active
          ],
          (err) => {
            if (err) return reject(err);
            console.log(`Added doctor: ${doctor.name}`);
            resolve();
          }
        );
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
