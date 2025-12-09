import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaDesktop, FaMobile, FaTablet, FaClock, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaPlus, FaTrash, FaChartLine } from 'react-icons/fa';
import './VisionHealthChecker.css';

const VisionHealthChecker = () => {
  const [screenTimeData, setScreenTimeData] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    device: 'desktop',
    duration: '',
    activities: [],
    notes: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTest, setActiveTest] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [testHistory, setTestHistory] = useState([]);

  // Initialize sample data only if no saved data exists
  const initializeSampleData = useCallback(() => {
    const sampleData = [
      {
        id: 1,
        date: '2025-01-27',
        device: 'desktop',
        duration: 6.5,
        activities: ['Work/Study', 'Entertainment'],
        notes: 'Long work session, eyes felt tired',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        date: '2025-01-26',
        device: 'mobile',
        duration: 3.2,
        activities: ['Social Media', 'Entertainment'],
        notes: 'Moderate usage, no eye strain',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        date: '2025-01-25',
        device: 'tablet',
        duration: 2.8,
        activities: ['Reading', 'Entertainment'],
        notes: 'Light usage, comfortable',
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
      }
    ];
    setScreenTimeData(sampleData);
  }, []);

  // Load saved data on component mount
  useEffect(() => {
    const savedScreenTime = localStorage.getItem('screenTimeData');
    const savedVisionTests = localStorage.getItem('visionTests');
    
    if (savedScreenTime) {
      try {
        setScreenTimeData(JSON.parse(savedScreenTime));
      } catch (error) {
        console.error('Error loading screen time data:', error);
        initializeSampleData();
      }
    } else {
      // Initialize sample data only if no saved data exists
      initializeSampleData();
    }
    
    if (savedVisionTests) {
      try {
        setTestHistory(JSON.parse(savedVisionTests));
      } catch (error) {
        console.error('Error loading vision tests:', error);
      }
    }
  }, [initializeSampleData]);

  // Save screen time data whenever it changes
  useEffect(() => {
    if (screenTimeData.length > 0) {
      localStorage.setItem('screenTimeData', JSON.stringify(screenTimeData));
    }
  }, [screenTimeData]);

  // Save vision test history whenever it changes
  useEffect(() => {
    if (testHistory.length > 0) {
      localStorage.setItem('visionTests', JSON.stringify(testHistory));
    }
  }, [testHistory]);


  const devices = [
    { id: 'desktop', name: 'Desktop/Laptop', icon: FaDesktop, color: '#667eea' },
    { id: 'mobile', name: 'Mobile Phone', icon: FaMobile, color: '#10b981' },
    { id: 'tablet', name: 'Tablet', icon: FaTablet, color: '#f59e0b' }
  ];

  const activities = [
    'Work/Study',
    'Social Media',
    'Entertainment',
    'Gaming',
    'Reading',
    'Video Calls',
    'Shopping',
    'Other'
  ];

  const visionTests = {
    color_blindness: {
      name: 'Color Blindness Test',
      description: 'Test your ability to distinguish colors',
      icon: FaEye,
      color: '#8b5cf6'
    },
    visual_acuity: {
      name: 'Visual Acuity Test',
      description: 'Test your distance vision clarity',
      icon: FaEye,
      color: '#06b6d4'
    },
    contrast_sensitivity: {
      name: 'Contrast Sensitivity',
      description: 'Test your ability to see subtle differences',
      icon: FaEye,
      color: '#ec4899'
    }
  };

  const addScreenTimeEntry = () => {
    if (!currentEntry.duration) return;

    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      ...currentEntry,
      duration: parseFloat(currentEntry.duration),
      timestamp: new Date().toISOString()
    };

    setScreenTimeData(prev => [newEntry, ...prev]);
    setCurrentEntry({
      device: 'desktop',
      duration: '',
      activities: [],
      notes: ''
    });
    setShowAddForm(false);
  };

  const removeScreenTimeEntry = (id) => {
    setScreenTimeData(prev => prev.filter(entry => entry.id !== id));
  };

  const toggleActivity = (activity) => {
    setCurrentEntry(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const getTotalScreenTime = () => {
    if (screenTimeData.length === 0) return 0;
    const total = screenTimeData.reduce((sum, entry) => sum + entry.duration, 0);
    return Math.round(total * 10) / 10;
  };

  const getAverageScreenTime = () => {
    if (screenTimeData.length === 0) return 0;
    return Math.round(getTotalScreenTime() / screenTimeData.length * 10) / 10;
  };

  const getDeviceBreakdown = () => {
    const breakdown = {};
    screenTimeData.forEach(entry => {
      breakdown[entry.device] = (breakdown[entry.device] || 0) + entry.duration;
    });
    return breakdown;
  };

  const getScreenTimeRecommendations = () => {
    const avgTime = getAverageScreenTime();
    const recommendations = [];

    if (avgTime > 8) {
      recommendations.push('Consider reducing screen time to protect your eye health');
      recommendations.push('Take regular breaks every 20 minutes (20-20-20 rule)');
    } else if (avgTime > 6) {
      recommendations.push('Monitor your screen time and take regular breaks');
      recommendations.push('Ensure proper lighting and ergonomics');
    } else if (avgTime > 4) {
      recommendations.push('Good screen time management, continue with current habits');
    } else {
      recommendations.push('Excellent screen time management!');
    }

    recommendations.push('Use blue light filters in the evening');
    recommendations.push('Maintain proper distance from screens (arm\'s length)');
    recommendations.push('Ensure adequate room lighting');

    return recommendations;
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

  const startVisionTest = (testType) => {
    setActiveTest(testType);
    setTestResults({});
  };

  const recordTestResult = (testType, result, response) => {
    const testResult = {
      id: Date.now(),
      testType,
      result,
      response,
      date: new Date().toISOString(),
      timestamp: new Date().toISOString()
    };

    setTestHistory(prev => [testResult, ...prev]);
    setTestResults({ result, response });
  };

  const getTestSuggestions = (testType, canSee) => {
    const suggestions = {
      visual_acuity: {
        yes: [
          "Excellent! Your distance vision appears to be good.",
          "Continue regular eye checkups every 1-2 years.",
          "Maintain good eye health with proper lighting when reading.",
          "Consider computer glasses if you spend long hours on screens."
        ],
        no: [
          "You may have difficulty with distance vision.",
          "Schedule an appointment with an eye care professional soon.",
          "Consider getting a comprehensive eye exam.",
          "Avoid driving until your vision is properly assessed.",
          "This could indicate nearsightedness or other vision issues."
        ]
      },
      contrast_sensitivity: {
        yes: [
          "Good contrast sensitivity! Your eyes can distinguish subtle differences well.",
          "This is important for night driving and low-light conditions.",
          "Continue protecting your eyes from UV damage with sunglasses.",
          "Maintain a diet rich in vitamins A, C, and E for eye health."
        ],
        no: [
          "You may have reduced contrast sensitivity.",
          "This could affect night driving and low-light vision.",
          "Consult an eye care professional for further evaluation.",
          "Consider additional lighting in dimly lit areas.",
          "This may be related to cataracts, glaucoma, or other conditions."
        ]
      },
      color_blindness: {
        yes: [
          "Great! Your color vision appears to be normal.",
          "You can distinguish colors well across the spectrum.",
          "Continue regular eye health maintenance.",
          "Protect your eyes from excessive UV exposure."
        ],
        no: [
          "You may have some form of color vision deficiency.",
          "This is usually genetic and affects more men than women.",
          "Consider specialized color vision tests for accurate diagnosis.",
          "Many people with color blindness live normal lives with minor adaptations.",
          "Consult an eye care professional for comprehensive testing."
        ]
      }
    };

    return suggestions[testType]?.[canSee ? 'yes' : 'no'] || [];
  };

  const renderVisionTest = () => {
    if (!activeTest) return null;

    switch (activeTest) {
      case 'color_blindness':
        return (
          <div className="vision-test">
            <h3>Color Blindness Test</h3>
            <div className="test-instructions">
              <p>Look at the colored circles below. Each circle contains a number or pattern:</p>
              <div className="test-image">
                <div className="color-test-circle">
                  <div className="ishihara-pattern red-green">
                    <span className="hidden-number">8</span>
                  </div>
                  <p className="circle-label">Circle 1</p>
                </div>
                <div className="color-test-circle">
                  <div className="ishihara-pattern blue-yellow">
                    <span className="hidden-number">3</span>
                  </div>
                  <p className="circle-label">Circle 2</p>
                </div>
                <div className="color-test-circle">
                  <div className="ishihara-pattern red-green-2">
                    <span className="hidden-number">5</span>
                  </div>
                  <p className="circle-label">Circle 3</p>
                </div>
              </div>
              <p className="test-question">Can you clearly see numbers in all three circles?</p>
            </div>
            {!testResults.result ? (
              <div className="test-response">
                <motion.button
                  className="response-btn yes-btn"
                  onClick={() => recordTestResult('color_blindness', 'passed', true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaCheckCircle className="btn-icon" /> 
                  <span>Yes, I can see numbers clearly</span>
                </motion.button>
                <motion.button
                  className="response-btn no-btn"
                  onClick={() => recordTestResult('color_blindness', 'failed', false)}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaExclamationTriangle className="btn-icon" /> 
                  <span>No, I cannot see some/all numbers</span>
                </motion.button>
              </div>
            ) : (
              <div className="test-result">
                <div className={`result-status ${testResults.result}`}>
                  {testResults.response ? (
                    <><FaCheckCircle /> Normal Color Vision</>
                  ) : (
                    <><FaExclamationTriangle /> Possible Color Vision Deficiency</>
                  )}
                </div>
                <div className="suggestions">
                  <h4>Recommendations:</h4>
                  <ul>
                    {getTestSuggestions('color_blindness', testResults.response).map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="test-actions">
              <button className="test-btn" onClick={() => setActiveTest(null)}>Close Test</button>
            </div>
          </div>
        );
      
      case 'visual_acuity':
        return (
          <div className="vision-test">
            <h3>Visual Acuity Test</h3>
            <div className="test-instructions">
              <p>Stand 10 feet away from your screen and read the letters:</p>
              <div className="acuity-test">
                <div className="acuity-line large">E F P T O Z</div>
                <div className="acuity-line medium">L P E D P E C F D</div>
                <div className="acuity-line small">F E L O P Z D</div>
              </div>
              <p className="test-question">Can you read all the letters clearly?</p>
            </div>
            {!testResults.result ? (
              <div className="test-response">
                <motion.button
                  className="response-btn yes-btn"
                  onClick={() => recordTestResult('visual_acuity', 'passed', true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaCheckCircle className="btn-icon" /> 
                  <span>Yes, I can read all letters clearly</span>
                </motion.button>
                <motion.button
                  className="response-btn no-btn"
                  onClick={() => recordTestResult('visual_acuity', 'failed', false)}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaExclamationTriangle className="btn-icon" /> 
                  <span>No, some letters are blurry or unclear</span>
                </motion.button>
              </div>
            ) : (
              <div className="test-result">
                <div className={`result-status ${testResults.result}`}>
                  {testResults.response ? (
                    <><FaCheckCircle /> Good Distance Vision</>
                  ) : (
                    <><FaExclamationTriangle /> Possible Vision Issues</>
                  )}
                </div>
                <div className="suggestions">
                  <h4>Recommendations:</h4>
                  <ul>
                    {getTestSuggestions('visual_acuity', testResults.response).map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="test-actions">
              <button className="test-btn" onClick={() => setActiveTest(null)}>Close Test</button>
            </div>
          </div>
        );
      
      case 'contrast_sensitivity':
        return (
          <div className="vision-test">
            <h3>Contrast Sensitivity Test</h3>
            <div className="test-instructions">
              <p>Look at the patterns below. Each shows stripes with decreasing contrast:</p>
              <div className="contrast-test">
                <div className="contrast-pattern high-contrast">
                  <div className="stripes horizontal"></div>
                  <p className="pattern-label">High Contrast</p>
                </div>
                <div className="contrast-pattern medium-contrast">
                  <div className="stripes vertical"></div>
                  <p className="pattern-label">Medium Contrast</p>
                </div>
                <div className="contrast-pattern low-contrast">
                  <div className="stripes diagonal"></div>
                  <p className="pattern-label">Low Contrast</p>
                </div>
              </div>
              <p className="test-question">Can you see the stripe patterns in all three boxes?</p>
            </div>
            {!testResults.result ? (
              <div className="test-response">
                <motion.button
                  className="response-btn yes-btn"
                  onClick={() => recordTestResult('contrast_sensitivity', 'passed', true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaCheckCircle className="btn-icon" /> 
                  <span>Yes, I can see patterns in all boxes</span>
                </motion.button>
                <motion.button
                  className="response-btn no-btn"
                  onClick={() => recordTestResult('contrast_sensitivity', 'failed', false)}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaExclamationTriangle className="btn-icon" /> 
                  <span>No, I cannot see some patterns clearly</span>
                </motion.button>
              </div>
            ) : (
              <div className="test-result">
                <div className={`result-status ${testResults.result}`}>
                  {testResults.response ? (
                    <><FaCheckCircle /> Good Contrast Sensitivity</>
                  ) : (
                    <><FaExclamationTriangle /> Reduced Contrast Sensitivity</>
                  )}
                </div>
                <div className="suggestions">
                  <h4>Recommendations:</h4>
                  <ul>
                    {getTestSuggestions('contrast_sensitivity', testResults.response).map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="test-actions">
              <button className="test-btn" onClick={() => setActiveTest(null)}>Close Test</button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="vision-health-checker"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="checker-header">
        <FaEye className="header-icon" />
        <h2>Vision Health Checker</h2>
        <p>Monitor your screen time, take vision tests, and get eye health recommendations</p>
      </div>

      <div className="checker-content">
        {/* Screen Time Overview */}
        <motion.div 
          className="screen-time-overview"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Screen Time Overview</h3>
          <div className="overview-stats">
            <div className="stat-card">
              <FaClock className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{getTotalScreenTime()}h</span>
                <span className="stat-label">Total This Week</span>
              </div>
            </div>
            <div className="stat-card">
              <FaChartLine className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{getAverageScreenTime()}h</span>
                <span className="stat-label">Daily Average</span>
              </div>
            </div>
            <div className="stat-card">
              <FaEye className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{screenTimeData.length}</span>
                <span className="stat-label">Days Tracked</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vision Tests */}
        <motion.div 
          className="vision-tests-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Vision Tests</h3>
          <div className="tests-grid">
            {Object.entries(visionTests).map(([type, test]) => {
              const Icon = test.icon;
              return (
                <motion.div
                  key={type}
                  className="test-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startVisionTest(type)}
                >
                  <div className="test-header">
                    <Icon className="test-icon" style={{ color: test.color }} />
                    <h4>{test.name}</h4>
                  </div>
                  <p className="test-description">{test.description}</p>
                  <motion.button
                    className="start-test-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Test
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Active Vision Test */}
        {activeTest && (
          <motion.div 
            className="active-test-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {renderVisionTest()}
          </motion.div>
        )}

        {/* Add Screen Time Entry */}
        <motion.div 
          className="add-entry-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="section-header">
            <h3>Add Screen Time Entry</h3>
            <motion.button
              className="toggle-form-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAddForm ? 'Cancel' : 'Add Entry'}
            </motion.button>
          </div>

          {showAddForm && (
            <motion.div 
              className="entry-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Device:</label>
                  <select
                    value={currentEntry.device}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, device: e.target.value }))}
                  >
                    {devices.map(device => (
                      <option key={device.id} value={device.id}>{device.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration (hours):</label>
                  <input
                    type="number"
                    value={currentEntry.duration}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="4.5"
                    min="0"
                    max="24"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Activities:</label>
                  <div className="activities-grid">
                    {activities.map(activity => (
                      <motion.button
                        key={activity}
                        className={`activity-btn ${currentEntry.activities.includes(activity) ? 'active' : ''}`}
                        onClick={() => toggleActivity(activity)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {activity}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Notes:</label>
                  <textarea
                    value={currentEntry.notes}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="How did your eyes feel? Any strain or discomfort?"
                    rows="3"
                  />
                </div>
              </div>

              <motion.button
                className="submit-btn"
                onClick={addScreenTimeEntry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus /> Add Entry
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Screen Time History */}
        <motion.div 
          className="screen-time-history-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3>Screen Time History</h3>
          {screenTimeData.length === 0 ? (
            <div className="empty-state">
              <FaClock className="empty-icon" />
              <p>No screen time entries yet. Start tracking to see your patterns!</p>
            </div>
          ) : (
            <div className="entries-list">
              {screenTimeData.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="entry-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                >
                  <div className="entry-header">
                    <div className="entry-device">
                      {devices.find(d => d.id === entry.device)?.icon && 
                        React.createElement(devices.find(d => d.id === entry.device).icon, { 
                          className: 'device-icon',
                          style: { color: devices.find(d => d.id === entry.device).color }
                        })
                      }
                      <span className="device-name">{devices.find(d => d.id === entry.device)?.name}</span>
                    </div>
                    <span className="entry-time">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                  </div>

                  <div className="entry-content">
                    <div className="entry-duration">
                      <strong>Duration:</strong> {entry.duration} hours
                    </div>
                    
                    {entry.activities.length > 0 && (
                      <div className="entry-activities">
                        <strong>Activities:</strong>
                        <div className="activities-tags">
                          {entry.activities.map(activity => (
                            <span key={activity} className="activity-tag">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.notes && (
                      <div className="entry-notes">
                        <strong>Notes:</strong> {entry.notes}
                      </div>
                    )}
                  </div>

                  <motion.button
                    className="remove-btn"
                    onClick={() => removeScreenTimeEntry(entry.id)}
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

        {/* Eye Health Tips */}
        <motion.div 
          className="eye-health-tips-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3>Eye Health Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <FaEye className="tip-icon" />
              <h4>20-20-20 Rule</h4>
              <p>Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.</p>
            </div>
            <div className="tip-card">
              <FaDesktop className="tip-icon" />
              <h4>Proper Distance</h4>
              <p>Keep your screen at arm's length (about 20-28 inches) from your eyes.</p>
            </div>
            <div className="tip-card">
              <FaInfoCircle className="tip-icon" />
              <h4>Blue Light</h4>
              <p>Use blue light filters in the evening to improve sleep quality.</p>
            </div>
            <div className="tip-card">
              <FaClock className="tip-icon" />
              <h4>Regular Breaks</h4>
              <p>Take 5-minute breaks every hour to rest your eyes and stretch.</p>
            </div>
          </div>
        </motion.div>

        {/* Vision Test History */}
        {testHistory.length > 0 && (
          <motion.div 
            className="test-history-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3>Vision Test History</h3>
            <div className="history-list">
              {testHistory.slice(0, 5).map((test, index) => (
                <motion.div
                  key={test.id}
                  className="history-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="history-header">
                    <div className="test-info">
                      <FaEye className="test-icon" />
                      <span className="test-name">{visionTests[test.testType]?.name}</span>
                    </div>
                    <span className="test-date">
                      {new Date(test.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="history-result">
                    <span className={`result-badge ${test.result}`}>
                      {test.result === 'passed' ? (
                        <><FaCheckCircle /> Passed</>
                      ) : (
                        <><FaExclamationTriangle /> Needs Attention</>
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Screen Time Recommendations */}
        <motion.div 
          className="recommendations-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3>Personalized Recommendations</h3>
          <div className="recommendations-list">
            {getScreenTimeRecommendations().map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <FaInfoCircle className="recommendation-icon" />
                {rec}
              </motion.li>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VisionHealthChecker;
