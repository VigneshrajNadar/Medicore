import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaUser,
  FaUserCheck,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaHandHoldingHeart,
  FaStethoscope,
  FaTimes,
  FaHospital
} from 'react-icons/fa';
import styled from 'styled-components';
import { allCollectionCenters } from '../../data/collectionCenters';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    color: #1e293b;
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #64748b;
    font-size: 1.1rem;
    margin: 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f1f5f9;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border-radius: 12px 12px 0 0;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#f8fafc'};
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
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  flex: 1;
  min-width: 300px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? '#3b82f6' : '#e2e8f0'};
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    background: ${props => props.active ? '#3b82f6' : '#f8fafc'};
  }
`;

const ItemCard = styled(motion.div)`
  background: white;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.1);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    margin: 0.25rem 0;
    color: #64748b;
    font-size: 0.9rem;
  }
`;

const ItemMeta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #64748b;
    font-size: 0.85rem;
    
    svg {
      color: #94a3b8;
    }
  }
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'awaiting_center_assignment': return '#fef3c7';
      case 'center_assigned': return '#dcfce7';
      case 'completed': return '#dcfce7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'awaiting_center_assignment': return '#d97706';
      case 'center_assigned': return '#16a34a';
      case 'completed': return '#16a34a';
      default: return '#6b7280';
    }
  }};
`;

const AssignmentSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
`;

const CenterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 0.5rem;
  transition: all 0.3s ease;
  
  ${props => props.primary && `
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  `}
  
  ${props => props.secondary && `
    background: #f1f5f9;
    color: #64748b;
    
    &:hover {
      background: #e2e8f0;
    }
  `}
`;

