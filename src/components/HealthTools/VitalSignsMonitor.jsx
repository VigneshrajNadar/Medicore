import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { motion } from 'framer-motion';
import { FaThermometerHalf, FaHeart, FaTint, FaLungs, FaPlus, FaTrash, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import './VitalSignsMonitor.css';

const VitalSignsMonitor = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load saved vital signs on component mount
  useEffect(() => {
    const savedVitalSigns = localStorage.getItem('vitalSigns');
    if (savedVitalSigns) {
      try {
        setVitalSigns(JSON.parse(savedVitalSigns));
      } catch (error) {
        console.error('Error loading vital signs:', error);
      }
    }
  }, []);

  // Save vital signs whenever they change
  useEffect(() => {
    if (vitalSigns.length > 0) {
      localStorage.setItem('vitalSigns', JSON.stringify(vitalSigns));
    }
  }, [vitalSigns]);
  const [currentReading, setCurrentReading] = useState({
    type: 'blood_pressure',
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    oxygenLevel: '',
    notes: '',
    timestamp: new Date().toISOString()
  });

  const vitalTypes = {
    blood_pressure: {
      name: 'Blood Pressure',
      icon: FaHeart,
      color: '#ef4444',
      unit: 'mmHg',
      normalRange: { min: 90, max: 140, min2: 60, max2: 90 },
      description: 'Systolic/Diastolic pressure'
    },
    heart_rate: {
      name: 'Heart Rate',
      icon: FaHeart,
      color: '#dc2626',
      unit: 'bpm',
      normalRange: { min: 60, max: 100 },
      description: 'Beats per minute'
    },
    temperature: {
      name: 'Temperature',
      icon: FaThermometerHalf,
      color: '#f59e0b',
      unit: '°F',
      normalRange: { min: 97, max: 99.5 },
      description: 'Body temperature'
    },
    oxygen_level: {
      name: 'Oxygen Level',
      icon: FaLungs,
      color: '#06b6d4',
      unit: '%',
      normalRange: { min: 95, max: 100 },
      description: 'Blood oxygen saturation'
    }
  };

  useEffect(() => {
    // Load sample data for demonstration
    const sampleData = [
      {
        id: 1,
        type: 'blood_pressure',
        systolic: 120,
        diastolic: 80,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Morning reading, feeling good'
      },
      {
        id: 2,
        type: 'heart_rate',
        heartRate: 72,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        notes: 'After lunch, normal range'
      },
      {
        id: 3,
        type: 'temperature',
        temperature: 98.6,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        notes: 'Evening reading'
      },
      {
        id: 4,
        type: 'oxygen_level',
        oxygenLevel: 98,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        notes: 'Good oxygen levels'
      }
    ];
    setVitalSigns(sampleData);
  }, []);

  const { updateVitals, addNotification } = useUser();

  const addVitalSign = () => {
    if (!currentReading.type) return;

    const newReading = {
      id: Date.now(),
      ...currentReading,
      timestamp: new Date().toISOString()
    };

    // Update vitals in user context
    const vitalsData = {};
    
    switch (currentReading.type) {
      case 'blood_pressure':
        vitalsData.bloodPressure = {
          value: `${currentReading.systolic}/${currentReading.diastolic}`,
          unit: 'mmHg',
          status: getVitalStatus('blood_pressure', parseInt(currentReading.systolic), parseInt(currentReading.diastolic))
        };
        break;
      case 'heart_rate':
        vitalsData.heartRate = {
          value: parseInt(currentReading.heartRate),
          unit: 'bpm',
          status: getVitalStatus('heart_rate', parseInt(currentReading.heartRate))
        };
        break;
      case 'temperature':
        vitalsData.temperature = {
          value: parseFloat(currentReading.temperature),
          unit: '°F',
          status: getVitalStatus('temperature', parseFloat(currentReading.temperature))
        };
        break;
    }
    
    if (Object.keys(vitalsData).length > 0) {
      const success = updateVitals(vitalsData);
      
      if (success) {
        addNotification({
          title: 'Vitals Recorded',
          message: `${vitalTypes[currentReading.type].name} has been updated successfully.`,
          type: 'success'
        });
      }
    }

    setVitalSigns(prev => [newReading, ...prev]);
    setCurrentReading({
      type: 'blood_pressure',
      systolic: '',
      diastolic: '',
      heartRate: '',
      temperature: '',
      oxygenLevel: '',
      notes: '',
      timestamp: new Date().toISOString()
    });
    setShowAddForm(false);
  };

  const removeVitalSign = (id) => {
    setVitalSigns(prev => prev.filter(reading => reading.id !== id));
  };

  const getVitalStatus = (type, value1, value2 = null) => {
    const vital = vitalTypes[type];
    if (!vital) return 'unknown';

    let isNormal = false;
    
    switch (type) {
      case 'blood_pressure':
        isNormal = value1 >= vital.normalRange.min && value1 <= vital.normalRange.max &&
                   value2 >= vital.normalRange.min2 && value2 <= vital.normalRange.max2;
        break;
      case 'heart_rate':
        isNormal = value1 >= vital.normalRange.min && value1 <= vital.normalRange.max;
        break;
      case 'temperature':
        isNormal = value1 >= vital.normalRange.min && value1 <= vital.normalRange.max;
        break;
      case 'oxygen_level':
        isNormal = value1 >= vital.normalRange.min && value1 <= vital.normalRange.max;
        break;
      default:
        isNormal = false;
    }

    if (isNormal) return 'normal';
    
    // Determine if high or low
    if (type === 'blood_pressure') {
      if (value1 > vital.normalRange.max || value2 > vital.normalRange.max2) return 'high';
      if (value1 < vital.normalRange.min || value2 < vital.normalRange.min2) return 'low';
    } else {
      if (value1 > vital.normalRange.max) return 'high';
      if (value1 < vital.normalRange.min) return 'low';
    }
    
    return 'unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return '#10b981';
      case 'high': return '#ef4444';
      case 'low': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return <FaCheckCircle />;
      case 'high': return <FaExclamationTriangle />;
      case 'low': return <FaExclamationTriangle />;
      default: return <FaInfoCircle />;
    }
  };

  const getLatestReadings = () => {
    const latest = {};
    vitalSigns.forEach(reading => {
      if (!latest[reading.type] || new Date(reading.timestamp) > new Date(latest[reading.type].timestamp)) {
        latest[reading.type] = reading;
      }
    });
    return latest;
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

  const renderVitalValue = (reading) => {
    const vital = vitalTypes[reading.type];
    if (!vital) return null;

    switch (reading.type) {
      case 'blood_pressure':
        const bpStatus = getVitalStatus(reading.type, reading.systolic, reading.diastolic);
        return (
          <div className="vital-value">
            <span className="value-display">
              {reading.systolic}/{reading.diastolic} {vital.unit}
            </span>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(bpStatus) }}
            >
              {getStatusIcon(bpStatus)}
              {bpStatus.charAt(0).toUpperCase() + bpStatus.slice(1)}
            </span>
          </div>
        );
      
      case 'heart_rate':
        const hrStatus = getVitalStatus(reading.type, reading.heartRate);
        return (
          <div className="vital-value">
            <span className="value-display">
              {reading.heartRate} {vital.unit}
            </span>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(hrStatus) }}
            >
              {getStatusIcon(hrStatus)}
              {hrStatus.charAt(0).toUpperCase() + hrStatus.slice(1)}
            </span>
          </div>
        );
      
      case 'temperature':
        const tempStatus = getVitalStatus(reading.type, reading.temperature);
        return (
          <div className="vital-value">
            <span className="value-display">
              {reading.temperature} {vital.unit}
            </span>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(tempStatus) }}
            >
              {getStatusIcon(tempStatus)}
              {tempStatus.charAt(0).toUpperCase() + tempStatus.slice(1)}
            </span>
          </div>
        );
      
      case 'oxygen_level':
        const oxStatus = getVitalStatus(reading.type, reading.oxygenLevel);
        return (
          <div className="vital-value">
            <span className="value-display">
              {reading.oxygenLevel} {vital.unit}
            </span>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(oxStatus) }}
            >
              {getStatusIcon(oxStatus)}
              {oxStatus.charAt(0).toUpperCase() + oxStatus.slice(1)}
            </span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="vital-signs-monitor"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="monitor-header">
        <FaThermometerHalf className="header-icon" />
        <h2>Vital Signs Monitor</h2>
        <p>Track and monitor your vital signs for better health awareness</p>
      </div>

      <div className="monitor-content">
        {/* Current Status Overview */}
        <motion.div 
          className="status-overview"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Current Status</h3>
          <div className="status-grid">
            {Object.entries(vitalTypes).map(([type, vital]) => {
              const Icon = vital.icon;
              const latest = getLatestReadings()[type];
              const hasReading = latest && latest.timestamp;
              
              return (
                <motion.div
                  key={type}
                  className="status-card"
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="status-header">
                    <Icon className="status-icon" style={{ color: vital.color }} />
                    <span className="status-name">{vital.name}</span>
                  </div>
                  
                  {hasReading ? (
                    <div className="status-content">
                      {renderVitalValue(latest)}
                      <span className="last-updated">
                        {formatTimestamp(latest.timestamp)}
                      </span>
                    </div>
                  ) : (
                    <div className="status-content">
                      <span className="no-data">No data</span>
                      <span className="add-prompt">Add reading</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Add New Reading */}
        <motion.div 
          className="add-reading-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header">
            <h3>Add New Reading</h3>
            <motion.button
              className="toggle-form-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAddForm ? 'Cancel' : 'Add Reading'}
            </motion.button>
          </div>

          {showAddForm && (
            <motion.div 
              className="reading-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Vital Sign Type:</label>
                  <select
                    value={currentReading.type}
                    onChange={(e) => setCurrentReading(prev => ({ ...prev, type: e.target.value }))}
                  >
                    {Object.entries(vitalTypes).map(([type, vital]) => (
                      <option key={type} value={type}>{vital.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {currentReading.type === 'blood_pressure' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Systolic (mmHg):</label>
                    <input
                      type="number"
                      value={currentReading.systolic}
                      onChange={(e) => setCurrentReading(prev => ({ ...prev, systolic: e.target.value }))}
                      placeholder="120"
                      min="70"
                      max="200"
                    />
                  </div>
                  <div className="form-group">
                    <label>Diastolic (mmHg):</label>
                    <input
                      type="number"
                      value={currentReading.diastolic}
                      onChange={(e) => setCurrentReading(prev => ({ ...prev, diastolic: e.target.value }))}
                      placeholder="80"
                      min="40"
                      max="130"
                    />
                  </div>
                </div>
              )}

              {currentReading.type === 'heart_rate' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Heart Rate (bpm):</label>
                    <input
                      type="number"
                      value={currentReading.heartRate}
                      onChange={(e) => setCurrentReading(prev => ({ ...prev, heartRate: e.target.value }))}
                      placeholder="72"
                      min="40"
                      max="200"
                    />
                  </div>
                </div>
              )}

              {currentReading.type === 'temperature' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Temperature (°F):</label>
                    <input
                      type="number"
                      value={currentReading.temperature}
                      onChange={(e) => setCurrentReading(prev => ({ ...prev, temperature: e.target.value }))}
                      placeholder="98.6"
                      min="90"
                      max="110"
                      step="0.1"
                    />
                  </div>
                </div>
              )}

              {currentReading.type === 'oxygen_level' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Oxygen Level (%):</label>
                    <input
                      type="number"
                      value={currentReading.oxygenLevel}
                      onChange={(e) => setCurrentReading(prev => ({ ...prev, oxygenLevel: e.target.value }))}
                      placeholder="98"
                      min="80"
                      max="100"
                    />
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Notes:</label>
                  <textarea
                    value={currentReading.notes}
                    onChange={(e) => setCurrentReading(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="How are you feeling? Any symptoms?"
                    rows="3"
                  />
                </div>
              </div>

              <motion.button
                className="submit-btn"
                onClick={addVitalSign}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus /> Add Reading
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Reading History */}
        <motion.div 
          className="reading-history-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Reading History</h3>
          {vitalSigns.length === 0 ? (
            <div className="empty-state">
              <FaChartLine className="empty-icon" />
              <p>No vital signs recorded yet. Start tracking to see your health trends!</p>
            </div>
          ) : (
            <div className="readings-list">
              {vitalSigns.map((reading, index) => (
                <motion.div
                  key={reading.id}
                  className="reading-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="reading-header">
                    <div className="reading-type">
                      {vitalTypes[reading.type]?.icon && 
                        React.createElement(vitalTypes[reading.type].icon, { 
                          className: 'type-icon',
                          style: { color: vitalTypes[reading.type].color }
                        })
                      }
                      <span className="type-name">{vitalTypes[reading.type]?.name}</span>
                    </div>
                    <span className="reading-time">
                      {formatTimestamp(reading.timestamp)}
                    </span>
                  </div>

                  <div className="reading-content">
                    {renderVitalValue(reading)}
                    
                    {reading.notes && (
                      <div className="reading-notes">
                        <strong>Notes:</strong> {reading.notes}
                      </div>
                    )}
                  </div>

                  <motion.button
                    className="remove-btn"
                    onClick={() => removeVitalSign(reading.id)}
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

        {/* Health Tips */}
        <motion.div 
          className="health-tips-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3>Health Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <FaHeart className="tip-icon" />
              <h4>Blood Pressure</h4>
              <p>Monitor regularly, especially if you have risk factors. Aim for readings below 120/80 mmHg.</p>
            </div>
            <div className="tip-card">
              <FaHeart className="tip-icon" />
              <h4>Heart Rate</h4>
              <p>Normal resting heart rate is 60-100 bpm. Exercise regularly to maintain heart health.</p>
            </div>
            <div className="tip-card">
              <FaThermometerHalf className="tip-icon" />
              <h4>Temperature</h4>
              <p>Normal body temperature is 97-99.5°F. Fever above 100.4°F may indicate illness.</p>
            </div>
            <div className="tip-card">
              <FaLungs className="tip-icon" />
              <h4>Oxygen Level</h4>
              <p>Healthy oxygen saturation is 95-100%. Below 90% may require medical attention.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VitalSignsMonitor;
