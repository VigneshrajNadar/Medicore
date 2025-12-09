import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaCalendarAlt, FaHistory, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { BsClipboardData, BsCreditCard } from 'react-icons/bs';
import { MdLocalHospital, MdOutlineHealthAndSafety } from 'react-icons/md';
import { getProfile, getOrders } from '../../services/api';

// Animation variants
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ProfileHeader = styled(motion.div)`
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  border: 4px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    width: 60%;
    height: 60%;
    color: #4f46e5;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const UserDetails = styled.div`
  h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0.25rem 0;
    opacity: 0.9;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
    }
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin: 0 0 0.5rem;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 0.9rem;
  }
`;

const Section = styled(motion.section)`
  margin: 2rem 0;
  animation: ${fadeIn} 0.5s ease-out;
  
  h2 {
    color: #1f2937;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.75rem;
      color: #4f46e5;
    }
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const AppointmentCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .appointment-info {
    flex: 1;
    
    h3 {
      margin: 0 0 0.5rem;
      color: #111827;
    }
    
    p {
      margin: 0.25rem 0;
      color: #6b7280;
      display: flex;
      align-items: center;
      
      svg {
        margin-right: 0.5rem;
        color: #4f46e5;
      }
    }
  }
  
  .status {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: capitalize;
    
    &.scheduled {
      background: #dbeafe;
      color: #1d4ed8;
    }
    
    &.completed {
      background: #dcfce7;
      color: #166534;
    }
    
    &.cancelled {
      background: #fee2e2;
      color: #991b1b;
    }
  }
