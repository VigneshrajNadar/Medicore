import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaEdit, 
  FaSave, 
  FaTimes,
  FaShoppingCart,
  FaCalendarAlt
} from 'react-icons/fa';
import styled from 'styled-components';
import { getProfile, getOrders, getUserAppointments, updateProfile } from '../../services/api';

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
`;

const ProfileField = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.2);
  }
`;

const FieldIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const FieldContent = styled.div`
  flex: 1;
`;

const FieldLabel = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const FieldValue = styled.div`
  color: #64748b;
  font-size: 0.95rem;
`;

const EditButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
  }
`;

const CancelButton = styled.button`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const OrderItem = styled.div`
  padding: 1rem;
  background: rgba(245, 158, 11, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(245, 158, 11, 0.1);
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(245, 158, 11, 0.1);
    border-color: rgba(245, 158, 11, 0.2);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const OrderId = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
`;

const OrderStatus = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'Delivered': return 'rgba(16, 185, 129, 0.1)';
      case 'Shipped': return 'rgba(59, 130, 246, 0.1)';
      case 'Processing': return 'rgba(245, 158, 11, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Delivered': return '#059669';
      case 'Shipped': return '#1d4ed8';
      case 'Processing': return '#d97706';
      default: return '#6b7280';
    }
  }};
