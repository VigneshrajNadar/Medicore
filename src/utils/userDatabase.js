// User Database Management System
class UserDatabase {
  constructor() {
    this.users = new Map();
    this.currentUser = null;
    this.loadFromStorage();
  }

  // Load users from localStorage
  loadFromStorage() {
    try {
      const storedUsers = localStorage.getItem('apolloUsers');
      const currentUserId = localStorage.getItem('currentUserId');
      
      if (storedUsers) {
        const usersData = JSON.parse(storedUsers);
        this.users = new Map(Object.entries(usersData));
      }
      
      if (currentUserId && this.users.has(currentUserId)) {
        this.currentUser = this.users.get(currentUserId);
      }
    } catch (error) {
      console.error('Error loading user data from storage:', error);
    }
  }

  // Save users to localStorage
  saveToStorage() {
    try {
      const usersObject = Object.fromEntries(this.users);
      localStorage.setItem('apolloUsers', JSON.stringify(usersObject));
      if (this.currentUser) {
        localStorage.setItem('currentUserId', this.currentUser.id);
      }
    } catch (error) {
      console.error('Error saving user data to storage:', error);
    }
  }

  // Create a new user
  createUser(userData) {
    const userId = userData.id || this.generateUserId();
    const newUser = {
      id: userId,
      name: userData.name || 'User',
      email: userData.email || '',
      password: userData.password || 'demo123',
      phone: userData.phone || '',
      dateOfBirth: userData.dateOfBirth || '',
      gender: userData.gender || '',
      address: userData.address || '',
      emergencyContact: userData.emergencyContact || '',
      bloodGroup: userData.bloodGroup || '',
      allergies: userData.allergies || [],
      chronicConditions: userData.chronicConditions || [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      
      // Health Data
      healthHistory: {
        vitals: {
          heartRate: { value: 72, unit: 'bpm', status: 'normal', lastUpdated: new Date().toISOString() },
          bloodPressure: { value: '120/80', unit: 'mmHg', status: 'normal', lastUpdated: new Date().toISOString() },
          weight: { value: 70, unit: 'kg', status: 'normal', lastUpdated: new Date().toISOString() },
          temperature: { value: 98.6, unit: '°F', status: 'normal', lastUpdated: new Date().toISOString() },
          bloodSugar: { value: 95, unit: 'mg/dL', status: 'normal', lastUpdated: new Date().toISOString() }
        },
        appointments: [
          {
            id: 'APT001',
            doctor_name: 'Dr. Rajesh Kumar',
            doctorName: 'Dr. Rajesh Kumar',
            specialization: 'Cardiologist',
            appointment_date: '2024-01-15',
            appointment_time: '10:00 AM',
            appointment_status: 'Confirmed',
            total_amount: 1500,
            consultation_fee: 1500,
            payment_status: 'Paid',
            hospital_name: 'Apollo Hospital',
            consultation_type: 'In-person'
          },
          {
            id: 'APT002',
            doctor_name: 'Dr. Priya Sharma',
            doctorName: 'Dr. Priya Sharma',
            specialization: 'Dermatologist',
            appointment_date: '2024-01-20',
            appointment_time: '2:30 PM',
            appointment_status: 'Pending',
            total_amount: 800,
            consultation_fee: 800,
            payment_status: 'Pending',
            hospital_name: 'Max Healthcare',
            consultation_type: 'Video Call'
          },
          {
            id: 'APT003',
            doctor_name: 'Dr. Amit Patel',
            doctorName: 'Dr. Amit Patel',
            specialization: 'Orthopedic',
            appointment_date: '2024-01-10',
            appointment_time: '11:15 AM',
            appointment_status: 'Completed',
            total_amount: 1200,
            consultation_fee: 1200,
            payment_status: 'Paid',
            hospital_name: 'Fortis Hospital',
            consultation_type: 'In-person'
          }
        ],
        medications: [],
        labResults: [],
        vaccinations: []
      },

      // Order History
      orders: [],
      
      // Notifications
      notifications: [
        {
          id: 1,
          title: 'Welcome to MediCore!',
          message: 'Your account has been created successfully.',
          type: 'info',
          read: false,
          createdAt: new Date().toISOString()
        }
      ],

      // Preferences
      preferences: {
        notifications: {
          email: true,
          sms: false,
          push: true,
          medicationReminders: true,
          appointmentReminders: true
        },
        privacy: {
          shareHealthData: false,
          allowMarketing: false
        },
        language: 'en',
        theme: 'light'
      },

      // Cart
      cart: [],
      
      // Favorites
      favorites: {
        doctors: [],
        medicines: [],
        healthTools: []
      }
    };

    this.users.set(userId, newUser);
    this.saveToStorage();
    return newUser;
  }

  // Generate unique user ID
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Login user
  loginUser(email, password) {
    // Find user by email
    for (let [userId, user] of this.users) {
      if (user.email === email) {
        // Verify password
        if (user.password && user.password !== password) {
          return { success: false, message: 'Invalid password' };
        }
        this.currentUser = user;
        user.lastLogin = new Date().toISOString();
        this.saveToStorage();
        return { success: true, user };
      }
    }
    return { success: false, message: 'User not found' };
  }

  // Get user by email
  getUserByEmail(email) {
    for (let [userId, user] of this.users) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Update user data
  updateUser(userId, updateData) {
    if (this.users.has(userId)) {
      const user = this.users.get(userId);
      const updatedUser = { ...user, ...updateData };
      this.users.set(userId, updatedUser);
      
      if (this.currentUser && this.currentUser.id === userId) {
        this.currentUser = updatedUser;
      }
      
      this.saveToStorage();
      return updatedUser;
    }
    return null;
  }

  // Add health record
  addHealthRecord(userId, recordType, recordData) {
    const user = this.users.get(userId);
    if (!user) return false;

    const record = {
      id: Date.now(),
      ...recordData,
      createdAt: new Date().toISOString()
    };

    switch (recordType) {
      case 'appointment':
        user.healthHistory.appointments.push(record);
        break;
      case 'medication':
        user.healthHistory.medications.push(record);
        break;
      case 'labResult':
        user.healthHistory.labResults.push(record);
        break;
      case 'vaccination':
        user.healthHistory.vaccinations.push(record);
        break;
    }

    this.users.set(userId, user);
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = user;
    }
    this.saveToStorage();
    return true;
  }

  // Update vitals
  updateVitals(userId, vitalsData) {
    const user = this.users.get(userId);
    if (!user) return false;

    Object.keys(vitalsData).forEach(key => {
      if (user.healthHistory.vitals[key]) {
        user.healthHistory.vitals[key] = {
          ...user.healthHistory.vitals[key],
          ...vitalsData[key],
          lastUpdated: new Date().toISOString()
        };
      }
    });

    this.users.set(userId, user);
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = user;
    }
    this.saveToStorage();
    return true;
  }

