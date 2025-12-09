import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaShoppingBag, 
  FaBell, 
  FaCog, 
  FaSignOutAlt,
  FaEdit,
  FaEye,
  FaReceipt,
  FaHeart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaMoon,
  FaSun,
  FaLanguage,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaVideo,
  FaCheckCircle,
  FaSave,
  FaTimes,
  FaStethoscope,
  FaClipboardList,
  FaFileMedical,
  FaHandHoldingHeart
} from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import InvoiceModal from '../Invoice/InvoiceModal';
import MedicineHistory from './MedicineHistory';
import { getUserAppointments, updateProfile } from '../../services/api';
import SubscriptionBadge from '../Subscription/SubscriptionBadge';
import './AccountPage.css';

const AccountPage = () => {
  const { currentUser, logout, updateUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [orderFilter, setOrderFilter] = useState('all'); // 'all', 'pharmacy', 'lab_test'
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setEditData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      dateOfBirth: currentUser?.dateOfBirth || '',
      gender: currentUser?.gender || '',
      address: currentUser?.address || '',
      emergencyContact: currentUser?.emergencyContact || '',
      bloodGroup: currentUser?.bloodGroup || '',
      allergies: currentUser?.allergies || '',
      chronicConditions: currentUser?.chronicConditions || ''
    });
  };

  const handleSaveProfile = async () => {
    // Validation
    if (!editData.name?.trim()) {
      alert('Name is required');
      return;
    }
    if (!editData.email?.trim()) {
      alert('Email is required');
      return;
    }
    if (!editData.phone?.trim()) {
      alert('Phone is required');
      return;
    }

    setSaveLoading(true);
    try {
      // Update via API
      await updateProfile(currentUser.id, editData);
      
      // Update user context
      updateUser({ ...currentUser, ...editData });
      
      // Update localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...editData };
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setEditMode(false);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData({});
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Fetch appointments on component mount
  useEffect(() => {
    if (currentUser?.id) {
      fetchAppointments();
    }
  }, [currentUser]);

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      // First try to get appointments from user's health history
      if (currentUser?.healthHistory?.appointments) {
        // Use appointments from health history with fallback mock data
        console.log('Using health history appointments:', currentUser.healthHistory.appointments);
        setAppointments(currentUser.healthHistory.appointments);
      } else {
        // Fallback to API call
        const appointmentsData = await getUserAppointments(currentUser.id);
        setAppointments(appointmentsData);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // If API fails, set mock appointments with realistic doctor consultation fees from database
      const mockAppointments = [
        {
          id: 'APT001',
          doctor_name: 'Dr. Rajesh Kumar',
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
      ];
      setAppointments(mockAppointments);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser />, color: '#3b82f6' },
    { id: 'appointments', label: 'My Appointments', icon: <FaCalendarAlt />, color: '#8b5cf6' },
    { id: 'medicine', label: 'Medicine Donations', icon: <FaHandHoldingHeart />, color: '#10b981' },
    { id: 'orders', label: 'My Orders', icon: <FaShoppingBag />, color: '#059669' },
    { id: 'notifications', label: 'Notifications', icon: <FaBell />, color: '#f59e0b' },
    { id: 'settings', label: 'App Settings', icon: <FaCog />, color: '#6366f1' },
  ];

  const renderProfile = () => (
    <div className="account-section">
      {/* Subscription Badge */}
      <SubscriptionBadge showDetails={true} />
      
      <div className="section-header">
        <h2>My Profile</h2>
        {!editMode ? (
          <button className="edit-btn" onClick={handleEditProfile}>
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="save-btn" 
              onClick={handleSaveProfile}
              disabled={saveLoading}
              style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <FaSave /> {saveLoading ? 'Saving...' : 'Save'}
            </button>
            <button 
              className="cancel-btn" 
              onClick={handleCancelEdit}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>
      
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {(editMode ? editData.name : currentUser?.name)?.charAt(0) || 'U'}
          </div>
          <div className="profile-info">
            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Full Name"
                  style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', fontWeight: '600' }}
                />
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email Address"
                  style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>
            ) : (
              <>
                <h3>{currentUser?.name || 'User'}</h3>
                <p>{currentUser?.email || 'user@example.com'}</p>
                <span className="member-since">Member since {new Date().getFullYear()}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-icon">
            <FaPhone />
          </div>
          <div className="info-content">
            <label>Phone Number</label>
            {editMode ? (
              <input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Phone Number"
                style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', width: '100%', marginTop: '4px' }}
              />
            ) : (
              <p>{currentUser?.phone || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="info-content">
            <label>Address</label>
            {editMode ? (
              <textarea
                value={editData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Address"
                rows="2"
                style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', width: '100%', marginTop: '4px', resize: 'vertical' }}
              />
            ) : (
              <p>{currentUser?.address || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <FaHeart />
          </div>
          <div className="info-content">
            <label>Blood Group</label>
            {editMode ? (
              <select
                value={editData.bloodGroup || ''}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', width: '100%', marginTop: '4px' }}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p>{currentUser?.bloodGroup || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <FaShieldAlt />
          </div>
          <div className="info-content">
            <label>Emergency Contact</label>
            {editMode ? (
              <input
                type="tel"
                value={editData.emergencyContact || ''}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Emergency Contact"
                style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', width: '100%', marginTop: '4px' }}
              />
            ) : (
              <p>{currentUser?.emergencyContact || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => {
    // Get fresh orders from localStorage every render
    const apolloUsers = JSON.parse(localStorage.getItem('apolloUsers') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find current user's orders from both sources
    let userOrders = [];
    
    // Check apolloUsers
    if (currentUser?.id && apolloUsers[currentUser.id]?.orders) {
      userOrders = [...apolloUsers[currentUser.id].orders];
    }
    
    // Check users array
    const userInArray = users.find(u => u.id === currentUser?.id || u.email === currentUser?.email);
    if (userInArray?.orders) {
      userOrders = [...userOrders, ...userInArray.orders];
    }
    
    // Remove duplicates based on order ID
    userOrders = userOrders.filter((order, index, self) => 
      index === self.findIndex(o => o.id === order.id)
    );
    
    const allOrders = userOrders;
    const pharmacyOrders = allOrders.filter(order => order.orderType === 'pharmacy');
    const labTestOrders = allOrders.filter(order => order.orderType === 'lab_test');
    
    const getFilteredOrders = () => {
      switch (orderFilter) {
        case 'pharmacy': return pharmacyOrders;
        case 'lab_test': return labTestOrders;
        default: return allOrders;
      }
    };
    
    const filteredOrders = getFilteredOrders();
    
    return (
      <div className="account-section">
        <div className="section-header">
          <h2>My Orders</h2>
          <div className="order-stats">
            <span className="stat-item">
              {allOrders.length} Total Orders
            </span>
          </div>
        </div>
        
        {/* Order Filter Tabs */}
        <div className="order-filter-tabs">
          <button 
            className={`filter-tab ${orderFilter === 'all' ? 'active' : ''}`}
            onClick={() => setOrderFilter('all')}
          >
            All Orders ({allOrders.length})
          </button>
          <button 
            className={`filter-tab ${orderFilter === 'pharmacy' ? 'active' : ''}`}
            onClick={() => setOrderFilter('pharmacy')}
          >
            💊 Pharmacy ({pharmacyOrders.length})
          </button>
          <button 
            className={`filter-tab ${orderFilter === 'lab_test' ? 'active' : ''}`}
            onClick={() => setOrderFilter('lab_test')}
          >
            🧪 Lab Tests ({labTestOrders.length})
          </button>
        </div>

        <div className="orders-list">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              className="order-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="order-header">
                <div className="order-info">
                  <h4>Order #{order.id || `ORD-${index + 1}`}</h4>
                  <p className="order-date">{order.date || order.createdAt || 'Recent'}</p>
                  <span className={`order-status ${order.status || 'pending'}`}>
                    {(order.status || 'pending').replace('_', ' ').toUpperCase()}
                  </span>
                  {order.lastUpdated && (
                    <p className="last-updated">Updated: {new Date(order.lastUpdated).toLocaleString()}</p>
                  )}
                </div>
                <div className="order-amount">
                  ₹{order.total || order.amount || '0'}
                </div>
              </div>
              
              <div className="order-items">
                {order.items ? (
                  order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))
                ) : (
                  <div className="order-item">
                    <span>{order.test || order.productName || 'Order Item'}</span>
                  </div>
                )}
                {order.items && order.items.length > 2 && (
                  <div className="more-items">+{order.items.length - 2} more items</div>
                )}
              </div>
              
              <div className="order-actions">
                <button 
                  className="action-btn view"
                  onClick={() => handleViewInvoice(order)}
                >
                  <FaEye /> View Details
                </button>
                {order.orderType === 'lab_test' && (
                  <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                    <div style={{width: '100%', marginBottom: '10px'}}>
                      <span style={{padding: '5px 10px', background: order.resultFile ? '#10b981' : '#f59e0b', color: 'white', borderRadius: '4px', fontSize: '12px', fontWeight: '600'}}>
                        Status: {order.status || 'pending'} {order.resultFile ? '✅ Results Ready' : '⏳ Processing'}
                      </span>
                    </div>
                    
                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%'}}>
                      <button 
                        className="action-btn download"
                        onClick={() => {
                          if (order.resultFile && order.resultFile.data) {
                            const link = document.createElement('a');
                            link.href = order.resultFile.data;
                            link.download = order.resultFile.name || 'lab-result-image';
                            link.click();
                          } else {
                            alert('Result image not available yet. Please wait for results to be uploaded.');
                          }
                        }}
                        style={{
                          background: order.resultFile ? '#8b5cf6' : '#94a3b8', 
                          color: 'white', 
                          border: 'none', 
                          padding: '10px 15px', 
                          borderRadius: '6px', 
                          cursor: order.resultFile ? 'pointer' : 'not-allowed',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                        disabled={!order.resultFile}
                      >
                        <FaReceipt /> {order.resultFile ? 'Download Image' : 'Image Not Ready'}
                      </button>
                    </div>
                    
                    {order.resultFile && (
                      <div style={{width: '100%', marginTop: '10px'}}>
                        <div style={{padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '4px', border: '1px solid #bbf7d0', marginBottom: '10px'}}>
                          <p style={{margin: 0, fontSize: '12px', color: '#166534', fontWeight: '500'}}>
                            🖼️ {order.resultFile.name} • Uploaded: {new Date(order.resultFile.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
                          <img 
                            src={order.resultFile.data} 
                            alt="Lab Test Result" 
                            style={{
                              maxWidth: '100%', 
                              maxHeight: '200px', 
                              borderRadius: '4px',
                              border: '1px solid #d1d5db',
                              cursor: 'pointer'
                            }}
                            onClick={() => window.open(order.resultFile.data, '_blank')}
                          />
                          <p style={{margin: '8px 0 0 0', fontSize: '11px', color: '#6b7280'}}>
                            Click image to view full size
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
            ))
          ) : (
            <div className="empty-state">
              <FaShoppingBag className="empty-icon" />
              <h3>
                {orderFilter === 'pharmacy' ? 'No Pharmacy Orders' :
                 orderFilter === 'lab_test' ? 'No Lab Test Orders' : 'No Orders Yet'}
              </h3>
              <p>
                {orderFilter === 'pharmacy' ? 'Your pharmacy orders will appear here' :
                 orderFilter === 'lab_test' ? 'Your lab test bookings will appear here' :
                 'Your orders will appear here once you make a purchase'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNotifications = () => (
    <div className="account-section">
      <div className="section-header">
        <h2>Notifications</h2>
        <button className="clear-btn">Clear All</button>
      </div>

      <div className="notifications-list">
        {currentUser?.notifications?.length > 0 ? (
          currentUser.notifications.map((notification, index) => (
            <motion.div
              key={index}
              className={`notification-card ${notification.type}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="notification-icon">
                {notification.type === 'success' ? '✅' :
                 notification.type === 'error' ? '❌' :
                 notification.type === 'warning' ? '⚠️' : 'ℹ️'}
              </div>
              <div className="notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-state">
            <FaBell className="empty-icon" />
            <h3>No Notifications</h3>
            <p>You're all caught up! Notifications will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="account-section">
      <div className="section-header">
        <h2>App Settings</h2>
      </div>

      <div className="settings-groups">
        <div className="settings-group">
          <h3>Preferences</h3>
          <div className="setting-item">
            <div className="setting-info">
              <FaMoon />
              <div>
                <label>Dark Mode</label>
                <p>Switch to dark theme</p>
              </div>
            </div>
            <div className="setting-control">
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <FaBell />
              <div>
                <label>Push Notifications</label>
                <p>Receive order updates and offers</p>
              </div>
            </div>
            <div className="setting-control">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <FaLanguage />
              <div>
                <label>Language</label>
                <p>Choose your preferred language</p>
              </div>
            </div>
            <div className="setting-control">
              <select className="setting-select">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3>Security</h3>
          <div className="setting-item">
            <div className="setting-info">
              <FaShieldAlt />
              <div>
                <label>Two-Factor Authentication</label>
                <p>Add extra security to your account</p>
              </div>
            </div>
            <div className="setting-control">
              <button className="setting-btn">Enable</button>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <FaCreditCard />
              <div>
                <label>Saved Payment Methods</label>
                <p>Manage your payment options</p>
              </div>
            </div>
            <div className="setting-control">
              <button className="setting-btn">Manage</button>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3>Support</h3>
          <div className="setting-item">
            <div className="setting-info">
              <FaQuestionCircle />
              <div>
                <label>Help & FAQ</label>
                <p>Get answers to common questions</p>
              </div>
            </div>
            <div className="setting-control">
              <button className="setting-btn">View</button>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <FaPhone />
              <div>
                <label>Contact Support</label>
                <p>Reach out to our support team</p>
              </div>
            </div>
            <div className="setting-control">
              <button className="setting-btn">Contact</button>
            </div>
          </div>
        </div>
      </div>

      <div className="danger-zone">
        <h3>Account Actions</h3>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="account-section">
      <div className="section-header">
        <h2>My Appointments</h2>
        <div className="appointment-stats">
          <span className="stat-item">
            {appointments.length} Total Appointments
          </span>
        </div>
      </div>

      {loadingAppointments ? (
        <div className="loading-state">
          <p>Loading appointments...</p>
        </div>
      ) : (
        <>
          <div className="appointments-grid">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id || index}
                  className="appointment-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    marginBottom: '16px'
                  }}
                >
                  <div className="appointment-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div className="doctor-info">
                      <h3 style={{ margin: '0 0 4px 0', color: '#1a202c', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaUserMd style={{ color: '#3b82f6' }} />
                        {appointment.doctor_name || appointment.doctorName || appointment.doctor || 'Dr. Smith'}
                      </h3>
                      <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaStethoscope style={{ color: '#8b5cf6' }} />
                        {appointment.specialization || 'General Medicine'}
                      </p>
                      <p style={{ margin: '0', color: '#6b7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaHospital style={{ color: '#10b981' }} />
                        {appointment.hospital_name || appointment.hospital || 'Apollo Hospital'}
                      </p>
                    </div>
                    <div className="appointment-status">
                      <span 
                        className={`status-badge ${appointment.appointment_status || appointment.status || 'confirmed'}`}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: (appointment.appointment_status || appointment.status) === 'Confirmed' || (appointment.appointment_status || appointment.status) === 'confirmed' ? '#dcfce7' : '#fef3c7',
                          color: (appointment.appointment_status || appointment.status) === 'Confirmed' || (appointment.appointment_status || appointment.status) === 'confirmed' ? '#166534' : '#92400e',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FaCheckCircle />
                        {(appointment.appointment_status || appointment.status || 'confirmed').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="appointment-details" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div className="detail-item">
                      <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '4px' }}>DATE & TIME</label>
                      <p style={{ margin: 0, color: '#1a202c', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaCalendarAlt style={{ color: '#f59e0b' }} />
                        {appointment.appointment_date || appointment.date || 'Sep 15, 2024'} at {appointment.appointment_time || appointment.time || '10:00 AM'}
                      </p>
                    </div>
                    
                    <div className="detail-item">
                      <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '4px' }}>CONSULTATION TYPE</label>
                      <p style={{ margin: 0, color: '#1a202c', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {(appointment.consultation_type || appointment.consultationType) === 'Video Call' || (appointment.consultation_type || appointment.consultationType) === 'video' ? (
                          <><FaVideo style={{ color: '#8b5cf6' }} /> Video Call</>
                        ) : (
                          <><FaHospital style={{ color: '#10b981' }} /> In-Person</>
                        )}
                      </p>
                    </div>

                  </div>

                  <div className="appointment-instructions" style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Instructions:</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>
                      {(appointment.consultation_type || appointment.consultationType) === 'Video Call' || (appointment.consultation_type || appointment.consultationType) === 'video'
                        ? 'Please ensure you have a stable internet connection. You will receive a video call link 15 minutes before your appointment.'
                        : 'Please arrive 15 minutes early for your appointment. Bring a valid ID and any previous medical records.'}
                    </p>
                  </div>

                  <div className="appointment-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                      className="action-btn primary"
                      onClick={() => {
                        alert(`Appointment Details:\n\nDoctor: ${appointment.doctor_name || appointment.doctorName || appointment.doctor || 'Dr. Smith'}\nSpecialization: ${appointment.specialization || 'General Medicine'}\nHospital: ${appointment.hospital_name || appointment.hospital || 'Apollo Hospital'}\nDate: ${appointment.appointment_date || appointment.date || 'Sep 15, 2024'}\nTime: ${appointment.appointment_time || appointment.time || '10:00 AM'}\nStatus: ${appointment.appointment_status || appointment.status || 'confirmed'}`);
                      }}
                      style={{ 
                        background: '#3b82f6', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 16px', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FaEye /> View Details
                    </button>
                    {((appointment.consultation_type || appointment.consultationType) === 'Video Call' || (appointment.consultation_type || appointment.consultationType) === 'video') && (
                      <button 
                        className="action-btn video"
                        style={{ 
                          background: '#8b5cf6', 
                          color: 'white', 
                          border: 'none', 
                          padding: '8px 16px', 
                          borderRadius: '6px', 
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <FaVideo /> Join Video Call
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                <FaCalendarAlt style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px 0', color: '#374151' }}>No Appointments Yet</h3>
                <p style={{ margin: '0 0 20px 0' }}>Your upcoming appointments will appear here</p>
                <button 
                  onClick={() => navigate('/doctor-appointment')}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>

        </>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfile();
      case 'appointments': return renderAppointments();
      case 'medicine': return <MedicineHistory />;
      case 'orders': return renderOrders();
      case 'notifications': return renderNotifications();
      case 'settings': return renderSettings();
      default: return renderProfile();
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Sidebar */}
        <div className="account-sidebar">
          <div className="sidebar-header">
            <div className="user-avatar">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div className="user-info">
              <h3>{currentUser?.name || 'User'}</h3>
              <p>{currentUser?.email || 'user@example.com'}</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            {tabs.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                style={{ '--item-color': item.color }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="account-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        orderData={selectedOrder}
      />
    </div>
  );
};

export default AccountPage;
