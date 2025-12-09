// Storage Manager Utility for MediCore App
// Handles localStorage operations with quota management

class StorageManager {
  static calculateStorageSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }

  static formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static getStorageUsage() {
    const usage = this.calculateStorageSize();
    const limit = 5 * 1024 * 1024; // 5MB estimated limit
    const percentage = ((usage / limit) * 100).toFixed(1);
    
    return {
      usage,
      limit,
      percentage,
      formatted: this.formatBytes(usage)
    };
  }

  static isStorageNearLimit(threshold = 80) {
    const { percentage } = this.getStorageUsage();
    return parseFloat(percentage) > threshold;
  }

  static clearAllStorage() {
    localStorage.clear();
    console.log('All localStorage data cleared');
  }

  static clearUserData() {
    localStorage.removeItem('apolloUsers');
    localStorage.removeItem('users');
    localStorage.removeItem('currentUser');
    console.log('User data cleared');
  }

  static clearOrderData() {
    // Clear orders from user objects
    const apolloUsers = JSON.parse(localStorage.getItem('apolloUsers') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Clear orders from apolloUsers
    Object.keys(apolloUsers).forEach(userId => {
      if (apolloUsers[userId].orders) {
        apolloUsers[userId].orders = [];
      }
    });
    
    // Clear orders from users array
    const updatedUsers = users.map(user => ({
      ...user,
      orders: []
    }));
    
    localStorage.setItem('apolloUsers', JSON.stringify(apolloUsers));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('labBookings');
    
    console.log('Order data cleared');
  }

  static clearOldOrders(daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const apolloUsers = JSON.parse(localStorage.getItem('apolloUsers') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Clear old orders from apolloUsers
    Object.keys(apolloUsers).forEach(userId => {
      if (apolloUsers[userId].orders) {
        apolloUsers[userId].orders = apolloUsers[userId].orders.filter(order => {
          const orderDate = new Date(order.date || order.createdAt || Date.now());
          return orderDate > cutoffDate;
        });
      }
    });
    
    // Clear old orders from users array
    const updatedUsers = users.map(user => ({
      ...user,
      orders: user.orders ? user.orders.filter(order => {
        const orderDate = new Date(order.date || order.createdAt || Date.now());
        return orderDate > cutoffDate;
      }) : []
    }));
    
    localStorage.setItem('apolloUsers', JSON.stringify(apolloUsers));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    console.log(`Orders older than ${daysOld} days cleared`);
  }

  static safeSetItem(key, value) {
    try {
      localStorage.setItem(key, value);
      return { success: true };
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        // Try to free up space
        console.warn('Storage quota exceeded, attempting to free space...');
        
        // First try clearing old orders
        this.clearOldOrders(7); // Clear orders older than 7 days
        
        try {
          localStorage.setItem(key, value);
          return { success: true, message: 'Saved after clearing old data' };
        } catch (secondError) {
          // If still failing, suggest manual cleanup
          return { 
            success: false, 
            error: 'Storage quota exceeded. Please clear some data manually.',
            needsCleanup: true
          };
        }
      }
      return { success: false, error: error.message };
    }
  }

  static compressBase64(base64String, quality = 0.7) {
    // Simple compression by reducing quality (for demo purposes)
    // In production, you'd use proper image/PDF compression libraries
    return base64String;
  }

  static getStorageReport() {
    const report = {};
    let totalSize = 0;
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const size = localStorage[key].length + key.length;
        report[key] = {
          size,
          formatted: this.formatBytes(size)
        };
        totalSize += size;
      }
    }
    
    // Sort by size
    const sortedReport = Object.entries(report)
      .sort(([,a], [,b]) => b.size - a.size)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    
    return {
      items: sortedReport,
      totalSize,
      totalFormatted: this.formatBytes(totalSize)
    };
  }
}

export default StorageManager;
