import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHandHoldingHeart,
  FaStethoscope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaEye,
  FaDownload,
  FaFilter,
  FaSearch,
  FaPhone
} from 'react-icons/fa';
import styled from 'styled-components';
import { useUser } from '../../contexts/UserContext';

const HistoryContainer = styled.div`
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

const HistoryCard = styled(motion.div)`
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

const CardTitle = styled.h3`
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusBadge = styled.span`
  background: ${props =>
    props.status === 'completed' ? '#dcfce7' :
      props.status === 'pending' ? '#fef3c7' :
        props.status === 'awaiting_center_assignment' ? '#fef3c7' :
          props.status === 'center_assigned' ? '#dcfce7' :
            props.status === 'approved' ? '#dbeafe' : '#fef2f2'
  };
  color: ${props =>
    props.status === 'completed' ? '#16a34a' :
      props.status === 'pending' ? '#d97706' :
        props.status === 'awaiting_center_assignment' ? '#d97706' :
          props.status === 'center_assigned' ? '#16a34a' :
            props.status === 'approved' ? '#2563eb' : '#dc2626'
  };
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const CardDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'rgba(59, 130, 246, 0.1)'};
  color: ${props => props.primary ? 'white' : '#3b82f6'};
  border: ${props => props.primary ? 'none' : '2px solid rgba(59, 130, 246, 0.2)'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  }
`;

const DetailsModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 1rem;
`;

const DetailsContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 0;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 2px solid #f1f5f9;
  
  h3 {
    margin: 0;
    color: #1e293b;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
`;

const DetailsBody = styled.div`
  padding: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: #374151;
    font-weight: 600;
  }
`;

const DetailsFooter = styled.div`
  padding: 1.5rem 2rem;
  border-top: 2px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
