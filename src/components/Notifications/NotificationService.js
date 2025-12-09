// Email/SMS Notification Service
class NotificationService {
  constructor() {
    this.defaultPreferences = {
      email: {
        orderUpdates: true,
        healthTips: true,
        promotionalOffers: true
      },
      sms: {
        orderUpdates: true,
        healthTips: true,
        promotionalOffers: true
      },
      push: {
        orderUpdates: true,
        healthTips: true,
        promotionalOffers: true
      }
    };
    
    // Initialize audio context for notification sounds
    this.audioContext = null;
    this.notificationSounds = {
      default: this.createNotificationTone(800, 0.1),
      success: this.createNotificationTone(1000, 0.15),
      warning: this.createNotificationTone(600, 0.2),
      error: this.createNotificationTone(400, 0.3)
    };
  }

  // Create notification tone using Web Audio API
  createNotificationTone(frequency, duration) {
    return () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
  }

  // Play notification sound
  playNotificationSound(type = 'default') {
    try {
      if (this.notificationSounds[type]) {
        this.notificationSounds[type]();
      }
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }

  // Get user notification preferences
  async getUserPreferences(userId) {
    try {
      const stored = localStorage.getItem(`notification_preferences_${userId}`);
      return stored ? JSON.parse(stored) : this.defaultPreferences;
    } catch (error) {
      console.error('Error getting notification preferences:', error);
      return this.defaultPreferences;
    }
  }

  // Update user notification preferences
  async updateUserPreferences(userId, preferences) {
    try {
      localStorage.setItem(`notification_preferences_${userId}`, JSON.stringify(preferences));
      return { success: true };
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }

  // Send notification based on type and user preferences
  async sendNotification(userId, type, emailContent, smsContent, soundType = 'default') {
    try {
      const preferences = await this.getUserPreferences(userId);
      
      // Simulate sending notifications based on preferences
      const notifications = [];
      
      if (preferences.email[type]) {
        notifications.push({
          type: 'email',
          content: emailContent,
          timestamp: new Date().toISOString()
        });
      }
      
      if (preferences.sms[type]) {
        notifications.push({
          type: 'sms',
          content: smsContent,
          timestamp: new Date().toISOString()
        });
      }
      
      if (preferences.push[type]) {
        notifications.push({
          type: 'push',
          content: smsContent,
          timestamp: new Date().toISOString()
        });
        
        // Play notification sound for push notifications
        this.playNotificationSound(soundType);
        
        // Show browser notification if permission granted
        this.showBrowserNotification(smsContent);
      }
      
      // Store notification history
      this.storeNotificationHistory(userId, notifications);
      
      return { success: true, notifications };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  // Show browser notification
  showBrowserNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('MediCore Notification', {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('MediCore Notification', {
            body: message,
            icon: '/favicon.ico',
            badge: '/favicon.ico'
          });
        }
      });
    }
  }

  // Store notification history
  storeNotificationHistory(userId, notifications) {
    try {
      const history = JSON.parse(localStorage.getItem(`notification_history_${userId}`) || '[]');
      history.push(...notifications);
      
      // Keep only last 100 notifications
      if (history.length > 100) {
        history.splice(0, history.length - 100);
      }
      
      localStorage.setItem(`notification_history_${userId}`, JSON.stringify(history));
      } catch (error) {
      console.error('Error storing notification history:', error);
      }
    }

  // Get notification history
  async getNotificationHistory(userId) {
      try {
      const history = JSON.parse(localStorage.getItem(`notification_history_${userId}`) || '[]');
      return history;
      } catch (error) {
      console.error('Error getting notification history:', error);
      return [];
    }
  }

  // Send order update notification
  async sendOrderUpdate(orderData) {
    const { userId, orderId, status, items } = orderData;
    
    const emailContent = `
      <h2>Order Update</h2>
      <p>Your order <strong>#${orderId}</strong> has been updated.</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Items:</strong> ${items.map(item => item.name).join(', ')}</p>
      <p>Track your order: <a href="/orders/${orderId}">View Details</a></p>
    `;
    
    const smsContent = `Order #${orderId} status: ${status}. Track at apollo-clone.com/orders/${orderId}`;
    
    return this.sendNotification(userId, 'orderUpdates', emailContent, smsContent, 'success');
  }

  // Send health tips notification
  async sendHealthTip(healthData) {
    const { userId, tip, category } = healthData;
    
    const emailContent = `
      <h2>Health Tip of the Day</h2>
      <p><strong>Category:</strong> ${category}</p>
      <p>${tip}</p>
      <p>Stay healthy with Apollo Clone!</p>
    `;
    
    const smsContent = `Health Tip (${category}): ${tip.substring(0, 100)}...`;
    
    return this.sendNotification(userId, 'healthTips', emailContent, smsContent, 'default');
  }

  // Send promotional offer notification
  async sendPromotionalOffer(offerData) {
    const { userId, title, description, discount, validUntil } = offerData;
    
    const emailContent = `
      <h2>Special Offer!</h2>
      <p><strong>${title}</strong></p>
      <p>${description}</p>
      <p><strong>Discount:</strong> ${discount}</p>
      <p><strong>Valid until:</strong> ${validUntil}</p>
      <p><a href="/offers">Claim Offer</a></p>
    `;
    
    const smsContent = `Special Offer: ${title} - ${discount} off! Valid until ${validUntil}`;
    
    return this.sendNotification(userId, 'promotionalOffers', emailContent, smsContent, 'warning');
  }

  // Send appointment notification
  async sendAppointmentNotification(appointmentData) {
    const { userId, doctorName, appointmentDate, appointmentTime, type } = appointmentData;
    
    const emailContent = `
      <h2>Appointment ${type}</h2>
      <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been ${type.toLowerCase()}.</p>
      <p><strong>Date:</strong> ${appointmentDate}</p>
      <p><strong>Time:</strong> ${appointmentTime}</p>
      <p>Manage your appointments: <a href="/profile">View Profile</a></p>
    `;
    
    const smsContent = `Appointment ${type}: Dr. ${doctorName} on ${appointmentDate} at ${appointmentTime}`;
    
    const soundType = type === 'Confirmed' ? 'success' : type === 'Cancelled' ? 'error' : 'default';
    
    return this.sendNotification(userId, 'orderUpdates', emailContent, smsContent, soundType);
  }

  // Test notification function
  async testNotification(userId, type) {
    const testData = {
      orderUpdates: {
        orderId: 'TEST123',
        status: 'Shipped',
        items: [{ name: 'Test Medicine' }]
      },
      healthTips: {
        tip: 'Drink 8 glasses of water daily for better health!',
        category: 'Hydration'
      },
      promotionalOffers: {
        title: 'Test Offer',
        description: 'This is a test promotional offer',
        discount: '20% off',
        validUntil: '2024-12-31'
      }
    };

    switch (type) {
      case 'order':
        return this.sendOrderUpdate(testData.orderUpdates);
      case 'health':
        return this.sendHealthTip(testData.healthTips);
      case 'promotional':
        return this.sendPromotionalOffer(testData.promotionalOffers);
      default:
        throw new Error('Invalid notification type');
    }
  }
}

export default NotificationService;
