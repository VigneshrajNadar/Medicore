import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaFlask,
  FaDollarSign,
  FaCalendarDay,
  FaChartBar,
  FaEye,
  FaUpload,
  FaCheckCircle,
  FaSignOutAlt,
  FaRupeeSign,
  FaChartLine,
  FaBox,
  FaClipboardList,
  FaUserEdit,
  FaWarehouse,
  FaPlus,
  FaEdit,
  FaTrash,
  FaDownload,
  FaArrowUp,
  FaSearch,
  FaBan,
  FaUserCheck,
  FaFileExport,
  FaHandHoldingHeart
} from 'react-icons/fa';
import StorageManager from '../../utils/storageManager';
import MedicineManagement from './MedicineManagement';
import * as api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // MediCore Logo Component
  const MediCoreLogo = () => (
    <div className="medicore-logo">
      <div className="logo-icon">
        <FaFlask className="flask-icon" />
        <div className="plus-sign">+</div>
      </div>
      <span className="logo-text">MediCore</span>
    </div>
  );
  const [stats, setStats] = useState({
    totalUsers: 0,
    pharmacyOrders: [],
    labTestOrders: [],
    totalProducts: 10000,
    totalRevenue: 0,
    monthlyRevenue: 0,
    todayOrders: 0
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: '', price: '', stock: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [inventorySearchTerm, setInventorySearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadAdminData();
    loadInventoryItems();
  }, []);

  const loadInventoryItems = () => {
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');

    // Add sample data if inventory is empty
    if (inventory.length === 0) {
      const sampleItems = [
        {
          id: 1,
          name: 'Paracetamol 500mg',
          category: 'OTC Medicines',
          price: 25,
          stock: 150,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Vitamin D3 Tablets',
          category: 'Vitamins & Supplements',
          price: 180,
          stock: 8,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Hand Sanitizer 500ml',
          category: 'Personal Care',
          price: 120,
          stock: 45,
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          name: 'Digital Thermometer',
          category: 'Health Devices',
          price: 350,
          stock: 25,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('inventory', JSON.stringify(sampleItems));
      setInventoryItems(sampleItems);
    } else {
      setInventoryItems(inventory);
    }
  };

  const loadStats = () => {
    loadAdminData();
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.price && newItem.stock) {
      const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
      const item = {
        id: Date.now(),
        ...newItem,
        price: parseFloat(newItem.price),
        stock: parseInt(newItem.stock),
        createdAt: new Date().toISOString()
      };
      inventory.push(item);
      localStorage.setItem('inventory', JSON.stringify(inventory));
      setInventoryItems(inventory);
      setNewItem({ name: '', category: '', price: '', stock: '' });
      setShowAddForm(false);
      loadStats();
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      stock: item.stock.toString()
    });
    setShowAddForm(true);
  };

  const handleUpdateItem = () => {
    if (newItem.name && newItem.category && newItem.price && newItem.stock) {
      const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
      const updatedInventory = inventory.map(item =>
        item.id === editingItem.id
          ? { ...item, ...newItem, price: parseFloat(newItem.price), stock: parseInt(newItem.stock) }
          : item
      );
      localStorage.setItem('inventory', JSON.stringify(updatedInventory));
      setInventoryItems(updatedInventory);
      setNewItem({ name: '', category: '', price: '', stock: '' });
      setShowAddForm(false);
      setEditingItem(null);
      loadStats();
    }
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
      const updatedInventory = inventory.filter(item => item.id !== itemId);
      localStorage.setItem('inventory', JSON.stringify(updatedInventory));
      setInventoryItems(updatedInventory);
      loadStats();
    }
  };

  const loadAdminData = async () => {
    try {
      // Fetch data from real API
      const [users, allOrders, allLabTests] = await Promise.all([
        api.getUsers(),
        api.getAllOrders(),
        api.getAllLabTests()
      ]);

      const allPharmacyOrders = allOrders.filter(o => o.order_type === 'pharmacy' || o.orderType === 'pharmacy');
      const pharmacyLabTests = allLabTests;

      let totalRevenue = 0;
      let monthlyRevenue = 0;
      let todayOrders = 0;

      const today = new Date().toDateString();
      const thisMonth = new Date().getMonth();

      // Process orders for revenue
      allOrders.forEach(order => {
        const orderDate = new Date(order.created_at || order.date || order.createdAt);
        const orderTotal = parseFloat(order.total_amount || order.total) || 0;

        totalRevenue += orderTotal;
        if (orderDate.getMonth() === thisMonth) monthlyRevenue += orderTotal;
        if (orderDate.toDateString() === today) todayOrders++;
      });

      // Process lab tests for revenue
      allLabTests.forEach(test => {
        const testDate = new Date(test.created_at || test.test_date || test.date);
        const testTotal = parseFloat(test.total_amount || test.price) || 0;

        totalRevenue += testTotal;
        if (testDate.getMonth() === thisMonth) monthlyRevenue += testTotal;
        if (testDate.toDateString() === today) todayOrders++;
      });

      setStats({
        totalUsers: users.length,
        pharmacyOrders: allPharmacyOrders.map(o => ({
          ...o,
          id: o._id || o.id,
          userName: o.user_id?.name || o.user_name || 'User',
          userEmail: o.user_id?.email || o.user_email || 'No email',
          total: o.total_amount || o.total,
          status: o.status || 'pending'
        })),
        labTestOrders: allLabTests.map(o => ({
          ...o,
          id: o._id || o.id,
          userName: o.user_id?.name || o.patient_name || 'Patient',
          userEmail: o.user_id?.email || o.user_email || 'No email',
          testName: o.product_name || o.test_name || 'Lab Test',
          total: o.total_amount || o.price,
          status: o.status || 'pending'
        })),
        totalProducts: 10000,
        totalRevenue,
        monthlyRevenue,
        todayOrders,
        allUsers: users
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      // Fallback logic for demo
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      setStats(prev => ({ ...prev, totalUsers: users.length }));
    }
  };

  const updateOrderStatus = async (orderId, newStatus, orderType) => {
    try {
      if (orderType === 'pharmacy') {
        await api.updateOrder(orderId, { status: newStatus });
        alert('Order updated successfully');
      } else {
        await api.updateLabTest(orderId, { status: newStatus });
        alert('Lab Test updated successfully');
      }
      loadAdminData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status: ' + error.message);
    }
  };

  const handleFileUpload = async (orderId, file) => {
    if (file && file.type.startsWith('image/')) {
      // Lower limit to 2MB to fit perfectly within Vercel's 4.5MB serverless function payload limit (Base64 encoding adds ~33% overhead)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size too large. Please upload an image under 2MB to ensure successful server processing.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async function (e) {
        try {
          const base64Data = e.target.result;

          const resultFile = {
            name: file.name,
            size: file.size,
            uploadDate: new Date().toISOString(),
            data: base64Data,
            type: file.type
          };

          await api.updateLabTest(orderId, {
            status: 'completed',
            resultFile
          });

          // Manual local update for immediate feedback
          // Update local state to show feedback immediately with preview
          setUploadedFile(prev => ({ ...prev, [orderId]: file.name }));

          // Force a local update of the stats to include the new file immediately without waiting for reload
          const updatedOrders = stats.labTestOrders.map(order =>
            order.id === orderId ? { ...order, status: 'completed', resultFile } : order
          );

          // Mutate stats directly for immediate feedback (React state update would be better but stats is likely local var or from hook not shown)
          // Based on context, loadAdminData refetches, so we temporarily override
          setStats(prev => ({
            ...prev,
            labTestOrders: updatedOrders
          }));

          loadAdminData(); // Retrigger fetch to ensure consistency
          alert('Lab test result uploaded successfully!');
        } catch (error) {
          console.error('File processing error:', error);
          alert('Error processing file: ' + error.message);
        }
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file only (JPG, PNG, GIF, etc.)');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#3b82f6';
      case 'packed': return '#8b5cf6';
      case 'shipped': return '#06b6d4';
      case 'out_for_delivery': return '#f97316';
      case 'delivered': return '#10b981';
      case 'sample_collection': return '#3b82f6';
      case 'tested': return '#8b5cf6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  // User Management Functions
  const getAllUsers = () => {
    const apolloUsers = JSON.parse(localStorage.getItem('apolloUsers') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const allUsers = [...users];
    Object.values(apolloUsers).forEach(user => {
      if (!allUsers.find(u => u.id === user.id)) {
        allUsers.push(user);
      }
    });

    return allUsers.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleUserStatus = (userId) => {
    const apolloUsers = JSON.parse(localStorage.getItem('apolloUsers') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Update in apolloUsers
    if (apolloUsers[userId]) {
      apolloUsers[userId].isActive = !apolloUsers[userId].isActive;
    }

    // Update in users array
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, isActive: !user.isActive };
      }
      return user;
    });

    localStorage.setItem('apolloUsers', JSON.stringify(apolloUsers));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadAdminData();
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const apolloUsers = JSON.parse(localStorage.getItem('apolloUsers') || '{}');
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Remove from apolloUsers
      delete apolloUsers[userId];

      // Remove from users array
      const updatedUsers = users.filter(user => user.id !== userId);

      localStorage.setItem('apolloUsers', JSON.stringify(apolloUsers));
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      loadAdminData();
    }
  };

  // Bulk Operations
  const bulkUpdateOrderStatus = (orderIds, newStatus, orderType) => {
    orderIds.forEach(orderId => {
      updateOrderStatus(orderId, newStatus, orderType);
    });
  };

  // Analytics Functions
  const getAnalyticsData = () => {
    const today = new Date();
    const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const allOrders = [...stats.pharmacyOrders, ...stats.labTestOrders];

    const last7DaysOrders = allOrders.filter(order =>
      new Date(order.date || order.createdAt) >= last7Days
    );

    const last30DaysOrders = allOrders.filter(order =>
      new Date(order.date || order.createdAt) >= last30Days
    );

    return {
      totalOrdersLast7Days: last7DaysOrders.length,
      totalOrdersLast30Days: last30DaysOrders.length,
      revenueLast7Days: last7DaysOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0),
      revenueLast30Days: last30DaysOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0),
      topCustomers: getAllUsers().sort((a, b) => (b.orders?.length || 0) - (a.orders?.length || 0)).slice(0, 5),
      orderStatusBreakdown: {
        pending: allOrders.filter(o => o.status === 'pending').length,
        confirmed: allOrders.filter(o => o.status === 'confirmed').length,
        completed: allOrders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
      }
    };
  };

  const renderOverview = () => (
    <div className="admin-overview">
      <div className="stats-grid">
        <motion.div
          className="stat-card revenue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaRupeeSign className="stat-icon revenue" />
          <div className="stat-number">₹{stats.totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-trend">+12% from last month</div>
        </motion.div>

        <motion.div
          className="stat-card monthly"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaChartLine className="stat-icon monthly" />
          <div className="stat-number">₹{stats.monthlyRevenue.toLocaleString()}</div>
          <div className="stat-label">This Month</div>
          <div className="stat-trend">+8% from last month</div>
        </motion.div>

        <motion.div
          className="stat-card users"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaUsers className="stat-icon users" />
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-label">Registered Users</div>
          <div className="stat-trend">+{stats.todayOrders} today</div>
        </motion.div>

        <motion.div
          className="stat-card orders"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaShoppingCart className="stat-icon orders" />
          <div className="stat-number">{stats.pharmacyOrders.length + stats.labTestOrders.length}</div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-trend">{stats.todayOrders} today</div>
        </motion.div>

        <motion.div
          className="stat-card lab"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FaFlask className="stat-icon lab" />
          <div className="stat-number">{stats.labTestOrders.length}</div>
          <div className="stat-label">Lab Test Orders</div>
          <div className="stat-trend">{stats.labTestOrders.filter(o => o.status === 'completed').length} completed</div>
        </motion.div>

        <motion.div
          className="stat-card products"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FaBox className="stat-icon products" />
          <div className="stat-number">{stats.totalProducts.toLocaleString()}</div>
          <div className="stat-label">Products Available</div>
          <div className="stat-trend">12 categories</div>
        </motion.div>
      </div>

      <div className="analytics-section">
        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3><FaChartBar /> Quick Analytics</h3>
          <div className="analytics-grid">
            <div className="analytics-item">
              <span className="analytics-label">Avg Order Value</span>
              <span className="analytics-value">₹{Math.round(stats.totalRevenue / (stats.pharmacyOrders.length + stats.labTestOrders.length) || 0)}</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Pharmacy Orders</span>
              <span className="analytics-value">{stats.pharmacyOrders.length}</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Lab Test Orders</span>
              <span className="analytics-value">{stats.labTestOrders.length}</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Pending Orders</span>
              <span className="analytics-value">{[...stats.pharmacyOrders, ...stats.labTestOrders].filter(o => o.status === 'pending').length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderPharmacyOrders = () => (
    <div className="orders-section">
      <h3>Pharmacy Orders Management</h3>
      <div className="orders-list">
        {stats.pharmacyOrders.map((order, index) => (
          <motion.div
            key={order.id}
            className="order-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="order-header">
              <div className="order-info">
                <h4>Order #{order.id}</h4>
                <p>Customer: {order.userName}</p>
                <p>Email: {order.userEmail}</p>
                <p>Total: ₹{order.total}</p>
              </div>
              <div className="order-status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <div className="order-actions">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value, 'pharmacy')}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="packed">Packed</option>
                <option value="shipped">Shipped</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <div className="order-items">
              <h5>Items:</h5>
              {order.items && order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLabTestOrders = () => (
    <div className="orders-section">
      <h3>Lab Test Orders Management</h3>
      <div className="orders-list">
        {stats.labTestOrders.map((order, index) => (
          <motion.div
            key={order.id}
            className="order-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="order-header">
              <div className="order-info">
                <h4>Lab Test #{order.id}</h4>
                <p>Customer: {order.userName}</p>
                <p>Email: {order.userEmail}</p>
                <p>Test: {order.testName || 'Lab Test'}</p>
                <p>Total: ₹{order.total}</p>
              </div>
              <div className="order-status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <div className="order-actions">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value, 'lab_test')}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="sample_collection">Arriving for Sample Collection</option>
                <option value="tested">Sample Tested</option>
                <option value="completed">Results Available</option>
              </select>


              <div className="file-upload-section" style={{ display: 'block', backgroundColor: '#f8fafc', padding: '15px', margin: '10px 0', border: '2px dashed #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e293b', margin: '0 0 15px 0' }}>📋 Upload Lab Test Results Image (Status: {order.status}) {order.resultFile ? '✅ Already Uploaded' : '⏳ Ready for Upload'}</h4>
                {!order.resultFile && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUploadedFile({ ...uploadedFile, [order.id]: e.target.files[0] })}
                      className="file-input"
                      id={`file-${order.id}`}
                    />
                    <label htmlFor={`file-${order.id}`} className="file-label">
                      <FaUpload /> Choose Image File
                    </label>
                    {uploadedFile[order.id] && (
                      <div className="upload-preview">
                        <p>📄 Selected: {uploadedFile[order.id].name}</p>
                        <button
                          onClick={() => handleFileUpload(order.id, uploadedFile[order.id])}
                          className="upload-btn"
                        >
                          <FaUpload /> Upload Image
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {order.resultFile && (
                  <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
                    <p style={{ margin: 0, color: '#166534', fontWeight: '500' }}>✅ Image Already Uploaded: {order.resultFile.name}</p>
                  </div>
                )}
              </div>



              {order.resultFile && (
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
                  <p style={{ margin: '0 0 10px 0', color: '#166534', fontWeight: '500' }}>✅ Result uploaded: {order.resultFile.name}</p>
                  {order.resultFile.data && (
                    <div className="image-preview" style={{ marginTop: '10px' }}>
                      <img
                        src={order.resultFile.data}
                        alt="Lab Result"
                        style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', border: '1px solid #ddd' }}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = order.resultFile.data;
                      link.download = order.resultFile.name;
                      link.click();
                    }}
                    className="download-btn"
                    style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <FaEye /> Download/View Full Image
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // User Management Component
  const renderUserManagement = () => (
    <div className="users-section">
      <div className="section-header">
        <h3><FaUsers /> User Management</h3>
        <div className="search-filter-bar">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="users-grid">
        {getAllUsers().map((user, index) => (
          <motion.div
            key={user.id}
            className="user-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="user-header">
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>Orders: {user.orders?.length || 0}</p>
                <p>Joined: {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
              <div className="user-status">
                <span
                  className={`status-badge ${user.isActive !== false ? 'active' : 'inactive'}`}
                  style={{ backgroundColor: user.isActive !== false ? '#10b981' : '#ef4444' }}
                >
                  {user.isActive !== false ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>

            <div className="user-actions">
              <button
                onClick={() => toggleUserStatus(user.id)}
                className={`action-btn ${user.isActive !== false ? 'ban' : 'activate'}`}
              >
                {user.isActive !== false ? <FaBan /> : <FaUserCheck />}
                {user.isActive !== false ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="action-btn delete"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Advanced Analytics Component
  const renderAnalytics = () => {
    const analyticsData = getAnalyticsData();

    return (
      <div className="analytics-section">
        <h3><FaChartBar /> Advanced Analytics & Reports</h3>

        <div className="analytics-grid-advanced">
          <motion.div
            className="analytics-card-large"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4><FaArrowUp /> Revenue Trends</h4>
            <div className="trend-stats">
              <div className="trend-item">
                <span className="trend-label">Last 7 Days</span>
                <span className="trend-value">₹{analyticsData.revenueLast7Days.toLocaleString()}</span>
                <span className="trend-change positive">
                  <FaArrowUp /> +12%
                </span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Last 30 Days</span>
                <span className="trend-value">₹{analyticsData.revenueLast30Days.toLocaleString()}</span>
                <span className="trend-change positive">
                  <FaArrowUp /> +8%
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="analytics-card-large"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4><FaUsers /> Top Customers</h4>
            <div className="top-customers-list">
              {analyticsData.topCustomers.map((customer, index) => (
                <div key={customer.id} className="customer-item">
                  <span className="customer-rank">#{index + 1}</span>
                  <div className="customer-info">
                    <span className="customer-name">{customer.name}</span>
                    <span className="customer-orders">{customer.orders?.length || 0} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="analytics-card-large"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4><FaChartLine /> Order Status Breakdown</h4>
            <div className="status-breakdown">
              <div className="status-item">
                <span className="status-label">Pending</span>
                <span className="status-count">{analyticsData.orderStatusBreakdown.pending}</span>
                <div className="status-bar">
                  <div
                    className="status-fill pending"
                    style={{ width: `${(analyticsData.orderStatusBreakdown.pending / (stats.pharmacyOrders.length + stats.labTestOrders.length)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="status-item">
                <span className="status-label">Confirmed</span>
                <span className="status-count">{analyticsData.orderStatusBreakdown.confirmed}</span>
                <div className="status-bar">
                  <div
                    className="status-fill confirmed"
                    style={{ width: `${(analyticsData.orderStatusBreakdown.confirmed / (stats.pharmacyOrders.length + stats.labTestOrders.length)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="status-item">
                <span className="status-label">Completed</span>
                <span className="status-count">{analyticsData.orderStatusBreakdown.completed}</span>
                <div className="status-bar">
                  <div
                    className="status-fill completed"
                    style={{ width: `${(analyticsData.orderStatusBreakdown.completed / (stats.pharmacyOrders.length + stats.labTestOrders.length)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="export-section">
          <h4><FaFileExport /> Export Reports</h4>
          <div className="export-buttons">
            <button className="export-btn" onClick={() => exportData('users')}>
              <FaDownload /> Export Users
            </button>
            <button className="export-btn" onClick={() => exportData('orders')}>
              <FaDownload /> Export Orders
            </button>
            <button className="export-btn" onClick={() => exportData('analytics')}>
              <FaDownload /> Export Analytics
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Inventory Management Component
  const renderInventoryManagement = () => {
    const filteredItems = inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(inventorySearchTerm.toLowerCase());
      const matchesCategory = filterCategory === '' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="inventory-section">
        <div className="section-header">
          <h3><FaWarehouse /> Inventory Management</h3>
          <button className="add-item-btn" onClick={() => setShowAddForm(!showAddForm)}>
            <FaPlus /> Add New Item
          </button>
        </div>

        {showAddForm && (
          <motion.div
            className="add-item-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4>{editingItem ? 'Edit Product' : 'Add New Product'}</h4>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Product Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Prescription Medicines">Prescription Medicines</option>
                <option value="OTC Medicines">OTC Medicines</option>
                <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Baby & Mother Care">Baby & Mother Care</option>
                <option value="Ayurvedic & Herbal">Ayurvedic & Herbal</option>
                <option value="Health Devices">Health Devices</option>
                <option value="Surgical Supplies">Surgical Supplies</option>
              </select>
              <input
                type="number"
                placeholder="Price (₹)"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={newItem.stock}
                onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button
                className="save-btn"
                onClick={editingItem ? handleUpdateItem : handleAddItem}
              >
                {editingItem ? <FaEdit /> : <FaPlus />}
                {editingItem ? 'Update Product' : 'Add Product'}
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingItem(null);
                  setNewItem({ name: '', category: '', price: '', stock: '' });
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Search and Filter Bar */}
        <div className="inventory-controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search products..."
              value={inventorySearchTerm}
              onChange={(e) => setInventorySearchTerm(e.target.value)}
            />
          </div>
          <select
            className="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Prescription Medicines">Prescription Medicines</option>
            <option value="OTC Medicines">OTC Medicines</option>
            <option value="Vitamins & Supplements">Vitamins & Supplements</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Baby & Mother Care">Baby & Mother Care</option>
            <option value="Ayurvedic & Herbal">Ayurvedic & Herbal</option>
            <option value="Health Devices">Health Devices</option>
            <option value="Surgical Supplies">Surgical Supplies</option>
          </select>
        </div>

        {/* Inventory Items List */}
        <div className="inventory-items">
          {filteredItems.length > 0 ? (
            <>
              <h4>Current Inventory ({filteredItems.length} items)</h4>
              <div className="items-grid">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="inventory-item-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="item-header">
                      <h5>{item.name}</h5>
                      <span className={`stock-badge ${item.stock < 10 ? 'low-stock' : 'in-stock'}`}>
                        {item.stock} in stock
                      </span>
                    </div>
                    <div className="item-details">
                      <p className="category">{item.category}</p>
                      <p className="price">₹{item.price}</p>
                      <p className="date">Added: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="item-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditItem(item)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-items">
              <p>No inventory items found. Add some products to get started!</p>
            </div>
          )}
        </div>

        <div className="inventory-stats">
          <div className="inventory-stat-card">
            <FaBox className="inventory-icon" />
            <div className="inventory-stat-info">
              <span className="inventory-stat-number">10,000+</span>
              <span className="inventory-stat-label">Total Products</span>
            </div>
          </div>
          <div className="inventory-stat-card">
            <FaWarehouse className="inventory-icon" />
            <div className="inventory-stat-info">
              <span className="inventory-stat-number">12</span>
              <span className="inventory-stat-label">Categories</span>
            </div>
          </div>
          <div className="inventory-stat-card low-stock">
            <FaWarehouse className="inventory-icon" />
            <div className="inventory-stat-info">
              <span className="inventory-stat-number">23</span>
              <span className="inventory-stat-label">Low Stock Items</span>
            </div>
          </div>
        </div>

        <div className="inventory-categories">
          <h4>Product Categories</h4>
          <div className="categories-grid">
            {[
              { name: 'Prescription Medicines', count: 2500, icon: '💊' },
              { name: 'OTC Medicines', count: 1800, icon: '🏥' },
              { name: 'Vitamins & Supplements', count: 1200, icon: '💪' },
              { name: 'Personal Care', count: 1500, icon: '🧴' },
              { name: 'Baby & Mother Care', count: 800, icon: '👶' },
              { name: 'Ayurvedic & Herbal', count: 900, icon: '🌿' },
              { name: 'Health Devices', count: 400, icon: '🩺' },
              { name: 'Surgical Supplies', count: 600, icon: '🏥' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className="category-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h5>{category.name}</h5>
                  <p>{category.count.toLocaleString()} items</p>
                </div>
                <div className="category-actions">
                  <button className="category-btn">
                    <FaEye /> View
                  </button>
                  <button className="category-btn">
                    <FaEdit /> Manage
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Export Data Function
  const exportData = (type) => {
    let data, filename;

    switch (type) {
      case 'users':
        data = getAllUsers();
        filename = 'users_export.json';
        break;
      case 'orders':
        data = [...stats.pharmacyOrders, ...stats.labTestOrders];
        filename = 'orders_export.json';
        break;
      case 'analytics':
        data = getAnalyticsData();
        filename = 'analytics_export.json';
        break;
      default:
        return;
    }

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = filename;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="admin-dashboard">
      <motion.div
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-left">
          <MediCoreLogo />
          <h1>Admin Dashboard</h1>
        </div>
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </motion.div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaClipboardList /> Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'pharmacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('pharmacy')}
        >
          <FaShoppingCart /> Pharmacy Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'labtest' ? 'active' : ''}`}
          onClick={() => setActiveTab('labtest')}
        >
          <FaFlask /> Lab Tests
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers /> User Management
        </button>
        <button
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <FaChartBar /> Analytics
        </button>
        <button
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          <FaBoxOpen /> Inventory
        </button>
        <button
          className={`tab-btn ${activeTab === 'medicine' ? 'active' : ''}`}
          onClick={() => setActiveTab('medicine')}
        >
          <FaHandHoldingHeart /> Medicine Management
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'pharmacy' && renderPharmacyOrders()}
        {activeTab === 'labtest' && renderLabTestOrders()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'inventory' && renderInventoryManagement()}
        {activeTab === 'medicine' && <MedicineManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