`;

const MedicineHistory = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Get all data from UserContext
  const { medicineHistory } = useUser();
  const donationHistory = medicineHistory?.donations || [];
  const requestHistory = medicineHistory?.requests || [];
  const visitHistory = medicineHistory?.visits || [];

  const getFilteredData = () => {
    let data = [];
    if (activeTab === 'donations') data = donationHistory;
    else if (activeTab === 'requests') data = requestHistory;
    else data = visitHistory;

    if (statusFilter === 'all') return data;

    return data.filter(item => {
      // Map 'pending' filter to multiple internal statuses
      if (statusFilter === 'pending') {
        return ['pending', 'awaiting_center_assignment', 'scheduled'].includes(item.status);
      }
      // Map 'approved' filter to multiple internal statuses including 'confirmed'
      if (statusFilter === 'approved') {
        return ['approved', 'center_assigned', 'confirmed', 'accepted'].includes(item.status);
      }
      // Map 'completed' filter
      if (statusFilter === 'completed') {
        return ['completed', 'fulfilled', 'donated'].includes(item.status);
      }
      // Exact match for others
      return item.status === statusFilter;
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle style={{ color: '#16a34a' }} />;
      case 'pending': return <FaHourglassHalf style={{ color: '#d97706' }} />;
      case 'awaiting_center_assignment': return <FaHourglassHalf style={{ color: '#d97706' }} />;
      case 'center_assigned': return <FaCheckCircle style={{ color: '#16a34a' }} />;
      case 'approved': return <FaCheckCircle style={{ color: '#2563eb' }} />;
      default: return <FaTimesCircle style={{ color: '#dc2626' }} />;
    }
  };

  return (
    <HistoryContainer>
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
          <FaHandHoldingHeart style={{ color: '#10b981' }} />
          Medicine History
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#64748b',
          margin: 0
        }}>
          Track your donations, requests, and collection center visits
        </p>
      </HeaderSection>

      <TabContainer>
        <Tab
          active={activeTab === 'donations'}
          onClick={() => setActiveTab('donations')}
        >
          <FaHandHoldingHeart />
          My Donations ({donationHistory.length})
        </Tab>
        <Tab
          active={activeTab === 'requests'}
          onClick={() => setActiveTab('requests')}
        >
          <FaStethoscope />
          My Requests ({requestHistory.length})
        </Tab>
        <Tab
          active={activeTab === 'visits'}
          onClick={() => setActiveTab('visits')}
        >
          <FaMapMarkerAlt />
          Center Visits ({visitHistory.length})
        </Tab>
      </TabContainer>

      <FilterSection>
        <FilterButton
          active={statusFilter === 'all'}
          onClick={() => setStatusFilter('all')}
        >
          <FaFilter />
          All Status
        </FilterButton>
        <FilterButton
          active={statusFilter === 'completed'}
          onClick={() => setStatusFilter('completed')}
        >
          <FaCheckCircle />
          Completed
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
      </FilterSection>

      <div>
        {getFilteredData().map((item, index) => (
          <HistoryCard
            key={item.id}
            type={activeTab.slice(0, -1)}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CardHeader>
              <CardTitle>
                {activeTab === 'donations' && <FaHandHoldingHeart style={{ color: '#10b981' }} />}
                {activeTab === 'requests' && <FaStethoscope style={{ color: '#3b82f6' }} />}
                {activeTab === 'visits' && <FaMapMarkerAlt style={{ color: '#8b5cf6' }} />}
                {activeTab === 'donations' ? item.medicine :
                  activeTab === 'requests' ? item.medicine :
                    item.center}
              </CardTitle>
              <StatusBadge status={item.status}>
                {getStatusIcon(item.status)}
                {item.status === 'center_assigned' ? 'Center Assigned' :
                  item.status === 'awaiting_center_assignment' ? 'Awaiting Assignment' :
                    item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </StatusBadge>
            </CardHeader>

            <CardDetails>
              {activeTab === 'donations' && (
                <>
                  <DetailItem>
                    <FaCalendarAlt />
                    Donated: {item.donatedDate}
                  </DetailItem>
                  <DetailItem>
                    <FaMapMarkerAlt />
                    {item.pickupCenter}
                  </DetailItem>
                  <DetailItem>
                    <FaHandHoldingHeart />
                    Quantity: {item.quantity}
                  </DetailItem>
                  <DetailItem>
                    <FaStethoscope />
                    Recipient: {item.recipient}
                  </DetailItem>
                </>
              )}

              {activeTab === 'requests' && (
                <>
                  <DetailItem>
                    <FaCalendarAlt />
                    Requested: {item.requestedDate}
                  </DetailItem>
                  <DetailItem>
                    <FaMapMarkerAlt />
                    {item.assignedCenter || item.collectionCenter || 'Not assigned yet'}
                  </DetailItem>
                  <DetailItem>
                    <FaStethoscope />
                    Condition: {item.condition}
                  </DetailItem>
                  <DetailItem>
                    <FaClock />
                    Urgency: {item.urgency}
                  </DetailItem>
                </>
              )}

              {activeTab === 'visits' && (
                <>
                  <DetailItem>
                    <FaCalendarAlt />
                    Visit Date: {item.visitDate}
                  </DetailItem>
                  <DetailItem>
                    <FaClock />
                    Time: {item.time}
                  </DetailItem>
                  <DetailItem>
                    <FaMapMarkerAlt />
                    Address: {item.centerAddress}
                  </DetailItem>
                  <DetailItem>
                    <FaPhone />
                    Phone: {item.centerPhone}
                  </DetailItem>
                  <DetailItem>
                    <FaStethoscope />
                    Purpose: {item.purpose}
                  </DetailItem>
                </>
              )}
            </CardDetails>

            <ActionButtons>
              <ActionButton
                primary
                onClick={() => {
                  setSelectedItem(item);
                  setShowDetailsModal(true);
                }}
              >
                <FaEye />
                View Details
              </ActionButton>
              {activeTab === 'donations' && item.status === 'completed' && (
                <ActionButton>
                  <FaHandHoldingHeart />
                  Impact Report
                </ActionButton>
              )}
            </ActionButtons>
          </HistoryCard>
        ))}

        {getFilteredData().length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b'
          }}>
            <FaStethoscope style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No {activeTab} found</h3>
            <p>No {activeTab} match the selected filter criteria</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <DetailsModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDetailsModal(false)}
        >
          <DetailsContent onClick={(e) => e.stopPropagation()}>
            <DetailsHeader>
              <h3>
                {activeTab === 'donations' && <FaHandHoldingHeart style={{ color: '#10b981', marginRight: '0.5rem' }} />}
                {activeTab === 'requests' && <FaStethoscope style={{ color: '#3b82f6', marginRight: '0.5rem' }} />}
                {activeTab === 'visits' && <FaMapMarkerAlt style={{ color: '#8b5cf6', marginRight: '0.5rem' }} />}
                {activeTab === 'donations' ? 'Donation Details' :
                  activeTab === 'requests' ? 'Request Details' :
                    'Visit Details'}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                ×
              </button>
            </DetailsHeader>

            <DetailsBody>
              <DetailRow>
                <strong>ID:</strong> {selectedItem.id}
              </DetailRow>
              <DetailRow>
                <strong>Status:</strong>
                <StatusBadge status={selectedItem.status} style={{ marginLeft: '0.5rem' }}>
                  {getStatusIcon(selectedItem.status)}
                  {selectedItem.status === 'center_assigned' ? 'Center Assigned' :
                    selectedItem.status === 'awaiting_center_assignment' ? 'Awaiting Assignment' :
                      selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                </StatusBadge>
              </DetailRow>

              {activeTab === 'donations' && (
                <>
                  <DetailRow>
                    <strong>Medicine:</strong> {selectedItem.medicine}
                  </DetailRow>
                  <DetailRow>
                    <strong>Quantity:</strong> {selectedItem.quantity}
                  </DetailRow>
                  <DetailRow>
                    <strong>Donated Date:</strong> {selectedItem.donatedDate}
                  </DetailRow>
                  <DetailRow>
                    <strong>Pickup Center:</strong> {selectedItem.pickupCenter}
                  </DetailRow>
                  <DetailRow>
                    <strong>Recipient:</strong> {selectedItem.recipient}
                  </DetailRow>
                  <DetailRow>
                    <strong>Estimated Value:</strong> {selectedItem.value}
                  </DetailRow>
                </>
              )}

              {activeTab === 'requests' && (
                <>
                  <DetailRow>
                    <strong>Medicine:</strong> {selectedItem.medicine}
                  </DetailRow>
                  <DetailRow>
                    <strong>Quantity:</strong> {selectedItem.quantity}
                  </DetailRow>
                  <DetailRow>
                    <strong>Requested Date:</strong> {selectedItem.requestedDate || selectedItem.requestDate}
                  </DetailRow>
                  <DetailRow>
                    <strong>Collection Center:</strong> {selectedItem.assignedCenter || selectedItem.collectionCenter || 'To be assigned'}
                  </DetailRow>
                  <DetailRow>
                    <strong>Urgency:</strong> {selectedItem.urgency}
                  </DetailRow>
                  <DetailRow>
                    <strong>Medical Condition:</strong> {selectedItem.condition || selectedItem.medicalCondition}
                  </DetailRow>
                  <DetailRow>
                    <strong>Estimated Fulfillment:</strong> {selectedItem.estimatedFulfillment}
                  </DetailRow>
                </>
              )}

              {activeTab === 'visits' && (
                <>
                  <DetailRow>
                    <strong>Center:</strong> {selectedItem.center}
                  </DetailRow>
                  <DetailRow>
                    <strong>Visit Date:</strong> {selectedItem.visitDate}
                  </DetailRow>
                  <DetailRow>
                    <strong>Purpose:</strong> {selectedItem.purpose}
                  </DetailRow>
                  <DetailRow>
                    <strong>Medicines Collected:</strong> {selectedItem.medicines ? selectedItem.medicines.join(', ') : 'N/A'}
                  </DetailRow>
                </>
              )}
            </DetailsBody>

            <DetailsFooter>
              <ActionButton
                primary
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </ActionButton>
            </DetailsFooter>
          </DetailsContent>
        </DetailsModal>
      )}
    </HistoryContainer>
  );
};

export default MedicineHistory;
