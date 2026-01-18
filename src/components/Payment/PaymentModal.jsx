import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaCreditCard,
  FaMobile,
  FaTruck,
  FaLock,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';
import Loader from '../common/Loader';
import './PaymentModal.css';

const PaymentModal = ({
  isOpen,
  onClose,
  orderData,
  onPaymentSuccess,
  onPaymentFailure
}) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form states
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');

  // Calculate order totals
  const getSubscriptionDiscount = () => {
    const subscription = JSON.parse(localStorage.getItem('userSubscription') || 'null');
    if (!subscription || subscription.status !== 'active') return 0;

    if (subscription.planId === 'basic') return 0.05;
    if (subscription.planId === 'premium') return 0.15;
    if (subscription.planId === 'elite') return 0.25;
    return 0;
  };

  const calculateSubtotal = () => {
    if (orderData.items && Array.isArray(orderData.items)) {
      return orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }
    // Correctly handle lab tests which pass total/originalTotal as base price
    return parseFloat(orderData.originalTotal || orderData.total || 0).toFixed(2);
  };

  const calculateSubscriptionDiscount = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const discountPercent = getSubscriptionDiscount();
    return (subtotal * discountPercent).toFixed(2);
  };

  const getSubscriptionDiscountPercent = () => {
    return (getSubscriptionDiscount() * 100).toFixed(0);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const discount = parseFloat(calculateSubscriptionDiscount());
    const afterDiscount = subtotal - discount;
    return (afterDiscount * 0.05).toFixed(2);
  };

  const calculateDelivery = () => {
    // No delivery charge for lab tests
    if (orderData.orderType === 'lab_test') return 0;

    const subtotal = parseFloat(calculateSubtotal());
    const discount = parseFloat(calculateSubscriptionDiscount());
    const afterDiscount = subtotal - discount;
    return afterDiscount < 300 ? 50 : 0;
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const discount = parseFloat(calculateSubscriptionDiscount());
    const tax = parseFloat(calculateTax());
    const delivery = calculateDelivery();
    return (subtotal - discount + tax + delivery).toFixed(2);
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <div className="payment-icon card-icon">💳</div>,
      description: 'Visa, Mastercard, Rupay accepted'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <div className="payment-icon upi-icon">📱</div>,
      description: 'Pay using UPI ID or QR code'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <div className="payment-icon cod-icon">🚚</div>,
      description: 'Pay when your order arrives'
    }
  ];

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // 16 digits + 3 spaces
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow 3-4 digits
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const validateCardData = () => {
    const { number, expiry, cvv, name } = cardData;

    if (!number || number.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid card number';
    }
    if (!expiry || expiry.length < 5) {
      return 'Please enter a valid expiry date';
    }
    if (!cvv || cvv.length < 3) {
      return 'Please enter a valid CVV';
    }
    if (!name.trim()) {
      return 'Please enter cardholder name';
    }
    return null;
  };

  const validateUPI = () => {
    if (!upiId || !upiId.includes('@')) {
      return 'Please enter a valid UPI ID';
    }
    return null;
  };

  const processPayment = () => {
    setIsProcessing(true);
    setShowError(false);

    // Validate based on payment method
    let validationError = null;
    if (selectedMethod === 'card') {
      validationError = validateCardData();
    } else if (selectedMethod === 'upi') {
      validationError = validateUPI();
    }

    if (validationError) {
      setErrorMessage(validationError);
      setShowError(true);
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing
    setTimeout(async () => {
      // 90% success rate for demo
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        try {
          // Call the success handler and wait for it to finish (this includes backend API calls)
          await onPaymentSuccess({
            method: selectedMethod,
            transactionId: `TXN${Date.now()}`,
            amount: calculateTotal(),
            savings: calculateSubscriptionDiscount(),
            discountPercent: getSubscriptionDiscountPercent(),
            subtotal: calculateSubtotal()
          });

          setIsProcessing(false);
          setShowSuccess(true);

          setTimeout(() => {
            onClose();
          }, 2000);
        } catch (error) {
          console.error('Error in onPaymentSuccess:', error);
          setErrorMessage('Error finalizing booking. Please contact support.');
          setShowError(true);
          setIsProcessing(false);
        }
      } else {
        setErrorMessage('Payment failed. Please try again.');
        setShowError(true);
        setIsProcessing(false);
        if (onPaymentFailure) onPaymentFailure('Payment processing failed');
      }
    }, 3000);
  };

  const renderCardForm = () => (
    <div className="payment-form">
      <div className="form-group">
        <label>Card Number</label>
        <div className="card-input-wrapper">
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardData.number}
            onChange={(e) => handleCardInputChange('number', e.target.value)}
            className="card-input"
          />
          <div className="card-icons">
            <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/24/mastercard.png" alt="Mastercard" />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={cardData.expiry}
            onChange={(e) => handleCardInputChange('expiry', e.target.value)}
            className="card-input"
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            placeholder="123"
            value={cardData.cvv}
            onChange={(e) => handleCardInputChange('cvv', e.target.value)}
            className="card-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={cardData.name}
          onChange={(e) => handleCardInputChange('name', e.target.value)}
          className="card-input"
        />
      </div>
    </div>
  );

  const renderUPIForm = () => (
    <div className="payment-form">
      <div className="form-group">
        <label>UPI ID</label>
        <input
          type="text"
          placeholder="yourname@paytm"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="upi-input"
        />
      </div>

      <div className="upi-apps">
        <div className="upi-app-title">Popular UPI Apps</div>
        <div className="upi-app-grid">
          <div className="upi-app">
            <img src="https://img.icons8.com/color/32/paytm.png" alt="Paytm" />
            <span>Paytm</span>
          </div>
          <div className="upi-app">
            <img src="https://img.icons8.com/color/32/google-pay.png" alt="GPay" />
            <span>Google Pay</span>
          </div>
          <div className="upi-app">
            <img src="https://img.icons8.com/color/32/phonepe.png" alt="PhonePe" />
            <span>PhonePe</span>
          </div>
          <div className="upi-app">
            <img src="https://img.icons8.com/color/32/bhim.png" alt="BHIM" />
            <span>BHIM</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCODInfo = () => (
    <div className="cod-info">
      <div className="cod-icon">
        <FaTruck />
      </div>
      <div className="cod-details">
        <h3>Cash on Delivery</h3>
        <p>Pay ₹{calculateTotal()} when your order arrives at your doorstep.</p>
        <div className="cod-features">
          <div className="cod-feature">
            <FaCheck /> No advance payment required
          </div>
          <div className="cod-feature">
            <FaCheck /> Inspect before payment
          </div>
          <div className="cod-feature">
            <FaCheck /> Available in most locations
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="payment-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="payment-modal"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="payment-header">
            <h2>
              <FaLock /> Secure Payment
            </h2>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="amount">₹{calculateSubtotal()}</span>
              </div>

              {/* Subscription Discount */}
              {parseFloat(calculateSubscriptionDiscount()) > 0 && (
                <div className="summary-row discount-row">
                  <span className="discount-label">
                    👑 Membership Discount ({getSubscriptionDiscountPercent()}%)
                  </span>
                  <span className="amount discount-amount">-₹{calculateSubscriptionDiscount()}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Tax (5%)</span>
                <span className="amount">₹{calculateTax()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span className="amount">{calculateDelivery() > 0 ? `₹${calculateDelivery()}` : 'FREE'}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <span className="amount total-amount">₹{calculateTotal()}</span>
              </div>
            </div>
            {orderData.orderType && (
              <div className="order-type">
                {orderData.orderType === 'pharmacy' ? '💊 Pharmacy Order' : '🧪 Lab Test Booking'}
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h3>Choose Payment Method</h3>
            <div className="method-grid">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod(method.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-info">
                    <div className="method-name">{method.name}</div>
                    <div className="method-desc">{method.description}</div>
                  </div>
                  <div className="method-radio">
                    {selectedMethod === method.id && <FaCheck />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form-container">
            {selectedMethod === 'card' && renderCardForm()}
            {selectedMethod === 'upi' && renderUPIForm()}
            {selectedMethod === 'cod' && renderCODInfo()}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {showError && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FaExclamationTriangle />
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <FaCheck />
                Payment Successful!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="payment-actions">
            <button className="cancel-btn" onClick={onClose} disabled={isProcessing}>
              Cancel
            </button>
            <button
              className={`pay-btn ${isProcessing ? 'processing' : ''}`}
              onClick={processPayment}
              disabled={isProcessing || showSuccess}
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="spinner" />
                  Processing...
                </>
              ) : showSuccess ? (
                <>
                  <FaCheck />
                  Paid
                </>
              ) : (
                `Pay ₹${calculateTotal()}`
              )}
            </button>
          </div>

          {/* Security Info */}
          <div className="security-info">
            <FaLock />
            Your payment information is encrypted and secure
          </div>

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
                  <h3>Processing Payment</h3>
                  <p>Please wait while we securely process your payment...</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
