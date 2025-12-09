import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchData, sortData } from './filterUtils';

const SearchContainer = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #00b38e;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  background: #00b38e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #009975;
  }
`;

const FilterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  background: white;
  cursor: pointer;
`;

const FilterToggle = styled.button`
  background: ${props => props.active ? '#00b38e' : 'transparent'};
  color: ${props => props.active ? 'white' : '#02475B'};
  border: 2px solid #00b38e;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#009975' : '#f0f9f7'};
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
  color: #666;
`;

const QuickFilters = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const QuickFilterChip = styled.button`
  background: ${props => props.active ? '#00b38e' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#009975' : '#e0e0e0'};
  }
`;

const SearchAndFilter = ({ 
  data, 
  onDataChange, 
  searchFields, 
  filterType,
  showFilters,
  onToggleFilters 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [quickFilters, setQuickFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  // Quick filter options based on filter type
  const getQuickFilterOptions = () => {
    if (filterType === 'pharmacy') {
      return ['On Sale', 'New Arrivals', 'Popular', 'Prescription Required'];
    } else {
      return ['Available Today', 'Video Consult', 'Highly Rated', 'Experienced'];
    }
  };

  // Sort options based on filter type
  const getSortOptions = () => {
    if (filterType === 'pharmacy') {
      return [
        { value: '', label: 'Default' },
        { value: 'name', label: 'Name A-Z' },
        { value: 'price', label: 'Price Low to High' },
        { value: 'price_desc', label: 'Price High to Low' },
        { value: 'rating', label: 'Rating' },
        { value: 'popularity', label: 'Popularity' }
      ];
    } else {
      return [
        { value: '', label: 'Default' },
        { value: 'name', label: 'Name A-Z' },
        { value: 'fee', label: 'Fee Low to High' },
        { value: 'fee_desc', label: 'Fee High to Low' },
        { value: 'experience', label: 'Experience' },
        { value: 'rating', label: 'Rating' }
      ];
    }
  };

  useEffect(() => {
    let result = [...data];

    // Apply search
    if (searchTerm) {
      result = searchData(result, searchTerm, searchFields);
    }

    // Apply quick filters
    if (quickFilters.length > 0) {
      result = result.filter(item => {
        return quickFilters.some(filter => {
          switch (filter) {
            case 'On Sale':
              return item.discount > 0 || item.sale;
            case 'New Arrivals':
              return item.isNew || item.newArrival;
            case 'Popular':
              return item.popular || (item.rating && item.rating >= 4);
            case 'Prescription Required':
              return item.prescriptionRequired;
            case 'Available Today':
              return item.availableToday !== false;
            case 'Video Consult':
              return item.videoConsult || item.consultationType === 'Video Call';
            case 'Highly Rated':
              return item.rating && item.rating >= 4.5;
            case 'Experienced':
              return item.experience && item.experience >= 10;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortBy) {
      const [field, order] = sortBy.includes('_desc') 
        ? [sortBy.replace('_desc', ''), 'desc'] 
        : [sortBy, sortOrder];
      result = sortData(result, field, order);
    }

    setFilteredData(result);
    onDataChange(result);
  }, [data, searchTerm, sortBy, sortOrder, quickFilters, searchFields, onDataChange]);

  const handleSearch = () => {
    // Search is handled in useEffect, this is for explicit search button clicks
    const result = searchData(data, searchTerm, searchFields);
    setFilteredData(result);
    onDataChange(result);
  };

  const handleQuickFilter = (filter) => {
    setQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSortBy('');
    setQuickFilters([]);
    setFilteredData(data);
    onDataChange(data);
  };

  return (
    <SearchContainer>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder={`Search ${filterType === 'pharmacy' ? 'medicines, brands and more' : 'doctors, specialities and more'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>
          🔍 Search
        </SearchButton>
      </SearchInputContainer>

      <FilterControls>
        <SortContainer>
          <span style={{ fontSize: '13px', color: '#666' }}>Sort by:</span>
          <SortSelect value={sortBy} onChange={handleSortChange}>
            {getSortOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SortSelect>
        </SortContainer>

        <FilterToggle 
          active={showFilters} 
          onClick={onToggleFilters}
        >
          🔧 Advanced Filters
        </FilterToggle>

        <button 
          onClick={clearAllFilters}
          style={{
            background: 'transparent',
            color: '#ff6b6b',
            border: '1px solid #ff6b6b',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          Clear All
        </button>
      </FilterControls>

      <QuickFilters>
        <span style={{ fontSize: '13px', color: '#666', alignSelf: 'center' }}>Quick filters:</span>
        {getQuickFilterOptions().map(filter => (
          <QuickFilterChip
            key={filter}
            active={quickFilters.includes(filter)}
            onClick={() => handleQuickFilter(filter)}
          >
            {filter}
          </QuickFilterChip>
        ))}
      </QuickFilters>

      <ResultsInfo>
        <span>
          {filteredData.length} {filterType === 'pharmacy' ? 'products' : 'doctors'} found
          {searchTerm && ` for "${searchTerm}"`}
        </span>
        {(searchTerm || quickFilters.length > 0 || sortBy) && (
          <span style={{ fontSize: '12px' }}>
            Filters active: {[
              searchTerm && 'Search',
              quickFilters.length > 0 && `${quickFilters.length} quick filters`,
              sortBy && 'Sorting'
            ].filter(Boolean).join(', ')}
          </span>
        )}
      </ResultsInfo>
    </SearchContainer>
  );
};

export default SearchAndFilter;
