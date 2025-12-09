import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaUserCircle,
  FaHeart,
  FaIdCard,
  FaShieldAlt,
  FaCamera,
  FaBell,
  FaShoppingBag,
  FaCheck,
  FaExclamationTriangle,
  FaInfo,
  FaClock,
  FaBox,
  FaTruck,
  FaCheckCircle
} from 'react-icons/fa';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%);
    animation: float 25s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(40px, -40px) rotate(120deg); }
    66% { transform: translate(-30px, 30px) rotate(240deg); }
  }
`;

const ProfileCard = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(30px);
  border-radius: 28px;
  box-shadow: 
    0 32px 64px -12px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(226, 232, 240, 0.6);
  overflow: hidden;
  position: relative;
  z-index: 10;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 3rem 2rem 2rem;
  position: relative;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.03) 100%);
  }
`;

const ProfileHeaderContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  border: 4px solid rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 20px 40px rgba(59, 130, 246, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
`;

const AvatarEdit = styled(motion.button)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3b82f6;
  border: 2px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  color: #1e293b;
`;

const UserName = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const UserTitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

const UserStats = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Stat = styled.div`
  text-align: center;
  
  .number {
    font-size: 1.5rem;
    font-weight: 700;
    display: block;
  }
  
  .label {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ProfileBody = styled.div`
  padding: 2rem;
`;

const SectionTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Tab = styled(motion.button)`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #3b82f6;
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #3b82f6;
  }
`;

const TabContent = styled(motion.div)`
  min-height: 400px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 20px 40px -5px rgba(0, 0, 0, 0.08),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

const InfoCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const InfoCardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SaveButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #059669;
  }
`;

const CancelButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #4b5563;
  }
`;

