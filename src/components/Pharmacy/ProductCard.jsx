import React, { useState } from 'react';
import { FaStar, FaShoppingCart, FaEye, FaCheck, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Calculate delivery date based on pincode
  const calculateDeliveryDate = (pincodeValue) => {
    if (!pincodeValue || pincodeValue.length !== 6) return '';
    
    const today = new Date();
    let deliveryDays = 2; // Default 2 days
    
    // Metro cities (faster delivery)
    const metroPincodes = ['110', '400', '560', '600', '700', '500', '380', '411', '302', '201'];
    const isMetro = metroPincodes.some(metro => pincodeValue.startsWith(metro));
    
    // Tier 2 cities
    const tier2Pincodes = ['160', '141', '144', '226', '282', '324', '342', '360', '370', '390'];
    const isTier2 = tier2Pincodes.some(tier2 => pincodeValue.startsWith(tier2));
    
    if (isMetro) {
      deliveryDays = 1; // Next day delivery for metro cities
    } else if (isTier2) {
      deliveryDays = 2; // 2 days for tier 2 cities
    } else {
      deliveryDays = 3; // 3-4 days for other areas
    }
    
    // Add extra day for prescription medicines
    if (product.prescription) {
      deliveryDays += 1;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
    
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    
    if (value.length === 6) {
      const calculatedDate = calculateDeliveryDate(value);
      setDeliveryDate(calculatedDate);
    } else {
      setDeliveryDate('');
    }
  };


  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Add to cart clicked for product:', product.name);
    
    try {
      // Get existing cart items
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      console.log('Existing cart:', existingCart);
      
      // Check if product already exists
      const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += 1;
        console.log('Updated existing item quantity');
      } else {
        // Add new item to cart
        const cartItem = {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          quantity: 1,
          packSize: product.packSize,
          mrp: product.originalPrice,
          prescription: product.prescription || product.requiresPrescription,
          deliveryPincode: pincode,
          deliveryDate: deliveryDate
        };
        
        existingCart.push(cartItem);
        console.log('Added new item to cart:', cartItem);
      }
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(existingCart));
      console.log('Cart saved to localStorage');
      
      // Update local state
      setIsInCart(true);
      
      // Trigger cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      alert('Product added to cart successfully!');
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Get existing cart items
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Remove item from cart
      const updatedCart = existingCart.filter(item => item.id !== product.id);
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Update local state
      setIsInCart(false);
      
      // Trigger cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      alert('Product removed from cart!');
      
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart. Please try again.');
    }
  };


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half-filled" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div 
      className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/pharmacy/product/${product.id}`} className="product-link">
        {/* Product Image */}
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x300/f8f9fa/666?text=${encodeURIComponent(product.name.split(' ')[0])}`;
            }}
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="discount-badge">
              -{product.discount}%
            </div>
          )}

          {/* Prescription Badge */}
          {product.prescription && (
            <div className="prescription-badge" title="Prescription Required">
              Rx
            </div>
          )}
          
          {/* Prescription Status Indicator */}
          {product.prescription && (
            <div className="prescription-status">
              {(() => {
                const prescriptionStatus = localStorage.getItem('prescriptionStatus');
                const prescriptionData = prescriptionStatus ? JSON.parse(prescriptionStatus) : null;
                
                if (prescriptionData && prescriptionData.status === 'verified') {
                  const prescribedMedicines = prescriptionData.medicines || [];
                  const isInPrescription = prescribedMedicines.some(med => 
                    med.name.toLowerCase().includes(product.name.toLowerCase().split(' ')[0]) ||
                    product.name.toLowerCase().includes(med.name.toLowerCase())
                  );
                  
                  if (isInPrescription) {
                    return <div className="prescription-verified" title="Prescription Verified">✓</div>;
                  } else {
                    return <div className="prescription-pending" title="Not in Prescription">⚠</div>;
                  }
                } else {
                  return <div className="prescription-required" title="Prescription Required">📋</div>;
                }
              })()
              }
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="quick-actions">
            <button
              className="quick-view-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(`/pharmacy/product/${product.id}`, '_blank');
              }}
              title="Quick View"
            >
              <FaEye />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          {/* Brand */}
          <div className="product-brand">{product.brand}</div>

          {/* Product Name */}
          <h3 className="product-name" title={product.name}>
            {product.name}
          </h3>


          {/* Pack Size */}
          <div className="pack-size">{product.packSize}</div>

          {/* Rating */}
          <div className="rating-container">
            <div className="stars">
              {renderStars(parseFloat(product.rating))}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="price-container">
            <div className="current-price">
              ₹{product.price}
            </div>
            {product.mrp > product.price && (
              <div className="original-price">₹{product.mrp}</div>
            )}
            {product.mrp > product.price && (
              <div className="savings">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Delivery Options */}
          <div className="delivery-section">
            <div className="delivery-header">
              <FaMapMarkerAlt className="delivery-icon" />
              <span>Delivery Options</span>
            </div>
            
            <div className="pincode-input">
              <input
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={handlePincodeChange}
                onFocus={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                maxLength="6"
                className="pincode-field"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            </div>
            
            {deliveryDate && (
              <div className="delivery-info">
                <FaCalendarAlt className="calendar-icon" />
                <span className="delivery-text">
                  Delivery by <strong>{deliveryDate}</strong>
                </span>
              </div>
            )}
            
            {pincode && pincode.length === 6 && !deliveryDate && (
              <div className="delivery-error">
                <span>Service not available in this area</span>
              </div>
            )}
          </div>

          {/* Savings */}
          {product.originalPrice > product.price && (
            <div className="savings">
              Save ₹{product.originalPrice - product.price}
            </div>
          )}
        </div>
      </Link>

      {/* Add to Cart Button - Always visible */}
      <div className="card-actions" style={{ display: 'flex', position: 'relative', zIndex: 10, gap: '8px' }}>
        {(product.inStock !== false) ? (
          <>
            {!isInCart ? (
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                title="Add to cart"
                style={{ display: 'flex', flex: 1 }}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            ) : (
              <>
                <button
                  className="remove-from-cart-btn"
                  onClick={handleRemoveFromCart}
                  title="Remove from cart"
                  style={{ display: 'flex', flex: 1 }}
                >
                  <FaTimes /> Remove
                </button>
                <button
                  className="in-cart-btn"
                  disabled
                  style={{ display: 'flex', flex: 1 }}
                >
                  <FaCheck /> In Cart
                </button>
              </>
            )}
          </>
        ) : (
          <button className="notify-btn" disabled style={{ display: 'flex', width: '100%' }}>
            <FaTimes /> Notify When Available
          </button>
        )}
      </div>

      {/* Prescription Required Badge - Below Add to Cart */}
      {(product.prescription || product.requiresPrescription) && (
        <div className="prescription-badge-bottom">
          <FaExclamationTriangle className="prescription-icon" />
          <span>Prescription Required</span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
