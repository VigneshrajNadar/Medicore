import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaDirections,
  FaSearch,
  FaFilter,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { filterCenters, getStates, getCitiesByState } from '../../data/collectionCenters';

const ModalOverlay = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
`;

const ModalTitle = styled.h2`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#8b5cf6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: 2px solid #8b5cf6;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: #8b5cf6;
    color: white;
  }
`;

const CenterCard = styled(motion.div)`
  background: white;
  border: 2px solid #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #8b5cf6;
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.1);
  }
`;

const CenterName = styled.h3`
  color: #1e293b;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CenterInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
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
  background: ${props => props.primary ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : 'rgba(139, 92, 246, 0.1)'};
  color: ${props => props.primary ? 'white' : '#8b5cf6'};
  border: ${props => props.primary ? 'none' : '2px solid rgba(139, 92, 246, 0.2)'};
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
  }
`;

const StatusBadge = styled.span`
  background: ${props => props.status === 'open' ? '#dcfce7' : '#fef3c7'};
  color: ${props => props.status === 'open' ? '#16a34a' : '#d97706'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const CollectionCentersModal = ({ isOpen, onClose }) => {
  const { addCenterVisit } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const filteredCenters = filterCenters({
    search: searchTerm,
    type: activeFilter,
    status: 'all',
    state: selectedState,
    city: selectedCity
  }).slice(0, 50); // Limit to 50 results for performance

  const states = getStates();
  const cities = selectedState ? getCitiesByState(selectedState) : [];

  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleGetDirections = (center) => {
    const { lat, lng } = center.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleBookVisit = (center) => {
    const visitDate = new Date();
    visitDate.setDate(visitDate.getDate() + 1); // Tomorrow
    
    // Add visit to user's history using UserContext
    if (typeof addCenterVisit === 'function') {
      addCenterVisit({
        center: center.name,
        centerAddress: center.address,
        centerPhone: center.phone,
        visitDate: visitDate.toISOString().split('T')[0],
        time: '10:00 AM',
        purpose: 'Medicine Donation/Collection'
      });
    }
    
    alert(`Visit booked successfully!\n\nCenter: ${center.name}\nDate: ${visitDate.toLocaleDateString()}\nTime: 10:00 AM\n\nYou will receive a confirmation SMS shortly.`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                <FaMapMarkerAlt style={{ color: '#8b5cf6' }} />
                Collection Centers Near You
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <SearchBar>
              <SearchInput
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FilterButton
                active={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                <FaFilter />
                All Centers
              </FilterButton>
              <FilterButton
                active={activeFilter === 'open'}
                onClick={() => setActiveFilter('open')}
              >
                <FaCheckCircle />
                Open Now
              </FilterButton>
              <FilterButton
                active={activeFilter === 'pharmacy'}
                onClick={() => setActiveFilter('pharmacy')}
              >
                <FaMapMarkerAlt />
                Pharmacies
              </FilterButton>
              <FilterButton
                active={activeFilter === 'hospital'}
                onClick={() => setActiveFilter('hospital')}
              >
                <FaMapMarkerAlt />
                Hospitals
              </FilterButton>
              <select 
                value={selectedState} 
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
                style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  marginLeft: '1rem'
                }}
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {selectedState && (
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    marginLeft: '0.5rem'
                  }}
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              )}
            </SearchBar>

            <div>
              {filteredCenters.map((center, index) => (
                <CenterCard
                  key={center.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CenterName>
                    {center.name}
                    <StatusBadge status={center.status}>
                      {center.status === 'open' ? 'Open' : 'Closed'}
                    </StatusBadge>
                  </CenterName>
                  
                  <CenterInfo>
                    <InfoItem>
                      <FaMapMarkerAlt style={{ color: '#8b5cf6' }} />
                      {center.address}
                    </InfoItem>
                    <InfoItem>
                      <FaPhone style={{ color: '#10b981' }} />
                      {center.phone}
                    </InfoItem>
                    <InfoItem>
                      <FaClock style={{ color: '#f59e0b' }} />
                      {center.hours}
                    </InfoItem>
                    <InfoItem>
                      <FaStar style={{ color: '#fbbf24' }} />
                      {center.rating} ⭐ • {center.state}, {center.city}
                    </InfoItem>
                  </CenterInfo>

                  <ActionButtons>
                    <ActionButton 
                      primary
                      onClick={() => handleGetDirections(center)}
                    >
                      <FaDirections />
                      Get Directions
                    </ActionButton>
                    <ActionButton onClick={() => handleCall(center.phone)}>
                      <FaPhone />
                      Call
                    </ActionButton>
                    {center.status === 'open' && (
                      <ActionButton onClick={() => handleBookVisit(center)}>
                        <FaCheckCircle />
                        Book Visit
                      </ActionButton>
                    )}
                  </ActionButtons>
                </CenterCard>
              ))}

              {filteredCenters.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem', 
                  color: '#64748b' 
                }}>
                  <FaSearch style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
                  <h3>No collection centers found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CollectionCentersModal;
