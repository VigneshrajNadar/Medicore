import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaArrowLeft, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { pharmacyProducts } from '../../data/comprehensivePharmacyProducts';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('pharmacy_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const foundProduct = pharmacyProducts.find(p => p.id === productId);
    setProduct(foundProduct);
  }, [productId]);

  // Helper functions for cart and wishlist
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };


  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('pharmacy_cart', JSON.stringify(updatedCart));
  };


  if (!product) {
    return (
      <div className="product-details-container">
        <div className="loading">Product not found</div>
      </div>
    );
  }

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
    <div className="product-details-container">
      <div className="product-details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Products
        </button>
      </div>

      <div className="product-details-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name.split(' ')[0])}`;
              }}
            />
            {product.discount > 0 && (
              <div className="discount-badge">-{product.discount}%</div>
            )}
            {product.prescription && (
              <div className="prescription-badge">Rx Required</div>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-subtitle">{product.packSize}</div>

          {/* Rating */}
          <div className="rating-section">
            <div className="stars">
              {renderStars(parseFloat(product.rating))}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="price-section">
            <div className="current-price">₹{product.price}</div>
            {product.mrp > product.price && (
              <>
                <div className="original-price">₹{product.mrp}</div>
                <div className="savings">Save ₹{product.mrp - product.price}</div>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? (
              <>
                <FaCheck /> In Stock
              </>
            ) : (
              <>
                <FaExclamationTriangle /> Out of Stock
              </>
            )}
          </div>

          {/* Quantity and Actions */}
          {product.inStock && (
            <div className="quantity-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart />
                  {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
                
              </div>
            </div>
          )}

          {/* Product Details Tabs */}
          <div className="product-details-tabs">
            <div className="tab-content">
              <div className="detail-section">
                <h3>Product Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Composition:</strong>
                    <span>{product.composition}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Manufacturer:</strong>
                    <span>{product.manufacturer}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Pack Size:</strong>
                    <span>{product.packSize}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Dosage:</strong>
                    <span>{product.dosage}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Expiry Date:</strong>
                    <span>{product.expiryDate}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Batch Number:</strong>
                    <span>{product.batchNumber}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Uses</h3>
                <ul className="uses-list">
                  {product.uses && product.uses.length > 0 ? (
                    product.uses.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))
                  ) : (
                    <li>Consult healthcare provider for usage information</li>
                  )}
                </ul>
              </div>

              <div className="detail-section">
                <h3>Dosage Instructions</h3>
                <p>{product.dosageInstructions || 'Take as prescribed by your healthcare provider'}</p>
              </div>

              <div className="detail-section">
                <h3>Storage Instructions</h3>
                <p>{product.storageInstructions || 'Store in a cool, dry place away from direct sunlight'}</p>
              </div>

              <div className="detail-section warning-section">
                <h3>⚠️ Warnings & Precautions</h3>
                <ul className="warnings-list">
                  {product.warnings && product.warnings.length > 0 ? (
                    product.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))
                  ) : (
                    <li>Keep out of reach of children</li>
                  )}
                </ul>
              </div>

              <div className="detail-section">
                <h3>Side Effects</h3>
                <ul className="side-effects-list">
                  {product.sideEffects && product.sideEffects.length > 0 ? (
                    product.sideEffects.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))
                  ) : (
                    <li>Consult healthcare provider for side effect information</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
