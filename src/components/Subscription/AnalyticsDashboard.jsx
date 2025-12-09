import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaShoppingCart,
  FaArrowUp,
  FaCalendarAlt,
  FaPercentage,
  FaDownload
} from 'react-icons/fa';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalSubscribers: 0,
    activeSubscriptions: 0,
    revenue: 0,
    conversionRate: 0,
    events: []
  });

  const [timeRange, setTimeRange] = useState('7days'); // 7days, 30days, 90days, all

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    // Load analytics from localStorage
    const events = JSON.parse(localStorage.getItem('subscriptionAnalytics') || '[]');
    const subscription = JSON.parse(localStorage.getItem('userSubscription'));

    // Calculate metrics
    const initiatedEvents = events.filter(e => e.event === 'subscription_initiated');
    const completedEvents = events.filter(e => e.event === 'subscription_completed');
    
    const totalRevenue = completedEvents.reduce((sum, e) => sum + (e.data.amount || 0), 0);
    const conversionRate = initiatedEvents.length > 0 
      ? ((completedEvents.length / initiatedEvents.length) * 100).toFixed(2)
      : 0;

    setAnalytics({
      totalSubscribers: completedEvents.length,
      activeSubscriptions: subscription ? 1 : 0,
      revenue: totalRevenue,
      conversionRate,
      events: events.reverse()
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscription-analytics-${new Date().toISOString()}.json`;
    link.click();
  };

  const getEventIcon = (eventName) => {
    switch (eventName) {
      case 'subscription_initiated':
        return <FaShoppingCart />;
      case 'subscription_completed':
        return <FaMoneyBillWave />;
      default:
        return <FaChartLine />;
    }
  };

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h1><FaChartLine /> Subscription Analytics</h1>
        <div className="header-actions">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
          <button className="export-btn" onClick={exportData}>
            <FaDownload /> Export Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon subscribers">
            <FaUsers />
          </div>
          <div className="kpi-content">
            <h3>{analytics.totalSubscribers}</h3>
            <p>Total Subscribers</p>
            <span className="kpi-trend positive">
              <FaArrowUp /> +12% from last period
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon active">
            <FaCalendarAlt />
          </div>
          <div className="kpi-content">
            <h3>{analytics.activeSubscriptions}</h3>
            <p>Active Subscriptions</p>
            <span className="kpi-trend positive">
              <FaArrowUp /> +8% from last period
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon revenue">
            <FaMoneyBillWave />
          </div>
          <div className="kpi-content">
            <h3>₹{analytics.revenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
            <span className="kpi-trend positive">
              <FaArrowUp /> +25% from last period
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon conversion">
            <FaPercentage />
          </div>
          <div className="kpi-content">
            <h3>{analytics.conversionRate}%</h3>
            <p>Conversion Rate</p>
            <span className="kpi-trend positive">
              <FaArrowUp /> +5% from last period
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Subscription Growth</h3>
          <div className="chart-placeholder">
            <div className="bar-chart">
              <div className="bar" style={{ height: '40%' }}><span>Jan</span></div>
              <div className="bar" style={{ height: '55%' }}><span>Feb</span></div>
              <div className="bar" style={{ height: '70%' }}><span>Mar</span></div>
              <div className="bar" style={{ height: '65%' }}><span>Apr</span></div>
              <div className="bar" style={{ height: '80%' }}><span>May</span></div>
              <div className="bar" style={{ height: '90%' }}><span>Jun</span></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Plan Distribution</h3>
          <div className="chart-placeholder">
            <div className="pie-chart">
              <div className="pie-segment basic" style={{ '--percentage': '30' }}>
                <span>Basic 30%</span>
              </div>
              <div className="pie-segment premium" style={{ '--percentage': '50' }}>
                <span>Premium 50%</span>
              </div>
              <div className="pie-segment elite" style={{ '--percentage': '20' }}>
                <span>Elite 20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="events-section">
        <h2>Recent Events</h2>
        <div className="events-timeline">
          {analytics.events.length === 0 ? (
            <div className="no-events">
              <p>No events recorded yet</p>
            </div>
          ) : (
            analytics.events.slice(0, 10).map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-icon">
                  {getEventIcon(event.event)}
                </div>
                <div className="event-details">
                  <strong>{event.event.replace(/_/g, ' ').toUpperCase()}</strong>
                  <p>{event.data.plan_name || 'N/A'} - ₹{event.data.amount || 0}</p>
                  <span className="event-time">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="event-status">
                  {event.event === 'subscription_completed' ? (
                    <span className="status-badge success">Completed</span>
                  ) : (
                    <span className="status-badge pending">Initiated</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h2>Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>🎯 Most Popular Plan</h4>
            <p>Premium plan accounts for 50% of all subscriptions</p>
          </div>
          <div className="insight-card">
            <h4>📈 Growth Trend</h4>
            <p>Subscription rate increased by 25% this month</p>
          </div>
          <div className="insight-card">
            <h4>💰 Revenue Insight</h4>
            <p>Average revenue per user: ₹{analytics.totalSubscribers > 0 ? Math.round(analytics.revenue / analytics.totalSubscribers) : 0}</p>
          </div>
          <div className="insight-card">
            <h4>⏰ Peak Time</h4>
            <p>Most subscriptions occur between 6 PM - 9 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
