import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaCrown, FaArrowUp, FaArrowDown, FaEye, FaHeart } from 'react-icons/fa';
import './RealTimeActivity.css';

const RealTimeActivity = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeUsers: 0,
    premiumMembers: 0,
    revenue: 0
  });

  // Mock real-time activity data
  const generateActivity = () => {
    const activityTypes = [
      { type: 'purchase', icon: FaShoppingCart, color: '#10b981' },
      { type: 'signup', icon: FaUser, color: '#3b82f6' },
      { type: 'premium_upgrade', icon: FaCrown, color: '#f59e0b' },
      { type: 'view_product', icon: FaEye, color: '#6b7280' },
      { type: 'add_to_cart', icon: FaHeart, color: '#ef4444' }
    ];

    const users = [
      'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Gupta', 'Vikram Singh',
      'Anita Desai', 'Rohit Mehta', 'Kavya Nair', 'Arjun Reddy', 'Meera Joshi'
    ];

    const products = [
      'Paracetamol 650mg', 'Vitamin D3', 'Omron BP Monitor', 'Cetrizine 10mg',
      'Protein Powder', 'Face Mask N95', 'Thermometer Digital', 'Calcium Tablets'
    ];

    const amounts = [299, 599, 1299, 199, 2499, 99, 799, 449, 999, 1599];

    const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

    let message = '';
    switch (randomActivity.type) {
      case 'purchase':
        message = `${randomUser} purchased ${randomProduct} for ₹${randomAmount}`;
        break;
      case 'signup':
        message = `${randomUser} joined MediCore`;
        break;
      case 'premium_upgrade':
        message = `${randomUser} upgraded to Premium membership`;
        break;
      case 'view_product':
        message = `${randomUser} viewed ${randomProduct}`;
        break;
      case 'add_to_cart':
        message = `${randomUser} added ${randomProduct} to cart`;
        break;
      default:
        message = `${randomUser} performed an action`;
    }

    return {
      id: Date.now() + Math.random(),
      type: randomActivity.type,
      icon: randomActivity.icon,
      color: randomActivity.color,
      message,
      timestamp: new Date(),
      amount: randomActivity.type === 'purchase' ? randomAmount : null,
      user: randomUser,
      product: randomProduct
    };
  };

  // Update stats based on activities
  const updateStats = (newActivity) => {
    setStats(prevStats => {
      const newStats = { ...prevStats };
      
      switch (newActivity.type) {
        case 'purchase':
          newStats.totalOrders += 1;
          newStats.revenue += newActivity.amount;
          break;
        case 'signup':
          newStats.activeUsers += 1;
          break;
        case 'premium_upgrade':
          newStats.premiumMembers += 1;
          break;
        default:
          break;
      }
      
      return newStats;
    });
  };

  // Generate new activity every 2-5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep last 20 activities
      updateStats(newActivity);
    }, Math.random() * 3000 + 2000); // 2-5 seconds

    return () => clearInterval(interval);
  }, []);

  // Initialize with some activities
  useEffect(() => {
    const initialActivities = Array.from({ length: 10 }, () => generateActivity());
    setActivities(initialActivities);
    
    // Initialize stats
    setStats({
      totalOrders: 1247,
      activeUsers: 8934,
      premiumMembers: 2156,
      revenue: 45678
    });
  }, []);

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="realtime-activity-dashboard">
      <div className="dashboard-header">
        <h2>Real-Time User Activity</h2>
        <div className="live-indicator">
          <span className="live-dot"></span>
          LIVE
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card orders">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalOrders.toLocaleString()}</div>
            <div className="stat-label">Total Orders</div>
            <div className="stat-trend positive">
              <FaArrowUp /> +12.5%
            </div>
          </div>
        </div>

        <div className="stat-card users">
          <div className="stat-icon">
            <FaUser />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeUsers.toLocaleString()}</div>
            <div className="stat-label">Active Users</div>
            <div className="stat-trend positive">
              <FaArrowUp /> +8.3%
            </div>
          </div>
        </div>

        <div className="stat-card premium">
          <div className="stat-icon">
            <FaCrown />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.premiumMembers.toLocaleString()}</div>
            <div className="stat-label">Premium Members</div>
            <div className="stat-trend positive">
              <FaArrowUp /> +15.7%
            </div>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">
            ₹
          </div>
          <div className="stat-content">
            <div className="stat-number">{formatCurrency(stats.revenue)}</div>
            <div className="stat-label">Revenue Today</div>
            <div className="stat-trend positive">
              <FaArrowUp /> +22.1%
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="activity-feed">
        <h3>Live Activity Feed</h3>
        <div className="activity-list">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-icon" style={{ color: activity.color }}>
                  <IconComponent />
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{formatTime(activity.timestamp)}</div>
                </div>
                {activity.amount && (
                  <div className="activity-amount">
                    {formatCurrency(activity.amount)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RealTimeActivity;
