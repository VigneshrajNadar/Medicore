import React, { createContext, useContext, useState, useEffect } from 'react';
import userDB from '../utils/userDatabase';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicineHistory, setMedicineHistory] = useState({
    donations: [],
    requests: [],
    visits: []
  });

  useEffect(() => {
    // Load current user on app start
    const user = userDB.getCurrentUser();
    setCurrentUser(user);
    
    // Load medicine history from localStorage
    const savedHistory = localStorage.getItem('medicineHistory');
    if (savedHistory) {
      setMedicineHistory(JSON.parse(savedHistory));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = userDB.loginUser(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('userId', result.user.id);
    }
    return result;
  };

  const logout = () => {
    userDB.logout();
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  const updateUser = (updateData) => {
    if (currentUser) {
      const updatedUser = userDB.updateUser(currentUser.id, updateData);
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const addMedicineDonation = (donationData) => {
    const donation = {
      id: `DON${Date.now()}`,
      ...donationData,
      donatedDate: new Date().toISOString().split('T')[0],
      status: 'awaiting_center_assignment',
      recipient: 'Awaiting Center Assignment'
    };
    setMedicineHistory(prev => ({
      ...prev,
      donations: [donation, ...prev.donations]
    }));
    // Save to localStorage
    const updatedHistory = {
      ...medicineHistory,
      donations: [donation, ...medicineHistory.donations]
    };
    localStorage.setItem('medicineHistory', JSON.stringify(updatedHistory));
  };

  const addMedicineRequest = (requestData) => {
    const request = {
      id: `REQ${Date.now()}`,
      ...requestData,
      medicine: requestData.selectedMedicines?.join(', ') || 'Medicine Request',
      quantity: 'As prescribed',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'awaiting_center_assignment',
      estimatedFulfillment: 'Awaiting Center Assignment'
    };
    setMedicineHistory(prev => ({
      ...prev,
      requests: [request, ...prev.requests]
    }));
    // Save to localStorage
    const updatedHistory = {
      ...medicineHistory,
      requests: [request, ...medicineHistory.requests]
    };
    localStorage.setItem('medicineHistory', JSON.stringify(updatedHistory));
  };

  const addCenterVisit = (visitData) => {
    const visit = {
      id: `VIS${Date.now()}`,
      ...visitData,
      visitDate: visitData.visitDate,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'confirmed',
      time: visitData.time || '10:00 AM'
    };
    setMedicineHistory(prev => ({
      ...prev,
      visits: [visit, ...prev.visits]
    }));
    // Save to localStorage
    const updatedHistory = {
      ...medicineHistory,
      visits: [visit, ...medicineHistory.visits]
    };
    localStorage.setItem('medicineHistory', JSON.stringify(updatedHistory));
  };

  const createUser = async (userData) => {
    try {
      // Check if user already exists
      const existingUser = userDB.getUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, message: 'User with this email already exists' };
      }

      // Create new user
      const newUser = userDB.createUser(userData);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, message: 'Failed to create user' };
    }
  };

  const addHealthRecord = (recordType, recordData) => {
    if (currentUser) {
      const success = userDB.addHealthRecord(currentUser.id, recordType, recordData);
      if (success) {
        const updatedUser = userDB.getCurrentUser();
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return success;
    }
    return false;
  };

  const updateVitals = (vitalsData) => {
    if (currentUser) {
      const success = userDB.updateVitals(currentUser.id, vitalsData);
      if (success) {
        const updatedUser = userDB.getCurrentUser();
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return success;
    }
    return false;
  };

  const addOrder = (orderData) => {
    if (currentUser) {
      const order = userDB.addOrder(currentUser.id, orderData);
      if (order) {
        const updatedUser = userDB.getCurrentUser();
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Add notification for new order
        userDB.addNotification(currentUser.id, {
          title: 'Order Placed Successfully',
          message: `Your order #${order.id} has been placed and is being processed.`,
          type: 'success'
        });
      }
      return order;
    }
    return null;
  };

  const addNotification = (notificationData) => {
    if (currentUser) {
      const notification = userDB.addNotification(currentUser.id, notificationData);
      if (notification) {
        const updatedUser = userDB.getCurrentUser();
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return notification;
    }
    return null;
  };

  const updateCart = (cartItems) => {
    if (currentUser) {
      const success = userDB.updateCart(currentUser.id, cartItems);
      if (success) {
        const updatedUser = userDB.getCurrentUser();
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return success;
    }
    return false;
  };

  const addToFavorites = (type, itemId, itemData) => {
    if (currentUser) {
      const success = userDB.addToFavorites(currentUser.id, type, itemId, itemData);
      if (success) {
        const updatedUser = userDB.getCurrentUser();
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return success;
    }
    return false;
  };

  const getUserStats = () => {
    if (currentUser) {
      return userDB.getUserStats(currentUser.id);
    }
    return null;
  };

  const markNotificationAsRead = (notificationId) => {
    if (currentUser) {
      const user = { ...currentUser };
      const notification = user.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        const updatedUser = userDB.updateUser(currentUser.id, user);
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    updateUser,
    createUser,
    medicineHistory,
    addMedicineDonation,
    addMedicineRequest,
    addCenterVisit,
    addHealthRecord,
    updateVitals,
    addOrder,
    addNotification,
    updateCart,
    addToFavorites,
    getUserStats,
    markNotificationAsRead
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
