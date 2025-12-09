import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPills, FaClock, FaCheckCircle, FaExclamationTriangle, FaPlus, FaTrash, FaEdit, FaBell, FaCalendarAlt, FaChartLine, FaInfoCircle, FaUserMd, FaFlask } from 'react-icons/fa';
import './MedicationTracker.css';

const MedicationTracker = () => {
  const [medications, setMedications] = useState([]);
  const [currentMedication, setCurrentMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    timeOfDay: 'morning',
    startDate: '',
    endDate: '',
    instructions: '',
    sideEffects: '',
    doctor: '',
    pharmacy: '',
    refillReminder: false,
    refillDate: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeSection, setActiveSection] = useState('overview');

  // Load saved medications on component mount
  useEffect(() => {
    const savedMedications = localStorage.getItem('medications');
    if (savedMedications) {
      try {
        setMedications(JSON.parse(savedMedications));
      } catch (error) {
        console.error('Error loading medications:', error);
      }
    }
  }, []);

  // Save medications whenever they change
  useEffect(() => {
    if (medications.length > 0) {
      localStorage.setItem('medications', JSON.stringify(medications));
    }
  }, [medications]);

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'twice_daily', label: 'Twice Daily' },
    { value: 'three_times', label: 'Three Times Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'as_needed', label: 'As Needed' }
  ];

  const timeOfDay = [
    { value: 'morning', label: 'Morning', icon: '🌅' },
    { value: 'afternoon', label: 'Afternoon', icon: '☀️' },
    { value: 'evening', label: 'Evening', icon: '🌆' },
    { value: 'bedtime', label: 'Bedtime', icon: '🌙' }
  ];

  const sideEffectsList = [
    'Drowsiness',
    'Nausea',
    'Headache',
    'Dizziness',
    'Upset Stomach',
    'Dry Mouth',
    'Rash',
    'None'
  ];

  useEffect(() => {
    // Load sample data for demonstration
    const sampleMedications = [
      {
        id: 1,
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'twice_daily',
        timeOfDay: 'morning',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        instructions: 'Take with food to reduce stomach upset',
        sideEffects: 'Nausea, Upset Stomach',
        doctor: 'Dr. Sarah Johnson',
        pharmacy: 'CVS Pharmacy',
        refillReminder: true,
        refillDate: '2025-02-15',
        lastTaken: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        takenToday: 1,
        totalDoses: 45,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'daily',
        timeOfDay: 'morning',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        instructions: 'Take on empty stomach',
        sideEffects: 'Dry Cough, Dizziness',
        doctor: 'Dr. Michael Chen',
        pharmacy: 'Walgreens',
        refillReminder: false,
        refillDate: '',
        lastTaken: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        takenToday: 1,
        totalDoses: 30,
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'as_needed',
        timeOfDay: 'as_needed',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        instructions: 'Take for pain or fever, max 4 times daily',
        sideEffects: 'Upset Stomach',
        doctor: 'Dr. Emily Davis',
        pharmacy: 'Local Pharmacy',
        refillReminder: false,
        refillDate: '',
        lastTaken: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
        takenToday: 0,
        totalDoses: 12,
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
      }
    ];
    setMedications(sampleMedications);
  }, []);

  const addMedication = () => {
    if (!currentMedication.name || !currentMedication.dosage) return;

    const newMedication = {
      id: editingId || Date.now(),
      ...currentMedication,
      lastTaken: null,
      takenToday: 0,
      totalDoses: 0,
      timestamp: new Date().toISOString()
    };

    if (editingId) {
      setMedications(prev => prev.map(med => med.id === editingId ? newMedication : med));
      setEditingId(null);
    } else {
      setMedications(prev => [newMedication, ...prev]);
    }

    setCurrentMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      timeOfDay: 'morning',
      startDate: '',
      endDate: '',
      instructions: '',
      sideEffects: '',
      doctor: '',
      pharmacy: '',
      refillReminder: false,
      refillDate: ''
    });
    setShowAddForm(false);
  };

  const editMedication = (medication) => {
    setCurrentMedication(medication);
    setEditingId(medication.id);
    setShowAddForm(true);
  };

  const removeMedication = (id) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  const markTaken = (id) => {
    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        const today = new Date().toDateString();
        const lastTakenDate = med.lastTaken ? new Date(med.lastTaken).toDateString() : null;
        
        if (lastTakenDate === today) {
          return { ...med, takenToday: med.takenToday + 1, totalDoses: med.totalDoses + 1 };
        } else {
          return { ...med, lastTaken: new Date().toISOString(), takenToday: 1, totalDoses: med.totalDoses + 1 };
        }
      }
      return med;
    }));
  };

  const getTotalMedications = () => medications.length;

  const getActiveMedications = () => {
    const today = new Date();
    return medications.filter(med => {
      if (!med.endDate) return true;
      return new Date(med.endDate) >= today;
    }).length;
  };

  const getRefillReminders = () => {
    const today = new Date();
    return medications.filter(med => {
      if (!med.refillReminder || !med.refillDate) return false;
      const refillDate = new Date(med.refillDate);
      const daysUntilRefill = Math.ceil((refillDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilRefill <= 7;
    });
  };

  const getComplianceRate = () => {
    if (medications.length === 0) return 0;
    
    let totalCompliance = 0;
    medications.forEach(med => {
      if (med.frequency === 'daily') {
        const expectedDoses = Math.ceil((new Date() - new Date(med.startDate)) / (1000 * 60 * 60 * 24));
        totalCompliance += Math.min(100, (med.totalDoses / expectedDoses) * 100);
      } else if (med.frequency === 'twice_daily') {
        const expectedDoses = Math.ceil((new Date() - new Date(med.startDate)) / (1000 * 60 * 60 * 24)) * 2;
        totalCompliance += Math.min(100, (med.totalDoses / expectedDoses) * 100);
      }
    });
    
    return Math.round(totalCompliance / medications.length);
  };

  const getNextDoseTime = (medication) => {
    if (!medication.lastTaken) return 'Now';
    
    const lastTaken = new Date(medication.lastTaken);
    const now = new Date();
    const diffMs = now - lastTaken;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (medication.frequency === 'daily') {
      if (diffHours >= 24) return 'Now';
      const hoursLeft = 24 - diffHours;
      return `${hoursLeft}h remaining`;
    } else if (medication.frequency === 'twice_daily') {
      if (diffHours >= 12) return 'Now';
      const hoursLeft = 12 - diffHours;
      return `${hoursLeft}h remaining`;
    }
    
    return 'As needed';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Never';
    
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
            {/* Medication Overview */}
            <motion.div 
              className="overview-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Medication Overview</h3>
              <div className="overview-stats">
                <div className="stat-card">
                  <FaPills className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getTotalMedications()}</span>
                    <span className="stat-label">Total Medications</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FaCheckCircle className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getActiveMedications()}</span>
                    <span className="stat-label">Active Medications</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FaChartLine className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getComplianceRate()}%</span>
                    <span className="stat-label">Compliance Rate</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FaBell className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{getRefillReminders().length}</span>
                    <span className="stat-label">Refill Reminders</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Medications */}
            <motion.div 
              className="current-medications-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Current Medications</h3>
              {medications.length === 0 ? (
                <div className="empty-state">
                  <FaPills className="empty-icon" />
                  <p>No medications added yet. Start tracking to manage your health!</p>
                </div>
              ) : (
                <div className="medications-grid">
                  {medications.map((medication, index) => (
                    <motion.div
                      key={medication.id}
                      className="medication-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="medication-header">
                        <h4 className="medication-name">{medication.name}</h4>
                        <div className="medication-actions">
                          <motion.button
                            className="edit-btn"
                            onClick={() => editMedication(medication)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaEdit />
                          </motion.button>
                          <motion.button
                            className="remove-btn"
                            onClick={() => removeMedication(medication.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTrash />
                          </motion.button>
                        </div>
                      </div>

                      <div className="medication-details">
                        <div className="detail-row">
                          <span className="detail-label">Dosage:</span>
                          <span className="detail-value">{medication.dosage}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Frequency:</span>
                          <span className="detail-value">
                            {frequencies.find(f => f.value === medication.frequency)?.label}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Time:</span>
                          <span className="detail-value">
                            {timeOfDay.find(t => t.value === medication.timeOfDay)?.icon} {timeOfDay.find(t => t.value === medication.timeOfDay)?.label}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Last Taken:</span>
                          <span className="detail-value">{formatTimestamp(medication.lastTaken)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Next Dose:</span>
                          <span className="detail-value">{getNextDoseTime(medication)}</span>
                        </div>
                      </div>

                      <div className="medication-footer">
                        <motion.button
                          className="mark-taken-btn"
                          onClick={() => markTaken(medication.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaCheckCircle /> Mark as Taken
                        </motion.button>
                        <div className="dose-counter">
                          <span className="dose-label">Taken Today:</span>
                          <span className="dose-count">{medication.takenToday}</span>
                        </div>
                      </div>

                      {medication.refillReminder && medication.refillDate && (
                        <div className="refill-reminder">
                          <FaBell className="reminder-icon" />
                          <span>Refill due: {medication.refillDate}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Refill Reminders */}
            {getRefillReminders().length > 0 && (
              <motion.div 
                className="refill-reminders-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3>Refill Reminders</h3>
                <div className="reminders-list">
                  {getRefillReminders().map((medication, index) => (
                    <motion.div
                      key={medication.id}
                      className="reminder-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                    >
                      <FaExclamationTriangle className="reminder-icon" />
                      <div className="reminder-content">
                        <strong>{medication.name}</strong> - Refill due on {medication.refillDate}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        );

      case 'add':
        return (
          <motion.div 
            className="add-medication-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-header">
              <h3>{editingId ? 'Edit Medication' : 'Add New Medication'}</h3>
              <motion.button
                className="toggle-form-btn"
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (!showAddForm) {
                    setEditingId(null);
                    setCurrentMedication({
                      name: '',
                      dosage: '',
                      frequency: 'daily',
                      timeOfDay: 'morning',
                      startDate: '',
                      endDate: '',
                      instructions: '',
                      sideEffects: '',
                      doctor: '',
                      pharmacy: '',
                      refillReminder: false,
                      refillDate: ''
                    });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAddForm ? 'Cancel' : 'Add Medication'}
              </motion.button>
            </div>

            {showAddForm && (
              <motion.div 
                className="medication-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label>Medication Name:</label>
                    <input
                      type="text"
                      value={currentMedication.name}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Metformin"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Dosage:</label>
                    <input
                      type="text"
                      value={currentMedication.dosage}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, dosage: e.target.value }))}
                      placeholder="e.g., 500mg"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Frequency:</label>
                    <select
                      value={currentMedication.frequency}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, frequency: e.target.value }))}
                    >
                      {frequencies.map(freq => (
                        <option key={freq.value} value={freq.value}>{freq.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Time of Day:</label>
                    <select
                      value={currentMedication.timeOfDay}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, timeOfDay: e.target.value }))}
                    >
                      {timeOfDay.map(time => (
                        <option key={time.value} value={time.value}>{time.icon} {time.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={currentMedication.startDate}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, startDate: e.target.value }))}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date (Optional):</label>
                    <input
                      type="date"
                      value={currentMedication.endDate}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, endDate: e.target.value }))}
                      min={currentMedication.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Doctor:</label>
                    <input
                      type="text"
                      value={currentMedication.doctor}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, doctor: e.target.value }))}
                      placeholder="e.g., Dr. Sarah Johnson"
                    />
                  </div>
                  <div className="form-group">
                    <label>Pharmacy:</label>
                    <input
                      type="text"
                      value={currentMedication.pharmacy}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, pharmacy: e.target.value }))}
                      placeholder="e.g., CVS Pharmacy"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Instructions:</label>
                    <textarea
                      value={currentMedication.instructions}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, instructions: e.target.value }))}
                      placeholder="How to take this medication..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Side Effects:</label>
                    <textarea
                      value={currentMedication.sideEffects}
                      onChange={(e) => setCurrentMedication(prev => ({ ...prev, sideEffects: e.target.value }))}
                      placeholder="Any side effects to watch for..."
                      rows="2"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={currentMedication.refillReminder}
                        onChange={(e) => setCurrentMedication(prev => ({ ...prev, refillReminder: e.target.checked }))}
                      />
                      Set Refill Reminder
                    </label>
                  </div>
                  {currentMedication.refillReminder && (
                    <div className="form-group">
                      <label>Refill Date:</label>
                      <input
                        type="date"
                        value={currentMedication.refillDate}
                        onChange={(e) => setCurrentMedication(prev => ({ ...prev, refillDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  )}
                </div>

                <motion.button
                  className="submit-btn"
                  onClick={addMedication}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus /> {editingId ? 'Update Medication' : 'Add Medication'}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        );

      case 'history':
        return (
          <motion.div 
            className="history-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Medication History</h3>
            <div className="history-stats">
              <div className="history-card">
                <FaChartLine className="history-icon" />
                <div className="history-content">
                  <h4>Total Doses Taken</h4>
                  <span className="history-value">
                    {medications.reduce((sum, med) => sum + med.totalDoses, 0)}
                  </span>
                </div>
              </div>
              <div className="history-card">
                <FaCheckCircle className="history-icon" />
                <div className="history-content">
                  <h4>Today's Doses</h4>
                  <span className="history-value">
                    {medications.reduce((sum, med) => sum + med.takenToday, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="medication-history">
              {medications.map((medication, index) => (
                <motion.div
                  key={medication.id}
                  className="history-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="history-header">
                    <h4>{medication.name}</h4>
                    <span className="history-date">Started: {medication.startDate}</span>
                  </div>
                  <div className="history-details">
                    <div className="history-stat">
                      <span className="stat-label">Total Doses:</span>
                      <span className="stat-value">{medication.totalDoses}</span>
                    </div>
                    <div className="history-stat">
                      <span className="stat-label">Today:</span>
                      <span className="stat-value">{medication.takenToday}</span>
                    </div>
                    <div className="history-stat">
                      <span className="stat-label">Last Taken:</span>
                      <span className="stat-value">{formatTimestamp(medication.lastTaken)}</span>
                    </div>
                  </div>
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
      className="medication-tracker"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="tracker-header">
        <FaPills className="header-icon" />
        <h2>Medication Tracker</h2>
        <p>Manage your medications, track dosages, and never miss a dose</p>
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
          className={`nav-tab ${activeSection === 'add' ? 'active' : ''}`}
          onClick={() => setActiveSection('add')}
        >
          <FaPlus /> Add/Edit
        </button>
        <button
          className={`nav-tab ${activeSection === 'history' ? 'active' : ''}`}
          onClick={() => setActiveSection('history')}
        >
          <FaClock /> History
        </button>
      </motion.div>

      <div className="tracker-content">
        {renderSection()}
      </div>
    </motion.div>
  );
};

export default MedicationTracker;
