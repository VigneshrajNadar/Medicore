import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaUser, 
  FaHeart, 
  FaBell, 
  FaCog
} from 'react-icons/fa';
import styled from 'styled-components';

// Styled Components
const WidgetContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const WidgetCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const WidgetTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WidgetIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const WidgetContent = styled.div`
  color: #64748b;
  line-height: 1.6;
`;

const WidgetActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 600;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const OrderWidget = ({ data }) => (
  <WidgetCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <WidgetHeader>
      <WidgetTitle>
        <WidgetIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <FaShoppingCart />
        </WidgetIcon>
        📦 Recent Orders
      </WidgetTitle>
    </WidgetHeader>
    <WidgetContent>
      {data.orders && data.orders.length > 0 ? (
        data.orders.slice(0, 3).map((order, index) => (
          <div key={index} style={{ 
            padding: '1rem', 
            background: 'rgba(102, 126, 234, 0.05)', 
            borderRadius: '10px', 
            marginBottom: '0.5rem',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <div style={{ fontWeight: '600', color: '#1e293b' }}>Order #{order.orderId}</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Status: {order.status}</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total: ₹{order.total}</div>
          </div>
        ))
      ) : (
        <div style={{ color: '#666', fontStyle: 'italic' }}>No recent orders</div>
      )}
    </WidgetContent>
    <WidgetActions>
      <ActionButton onClick={() => window.location.href = '/pharmacy'}>View All Orders</ActionButton>
      <ActionButton onClick={() => alert('Order tracking feature coming soon!')}>Track Order</ActionButton>
    </WidgetActions>
  </WidgetCard>
);

const ProfileWidget = ({ data }) => (
  <WidgetCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <WidgetHeader>
      <WidgetTitle>
        <WidgetIcon style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
          <FaUser />
        </WidgetIcon>
        👤 Profile Overview
      </WidgetTitle>
    </WidgetHeader>
    <WidgetContent>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: '600', color: '#1e293b' }}>{data.name || 'User Name'}</div>
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{data.email || 'user@example.com'}</div>
      </div>
      <div style={{ 
        padding: '1rem', 
        background: 'rgba(16, 185, 129, 0.05)', 
        borderRadius: '10px',
        border: '1px solid rgba(16, 185, 129, 0.1)'
      }}>
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Member since: {data.memberSince || '2024'}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Total orders: {data.totalOrders || '0'}
      </div>
      </div>
    </WidgetContent>
    <WidgetActions>
      <ActionButton onClick={() => window.location.href = '/profile'}>Edit Profile</ActionButton>
      <ActionButton onClick={() => window.location.href = '/profile'}>View Details</ActionButton>
    </WidgetActions>
  </WidgetCard>
);

const HealthWidget = ({ data }) => {
  const { currentUser } = useUser();
  
  return (
  <WidgetCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <WidgetHeader>
      <WidgetTitle>
        <WidgetIcon style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
          <FaHeart />
        </WidgetIcon>
        🏥 Health Tools
      </WidgetTitle>
    </WidgetHeader>
    <WidgetContent>
      <div style={{ 
        padding: '1rem', 
        background: 'rgba(245, 158, 11, 0.05)', 
        borderRadius: '10px',
        border: '1px solid rgba(245, 158, 11, 0.1)'
      }}>
        <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
          Available Health Tools: 14
        </div>
        {currentUser?.healthHistory?.vitals && (
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Latest Vitals:</div>
            <div style={{ fontSize: '0.8rem', color: '#1e293b' }}>
              HR: {currentUser.healthHistory.vitals.heartRate?.value || 'N/A'} {currentUser.healthHistory.vitals.heartRate?.unit || ''}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#1e293b' }}>
              BP: {currentUser.healthHistory.vitals.bloodPressure?.value || 'N/A'} {currentUser.healthHistory.vitals.bloodPressure?.unit || ''}
            </div>
          </div>
        )}
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Last updated: {currentUser?.healthHistory?.vitals?.heartRate?.lastUpdated ? new Date(currentUser.healthHistory.vitals.heartRate.lastUpdated).toLocaleDateString() : 'Never'}
        </div>
      </div>
    </WidgetContent>
    <WidgetActions>
      <ActionButton onClick={() => window.location.href = '/HealthTools'}>Open Health Tools</ActionButton>
      <ActionButton onClick={() => window.location.href = '/health-history'}>View History</ActionButton>
    </WidgetActions>
  </WidgetCard>
  );
};

