import React, { useState, useEffect } from 'react';
import { FaCrown, FaCalendarAlt, FaCreditCard, FaHistory, FaDownload, FaPause, FaPlay, FaTimes, FaChartLine, FaGift, FaExclamationTriangle, FaCheckCircle, FaBell } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import * as api from '../../services/api';
import './SubscriptionDashboard.css';

const SubscriptionDashboard = () => {
  const { currentUser } = useUser();
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState({
    medicineOrders: 0,
    totalSavings: 0,
    labTests: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    // Load subscription data
    const subData = currentUser?.subscription || JSON.parse(localStorage.getItem('userSubscription'));
    if (subData) {
      setSubscription(subData);
      loadTransactions(subData);
      loadNotifications(subData);
      calculateRealUsage(subData);
    }
  }, [currentUser]);

  // Add effect to listen for localStorage changes (when orders are placed)
  useEffect(() => {
    const handleStorageChange = () => {
      const subData = JSON.parse(localStorage.getItem('userSubscription'));
      if (subData) {
        calculateRealUsage(subData);
        loadNotifications(subData);
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Also refresh when component becomes visible (for same-tab updates)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const subData = currentUser?.subscription || JSON.parse(localStorage.getItem('userSubscription'));
        if (subData) {
          calculateRealUsage(subData);
          loadNotifications(subData);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for custom orderPlaced event
    const handleOrderPlaced = () => {
      const subData = JSON.parse(localStorage.getItem('userSubscription'));
      if (subData) {
        calculateRealUsage(subData);
        loadNotifications(subData);
      }
    };

    // Listen for custom labTestBooked event
    const handleLabTestBooked = () => {
      const subData = JSON.parse(localStorage.getItem('userSubscription'));
      if (subData) {
        calculateRealUsage(subData);
        loadNotifications(subData);
      }
    };

    window.addEventListener('orderPlaced', handleOrderPlaced);
    window.addEventListener('labTestBooked', handleLabTestBooked);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('orderPlaced', handleOrderPlaced);
      window.removeEventListener('labTestBooked', handleLabTestBooked);
    };
  }, []);

  const initializeSampleData = (subData) => {
    // Add sample order history if none exists
    if (!localStorage.getItem('orderHistory')) {
      const sampleOrders = [
        {
          id: 'ORD001',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          total: 850,
          items: ['Paracetamol', 'Vitamin D3'],
          status: 'delivered'
        },
        {
          id: 'ORD002',
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
          total: 1200,
          items: ['Metformin', 'Amlodipine'],
          status: 'delivered'
        },
        {
          id: 'ORD003',
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
          total: 650,
          items: ['Ibuprofen', 'Multivitamins'],
          status: 'delivered'
        }
      ];
      localStorage.setItem('orderHistory', JSON.stringify(sampleOrders));
    }


    // Add sample lab test history
    if (!localStorage.getItem('labTestHistory')) {
      const sampleLabTests = [
        {
          id: 'LAB001',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          test: 'Complete Blood Count',
          price: 450,
          patientName: 'John Doe',
          scheduledDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed',
          category: 'Blood Test'
        },
        {
          id: 'LAB002',
          date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          test: 'Lipid Profile',
          price: 650,
          patientName: 'John Doe',
          scheduledDate: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed',
          category: 'Blood Test'
        },
        {
          id: 'LAB003',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          test: 'Thyroid Function Test',
          price: 800,
          patientName: 'John Doe',
          scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'scheduled',
          category: 'Hormone Test'
        }
      ];
      localStorage.setItem('labTestHistory', JSON.stringify(sampleLabTests));
    }

  };

  const calculateRealUsage = (subData) => {
    // Initialize sample data if not exists
    initializeSampleData(subData);

    // Calculate real usage based on user activity
    const cart = JSON.parse(localStorage.getItem('pharmacy_cart')) || [];
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const labTestHistory = JSON.parse(localStorage.getItem('labTestHistory')) || [];

    // Calculate medicine orders since subscription start
    const subscriptionStartDate = new Date(subData.startDate);
    const currentDate = new Date();

    // Validate dates
    if (isNaN(subscriptionStartDate.getTime())) {
      console.warn('Invalid subscription start date, using current date');
      subscriptionStartDate.setTime(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    }

    // Filter orders since subscription started
    const ordersThisMonth = orderHistory.filter(order => {
      const orderDate = new Date(order.date);
      return !isNaN(orderDate.getTime()) && orderDate >= subscriptionStartDate && orderDate <= currentDate;
    });

    // Calculate total savings from medicine orders (assuming 15% average discount for subscribers)
    const totalOrderValue = ordersThisMonth.reduce((sum, order) => {
      const orderTotal = parseFloat(order.total) || 0;
      return sum + orderTotal;
    }, 0);
    const medicineOrderSavings = Math.floor(totalOrderValue * 0.15) || 0;

    // Calculate lab test savings (assuming 20% discount for subscribers)
    const labTestsForSavings = labTestHistory.filter(test => {
      const testDate = new Date(test.date);
      return !isNaN(testDate.getTime()) && testDate >= subscriptionStartDate && testDate <= currentDate;
    });
    const totalLabTestValue = labTestsForSavings.reduce((sum, test) => {
      const testPrice = parseFloat(test.price) || 0;
      return sum + testPrice;
    }, 0);
    const labTestSavings = Math.floor(totalLabTestValue * 0.20) || 0;

    // Combined savings with fallback
    const estimatedSavings = (medicineOrderSavings || 0) + (labTestSavings || 0);

    // Count lab tests
    const labTestsThisMonth = labTestHistory.filter(test => {
      const testDate = new Date(test.date);
      return !isNaN(testDate.getTime()) && testDate >= subscriptionStartDate && testDate <= currentDate;
    }).length;

    // Add current cart items to medicine orders
    const cartItemsCount = cart.length || 0;
    const cartSavings = cartItemsCount * 50;

    // Final calculations with proper fallbacks
    const finalTotalSavings = estimatedSavings + cartSavings;
    const finalMedicineOrders = ordersThisMonth.length + labTestsThisMonth + (cartItemsCount > 0 ? 1 : 0);

    // Debug logging
    console.log('Subscription calculation debug:', {
      medicineOrderSavings,
      labTestSavings,
      cartSavings,
      estimatedSavings,
      finalTotalSavings,
      totalOrderValue,
      totalLabTestValue
    });

    setUsage({
      medicineOrders: finalMedicineOrders || 0,
      totalSavings: isNaN(finalTotalSavings) ? 0 : finalTotalSavings,
      labTests: labTestsThisMonth || 0
    });
  };

  const loadTransactions = (subData) => {
    // Simulate transaction history
    const txns = [
      {
        id: subData.transactionId,
        date: subData.startDate,
        amount: subData.amount,
        status: 'success',
        description: `${subData.planName} - ${subData.billingCycle} subscription`
      }
    ];
    setTransactions(txns);
  };

  const loadNotifications = (subData) => {
    const cart = JSON.parse(localStorage.getItem('pharmacy_cart')) || [];
    const currentDate = new Date();
    const endDate = new Date(subData.endDate);
    const daysUntilRenewal = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));

    const notifs = [
      {
        id: 1,
        type: 'success',
        message: `Your ${subData.planName} subscription is active`,
        date: new Date(subData.startDate).toLocaleDateString(),
        read: false
      }
    ];

    // Add cart-related notification
    if (cart.length > 0) {
      notifs.push({
        id: 2,
        type: 'info',
        message: `You have ${cart.length} items in your cart. Complete your order to save more!`,
        date: new Date().toLocaleDateString(),
        read: false
      });
    }

    // Add activity summary notification
    const allOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const allLabTests = JSON.parse(localStorage.getItem('labTestHistory')) || [];
    const totalOrders = allOrders.length + allLabTests.length;

    if (totalOrders > 0) {
      notifs.push({
        id: 7,
        type: 'info',
        message: `You've placed ${totalOrders} total orders (${allOrders.length} medicine + ${allLabTests.length} lab tests) with your subscription!`,
        date: new Date().toLocaleDateString(),
        read: false
      });
    }

    // Add renewal reminder based on actual days remaining
    if (daysUntilRenewal <= 7 && daysUntilRenewal > 0) {
      notifs.push({
        id: 3,
        type: 'reminder',
        message: `Your subscription renews in ${daysUntilRenewal} days`,
        date: new Date().toLocaleDateString(),
        read: false
      });
    } else if (daysUntilRenewal <= 0) {
      notifs.push({
        id: 3,
        type: 'warning',
        message: 'Your subscription has expired. Renew now to continue benefits!',
        date: new Date().toLocaleDateString(),
        read: false
      });
    }

    // Add savings notification if user has made orders
    const recentOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    if (recentOrders.length > 0) {
      const lastOrder = recentOrders[recentOrders.length - 1];
      const savings = Math.floor((lastOrder.total || 0) * 0.15);
      if (savings > 0) {
        notifs.push({
          id: 4,
          type: 'success',
          message: `You saved ₹${savings} on your last medicine order!`,
          date: new Date().toLocaleDateString(),
          read: false
        });
      }
    }

    // Add lab test notification if user has booked tests
    const recentLabTests = JSON.parse(localStorage.getItem('labTestHistory')) || [];
    if (recentLabTests.length > 0) {
      const lastLabTest = recentLabTests[recentLabTests.length - 1];
      const testDate = new Date(lastLabTest.scheduledDate);
      const today = new Date();
      const daysDiff = Math.ceil((testDate - today) / (1000 * 60 * 60 * 24));

      if (daysDiff >= 0 && daysDiff <= 3) {
        notifs.push({
          id: 5,
          type: 'reminder',
          message: `Your ${lastLabTest.test} is scheduled ${daysDiff === 0 ? 'today' : `in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`}`,
          date: new Date().toLocaleDateString(),
          read: false
        });
      }

      // Add lab test savings notification
      const labTestSavings = Math.floor((lastLabTest.price || 0) * 0.20);
      if (labTestSavings > 0) {
        notifs.push({
          id: 6,
          type: 'success',
          message: `You saved ₹${labTestSavings} on your ${lastLabTest.test} booking with your subscription!`,
          date: new Date().toLocaleDateString(),
          read: false
        });
      }
    }

    setNotifications(notifs);
  };

  // Manual refresh function
  const refreshDashboard = () => {
    const subData = JSON.parse(localStorage.getItem('userSubscription'));
    if (subData) {
      calculateRealUsage(subData);
      loadNotifications(subData);
      loadTransactions(subData);
    }
  };
  const handlePauseSubscription = () => {
    const updatedSub = { ...subscription, status: 'paused' };
    setSubscription(updatedSub);
    localStorage.setItem('userSubscription', JSON.stringify(updatedSub));

    // Persist to backend
    api.updateSubscription(updatedSub).catch(console.error);

    alert('Subscription paused successfully');
  };

  const handleResumeSubscription = () => {
    const updatedSub = { ...subscription, status: 'active' };
    setSubscription(updatedSub);
    localStorage.setItem('userSubscription', JSON.stringify(updatedSub));

    // Persist to backend
    api.updateSubscription(updatedSub).catch(console.error);

    alert('Subscription resumed successfully');
  };

  const handleCancelSubscription = () => {
    localStorage.removeItem('userSubscription');

    // Persist to backend (status cancelled)
    const cancelledSub = { ...subscription, status: 'cancelled' };
    api.updateSubscription(cancelledSub).catch(console.error);

    setSubscription(null);
    setShowCancelModal(false);
    alert('Subscription cancelled successfully');
  };

  const downloadInvoice = (transaction) => {
    // Simulate invoice download
    alert(`Downloading invoice for ${transaction.id}`);
  };

  const getDaysRemaining = () => {
    if (!subscription) return 0;
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getUsagePercentage = (used, total) => {
    return total === 'unlimited' ? 100 : (used / total) * 100;
  };

  // Helper function to safely display numbers
  const safeDisplayNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  if (!subscription) {
    return (
      <div className="no-subscription">
        <div className="no-sub-content">
          <FaCrown className="no-sub-icon" />
          <h2>No Active Subscription</h2>
          <p>Subscribe to a plan to enjoy exclusive benefits and savings</p>
          <a href="/subscriptions" className="subscribe-link">
            View Plans
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-dashboard">
      {/* Header Stats */}
      <div className="dashboard-header">
        <div className="header-card active-plan">
          <div className="card-icon">
            <FaCrown />
          </div>
          <div className="card-content">
            <h3>{subscription.planName}</h3>
            <p className={`status ${subscription.status}`}>
              {subscription.status === 'active' ? 'Active' : 'Paused'}
            </p>
          </div>
        </div>

        <div className="header-card">
          <div className="card-icon">
            <FaCalendarAlt />
          </div>
          <div className="card-content">
            <h3>{getDaysRemaining()} Days</h3>
            <p>Remaining</p>
          </div>
        </div>

        <div className="header-card">
          <div className="card-icon savings">
            <FaGift />
          </div>
          <div className="card-content">
            <h3>₹{safeDisplayNumber(usage.totalSavings)}</h3>
            <p>Total Savings</p>
          </div>
        </div>

        <div className="header-card">
          <div className="card-icon">
            <FaChartLine />
          </div>
          <div className="card-content">
            <h3>{usage.medicineOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Subscription Details */}
        <div className="dashboard-card subscription-details">
          <div className="card-header">
            <h3><FaCreditCard /> Subscription Details</h3>
          </div>
          <div className="card-body">
            <div className="detail-row">
              <span>Plan Name:</span>
              <strong>{subscription.planName}</strong>
            </div>
            <div className="detail-row">
              <span>Billing Cycle:</span>
              <strong>{subscription.billingCycle}</strong>
            </div>
            <div className="detail-row">
              <span>Amount:</span>
              <strong>₹{subscription.amount}</strong>
            </div>
            <div className="detail-row">
              <span>Start Date:</span>
              <strong>{new Date(subscription.startDate).toLocaleDateString()}</strong>
            </div>
            <div className="detail-row">
              <span>Next Billing:</span>
              <strong>{new Date(subscription.endDate).toLocaleDateString()}</strong>
            </div>
            <div className="detail-row">
              <span>Payment Method:</span>
              <strong>{subscription.paymentMethod}</strong>
            </div>
            <div className="detail-row">
              <span>Auto-Renewal:</span>
              <strong className="enabled">Enabled</strong>
            </div>

            <div className="action-buttons">
              {subscription.status === 'active' ? (
                <button className="btn-pause" onClick={handlePauseSubscription}>
                  <FaPause /> Pause Subscription
                </button>
              ) : (
                <button className="btn-resume" onClick={handleResumeSubscription}>
                  <FaPlay /> Resume Subscription
                </button>
              )}
              <button className="btn-cancel" onClick={() => setShowCancelModal(true)}>
                <FaTimes /> Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="dashboard-card usage-stats">
          <div className="card-header">
            <h3><FaChartLine /> Usage Statistics</h3>
          </div>
          <div className="card-body">
            <div className="usage-item">
              <div className="usage-label">
                <span>Total Orders (Medicine + Lab Tests)</span>
                <strong>{usage.medicineOrders}</strong>
              </div>
              <div className="usage-bar">
                <div className="usage-fill" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="usage-item">
              <div className="usage-label">
                <span>Lab Tests</span>
                <strong>{usage.labTests}</strong>
              </div>
              <div className="usage-bar">
                <div className="usage-fill" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div className="savings-highlight">
              <FaGift />
              <div>
                <strong>Total Savings</strong>
                <p>You've saved ₹{safeDisplayNumber(usage.totalSavings)} with your subscription!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="dashboard-card transaction-history">
          <div className="card-header">
            <h3><FaHistory /> Transaction History</h3>
          </div>
          <div className="card-body">
            {transactions.map((txn) => (
              <div key={txn.id} className="transaction-item">
                <div className="txn-icon">
                  <FaCheckCircle />
                </div>
                <div className="txn-details">
                  <strong>{txn.description}</strong>
                  <p>{new Date(txn.date).toLocaleDateString()}</p>
                  <span className="txn-id">ID: {txn.id}</span>
                </div>
                <div className="txn-amount">
                  <strong>₹{txn.amount}</strong>
                  <button className="btn-download" onClick={() => downloadInvoice(txn)}>
                    <FaDownload /> Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="dashboard-card notifications">
          <div className="card-header">
            <h3><FaBell /> Notifications</h3>
          </div>
          <div className="card-body">
            {notifications.map((notif) => (
              <div key={notif.id} className={`notification-item ${notif.type} ${notif.read ? 'read' : ''}`}>
                <div className="notif-icon">
                  {notif.type === 'success' && <FaCheckCircle />}
                  {notif.type === 'info' && <FaBell />}
                  {notif.type === 'reminder' && <FaCalendarAlt />}
                </div>
                <div className="notif-content">
                  <p>{notif.message}</p>
                  <span>{notif.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="cancel-modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="cancel-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cancel-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Cancel Subscription?</h3>
            <p>Are you sure you want to cancel your subscription? You will lose access to all benefits at the end of your current billing period.</p>
            <div className="cancel-actions">
              <button className="btn-keep" onClick={() => setShowCancelModal(false)}>
                Keep Subscription
              </button>
              <button className="btn-confirm-cancel" onClick={handleCancelSubscription}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDashboard;
