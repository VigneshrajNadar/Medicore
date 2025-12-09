import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCreditCard, FaMobile, FaLock, FaCheck, FaSpinner, FaCheckCircle, FaMobileAlt, FaUniversity, FaWallet } from 'react-icons/fa';
import Loader from '../common/Loader';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, plan, billingCycle, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankAccount: '',
    ifscCode: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const amount = plan.pricing[billingCycle];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentSuccess(true);

    // Store subscription data
    const subscriptionData = {
      planId: plan.id,
      planName: plan.name,
      billingCycle,
      amount,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : billingCycle === 'quarterly' ? 90 : 365) * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      paymentMethod,
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    localStorage.setItem('userSubscription', JSON.stringify(subscriptionData));

    // Send email notification (simulated)
    sendEmailNotification(subscriptionData);

    // Track analytics
    trackSubscriptionEvent('subscription_purchased', subscriptionData);

    setTimeout(() => {
      onPaymentSuccess(subscriptionData);
      onClose();
    }, 2000);
  };

  const sendEmailNotification = (data) => {
    console.log('Email notification sent:', {
      to: localStorage.getItem('userEmail') || 'user@example.com',
      subject: `Welcome to ${data.planName}!`,
      body: `Your subscription has been activated. Transaction ID: ${data.transactionId}`
    });
  };

  const trackSubscriptionEvent = (eventName, data) => {
    console.log('Analytics Event:', eventName, data);
    // Integration with Google Analytics, Mixpanel, etc.
    if (window.gtag) {
      window.gtag('event', eventName, {
        plan_id: data.planId,
        plan_name: data.planName,
        billing_cycle: data.billingCycle,
        amount: data.amount,
        transaction_id: data.transactionId
      });
    }
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        {paymentSuccess ? (
          <div className="payment-success">
            <div className="success-animation">
              <FaCheckCircle className="success-icon" />
            </div>
            <h2>Payment Successful!</h2>
            <p>Your {plan.name} subscription has been activated</p>
            <div className="success-details">
              <p><strong>Amount Paid:</strong> ₹{amount}</p>
              <p><strong>Billing Cycle:</strong> {billingCycle}</p>
              <p><strong>Valid Until:</strong> {new Date(Date.now() + (billingCycle === 'monthly' ? 30 : billingCycle === 'quarterly' ? 90 : 365) * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>
            <button className="success-btn" onClick={onClose}>
              Go to Dashboard
            </button>
          </div>
        ) : (
          <>
            <button className="close-modal" onClick={onClose}>
              <FaTimes />
            </button>

            <div className="payment-header">
              <h2>Complete Your Payment</h2>
              <div className="payment-summary">
                <div className="summary-item">
                  <span>Plan:</span>
                  <strong>{plan.name}</strong>
                </div>
                <div className="summary-item">
                  <span>Billing:</span>
                  <strong>{billingCycle}</strong>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <strong>₹{amount}</strong>
                </div>
              </div>
            </div>

            <div className="payment-methods">
              <button
                className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <FaCreditCard /> Card
              </button>
              <button
                className={`method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <FaMobileAlt /> UPI
              </button>
              <button
                className={`method-btn ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('netbanking')}
              >
                <FaUniversity /> Net Banking
              </button>
              <button
                className={`method-btn ${paymentMethod === 'wallet' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <FaWallet /> Wallet
              </button>
            </div>

            <form onSubmit={handlePayment} className="payment-form">
              {paymentMethod === 'card' && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="form-section">
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      placeholder="yourname@upi"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="upi-apps">
                    <button type="button" className="upi-app">Google Pay</button>
                    <button type="button" className="upi-app">PhonePe</button>
                    <button type="button" className="upi-app">Paytm</button>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Select Bank</label>
                    <select required>
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                    </select>
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="form-section">
                  <div className="wallet-options">
                    <button type="button" className="wallet-option">Paytm Wallet</button>
                    <button type="button" className="wallet-option">Amazon Pay</button>
                    <button type="button" className="wallet-option">PhonePe Wallet</button>
                    <button type="button" className="wallet-option">Mobikwik</button>
                  </div>
                </div>
              )}

              <div className="security-note">
                <FaLock /> Your payment information is secure and encrypted
              </div>

              <button type="submit" className="pay-btn" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <FaSpinner className="spinner" /> Processing...
                  </>
                ) : (
                  <>Pay ₹{amount}</>
                )}
              </button>
            </form>

            {/* Processing Overlay */}
            {isProcessing && (
              <motion.div 
                className="processing-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="processing-content">
                  <Loader />
                  <div className="processing-text">
                    <h3>Processing Subscription</h3>
                    <p>Setting up your {plan?.name} plan...</p>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
