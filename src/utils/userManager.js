// User Management System for Admin Panel
class UserManager {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    // Initialize storage keys if they don't exist
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('activeUsers')) {
      localStorage.setItem('activeUsers', JSON.stringify([]));
    }
    if (!localStorage.getItem('userSessions')) {
      localStorage.setItem('userSessions', JSON.stringify({}));
    }
    if (!localStorage.getItem('orders')) {
      localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('labTests')) {
      localStorage.setItem('labTests', JSON.stringify([]));
    }
    if (!localStorage.getItem('labReports')) {
      localStorage.setItem('labReports', JSON.stringify([]));
    }
  }

  // User Management
  getAllUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getActiveUsers() {
    const sessions = JSON.parse(localStorage.getItem('userSessions') || '{}');
    const now = Date.now();
    const activeThreshold = 30 * 60 * 1000; // 30 minutes

    return Object.entries(sessions)
      .filter(([userId, session]) => (now - session.lastActivity) < activeThreshold)
      .map(([userId, session]) => ({
        userId,
        ...session,
        isActive: true
      }));
  }

  getUserById(userId) {
    const users = this.getAllUsers();
    return users.find(user => user.id === userId);
  }

  updateUserActivity(userId) {
    const sessions = JSON.parse(localStorage.getItem('userSessions') || '{}');
    const user = this.getUserById(userId);
    
    if (user) {
      sessions[userId] = {
        userId,
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
        lastActivity: Date.now(),
        loginTime: sessions[userId]?.loginTime || Date.now()
      };
      localStorage.setItem('userSessions', JSON.stringify(sessions));
    }
  }

  logoutUser(userId) {
    const sessions = JSON.parse(localStorage.getItem('userSessions') || '{}');
    delete sessions[userId];
    localStorage.setItem('userSessions', JSON.stringify(sessions));
  }

  // Registration Analytics
  getRegistrationStats() {
    const users = this.getAllUsers();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: users.length,
      today: users.filter(user => new Date(user.createdAt) >= today).length,
      thisWeek: users.filter(user => new Date(user.createdAt) >= thisWeek).length,
      thisMonth: users.filter(user => new Date(user.createdAt) >= thisMonth).length,
      verified: users.filter(user => user.isVerified).length,
      unverified: users.filter(user => !user.isVerified).length
    };
  }

  // Order Management
  createOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: `ORD${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  }

  getAllOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }

  getOrdersByUserId(userId) {
    const orders = this.getAllOrders();
    return orders.filter(order => order.userId === userId);
  }

  updateOrderStatus(orderId, status) {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('orders', JSON.stringify(orders));
      return orders[orderIndex];
    }
    return null;
  }

  getOrderStats() {
    const orders = this.getAllOrders();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return {
      total: orders.length,
      pending: orders.filter(order => order.status === 'pending').length,
      processing: orders.filter(order => order.status === 'processing').length,
      shipped: orders.filter(order => order.status === 'shipped').length,
      delivered: orders.filter(order => order.status === 'delivered').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length,
      today: orders.filter(order => new Date(order.createdAt) >= today).length,
      totalRevenue: orders
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + (order.total || 0), 0)
    };
  }

  // Lab Test Management
  createLabTest(labTestData) {
    const labTests = JSON.parse(localStorage.getItem('labTests') || '[]');
    const newLabTest = {
      id: `LAB${Date.now()}`,
      ...labTestData,
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    };
    labTests.push(newLabTest);
    localStorage.setItem('labTests', JSON.stringify(labTests));
    return newLabTest;
  }

  getAllLabTests() {
    return JSON.parse(localStorage.getItem('labTests') || '[]');
  }

  getLabTestsByUserId(userId) {
    const labTests = this.getAllLabTests();
    return labTests.filter(test => test.userId === userId);
  }

  updateLabTestStatus(testId, status) {
    const labTests = this.getAllLabTests();
    const testIndex = labTests.findIndex(test => test.id === testId);
    if (testIndex !== -1) {
      labTests[testIndex].status = status;
      labTests[testIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('labTests', JSON.stringify(labTests));
      return labTests[testIndex];
    }
    return null;
  }

  getLabTestStats() {
    const labTests = this.getAllLabTests();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return {
      total: labTests.length,
      scheduled: labTests.filter(test => test.status === 'scheduled').length,
      completed: labTests.filter(test => test.status === 'completed').length,
      cancelled: labTests.filter(test => test.status === 'cancelled').length,
      today: labTests.filter(test => new Date(test.createdAt) >= today).length
    };
  }

  // Lab Report Management
  uploadLabReport(reportData) {
    const reports = JSON.parse(localStorage.getItem('labReports') || '[]');
    const newReport = {
      id: `RPT${Date.now()}`,
      ...reportData,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'admin'
    };
    reports.push(newReport);
    localStorage.setItem('labReports', JSON.stringify(reports));
    
    // Update lab test status to completed
    this.updateLabTestStatus(reportData.labTestId, 'completed');
    
    return newReport;
  }

  getLabReports() {
    return JSON.parse(localStorage.getItem('labReports') || '[]');
  }

  getLabReportsByUserId(userId) {
    const reports = this.getLabReports();
    return reports.filter(report => report.userId === userId);
  }

  getLabReportsByTestId(testId) {
    const reports = this.getLabReports();
    return reports.filter(report => report.labTestId === testId);
  }

  // Analytics and Dashboard Data
  getDashboardStats() {
    const userStats = this.getRegistrationStats();
    const orderStats = this.getOrderStats();
    const labStats = this.getLabTestStats();
    const activeUsers = this.getActiveUsers();

    return {
      users: userStats,
      orders: orderStats,
      labTests: labStats,
      activeUsers: {
        count: activeUsers.length,
        list: activeUsers
      },
      revenue: {
        total: orderStats.totalRevenue,
        today: this.getTodayRevenue()
      }
    };
  }

  getTodayRevenue() {
    const orders = this.getAllOrders();
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    return orders
      .filter(order => 
        order.status === 'delivered' && 
        new Date(order.createdAt) >= todayStart
      )
      .reduce((sum, order) => sum + (order.total || 0), 0);
  }

  // User Search and Filtering
  searchUsers(query) {
    const users = this.getAllUsers();
    const lowercaseQuery = query.toLowerCase();
    
    return users.filter(user => 
      user.firstname.toLowerCase().includes(lowercaseQuery) ||
      user.lastname.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.phone?.includes(query)
    );
  }

  // Export Data for Reports
  exportUserData() {
    return {
      users: this.getAllUsers(),
      orders: this.getAllOrders(),
      labTests: this.getAllLabTests(),
      reports: this.getLabReports(),
      stats: this.getDashboardStats(),
      exportedAt: new Date().toISOString()
    };
  }

  // Seed demo data for testing
  seedDemoData() {
    // Create demo orders
    const demoOrders = [
      {
        userId: '1',
        items: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 25 },
          { name: 'Vitamin D3', quantity: 1, price: 150 }
        ],
        total: 200,
        status: 'delivered',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userId: '2',
        items: [
          { name: 'Blood Pressure Monitor', quantity: 1, price: 2500 }
        ],
        total: 2500,
        status: 'shipped',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Create demo lab tests
    const demoLabTests = [
      {
        userId: '1',
        testName: 'Complete Blood Count',
        testDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled',
        price: 500
      },
      {
        userId: '2',
        testName: 'Lipid Profile',
        testDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        price: 800
      }
    ];

    // Save demo data
    demoOrders.forEach(order => this.createOrder(order));
    demoLabTests.forEach(test => this.createLabTest(test));
  }
}

export default UserManager;
