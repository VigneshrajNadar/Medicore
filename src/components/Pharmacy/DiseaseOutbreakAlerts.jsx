import React, { useState } from 'react';
import { FaExclamationTriangle, FaVirus, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import { indianHealthData } from '../../data/indianHealthData';
import './DiseaseOutbreakAlerts.css';

const DiseaseOutbreakAlerts = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return 'ℹ️';
      default: return '📋';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getDiseasePreventionGuide = (disease) => {
    const guides = {
      'COVID-19': 'COVID-19 Prevention: Get vaccinated, wear masks in crowded places, maintain social distance, wash hands frequently, avoid touching face, stay home when sick, and get tested if you have symptoms.',
      'Influenza': 'Flu Prevention: Get annual flu vaccine, wash hands often, avoid close contact with sick people, cover mouth when coughing, stay home when sick, and disinfect frequently touched surfaces.',
      'Dengue': 'Dengue Prevention: Use mosquito repellent, wear long sleeves and pants, eliminate standing water, use mosquito nets, avoid outdoor activities during peak mosquito hours.',
      'Malaria': 'Malaria Prevention: Take antimalarial medication if traveling to endemic areas, use insect repellent, sleep under mosquito nets, eliminate breeding sites around your home.',
      'Cholera': 'Cholera Prevention: Drink only safe water, wash hands thoroughly, eat properly cooked food, avoid raw or undercooked seafood, get vaccinated if available.',
      'Typhoid': 'Typhoid Prevention: Get vaccinated, drink safe water, avoid street food, wash hands frequently, eat thoroughly cooked food, maintain good hygiene.',
      'Hepatitis': 'Hepatitis Prevention: Get vaccinated, practice safe sex, avoid sharing needles, wash hands thoroughly, eat safe food, get tested regularly.',
      'Tuberculosis': 'TB Prevention: Get vaccinated with BCG, avoid close contact with active TB patients, maintain good ventilation, eat nutritious food, get regular health checkups.',
      'Pneumonia': 'Pneumonia Prevention: Get vaccinated, wash hands frequently, avoid smoking, maintain good nutrition, get regular health checkups, stay away from sick people.',
      'Diarrhea': 'Diarrhea Prevention: Drink safe water, wash hands before eating, eat properly cooked food, avoid contaminated food, maintain good hygiene practices.'
    };

    return guides[disease] || 'General Prevention: Practice good hygiene, get vaccinated, eat nutritious food, exercise regularly, and consult healthcare providers for specific guidance.';
  };

  const filteredOutbreaks = indianHealthData.diseaseOutbreaks.filter(outbreak => {
    const matchesState = selectedState === 'all' || outbreak.affectedAreas.includes(
      indianHealthData.states.find(state => state.id === selectedState)?.name
    );
    const matchesSeverity = severityFilter === 'all' || outbreak.severity === severityFilter;
    return matchesState && matchesSeverity;
  });

  return (
    <div className="outbreak-alerts-container">
      <div className="alerts-header">
        <h2>🚨 Disease Outbreak Alerts</h2>
        <p>Stay informed about current disease outbreaks and health alerts across India</p>
      </div>

      <div className="alerts-filters">
        <div className="filter-group">
          <label>Filter by State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">All States</option>
            {indianHealthData.states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Severity:</label>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="outbreaks-summary">
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon">🚨</div>
            <div className="summary-content">
              <h3>{indianHealthData.diseaseOutbreaks.filter(o => o.severity === 'high').length}</h3>
              <p>High Severity Outbreaks</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">⚠️</div>
            <div className="summary-content">
              <h3>{indianHealthData.diseaseOutbreaks.filter(o => o.severity === 'medium').length}</h3>
              <p>Medium Severity Outbreaks</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">📍</div>
            <div className="summary-content">
              <h3>{new Set(indianHealthData.diseaseOutbreaks.flatMap(o => o.affectedAreas)).size}</h3>
              <p>Affected States</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">👥</div>
            <div className="summary-content">
              <h3>{indianHealthData.diseaseOutbreaks.reduce((sum, o) => sum + o.reportedCases, 0).toLocaleString()}</h3>
              <p>Total Reported Cases</p>
            </div>
          </div>
        </div>
      </div>
      <div className="outbreaks-list">
        {filteredOutbreaks.map((outbreak) => (
          <div key={outbreak.id} className={`outbreak-card severity-${outbreak.severity}`}>
            <div className="outbreak-header">
              <div className="outbreak-title">
                <div className="severity-icon animate-severity">
                  {getSeverityIcon(outbreak.severity)}
                </div>
                <div className="title-content">
                  <h3>{outbreak.disease} Outbreak</h3>
                  <div className="outbreak-id">Alert ID: {outbreak.id}</div>
                </div>
              </div>
              <div className="severity-badge">
                {outbreak.severity.toUpperCase()}
              </div>
            </div>

            <div className="outbreak-details">
              <div className="detail-row">
                <FaMapMarkerAlt />
                <span>Affected Areas: {outbreak.affectedAreas.join(', ')}</span>
              </div>

              <div className="detail-row">
                <FaCalendarAlt />
                <span>Reported: {new Date(outbreak.dateReported).toLocaleDateString()}</span>
              </div>

              <div className="detail-row">
                <FaUsers />
                <span>Cases: {outbreak.reportedCases.toLocaleString()}</span>
              </div>

              <div className="detail-row">
                <FaChartLine />
                <span>Trend: {getTrendIcon(outbreak.trend)} {outbreak.trend}</span>
              </div>
            </div>

            <div className="outbreak-hotspots">
              <h4>🔥 Hotspot Areas</h4>
              <div className="hotspots-list">
                {outbreak.hotspots.map((hotspot, index) => (
                  <span key={index} className="hotspot-tag">{hotspot}</span>
                ))}
              </div>
            </div>

            <div className="outbreak-symptoms">
              <h4>🤒 Common Symptoms</h4>
              <div className="symptoms-grid">
                {outbreak.symptoms.map((symptom, index) => (
                  <div key={index} className="symptom-item">
                    <span className="symptom-dot"></span>
                    {symptom}
                  </div>
                ))}
              </div>
            </div>

            <div className="prevention-measures">
              <h4>🛡️ Prevention Measures</h4>
              <div className="measures-list">
                {outbreak.preventionMeasures.map((measure, index) => (
                  <div key={index} className="measure-item">
                    <span className="measure-icon">✓</span>
                    {measure}
                  </div>
                ))}
              </div>
            </div>

            <div className="treatment-info">
              <h4>💊 Treatment Information</h4>
              <p>{outbreak.treatment}</p>
            </div>

            <div className="alert-actions">
              <button 
                className="action-btn primary"
                onClick={() => alert(getDiseasePreventionGuide(outbreak.disease))}
              >
                <FaShieldAlt /> View Prevention Guide
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOutbreaks.length === 0 && (
        <div className="no-outbreaks">
          <div className="no-outbreaks-icon">✅</div>
          <h3>No Active Outbreaks</h3>
          <p>No disease outbreaks matching your current filters.</p>
        </div>
      )}

      <div className="prevention-tips">
        <h3>💡 General Prevention Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🧴</div>
            <h4>Hygiene First</h4>
            <p>Wash hands regularly with soap and water for at least 20 seconds</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🏠</div>
            <h4>Safe Environment</h4>
            <p>Keep your surroundings clean and eliminate stagnant water sources</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">💉</div>
            <h4>Get Vaccinated</h4>
            <p>Stay up-to-date with recommended vaccinations and boosters</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🥗</div>
            <h4>Healthy Diet</h4>
            <p>Maintain a balanced diet to strengthen your immune system</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">😷</div>
            <h4>Protective Measures</h4>
            <p>Use masks and maintain social distance when necessary</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🏥</div>
            <h4>Regular Checkups</h4>
            <p>Get regular health checkups and screenings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseOutbreakAlerts;
