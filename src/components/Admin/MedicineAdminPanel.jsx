import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaHandHoldingHeart, 
  FaStethoscope, 
  FaUserShield,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaEye,
  FaEdit,
  FaTrash,
  FaWarehouse,
  FaSearch,
  FaDownload,
  FaUserShield,
  FaBell,
  FaChartBar
} from 'react-icons/fa';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.color || '#3b82f6'};
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f1f5f9;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px 10px 0 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'rgba(59, 130, 246, 0.1)'};
    color: ${props => props.active ? 'white' : '#3b82f6'};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: 2px solid #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: #3b82f6;
    color: white;
  }
`;

const RequestCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => 
    props.type === 'donation' ? '#10b981' : 
    props.type === 'request' ? '#3b82f6' : '#8b5cf6'
  };
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span`
  background: ${props => 
    props.status === 'approved' ? '#dcfce7' :
    props.status === 'pending' ? '#fef3c7' :
    props.status === 'completed' ? '#dbeafe' : '#fef2f2'
  };
  color: ${props => 
    props.status === 'approved' ? '#16a34a' :
    props.status === 'pending' ? '#d97706' :
    props.status === 'completed' ? '#2563eb' : '#dc2626'
  };
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ActionButton = styled.button`
  background: ${props => 
    props.variant === 'approve' ? '#10b981' :
    props.variant === 'reject' ? '#ef4444' :
    props.variant === 'complete' ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)'
  };
  color: ${props => 
    props.variant === 'approve' || props.variant === 'reject' || props.variant === 'complete' ? 'white' : '#3b82f6'
  };
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin: 0.25rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const MedicineAdminPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('donations');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Check URL parameters to set initial tab
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab && ['donations', 'requests', 'centers'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newUrl = `${location.pathname}?tab=${tab}`;
    navigate(newUrl, { replace: true });
  };

  // Mock admin data
  const donationRequests = [
    {
      id: 'DON001',
      donorName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      medicine: 'Paracetamol 500mg',
      quantity: '50 tablets',
      expiry: '2025-12-31',
      condition: 'unopened',
      submittedDate: '2024-09-08',
      status: 'pending',
      pickupPreference: 'center',
      address: 'Jayanagar, Bangalore'
    },
    {
      id: 'DON002',
      donorName: 'Priya Sharma',
      phone: '+91 87654 32109',
      medicine: 'Insulin Glargine 100U/ml',
      quantity: '2 vials',
      expiry: '2025-11-30',
      condition: 'unopened',
      submittedDate: '2024-09-07',
      status: 'approved',
      pickupPreference: 'home',
      address: 'Koramangala, Bangalore'
    },
    {
      id: 'DON003',
      donorName: 'Amit Patel',
      phone: '+91 76543 21098',
      medicine: 'Metformin 500mg',
      quantity: '30 tablets',
      expiry: '2025-10-15',
      condition: 'unopened',
      submittedDate: '2024-09-06',
      status: 'completed',
      pickupPreference: 'center',
      address: 'Electronic City, Bangalore'
    }
  ];

  const medicineRequests = [
    {
      id: 'REQ001',
      patientName: 'Sunita Devi',
      phone: '+91 65432 10987',
      aadhar: '1234-5678-9012',
      medicine: 'Amlodipine 5mg',
      urgency: 'high',
      condition: 'Hypertension',
      submittedDate: '2024-09-08',
      status: 'pending',
      address: 'Whitefield, Bangalore'
    },
    {
      id: 'REQ002',
      patientName: 'Mohammed Ali',
      phone: '+91 54321 09876',
      aadhar: '2345-6789-0123',
      medicine: 'Insulin Glargine 100U/ml',
      urgency: 'critical',
      condition: 'Type 1 Diabetes',
      submittedDate: '2024-09-07',
      status: 'approved',
      address: 'HSR Layout, Bangalore'
    }
  ];

  const collectionCenters = [
    {
      id: 'CENTER001',
      name: 'Apollo Pharmacy - Jayanagar',
      address: 'No. 123, 4th Block, Jayanagar, Bangalore - 560011',
      phone: '+91 80 2665 4321',
      manager: 'Dr. Ramesh Kumar',
      capacity: '500 medicines',
      currentStock: '342 medicines',
      status: 'active',
      operatingHours: '9:00 AM - 9:00 PM',
      lastUpdated: '2024-09-08'
    },
    {
      id: 'CENTER002',
      name: 'MedPlus - Koramangala',
      address: 'No. 456, 5th Block, Koramangala, Bangalore - 560095',
      phone: '+91 80 4123 5678',
      manager: 'Ms. Priya Sharma',
      capacity: '750 medicines',
      currentStock: '623 medicines',
      status: 'active',
      operatingHours: '8:00 AM - 10:00 PM',
      lastUpdated: '2024-09-08'
    },
    {
      id: 'CENTER003',
      name: 'Wellness Pharmacy - Electronic City',
      address: 'Phase 1, Electronic City, Bangalore - 560100',
      phone: '+91 80 2852 9876',
      manager: 'Mr. Suresh Patel',
      capacity: '300 medicines',
      currentStock: '89 medicines',
      status: 'maintenance',
      operatingHours: 'Temporarily Closed',
      lastUpdated: '2024-09-07'
    }
  ];

  const adminStats = {
    totalDonations: 2847,
    pendingDonations: 23,
    totalRequests: 1523,
    pendingRequests: 15,
    completedTransactions: 4234,
    activeCenters: 156
  };

  const getFilteredData = () => {
    let data;
    if (activeTab === 'donations') {
      data = donationRequests;
    } else if (activeTab === 'requests') {
      data = medicineRequests;
    } else if (activeTab === 'centers') {
      data = collectionCenters;
    }
    
    if (statusFilter !== 'all') {
      data = data.filter(item => item.status === statusFilter);
    }
    
    if (searchTerm) {
      data = data.filter(item => {
        if (activeTab === 'donations') {
          return item.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.id.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (activeTab === 'requests') {
          return item.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.id.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (activeTab === 'centers') {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.id.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
      });
    }
    
    return data;
  };

  const handleApprove = (id) => {
    console.log(`Approving ${activeTab.slice(0, -1)} ${id}`);
    // Implementation for approval logic
  };

  const handleReject = (id) => {
    console.log(`Rejecting ${activeTab.slice(0, -1)} ${id}`);
    // Implementation for rejection logic
  };

  const handleComplete = (id) => {
    console.log(`Completing ${activeTab.slice(0, -1)} ${id}`);
    // Implementation for completion logic
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle />;
      case 'approved': return <FaCheckCircle />;
      case 'pending': return <FaHourglassHalf />;
      default: return <FaTimesCircle />;
    }
  };

  return (
    <AdminContainer>
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
          <FaUserShield style={{ color: '#3b82f6' }} />
          Medicine Donation Admin Panel
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#64748b',
          margin: 0
        }}>
          Manage medicine donations, requests, and collection centers
        </p>
      </HeaderSection>

      <StatsGrid>
        <StatCard color="#10b981">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Total Donations</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: '700', color: '#1e293b' }}>
                {adminStats.totalDonations.toLocaleString()}
              </p>
            </div>
            <FaHandHoldingHeart style={{ fontSize: '2rem', color: '#10b981' }} />
          </div>
        </StatCard>

        <StatCard color="#f59e0b">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Pending Donations</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: '700', color: '#1e293b' }}>
                {adminStats.pendingDonations}
              </p>
            </div>
            <FaHourglassHalf style={{ fontSize: '2rem', color: '#f59e0b' }} />
          </div>
        </StatCard>

        <StatCard color="#3b82f6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Medicine Requests</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: '700', color: '#1e293b' }}>
                {adminStats.totalRequests.toLocaleString()}
              </p>
            </div>
            <FaStethoscope style={{ fontSize: '2rem', color: '#3b82f6' }} />
          </div>
        </StatCard>

        <StatCard color="#8b5cf6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Active Centers</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: '700', color: '#1e293b' }}>
                {adminStats.activeCenters}
              </p>
            </div>
            <FaMapMarkerAlt style={{ fontSize: '2rem', color: '#8b5cf6' }} />
          </div>
        </StatCard>
      </StatsGrid>

      <TabContainer>
        <Tab 
          active={activeTab === 'donations'} 
          onClick={() => handleTabChange('donations')}
        >
          <FaHandHoldingHeart />
          Donation Requests ({donationRequests.length})
        </Tab>
        <Tab 
          active={activeTab === 'requests'} 
          onClick={() => handleTabChange('requests')}
        >
          <FaStethoscope />
          Medicine Requests ({medicineRequests.length})
        </Tab>
        <Tab 
          active={activeTab === 'centers'} 
          onClick={() => handleTabChange('centers')}
        >
          <FaWarehouse />
          Collection Centers ({collectionCenters.length})
        </Tab>
      </TabContainer>

      <FilterSection>
        <SearchInput
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton
          active={statusFilter === 'all'}
          onClick={() => setStatusFilter('all')}
        >
          All Status
        </FilterButton>
        <FilterButton
          active={statusFilter === 'pending'}
          onClick={() => setStatusFilter('pending')}
        >
          <FaHourglassHalf />
          Pending
        </FilterButton>
        <FilterButton
          active={statusFilter === 'approved'}
          onClick={() => setStatusFilter('approved')}
        >
          <FaCheckCircle />
          Approved
        </FilterButton>
        <FilterButton
          active={statusFilter === 'completed'}
          onClick={() => setStatusFilter('completed')}
        >
          <FaCheckCircle />
          Completed
        </FilterButton>
      </FilterSection>

      <div>
        {getFilteredData().map((item, index) => (
          <RequestCard
            key={item.id}
            type={activeTab.slice(0, -1)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CardHeader>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.2rem' }}>
                  {activeTab === 'donations' ? item.donorName : 
                   activeTab === 'requests' ? item.patientName : 
                   item.name}
                </h3>
                <p style={{ margin: 0, color: '#64748b' }}>
                  {activeTab === 'centers' ? 
                    `${item.manager} • ${item.currentStock}/${item.capacity}` :
                    `${item.medicine} • ${activeTab === 'donations' ? item.quantity : `Urgency: ${item.urgency}`}`
                  }
                </p>
              </div>
              <StatusBadge status={item.status}>
                {getStatusIcon(item.status)}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </StatusBadge>
            </CardHeader>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem', 
              marginBottom: '1rem' 
            }}>
              {activeTab === 'centers' ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <FaPhone />
                    {item.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <FaMapMarkerAlt />
                    {item.address}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <FaClock />
                    {item.operatingHours}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <FaCalendarAlt />
                    Updated: {item.lastUpdated}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <FaCalendarAlt />
                    Submitted: {item.submittedDate}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <FaMapMarkerAlt />
                    {item.address}
                  </div>
                  {activeTab === 'donations' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                      <FaClock />
                      Expires: {item.expiry}
                    </div>
                  )}
                  {activeTab === 'requests' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                      <FaStethoscope />
                      Condition: {item.condition}
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <ActionButton onClick={() => handleApprove(item.id)}>
                <FaEye />
                View Details
              </ActionButton>
              
              {item.status === 'pending' && (
                <>
                  <ActionButton variant="approve" onClick={() => handleApprove(item.id)}>
                    <FaCheckCircle />
                    Approve
                  </ActionButton>
                  <ActionButton variant="reject" onClick={() => handleReject(item.id)}>
                    <FaTimesCircle />
                    Reject
                  </ActionButton>
                </>
              )}
              
              {item.status === 'approved' && (
                <ActionButton variant="complete" onClick={() => handleComplete(item.id)}>
                  <FaCheckCircle />
                  Mark Complete
                </ActionButton>
              )}
              
              <ActionButton>
                <FaDownload />
                Export
              </ActionButton>
            </div>
          </RequestCard>
        ))}

        {getFilteredData().length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#64748b' 
          }}>
            <FaSearch style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No {activeTab} found</h3>
            <p>No {activeTab} match the selected filter criteria</p>
          </div>
        )}
      </div>
    </AdminContainer>
  );
};

export default MedicineAdminPanel;
