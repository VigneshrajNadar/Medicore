import React, { useState } from 'react';
import { FaUsers, FaHeartbeat, FaHospital, FaSyringe, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';
import { indianHealthData } from '../../data/indianHealthData';
import './PopulationHealthInsights.css';

const PopulationHealthInsights = () => {
  const [selectedState, setSelectedState] = useState('DL');
  const [viewMode, setViewMode] = useState('overview'); // overview, trends, comparison

  const currentStateData = indianHealthData.populationHealthInsights[selectedState];
  const stateInfo = indianHealthData.states.find(state => state.id === selectedState);

  // Safety check for undefined data
  if (!currentStateData || !stateInfo) {
    return (
      <div className="population-health-container">
        <div className="error-state">
          <h3>⚠️ Data Loading Error</h3>
          <p>Unable to load health data for the selected state. Please try again.</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      </div>
    );
  }

  const getHealthScoreColor = (score) => {
    if (score >= 8) return '#10b981';
    if (score >= 7) return '#059669';
    if (score >= 6) return '#f59e0b';
    if (score >= 5) return '#ef4444';
    return '#dc2626';
  };

  const getHealthScoreIcon = (score) => {
    if (score >= 8) return '🏆';
    if (score >= 7) return '⭐';
    if (score >= 6) return '👍';
    if (score >= 5) return '⚠️';
    return '🚨';
  };

  const getTrendIndicator = (trend) => {
    switch (trend) {
      case 'increasing': return { icon: '📈', color: '#ef4444', animation: 'pulse' };
      case 'decreasing': return { icon: '📉', color: '#10b981', animation: 'bounce' };
      default: return { icon: '➡️', color: '#6b7280', animation: 'fade' };
    }
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'Health Score': return '❤️';
      case 'Life Expectancy': return '👶';
      case 'Hospital Beds': return '🏥';
      case 'Vaccination Rate': return '💉';
      default: return '📊';
    }
  };

  return (
    <div className="population-health-container">
      <div className="health-insights-header">
        <h2>📊 Population Health Insights</h2>
        <p>Comprehensive health data and trends across Indian states</p>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'overview' ? 'active' : ''}`}
            onClick={() => setViewMode('overview')}
          >
            Overview
          </button>
          <button
            className={`view-btn ${viewMode === 'trends' ? 'active' : ''}`}
            onClick={() => setViewMode('trends')}
          >
            Health Trends
          </button>
          <button
            className={`view-btn ${viewMode === 'comparison' ? 'active' : ''}`}
            onClick={() => setViewMode('comparison')}
          >
            State Comparison
          </button>
        </div>
      </div>

      <div className="state-selector">
        <label>Select State:</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="state-dropdown"
        >
          {indianHealthData.states.map(state => (
            <option key={state.id} value={state.id}>
              {state.name} ({state.population.toLocaleString()} population)
            </option>
          ))}
        </select>
      </div>

      {viewMode === 'overview' && (
        <div className="overview-section">
          <div className="state-summary">
            <div className="summary-header">
              <h3>{stateInfo.name} Health Overview</h3>
              <div className="population-info">
                <FaUsers /> {stateInfo.population.toLocaleString()} people
                <FaMapMarkerAlt /> {stateInfo.area.toLocaleString()} sq km
              </div>
            </div>

            <div className="key-metrics">
              <div className="metric-card">
                <div className="metric-icon animate-icon">
                  {getHealthScoreIcon(currentStateData.healthScore)}
                </div>
                <div className="metric-content">
                  <h4>Health Score</h4>
                  <div className="metric-value" style={{ color: getHealthScoreColor(currentStateData.healthScore) }}>
                    {currentStateData.healthScore}/10
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon animate-icon">
                  {getMetricIcon('Life Expectancy')}
                </div>
                <div className="metric-content">
                  <h4>Life Expectancy</h4>
                  <div className="metric-value">{currentStateData.lifeExpectancy} years</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon animate-icon">
                  {getMetricIcon('Hospital Beds')}
                </div>
                <div className="metric-content">
                  <h4>Hospital Beds</h4>
                  <div className="metric-value">{currentStateData.hospitalBedsPer1000}/1000 people</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon animate-icon">
                  {getMetricIcon('Vaccination Rate')}
                </div>
                <div className="metric-content">
                  <h4>Vaccination Rate</h4>
                  <div className="metric-value">{currentStateData.vaccinationRate}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="health-concerns">
            <h3>🏥 Top Health Concerns</h3>
            <div className="concerns-grid">
              {currentStateData.topHealthConcerns.map((concern, index) => (
                <div key={index} className="concern-card">
                  <span className="concern-number">{index + 1}</span>
                  <span className="concern-text">{concern}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chronic-diseases">
            <h3>📈 Chronic Disease Prevalence (%)</h3>
            <div className="disease-stats">
              {Object.entries(currentStateData.chronicDiseasePrevalence).map(([disease, rate]) => (
                <div key={disease} className="disease-stat">
                  <div className="disease-name">{disease.charAt(0).toUpperCase() + disease.slice(1)}</div>
                  <div className="disease-rate">{rate}%</div>
                  <div className="disease-bar">
                    <div
                      className="disease-fill"
                      style={{ width: `${rate}%`, backgroundColor: getHealthScoreColor(rate / 10 * 8) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'trends' && (
        <div className="trends-section">
          <div className="seasonal-trends">
            <h3>🕐 Seasonal Health Trends</h3>
            <div className="trends-grid">
              {indianHealthData.communityHealthTrends.seasonalTrends.map((trend, index) => (
                <div key={index} className="trend-card">
                  <div className="trend-header">
                    <h4>{trend.season}</h4>
                    <span className="trend-period">{trend.period}</span>
                  </div>
                  <div className="trend-stats">
                    <div className="affected-population">
                      <FaUsers /> {trend.affectedPopulation.toLocaleString()} affected
                    </div>
                    <div className="trend-indicator" style={{ color: getTrendIndicator(trend.trend).color }}>
                      {getTrendIndicator(trend.trend).icon} {trend.trend}
                    </div>
                  </div>
                  <div className="common-conditions">
                    <h5>Common Conditions:</h5>
                    <div className="conditions-list">
                      {trend.commonConditions.map((condition, idx) => (
                        <span key={idx} className="condition-tag">{condition}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="age-group-trends">
            <h3>👥 Age Group Health trends</h3>
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
                      <div className="affected-rate">{ageGroup.affectedRate.toLocaleString()} affected</div>
                    </div>
                  </div>
                  <div className="age-conditions">
                    <div className="conditions">
                      {ageGroup.commonConditions.map((condition, idx) => (
                        <div key={idx} className="condition-item">{condition}</div>
                      ))}
                    </div>
                  </div>
                  <div className="trend-indicator" style={{ color: getTrendIndicator(ageGroup.trend).color }}>
                    {getTrendIndicator(ageGroup.trend).icon} {ageGroup.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'comparison' && (
        <div className="comparison-section">
          <h3>⚖️ State Comparison</h3>
          <div className="comparison-container">
            <table className="state-comparison-table">
              <thead>
                <tr className="table-header">
                  <th>State</th>
                  <th>Population</th>
                  <th>Health Score</th>
                  <th>Life Expectancy</th>
                  <th>Hospital Beds</th>
                  <th>Vaccination Rate</th>
                  <th>Doctor Ratio</th>
                  <th>Infrastructure</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(indianHealthData.populationHealthInsights).map(([stateId, data]) => {
                  const stateInfo = indianHealthData.states.find(s => s.id === stateId);
                  return (
                    <tr key={stateId} className={`table-row ${stateId === selectedState ? 'selected' : ''}`}>
                      <td className="state-cell">
                        <div className="state-name">
                          <span>{stateInfo.name}</span>
                        </div>
                      </td>
                      <td>{stateInfo.population.toLocaleString()}</td>
                      <td>
                        <span className="health-score" style={{ color: getHealthScoreColor(data.healthScore) }}>
                          {data.healthScore}/10
                        </span>
                      </td>
                      <td>{data.lifeExpectancy} years</td>
                      <td>{data.hospitalBedsPer1000}/1000</td>
                      <td>{data.vaccinationRate}%</td>
                      <td>{data.doctorPatientRatio}</td>
                      <td>
                        <span className="infrastructure-badge">
                          {data.healthInfrastructureScore}/10
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopulationHealthInsights;
