import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import './PharmacySearch.css';

const PharmacySearch = ({ 
  onSearch, 
  onFilterChange, 
  categories, 
  brands, 
  showFilters, 
  onToggleFilters 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    prescription: '',
    inStock: false,
    discount: 0
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Popular search terms
  const popularSearches = [
    'Paracetamol', 'Vitamin D3', 'Face Wash', 'Baby Lotion', 'Ashwagandha',
    'Multivitamin', 'Hand Sanitizer', 'Protein Powder', 'Diabetes Care',
    'Blood Pressure Monitor', 'Thermometer', 'Omega 3', 'Calcium Tablets'
  ];

  useEffect(() => {
    if (searchTerm.length > 2) {
      // Simulate search suggestions
      const filtered = popularSearches.filter(term =>
        term.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (term = searchTerm) => {
    onSearch(term, filters);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      subcategory: '',
      brand: '',
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      prescription: '',
      inStock: false,
      discount: 0
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="pharmacy-search-container">
      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for medicines, wellness products, personal care..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="search-input"
          />
          <button 
            className="filter-toggle-btn"
            onClick={onToggleFilters}
          >
            <FaFilter />
            Filters
          </button>
        </div>
        
        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => {
                  setSearchTerm(suggestion);
                  handleSearch(suggestion);
                }}
              >
                <FaSearch className="suggestion-icon" />
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Searches */}
      <div className="popular-searches">
        <span className="popular-label">Popular:</span>
        {popularSearches.slice(0, 6).map((term, index) => (
          <button
            key={index}
            className="popular-search-tag"
            onClick={() => {
              setSearchTerm(term);
              handleSearch(term);
            }}
          >
            {term}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="advanced-filters">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          <div className="filters-grid">
            {/* Category Filter */}
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {Object.values(categories).map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <label>Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.slice(0, 20).map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    min: parseInt(e.target.value) || 0
                  })}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    max: parseInt(e.target.value) || 5000
                  })}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>

            {/* Prescription Filter */}
            <div className="filter-group">
              <label>Prescription</label>
              <select
                value={filters.prescription}
                onChange={(e) => handleFilterChange('prescription', e.target.value)}
              >
                <option value="">All Products</option>
                <option value="true">Prescription Required</option>
                <option value="false">No Prescription</option>
              </select>
            </div>

            {/* Discount Filter */}
            <div className="filter-group">
              <label>Minimum Discount</label>
              <select
                value={filters.discount}
                onChange={(e) => handleFilterChange('discount', parseInt(e.target.value))}
              >
                <option value={0}>Any Discount</option>
                <option value={10}>10% or more</option>
                <option value={20}>20% or more</option>
                <option value={30}>30% or more</option>
                <option value={50}>50% or more</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="quick-filters">
            <button
              className={`quick-filter ${filters.inStock ? 'active' : ''}`}
              onClick={() => handleFilterChange('inStock', !filters.inStock)}
            >
              In Stock Only
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacySearch;
