import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaDownload,
  FaPrint,
  FaCheck,
  FaCalendarAlt,
  FaCreditCard,
  FaMobile,
  FaTruck
} from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import './InvoiceModal.css';

const InvoiceModal = ({ isOpen, onClose, orderData }) => {
  const { currentUser } = useUser();

  // Helpers for safe values
  const safeNumber = (value) => {
    if (value === null || value === undefined || value === '') return 0;
    // Remove currency symbols if accidentally stored
    const cleanValue = String(value).replace(/[₹,]/g, '');
    const num = parseFloat(cleanValue);
    return isNaN(num) ? 0 : num;
  };

  const safeDate = (dateValue) => {
    if (!dateValue) return new Date();
    const d = new Date(dateValue);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  if (!isOpen || !orderData) return null;

  const orderTotal = safeNumber(orderData.total_amount || orderData.total || orderData.amount);

  const handleDownload = () => {
    // Create a printable version
    const printContent = document.getElementById('invoice-content');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - Order #${orderData.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 20px; }
            .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .invoice-table th { background-color: #f2f2f2; }
            .total-section { text-align: right; margin-top: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrint = () => {
    window.print();
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'card': return <FaCreditCard />;
      case 'upi': return <FaMobile />;
      case 'cod': return <FaTruck />;
      default: return <FaCreditCard />;
    }
  };

  const getPaymentMethodName = (method) => {
    if (!method) return 'Net Banking'; // Most common fallback
    switch (method) {
      case 'card': return 'Credit/Debit Card';
      case 'upi': return 'UPI Payment';
      case 'cod': return 'Cash on Delivery';
      default: return method.toUpperCase();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="invoice-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="invoice-modal"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="invoice-header">
            <div className="invoice-title">
              <h2>Invoice</h2>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
            <div className="invoice-actions">
              <button className="action-btn download-btn" onClick={handleDownload}>
                <FaDownload /> Download
              </button>
              <button className="action-btn print-btn" onClick={handlePrint}>
                <FaPrint /> Print
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div id="invoice-content" className="invoice-content">
            {/* Company Header */}
            <div className="company-header">
              <div className="company-info">
                <h1>MediCore</h1>
                <p>Your Trusted Healthcare Partner</p>
                <div className="company-details">
                  <p>📍 123 Healthcare Street, Medical City, MC 12345</p>
                  <p>📞 +91 98765 43210 | 📧 support@medicore.com</p>
                  <p>🌐 www.medicore.com</p>
                </div>
              </div>
              <div className="invoice-number">
                <h3>Invoice #{orderData._id || orderData.id || `ORD-${String(Date.now()).slice(-6)}`}</h3>
                <p className="invoice-date">
                  <FaCalendarAlt />
                  {safeDate(orderData.created_at || orderData.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="customer-section">
              <div className="bill-to">
                <h4>Bill To:</h4>
                <div className="customer-info">
                  <p><strong>{orderData.patient_name || orderData.patientName || currentUser?.name || 'Valuable Customer'}</strong></p>
                  <p>{orderData.shipping_address || orderData.deliveryAddress || orderData.address || currentUser?.address || 'Address on file'}</p>
                  <p>📱 {orderData.patient_mobile || orderData.mobile || currentUser?.phone || 'Contact not provided'}</p>
                  {currentUser?.email && <p>📧 {currentUser.email}</p>}
                </div>
              </div>
              <div className="order-info">
                <h4>Order Details:</h4>
                <div className="order-meta">
                  <p><strong>Order Type:</strong> {(orderData.order_type === 'pharmacy' || orderData.orderType === 'pharmacy') ? '💊 Pharmacy' : '🧪 Lab Test'}</p>
                  <p><strong>Status:</strong>
                    <span className={`status-badge ${orderData.status || 'confirmed'}`}>
                      <FaCheck /> {orderData.status || 'confirmed'}
                    </span>
                  </p>
                  {(orderData.scheduled_date || orderData.scheduledDate) && (
                    <p><strong>Scheduled Date:</strong> {safeDate(orderData.scheduled_date || orderData.scheduledDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="items-section">
              <h4>Items:</h4>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(orderData.items || []).map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="item-info">
                          <strong>{item.product_name || item.name || 'Healthcare Item'}</strong>
                          {item.brand && <div className="item-brand">{item.brand}</div>}
                        </div>
                      </td>
                      <td>{item.quantity || 1}</td>
                      <td>₹{safeNumber(item.price)}</td>
                      <td>₹{(safeNumber(item.price) * (item.quantity || 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment & Total Section */}
            <div className="payment-total-section">
              <div className="payment-info">
                <h4>Payment Information:</h4>
                <div className="payment-details">
                  <div className="payment-method">
                    {getPaymentIcon(orderData.payment_method || orderData.paymentMethod)}
                    <span>{getPaymentMethodName(orderData.payment_method || orderData.paymentMethod)}</span>
                  </div>
                  {(orderData.transaction_id || orderData.transactionId) && (
                    <div className="transaction-id">
                      <strong>Transaction ID:</strong> {orderData.transaction_id || orderData.transactionId}
                    </div>
                  )}
                  <div className="payment-status">
                    <FaCheck className="success-icon" />
                    Payment Successful
                  </div>
                </div>
              </div>

              <div className="total-section">
                <div className="total-row subtotal">
                  <span>Subtotal:</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>
                {safeNumber(orderData.savings) > 0 && (
                  <div className="total-row savings">
                    <span>Savings:</span>
                    <span>-₹{safeNumber(orderData.savings).toFixed(2)}</span>
                  </div>
                )}
                <div className="total-row delivery">
                  <span>Delivery Charges:</span>
                  <span className="free">FREE</span>
                </div>
                <div className="total-row taxes">
                  <span>Taxes (GST 18%):</span>
                  <span>₹{(orderTotal * 0.18).toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span><strong>Grand Total:</strong></span>
                  <span><strong>₹{(orderTotal * 1.18).toFixed(2)}</strong></span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="invoice-footer">
              <div className="terms">
                <h4>Terms & Conditions:</h4>
                <ul>
                  <li>All medicines are subject to availability and prescription verification</li>
                  <li>Lab test reports will be available within 24-48 hours</li>
                  <li>For any queries, contact our customer support</li>
                  <li>This is a computer-generated invoice and does not require signature</li>
                </ul>
              </div>
              <div className="thank-you">
                <h3>Thank you for choosing MediCore!</h3>
                <p>Your health is our priority. Get well soon! 💙</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InvoiceModal;
