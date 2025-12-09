import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaMoon, FaSun, FaChartLine, FaLightbulb, FaClock, FaThermometerHalf, FaVolumeUp, FaEye, FaHeart, FaBrain, FaPlus, FaTrash } from 'react-icons/fa';
import './SleepQualityAnalyzer.css';

const SleepQualityAnalyzer = () => {
  const [sleepEntries, setSleepEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    bedtime: '',
    wakeTime: '',
    quality: 5,
    factors: [],
    notes: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load saved sleep entries on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('sleepEntries');
    if (savedEntries) {
      try {
        setSleepEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading sleep entries:', error);
      }
    }
  }, []);

  // Save sleep entries whenever they change
  useEffect(() => {
    if (sleepEntries.length > 0) {
      localStorage.setItem('sleepEntries', JSON.stringify(sleepEntries));
    }
  }, [sleepEntries]);

  const sleepFactors = [
    { id: 'stress', label: 'Stress', icon: FaBrain },
    { id: 'caffeine', label: 'Caffeine', icon: FaThermometerHalf },
    { id: 'screen_time', label: 'Screen Time', icon: FaEye },
    { id: 'exercise', label: 'Exercise', icon: FaHeart },
    { id: 'noise', label: 'Noise', icon: FaVolumeUp },
    { id: 'temperature', label: 'Temperature', icon: FaThermometerHalf },
    { id: 'light', label: 'Light Exposure', icon: FaLightbulb },
    { id: 'meal_timing', label: 'Late Meals', icon: FaClock }
  ];

  const qualityLabels = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Fair',
    4: 'Good',
    5: 'Very Good'
  };

  const qualityColors = {
    1: '#ef4444',
    2: '#f97316',
    3: '#eab308',
    4: '#22c55e',
    5: '#10b981'
  };

  useEffect(() => {
    // Load sample data for demonstration
    const sampleData = [
      {
        id: 1,
        date: '2025-01-27',
        bedtime: '22:30',
        wakeTime: '07:00',
        quality: 4,
        factors: ['stress', 'screen_time'],
        notes: 'Felt well-rested, slight stress from work',
        duration: 8.5
      },
      {
        id: 2,
        date: '2025-01-26',
        bedtime: '23:15',
        wakeTime: '06:45',
        quality: 3,
        factors: ['caffeine', 'noise'],
        notes: 'Had coffee late, neighbor was noisy',
        duration: 7.5
      },
      {
        id: 3,
        date: '2025-01-25',
        bedtime: '22:00',
        wakeTime: '07:30',
        quality: 5,
        factors: ['exercise'],
        notes: 'Great workout, slept like a baby',
        duration: 9.5
      }
    ];
    setSleepEntries(sampleData);
  }, []);

  const addSleepEntry = () => {
    if (!currentEntry.bedtime || !currentEntry.wakeTime) return;

    const bedtime = new Date(`2000-01-01T${currentEntry.bedtime}`);
    const wakeTime = new Date(`2000-01-01T${currentEntry.wakeTime}`);
    
    let duration = (wakeTime - bedtime) / (1000 * 60 * 60);
    if (duration < 0) duration += 24; // Handle overnight sleep

    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      ...currentEntry,
      duration: Math.round(duration * 10) / 10
    };

    setSleepEntries(prev => [newEntry, ...prev]);
    setCurrentEntry({
      bedtime: '',
      wakeTime: '',
      quality: 5,
      factors: [],
      notes: ''
    });
    setShowAddForm(false);
  };

  const removeSleepEntry = (id) => {
    setSleepEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const toggleFactor = (factorId) => {
    setCurrentEntry(prev => ({
      ...prev,
      factors: prev.factors.includes(factorId)
        ? prev.factors.filter(f => f !== factorId)
        : [...prev.factors, factorId]
    }));
  };

  const getSleepScore = () => {
    if (sleepEntries.length === 0) return 0;
    
    const totalScore = sleepEntries.reduce((sum, entry) => sum + entry.quality, 0);
    return Math.round(totalScore / sleepEntries.length);
  };

  const getAverageDuration = () => {
    if (sleepEntries.length === 0) return 0;
    
    const totalDuration = sleepEntries.reduce((sum, entry) => sum + entry.duration, 0);
    return Math.round(totalDuration / sleepEntries.length * 10) / 10;
  };

  const getSleepTrends = () => {
    if (sleepEntries.length < 2) return 'Insufficient data for trends';
    
    const recentEntries = sleepEntries.slice(0, 7);
    const avgQuality = recentEntries.reduce((sum, entry) => sum + entry.quality, 0) / recentEntries.length;
    const avgDuration = recentEntries.reduce((sum, entry) => sum + entry.duration, 0) / recentEntries.length;
    
    let trend = '';
    if (avgQuality >= 4 && avgDuration >= 7) {
      trend = 'Excellent sleep patterns! Keep it up.';
    } else if (avgQuality >= 3 && avgDuration >= 6) {
      trend = 'Good sleep habits, room for improvement.';
    } else {
      trend = 'Sleep quality could be improved. Consider our recommendations.';
    }
    
    return trend;
  };

  const getRecommendations = () => {
    const recommendations = [];
    const recentEntries = sleepEntries.slice(0, 5);
    
    if (recentEntries.length === 0) return ['Start tracking your sleep to get personalized recommendations'];
    
    const avgDuration = recentEntries.reduce((sum, entry) => sum + entry.duration, 0) / recentEntries.length;
    const commonFactors = recentEntries.flatMap(entry => entry.factors);
    const factorCounts = commonFactors.reduce((acc, factor) => {
      acc[factor] = (acc[factor] || 0) + 1;
      return acc;
    }, {});
    
    if (avgDuration < 7) {
      recommendations.push('Aim for 7-9 hours of sleep per night for optimal health');
    }
    
    if (factorCounts['stress'] > 2) {
      recommendations.push('Practice stress management techniques before bedtime');
    }
    
    if (factorCounts['screen_time'] > 2) {
      recommendations.push('Avoid screens 1 hour before bedtime to improve sleep quality');
    }
    
    if (factorCounts['caffeine'] > 1) {
      recommendations.push('Limit caffeine intake after 2 PM for better sleep');
    }
    
    if (factorCounts['noise'] > 1) {
      recommendations.push('Consider using white noise or earplugs for better sleep');
    }
    
    if (factorCounts['temperature'] > 1) {
      recommendations.push('Keep bedroom temperature between 65-68°F (18-20°C)');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Great sleep habits! Continue maintaining your current routine');
    }
    
    return recommendations;
  };

  const getSleepPhase = (bedtime) => {
    const hour = parseInt(bedtime.split(':')[0]);
    if (hour >= 22 || hour <= 2) return 'Early Bird';
    if (hour >= 3 && hour <= 5) return 'Night Owl';
    return 'Regular';
  };

  return (
    <motion.div 
      className="sleep-analyzer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="analyzer-header">
        <FaBed className="header-icon" />
        <h2>Sleep Quality Analyzer</h2>
        <p>Track your sleep patterns, analyze quality, and get personalized recommendations</p>
      </div>

      <div className="analyzer-content">
        {/* Sleep Overview */}
        <motion.div 
          className="sleep-overview"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Sleep Overview</h3>
          <div className="overview-stats">
            <div className="stat-card">
              <FaChartLine className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{getSleepScore()}/5</span>
                <span className="stat-label">Average Quality</span>
              </div>
            </div>
            <div className="stat-card">
              <FaClock className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{getAverageDuration()}h</span>
                <span className="stat-label">Average Duration</span>
              </div>
            </div>
            <div className="stat-card">
              <FaBed className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{sleepEntries.length}</span>
                <span className="stat-label">Days Tracked</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Sleep Entry */}
        <motion.div 
          className="add-entry-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header">
            <h3>Add Sleep Entry</h3>
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
                  <label>Bedtime:</label>
                  <input
                    type="time"
                    value={currentEntry.bedtime}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, bedtime: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Wake Time:</label>
                  <input
                    type="time"
                    value={currentEntry.wakeTime}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, wakeTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sleep Quality:</label>
                  <div className="quality-slider">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={currentEntry.quality}
                      onChange={(e) => setCurrentEntry(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                      className="quality-range"
                    />
                    <div className="quality-labels">
                      {[1, 2, 3, 4, 5].map(quality => (
                        <span 
                          key={quality}
                          className={`quality-label ${currentEntry.quality === quality ? 'active' : ''}`}
                          style={{ color: qualityColors[quality] }}
                        >
                          {quality}
                        </span>
                      ))}
                    </div>
                    <div className="quality-text" style={{ color: qualityColors[currentEntry.quality] }}>
                      {qualityLabels[currentEntry.quality]}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sleep Factors:</label>
                  <div className="factors-grid">
                    {sleepFactors.map(factor => {
                      const Icon = factor.icon;
                      return (
                        <motion.button
                          key={factor.id}
                          className={`factor-btn ${currentEntry.factors.includes(factor.id) ? 'active' : ''}`}
                          onClick={() => toggleFactor(factor.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon />
                          <span>{factor.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Notes:</label>
                  <textarea
                    value={currentEntry.notes}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="How did you feel? Any observations?"
                    rows="3"
                  />
                </div>
              </div>

              <motion.button
                className="submit-btn"
                onClick={addSleepEntry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus /> Add Sleep Entry
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Sleep Entries */}
        <motion.div 
          className="sleep-entries-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Sleep History</h3>
          {sleepEntries.length === 0 ? (
            <div className="empty-state">
              <FaBed className="empty-icon" />
              <p>No sleep entries yet. Start tracking to see your patterns!</p>
            </div>
          ) : (
            <div className="entries-list">
              {sleepEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="sleep-entry"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="entry-header">
                    <div className="entry-date">
                      <FaMoon className="date-icon" />
                      <span>{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <div className="entry-quality">
                      <span 
                        className="quality-badge"
                        style={{ backgroundColor: qualityColors[entry.quality] }}
                      >
                        {qualityLabels[entry.quality]}
                      </span>
                    </div>
                  </div>

                  <div className="entry-details">
                    <div className="time-info">
                      <div className="time-item">
                        <FaMoon className="time-icon" />
                        <span>Bed: {entry.bedtime}</span>
                      </div>
                      <div className="time-item">
                        <FaSun className="time-icon" />
                        <span>Wake: {entry.wakeTime}</span>
                      </div>
                      <div className="time-item">
                        <FaClock className="time-icon" />
                        <span>Duration: {entry.duration}h</span>
                      </div>
                    </div>

                    {entry.factors.length > 0 && (
                      <div className="entry-factors">
                        <strong>Factors:</strong>
                        <div className="factors-tags">
                          {entry.factors.map(factorId => {
                            const factor = sleepFactors.find(f => f.id === factorId);
                            const Icon = factor.icon;
                            return (
                              <span key={factorId} className="factor-tag">
                                <Icon />
                                {factor.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {entry.notes && (
                      <div className="entry-notes">
                        <strong>Notes:</strong> {entry.notes}
                      </div>
                    )}

                    <div className="sleep-phase">
                      <strong>Sleep Phase:</strong> {getSleepPhase(entry.bedtime)}
                    </div>
                  </div>

                  <motion.button
                    className="remove-btn"
                    onClick={() => removeSleepEntry(entry.id)}
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

        {/* Sleep Analysis */}
        <motion.div 
          className="sleep-analysis-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3>Sleep Analysis</h3>
          <div className="analysis-grid">
            <div className="analysis-card">
              <h4>Sleep Trends</h4>
              <p>{getSleepTrends()}</p>
            </div>
            
            <div className="analysis-card">
              <h4>Recommendations</h4>
              <ul className="recommendations-list">
                {getRecommendations().map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                  >
                    <FaLightbulb className="recommendation-icon" />
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SleepQualityAnalyzer;
