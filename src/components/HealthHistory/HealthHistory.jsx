import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import api, { getUserAppointments, getLabTests } from '../../services/api';
import { motion } from 'framer-motion';
import {
  FaHeartbeat,
  FaWeight,
  FaThermometerHalf,
  FaTint,
  FaLightbulb,
  FaClock,
  FaEye,
  FaCalculator,
  FaPills,
  FaStethoscope,
  FaHandHoldingHeart,
  FaSearch,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaHospital,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaPrescriptionBottleAlt,
  FaUserMd,
  FaCalendarAlt
} from 'react-icons/fa';
import styled from 'styled-components';
import './HealthHistory.css';
import MedicineDonationModal from '../MedicineDonation/MedicineDonationModal';
import MedicineRequestModal from '../MedicineDonation/MedicineRequestModal';
import CollectionCentersModal from '../MedicineDonation/CollectionCentersModal';
import GuidelinesModal from '../MedicineDonation/GuidelinesModal';

// Styled Components
const HealthHistoryContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const HistoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)'};
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

const HistoryItem = styled(motion.div)`
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.08);
    border-color: rgba(102, 126, 234, 0.2);
  }
`;

const HistoryDate = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const HistoryTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const HistoryDetails = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.4;
`;

const ActionButton = styled.button`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const HealthHistory = () => {
  const { currentUser } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [tipAnimation, setTipAnimation] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [centersModalOpen, setCentersModalOpen] = useState(false);
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);
  const [guidelinesType, setGuidelinesType] = useState('donation');
  const [appointments, setAppointments] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // Health Tips Database
  const healthTips = [
    {
      icon: FaHeartbeat,
      title: "Heart Health",
      tip: "Take a 10-minute walk after meals to improve digestion and heart health.",
      color: "#ef4444"
    },
    {
      icon: FaTint,
      title: "Hydration",
      tip: "Drink 8 glasses of water daily. Start your day with a glass of warm water.",
      color: "#06b6d4"
    },
    {
      icon: FaWeight,
      title: "Fitness",
      tip: "Do 30 minutes of moderate exercise 5 times a week for optimal health.",
      color: "#10b981"
    },
    {
      icon: FaPills,
      title: "Medication",
      tip: "Take medications at the same time daily and never skip doses.",
      color: "#8b5cf6"
    },
    {
      icon: FaEye,
      title: "Eye Care",
      tip: "Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.",
      color: "#f59e0b"
    },
    {
      icon: FaThermometerHalf,
      title: "Sleep",
      tip: "Maintain a consistent sleep schedule. Aim for 7-9 hours of quality sleep nightly.",
      color: "#6366f1"
    },
    {
      icon: FaStethoscope,
      title: "Regular Checkups",
      tip: "Schedule annual health checkups even when you feel healthy.",
      color: "#ec4899"
    },
    {
      icon: FaLightbulb,
      title: "Mental Health",
      tip: "Practice mindfulness or meditation for 10 minutes daily to reduce stress.",
      color: "#f97316"
    }
  ];

  useEffect(() => {
    const loadHealthData = async () => {
      const userId = currentUser?.id || currentUser?._id;
      if (!userId) {
        setLoading(false);
        return;
      }

      setLoadingItems(true);
      try {
        // Fetch real data from backend
        const [aptData, labData] = await Promise.all([
          getUserAppointments(userId),
          getLabTests(userId)
        ]);

        setAppointments(aptData || []);
        setLabTests(labData || []);
      } catch (error) {
        console.error('Error loading health data:', error);
      } finally {
        setLoadingItems(false);
        setLoading(false);
      }
    };

    loadHealthData();
  }, [currentUser]);

  // Health Tips Rotation - Every 2 minutes (120000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setTipAnimation(true);
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) =>
          (prevIndex + 1) % healthTips.length
        );
        setTipAnimation(false);
      }, 300);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [healthTips.length]);

  const filterHistory = (type) => {
    setActiveFilter(type);
  };

  const getFilteredHistory = () => {
    // Standardize backend items for consistency
    const standardizedAppointments = (appointments || []).map(apt => ({
      ...apt,
      type: `${apt.consultation_type || 'General'} Consultation`,
      title: `Appointment with Dr. ${apt.doctor_name || 'Medical Team'}`,
      date: apt.appointment_date,
      time: apt.appointment_time,
      status: apt.appointment_status
    }));

    const standardizedLabs = (labTests || []).map(test => ({
      ...test,
      type: 'Lab Test',
      title: test.test_name,
      date: test.test_date || test.scheduled_date,
      time: test.test_time || 'Scheduled',
      status: test.status
    }));

    const localMedications = currentUser?.healthHistory?.medications || [];

    switch (activeFilter) {
      case 'appointments':
        return standardizedAppointments;
      case 'labs':
        return standardizedLabs;
      case 'medications':
        return localMedications;
      default:
        // Combine all for default view, sort by date descending
        return [...standardizedAppointments, ...standardizedLabs].sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );
    }
  };

  if (loading) {
    return (
      <HealthHistoryContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '1.5rem', color: '#64748b' }}>Loading health history...</div>
        </div>
      </HealthHistoryContainer>
    );
  }

  return (
    <HealthHistoryContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderSection>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <FaHeartbeat style={{ color: '#667eea' }} />
            Health History
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            margin: 0
          }}>
            Track your medical records, appointments, and health progress over time
          </p>
        </HeaderSection>

        {/* Vital Statistics */}
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
              <FaHeartbeat />
            </StatIcon>
            <StatValue>{currentUser?.healthHistory?.vitals?.heartRate?.value || 72}</StatValue>
            <StatLabel>Heart Rate (bpm)</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <FaTint />
            </StatIcon>
            <StatValue>{currentUser?.healthHistory?.vitals?.bloodPressure?.value || '120/80'}</StatValue>
            <StatLabel>Blood Pressure</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <FaWeight />
            </StatIcon>
            <StatValue>{currentUser?.healthHistory?.vitals?.weight?.value || 70}</StatValue>
            <StatLabel>Weight (kg)</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
              <FaThermometerHalf />
            </StatIcon>
            <StatValue>{currentUser?.healthHistory?.vitals?.temperature?.value || 98.6}</StatValue>
            <StatLabel>Temperature (°F)</StatLabel>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          {/* Medical Records History - FULL WIDTH FIRST */}
          <HistoryCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ gridColumn: '1 / -1' }}
          >
            <CardHeader style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <CardTitle>
                <FaStethoscope style={{ color: '#667eea' }} />
                Recent Medical Records
              </CardTitle>
              <FilterBar style={{ marginBottom: 0 }}>
                <FilterButton
                  active={activeFilter === 'all'}
                  onClick={() => filterHistory('all')}
                >
                  All
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'appointments'}
                  onClick={() => filterHistory('appointments')}
                >
                  Appointments
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'labs'}
                  onClick={() => filterHistory('labs')}
                >
                  Lab Reports
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'medications'}
                  onClick={() => filterHistory('medications')}
                >
                  Medications
                </FilterButton>
              </FilterBar>
            </CardHeader>

            <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '0.5rem', marginTop: '1rem' }}>
              {loadingItems ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  <div className="loading-spinner">Loading your health records...</div>
                </div>
              ) : getFilteredHistory().length > 0 ? (
                getFilteredHistory().map((item, index) => (
                  <HistoryItem
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <HistoryDate>
                          <FaCalendarAlt style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                          {item.date} {item.time ? `• ${item.time}` : ''}
                        </HistoryDate>
                        <HistoryTitle>{item.title}</HistoryTitle>
                        <HistoryDetails>
                          <span style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            background: item.type?.includes('Consultation') ? 'rgba(102, 126, 234, 0.1)' :
                              item.type?.includes('Lab') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: item.type?.includes('Consultation') ? '#667eea' :
                              item.type?.includes('Lab') ? '#10b981' : '#f59e0b',
                            marginRight: '0.6rem',
                            display: 'inline-block'
                          }}>
                            {item.type}
                          </span>
                          {item.hospital || item.patient_name || item.hospital_name || 'Medical Center'}
                        </HistoryDetails>
                      </div>
                      <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                        <div style={{
                          color: (item.status === 'scheduled' || item.status === 'Confirmed' || item.status === 'confirmed') ? '#10b981' :
                            (item.status === 'Pending' || item.status === 'pending') ? '#f59e0b' : '#64748b',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {item.status}
                        </div>
                        {item.total_amount && (
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                            ₹{item.total_amount}
                          </div>
                        )}
                      </div>
                    </div>
                  </HistoryItem>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
                  <FaStethoscope style={{ fontSize: '3.5rem', opacity: 0.15, marginBottom: '1.2rem' }} />
                  <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No records found in this category.</p>
                  <p style={{ fontSize: '0.9rem' }}>Book an appointment or lab test to see records here.</p>
                </div>
              )}
            </div>
          </HistoryCard>

          {/* Health Tips */}
          <HistoryCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader>
              <CardTitle>
                <FaLightbulb style={{ color: '#f59e0b' }} />
                Daily Health Tips
              </CardTitle>
              <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaClock />
                Updates every 2 minutes
              </div>
            </CardHeader>

            <motion.div
              key={currentTipIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: tipAnimation ? 0 : 1, y: tipAnimation ? -20 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(135deg, ${healthTips[currentTipIndex].color}15 0%, ${healthTips[currentTipIndex].color}05 100%)`,
                border: `2px solid ${healthTips[currentTipIndex].color}30`,
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${healthTips[currentTipIndex].color} 0%, ${healthTips[currentTipIndex].color}CC 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                boxShadow: `0 10px 30px ${healthTips[currentTipIndex].color}40`
              }}>
                {React.createElement(healthTips[currentTipIndex].icon)}
              </div>
              <h3 style={{
                color: healthTips[currentTipIndex].color,
                marginBottom: '1rem',
                fontSize: '1.3rem',
                fontWeight: '700'
              }}>
                {healthTips[currentTipIndex].title}
              </h3>
              <p style={{
                color: '#1e293b',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: 0,
                fontWeight: '500'
              }}>
                {healthTips[currentTipIndex].tip}
              </p>
            </motion.div>

            <div style={{
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              {healthTips.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: index === currentTipIndex ? healthTips[currentTipIndex].color : '#e2e8f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentTipIndex(index)}
                />
              ))}
            </div>
          </HistoryCard>

          {/* Pharmacy Quick Access */}
          <HistoryCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CardHeader>
              <CardTitle>
                <FaShoppingCart style={{ color: '#10b981' }} />
                Pharmacy Quick Access
              </CardTitle>
            </CardHeader>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <ActionButton
                onClick={() => window.location.href = '/pharmacy'}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '1rem'
                }}
              >
                <FaPills />
                Browse 10,000+ Medicines
              </ActionButton>

              <ActionButton
                onClick={() => window.location.href = '/pharmacy?category=prescription'}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '1rem'
                }}
              >
                <FaPrescriptionBottleAlt />
                Prescription Medicines
              </ActionButton>

              <ActionButton
                onClick={() => window.location.href = '/pharmacy?category=otc'}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '1rem'
                }}
              >
                <FaStethoscope />
                OTC Medicines
              </ActionButton>
            </div>
          </HistoryCard>

          {/* Medicine Donation Chain */}
          <HistoryCard
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ gridColumn: '1 / -1', display: 'block', visibility: 'visible' }}
          >
            <CardHeader>
              <CardTitle>
                <FaHeartbeat style={{ color: '#ef4444' }} />
                Medicine Donation Chain
              </CardTitle>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Help others by donating unused medicines • Make a difference in someone's life
              </div>
            </CardHeader>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
              width: '100%',
              minHeight: '400px'
            }}>
              {/* Donate Medicines */}
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  color: '#1e293b',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: '0 20px 60px rgba(16, 185, 129, 0.2)',
                  borderColor: 'rgba(16, 185, 129, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '50%',
                  opacity: 0.1
                }} />
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <FaPills style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', fontWeight: '800', position: 'relative', zIndex: 2, color: '#1e293b' }}>Donate Medicines</h3>
                <p style={{ margin: '0 0 2rem 0', opacity: 0.7, lineHeight: '1.6', position: 'relative', zIndex: 2, fontSize: '0.95rem', color: '#64748b' }}>Have unused, unexpired medicines? Donate them to help those in need and make a positive impact.</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.875rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem',
                      position: 'relative',
                      zIndex: 10,
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDonationModalOpen(true)}
                  >
                    <FaHandHoldingHeart />
                    Donate Now
                  </motion.button>
                  <motion.button
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#059669',
                      border: '2px solid rgba(16, 185, 129, 0.3)',
                      padding: '0.875rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem',
                      position: 'relative',
                      zIndex: 10
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      background: 'rgba(16, 185, 129, 0.15)',
                      borderColor: 'rgba(16, 185, 129, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setGuidelinesType('donation');
                      setGuidelinesModalOpen(true);
                    }}
                  >
                    <FaStethoscope />
                    Guidelines
                  </motion.button>
                </div>
              </motion.div>

              {/* Request Medicines */}
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  color: '#1e293b',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: '0 20px 60px rgba(59, 130, 246, 0.2)',
                  borderColor: 'rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: '50%',
                  opacity: 0.1
                }} />
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <FaStethoscope style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', fontWeight: '800', position: 'relative', zIndex: 2, color: '#1e293b' }}>Request Medicines</h3>
                <p style={{ margin: '0 0 2rem 0', opacity: 0.7, lineHeight: '1.6', position: 'relative', zIndex: 2, fontSize: '0.95rem', color: '#64748b' }}>Need medicines but can't afford them? Request from our donation pool with prescription.</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.875rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem',
                      position: 'relative',
                      zIndex: 10,
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRequestModalOpen(true)}
                  >
                    <FaSearch />
                    Request Now
                  </motion.button>
                  <motion.button
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#2563eb',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      padding: '0.875rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem',
                      position: 'relative',
                      zIndex: 10
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      background: 'rgba(59, 130, 246, 0.15)',
                      borderColor: 'rgba(59, 130, 246, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setGuidelinesType('request');
                      setGuidelinesModalOpen(true);
                    }}
                  >
                    <FaEye />
                    Guidelines
                  </motion.button>
                </div>
              </motion.div>

              {/* Collection Centers */}
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  color: '#1e293b',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2)',
                  borderColor: 'rgba(139, 92, 246, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '50%',
                  opacity: 0.1
                }} />
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <FaUserMd style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', fontWeight: '800', position: 'relative', zIndex: 2, color: '#1e293b' }}>Collection Centers</h3>
                <p style={{ margin: '0 0 2rem 0', opacity: 0.7, lineHeight: '1.6', position: 'relative', zIndex: 2, fontSize: '0.95rem', color: '#64748b' }}>Find nearby collection points for safe medicine donation and pickup with directions.</p>
                <motion.button
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.875rem 2rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '0.25rem',
                    fontSize: '0.95rem',
                    position: 'relative',
                    zIndex: 10,
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCentersModalOpen(true)}
                >
                  <FaMapMarkerAlt />
                  Find Centers
                </motion.button>
                <motion.button
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#7c3aed',
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                    padding: '0.875rem 2rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '0.25rem',
                    fontSize: '0.95rem',
                    position: 'relative',
                    zIndex: 10
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    background: 'rgba(139, 92, 246, 0.15)',
                    borderColor: 'rgba(139, 92, 246, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert('View center details...')}
                >
                  <FaHospital />
                  Center Details
                </motion.button>
              </motion.div>
            </div>

            {/* Donation Statistics */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h4 style={{
                margin: '0 0 1rem 0',
                color: '#1e293b',
                fontSize: '1.1rem',
                fontWeight: '700',
                textAlign: 'center'
              }}>Donation Impact</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>2,847</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Medicines Donated</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#3b82f6' }}>1,523</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Families Helped</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#8b5cf6' }}>₹4.2L</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Value Saved</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ef4444' }}>156</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Collection Centers</div>
                </div>
              </div>
            </div>
          </HistoryCard>
        </ContentGrid>
      </motion.div>

      {/* Modals */}
      <MedicineDonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        type="donate"
      />

      <MedicineRequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
      />

      <CollectionCentersModal
        isOpen={centersModalOpen}
        onClose={() => setCentersModalOpen(false)}
      />

      <GuidelinesModal
        isOpen={guidelinesModalOpen}
        onClose={() => setGuidelinesModalOpen(false)}
        type={guidelinesType}
      />
    </HealthHistoryContainer>
  );
};

export default HealthHistory;
