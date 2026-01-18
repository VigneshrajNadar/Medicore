import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft, FaUpload, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import PaymentModal from '../Payment/PaymentModal';
import PrescriptionUpload from '../Pharmacy/PrescriptionUpload';
import SubscriptionBadge from '../Subscription/SubscriptionBadge';
import './ModernCart.css';

const ModernCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [prescriptionStatus, setPrescriptionStatus] = useState({});
  const [prescriptionData, setPrescriptionData] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // Trigger cart update event for navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getSubscriptionDiscount = () => {
    let subscription = currentUser?.subscription;

    // If currentUser.subscription is empty or missing, try fallback
    if (!subscription || Object.keys(subscription).length === 0) {
      subscription = JSON.parse(localStorage.getItem('userSubscription'));
    }

    if (!subscription || subscription.status !== 'active') return 0;
    if (subscription.endDate && new Date(subscription.endDate) < new Date()) return 0;

    // Discount based on plan
    const planId = (subscription.planId || '').toLowerCase();
    if (planId === 'basic') return 0.05; // 5%
    if (planId === 'premium') return 0.15; // 15%
    if (planId === 'elite') return 0.25; // 25%
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subscriptionDiscountPercent = getSubscriptionDiscount();
    const subscriptionDiscount = subtotal * subscriptionDiscountPercent;
    const afterDiscount = subtotal - subscriptionDiscount;
    const tax = afterDiscount * 0.05; // 5% tax
    const deliveryCharges = afterDiscount < 300 ? 50 : 0; // ₹50 delivery charges for orders below ₹300
    return {
      subtotal: subtotal.toFixed(2),
      subscriptionDiscount: subscriptionDiscount.toFixed(2),
      subscriptionDiscountPercent: (subscriptionDiscountPercent * 100).toFixed(0),
      afterDiscount: afterDiscount.toFixed(2),
      tax: tax.toFixed(2),
      deliveryCharges: deliveryCharges.toFixed(2),
      total: (afterDiscount + tax + deliveryCharges).toFixed(2)
    };
  };

  const calculateSavings = () => {
    const mrpSavings = cartItems.reduce((savings, item) => {
      const itemSavings = item.mrp ? (item.mrp - item.price) * item.quantity : 0;
      return savings + itemSavings;
    }, 0);
    const totals = calculateTotal();
    return mrpSavings + parseFloat(totals.subscriptionDiscount || 0);
  };

  const { addOrder, addNotification, currentUser } = useUser();

  // Check if cart has prescription medicines
  const hasPrescriptionMedicines = () => {
    return cartItems.some(item => item.prescription || item.requiresPrescription);
  };

  // Check if all prescription medicines have verified prescriptions
  const allPrescriptionsVerified = () => {
    const prescriptionItems = cartItems.filter(item => item.prescription || item.requiresPrescription);
    return prescriptionItems.every(item => prescriptionStatus[item.id] === 'verified');
  };

  const handleCheckout = () => {
    if (hasPrescriptionMedicines() && !allPrescriptionsVerified()) {
      setShowPrescriptionUpload(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePrescriptionProcessed = (prescriptionData) => {
    setPrescriptionData(prescriptionData);
    setShowPrescriptionUpload(false);

    // Update prescription status for all prescription items
    const updatedStatus = { ...prescriptionStatus };
    cartItems.forEach(item => {
      if (item.prescription || item.requiresPrescription) {
        updatedStatus[item.id] = prescriptionData.status;
      }
    });
    setPrescriptionStatus(updatedStatus);

    // Force re-render to update button text immediately
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const handlePaymentSuccess = async (paymentData) => {
    setIsLoading(true);

    // Create order data
    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      total_amount: totals.total,
      savings: calculateSavings(),
      order_type: 'pharmacy',
      shipping_address: 'Default Address',
      payment_method: paymentData.method,
      transaction_id: paymentData.transactionId,
      status: 'confirmed'
    };

    // Add order to user database
    const order = await addOrder(orderData);

    if (order) {
      // Also save to localStorage for subscription dashboard tracking
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
      const newOrder = {
        id: order.id,
        date: new Date().toISOString(),
        total: totals.total,
        items: cartItems.map(item => item.name),
        status: 'confirmed',
        savings: calculateSavings(),
        orderType: 'pharmacy',
        order_type: 'pharmacy'
      };
      orderHistory.push(newOrder);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

      // Dispatch custom event to notify subscription dashboard
      window.dispatchEvent(new CustomEvent('orderPlaced', {
        detail: { order: newOrder }
      }));

      // Add success notification
      addNotification({
        title: 'Pharmacy Order Placed',
        message: `Your order #${order.id} for ₹${totals.total} has been placed successfully.`,
        type: 'success'
      });

      setIsLoading(false);
      clearCart();

      // Navigate to orders or show success page
      setTimeout(() => {
        navigate('/profile?tab=orders');
      }, 1000);
    } else {
      setIsLoading(false);
      alert('Failed to place order. Please try again.');
    }
  };

  const handlePaymentFailure = (error) => {
    console.error('Payment failed:', error);
    addNotification({
      title: 'Payment Failed',
      message: 'Your payment could not be processed. Please try again.',
      type: 'error'
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="modern-cart-container">
        <div className="cart-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to Pharmacy
          </button>
          <h1>Shopping Cart</h1>
        </div>

        <div className="empty-cart">
          <div className="empty-cart-icon">
            <FaShoppingCart />
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some medicines to get started</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/pharmacy')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotal();

  return (
    <div className="modern-cart-container">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Pharmacy
        </button>
        <h1>Shopping Cart ({cartItems.length} items)</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      {/* Subscription Badge */}
      <div style={{ marginBottom: '20px', maxWidth: '300px' }}>
        <SubscriptionBadge inline={true} />
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={item.id} className="cart-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="item-image">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/100x100?text=${encodeURIComponent(item.name.split(' ')[0])}`;
                  }}
                />
                {(item.prescription || item.requiresPrescription) && (
                  <div className="prescription-badge">Rx</div>
                )}
                {prescriptionStatus[item.id] && (
                  <div className={`prescription-status ${prescriptionStatus[item.id]}`}>
                    {prescriptionStatus[item.id] === 'uploaded' && <FaUpload />}
                    {prescriptionStatus[item.id] === 'verified' && <FaCheck />}
                    {prescriptionStatus[item.id] === 'rejected' && <FaTimes />}
                  </div>
                )}
              </div>

              <div className="item-details">
                <div className="item-brand">{item.brand}</div>
                <h3 className="item-name">{item.name}</h3>
                <div className="item-pack-size">{item.packSize}</div>

                <div className="item-price">
                  <span className="current-price">₹{item.price}</span>
                  {item.mrp && item.mrp > item.price && (
                    <span className="original-price">₹{item.mrp}</span>
                  )}
                </div>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn decrease-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    type="button"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    −
                  </button>
                  <span className="quantity" style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    minWidth: '40px',
                    textAlign: 'center',
                    padding: '0 10px'
                  }}>{item.quantity}</span>
                  <button
                    className="quantity-btn increase-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    type="button"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    +
                  </button>
                </div>

                <div className="item-total" style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#28a745',
                  marginTop: '10px'
                }}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totals.subtotal}</span>
              </div>

              {/* Subscription Discount */}
              {parseFloat(totals.subscriptionDiscount) > 0 && (
                <div className="summary-row discount-row">
                  <span className="discount-label">
                    👑 Membership Discount ({totals.subscriptionDiscountPercent}%)
                  </span>
                  <span className="discount-value">-₹{totals.subscriptionDiscount}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>₹{totals.tax}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charges</span>
                {parseFloat(totals.deliveryCharges) > 0 ? (
                  <span>₹{totals.deliveryCharges}</span>
                ) : (
                  <span className="free">FREE</span>
                )}
              </div>

              {/* Show prescription verification details */}
              {prescriptionData && prescriptionData.status === 'verified' && (
                <div className="prescription-verification-info">
                  <div className="verification-header">
                    <FaCheck className="verified-icon" />
                    <span>Prescription Verified</span>
                  </div>
                  <div className="doctor-details">
                    <p><strong>Prescribed by:</strong> {prescriptionData.doctorInfo?.name || 'Licensed Doctor'}</p>
                    <p><strong>License:</strong> {prescriptionData.doctorInfo?.license || 'N/A'}</p>
                    <p><strong>Hospital:</strong> {prescriptionData.doctorInfo?.hospital || 'N/A'}</p>
                    <p><strong>Verified by:</strong> {prescriptionData.verifyingDoctor ? `${prescriptionData.verifyingDoctor.name} (${prescriptionData.verifyingDoctor.specialty})` : 'Dr. Arjun Mehta (Licensed Doctor)'}</p>
                    <p><strong>Verifier License:</strong> {prescriptionData.verifyingDoctor ? prescriptionData.verifyingDoctor.license : 'MH-67890'}</p>
                    <p><strong>Hospital:</strong> {prescriptionData.verifyingDoctor ? prescriptionData.verifyingDoctor.hospital : 'Apollo Hospital'}</p>
                    <p><strong>Verification Time:</strong> {prescriptionData.verificationTime}</p>
                  </div>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{totals.total}</span>
              </div>
            </div>

            {hasPrescriptionMedicines() && !allPrescriptionsVerified() && (
              <div className="prescription-warning">
                <FaExclamationTriangle />
                <span>Prescription verification required before checkout</span>
              </div>
            )}

            <button
              className={`checkout-btn ${isLoading ? 'loading' : ''} ${hasPrescriptionMedicines() && !allPrescriptionsVerified() ? 'prescription-required' : ''}`}
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Processing...
                </>
              ) : hasPrescriptionMedicines() && !allPrescriptionsVerified() ? (
                'Upload Prescription'
              ) : (
                'Proceed to Payment'
              )}
            </button>

            <div className="delivery-info">
              <p>🚚 Free delivery on orders above ₹300</p>
              <p>💰 ₹50 delivery charges for orders below ₹300</p>
              <p>⚡ Express delivery available in select cities</p>
              <p>📦 Standard delivery: 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Upload Modal */}
      {showPrescriptionUpload && (
        <div className="prescription-modal">
          <div className="prescription-modal-content">
            <div className="prescription-modal-header">
              <h3>Prescription Required</h3>
              <button
                className="close-prescription-modal"
                onClick={() => setShowPrescriptionUpload(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="prescription-items-list">
              <h4>Prescription medicines in your cart:</h4>
              <ul>
                {cartItems
                  .filter(item => item.prescription || item.requiresPrescription)
                  .map(item => (
                    <li key={item.id}>
                      <span>{item.name}</span>
                      <span className={`status ${prescriptionStatus[item.id] || 'pending'}`}>
                        {prescriptionStatus[item.id] === 'uploaded' && '📤 Uploaded'}
                        {prescriptionStatus[item.id] === 'verified' && '✅ Verified'}
                        {prescriptionStatus[item.id] === 'rejected' && '❌ Rejected'}
                        {!prescriptionStatus[item.id] && '⏳ Pending'}
                      </span>
                    </li>
                  ))
                }
              </ul>
            </div>
            <PrescriptionUpload onPrescriptionProcessed={handlePrescriptionProcessed} />
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderData={{
          total: totals.total,
          orderType: 'pharmacy',
          items: cartItems,
          prescriptionData: prescriptionData
        }}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailure={handlePaymentFailure}
      />
    </div>
  );
};

export default ModernCart;
