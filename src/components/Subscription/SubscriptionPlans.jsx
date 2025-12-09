import React, { useState, useEffect } from 'react';
import { 
  FaCrown, 
  FaCheck, 
  FaTimes, 
  FaShippingFast, 
  FaPercent, 
  FaUserMd, 
  FaPills, 
  FaHeartbeat,
  FaStar,
  FaGift,
  FaShieldAlt,
  FaPhoneAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaInfoCircle,
  FaChartLine
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './SubscriptionPlans.css';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, quarterly, yearly
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState('plans'); // plans, benefits, faq
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [planToSubscribe, setPlanToSubscribe] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    // Check if user has active subscription
    const subscription = localStorage.getItem('userSubscription');
    setHasActiveSubscription(!!subscription);
  }, []);

  // Subscription plans data
  const plans = [
    {
      id: 'basic',
      name: 'MediCore Basic',
      icon: <FaPills />,
      color: '#4CAF50',
      tagline: 'Essential healthcare savings',
      pricing: {
        monthly: 99,
        quarterly: 249,
        yearly: 899
      },
      savings: {
        monthly: 0,
        quarterly: 48,
        yearly: 289
      },
      features: [
        { text: '5% discount on all medicines', included: true },
        { text: 'Free delivery on orders above ₹500', included: true },
        { text: '1 free health checkup per year', included: true },
        { text: 'Priority customer support', included: true },
        { text: 'Medicine reminder notifications', included: true },
        { text: 'Doctor consultation discount', included: false },
        { text: 'Lab test discounts', included: false },
        { text: 'Dedicated health advisor', included: false }
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'MediCore Premium',
      icon: <FaHeartbeat />,
      color: '#FF9800',
      tagline: 'Complete healthcare solution',
      pricing: {
        monthly: 199,
        quarterly: 499,
        yearly: 1799
      },
      savings: {
        monthly: 0,
        quarterly: 98,
        yearly: 589
      },
      features: [
        { text: '15% discount on all medicines', included: true },
        { text: 'Free delivery on all orders', included: true },
        { text: '2 free comprehensive health checkups', included: true },
        { text: '24/7 priority customer support', included: true },
        { text: 'Medicine reminder & refill alerts', included: true },
        { text: '20% off on doctor consultations', included: true },
        { text: '25% discount on lab tests', included: true },
        { text: 'Dedicated health advisor', included: false }
      ],
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'elite',
      name: 'MediCore Elite',
      icon: <FaCrown />,
      color: '#9C27B0',
      tagline: 'Premium healthcare experience',
      pricing: {
        monthly: 399,
        quarterly: 999,
        yearly: 3599
      },
      savings: {
        monthly: 0,
        quarterly: 198,
        yearly: 1189
      },
      features: [
        { text: '25% discount on all medicines', included: true },
        { text: 'Free express delivery on all orders', included: true },
        { text: 'Unlimited health checkups', included: true },
        { text: 'Dedicated 24/7 concierge support', included: true },
        { text: 'AI-powered health monitoring', included: true },
        { text: 'Free unlimited doctor consultations', included: true },
        { text: '50% discount on all lab tests', included: true },
        { text: 'Personal health advisor & wellness coach', included: true }
      ],
      popular: false,
      badge: 'Best Value'
    }
  ];

  // Additional benefits
  const additionalBenefits = [
    {
      icon: <FaShippingFast />,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered within 24-48 hours'
    },
    {
      icon: <FaPercent />,
      title: 'Exclusive Discounts',
      description: 'Save up to 25% on all your medicine purchases'
    },
    {
      icon: <FaUserMd />,
      title: 'Doctor Consultations',
      description: 'Access to verified doctors for online consultations'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Genuine Medicines',
      description: '100% authentic medicines from licensed pharmacies'
    },
    {
      icon: <FaGift />,
      title: 'Reward Points',
      description: 'Earn points on every purchase and redeem later'
    },
    {
      icon: <FaPhoneAlt />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all queries'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How does the subscription work?',
      answer: 'Choose a plan that suits your needs, make the payment, and start enjoying exclusive benefits immediately. Your subscription will auto-renew unless cancelled.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription anytime. However, refunds are not provided for the remaining period of your current billing cycle.'
    },
    {
      question: 'Are there any hidden charges?',
      answer: 'No, there are absolutely no hidden charges. The price you see is the price you pay. All benefits are included in the subscription fee.'
    },
    {
      question: 'How do I avail the discounts?',
      answer: 'Discounts are automatically applied at checkout when you are logged in with an active subscription. No coupon codes needed!'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can upgrade or downgrade your plan anytime. The price difference will be adjusted in your next billing cycle.'
    },
    {
      question: 'What happens if I miss a payment?',
      answer: 'Your subscription will be paused, and you will lose access to benefits. You can reactivate by making the payment within 7 days.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    setPlanToSubscribe(plan);
    setShowPaymentModal(true);
    
    // Track analytics
    trackEvent('subscription_initiated', {
      plan_id: planId,
      plan_name: plan.name,
      billing_cycle: billingCycle,
      amount: plan.pricing[billingCycle]
    });
  };

  const handlePaymentSuccess = (subscriptionData) => {
    setShowPaymentModal(false);
    
    // Track conversion
    trackEvent('subscription_completed', subscriptionData);
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate('/subscription-dashboard');
    }, 500);
  };

  const trackEvent = (eventName, data) => {
    console.log('Analytics Event:', eventName, data);
    
    // Google Analytics integration
    if (window.gtag) {
      window.gtag('event', eventName, data);
    }
    
    // Store in localStorage for demo analytics
    const analytics = JSON.parse(localStorage.getItem('subscriptionAnalytics') || '[]');
    analytics.push({
      event: eventName,
      data,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('subscriptionAnalytics', JSON.stringify(analytics));
  };

  const calculateSavings = (plan) => {
    const basePrice = plan.pricing.monthly;
    const selectedPrice = plan.pricing[billingCycle];
    
    if (billingCycle === 'monthly') return 0;
    
    const months = billingCycle === 'quarterly' ? 3 : 12;
    const totalWithoutDiscount = basePrice * months;
    return totalWithoutDiscount - selectedPrice;
  };

  return (
    <div className="subscription-page">
      {/* Hero Section */}
      <div className="subscription-hero">
        <div className="hero-content">
          <h1>
            <FaCrown className="hero-icon" />
            MediCore Subscription Plans
          </h1>
          <p className="hero-subtitle">
            Save more on healthcare with our exclusive membership plans
          </p>
          {hasActiveSubscription && (
            <button 
              className="dashboard-link-btn"
              onClick={() => navigate('/subscription-dashboard')}
            >
              <FaChartLine /> View My Dashboard
            </button>
          )}
          <div className="hero-stats">
            <div className="stat-item">
              <FaStar />
              <span>50,000+ Happy Members</span>
            </div>
            <div className="stat-item">
              <FaMoneyBillWave />
              <span>Save up to ₹10,000/year</span>
            </div>
            <div className="stat-item">
              <FaShieldAlt />
              <span>100% Genuine Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="subscription-tabs">
        <button 
          className={`tab-btn ${activeTab === 'plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          <FaCalendarAlt /> Subscription Plans
        </button>
        <button 
          className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
          onClick={() => setActiveTab('benefits')}
        >
          <FaGift /> Benefits
        </button>
        <button 
          className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          <FaInfoCircle /> FAQ
        </button>
      </div>

      <div className="subscription-container">
        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <>
            {/* Billing Cycle Selector */}
            <div className="billing-selector">
              <h3>Choose Your Billing Cycle</h3>
              <div className="billing-options">
                <button
                  className={`billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`billing-btn ${billingCycle === 'quarterly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('quarterly')}
                >
                  Quarterly
                  <span className="save-badge">Save 16%</span>
                </button>
                <button
                  className={`billing-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly
                  <span className="save-badge">Save 25%</span>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="plans-grid">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
                  style={{ '--plan-color': plan.color }}
                >
                  {plan.badge && (
                    <div className="plan-badge">{plan.badge}</div>
                  )}
                  
                  <div className="plan-header">
                    <div className="plan-icon" style={{ color: plan.color }}>
                      {plan.icon}
                    </div>
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-tagline">{plan.tagline}</p>
                  </div>

                  <div className="plan-pricing">
                    <div className="price-main">
                      <span className="currency">₹</span>
                      <span className="amount">{plan.pricing[billingCycle]}</span>
                      <span className="period">/{billingCycle === 'monthly' ? 'month' : billingCycle === 'quarterly' ? 'quarter' : 'year'}</span>
                    </div>
                    {calculateSavings(plan) > 0 && (
                      <div className="price-savings">
                        Save ₹{calculateSavings(plan)} with {billingCycle} plan
                      </div>
                    )}
                    {billingCycle !== 'monthly' && (
                      <div className="price-breakdown">
                        ₹{Math.round(plan.pricing[billingCycle] / (billingCycle === 'quarterly' ? 3 : 12))}/month
                      </div>
                    )}
                  </div>

                  <div className="plan-features">
                    {plan.features.map((feature, index) => (
                      <div key={index} className={`feature-item ${feature.included ? 'included' : 'excluded'}`}>
                        {feature.included ? (
                          <FaCheck className="feature-icon check" />
                        ) : (
                          <FaTimes className="feature-icon cross" />
                        )}
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="subscribe-btn"
                    onClick={() => handleSubscribe(plan.id)}
                    style={{ backgroundColor: plan.color }}
                  >
                    Subscribe Now
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison Toggle */}
            <div className="comparison-section">
              <button 
                className="comparison-toggle"
                onClick={() => setShowComparison(!showComparison)}
              >
                {showComparison ? 'Hide' : 'Show'} Detailed Comparison
              </button>

              {showComparison && (
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Features</th>
                        {plans.map(plan => (
                          <th key={plan.id} style={{ color: plan.color }}>
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {plans[0].features.map((_, index) => (
                        <tr key={index}>
                          <td className="feature-name">{plans[0].features[index].text}</td>
                          {plans.map(plan => (
                            <td key={plan.id}>
                              {plan.features[index].included ? (
                                <FaCheck className="check-icon" style={{ color: plan.color }} />
                              ) : (
                                <FaTimes className="cross-icon" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="benefits-section">
            <h2>Why Choose MediCore Subscription?</h2>
            <div className="benefits-grid">
              {additionalBenefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="testimonials-section">
              <h2>What Our Members Say</h2>
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p>"The Premium plan has saved me over ₹5000 in just 6 months. Highly recommended!"</p>
                  <div className="testimonial-author">
                    <strong>Rajesh Kumar</strong>
                    <span>Premium Member</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p>"Free doctor consultations and lab test discounts are game changers. Best investment!"</p>
                  <div className="testimonial-author">
                    <strong>Priya Sharma</strong>
                    <span>Elite Member</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p>"The convenience and savings are unmatched. My entire family is now on MediCore!"</p>
                  <div className="testimonial-author">
                    <strong>Amit Patel</strong>
                    <span>Premium Member</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <span className="faq-toggle">{expandedFaq === index ? '−' : '+'}</span>
                  </div>
                  {expandedFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="contact-support">
              <h3>Still have questions?</h3>
              <p>Our support team is here to help you 24/7</p>
              <div className="support-buttons">
                <button className="support-btn">
                  <FaPhoneAlt /> Call Support
                </button>
                <button className="support-btn">
                  <FaUserMd /> Chat with Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <div className="cta-content">
          <h2>Ready to Start Saving on Healthcare?</h2>
          <p>Join thousands of happy members and experience premium healthcare benefits</p>
          <button className="cta-btn" onClick={() => setActiveTab('plans')}>
            View All Plans
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={planToSubscribe}
        billingCycle={billingCycle}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default SubscriptionPlans;
