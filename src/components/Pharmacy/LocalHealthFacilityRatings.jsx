import React, { useState } from 'react';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaUsers, FaBed, FaStethoscope } from 'react-icons/fa';
import { indianHealthData } from '../../data/indianHealthData';
import './LocalHealthFacilityRatings.css';

const LocalHealthFacilityRatings = () => {
  const [selectedState, setSelectedState] = useState('DL');
  const [selectedCity, setSelectedCity] = useState('all');
  const [facilityType, setFacilityType] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const stateInfo = indianHealthData.states.find(state => state.id === selectedState);
  const stateFacilities = indianHealthData.healthFacilities.filter(facility =>
    facility.state === stateInfo.name
  );

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#10b981';
    if (rating >= 4.0) return '#059669';
    if (rating >= 3.5) return '#f59e0b';
    if (rating >= 3.0) return '#ef4444';
    return '#dc2626';
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < Math.floor(rating) ? 'star filled' : 'star empty'}
      />
    ));
  };

  const filteredFacilities = stateFacilities.filter(facility => {
    const matchesCity = selectedCity === 'all' || facility.location === selectedCity;
    const matchesType = facilityType === 'all' || facility.type === facilityType;
    return matchesCity && matchesType;
  });

  const sortedFacilities = [...filteredFacilities].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.totalReviews - a.totalReviews;
      case 'beds':
        return b.beds - a.beds;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="facility-ratings-container">
      <div className="facility-header">
        <h2>🏥 Local Health Facility Ratings</h2>
        <p>Find and compare healthcare facilities with patient reviews and ratings</p>
      </div>

      <div className="facility-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>State:</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('all');
              }}
              className="filter-select"
            >
              {indianHealthData.states.map(state => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Cities</option>
              {stateInfo.cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Facility Type:</label>
            <select
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="Super Specialty Hospital">Super Specialty</option>
              <option value="Multi-Specialty Hospital">Multi-Specialty</option>
              <option value="Specialty Clinic">Specialty Clinic</option>
              <option value="Diagnostic Center">Diagnostic Center</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
              <option value="beds">Bed Capacity</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      <div className="facilities-stats">
        <div className="stats-overview">
          <div className="stat-item">
            <div className="stat-icon">🏥</div>
            <div className="stat-content">
              <h3>{stateFacilities.length}</h3>
              <p>Total Facilities</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3>{(stateFacilities.reduce((sum, f) => sum + f.rating, 0) / stateFacilities.length).toFixed(1)}</h3>
              <p>Avg Rating</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-content">
              <h3>{stateFacilities.reduce((sum, f) => sum + f.doctors, 0).toLocaleString()}</h3>
              <p>Total Doctors</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🛏️</div>
            <div className="stat-content">
              <h3>{stateFacilities.reduce((sum, f) => sum + f.beds, 0).toLocaleString()}</h3>
              <p>Total Beds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="facilities-list">
        {sortedFacilities.map((facility) => (
          <div key={facility.id} className="facility-card">
            <div className="facility-header">
              <div className="facility-main-info">
                <div className="facility-type-icon">
                  {facility.type === 'Super Specialty Hospital' && '🏥'}
                  {facility.type === 'Multi-Specialty Hospital' && '🏥'}
                  {facility.type === 'Specialty Clinic' && '🏥'}
                  {facility.type === 'Diagnostic Center' && '🏥'}
                </div>
                <div className="facility-details">
                  <h3 className="facility-name">{facility.name}</h3>
                  <div className="facility-meta">
                    <span className="facility-type">{facility.type}</span>
                    <span className="facility-location">
                      <FaMapMarkerAlt /> {facility.location}, {facility.state}
                    </span>
                  </div>
                </div>
              </div>

              <div className="facility-rating">
                <div className="rating-display">
                  <div className="rating-score" style={{ color: getRatingColor(facility.rating) }}>
                    {facility.rating}
                  </div>
                  <div className="rating-stars">
                    {getRatingStars(facility.rating)}
                  </div>
                  <div className="rating-count">({facility.totalReviews} reviews)</div>
                </div>
              </div>
            </div>

            <div className="facility-stats">
              <div className="stat-item">
                <FaUsers />
                <span>{facility.doctors} Doctors</span>
              </div>
              <div className="stat-item">
                <FaBed />
                <span>{facility.beds} Beds</span>
              </div>
              <div className="stat-item">
                <FaClock />
                <span>{facility.waitingTime}</span>
              </div>
              <div className="stat-item">
                <span className="cost-range">{facility.averageCost}</span>
              </div>
            </div>

            <div className="facility-specialties">
              <h4>🩺 Specialties</h4>
              <div className="specialties-list">
                {facility.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag">{specialty}</span>
                ))}
              </div>
            </div>

            <div className="facility-facilities">
              <h4>🏥 Facilities</h4>
              <div className="facilities-list">
                {facility.facilities.map((fac, index) => (
                  <span key={index} className="facility-tag">{fac}</span>
                ))}
              </div>
            </div>

            <div className="facility-contact">
              <div className="contact-info">
                <div className="contact-item">
                  <FaPhone />
                  <span>{facility.contact}</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>{facility.address}</span>
                </div>
              </div>
            </div>

            <div className="facility-actions">
              <button className="action-btn primary">
                📞 Call Now
              </button>
              <button className="action-btn secondary">
                📍 Get Directions
              </button>
              <button className="action-btn tertiary">
                👨‍⚕️ Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedFacilities.length === 0 && (
        <div className="no-facilities">
          <div className="no-facilities-icon">🏥</div>
          <h3>No Facilities Found</h3>
          <p>No healthcare facilities match your current filters.</p>
        </div>
      )}

      <div className="facility-tips">
        <h3>💡 Tips for Choosing Healthcare Facilities</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <div className="tip-icon">⭐</div>
            <div className="tip-content">
              <h4>Check Ratings & Reviews</h4>
              <p>Look for facilities with high ratings and positive patient feedback</p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-icon">🩺</div>
            <div className="tip-content">
              <h4>Verify Specialties</h4>
              <p>Ensure the facility has specialists for your specific health needs</p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-icon">💳</div>
            <div className="tip-content">
              <h4>Check Insurance</h4>
              <p>Verify if your insurance is accepted to avoid surprise bills</p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-icon">🚨</div>
            <div className="tip-content">
              <h4>Emergency Services</h4>
              <p>Confirm 24/7 emergency care availability for urgent situations</p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-icon">📍</div>
            <div className="tip-content">
              <h4>Location & Accessibility</h4>
              <p>Consider travel time and ease of access for regular visits</p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-icon">⏰</div>
            <div className="tip-content">
              <h4>Waiting Times</h4>
              <p>Check average waiting times for appointments and consultations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalHealthFacilityRatings;
