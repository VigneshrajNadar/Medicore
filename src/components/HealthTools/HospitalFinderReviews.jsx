import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { 
  FaHospital, FaSearch, FaFilter, FaStar, FaMapMarkerAlt, 
  FaPhone, FaClock, FaUserMd, FaBed, FaAmbulance, 
  FaDirections, FaGlobe, FaShare, FaTimes 
} from 'react-icons/fa';
import allHospitals from '../../data/hospitalsData';
import './HospitalFinderReviews.css';

const HospitalFinderReviews = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedDistance, setSelectedDistance] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    category: 'overall'
  });

  const specialties = [
    'all',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Oncology',
    'Pediatrics',
    'Emergency Medicine',
    'General Surgery',
    'Internal Medicine',
    'Psychiatry',
    'Dermatology',
    'Ophthalmology'
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' }
  ];

  const distanceOptions = [
    { value: 'all', label: 'Any Distance' },
    { value: '5', label: 'Within 5 km' },
    { value: '10', label: 'Within 10 km' },
    { value: '25', label: 'Within 25 km' },
    { value: '50', label: 'Within 50 km' }
  ];

  const reviewCategories = [
    { value: 'overall', label: 'Overall Experience' },
    { value: 'doctors', label: 'Doctors & Staff' },
    { value: 'facilities', label: 'Facilities & Equipment' },
    { value: 'cleanliness', label: 'Cleanliness' },
    { value: 'wait_time', label: 'Wait Time' },
    { value: 'cost', label: 'Cost & Value' }
  ];

  useEffect(() => {
    // Add images to hospital data with reliable Unsplash URLs
    const hospitalImages = [
      'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Modern hospital building
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Medical facility
      'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Hospital exterior
      'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Healthcare building
      'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Hospital entrance
      'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Medical center
      'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Hospital corridor
      'https://images.pexels.com/photos/3845623/pexels-photo-3845623.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Emergency department
      'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Hospital room
      'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'  // Medical facility
    ];

    const hospitalsWithImages = allHospitals.map((hospital, index) => ({
      ...hospital,
      image: hospitalImages[index % hospitalImages.length],
      distance: Math.floor(Math.random() * 20) + 1,
      doctors: hospital.bedCount ? Math.floor(hospital.bedCount / 10) : Math.floor(Math.random() * 50) + 20,
      beds: hospital.bedCount || Math.floor(Math.random() * 200) + 50,
      emergency: hospital.emergencyServices || Math.random() > 0.5,
      ambulance: Math.random() > 0.6,
      operatingHours: "24/7",
      website: `https://www.${hospital.name.toLowerCase().replace(/\s+/g, '')}.com`,
      description: `${hospital.name} is a leading healthcare institution providing comprehensive medical services with state-of-the-art facilities and experienced medical professionals.`
    }));
    
    setHospitals(hospitalsWithImages);
    setFilteredHospitals(hospitalsWithImages);
  }, []);

  const filterHospitals = useCallback(() => {
    let filtered = hospitals;

    if (searchTerm) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(hospital =>
        hospital.specialties.includes(selectedSpecialty)
      );
    }

    if (selectedRating > 0) {
      filtered = filtered.filter(hospital => hospital.rating >= selectedRating);
    }

    if (selectedDistance !== 'all') {
      filtered = filtered.filter(hospital =>
        hospital.distance <= parseInt(selectedDistance)
      );
    }

    setFilteredHospitals(filtered);
  }, [hospitals, searchTerm, selectedSpecialty, selectedRating, selectedDistance]);

  useEffect(() => {
    filterHospitals();
  }, [filterHospitals]);

  const addReview = () => {
    if (!currentReview.title || !currentReview.comment) return;

    const newReview = {
      id: Date.now(),
      user: 'Current User',
      ...currentReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    const updatedHospital = {
      ...selectedHospital,
      reviews: [newReview, ...selectedHospital.reviews],
      totalReviews: selectedHospital.totalReviews + 1
    };

    // Update average rating
    const totalRating = updatedHospital.reviews.reduce((sum, review) => sum + review.rating, 0);
    updatedHospital.rating = Math.round((totalRating / updatedHospital.reviews.length) * 10) / 10;

    setHospitals(prev => prev.map(h => h.id === selectedHospital.id ? updatedHospital : h));
    setFilteredHospitals(prev => prev.map(h => h.id === selectedHospital.id ? updatedHospital : h));
    setSelectedHospital(updatedHospital);
    setCurrentReview({
      rating: 5,
      title: '',
      comment: '',
      category: 'overall'
    });
    setShowReviewForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  const getCategoryLabel = (category) => {
    return reviewCategories.find(c => c.value === category)?.label || category;
  };

  const openHospitalDetails = (hospital) => {
    setSelectedHospital(hospital);
  };

  const closeHospitalDetails = () => {
    setSelectedHospital(null);
    setShowReviewForm(false);
  };

  return (
    <motion.div 
      className="hospital-finder-reviews"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="finder-header">
        <FaHospital className="header-icon" />
        <h2>Hospital Finder & Reviews</h2>
        <p>Find the best hospitals near you, read reviews, and share your experiences</p>
      </div>

      {/* Search and Filters */}
      <motion.div 
        className="search-filters-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search hospitals by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-toggle">
          <motion.button
            className="filters-btn"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter /> Filters
          </motion.button>
        </div>

        {showFilters && (
          <motion.div 
            className="filters-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-row">
              <div className="filter-group">
                <label>Specialty:</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Rating:</label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                >
                  {ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Distance:</label>
                <select
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(e.target.value)}
                >
                  {distanceOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results Count */}
      <motion.div 
        className="results-count"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p>Found {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? 's' : ''}</p>
      </motion.div>

      {/* Hospitals Grid */}
      <motion.div 
        className="hospitals-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {filteredHospitals.map((hospital, index) => (
          <motion.div
            key={hospital.id}
            className="hospital-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="hospital-image">
              <img src={hospital.image} alt={hospital.name} />
              <div className="hospital-badges">
                {hospital.emergency && <span className="badge emergency">Emergency</span>}
                {hospital.ambulance && <span className="badge ambulance">Ambulance</span>}
              </div>
            </div>

            <div className="hospital-content">
              <div className="hospital-header">
                <h3 className="hospital-name">{hospital.name}</h3>
                <div className="hospital-rating">
                  {renderStars(hospital.rating)}
                  <span className="rating-text">{hospital.rating}</span>
                  <span className="reviews-count">({hospital.totalReviews} reviews)</span>
                </div>
              </div>

              <div className="hospital-specialties">
                {hospital.specialties.slice(0, 3).map(specialty => (
                  <span key={specialty} className="specialty-tag">{specialty}</span>
                ))}
                {hospital.specialties.length > 3 && (
                  <span className="specialty-tag more">+{hospital.specialties.length - 3} more</span>
                )}
              </div>

              <div className="hospital-info">
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <span>{hospital.distance} km away</span>
                </div>
                <div className="info-item">
                  <FaUserMd className="info-icon" />
                  <span>{hospital.doctors} doctors</span>
                </div>
                <div className="info-item">
                  <FaBed className="info-icon" />
                  <span>{hospital.beds} beds</span>
                </div>
              </div>

              <div className="hospital-actions">
                <motion.button
                  className="view-details-btn"
                  onClick={() => openHospitalDetails(hospital)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
                <motion.button
                  className="directions-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDirections />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Hospital Details Modal */}
      {selectedHospital && ReactDOM.createPortal(
        <div 
          className="hospital-modal-overlay"
          onClick={closeHospitalDetails}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 999999,
            backdropFilter: 'blur(10px)',
            margin: 0
          }}
        >
          <motion.div 
            className="hospital-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '25px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="modal-header">
              <h2>{selectedHospital.name}</h2>
              <button className="close-btn" onClick={closeHospitalDetails}>×</button>
            </div>

            <div className="modal-content">
              <div className="hospital-overview">
                <img src={selectedHospital.image} alt={selectedHospital.name} className="modal-image" />
                <div className="overview-details">
                  <div className="overview-rating">
                    {renderStars(selectedHospital.rating)}
                    <span className="rating-text">{selectedHospital.rating}</span>
                    <span className="reviews-count">({selectedHospital.totalReviews} reviews)</span>
                  </div>
                  <p className="hospital-description">{selectedHospital.description}</p>
                  
                  <div className="hospital-stats">
                    <div className="stat-item">
                      <FaUserMd className="stat-icon" />
                      <span>{selectedHospital.doctors} Doctors</span>
                    </div>
                    <div className="stat-item">
                      <FaBed className="stat-icon" />
                      <span>{selectedHospital.beds} Beds</span>
                    </div>
                    <div className="stat-item">
                      <FaClock className="stat-icon" />
                      <span>{selectedHospital.operatingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hospital-contact">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>{selectedHospital.address}</span>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>{selectedHospital.phone}</span>
                </div>
                <div className="contact-item">
                  <FaGlobe className="contact-icon" />
                  <a href={selectedHospital.website} target="_blank" rel="noopener noreferrer">
                    {selectedHospital.website}
                  </a>
                </div>
              </div>

              <div className="hospital-reviews">
                <div className="reviews-header">
                  <h3>Reviews ({selectedHospital.totalReviews})</h3>
                  <motion.button
                    className="add-review-btn"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add Review
                  </motion.button>
                </div>

                {showReviewForm && (
                  <motion.div 
                    className="review-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label>Rating:</label>
                        <div className="rating-input">
                          {[1, 2, 3, 4, 5].map(star => (
                            <FaStar
                              key={star}
                              className={`star-input ${star <= currentReview.rating ? 'filled' : 'empty'}`}
                              onClick={() => setCurrentReview(prev => ({ ...prev, rating: star }))}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Category:</label>
                        <select
                          value={currentReview.category}
                          onChange={(e) => setCurrentReview(prev => ({ ...prev, category: e.target.value }))}
                        >
                          {reviewCategories.map(category => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Title:</label>
                      <input
                        type="text"
                        value={currentReview.title}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Brief summary of your experience"
                      />
                    </div>

                    <div className="form-group">
                      <label>Comment:</label>
                      <textarea
                        value={currentReview.comment}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Share your detailed experience..."
                        rows="4"
                      />
                    </div>

                    <motion.button
                      className="submit-review-btn"
                      onClick={addReview}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Review
                    </motion.button>
                  </motion.div>
                )}

                <div className="reviews-list">
                  {selectedHospital.reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      className="review-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.user}</span>
                          <span className="review-category">{getCategoryLabel(review.category)}</span>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <h4 className="review-title">{review.title}</h4>
                      <p className="review-comment">{review.comment}</p>
                      <div className="review-footer">
                        <span className="review-date">{review.date}</span>
                        <div className="review-actions">
                          <button className="helpful-btn">
                            Helpful ({review.helpful})
                          </button>
                          <button className="share-btn">
                            <FaShare />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </motion.div>
  );
};

export default HospitalFinderReviews;