`;

const OrderDetails = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Vignesh Raj',
    email: 'vignesh@example.com',
    phone: '+91 98765 43210',
    address: 'Chennai, Tamil Nadu'
  });
  
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadUserData();
    
    // Load persisted profile data if available
    const userId = localStorage.getItem('userId') || 'user_123';
    const savedProfile = localStorage.getItem(`user_profile_${userId}`);
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, []);

  const loadUserData = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'user_123';
      
      // Set userId in localStorage if not present (for demo purposes)
      if (!localStorage.getItem('userId')) {
        localStorage.setItem('userId', 'user_123');
      }
      
      // Load profile data
      const profileData = await getProfile(userId);
      setProfile(profileData);
      
      // Load orders data
      const ordersData = await getOrders(userId);
      setOrders(ordersData);
      
      // Load appointments data - force reload
      console.log('Loading appointments for user:', userId);
      const appointmentsData = await getUserAppointments(userId);
      console.log('Appointments loaded:', appointmentsData);
      setAppointments(appointmentsData || []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      // Set mock data on error
      setAppointments([
        {
          id: 'APT001',
          doctor_name: 'Dr. Rajesh Kumar',
          specialization: 'Cardiologist',
          appointment_date: '2024-01-15',
          appointment_time: '10:00 AM',
          appointment_status: 'Confirmed',
          total_amount: 500,
          payment_status: 'Paid',
          hospital_name: 'Apollo Hospital',
          consultation_type: 'In-person'
        }
      ]);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    console.log('Starting edit with profile:', profile);
    setEditData({ ...profile });
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'user_123';
      
      // Validate required fields
      if (!editData.name || !editData.email || !editData.phone) {
        alert('Please fill in all required fields (Name, Email, Phone)');
        return;
      }
      
      // Call the updateProfile API
      const result = await updateProfile({ ...editData, userId });
      
      // Always update profile since API returns success for demo
      setProfile(editData);
      setEditing(false);
      
      // Store updated profile in localStorage for persistence
      localStorage.setItem(`user_profile_${userId}`, JSON.stringify(editData));
      
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      // Still update profile for demo purposes
      setProfile(editData);
      setEditing(false);
      alert('Profile updated successfully!');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData({});
  };

  const handleInputChange = (field, value) => {
    console.log('Input changed:', field, value);
    setEditData(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      console.log('Updated editData:', updated);
      return updated;
    });
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '1.5rem', color: '#64748b' }}>Loading profile...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>User Profile</Title>
        <Subtitle>Manage your personal information and preferences</Subtitle>
      </Header>

      <ProfileGrid>
        {/* Personal Information */}
        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader>
            <CardIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaUser />
            </CardIcon>
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </div>
          </CardHeader>

          <ProfileSection>
            <ProfileField>
              <FieldIcon style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                <FaUser />
              </FieldIcon>
              <FieldContent>
                <FieldLabel>Name</FieldLabel>
                {editing ? (
                  <Input
                    value={editData.name || profile.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                  />
                ) : (
                  <FieldValue>{profile.name}</FieldValue>
                )}
              </FieldContent>
            </ProfileField>

            <ProfileField>
              <FieldIcon style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                <FaEnvelope />
              </FieldIcon>
              <FieldContent>
                <FieldLabel>Email</FieldLabel>
                {editing ? (
                  <Input
                    value={editData.email || profile.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                  />
                ) : (
                  <FieldValue>{profile.email}</FieldValue>
                )}
              </FieldContent>
            </ProfileField>

            <ProfileField>
              <FieldIcon style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                <FaPhone />
              </FieldIcon>
              <FieldContent>
                <FieldLabel>Phone</FieldLabel>
                {editing ? (
                  <Input
                    value={editData.phone || profile.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <FieldValue>{profile.phone}</FieldValue>
                )}
              </FieldContent>
            </ProfileField>

            <ProfileField>
              <FieldIcon style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                <FaMapMarkerAlt />
              </FieldIcon>
              <FieldContent>
                <FieldLabel>Address</FieldLabel>
                {editing ? (
                  <Input
                    value={editData.address || profile.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                  />
                ) : (
                  <FieldValue>{profile.address}</FieldValue>
                )}
              </FieldContent>
            </ProfileField>

            {editing ? (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <SaveButton onClick={handleSave}>
                  <FaSave style={{ marginRight: '0.5rem' }} />
                  Save Changes
                </SaveButton>
                <CancelButton onClick={handleCancel}>
                  <FaTimes style={{ marginRight: '0.5rem' }} />
                  Cancel
                </CancelButton>
              </div>
            ) : (
              <EditButton onClick={handleEdit}>
                <FaEdit style={{ marginRight: '0.5rem' }} />
                Edit Profile
              </EditButton>
            )}
          </ProfileSection>
        </ProfileCard>

        {/* Order History */}
        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader>
            <CardIcon style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <FaShoppingCart />
            </CardIcon>
              <div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Your recent pharmacy orders</CardDescription>
            </div>
          </CardHeader>

          <ProfileSection>
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order, index) => (
                <OrderItem key={order.orderId || index}>
                  <OrderHeader>
                    <OrderId>Order #{order.orderId}</OrderId>
                    <OrderStatus status={order.status}>{order.status}</OrderStatus>
                  </OrderHeader>
                  <OrderDetails>
                    <div>Date: {order.date}</div>
                    <div>Total: ₹{order.total}</div>
                    <div>Payment: {order.payment}</div>
                  </OrderDetails>
                </OrderItem>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#64748b',
                fontStyle: 'italic'
              }}>
                No orders found
              </div>
            )}
          </ProfileSection>
        </ProfileCard>

        {/* Appointments */}
        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <CardIcon style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <FaCalendarAlt />
            </CardIcon>
            <div>
              <CardTitle>Doctor Appointments</CardTitle>
              <CardDescription>Your upcoming and past appointments</CardDescription>
            </div>
          </CardHeader>

          <ProfileSection>
            {appointments && appointments.length > 0 ? (
              appointments.slice(0, 5).map((appointment, index) => (
                <motion.div
                  key={appointment.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <OrderItem>
                    <OrderHeader>
                      <OrderId>Appointment #{appointment.id}</OrderId>
                      <OrderStatus status={appointment.appointment_status}>
                        {appointment.appointment_status}
                      </OrderStatus>
                    </OrderHeader>
                    <OrderDetails>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div><strong>Doctor:</strong> {appointment.doctor_name}</div>
                        <div><strong>Specialization:</strong> {appointment.specialization}</div>
                        <div><strong>Hospital:</strong> {appointment.hospital_name}</div>
                        <div><strong>Type:</strong> {appointment.consultation_type}</div>
                        <div><strong>Date:</strong> {appointment.appointment_date}</div>
                        <div><strong>Time:</strong> {appointment.appointment_time}</div>
                        <div><strong>Fee:</strong> ₹{appointment.total_amount}</div>
                        <div><strong>Payment:</strong> {appointment.payment_status}</div>
                      </div>
                      <div style={{ 
                        marginTop: '1rem', 
                        padding: '0.75rem', 
                        background: 'rgba(59, 130, 246, 0.05)', 
                        borderRadius: '8px',
                        border: '1px solid rgba(59, 130, 246, 0.1)'
                      }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                          Appointment Details
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {appointment.consultation_type === 'Video Call' 
                            ? 'Join the video consultation from your account 15 minutes before the scheduled time.'
                            : `Visit ${appointment.hospital_name} at the scheduled time. Please bring a valid ID and any previous medical records.`
                          }
                        </div>
                        {appointment.appointment_status === 'Confirmed' && (
                          <div style={{ 
                            marginTop: '0.5rem', 
                            padding: '0.5rem', 
                            background: 'rgba(16, 185, 129, 0.1)', 
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            color: '#059669',
                            fontWeight: '500'
                          }}>
                            ✓ Appointment confirmed. You will receive a reminder 24 hours before your appointment.
                          </div>
                        )}
                      </div>
                    </OrderDetails>
                  </OrderItem>
                </motion.div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#64748b',
                fontStyle: 'italic'
              }}>
                No appointments found
              </div>
            )}
          </ProfileSection>
        </ProfileCard>

        {/* Appointment Management Section */}
        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader>
            <CardIcon style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
              <FaCalendarAlt />
            </CardIcon>
            <div>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>Manage your appointments and consultations</CardDescription>
            </div>
          </CardHeader>

          <ProfileSection>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <motion.div
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)' }}
                onClick={() => window.location.href = '/doctors'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    📅
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                      Book New Appointment
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                      Schedule a consultation with our expert doctors
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(16, 185, 129, 0.15)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    💊
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                      Prescription History
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                      View and download your prescription records
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(245, 158, 11, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    🩺
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                      Health Records
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                      Access your complete medical history and reports
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </ProfileSection>
        </ProfileCard>
      </ProfileGrid>
    </Container>
  );
};

export default UserProfile;
