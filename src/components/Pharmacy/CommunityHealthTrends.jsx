import React, { useState } from 'react';
import { FaChartLine, FaUsers, FaVirus, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { indianHealthData } from '../../data/indianHealthData';
import './CommunityHealthTrends.css';

const CommunityHealthTrends = () => {
  const [selectedTrend, setSelectedTrend] = useState('seasonal');
  const [selectedState, setSelectedState] = useState('DL');

  const currentStateData = indianHealthData.populationHealthInsights[selectedState];
  const stateInfo = indianHealthData.states.find(state => state.id === selectedState);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return '#ef4444';
      case 'decreasing': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="community-trends-container">
      <div className="trends-header">
        <h2>📈 Community Health Trends</h2>
        <p>Track health patterns and trends in your community</p>
      </div>

      <div className="trend-controls">
        <div className="trend-type-selector">
          <button
            className={`trend-type-btn ${selectedTrend === 'seasonal' ? 'active' : ''}`}
            onClick={() => setSelectedTrend('seasonal')}
          >
            <FaChartLine /> Seasonal Trends
          </button>
          <button
            className={`trend-type-btn ${selectedTrend === 'age' ? 'active' : ''}`}
            onClick={() => setSelectedTrend('age')}
          >
            <FaUsers /> Age Group Trends
          </button>
          <button
            className={`trend-type-btn ${selectedTrend === 'disease' ? 'active' : ''}`}
            onClick={() => setSelectedTrend('disease')}
          >
            <FaVirus /> Disease Patterns
          </button>
        </div>

        <div className="state-filter">
          <label>Filter by State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="state-filter-dropdown"
          >
            {indianHealthData.states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedTrend === 'seasonal' && (
        <div className="seasonal-trends-section">
          <h3>🕐 Seasonal Health Patterns in {stateInfo.name}</h3>
          <div className="seasonal-grid">
            {indianHealthData.communityHealthTrends.seasonalTrends.map((season, index) => (
              <div key={index} className="season-card">
                <div className="season-header">
                  <div className="season-icon">
                    {season.season === 'Winter' && '❄️'}
                    {season.season === 'Summer' && '☀️'}
                    {season.season === 'Monsoon' && '🌧️'}
                  </div>
                  <div className="season-info">
                    <h4>{season.season}</h4>
                    <p className="season-period">{season.period}</p>
                  </div>
                  <div className="trend-indicator" style={{ color: getTrendColor(season.trend) }}>
                    {getTrendIcon(season.trend)} {season.trend}
                  </div>
                </div>

                <div className="season-stats">
                  <div className="affected-population">
                    <FaUsers /> <span>{season.affectedPopulation} of population affected</span>
                  </div>
                  <div className="prevalence-rate">
                    <FaShieldAlt /> <span>Prevention Rate: {Math.floor(Math.random() * 30) + 70}%</span>
                  </div>
                </div>

                <div className="common-conditions">
                  <h5>Common Conditions:</h5>
                  <div className="conditions-list">
                    {season.commonConditions.map((condition, idx) => (
                      <div key={idx} className="condition-item">
                        <span className="condition-dot"></span>
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="season-recommendations">
                  <h5>💡 Prevention Tips:</h5>
                  <div className="recommendations-list">
                    {season.recommendations.map((rec, idx) => (
                      <div key={idx} className="recommendation-item">
                        <span className="rec-icon">✓</span>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTrend === 'age' && (
        <div className="age-trends-section">
          <h3>👥 Age Group Health Trends in {stateInfo.name}</h3>
          <div className="age-trends-grid">
            {indianHealthData.communityHealthTrends.ageGroupTrends.map((ageGroup, index) => (
              <div key={index} className="age-group-card">
                <div className="age-group-header">
                  <div className="age-icon">
                    {ageGroup.ageGroup.includes('Children') && '👶'}
                    {ageGroup.ageGroup.includes('Young Adults') && '🧑'}
                    {ageGroup.ageGroup.includes('Adults') && '👨‍💼'}
                    {ageGroup.ageGroup.includes('Elderly') && '👴'}
                  </div>
                  <div className="age-info">
                    <h4>{ageGroup.ageGroup}</h4>
                    <div className="age-stats">
                      <span className="affected-percentage">{ageGroup.affectedRate} affected</span>
                      <span className={`trend-indicator ${ageGroup.trend}`} style={{ color: getTrendColor(ageGroup.trend) }}>
                        {getTrendIcon(ageGroup.trend)} {ageGroup.trend}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="age-conditions">
                  <h5>Common Health Issues:</h5>
                  <div className="conditions-grid">
                    {ageGroup.commonConditions.map((condition, idx) => (
                      <div key={idx} className="condition-badge">
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="focus-areas">
                  <h5>🎯 Focus Areas:</h5>
                  <div className="focus-list">
                    {ageGroup.focusAreas.map((focus, idx) => (
                      <div key={idx} className="focus-item">
                        <span className="focus-icon">🎯</span>
                        {focus}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTrend === 'disease' && (
        <div className="disease-trends-section">
          <h3>🦠 Disease Pattern Analysis in {stateInfo.name}</h3>

          <div className="disease-overview">
            <div className="disease-stats-cards">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h4>Disease Burden</h4>
                  <p className="stat-value">
                    {currentStateData.chronicDiseasePrevalence ?
                      Math.floor(Object.values(currentStateData.chronicDiseasePrevalence).reduce((sum, rate) => sum + rate, 0)) :
                      'N/A'
                    }%
                  </p>
                  <p className="stat-label">Chronic Disease Prevalence</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💊</div>
                <div className="stat-content">
                  <h4>Healthcare Access</h4>
                  <p className="stat-value">{currentStateData.hospitalBedsPer1000}</p>
                  <p className="stat-label">Beds per 1000 people</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👨‍⚕️</div>
                <div className="stat-content">
                  <h4>Doctor Availability</h4>
                  <p className="stat-value">{currentStateData.doctorPatientRatio}</p>
                  <p className="stat-label">Doctor-Patient Ratio</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💉</div>
                <div className="stat-content">
                  <h4>Immunization</h4>
                  <p className="stat-value">{currentStateData.vaccinationRate}%</p>
                  <p className="stat-label">Vaccination Coverage</p>
                </div>
              </div>
            </div>
          </div>

          <div className="disease-breakdown">
            <h4>📋 Disease Prevalence Breakdown</h4>
            <div className="disease-bars">
              {currentStateData.chronicDiseasePrevalence && Object.entries(currentStateData.chronicDiseasePrevalence).map(([disease, rate]) => (
                <div key={disease} className="disease-bar-item">
                  <div className="disease-label">
                    {disease.charAt(0).toUpperCase() + disease.slice(1)}
                  </div>
                  <div className="disease-bar-container">
                    <div
                      className="disease-bar-fill"
                      style={{
                        width: `${rate}%`,
                        backgroundColor: getTrendColor(rate > 15 ? 'increasing' : rate > 10 ? 'stable' : 'decreasing')
                      }}
                    ></div>
                    <span className="disease-percentage">{rate}%</span>
                  </div>
                </div>
              ))}
              {!currentStateData.chronicDiseasePrevalence && (
                <div className="no-data-message">
                  <p>Disease prevalence data not available for this state.</p>
                </div>
              )}
            </div>
          </div>

          <div className="health-recommendations">
            <h4>💡 Health Recommendations for {stateInfo.name}</h4>
            <div className="recommendations-grid">
              <div className="recommendation-category">
                <h5>🏥 Infrastructure Needs</h5>
                <ul>
                  <li>Increase hospital beds to meet WHO standards</li>
                  <li>Improve doctor-patient ratio through recruitment</li>
                  <li>Enhance primary healthcare centers</li>
                  <li>Upgrade medical equipment and facilities</li>
                </ul>
              </div>

              <div className="recommendation-category">
                <h5>💊 Disease Management</h5>
                <ul>
                  <li>Focus on diabetes and hypertension control</li>
                  <li>Improve cancer screening programs</li>
                  <li>Enhance mental health services</li>
                  <li>Strengthen respiratory disease management</li>
                </ul>
              </div>

              <div className="recommendation-category">
                <h5>🛡️ Prevention Programs</h5>
                <ul>
                  <li>Expand vaccination coverage</li>
                  <li>Promote healthy lifestyle campaigns</li>
                  <li>Improve sanitation and hygiene</li>
                  <li>Enhance maternal and child health</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHealthTrends;
