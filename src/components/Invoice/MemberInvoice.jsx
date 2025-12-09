import React from 'react';
import { FaCrown, FaCheck, FaDownload, FaPrint, FaShare } from 'react-icons/fa';
import './MemberInvoice.css';

const MemberInvoice = ({ orderData, membershipData }) => {
  const generateInvoiceNumber = () => {
    return `INV-${Date.now().toString().slice(-8)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const calculateMemberDiscount = () => {
    const subtotal = orderData?.subtotal || 0;
    let discountPercent = 0;
    
    if (membershipData?.planId === 'basic') discountPercent = 5;
    else if (membershipData?.planId === 'premium') discountPercent = 15;
    else if (membershipData?.planId === 'elite') discountPercent = 25;
    
    return {
      percent: discountPercent,
      amount: (subtotal * discountPercent) / 100
    };
  };

  const memberDiscount = calculateMemberDiscount();
  const invoiceNumber = generateInvoiceNumber();
  const currentDate = new Date();

  return (
    <div className="member-invoice">
      <div className="invoice-container">
        {/* Header */}
        <div className="invoice-header">
          <div className="company-info">
            <div className="company-logo">
              <span className="logo-text">MediCore</span>
              <span className="logo-tagline">Your Trusted Healthcare Partner</span>
            </div>
          </div>
          
          <div className="invoice-info">
            <h1 className="invoice-title">INVOICE</h1>
            <div className="invoice-details">
              <p><strong>Invoice #:</strong> {invoiceNumber}</p>
              <p><strong>Date:</strong> {formatDate(currentDate)}</p>
              <p><strong>Due Date:</strong> {formatDate(new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000))}</p>
            </div>
          </div>
        </div>

        {/* Membership Badge */}
        {membershipData && (
          <div className={`membership-badge ${membershipData.planId}`}>
            <FaCrown className="crown-icon" />
            <div className="membership-info">
              <span className="membership-title">
                {membershipData.planId.charAt(0).toUpperCase() + membershipData.planId.slice(1)} Member
              </span>
              <span className="membership-benefits">
                Enjoy {memberDiscount.percent}% discount on all orders
              </span>
            </div>
            <div className="membership-status">
              <FaCheck className="verified-icon" />
              <span>Active</span>
            </div>
          </div>
        )}

        {/* Bill To & Ship To */}
        <div className="invoice-addresses">
          <div className="bill-to">
            <h3>Bill To:</h3>
            <div className="address-details">
              <p><strong>{orderData?.customerName || 'Valued Customer'}</strong></p>
              <p>{orderData?.email || 'customer@example.com'}</p>
              <p>{orderData?.phone || '+91 98765 43210'}</p>
              <p>{orderData?.address || 'Customer Address'}</p>
              <p>{orderData?.city || 'City'}, {orderData?.state || 'State'} - {orderData?.pincode || '000000'}</p>
            </div>
          </div>
          
          <div className="ship-to">
            <h3>Ship To:</h3>
            <div className="address-details">
              <p><strong>{orderData?.deliveryAddress?.name || orderData?.customerName || 'Valued Customer'}</strong></p>
              <p>{orderData?.deliveryAddress?.address || orderData?.address || 'Delivery Address'}</p>
              <p>{orderData?.deliveryAddress?.city || orderData?.city || 'City'}, {orderData?.deliveryAddress?.state || orderData?.state || 'State'}</p>
              <p>PIN: {orderData?.deliveryAddress?.pincode || orderData?.pincode || '000000'}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="invoice-items">
          <table className="items-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Brand</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData?.items?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="item-description">
                      <strong>{item.name}</strong>
                      {item.packSize && <span className="pack-size">{item.packSize}</span>}
                    </div>
                  </td>
                  <td>{item.brand}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">{formatCurrency(item.price)}</td>
                  <td className="text-right">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="invoice-totals">
          <div className="totals-section">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>{formatCurrency(orderData?.subtotal || 0)}</span>
            </div>
            
            {/* Member Discount - Highlighted */}
            {memberDiscount.amount > 0 && (
              <div className="total-row member-discount-row">
                <span className="discount-label">
                  <FaCrown className="discount-crown" />
                  Member Discount ({memberDiscount.percent}%):
                </span>
                <span className="discount-amount">-{formatCurrency(memberDiscount.amount)}</span>
              </div>
            )}
            
            <div className="total-row">
              <span>Tax (GST 5%):</span>
              <span>{formatCurrency(orderData?.tax || 0)}</span>
            </div>
            
            <div className="total-row">
              <span>Delivery Charges:</span>
              <span>
                {orderData?.deliveryCharges > 0 ? formatCurrency(orderData.deliveryCharges) : 'FREE'}
              </span>
            </div>
            
            <div className="total-row grand-total">
              <span>Grand Total:</span>
              <span>{formatCurrency(orderData?.total || 0)}</span>
            </div>
            
            {/* Savings Summary */}
            {memberDiscount.amount > 0 && (
              <div className="savings-summary">
                <div className="savings-badge">
                  <FaCrown />
                  <span>You saved {formatCurrency(memberDiscount.amount)} with your membership!</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Info */}
        <div className="payment-info">
          <h3>Payment Information</h3>
          <div className="payment-details">
            <p><strong>Payment Method:</strong> {orderData?.paymentMethod || 'Online Payment'}</p>
            <p><strong>Transaction ID:</strong> {orderData?.transactionId || 'TXN' + Date.now()}</p>
            <p><strong>Payment Status:</strong> 
              <span className="payment-status paid">
                <FaCheck /> PAID
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <div className="terms">
            <h4>Terms & Conditions:</h4>
            <ul>
              <li>All medicines are subject to availability and prescription verification.</li>
              <li>Member discounts are automatically applied at checkout.</li>
              <li>Free delivery on orders above ₹300 for all members.</li>
              <li>Return policy: 7 days for unopened medicines with valid reason.</li>
            </ul>
          </div>
          
          <div className="contact-info">
            <h4>Contact Us:</h4>
            <p>📞 1800-123-4567 | 📧 support@medicore.com</p>
            <p>🌐 www.medicore.com</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="invoice-actions">
          <button className="action-btn download-btn">
            <FaDownload /> Download PDF
          </button>
          <button className="action-btn print-btn">
            <FaPrint /> Print Invoice
          </button>
          <button className="action-btn share-btn">
            <FaShare /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInvoice;
