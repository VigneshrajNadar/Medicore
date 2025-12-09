const db = require('./db-fixed');

const users = [
  {
    name: 'Vignesh Raj',
    email: 'vignesh@example.com',
    phone: '+91 98765 43210',
    password: 'password123',
    address: 'Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    date_of_birth: '1995-05-15',
    gender: 'Male',
    blood_group: 'O+',
    emergency_contact: '+91 98765 43211',
    emergency_contact_relation: 'Father'
  },
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43212',
    password: 'password123',
    address: 'Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    date_of_birth: '1992-08-20',
    gender: 'Female',
    blood_group: 'A+',
    emergency_contact: '+91 98765 43213',
    emergency_contact_relation: 'Husband'
  },
  {
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 98765 43214',
    password: 'password123',
    address: 'Delhi, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    date_of_birth: '1990-12-10',
    gender: 'Male',
    blood_group: 'B+',
    emergency_contact: '+91 98765 43215',
    emergency_contact_relation: 'Wife'
  },
  {
    name: 'Anjali Patel',
    email: 'anjali@example.com',
    phone: '+91 98765 43216',
    password: 'password123',
    address: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380001',
    date_of_birth: '1988-03-25',
    gender: 'Female',
    blood_group: 'AB+',
    emergency_contact: '+91 98765 43217',
    emergency_contact_relation: 'Brother'
  },
  {
    name: 'Suresh Reddy',
    email: 'suresh@example.com',
    phone: '+91 98765 43218',
    password: 'password123',
    address: 'Hyderabad, Telangana',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    date_of_birth: '1985-07-08',
    gender: 'Male',
    blood_group: 'O-',
    emergency_contact: '+91 98765 43219',
    emergency_contact_relation: 'Sister'
  }
];

const seedUsers = async () => {
  try {
    console.log('Starting to seed users...');
    
    for (const user of users) {
      const stmt = db.prepare(`
        INSERT INTO users (
          name, email, phone, password, address, city, state, pincode, 
          date_of_birth, gender, blood_group, emergency_contact, emergency_contact_relation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        user.name,
        user.email,
        user.phone,
        user.password,
        user.address,
        user.city,
        user.state,
        user.pincode,
        user.date_of_birth,
        user.gender,
        user.blood_group,
        user.emergency_contact,
        user.emergency_contact_relation
      ]);
      
      stmt.finalize();
    }
    
    console.log('Successfully seeded users!');
    
    // Get the first user ID for testing
    db.get('SELECT id FROM users LIMIT 1', (err, row) => {
      if (err) {
        console.error('Error getting user ID:', err);
      } else {
        console.log('First user ID:', row.id);
        console.log('You can use this ID for testing appointments');
      }
    });
    
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Run the seeding
seedUsers();