  // Add order
  addOrder(userId, orderData) {
    const user = this.users.get(userId);
    if (!user) return false;

    const order = {
      id: 'APO' + Date.now(),
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'processing'
    };

    user.orders.push(order);
    this.users.set(userId, user);
    
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = user;
    }
    
    this.saveToStorage();
    return order;
  }

  // Add notification
  addNotification(userId, notificationData) {
    const user = this.users.get(userId);
    if (!user) return false;

    const notification = {
      id: Date.now(),
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString()
    };

    user.notifications.unshift(notification);
    this.users.set(userId, user);
    
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = user;
    }
    
    this.saveToStorage();
    return notification;
  }

  // Update cart
  updateCart(userId, cartItems) {
    const user = this.users.get(userId);
    if (!user) return false;

    user.cart = cartItems;
    this.users.set(userId, user);
    
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = user;
    }
    
    this.saveToStorage();
    return true;
  }

  // Add to favorites
  addToFavorites(userId, type, itemId, itemData) {
    const user = this.users.get(userId);
    if (!user) return false;

    if (!user.favorites[type]) {
      user.favorites[type] = [];
    }

    const favorite = {
      id: itemId,
      ...itemData,
      addedAt: new Date().toISOString()
    };

    user.favorites[type].push(favorite);
    this.users.set(userId, user);
    
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = user;
    }
  }

  // Logout user
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUserId');
    this.saveToStorage();
  }

  // Get all users (admin only)
  getAllUsers() {
    return Array.from(this.users.values());
  }

  // Delete user
  deleteUser(userId) {
    if (this.users.has(userId)) {
      this.users.delete(userId);
      if (this.currentUser && this.currentUser.id === userId) {
        this.currentUser = null;
      }
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Search users
  searchUsers(query) {
    const results = [];
    for (let [userId, user] of this.users) {
      if (user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())) {
        results.push(user);
      }
    }
    return results;
  }

  // Get user statistics
  getUserStats(userId) {
    const user = this.users.get(userId);
    if (!user) return null;

    return {
      totalOrders: user.orders.length,
      totalAppointments: user.healthHistory.appointments.length,
      activeMedications: user.healthHistory.medications.filter(med => med.status === 'active').length,
      unreadNotifications: user.notifications.filter(notif => !notif.read).length,
      cartItems: user.cart.length,
      memberSince: user.createdAt,
      lastLogin: user.lastLogin
    };
  }
}

// Create singleton instance
const userDB = new UserDatabase();

// Initialize with demo users if no users exist
if (userDB.users.size === 0) {
  // Create demo users
  const demoUsers = [
    {
      id: 'user_demo_1',
      name: 'Vignesh Raj',
      email: 'vignesh@example.com',
      password: 'demo123',
      phone: '+91 9876543210',
      dateOfBirth: '1995-05-15',
      gender: 'Male',
      bloodGroup: 'O+',
      address: '123 Main Street, Chennai, Tamil Nadu 600001'
    },
    {
      id: 'user_demo_2',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: 'demo123',
      phone: '+91 9876543211',
      dateOfBirth: '1992-08-22',
      gender: 'Female',
      bloodGroup: 'A+',
      address: '456 Park Avenue, Mumbai, Maharashtra 400001'
    },
    {
      id: 'user_demo_3',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      password: 'demo123',
      phone: '+91 9876543212',
      dateOfBirth: '1988-12-10',
      gender: 'Male',
      bloodGroup: 'B+',
      address: '789 Garden Road, Bangalore, Karnataka 560001'
    }
  ];

  demoUsers.forEach((userData, index) => {
    const user = userDB.createUser(userData);
    
    // Add sample health data
    userDB.addHealthRecord(user.id, 'appointment', {
      type: 'General Checkup',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Apollo Hospital',
      date: '2024-01-15',
      status: 'completed',
      notes: 'Regular health checkup. All vitals normal.'
    });

    userDB.addHealthRecord(user.id, 'medication', {
      name: 'Vitamin D3',
      dosage: '1000 IU daily',
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      status: 'active',
      prescribedBy: 'Dr. Sarah Johnson'
    });

    // Add sample orders
    userDB.addOrder(user.id, {
      items: [
        { name: 'Paracetamol 500mg', quantity: 10, price: 25 },
        { name: 'Vitamin C Tablets', quantity: 30, price: 150 }
      ],
      total: 175,
      deliveryAddress: user.address
    });
    
    // Auto-login the first demo user for testing
    if (index === 0 && !userDB.getCurrentUser()) {
      userDB.currentUser = user;
      userDB.saveToStorage();
    }
  });
}

export default userDB;