`;

const OrderCard = styled(Card)`
  h3 {
    margin: 0 0 1rem;
    color: #111827;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .order-status {
      font-size: 0.875rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-weight: 500;
      
      &.delivered {
        background: #dcfce7;
        color: #166534;
      }
      
      &.shipped {
        background: #dbeafe;
        color: #1d4ed8;
      }
      
      &.processing {
        background: #fef3c7;
        color: #92400e;
      }
    }
  }
  
  .order-details {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
    
    .items {
      flex: 1;
      
      p {
        margin: 0.5rem 0;
        color: #4b5563;
      }
    }
    
    .total {
      text-align: right;
      
      p {
        margin: 0.5rem 0;
        color: #111827;
        font-weight: 500;
      }
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ active }) => (active ? '#4f46e5' : '#6b7280')};
  border-bottom: 2px solid ${({ active }) => (active ? '#4f46e5' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #4f46e5;
  }
`;

const AnimatedUserProfile = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch this data from your API
        // const [profileData, appointmentsData, ordersData] = await Promise.all([
        //   getProfile(),
        //   getAppointments(),
        //   getOrders()
        // ]);
        
        // Mock data for demonstration
        const profileData = {
          name: 'Vignesh Raj',
          email: 'vignesh@example.com',
          phone: '+91 98765 43210',
          address: '123 Apollo Street, Chennai, TN 600001',
          joinDate: '2023-01-15',
          photo: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        
        const appointmentsData = [
          {
            id: 1,
            doctorName: 'Dr. Arjun Mehta',
            specialization: 'Cardiologist',
            date: '2025-09-15',
            time: '10:30 AM',
            status: 'scheduled',
            hospital: 'Apollo Hospital, Chennai'
          },
          {
            id: 2,
            doctorName: 'Dr. Priya Sharma',
            specialization: 'Dermatologist',
            date: '2025-09-20',
            time: '02:00 PM',
            status: 'scheduled',
            hospital: 'Apollo Speciality Hospital, Chennai'
          },
          {
            id: 3,
            doctorName: 'Dr. Amit Patel',
            specialization: 'Orthopedic Surgeon',
            date: '2025-08-10',
            time: '11:30 AM',
            status: 'completed',
            hospital: 'Apollo Hospital, Chennai'
          }
        ];
        
        const ordersData = [
          {
            id: 'APO123456',
            date: '2025-07-24',
            status: 'delivered',
            items: [
              { name: 'Paracetamol 500mg', qty: 2, price: 40 },
              { name: 'Vitamin C Tablets', qty: 1, price: 120 }
            ],
            total: 200,
            payment: 'Credit Card'
          },
          {
            id: 'APO123457',
            date: '2025-07-25',
            status: 'shipped',
            items: [
              { name: 'Cough Syrup', qty: 1, price: 90 }
            ],
            total: 90,
            payment: 'UPI'
          },
          {
            id: 'APO123458',
            date: '2025-07-20',
            status: 'delivered',
            items: [
              { name: 'Antihistamine', qty: 1, price: 150 },
              { name: 'Multivitamin', qty: 2, price: 200 }
            ],
            total: 350,
            payment: 'Net Banking'
          }
        ];
        
        setProfile(profileData);
        setAppointments(appointmentsData);
        setOrders(ordersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <ProfileContainer>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center h-64"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </motion.div>
      </ProfileContainer>
    );
  }
  
  if (error) {
    return (
      <ProfileContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </motion.div>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileHeader
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <UserInfo>
              <Avatar>
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} />
                ) : (
                  <FaUserCircle />
                )}
              </Avatar>
              <UserDetails>
                <h1>{profile.name}</h1>
                <p><FaUserCircle /> {profile.email}</p>
                <p><MdLocalHospital /> {profile.address}</p>
                <p><FaCalendarAlt /> Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
              </UserDetails>
            </UserInfo>
            
            <StatsContainer>
              <StatCard
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3>{appointments.length}</h3>
                <p>Appointments</p>
              </StatCard>
              
              <StatCard
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3>{orders.length}</h3>
                <p>Orders</p>
              </StatCard>
              
              <StatCard
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3>12</h3>
                <p>Health Records</p>
              </StatCard>
              
              <StatCard
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3>4.8</h3>
                <p>Average Rating</p>
              </StatCard>
            </StatsContainer>
          </ProfileHeader>
          
          <Tabs>
            <Tab 
              active={activeTab === 'appointments'}
              onClick={() => setActiveTab('appointments')}
            >
              <FaCalendarAlt style={{ marginRight: '0.5rem' }} /> Appointments
            </Tab>
            <Tab 
              active={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
            >
              <BsClipboardData style={{ marginRight: '0.5rem' }} /> Orders
            </Tab>
            <Tab 
              active={activeTab === 'health'}
              onClick={() => setActiveTab('health')}
            >
              <MdOutlineHealthAndSafety style={{ marginRight: '0.5rem' }} /> Health
            </Tab>
            <Tab 
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog style={{ marginRight: '0.5rem' }} /> Settings
            </Tab>
          </Tabs>
          
          {activeTab === 'appointments' && (
            <Section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2><FaCalendarAlt /> Upcoming Appointments</h2>
              
              {appointments.length === 0 ? (
                <Card>
                  <p>No upcoming appointments. Book one now!</p>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="appointment-info">
                      <h3>{appointment.doctorName}</h3>
                      <p><MdLocalHospital /> {appointment.specialization}</p>
                      <p><FaCalendarAlt /> {new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                      <p><MdLocalHospital /> {appointment.hospital}</p>
                    </div>
                    <div className={`status ${appointment.status}`}>
                      {appointment.status}
                    </div>
                  </AppointmentCard>
                ))
              )}
            </Section>
          )}
          
          {activeTab === 'orders' && (
            <Section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2><BsClipboardData /> Recent Orders</h2>
              
              {orders.length === 0 ? (
                <Card>
                  <p>No orders found.</p>
                </Card>
              ) : (
                orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h3>
                      Order #{order.id}
                      <span className={`order-status ${order.status}`}>
                        {order.status}
                      </span>
                    </h3>
                    <p>Ordered on {new Date(order.date).toLocaleDateString()}</p>
                    
                    <div className="order-details">
                      <div className="items">
                        {order.items.map((item, index) => (
                          <p key={index}>
                            {item.qty} x {item.name} - ₹{item.price * item.qty}
                          </p>
                        ))}
                      </div>
                      <div className="total">
                        <p>Total: ₹{order.total}</p>
                        <p className="text-sm text-gray-500">Paid via {order.payment}</p>
                      </div>
                    </div>
                  </OrderCard>
                ))
              )}
            </Section>
          )}
          
          {activeTab === 'health' && (
            <Section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2><MdOutlineHealthAndSafety /> Health Records</h2>
              <Card>
                <p>Your health records will appear here. You can view your medical history, test results, and more.</p>
              </Card>
            </Section>
          )}
          
          {activeTab === 'settings' && (
            <Section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2><FaCog /> Account Settings</h2>
              <Card>
                <h3>Personal Information</h3>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <p>Phone: {profile.phone}</p>
                <p>Address: {profile.address}</p>
                
                <div className="mt-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </Card>
              
              <Card className="mt-4">
                <h3>Security</h3>
                <p>Change your password or update security settings.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4>Change Password</h4>
                      <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">Update</button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4>Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">Enable</button>
                  </div>
                </div>
              </Card>
              
              <Card className="mt-4 border-red-100">
                <h3 className="text-red-600">Danger Zone</h3>
                <p className="text-red-500">These actions are irreversible. Proceed with caution.</p>
                
                <div className="mt-4">
                  <button className="flex items-center text-red-600 hover:text-red-800">
                    <FaSignOutAlt className="mr-2" />
                    Delete My Account
                  </button>
                </div>
              </Card>
            </Section>
          )}
        </motion.div>
      </AnimatePresence>
    </ProfileContainer>
  );
};

export default AnimatedUserProfile;
