import React, { useState } from 'react';
import { FaSun, FaSnowflake, FaCloudRain, FaLeaf, FaThermometerHalf, FaShieldAlt } from 'react-icons/fa';
import { indianHealthData } from '../../data/indianHealthData';
import './SeasonalHealthRecommendations.css';

const SeasonalHealthRecommendations = () => {
  const [selectedSeason, setSelectedSeason] = useState('winter');
  const [selectedGroup, setSelectedGroup] = useState('general');

  const currentSeason = indianHealthData.seasonalRecommendations[selectedSeason];

  const getSeasonIcon = (season) => {
    switch (season) {
      case 'winter': return <FaSnowflake />;
      case 'summer': return <FaSun />;
      case 'monsoon': return <FaCloudRain />;
      case 'post-monsoon': return <FaLeaf />;
      default: return <FaThermometerHalf />;
    }
  };

  const getSeasonColor = (season) => {
    switch (season) {
      case 'winter': return '#3b82f6';
      case 'summer': return '#f59e0b';
      case 'monsoon': return '#059669';
      case 'post-monsoon': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="seasonal-recommendations-container">
      <div className="seasonal-header">
        <h2>🕐 Seasonal Health Recommendations</h2>
        <p>Personalized health advice based on seasonal changes and weather patterns</p>
      </div>

      <div className="season-selector">
        <div className="season-buttons">
          {Object.keys(indianHealthData.seasonalRecommendations).map((season) => (
            <button
              key={season}
              className={`season-btn ${selectedSeason === season ? 'active' : ''}`}
              onClick={() => setSelectedSeason(season)}
              style={{
                '--season-color': getSeasonColor(season)
              }}
            >
              <span className="season-icon">
                {getSeasonIcon(season)}
              </span>
              <span className="season-name">
                {season.charAt(0).toUpperCase() + season.slice(1).replace('-', ' ')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="recommendations-content">
        <div className="recommendations-tabs">
          <button
            className={`tab-btn ${selectedGroup === 'general' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('general')}
          >
            General Population
          </button>
          <button
            className={`tab-btn ${selectedGroup === 'elderly' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('elderly')}
          >
            Elderly (60+)
          </button>
          <button
            className={`tab-btn ${selectedGroup === 'children' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('children')}
          >
            Children
          </button>
          <button
            className={`tab-btn ${selectedGroup === 'chronic-patients' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('chronic-patients')}
          >
            Chronic Patients
          </button>
        </div>

        <div className="recommendations-display">
          <div className="season-info-card">
            <div className="season-info-header">
              <div className="season-display-icon animate-season" style={{ color: getSeasonColor(selectedSeason) }}>
                {getSeasonIcon(selectedSeason)}
              </div>
              <div className="season-display-info">
                <h3>{selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1).replace('-', ' ')} Health Guide</h3>
                <p>Essential health recommendations for {selectedSeason} season</p>
              </div>
            </div>

            <div className="general-recommendations">
              <h4>📋 General Recommendations</h4>
              <div className="recommendations-list">
                {currentSeason.general.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <span className="rec-number">{index + 1}</span>
                    <span className="rec-text">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="vulnerable-groups">
              <h4>👥 Special Care for {selectedGroup === 'general' ? 'Vulnerable Groups' : selectedGroup.charAt(0).toUpperCase() + selectedGroup.slice(1)}</h4>

              {selectedGroup === 'general' ? (
                <div className="groups-overview">
                  {Object.entries(currentSeason.vulnerableGroups).map(([group, recommendations]) => (
                    <div key={group} className="group-card">
                      <h5>{group.charAt(0).toUpperCase() + group.slice(1)}</h5>
                      <div className="group-recommendations">
                        {recommendations.map((rec, idx) => (
                          <div key={idx} className="group-rec-item">
                            <span className="group-rec-icon">•</span>
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="specific-group-recommendations">
                  {currentSeason.vulnerableGroups[selectedGroup]?.map((rec, idx) => (
                    <div key={idx} className="group-rec-item">
                      <span className="group-rec-icon">•</span>
                      {rec}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="preventive-measures">
              <h4>🛡️ Preventive Measures</h4>
              <div className="measures-grid">
                {currentSeason.preventiveMeasures.map((measure, index) => (
                  <div key={index} className="measure-card">
                    <div className="measure-icon">🛡️</div>
                    <span className="measure-text">{measure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="seasonal-alerts">
            <h4>⚠️ Seasonal Health Alerts</h4>
            <div className="alerts-list">
              {indianHealthData.diseaseOutbreaks
                .filter(outbreak => {
                  // Filter outbreaks based on current season
                  const month = new Date().getMonth();
                  switch (selectedSeason) {
                    case 'winter':
                      return month >= 11 || month <= 1;
                    case 'summer':
                      return month >= 2 && month <= 4;
                    case 'monsoon':
                      return month >= 5 && month <= 8;
                    case 'post-monsoon':
                      return month >= 9 && month <= 10;
                    default:
                      return true;
                  }
                })
                .slice(0, 3)
                .map((outbreak) => (
                  <div key={outbreak.id} className="seasonal-alert">
                    <div className="alert-header">
                      <span className="alert-disease">{outbreak.disease}</span>
                      <span className={`alert-severity ${outbreak.severity}`}>{outbreak.severity}</span>
                    </div>
                    <p className="alert-description">
                      Active outbreak in {outbreak.affectedAreas.join(', ')} with {outbreak.reportedCases.toLocaleString()} reported cases.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="health-checklist">
          <h4>✅ Daily Health Checklist for {selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1).replace('-', ' ')}</h4>
          <div className="checklist-grid">
            <div className="checklist-section">
              <h5>🌅 Morning Routine</h5>
              <div className="checklist-items">
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Hydration check (drink water)</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Weather-appropriate clothing</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Check air quality index</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Take prescribed medications</span>
                </label>
              </div>
            </div>

            <div className="checklist-section">
              <h5>🌄 Afternoon Care</h5>
              <div className="checklist-items">
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Stay hydrated throughout the day</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Avoid peak sun hours (if summer)</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Practice good hygiene</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Monitor for seasonal symptoms</span>
                </label>
              </div>
            </div>

            <div className="checklist-section">
              <h5>🌙 Evening Wind-down</h5>
              <div className="checklist-items">
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Review day's health activities</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Prepare for next day weather</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Maintain sleep hygiene</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Emergency preparedness check</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="emergency-contacts">
          <h4>🚨 Emergency Contacts & Resources</h4>
          <div className="contacts-grid">
            <div className="contact-card">
              <div className="contact-icon">🏥</div>
              <div className="contact-info">
                <h5>Medical Emergency</h5>
                <p className="contact-number">108</p>
                <p className="contact-desc">National Ambulance Service</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">🚑</div>
              <div className="contact-info">
                <h5>Apollo Emergency</h5>
                <p className="contact-number">1066</p>
                <p className="contact-desc">Apollo Hospitals Emergency</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div className="contact-info">
                <h5>Health Helpline</h5>
                <p className="contact-number">1800-11-4000</p>
                <p className="contact-desc">National Health Helpline</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">💊</div>
              <div className="contact-info">
                <h5>Poison Control</h5>
                <p className="contact-number">1800-11-6117</p>
                <p className="contact-desc">National Poison Control Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalHealthRecommendations;
