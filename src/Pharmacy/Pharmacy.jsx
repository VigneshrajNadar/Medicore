import React, { useEffect, useState, useMemo } from "react";
import Slider from "../Slider/Slider";
import "./Pharmacy.css";
import "./PharmacyStyles.css";
import { Link } from "react-router-dom";
import Footer from "../Core/footer/Footer";
import { 
  pharmacyProducts, 
  pharmacyCategories, 
  brands, 
  featuredProducts, 
  topDeals 
} from "../data/comprehensivePharmacyProducts";
import PharmacySearch from "../components/Pharmacy/PharmacySearch";
import ProductCard from "../components/Pharmacy/ProductCard";
import PrescriptionUpload from "../components/Pharmacy/PrescriptionUpload";
import SymptomSearch from "../components/Pharmacy/SymptomSearch";
import PharmacistChat from "../components/Pharmacy/PharmacistChat";
import HealthBlogs from "../components/Pharmacy/HealthBlogs";
import PopulationHealthInsights from "../components/Pharmacy/PopulationHealthInsights";
import CommunityHealthTrends from "../components/Pharmacy/CommunityHealthTrends";
import DiseaseOutbreakAlerts from "../components/Pharmacy/DiseaseOutbreakAlerts";
import SeasonalHealthRecommendations from "../components/Pharmacy/SeasonalHealthRecommendations";
import { FaShoppingCart, FaTh, FaList, FaSearch, FaComments, FaBookMedical, FaChartBar, FaVirus, FaCalendarAlt } from "react-icons/fa";

