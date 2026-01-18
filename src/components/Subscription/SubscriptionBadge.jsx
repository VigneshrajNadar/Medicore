import React, { useState, useEffect } from 'react';
import { FaCrown, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './SubscriptionBadge.css';

const SubscriptionBadge = ({ showDetails = false, inline = false }) => {
  const { currentUser } = useUser();
  const [subscription, setSubscription] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const subData = currentUser?.subscription || JSON.parse(localStorage.getItem('userSubscription'));
    if (subData && subData.status === 'active') {
      setSubscription(subData);
    } else {
      setSubscription(null);
    }
  }, [currentUser]);

  if (!subscription) {
    return null;
  }

  const getDaysRemaining = () => {
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getDiscountPercentage = () => {
    if (subscription.planId === 'basic') return '5%';
    if (subscription.planId === 'premium') return '15%';
    if (subscription.planId === 'elite') return '25%';
    return '0%';
  };

  if (inline) {
    return (
      <div className="subscription-badge-inline">
        <FaCrown className="badge-icon" />
        <span className="badge-text">{subscription.planName} Member</span>
        <span className="badge-discount">{getDiscountPercentage()} OFF</span>
      </div>
    );
  }

  return (
    <div className="subscription-badge-card">
      <div className="badge-header">
        <FaCrown className="crown-icon" />
        <div className="badge-info">
          <h3>{subscription.planName}</h3>
          <p className="badge-status">
            <FaCheckCircle /> Active Membership
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="badge-details">
          <div className="detail-item">
            <span className="detail-label">Discount:</span>
            <span className="detail-value">{getDiscountPercentage()} on all orders</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Valid for:</span>
            <span className="detail-value">{getDaysRemaining()} days</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Billing:</span>
            <span className="detail-value">{subscription.billingCycle}</span>
          </div>
        </div>
      )}

      <button
        className="view-benefits-btn"
        onClick={() => navigate('/subscription-dashboard')}
      >
        View Benefits
      </button>
    </div>
  );
};

export default SubscriptionBadge;