const UserProfilePage = () => {
  const { currentUser, updateUser, getUserStats } = useUser();
  const [activeTab, setActiveTab] = useState('personal');
  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState({});

  if (!currentUser) {
    return (
      <ProfileContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Please log in to view your profile</h2>
        </div>
      </ProfileContainer>
    );
  }

  const stats = getUserStats();

  const handleEdit = (section) => {
    setEditingSection(section);
    // Ensure we have all the current user data for editing
    setEditData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      dateOfBirth: currentUser.dateOfBirth || '',
      gender: currentUser.gender || '',
      address: currentUser.address || '',
      emergencyContact: currentUser.emergencyContact || '',
      bloodGroup: currentUser.bloodGroup || '',
      allergies: currentUser.allergies || [],
      chronicConditions: currentUser.chronicConditions || []
    });
  };

  const handleSave = () => {
    updateUser(editData);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditData({});
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderPersonalInfo = () => (
    <InfoGrid>
      <InfoCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoCardHeader>
          <InfoCardTitle>
            <FaUser /> Personal Information
          </InfoCardTitle>
          <EditButton
            onClick={() => handleEdit('personal')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> Edit
          </EditButton>
        </InfoCardHeader>

        {editingSection === 'personal' ? (
          <>
            <InfoItem>
              <InfoLabel>Full Name</InfoLabel>
              <Input
                type="text"
                value={editData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <Input
                type="email"
                value={editData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </InfoItem>
            <InfoItem>
              <InfoLabel>Phone</InfoLabel>
              <Input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </InfoItem>
            <InfoItem>
              <InfoLabel>Date of Birth</InfoLabel>
              <Input
                type="date"
                value={editData.dateOfBirth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gender</InfoLabel>
              <Select
                value={editData.gender || ''}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </InfoItem>
            <ActionButtons>
              <SaveButton onClick={handleSave} whileHover={{ scale: 1.05 }}>
                <FaSave /> Save Changes
              </SaveButton>
              <CancelButton onClick={handleCancel} whileHover={{ scale: 1.05 }}>
                <FaTimes /> Cancel
              </CancelButton>
            </ActionButtons>
          </>
        ) : (
          <>
            <InfoItem>
              <InfoLabel>Full Name</InfoLabel>
              <InfoValue>{currentUser.name || 'Not provided'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{currentUser.email || 'Not provided'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>{currentUser.phone || 'Not provided'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Date of Birth</InfoLabel>
              <InfoValue>{currentUser.dateOfBirth || 'Not provided'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gender</InfoLabel>
              <InfoValue>{currentUser.gender || 'Not provided'}</InfoValue>
            </InfoItem>
          </>
        )}
      </InfoCard>

      <InfoCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <InfoCardHeader>
          <InfoCardTitle>
            <FaMapMarkerAlt /> Address Information
          </InfoCardTitle>
          <EditButton
            onClick={() => handleEdit('address')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> Edit
          </EditButton>
        </InfoCardHeader>

        {editingSection === 'address' ? (
          <>
            <InfoItem>
              <InfoLabel>Address</InfoLabel>
              <Input
                type="text"
                value={editData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your full address"
              />
            </InfoItem>
            <InfoItem>
              <InfoLabel>Emergency Contact</InfoLabel>
              <Input
                type="text"
                value={editData.emergencyContact || ''}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Emergency contact person"
              />
            </InfoItem>
            <ActionButtons>
              <SaveButton onClick={handleSave} whileHover={{ scale: 1.05 }}>
                <FaSave /> Save Changes
              </SaveButton>
              <CancelButton onClick={handleCancel} whileHover={{ scale: 1.05 }}>
                <FaTimes /> Cancel
              </CancelButton>
            </ActionButtons>
          </>
        ) : (
          <>
            <InfoItem>
              <InfoLabel>Address</InfoLabel>
              <InfoValue>{currentUser.address || 'Not provided'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Emergency Contact</InfoLabel>
              <InfoValue>{currentUser.emergencyContact || 'Not provided'}</InfoValue>
            </InfoItem>
          </>
        )}
      </InfoCard>

      <InfoCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <InfoCardHeader>
          <InfoCardTitle>
            <FaHeart /> Health Information
          </InfoCardTitle>
          <EditButton
            onClick={() => handleEdit('health')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> Edit
          </EditButton>
        </InfoCardHeader>

        {editingSection === 'health' ? (
          <>
            <InfoItem>
              <InfoLabel>Blood Group</InfoLabel>
              <Select
                value={editData.bloodGroup || ''}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
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
              </Select>
            </InfoItem>
            <ActionButtons>
              <SaveButton onClick={handleSave} whileHover={{ scale: 1.05 }}>
                <FaSave /> Save Changes
              </SaveButton>
              <CancelButton onClick={handleCancel} whileHover={{ scale: 1.05 }}>
                <FaTimes /> Cancel
              </CancelButton>
            </ActionButtons>
          </>
        ) : (
          <>
            <InfoItem>
              <InfoLabel>Blood Group</InfoLabel>
              <InfoValue>{currentUser.bloodGroup || 'Not provided'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Allergies</InfoLabel>
              <InfoValue>
                {currentUser.allergies && currentUser.allergies.length > 0 
                  ? currentUser.allergies.join(', ') 
                  : 'None reported'}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Chronic Conditions</InfoLabel>
              <InfoValue>
                {currentUser.chronicConditions && currentUser.chronicConditions.length > 0 
                  ? currentUser.chronicConditions.join(', ') 
                  : 'None reported'}
              </InfoValue>
            </InfoItem>
          </>
        )}
      </InfoCard>
    </InfoGrid>
  );

  const renderNotifications = () => (
    <InfoGrid>
      <InfoCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoCardHeader>
          <InfoCardTitle>
            <FaBell /> Recent Notifications
          </InfoCardTitle>
        </InfoCardHeader>
        {currentUser.notifications && currentUser.notifications.length > 0 ? (
          currentUser.notifications.slice(0, 5).map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: notification.read ? 'rgba(248, 250, 252, 0.5)' : 'rgba(59, 130, 246, 0.05)',
                borderRadius: '12px',
                border: `1px solid ${notification.read ? 'rgba(226, 232, 240, 0.5)' : 'rgba(59, 130, 246, 0.2)'}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}
            >
              <div style={{
                color: notification.type === 'success' ? '#10b981' : 
                       notification.type === 'warning' ? '#f59e0b' : 
                       notification.type === 'error' ? '#ef4444' : '#3b82f6',
                fontSize: '1.2rem'
              }}>
                {notification.type === 'success' ? <FaCheckCircle /> :
                 notification.type === 'warning' ? <FaExclamationTriangle /> :
                 notification.type === 'error' ? <FaTimes /> : <FaInfo />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.25rem'
                }}>
                  {notification.title}
                </div>
                <div style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  {notification.message}
                </div>
                <div style={{
                  color: '#94a3b8',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <FaClock />
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#64748b'
          }}>
            <FaBell style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }} />
            <div>No notifications yet</div>
          </div>
        )}
      </InfoCard>
    </InfoGrid>
  );

  const renderRecentOrders = () => (
    <InfoGrid>
      <InfoCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoCardHeader>
          <InfoCardTitle>
            <FaShoppingBag /> Recent Orders
          </InfoCardTitle>
        </InfoCardHeader>
        {currentUser.orders && currentUser.orders.length > 0 ? (
          currentUser.orders.slice(0, 5).map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{
                padding: '1.25rem',
                marginBottom: '1rem',
                background: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}>
                <div>
                  <div style={{
                    fontWeight: '700',
                    color: '#1e293b',
                    fontSize: '1.1rem',
                    marginBottom: '0.25rem'
                  }}>
                    Order #{order.id.slice(-8)}
                  </div>
                  <div style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <FaClock />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    color: order.status === 'delivered' ? '#10b981' :
                           order.status === 'shipped' ? '#3b82f6' :
                           order.status === 'processing' ? '#f59e0b' : '#6b7280',
                    fontSize: '1rem'
                  }}>
                    {order.status === 'delivered' ? <FaCheckCircle /> :
                     order.status === 'shipped' ? <FaTruck /> :
                     order.status === 'processing' ? <FaBox /> : <FaClock />}
                  </div>
                  <span style={{
                    color: order.status === 'delivered' ? '#10b981' :
                           order.status === 'shipped' ? '#3b82f6' :
                           order.status === 'processing' ? '#f59e0b' : '#6b7280',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div style={{
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  Items: {order.items.length}
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {order.items.slice(0, 3).map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}
                    >
                      {item.name}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span style={{
                      color: '#64748b',
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.5rem'
                    }}>
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Payment Method */}
              {order.paymentMethod && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    color: '#10b981',
                    fontSize: '0.9rem'
                  }}>
                    {order.paymentMethod === 'card' ? '💳' :
                     order.paymentMethod === 'upi' ? '📱' :
                     order.paymentMethod === 'cod' ? '🚚' : '💰'}
                  </div>
                  <span style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize'
                  }}>
                    {order.paymentMethod === 'card' ? 'Credit/Debit Card' :
                     order.paymentMethod === 'upi' ? 'UPI Payment' :
                     order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                  </span>
                  {order.transactionId && (
                    <span style={{
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace'
                    }}>
                      {order.transactionId}
                    </span>
                  )}
                </div>
              )}
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(226, 232, 240, 0.5)'
              }}>
                <div style={{
                  color: '#64748b',
                  fontSize: '0.9rem'
                }}>
                  Total Amount
                </div>
                <div style={{
                  fontWeight: '700',
                  color: '#1e293b',
                  fontSize: '1.1rem'
                }}>
                  ₹{order.total}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b'
          }}>
            <FaShoppingBag style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
            <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No orders yet</div>
            <div style={{ fontSize: '0.9rem' }}>Start shopping to see your orders here</div>
          </div>
        )}
      </InfoCard>
    </InfoGrid>
  );

  const renderAccountInfo = () => (
    <InfoGrid>
      <InfoCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoCardHeader>
          <InfoCardTitle>
            <FaIdCard /> MediCore Account Details
          </InfoCardTitle>
        </InfoCardHeader>
        <InfoItem>
          <InfoLabel>User ID</InfoLabel>
          <InfoValue>{currentUser.id}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Member Since</InfoLabel>
          <InfoValue>{new Date(currentUser.createdAt).toLocaleDateString()}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Last Login</InfoLabel>
          <InfoValue>{new Date(currentUser.lastLogin).toLocaleString()}</InfoValue>
        </InfoItem>
      </InfoCard>

      <InfoCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <InfoCardHeader>
          <InfoCardTitle>
            <FaShieldAlt /> Account Statistics
          </InfoCardTitle>
        </InfoCardHeader>
        <InfoItem>
          <InfoLabel>Total Orders</InfoLabel>
          <InfoValue>{stats.totalOrders}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Total Appointments</InfoLabel>
          <InfoValue>{stats.totalAppointments}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Active Medications</InfoLabel>
          <InfoValue>{stats.activeMedications}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Cart Items</InfoLabel>
          <InfoValue>{stats.cartItems}</InfoValue>
        </InfoItem>
      </InfoCard>
    </InfoGrid>
  );

  return (
    <ProfileContainer>
      <ProfileCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProfileHeader>
          <ProfileHeaderContent>
            <AvatarContainer>
              <Avatar>
                <FaUserCircle />
              </Avatar>
              <AvatarEdit whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaCamera />
              </AvatarEdit>
            </AvatarContainer>
            
            <UserInfo>
              <UserName>{currentUser.name || 'User'}</UserName>
              <UserTitle>ApolloClone Member</UserTitle>
              <UserStats>
                <Stat>
                  <span className="number">{stats.totalOrders}</span>
                  <span className="label">Orders</span>
                </Stat>
                <Stat>
                  <span className="number">{stats.totalAppointments}</span>
                  <span className="label">Appointments</span>
                </Stat>
                <Stat>
                  <span className="number">{stats.activeMedications}</span>
                  <span className="label">Medications</span>
                </Stat>
              </UserStats>
            </UserInfo>
          </ProfileHeaderContent>
        </ProfileHeader>

        <ProfileBody>
          <SectionTabs>
            <Tab
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
              whileHover={{ scale: 1.05 }}
            >
              Personal Info
            </Tab>
            <Tab
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
              whileHover={{ scale: 1.05 }}
            >
              Notifications
            </Tab>
            <Tab
              active={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
              whileHover={{ scale: 1.05 }}
            >
              Recent Orders
            </Tab>
            <Tab
              active={activeTab === 'account'}
              onClick={() => setActiveTab('account')}
              whileHover={{ scale: 1.05 }}
            >
              Account Details
            </Tab>
          </SectionTabs>

          <AnimatePresence mode="wait">
            <TabContent
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'personal' && renderPersonalInfo()}
              {activeTab === 'notifications' && renderNotifications()}
              {activeTab === 'orders' && renderRecentOrders()}
              {activeTab === 'account' && renderAccountInfo()}
            </TabContent>
          </AnimatePresence>
        </ProfileBody>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfilePage;