const Pharmacy = () => {
  const [filteredProducts, setFilteredProducts] = useState(pharmacyProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    prescription: '',
    inStock: false,
    discount: 0
  });
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'blogs'
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [activeFeature, setActiveFeature] = useState('products');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Save cart to localStorage and update cart count
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Trigger cart update event for navbar
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(updatedCart);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);


  // Filter and search products
  const applyFiltersAndSearch = useMemo(() => {
    let filtered = [...pharmacyProducts];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (currentFilters.category) {
      filtered = filtered.filter(product => product.category === currentFilters.category);
    }

    if (currentFilters.brand) {
      filtered = filtered.filter(product => product.brand === currentFilters.brand);
    }

    if (currentFilters.priceRange.min > 0 || currentFilters.priceRange.max < 5000) {
      filtered = filtered.filter(product => 
        product.price >= currentFilters.priceRange.min && 
        product.price <= currentFilters.priceRange.max
      );
    }

    if (currentFilters.rating > 0) {
      filtered = filtered.filter(product => parseFloat(product.rating) >= currentFilters.rating);
    }

    if (currentFilters.prescription !== '') {
      const requiresPrescription = currentFilters.prescription === 'true';
      filtered = filtered.filter(product => product.prescription === requiresPrescription);
    }

    if (currentFilters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    if (currentFilters.discount > 0) {
      filtered = filtered.filter(product => product.discount >= currentFilters.discount);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [searchTerm, currentFilters, sortBy]);

  useEffect(() => {
    setFilteredProducts(applyFiltersAndSearch);
    setCurrentPage(1);
  }, [applyFiltersAndSearch]);

  // Handle search
  const handleSearch = (term, filters) => {
    setSearchTerm(term);
    if (filters) {
      setCurrentFilters(filters);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  // Add to cart
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };


  // Check if product is in cart
  const isInCart = (productId) => cart.some(item => item.id === productId);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pharmacy-page">
      {/* Header Navigation */}
      <div className="pharmacy-header">
        <div className="feature-nav">
          <button
            className={`feature-nav-btn ${activeFeature === 'products' ? 'active' : ''}`}
            onClick={() => setActiveFeature('products')}
          >
            <FaShoppingCart /> Products
          </button>
          <button
            className={`feature-nav-btn ${activeFeature === 'symptoms' ? 'active' : ''}`}
            onClick={() => setActiveFeature('symptoms')}
          >
            <FaSearch /> Search by Symptoms
          </button>
          <button
            className={`feature-nav-btn ${activeFeature === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveFeature('blogs')}
          >
            <FaBookMedical /> Health Blogs
          </button>

          {/* Health Analytics Section */}
          <div className="health-analytics-nav">
            <span className="nav-section-title">📊 Health Analytics</span>
            <div className="analytics-buttons">
              <button
                className={`feature-nav-btn small ${activeFeature === 'population-insights' ? 'active' : ''}`}
                onClick={() => setActiveFeature('population-insights')}
              >
                <FaChartBar /> Population
              </button>
              <button
                className={`feature-nav-btn small ${activeFeature === 'community-trends' ? 'active' : ''}`}
                onClick={() => setActiveFeature('community-trends')}
              >
                <FaChartBar /> Trends
              </button>
              <button
                className={`feature-nav-btn small ${activeFeature === 'disease-alerts' ? 'active' : ''}`}
                onClick={() => setActiveFeature('disease-alerts')}
              >
                <FaVirus /> Alerts
              </button>
              <button
                className={`feature-nav-btn small ${activeFeature === 'seasonal-recommendations' ? 'active' : ''}`}
                onClick={() => setActiveFeature('seasonal-recommendations')}
              >
                <FaCalendarAlt /> Seasonal
              </button>
            </div>
          </div>

          <button
            className={`feature-nav-btn ${isChatOpen ? 'active' : ''}`}
            onClick={() => setIsChatOpen(true)}
          >
            <FaComments /> Pharmacist Chat
          </button>
        </div>
        
        {activeFeature === 'products' && (
          <div className="category-nav">
            {Object.values(pharmacyCategories).map(category => (
              <button
                key={category.id}
                className={`category-nav-btn ${currentFilters.category === category.id ? 'active' : ''}`}
                onClick={() => handleFilterChange({ ...currentFilters, category: category.id })}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pharmacy-container">
        {activeFeature === 'products' && <Slider />}
        
        {/* Feature Content */}
        {activeFeature === 'symptoms' && <SymptomSearch />}
        {activeFeature === 'blogs' && <HealthBlogs />}
        {activeFeature === 'population-insights' && <PopulationHealthInsights />}
        {activeFeature === 'community-trends' && <CommunityHealthTrends />}
        {activeFeature === 'disease-alerts' && <DiseaseOutbreakAlerts />}
        {activeFeature === 'seasonal-recommendations' && <SeasonalHealthRecommendations />}
        
        {activeFeature === 'products' && (
          <>
            {/* Categories Section */}
            <section className="categories-section">
              <h2>Shop by Category</h2>
              <div className="categories-grid">
                {Object.values(pharmacyCategories).map(category => (
                  <div 
                    key={category.id} 
                    className="category-card"
                    onClick={() => handleFilterChange({ ...currentFilters, category: category.id })}
                  >
                    <div className="category-icon">{category.icon}</div>
                    <h3>{category.name}</h3>
                    <p>{category.subcategories.length} subcategories</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Search and Filters */}
            <PharmacySearch
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={pharmacyCategories}
              brands={brands}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
            />

            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <h2>Products ({filteredProducts.length.toLocaleString()})</h2>
                {searchTerm && <p>Results for "{searchTerm}"</p>}
              </div>
              
              <div className="results-controls">
                <div className="sort-controls">
                  <label>Sort by:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="relevance">Relevance</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Highest Discount</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </div>
                
                <div className="view-controls">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <FaTh />
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <section className="products-section">
              <div className={`products-grid ${viewMode}`}>
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(product.id)}
                  />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              )}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                  if (page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page ? 'active' : ''}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}

            {/* Top Deals Section */}
            <section className="top-deals-section">
              <h2>🔥 Top Deals</h2>
              <div className="deals-grid">
                {topDeals.slice(0, 8).map(product => (
                  <ProductCard
                    key={`deal-${product.id}`}
                    product={product}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(product.id)}
                  />
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
              <h2>⭐ Featured Products</h2>
              <div className="featured-grid">
                {featuredProducts.slice(0, 12).map(product => (
                  <ProductCard
                    key={`featured-${product.id}`}
                    product={product}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(product.id)}
                  />
                ))}
              </div>
            </section>

            {/* Popular Brands */}
            <section className="brands-section">
              <h2>🏷️ Popular Brands</h2>
              <div className="brands-grid">
                {brands.slice(0, 12).map((brand, index) => (
                  <div 
                    key={brand.name} 
                    className="brand-card"
                    onClick={() => handleFilterChange({ ...currentFilters, brand: brand.name })}
                  >
                    <div className="brand-logo">
                      <img
                        src={brand.logo}
                        alt={`${brand.name} Brand`}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/120x60?text=${encodeURIComponent(brand.name.split(' ')[0])}`;
                        }}
                      />
                    </div>
                    <h4>{brand.name}</h4>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="cart-summary-section">
            <div className="cart-summary">
              <FaShoppingCart />
              <span>{cart.length} items in cart</span>
            </div>
          </div>
        )}

        {/* Pharmacist Chat Modal */}
        <PharmacistChat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
        />

        {/* Info Section */}
        <section className="info-section">
          <h4>EFFORTLESS ONLINE MEDICINE ORDERS AT MEDICORE PHARMACY</h4>
          <p>
            Because ordering medicines online need not be complicated but rather a
            cakewalk. And at MediCore Pharmacy we ensure that. All you need to do
            is: Browse through our wide variety of products Add products to your
            cart and complete the payment. Voila! Your order will be on its way
            to you. MediCore Pharmacy is your go-to online pharmacy store for all
            your medicine needs – be it your regular medications, or
            over-the-counter (OTC) medicines.
          </p>
          <h4>Reasons To Buy Medicine From MediCore Pharmacy</h4>
          <p>
            For over 15 years, MediCore Pharmacy has been providing you with
            genuine medicines round-the-clock, through 24-hour pharmacies. And
            now through MediCore Pharmacy, we intend to make your lives easier –
            by getting your medicines delivered to you. Super-fast deliveries in
            select cities, deliveries are done in as less as 1 day. Trusted
            pharmacy chain with over 2,000 stores across India.
          </p>
          <h4>Why Choose MediCore Pharmacy</h4>
          <p>
            MediCore Pharmacy is committed to providing authentic medicines and healthcare
            products at affordable prices. With our user-friendly platform and reliable
            delivery service, we make healthcare accessible to everyone. Experience the
            convenience of online medicine shopping with MediCore – your health, our priority.
          </p>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pharmacy;
