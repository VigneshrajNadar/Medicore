import React, { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = styled.h4`
  color: #02475B;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
`;

const FilterCheckbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const FilterLabel = styled.label`
  font-size: 13px;
  color: #333;
  cursor: pointer;
`;

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriceInput = styled.input`
  width: 80px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
`;

const ClearFiltersBtn = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
  
  &:hover {
    background: #ff5252;
  }
`;

const ApplyFiltersBtn = styled.button`
  background: #00b38e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
  margin-left: 10px;
  
  &:hover {
    background: #009975;
  }
`;

const FilterComponent = ({ filterType, onFiltersChange, data }) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    brands: [],
    ratings: [],
    availability: [],
    specialities: [],
    experience: { min: '', max: '' },
    consultationType: []
  });

  const handleFilterChange = (filterCategory, value, isChecked) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterCategory === 'priceRange' || filterCategory === 'experience') {
        newFilters[filterCategory] = { ...prev[filterCategory], ...value };
      } else {
        if (isChecked) {
          newFilters[filterCategory] = [...prev[filterCategory], value];
        } else {
          newFilters[filterCategory] = prev[filterCategory].filter(item => item !== value);
        }
      }
      
      return newFilters;
    });
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: { min: '', max: '' },
      brands: [],
      ratings: [],
      availability: [],
      specialities: [],
      experience: { min: '', max: '' },
      consultationType: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Get unique values from data for dynamic filter options
  const getUniqueValues = (key) => {
    if (!data || !Array.isArray(data)) return [];
    return [...new Set(data.map(item => item[key]).filter(Boolean))];
  };

  const renderPharmacyFilters = () => (
    <>
      <FilterSection>
        <FilterTitle>Categories</FilterTitle>
        {['Baby Care', 'Health & Nutrition', 'Personal Care', 'Ayurveda', 'Health Devices', 'Home Essentials'].map(category => (
          <FilterOption key={category}>
            <FilterCheckbox
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={(e) => handleFilterChange('categories', category, e.target.checked)}
            />
            <FilterLabel>{category}</FilterLabel>
          </FilterOption>
        ))}
      </FilterSection>

      <FilterSection>
        <FilterTitle>Price Range</FilterTitle>
        <PriceRangeContainer>
          <PriceInput
            type="number"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={(e) => handleFilterChange('priceRange', { min: e.target.value })}
          />
          <span>-</span>
          <PriceInput
            type="number"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={(e) => handleFilterChange('priceRange', { max: e.target.value })}
          />
        </PriceRangeContainer>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Brands</FilterTitle>
        {getUniqueValues('brand').slice(0, 8).map(brand => (
          <FilterOption key={brand}>
            <FilterCheckbox
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={(e) => handleFilterChange('brands', brand, e.target.checked)}
            />
            <FilterLabel>{brand}</FilterLabel>
          </FilterOption>
        ))}
      </FilterSection>

      <FilterSection>
        <FilterTitle>Availability</FilterTitle>
        {['In Stock', 'Out of Stock', 'Limited Stock'].map(status => (
          <FilterOption key={status}>
            <FilterCheckbox
              type="checkbox"
              checked={filters.availability.includes(status)}
              onChange={(e) => handleFilterChange('availability', status, e.target.checked)}
            />
            <FilterLabel>{status}</FilterLabel>
          </FilterOption>
        ))}
      </FilterSection>
    </>
  );

  const renderDoctorFilters = () => (
    <>
      <FilterSection>
        <FilterTitle>Specialities</FilterTitle>
        {getUniqueValues('speciality').slice(0, 8).map(speciality => (
          <FilterOption key={speciality}>
            <FilterCheckbox
              type="checkbox"
              checked={filters.specialities.includes(speciality)}
              onChange={(e) => handleFilterChange('specialities', speciality, e.target.checked)}
            />
            <FilterLabel>{speciality}</FilterLabel>
          </FilterOption>
        ))}
      </FilterSection>

      <FilterSection>
        <FilterTitle>Experience (Years)</FilterTitle>
        <PriceRangeContainer>
          <PriceInput
            type="number"
            placeholder="Min"
            value={filters.experience.min}
            onChange={(e) => handleFilterChange('experience', { min: e.target.value })}
          />
          <span>-</span>
          <PriceInput
            type="number"
            placeholder="Max"
            value={filters.experience.max}
            onChange={(e) => handleFilterChange('experience', { max: e.target.value })}
          />
        </PriceRangeContainer>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Consultation Fee Range</FilterTitle>
        <PriceRangeContainer>
          <PriceInput
            type="number"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={(e) => handleFilterChange('priceRange', { min: e.target.value })}
          />
          <span>-</span>
          <PriceInput
            type="number"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={(e) => handleFilterChange('priceRange', { max: e.target.value })}
          />
        </PriceRangeContainer>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Consultation Type</FilterTitle>
        {['Online', 'In-Person', 'Video Call', 'Audio Call'].map(type => (
          <FilterOption key={type}>
            <FilterCheckbox
              type="checkbox"
              checked={filters.consultationType.includes(type)}
              onChange={(e) => handleFilterChange('consultationType', type, e.target.checked)}
            />
            <FilterLabel>{type}</FilterLabel>
          </FilterOption>
        ))}
      </FilterSection>

      <FilterSection>
        <FilterTitle>Rating</FilterTitle>
        {['4+ Stars', '3+ Stars', '2+ Stars'].map(rating => (
          <FilterOption key={rating}>
            <FilterCheckbox
              type="checkbox"
              checked={filters.ratings.includes(rating)}
              onChange={(e) => handleFilterChange('ratings', rating, e.target.checked)}
            />
            <FilterLabel>{rating}</FilterLabel>
          </FilterOption>
        ))}
      </FilterSection>
    </>
  );

  return (
    <FilterContainer>
      <FilterTitle style={{ fontSize: '16px', marginBottom: '15px' }}>
        🔍 Advanced Filters
      </FilterTitle>
      
      {filterType === 'pharmacy' ? renderPharmacyFilters() : renderDoctorFilters()}
      
      <div>
        <ApplyFiltersBtn onClick={applyFilters}>Apply Filters</ApplyFiltersBtn>
        <ClearFiltersBtn onClick={clearFilters}>Clear All</ClearFiltersBtn>
      </div>
    </FilterContainer>
  );
};

export default FilterComponent;
