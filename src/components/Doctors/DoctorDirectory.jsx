import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaStar, 
  FaClock, 
  FaPhone,
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaRupeeSign,
  FaEye,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { getDoctors, getSpecializations, getCities, getHospitals } from '../../services/api';
import HeartbeatLoader from '../common/HeartbeatLoader';
import './DoctorDirectory.css';

const DoctorDirectory = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    specialization: '',
    city: '',
    hospital: '',
    minRating: '',
    maxPrice: ''
  });
  const [specializations, setSpecializations] = useState([]);
  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [filters]);

  // Clean up any debug logs in production
  useEffect(() => {
    // Remove any console.log statements in production
    if (process.env.NODE_ENV === 'production') {
      console.log = () => {};
      console.warn = () => {};
    }
  }, []);

  const loadInitialData = async () => {
    try {
      const [specs, citiesData, hospitalsData] = await Promise.all([
        getSpecializations(),
        getCities(),
        getHospitals()
      ]);
      setSpecializations(specs);
      setCities(citiesData);
      setHospitals(hospitalsData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const doctorsData = await getDoctors(filters);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      specialization: '',
      city: '',
      hospital: '',
      minRating: '',
      maxPrice: ''
    });
  };

  useEffect(() => {
    // Cleanup function to ensure body scroll is reset when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleDoctorClick = (doctor) => {
    // Save current scroll position
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const closeDoctorModal = () => {
    // Restore scroll position
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    setShowDoctorModal(false);
    setSelectedDoctor(null);
  };

  const handleBookAppointment = (doctor) => {
    closeDoctorModal();
    navigate(`/book-appointment/${doctor.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="doctor-directory">

      {/* Header */}
      <motion.div 
        className="directory-header"
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="header-title"
        >
          Find Your Doctor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="header-subtitle"
        >
          Book appointments with the best healthcare professionals
        </motion.p>
        
        {/* Animated Background Elements */}
        <motion.div 
          className="header-bg-element header-bg-1"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="header-bg-element header-bg-2"
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="header-bg-element header-bg-3"
          animate={{ 
            y: [0, -20, 0],
            rotate: 180,
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="search-filters-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search doctors, specializations, or hospitals..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          Filters
          {showFilters ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </motion.div>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div 
          className="advanced-filters"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="filters-grid">
            <div className="filter-group">
              <label>Specialization</label>
              <select
                value={filters.specialization}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>City</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city.city} value={city.city}>{city.city}, {city.state}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Hospital</label>
              <select
                value={filters.hospital}
                onChange={(e) => handleFilterChange('hospital', e.target.value)}
              >
                <option value="">All Hospitals</option>
                {hospitals.map(hospital => (
                  <option key={hospital} value={hospital}>{hospital}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Max Price</label>
              <select
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="500">Under ₹500</option>
                <option value="1000">Under ₹1000</option>
                <option value="1500">Under ₹1500</option>
                <option value="2000">Under ₹2000</option>
              </select>
            </div>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Clear All Filters
          </button>
        </motion.div>
      )}

      {/* Results Count */}
      <motion.div 
        className="results-count"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>{loading ? 'Loading...' : `${doctors.length} doctors found`}</p>
      </motion.div>

      {/* Doctors Grid */}
      <motion.div 
        className="doctors-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {loading ? (
          <div className="loading-spinner">
            <HeartbeatLoader />
            <p>Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="no-results">
            <FaUserMd className="no-results-icon" />
            <h3>No doctors found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              className="doctor-card"
              initial={{ 
                opacity: 0, 
                y: 80, 
                scale: 0.7, 
                rotateX: 25,
                rotateY: -15,
                z: -100
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotateX: 0,
                rotateY: 0,
                z: 0
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 12,
                bounce: 0.3
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                rotateX: -2,
                z: 50,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                transition: { 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              whileTap={{ 
                scale: 0.95,
                rotateX: 5,
                transition: { duration: 0.1 }
              }}
            >
              <motion.div 
                className="doctor-image"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.img 
                  src={doctor.profile_image} 
                  alt={doctor.name}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.2,
                    type: "spring"
                  }}
                />
                {doctor.is_verified && (
                  <motion.div 
                    className="verified-badge"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <FaStar />
                  </motion.div>
                )}
              </motion.div>

              <motion.div 
                className="doctor-info"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.3,
                  type: "spring"
                }}
              >
                <motion.h3 
                  className="doctor-name"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.4
                  }}
                >
                  {doctor.name}
                </motion.h3>
                <motion.p 
                  className="doctor-specialization"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.5
                  }}
                >
                  {doctor.specialization}
                </motion.p>
                <motion.p 
                  className="doctor-qualification"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.6
                  }}
                >
                  {doctor.qualification}
                </motion.p>
                
                <motion.div 
                  className="doctor-rating"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.7,
                    type: "spring"
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stars">
                    {renderStars(doctor.rating)}
                  </div>
                  <span className="rating-text">
                    {doctor.rating} ({doctor.total_reviews} reviews)
                  </span>
                </motion.div>

                <motion.div 
                  className="doctor-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.8
                  }}
                >
                  {[
                    { icon: FaHospital, text: doctor.hospital_name },
                    { icon: FaMapMarkerAlt, text: `${doctor.city}, ${doctor.state}` },
                    { icon: FaClock, text: `${doctor.experience_years} years experience` },
                    { icon: FaRupeeSign, text: `₹${doctor.consultation_fee}` }
                  ].map((item, detailIndex) => (
                    <motion.div 
                      key={detailIndex}
                      className="detail-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1 + 0.9 + detailIndex * 0.1
                      }}
                      whileHover={{ 
                        x: 5, 
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <item.icon />
                      </motion.div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="doctor-actions"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 1.2
                  }}
                >
                  <motion.button 
                    className="view-profile-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDoctorClick(doctor);
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaEye />
                    </motion.div>
                    View Profile
                  </motion.button>
                  <motion.button 
                    className="book-appointment-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookAppointment(doctor);
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      <FaCalendarAlt />
                    </motion.div>
                    Book Appointment
                  </motion.button>
                </motion.div>
                
                {/* Google Maps Link on Card */}
                <motion.div 
                  className="card-maps-link"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 1.4
                  }}
                >
                  <motion.a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.hospital_address + ', ' + doctor.city + ', ' + doctor.state)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-maps-btn"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ 
                      scale: 1.02,
                      y: -1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      whileHover={{ 
                        y: [0, -2, 0],
                        transition: { duration: 0.4, repeat: Infinity }
                      }}
                    >
                      <FaMapMarkerAlt />
                    </motion.div>
                    View Hospital on Map
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Doctor Detail Modal */}
      <AnimatePresence>
        {showDoctorModal && selectedDoctor && (
        <motion.div 
          className="doctor-modal-overlay"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          onClick={closeDoctorModal}
        >
          <motion.div 
            className="doctor-modal"
            initial={{ 
              scale: 0.3, 
              opacity: 0, 
              y: 100,
              rotateX: 45,
              rotateY: 15
            }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              rotateY: 0
            }}
            exit={{ 
              scale: 0.3, 
              opacity: 0, 
              y: -100,
              rotateX: -45,
              rotateY: -15
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.6
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            <button className="modal-close" onClick={closeDoctorModal}>
              <FaTimes />
            </button>

            <div className="modal-content">
              {selectedDoctor ? (
                <>
                  <div className="modal-header">
                    <img src={selectedDoctor.profile_image} alt={selectedDoctor.name} />
                    <div className="modal-doctor-info">
                      <h2>{selectedDoctor.name}</h2>
                      <p className="specialization">{selectedDoctor.specialization}</p>
                      <p className="qualification">{selectedDoctor.qualification}</p>
                      <div className="rating">
                        {renderStars(selectedDoctor.rating)}
                        <span>{selectedDoctor.rating} ({selectedDoctor.total_reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="modal-body">
                    <div className="info-section">
                      <h3>About</h3>
                      <p>{selectedDoctor.about}</p>
                    </div>

                    <div className="info-section">
                      <h3>Education & Experience</h3>
                      <p>{selectedDoctor.education}</p>
                      <p><strong>Experience:</strong> {selectedDoctor.experience_years} years</p>
                    </div>

                    <div className="info-section">
                      <h3>Hospital Details</h3>
                      <p><strong>Hospital:</strong> {selectedDoctor.hospital_name}</p>
                      <p><strong>Address:</strong> {selectedDoctor.hospital_address}</p>
                      <p><strong>City:</strong> {selectedDoctor.city}, {selectedDoctor.state} - {selectedDoctor.pincode}</p>
                      <p><strong>Languages:</strong> {selectedDoctor.languages}</p>
                      
                      {/* Google Maps Link */}
                      <div className="maps-link">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDoctor.hospital_address + ', ' + selectedDoctor.city + ', ' + selectedDoctor.state)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="maps-btn"
                        >
                          <FaMapMarkerAlt />
                          View on Google Maps
                        </a>
                      </div>
                    </div>

                    <div className="info-section">
                      <h3>Consultation Details</h3>
                      <p><strong>Fee:</strong> ₹{selectedDoctor.consultation_fee}</p>
                      <p><strong>Duration:</strong> {selectedDoctor.consultation_duration} minutes</p>
                      <p><strong>Available Days:</strong> {selectedDoctor.available_days}</p>
                      <p><strong>Time Slots:</strong> {selectedDoctor.available_time_slots}</p>
                    </div>

                    {selectedDoctor.awards && (
                      <div className="info-section">
                        <h3>Awards & Recognition</h3>
                        <p>{selectedDoctor.awards}</p>
                      </div>
                    )}

                    {selectedDoctor.publications && (
                      <div className="info-section">
                        <h3>Publications</h3>
                        <p>{selectedDoctor.publications}</p>
                      </div>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button className="contact-btn">
                      <FaPhone />
                      Contact
                    </button>
                    <button 
                      className="book-now-btn"
                      onClick={() => handleBookAppointment(selectedDoctor)}
                    >
                      <FaCalendarAlt />
                      Book Appointment
                    </button>
                  </div>
                </>
              ) : (
                <div className="modal-header">
                  <h2>Loading...</h2>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorDirectory;