const MedicineManagement = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [medicineData, setMedicineData] = useState({
    donations: [],
    requests: [],
    visits: []
  });

  useEffect(() => {
    loadMedicineData();
  }, []);

  const loadMedicineData = () => {
    // Load medicine history from localStorage
    const savedHistory = localStorage.getItem('medicineHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setMedicineData({
        donations: history.donations || [],
        requests: history.requests || [],
        visits: history.visits || []
      });
    }
  };

  const assignCenter = (itemId, itemType, centerId) => {
    const center = allCollectionCenters.find(c => c.id === parseInt(centerId));
    if (!center) return;

    const savedHistory = localStorage.getItem('medicineHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      
      if (itemType === 'donation') {
        history.donations = history.donations.map(donation => {
          if (donation.id === itemId) {
            return {
              ...donation,
              status: 'center_assigned',
              assignedCenter: center.name,
              assignedCenterAddress: center.address,
              assignedCenterPhone: center.phone,
              assignedDate: new Date().toISOString().split('T')[0],
              recipient: `Assigned to ${center.name}`
            };
          }
          return donation;
        });
      } else if (itemType === 'request') {
        history.requests = history.requests.map(request => {
          if (request.id === itemId) {
            return {
              ...request,
              status: 'center_assigned',
              assignedCenter: center.name,
              assignedCenterAddress: center.address,
              assignedCenterPhone: center.phone,
              assignedDate: new Date().toISOString().split('T')[0],
              estimatedFulfillment: `Available at ${center.name}`
            };
          }
          return request;
        });
      }
      
      localStorage.setItem('medicineHistory', JSON.stringify(history));
      setMedicineData({
        donations: history.donations || [],
        requests: history.requests || [],
        visits: history.visits || []
      });
    }
  };

  const updateVisitStatus = (visitId, newStatus) => {
    const savedHistory = localStorage.getItem('medicineHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      
      history.visits = history.visits.map(visit => {
        if (visit.id === visitId) {
          return {
            ...visit,
            status: newStatus,
            completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : visit.completedDate
          };
        }
        return visit;
      });
      
      localStorage.setItem('medicineHistory', JSON.stringify(history));
      setMedicineData({
        donations: history.donations || [],
        requests: history.requests || [],
        visits: history.visits || []
      });
    }
  };

  const filteredItems = () => {
    let items = [];
    if (activeTab === 'donations') items = medicineData.donations;
    else if (activeTab === 'requests') items = medicineData.requests;
    else items = medicineData.visits;
    
    if (searchTerm) {
      items = items.filter(item => 
        item.medicine?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.donor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requester?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.center?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      items = items.filter(item => item.status === statusFilter);
    }
    
    return items;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'awaiting_center_assignment':
        return <FaHourglassHalf style={{ color: '#f59e0b' }} />;
      case 'center_assigned':
        return <FaCheckCircle style={{ color: '#10b981' }} />;
      case 'completed':
        return <FaCheckCircle style={{ color: '#059669' }} />;
      case 'confirmed':
        return <FaCheckCircle style={{ color: '#3b82f6' }} />;
      default:
        return <FaExclamationTriangle style={{ color: '#ef4444' }} />;
    }
  };

  const [selectedState, setSelectedState] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');

  const renderAssignmentSection = (item, itemType) => {
    if (item.status === 'center_assigned') {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #22c55e'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <FaCheckCircle style={{ color: '#22c55e', fontSize: '1.2rem' }} />
            <strong style={{ color: '#15803d' }}>Center Assigned</strong>
          </div>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#15803d' }}>
            <strong>Center:</strong> {item.assignedCenter || 'Not specified'}
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#15803d' }}>
            <strong>Address:</strong> {item.assignedCenterAddress || 'Not specified'}
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#15803d' }}>
            <strong>Phone:</strong> {item.assignedCenterPhone || 'Not specified'}
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#15803d' }}>
            <strong>Assigned on:</strong> {item.assignedDate || 'Not specified'}
          </p>
        </div>
      );
    }

    const availableStates = [...new Set(allCollectionCenters.map(center => center.state))].sort();
    const centersInSelectedState = selectedState ? 
      allCollectionCenters.filter(center => center.state === selectedState) : [];

    return (
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #d97706'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <FaHospital style={{ color: '#d97706', fontSize: '1.2rem' }} />
          <strong style={{ color: '#92400e' }}>Assign Collection Center</strong>
        </div>
        
        {/* Step 1: Select State */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#92400e' }}>
            Step 1: Select State
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCenter('');
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #d97706',
              borderRadius: '6px',
              fontSize: '0.9rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">Choose a state...</option>
            {availableStates.map(state => (
              <option key={state} value={state}>
                {state} ({allCollectionCenters.filter(c => c.state === state).length} centers)
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Select Center */}
        {selectedState && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#92400e' }}>
              Step 2: Select Collection Center in {selectedState}
            </label>
            <select
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d97706',
                borderRadius: '6px',
                fontSize: '0.9rem',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">Choose a collection center...</option>
              {centersInSelectedState.map(center => (
                <option key={center.id} value={center.id}>
                  {center.name} - {center.city}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3: Assign Button */}
        {selectedCenter && (
          <button
            onClick={() => {
              assignCenter(item.id, itemType, selectedCenter);
              setSelectedState('');
              setSelectedCenter('');
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <FaCheckCircle />
            Assign Selected Center
          </button>
        )}

        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#92400e' }}>
          Total: {allCollectionCenters.length} centers across {availableStates.length} states
        </p>
      </div>
    );
  };

  const MedicineManagement = () => {
    const [activeTab, setActiveTab] = useState('donations');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [medicineData, setMedicineData] = useState({
      donations: [],
      requests: [],
      visits: []
    });

    useEffect(() => {
      loadMedicineData();
    }, []);

    const loadMedicineData = () => {
      // Load medicine history from localStorage
      const savedHistory = localStorage.getItem('medicineHistory');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        setMedicineData({
          donations: history.donations || [],
          requests: history.requests || [],
          visits: history.visits || []
        });
      }
    };

    const assignCenter = (itemId, itemType, centerId) => {
      const center = allCollectionCenters.find(c => c.id === parseInt(centerId));
      if (!center) return;

      const savedHistory = localStorage.getItem('medicineHistory');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        
        if (itemType === 'donation') {
          history.donations = history.donations.map(donation => {
            if (donation.id === itemId) {
              return {
                ...donation,
                status: 'center_assigned',
                assignedCenter: center.name,
                assignedCenterAddress: center.address,
                assignedCenterPhone: center.phone,
                assignedDate: new Date().toISOString().split('T')[0],
                recipient: `Assigned to ${center.name}`
              };
            }
            return donation;
          });
        } else if (itemType === 'request') {
          history.requests = history.requests.map(request => {
            if (request.id === itemId) {
              return {
                ...request,
                status: 'center_assigned',
                assignedCenter: center.name,
                assignedCenterAddress: center.address,
                assignedCenterPhone: center.phone,
                assignedDate: new Date().toISOString().split('T')[0],
                estimatedFulfillment: `Available at ${center.name}`
              };
            }
            return request;
          });
        }
        
        localStorage.setItem('medicineHistory', JSON.stringify(history));
        setMedicineData({
          donations: history.donations || [],
          requests: history.requests || [],
          visits: history.visits || []
        });
      }
    };

    const updateVisitStatus = (visitId, newStatus) => {
      const savedHistory = localStorage.getItem('medicineHistory');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        
        history.visits = history.visits.map(visit => {
          if (visit.id === visitId) {
            return {
              ...visit,
              status: newStatus,
              completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : visit.completedDate
            };
          }
          return visit;
        });
        
        localStorage.setItem('medicineHistory', JSON.stringify(history));
        setMedicineData({
          donations: history.donations || [],
          requests: history.requests || [],
          visits: history.visits || []
        });
      }
    };

    const filteredItems = () => {
      let items = [];
      if (activeTab === 'donations') items = medicineData.donations;
      else if (activeTab === 'requests') items = medicineData.requests;
      else items = medicineData.visits;
      
      if (searchTerm) {
        items = items.filter(item => 
          item.medicine?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.donor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.requester?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.center?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (statusFilter !== 'all') {
        items = items.filter(item => item.status === statusFilter);
      }
      
      return items;
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'awaiting_center_assignment':
          return <FaHourglassHalf style={{ color: '#f59e0b' }} />;
        case 'center_assigned':
          return <FaCheckCircle style={{ color: '#10b981' }} />;
        case 'completed':
          return <FaCheckCircle style={{ color: '#059669' }} />;
        case 'confirmed':
          return <FaCheckCircle style={{ color: '#3b82f6' }} />;
        default:
          return <FaExclamationTriangle style={{ color: '#ef4444' }} />;
      }
    };

    return (
      <Container>
        <Header>
          <div>
            <h2>Medicine Management</h2>
            <p>Manage medicine donations and requests, assign collection centers</p>
          </div>
          <button
            onClick={loadMedicineData}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            <FaSearch /> Refresh Data
          </button>
        </Header>

        <TabContainer>
          <Tab 
            active={activeTab === 'donations'} 
            onClick={() => setActiveTab('donations')}
          >
            <FaHandHoldingHeart />
            Donations ({medicineData.donations.length})
          </Tab>
          <Tab 
            active={activeTab === 'requests'} 
            onClick={() => setActiveTab('requests')}
          >
            <FaStethoscope />
            Medicine Requests ({medicineData.requests.length})
          </Tab>
          <Tab 
            active={activeTab === 'visits'} 
            onClick={() => setActiveTab('visits')}
          >
            <FaMapMarkerAlt />
            Center Visits ({medicineData.visits.length})
          </Tab>
        </TabContainer>

        <FilterSection>
          <SearchInput
            type="text"
            placeholder="Search by medicine name, donor, or requester..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton
            active={statusFilter === 'all'}
            onClick={() => setStatusFilter('all')}
          >
            <FaFilter />
            All Status
          </FilterButton>
          <FilterButton
            active={statusFilter === 'awaiting_center_assignment'}
            onClick={() => setStatusFilter('awaiting_center_assignment')}
          >
            <FaTimes />
            Awaiting Assignment
          </FilterButton>
          <FilterButton
            active={statusFilter === 'center_assigned'}
            onClick={() => setStatusFilter('center_assigned')}
          >
            <FaUserCheck />
            Center Assigned
          </FilterButton>
          {activeTab === 'visits' && (
            <>
              <FilterButton
                active={statusFilter === 'confirmed'}
                onClick={() => setStatusFilter('confirmed')}
              >
                <FaCheckCircle />
                Confirmed
              </FilterButton>
              <FilterButton
                active={statusFilter === 'completed'}
                onClick={() => setStatusFilter('completed')}
              >
                <FaCheckCircle />
                Completed
              </FilterButton>
            </>
          )}
        </FilterSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredItems().map((item, index) => (
            <div key={item.id || index} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              {activeTab === 'donations' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.1rem' }}>
                        {item.medicine}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {getStatusIcon(item.status)}
                        <span style={{ 
                          color: item.status === 'center_assigned' ? '#059669' : '#f59e0b',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {item.status === 'center_assigned' ? 'Center Assigned' : 'Awaiting Assignment'}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6b7280' }}>
                      <p style={{ margin: '0.25rem 0' }}>
                        <FaUser style={{ marginRight: '0.25rem' }} />
                        {item.donor}
                      </p>
                      <p style={{ margin: '0.25rem 0' }}>
                        <FaCalendarAlt style={{ marginRight: '0.25rem' }} />
                        {item.date}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>ID:</strong> {item.id}
                      </p>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Expiry Date:</strong> {item.expiryDate}
                      </p>
                    </div>
                    <div>
                      {item.state && (
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          <strong>State:</strong> {item.state}
                        </p>
                      )}
                      {item.city && (
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          <strong>City:</strong> {item.city}
                        </p>
                      )}
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Contact:</strong> {item.contact}
                      </p>
                    </div>
                  </div>

                  {renderAssignmentSection(item, 'donation')}
                </>
              )}

              {activeTab === 'requests' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.1rem' }}>
                        {item.medicine}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {getStatusIcon(item.status)}
                        <span style={{ 
                          color: item.status === 'center_assigned' ? '#059669' : '#f59e0b',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {item.status === 'center_assigned' ? 'Center Assigned' : 'Awaiting Assignment'}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6b7280' }}>
                      <p style={{ margin: '0.25rem 0' }}>
                        <FaUser style={{ marginRight: '0.25rem' }} />
                        {item.requester}
                      </p>
                      <p style={{ margin: '0.25rem 0' }}>
                        <FaCalendarAlt style={{ marginRight: '0.25rem' }} />
                        {item.date}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>ID:</strong> {item.id}
                      </p>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Urgency:</strong> {item.urgency}
                      </p>
                    </div>
                    <div>
                      {item.state && (
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          <strong>State:</strong> {item.state}
                        </p>
                      )}
                      {item.city && (
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          <strong>City:</strong> {item.city}
                        </p>
                      )}
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Contact:</strong> {item.contact}
                      </p>
                    </div>
                  </div>

                  {renderAssignmentSection(item, 'request')}
                </>
              )}

              {activeTab === 'visits' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.1rem' }}>
                        {item.center}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {getStatusIcon(item.status)}
                        <span style={{ 
                          color: item.status === 'completed' ? '#059669' : '#3b82f6',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {item.status === 'completed' ? 'Completed' : 'Confirmed'}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6b7280' }}>
                      <p style={{ margin: '0.25rem 0' }}>
                        <FaCalendarAlt style={{ marginRight: '0.25rem' }} />
                        {item.visitDate}
                      </p>
                      <p style={{ margin: '0.25rem 0' }}>
                        <FaClock style={{ marginRight: '0.25rem' }} />
                        {item.time}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>ID:</strong> {item.id}
                      </p>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>User:</strong> {item.user}
                      </p>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Booking Date:</strong> {item.bookingDate}
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                        <strong>Purpose:</strong> {item.purpose}
                      </p>
                      {item.completedDate && (
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          <strong>Completed:</strong> {item.completedDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.status !== 'completed' && (
                    <button
                      onClick={() => updateVisitStatus(item.id, 'completed')}
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FaCheckCircle />
                      Mark as Completed
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {filteredItems().length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b'
          }}>
            <FaExclamationTriangle size={48} style={{ marginBottom: '1rem' }} />
            <p>No {activeTab} match your current filters.</p>
          </div>
        )}
      </Container>
    );
  };

  return <MedicineManagement />;
};

export default MedicineManagement;
