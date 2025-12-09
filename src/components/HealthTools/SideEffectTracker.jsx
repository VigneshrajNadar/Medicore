import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaPlus, FaTrash, FaEdit, FaChartLine, FaCalendarAlt, FaClock, FaThermometerHalf, FaHeart, FaBrain, FaUtensils, FaEye, FaBed, FaUserMd, FaBell, FaCheckCircle, FaTimes, FaInfoCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './SideEffectTracker.css';

const SideEffectTracker = () => {
  const [sideEffects, setSideEffects] = useState([]);
  const [currentEffect, setCurrentEffect] = useState({
    medication: '',
    effect: '',
    severity: 'mild',
    startDate: '',
    duration: '',
    frequency: 'once',
    symptoms: [],
    notes: '',
    reported: false
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load saved side effects on component mount
  useEffect(() => {
    const savedSideEffects = localStorage.getItem('sideEffects');
    if (savedSideEffects) {
      try {
        setSideEffects(JSON.parse(savedSideEffects));
      } catch (error) {
        console.error('Error loading side effects:', error);
      }
    }
  }, []);

  // Save side effects whenever they change
  useEffect(() => {
    if (sideEffects.length > 0) {
      localStorage.setItem('sideEffects', JSON.stringify(sideEffects));
    }
  }, [sideEffects]);

  const severityLevels = [
    { value: 'mild', label: 'Mild', color: '#10b981', icon: FaCheckCircle },
    { value: 'moderate', label: 'Moderate', color: '#f59e0b', icon: FaExclamationTriangle },
    { value: 'severe', label: 'Severe', color: '#ef4444', icon: FaExclamationTriangle }
  ];

  const frequencyOptions = [
    { value: 'once', label: 'Once' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'intermittent', label: 'Intermittent' }
  ];

  const commonSymptoms = [
    { category: 'Gastrointestinal', icon: FaUtensils, symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Stomach pain', 'Loss of appetite'] },
    { category: 'Neurological', icon: FaBrain, symptoms: ['Headache', 'Dizziness', 'Confusion', 'Memory problems', 'Tremors', 'Seizures'] },
    { category: 'Cardiovascular', icon: FaHeart, symptoms: ['Palpitations', 'Chest pain', 'High blood pressure', 'Irregular heartbeat', 'Swelling'] },
    { category: 'General', icon: FaThermometerHalf, symptoms: ['Fever', 'Fatigue', 'Weakness', 'Body aches', 'Chills', 'Sweating'] },
    { category: 'Sleep', icon: FaBed, symptoms: ['Insomnia', 'Excessive sleepiness', 'Nightmares', 'Restless sleep'] },
    { category: 'Vision', icon: FaEye, symptoms: ['Blurred vision', 'Eye pain', 'Sensitivity to light', 'Dry eyes'] }
  ];

  useEffect(() => {
    // Load sample data
    const sampleEffects = [
      {
        id: 1,
        medication: 'Metformin',
        effect: 'Nausea and stomach upset',
        severity: 'moderate',
        startDate: '2024-01-15',
        duration: '2 weeks',
        frequency: 'daily',
        symptoms: ['Nausea', 'Stomach pain'],
        notes: 'Started after increasing dosage to 1000mg',
        reported: true,
        timestamp: new Date('2024-01-15')
      },
      {
        id: 2,
        medication: 'Ibuprofen',
        effect: 'Mild headache',
        severity: 'mild',
        startDate: '2024-01-20',
        duration: '1 day',
        frequency: 'once',
        symptoms: ['Headache'],
        notes: 'Occurred after taking 400mg for back pain',
        reported: false,
        timestamp: new Date('2024-01-20')
      }
    ];
    setSideEffects(sampleEffects);
  }, []);

  const addSideEffect = () => {
    if (!currentEffect.medication || !currentEffect.effect) {
      alert('Please fill in medication name and side effect description.');
      return;
    }

    const newEffect = {
      id: Date.now(),
      ...currentEffect,
      timestamp: new Date()
    };

    setSideEffects(prev => [newEffect, ...prev]);
    resetForm();
    setShowAddForm(false);
  };

  const editSideEffect = (id) => {
    const effect = sideEffects.find(e => e.id === id);
    if (effect) {
      setCurrentEffect(effect);
      setEditingId(id);
      setShowAddForm(true);
    }
  };

  const updateSideEffect = () => {
    if (!currentEffect.medication || !currentEffect.effect) {
      alert('Please fill in medication name and side effect description.');
      return;
    }

    setSideEffects(prev => 
      prev.map(effect => 
        effect.id === editingId 
          ? { ...currentEffect, id: editingId, timestamp: new Date() }
          : effect
      )
    );
    resetForm();
    setShowAddForm(false);
    setEditingId(null);
  };

  const deleteSideEffect = (id) => {
    if (window.confirm('Are you sure you want to delete this side effect record?')) {
      setSideEffects(prev => prev.filter(effect => effect.id !== id));
    }
  };

  const toggleSymptom = (symptom) => {
    setCurrentEffect(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const resetForm = () => {
    setCurrentEffect({
      medication: '',
      effect: '',
      severity: 'mild',
      startDate: '',
      duration: '',
      frequency: 'once',
      symptoms: [],
      notes: '',
      reported: false
    });
  };

  const getFilteredEffects = () => {
    let filtered = sideEffects;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(effect => effect.severity === selectedFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(effect =>
        effect.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        effect.effect.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getSeverityStats = () => {
    const stats = { mild: 0, moderate: 0, severe: 0 };
    sideEffects.forEach(effect => {
      stats[effect.severity]++;
    });
    return stats;
  };

  const getRecentEffects = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return sideEffects.filter(effect => new Date(effect.timestamp) > thirtyDaysAgo);
  };

  const renderAddForm = () => (
    <motion.div 
      className="add-effect-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-header">
        <h3>{editingId ? 'Edit Side Effect' : 'Add New Side Effect'}</h3>
        <button 
          className="close-form-btn"
          onClick={() => {
            setShowAddForm(false);
            setEditingId(null);
            resetForm();
          }}
        >
          <FaTimes />
        </button>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Medication Name *</label>
          <input
            type="text"
            value={currentEffect.medication}
            onChange={(e) => setCurrentEffect(prev => ({ ...prev, medication: e.target.value }))}
            placeholder="Enter medication name"
          />
        </div>

        <div className="form-group">
          <label>Side Effect Description *</label>
          <textarea
            value={currentEffect.effect}
            onChange={(e) => setCurrentEffect(prev => ({ ...prev, effect: e.target.value }))}
            placeholder="Describe the side effect"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Severity Level</label>
          <div className="severity-buttons">
            {severityLevels.map((level) => (
              <button
                key={level.value}
                className={`severity-btn ${currentEffect.severity === level.value ? 'active' : ''}`}
                onClick={() => setCurrentEffect(prev => ({ ...prev, severity: level.value }))}
                style={{ '--severity-color': level.color }}
              >
                <level.icon />
                <span>{level.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={currentEffect.startDate}
            onChange={(e) => setCurrentEffect(prev => ({ ...prev, startDate: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            value={currentEffect.duration}
            onChange={(e) => setCurrentEffect(prev => ({ ...prev, duration: e.target.value }))}
            placeholder="e.g., 2 weeks, 1 day"
          />
        </div>

        <div className="form-group">
          <label>Frequency</label>
          <select
            value={currentEffect.frequency}
            onChange={(e) => setCurrentEffect(prev => ({ ...prev, frequency: e.target.value }))}
          >
            {frequencyOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="symptoms-section">
        <label>Common Symptoms</label>
        <div className="symptoms-categories">
          {commonSymptoms.map((category) => (
            <div key={category.category} className="symptom-category">
              <div className="category-header">
                <category.icon />
                <h4>{category.category}</h4>
              </div>
              <div className="symptoms-grid">
                {category.symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    className={`symptom-btn ${currentEffect.symptoms.includes(symptom) ? 'selected' : ''}`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea
          value={currentEffect.notes}
          onChange={(e) => setCurrentEffect(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Any additional details about the side effect..."
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddForm(false);
            setEditingId(null);
            resetForm();
          }}
        >
          Cancel
        </button>
        <button
          className="save-btn"
          onClick={editingId ? updateSideEffect : addSideEffect}
        >
          {editingId ? 'Update Side Effect' : 'Add Side Effect'}
        </button>
      </div>
    </motion.div>
  );

  const renderSideEffectCard = (effect) => {
    const severityLevel = severityLevels.find(level => level.value === effect.severity);
    
    return (
      <motion.div
        key={effect.id}
        className="side-effect-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-header">
          <div className="effect-info">
            <h3>{effect.medication}</h3>
            <p className="effect-description">{effect.effect}</p>
          </div>
          <div className="severity-badge" style={{ '--severity-color': severityLevel.color }}>
            <severityLevel.icon />
            <span>{severityLevel.label}</span>
          </div>
        </div>

        <div className="card-details">
          <div className="detail-row">
            <span className="label">Started:</span>
            <span className="value">{effect.startDate}</span>
          </div>
          <div className="detail-row">
            <span className="label">Duration:</span>
            <span className="value">{effect.duration}</span>
          </div>
          <div className="detail-row">
            <span className="label">Frequency:</span>
            <span className="value">{frequencyOptions.find(f => f.value === effect.frequency)?.label}</span>
          </div>
          {effect.symptoms.length > 0 && (
            <div className="symptoms-display">
              <span className="label">Symptoms:</span>
              <div className="symptoms-tags">
                {effect.symptoms.map((symptom, index) => (
                  <span key={index} className="symptom-tag">{symptom}</span>
                ))}
              </div>
            </div>
          )}
          {effect.notes && (
            <div className="notes-display">
              <span className="label">Notes:</span>
              <p className="notes-text">{effect.notes}</p>
            </div>
          )}
        </div>

        <div className="card-footer">
          <div className="card-actions">
            <button
              className="edit-btn"
              onClick={() => editSideEffect(effect.id)}
            >
              <FaEdit />
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteSideEffect(effect.id)}
            >
              <FaTrash />
              Delete
            </button>
          </div>
          <div className="report-status">
            {effect.reported ? (
              <span className="reported-badge">
                <FaCheckCircle />
                Reported to Doctor
              </span>
            ) : (
              <span className="not-reported-badge">
                <FaBell />
                Not Reported
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="side-effect-tracker">
      <div className="tracker-header">
        <FaExclamationTriangle className="header-icon" />
        <h2>Side Effect Tracker</h2>
        <p>Track and monitor medication side effects to help your healthcare provider</p>
      </div>

      <div className="tracker-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div className="stat-content">
              <h3>{sideEffects.length}</h3>
              <p>Total Side Effects</p>
            </div>
          </div>
          <div className="stat-card">
            <FaCalendarAlt className="stat-icon" />
            <div className="stat-content">
              <h3>{getRecentEffects().length}</h3>
              <p>Last 30 Days</p>
            </div>
          </div>
          <div className="stat-card">
            <FaExclamationTriangle className="stat-icon" />
            <div className="stat-content">
              <h3>{getSeverityStats().severe}</h3>
              <p>Severe Effects</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUserMd className="stat-icon" />
            <div className="stat-content">
              <h3>{sideEffects.filter(e => e.reported).length}</h3>
              <p>Reported to Doctor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tracker-controls">
        <div className="controls-left">
          <button
            className="add-effect-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus />
            Add Side Effect
          </button>
        </div>

        <div className="controls-right">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search medications or effects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All
            </button>
            {severityLevels.map((level) => (
              <button
                key={level.value}
                className={`filter-btn ${selectedFilter === level.value ? 'active' : ''}`}
                onClick={() => setSelectedFilter(level.value)}
                style={{ '--severity-color': level.color }}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showAddForm && renderAddForm()}

      <div className="effects-list">
        {getFilteredEffects().length === 0 ? (
          <div className="no-effects">
            <FaExclamationTriangle className="no-effects-icon" />
            <h3>No side effects found</h3>
            <p>Start tracking your medication side effects to help your healthcare provider</p>
            <button
              className="add-first-btn"
              onClick={() => setShowAddForm(true)}
            >
              <FaPlus />
              Add Your First Side Effect
            </button>
          </div>
        ) : (
          <div className="effects-grid">
            {getFilteredEffects().map(renderSideEffectCard)}
          </div>
        )}
      </div>

      <div className="safety-notice">
        <FaExclamationTriangle className="notice-icon" />
        <div className="notice-content">
          <h4>Important Safety Information</h4>
          <ul>
            <li>Always report severe side effects to your healthcare provider immediately</li>
            <li>This tracker is for informational purposes and should not replace medical advice</li>
            <li>Keep your healthcare provider informed about all side effects you experience</li>
            <li>Some side effects may require immediate medical attention</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideEffectTracker;
