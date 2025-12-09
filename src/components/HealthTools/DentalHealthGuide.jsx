import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTeeth, FaCalendarAlt, FaClock, FaPlus, FaEdit, FaTrash, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaBrush, FaSmile, FaHeart, FaStar, FaAward, FaShieldAlt, FaTooth, FaFlask, FaLightbulb } from 'react-icons/fa';
import './DentalHealthGuide.css';

const DentalHealthGuide = () => {
  const [dentalRecords, setDentalRecords] = useState([]);
  const [currentRecord, setCurrentRecord] = useState({
    date: '',
    brushingTime: '',
    flossing: false,
    mouthwash: false,
    notes: '',
    symptoms: []
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeSection, setActiveSection] = useState('overview');

  const symptoms = [
    'Tooth Pain',
    'Sensitivity',
    'Bleeding Gums',
    'Bad Breath',
    'Swelling',
    'Loose Teeth',
    'Cavities',
    'None'
  ];

  const tips = [
    {
      icon: FaBrush,
      title: 'Brush Twice Daily',
      description: 'Use fluoride toothpaste and brush for at least 2 minutes'
    },
    {
      icon: FaShieldAlt,
      title: 'Use Mouthwash',
      description: 'Rinse with antimicrobial mouthwash to kill bacteria'
    },
    {
      icon: FaCalendarAlt,
      title: 'Regular Checkups',
      description: 'Visit your dentist every 6 months for professional cleaning'
    },
    {
      icon: FaHeart,
      title: 'Healthy Diet',
      description: 'Limit sugary foods and drinks to prevent tooth decay'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: '2025-01-15',
      time: '10:00 AM',
      type: 'Regular Checkup',
      doctor: 'Dr. Smith',
      location: 'Downtown Dental Clinic'
    },
    {
      id: 2,
      date: '2025-02-20',
      time: '2:30 PM',
      type: 'Teeth Cleaning',
      doctor: 'Dr. Johnson',
      location: 'Family Dental Care'
    }
  ];

  const dentalTips = [
    'Brush your teeth at least twice a day with fluoride toothpaste',
    'Floss daily to remove plaque between teeth',
    'Use an antimicrobial mouthwash to reduce bacteria',
    'Replace your toothbrush every 3-4 months',
    'Limit sugary and acidic foods and drinks',
    'Visit your dentist regularly for checkups and cleanings',
    'Don\'t use your teeth as tools to open packages',
    'Consider a mouth guard if you grind your teeth at night'
  ];

  // Load saved dental records on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('dentalRecords');
    if (savedRecords) {
      try {
        const parsedRecords = JSON.parse(savedRecords);
        // Migrate old records that might not have dates
        const migratedRecords = parsedRecords.map((record, index) => {
          if (!record.date) {
            // Assign dates based on timestamp or create sequential dates
            const fallbackDate = new Date();
            fallbackDate.setDate(fallbackDate.getDate() - index);
            return {
              ...record,
              date: fallbackDate.toISOString().split('T')[0]
            };
          }
          return record;
        });
        setDentalRecords(migratedRecords);
      } catch (error) {
        console.error('Error loading dental records:', error);
        // Create sample data if loading fails
        initializeSampleData();
      }
    } else {
      // Create sample data if no saved data exists
      initializeSampleData();
    }
  }, []);

  const initializeSampleData = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dayBefore = new Date(today);
    dayBefore.setDate(today.getDate() - 2);
    const sampleRecords = [
      {
        id: 1,
        date: today.toISOString().split('T')[0],
        brushingTime: 2.5,
        flossing: true,
        mouthwash: true,
        notes: 'Feeling good about oral hygiene',
        symptoms: ['None'],
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        date: yesterday.toISOString().split('T')[0],
        brushingTime: 2.0,
        flossing: true,
        mouthwash: false,
        notes: 'Forgot mouthwash today',
        symptoms: ['None'],
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        date: dayBefore.toISOString().split('T')[0],
        brushingTime: 2.2,
        flossing: false,
        mouthwash: true,
        notes: 'Good oral hygiene maintained',
        symptoms: ['None'],
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
      }
    ];
    setDentalRecords(sampleRecords);
  };

  // Save data whenever records change
  useEffect(() => {
    if (dentalRecords.length > 0) {
      localStorage.setItem('dentalRecords', JSON.stringify(dentalRecords));
    }
  }, [dentalRecords]);

  const addDentalRecord = () => {
    if (!selectedDate || !currentRecord.brushingTime) return;

    const newRecord = {
      id: Date.now(),
      ...currentRecord,
      date: selectedDate,
      brushingTime: parseFloat(currentRecord.brushingTime),
      timestamp: new Date().toISOString()
    };

    setDentalRecords(prev => [newRecord, ...prev]);
    setCurrentRecord({
      date: '',
      brushingTime: '',
      flossing: false,
      mouthwash: false,
      notes: '',
      symptoms: []
    });
    setShowAddForm(false);
  };

  const removeDentalRecord = (id) => {
    setDentalRecords(prev => prev.filter(record => record.id !== id));
  };

  const toggleSymptom = (symptom) => {
    setCurrentRecord(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const getStreakDays = () => {
    if (dentalRecords.length === 0) return 0;
    
    let streak = 0;
    const sortedRecords = [...dentalRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedRecords.length - 1; i++) {
      const currentDate = new Date(sortedRecords[i].date);
      const nextDate = new Date(sortedRecords[i + 1].date);
      const diffTime = currentDate - nextDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak + 1;
  };

  const getAverageBrushingTime = () => {
    if (dentalRecords.length === 0) return 0;
    const total = dentalRecords.reduce((sum, record) => sum + record.brushingTime, 0);
    return Math.round(total / dentalRecords.length * 10) / 10;
  };

  const getFlossingPercentage = () => {
    if (dentalRecords.length === 0) return 0;
    const flossedDays = dentalRecords.filter(record => record.flossing).length;
    return Math.round((flossedDays / dentalRecords.length) * 100);
  };

  const getMouthwashPercentage = () => {
    if (dentalRecords.length === 0) return 0;
    const mouthwashDays = dentalRecords.filter(record => record.mouthwash).length;
    return Math.round((mouthwashDays / dentalRecords.length) * 100);
  };

  const getDentalHealthScore = () => {
    if (dentalRecords.length === 0) return 0;
    
    let score = 0;
    const totalRecords = dentalRecords.length;
    
    // Brushing time score (target: 2+ minutes)
    const avgBrushingTime = getAverageBrushingTime();
    if (avgBrushingTime >= 2) score += 30;
    else if (avgBrushingTime >= 1.5) score += 20;
    else if (avgBrushingTime >= 1) score += 10;
    
    // Flossing score
    const flossingPerc = getFlossingPercentage();
    if (flossingPerc >= 80) score += 25;
    else if (flossingPerc >= 60) score += 20;
    else if (flossingPerc >= 40) score += 15;
    else if (flossingPerc >= 20) score += 10;
    
    // Mouthwash score
    const mouthwashPerc = getMouthwashPercentage();
    if (mouthwashPerc >= 60) score += 20;
    else if (mouthwashPerc >= 40) score += 15;
    else if (mouthwashPerc >= 20) score += 10;
    
    // Streak bonus
    const streak = getStreakDays();
    if (streak >= 7) score += 15;
    else if (streak >= 5) score += 10;
    else if (streak >= 3) score += 5;
    
    // Symptom penalty
    const symptomDays = dentalRecords.filter(record => 
      record.symptoms.length > 0 && !record.symptoms.includes('None')
    ).length;
    const symptomPenalty = Math.min(20, (symptomDays / totalRecords) * 20);
    score -= symptomPenalty;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getHealthScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            {/* Dental Health Score */}
            <motion.div 
              className="health-score-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Dental Health Score</h3>
              <div className="score-display">
                <div 
                  className="score-circle"
                  style={{ 
                    background: `conic-gradient(${getHealthScoreColor(getDentalHealthScore())} ${getDentalHealthScore() * 3.6}deg, #e5e7eb ${getDentalHealthScore() * 3.6}deg)`
                  }}
                >
                  <div className="score-inner">
                    <span className="score-value">{getDentalHealthScore()}</span>
                    <span className="score-label">/100</span>
                  </div>
                </div>
                <div className="score-info">
                  <h4 className="score-title">{getHealthScoreLabel(getDentalHealthScore())}</h4>
                  <p className="score-description">
                    {getDentalHealthScore() >= 80 
                      ? 'Great job! Keep up the excellent oral hygiene habits.'
                      : getDentalHealthScore() >= 60
                      ? 'Good work! Focus on consistency to improve your score.'
                      : 'There\'s room for improvement. Check our tips below!'
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="quick-stats-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <FaTooth className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getStreakDays()}</span>
                    <span className="stat-label">Day Streak</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FaClock className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getAverageBrushingTime()}m</span>
                    <span className="stat-label">Avg Brushing</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FaCheckCircle className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getFlossingPercentage()}%</span>
                    <span className="stat-label">Flossing Rate</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FaFlask className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getMouthwashPercentage()}%</span>
                    <span className="stat-label">Mouthwash Use</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Appointments */}
            <motion.div 
              className="appointments-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3>Upcoming Appointments</h3>
              <div className="appointments-list">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    className="appointment-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="appointment-header">
                      <div className="appointment-date">
                        <FaCalendarAlt className="date-icon" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="appointment-time">
                        <FaClock className="time-icon" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="appointment-content">
                      <h4 className="appointment-type">{appointment.type}</h4>
                      <p className="dentist-name">{appointment.dentist}</p>
                      <p className="appointment-notes">{appointment.notes}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        );

      case 'tracking':
        return (
          <>
            {/* Add Dental Record */}
            <motion.div 
              className="add-record-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="section-header">
                <h3>Add Dental Record</h3>
                <motion.button
                  className="toggle-form-btn"
                  onClick={() => setShowAddForm(!showAddForm)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAddForm ? 'Cancel' : 'Add Record'}
                </motion.button>
              </div>

              {showAddForm && (
                <motion.div 
                  className="record-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dental-date">Date:</label>
                      <input
                        id="dental-date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="date-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Brushing Time (minutes):</label>
                      <input
                        type="number"
                        value={currentRecord.brushingTime}
                        onChange={(e) => setCurrentRecord(prev => ({ ...prev, brushingTime: e.target.value }))}
                        placeholder="2.5"
                        min="0"
                        max="10"
                        step="0.5"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={currentRecord.flossing}
                          onChange={(e) => setCurrentRecord(prev => ({ ...prev, flossing: e.target.checked }))}
                        />
                        Flossing
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={currentRecord.mouthwash}
                          onChange={(e) => setCurrentRecord(prev => ({ ...prev, mouthwash: e.target.checked }))}
                        />
                        Mouthwash
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Symptoms:</label>
                      <div className="symptoms-grid">
                        {symptoms.map(symptom => (
                          <motion.button
                            key={symptom}
                            className={`symptom-btn ${currentRecord.symptoms.includes(symptom) ? 'active' : ''}`}
                            onClick={() => toggleSymptom(symptom)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {symptom}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Notes:</label>
                      <textarea
                        value={currentRecord.notes}
                        onChange={(e) => setCurrentRecord(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="How did your oral health feel today? Any concerns?"
                        rows="3"
                      />
                    </div>
                  </div>

                  <motion.button
                    className="submit-btn"
                    onClick={addDentalRecord}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus /> Add Record
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Dental Records History */}
            <motion.div 
              className="records-history-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Dental Records History</h3>
              {dentalRecords.length === 0 ? (
                <div className="empty-state">
                  <FaTooth className="empty-icon" />
                  <p>No dental records yet. Start tracking to monitor your oral health!</p>
                </div>
              ) : (
                <div className="records-list">
                  {dentalRecords.map((record, index) => (
                    <motion.div
                      key={record.id}
                      className="record-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="record-header">
                        <div className="record-date">
                          <FaCalendarAlt className="date-icon" />
                          <span>{record.date ? new Date(record.date).toLocaleDateString() : 'No Date'}</span>
                        </div>
                        <span className="record-time">
                          {formatTimestamp(record.timestamp)}
                        </span>
                      </div>

                      <div className="record-content">
                        <div className="record-stats">
                          <div className="stat-item">
                            <FaClock className="stat-icon" />
                            <span><strong>Brushing:</strong> {record.brushingTime} minutes</span>
                          </div>
                          <div className="stat-item">
                            <FaTooth className="stat-icon" />
                            <span><strong>Flossing:</strong> {record.flossing ? 'Yes' : 'No'}</span>
                          </div>
                          <div className="stat-item">
                            <FaFlask className="stat-icon" />
                            <span><strong>Mouthwash:</strong> {record.mouthwash ? 'Yes' : 'No'}</span>
                          </div>
                        </div>

                        {record.symptoms.length > 0 && !record.symptoms.includes('None') && (
                          <div className="record-symptoms">
                            <strong>Symptoms:</strong>
                            <div className="symptoms-tags">
                              {record.symptoms.filter(s => s !== 'None').map(symptom => (
                                <span key={symptom} className="symptom-tag">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {record.notes && (
                          <div className="record-notes">
                            <strong>Notes:</strong> {record.notes}
                          </div>
                        )}
                      </div>

                      <motion.button
                        className="remove-btn"
                        onClick={() => removeDentalRecord(record.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        );

      case 'tips':
        return (
          <motion.div 
            className="dental-tips-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Dental Care Tips</h3>
            <div className="tips-container">
              {dentalTips.map((category, index) => (
                <motion.div
                  key={category.category}
                  className="tip-category"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                >
                  <h4 className="category-title">
                    <FaLightbulb className="category-icon" />
                    {category.category}
                  </h4>
                  <ul className="tips-list">
                    {category.tips.map((tip, tipIndex) => (
                      <motion.li
                        key={tipIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.2 + tipIndex * 0.1 }}
                      >
                        <FaCheckCircle className="tip-icon" />
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="dental-health-guide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="guide-header">
        <FaTooth className="header-icon" />
        <h2>Dental Health Guide</h2>
        <p>Track your oral hygiene, monitor dental health, and get expert care tips</p>
      </div>

      {/* Navigation Tabs */}
      <motion.div 
        className="navigation-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className={`nav-tab ${activeSection === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          <FaChartLine /> Overview
        </button>
        <button
          className={`nav-tab ${activeSection === 'tracking' ? 'active' : ''}`}
          onClick={() => setActiveSection('tracking')}
        >
          <FaTooth /> Tracking
        </button>
        <button
          className={`nav-tab ${activeSection === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveSection('tips')}
        >
          <FaInfoCircle /> Tips
        </button>
      </motion.div>

      <div className="guide-content">
        {renderSection()}
      </div>
    </motion.div>
  );
};

export default DentalHealthGuide;
