import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 48px 16px 32px 16px;
  background: linear-gradient(120deg, #f8fafc 60%, #e3f0ff 100%);
  min-height: 100vh;
`;

const AdminTitle = styled.h1`
  color: #02475b;
  text-align: center;
  margin-bottom: 48px;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #02475b, #0087ba);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const StatCard = styled.div`
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid rgba(0, 135, 186, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0087ba;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #02475b;
  font-weight: 600;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #02475b, #0087ba);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(2, 71, 91, 0.3);
  }
`;

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalLabTests: 0
  });

  useEffect(() => {
    // Load stats from localStorage or API
    const labBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    setStats({
      totalUsers: 156, // Mock data
      totalOrders: cartItems.length + 89, // Mock + real cart data
      totalProducts: 10000, // From comprehensive database
      totalLabTests: labBookings.length
    });
  }, []);

  const handleViewLabBookings = () => {
    window.location.href = '/labtest?admin=1';
  };

  const handleViewOrders = () => {
    window.location.href = '/pharmacy';
  };

  const handleViewUsers = () => {
    alert('User management feature coming soon!');
  };

  const handleViewAnalytics = () => {
    alert('Analytics dashboard coming soon!');
  };

  return (
    <AdminContainer>
      <AdminTitle>MediCore Admin Panel</AdminTitle>
      
      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalUsers}</StatNumber>
          <StatLabel>Total Users</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalOrders}</StatNumber>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalProducts.toLocaleString()}</StatNumber>
          <StatLabel>Products Available</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalLabTests}</StatNumber>
          <StatLabel>Lab Test Bookings</StatLabel>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <ActionButton onClick={handleViewLabBookings}>
          View Lab Bookings
        </ActionButton>
        <ActionButton onClick={handleViewOrders}>
          View Orders
        </ActionButton>
        <ActionButton onClick={handleViewUsers}>
          Manage Users
        </ActionButton>
        <ActionButton onClick={handleViewAnalytics}>
          View Analytics
        </ActionButton>
      </QuickActions>
    </AdminContainer>
  );
};

export default AdminPanel;
