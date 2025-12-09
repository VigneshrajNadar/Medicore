// Utility functions for filtering data

export const applyPharmacyFilters = (data, filters) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.filter(item => {
    // Category filter
    if (filters.categories.length > 0) {
      const itemCategory = item.category || item.type || '';
      if (!filters.categories.some(cat => itemCategory.toLowerCase().includes(cat.toLowerCase()))) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      const price = parseFloat(item.price) || parseFloat(item.cost) || 0;
      const min = parseFloat(filters.priceRange.min) || 0;
      const max = parseFloat(filters.priceRange.max) || Infinity;
      if (price < min || price > max) {
        return false;
      }
    }

    // Brand filter
    if (filters.brands.length > 0) {
      const itemBrand = item.brand || item.manufacturer || '';
      if (!filters.brands.includes(itemBrand)) {
        return false;
      }
    }

    // Availability filter
    if (filters.availability.length > 0) {
      const itemAvailability = item.availability || item.stock || 'In Stock';
      if (!filters.availability.includes(itemAvailability)) {
        return false;
      }
    }

    return true;
  });
};

export const applyDoctorFilters = (data, filters) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.filter(doctor => {
    // Speciality filter
    if (filters.specialities.length > 0) {
      const doctorSpeciality = doctor.speciality || doctor.specialty || '';
      if (!filters.specialities.includes(doctorSpeciality)) {
        return false;
      }
    }

    // Experience filter
    if (filters.experience.min || filters.experience.max) {
      const experience = parseFloat(doctor.experience) || 0;
      const min = parseFloat(filters.experience.min) || 0;
      const max = parseFloat(filters.experience.max) || Infinity;
      if (experience < min || experience > max) {
        return false;
      }
    }

    // Fee range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      const fee = parseFloat(doctor.fee) || parseFloat(doctor.consultationFee) || 0;
      const min = parseFloat(filters.priceRange.min) || 0;
      const max = parseFloat(filters.priceRange.max) || Infinity;
      if (fee < min || fee > max) {
        return false;
      }
    }

    // Consultation type filter
    if (filters.consultationType.length > 0) {
      const consultationType = doctor.consultationType || doctor.type || 'Online';
      if (!filters.consultationType.includes(consultationType)) {
        return false;
      }
    }

    // Rating filter
    if (filters.ratings.length > 0) {
      const rating = parseFloat(doctor.rating) || 0;
      const hasMatchingRating = filters.ratings.some(filterRating => {
        if (filterRating === '4+ Stars') return rating >= 4;
        if (filterRating === '3+ Stars') return rating >= 3;
        if (filterRating === '2+ Stars') return rating >= 2;
        return false;
      });
      if (!hasMatchingRating) {
        return false;
      }
    }

    return true;
  });
};

export const sortData = (data, sortBy, sortOrder = 'asc') => {
  if (!data || !Array.isArray(data)) return [];
  
  return [...data].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle different data types
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (typeof aValue === 'number' || !isNaN(aValue)) {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    }
    
    if (sortOrder === 'desc') {
      return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }
  });
};

export const searchData = (data, searchTerm, searchFields = []) => {
  if (!data || !Array.isArray(data) || !searchTerm) return data;
  
  const term = searchTerm.toLowerCase();
  
  return data.filter(item => {
    // If no specific fields provided, search in common fields
    const fieldsToSearch = searchFields.length > 0 ? searchFields : 
      ['name', 'title', 'description', 'brand', 'speciality', 'category'];
    
    return fieldsToSearch.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(term);
    });
  });
};