const NotificationWidget = ({ data }) => (
  <WidgetCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <WidgetHeader>
      <WidgetTitle>
        <WidgetIcon style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
          <FaBell />
        </WidgetIcon>
        🔔 Notifications
      </WidgetTitle>
    </WidgetHeader>
    <WidgetContent>
      {data.notifications && data.notifications.length > 0 ? (
        data.notifications.slice(0, 3).map((notification, index) => (
          <div key={index} style={{ 
            padding: '0.75rem', 
            background: 'rgba(239, 68, 68, 0.05)', 
            borderRadius: '8px', 
            marginBottom: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.1)'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>{notification.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{notification.time}</div>
        </div>
        ))
      ) : (
        <div style={{ color: '#666', fontStyle: 'italic' }}>No new notifications</div>
      )}
    </WidgetContent>
    <WidgetActions>
      <ActionButton onClick={() => window.location.href = '/notifications'}>View All</ActionButton>
      <ActionButton onClick={() => window.location.href = '/notifications'}>Settings</ActionButton>
    </WidgetActions>
  </WidgetCard>
);

const QuickActionsWidget = ({ data }) => (
  <WidgetCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <WidgetHeader>
      <WidgetTitle>
        <WidgetIcon style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
          <FaCog />
        </WidgetIcon>
        ⚡ Quick Actions
      </WidgetTitle>
    </WidgetHeader>
    <WidgetContent>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <ActionButton 
          style={{ width: '100%', textAlign: 'center' }}
          onClick={() => window.location.href = '/labtest'}
        >
          📅 Book Lab Test
        </ActionButton>
        <ActionButton 
          style={{ width: '100%', textAlign: 'center' }}
          onClick={() => window.location.href = '/HealthTools'}
        >
          🏥 Health Tools
        </ActionButton>
        <ActionButton 
          style={{ width: '100%', textAlign: 'center' }}
          onClick={() => window.location.href = '/pharmacy'}
        >
          💊 Pharmacy
        </ActionButton>
        <ActionButton 
          style={{ width: '100%', textAlign: 'center' }}
          onClick={() => alert('Support chat coming soon! For now, please contact us at support@medicore.com')}
        >
          📞 Support
        </ActionButton>
      </div>
    </WidgetContent>
  </WidgetCard>
);

const WidgetSystem = ({ userType = 'user', pageType = 'dashboard' }) => {
  const { currentUser, getUserStats } = useUser();
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (!currentUser) {
          setLoading(false);
          return;
        }
        
        // Define available widgets based on page type
        let availableWidgets;
        if (pageType === 'dashboard') {
          availableWidgets = ['health'];
        } else if (pageType === 'profile') {
          availableWidgets = ['orders', 'notifications', 'actions'];
        } else {
          availableWidgets = userType === 'admin' 
            ? ['orders', 'health', 'actions', 'notifications']
            : ['orders', 'health', 'actions', 'notifications'];
        }
        
        setWidgets(availableWidgets);
        setLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
        setLoading(false);
      }
    };

    loadUserData();
  }, [currentUser, pageType]);

  const renderWidget = (widgetType) => {
    if (!currentUser) return null;
    
    switch (widgetType) {
      case 'orders':
        return <OrderWidget data={currentUser} />;
      case 'health':
        return <HealthWidget data={currentUser} />;
      case 'notifications':
        return <NotificationWidget data={currentUser} />;
      case 'actions':
        return <QuickActionsWidget data={currentUser} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <WidgetContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '1.5rem', color: '#64748b' }}>Loading dashboard...</div>
          </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            {pageType === 'dashboard' ? `Health Dashboard - ${currentUser?.name || 'User'}` : 
             pageType === 'profile' ? `Profile Overview - ${currentUser?.name || 'User'}` : 
             `Welcome back, ${currentUser?.name || 'User'}!`}
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#64748b',
            margin: 0
          }}>
            {pageType === 'dashboard' ? 'Track your health history and medical records' : 
             pageType === 'profile' ? 'Manage your orders, notifications, and quick actions' : 
             'Here\'s your personalized overview'}
          </p>
        </div>

        <WidgetGrid>
          {widgets.map((widget, index) => (
            <motion.div
              key={widget}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {renderWidget(widget)}
            </motion.div>
          ))}
        </WidgetGrid>
      </motion.div>
    </WidgetContainer>
  );
};

export default WidgetSystem;
