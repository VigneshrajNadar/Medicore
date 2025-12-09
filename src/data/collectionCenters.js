// Collection Centers Database - 500+ Centers Across India
export const collectionCenters = [
  // Maharashtra - Mumbai
  { id: 1, name: 'Apollo Pharmacy - Bandra West', address: 'Shop 12, Hill Road, Bandra West, Mumbai - 400050', phone: '+91 22 2640 5555', hours: '8:00 AM - 10:00 PM', status: 'open', rating: 4.8, type: 'pharmacy', state: 'Maharashtra', city: 'Mumbai', coordinates: { lat: 19.0596, lng: 72.8295 } },
  { id: 2, name: 'Fortis Hospital - Mulund', address: 'Mulund Goregaon Link Road, Mumbai - 400078', phone: '+91 22 6754 4444', hours: '24/7', status: 'open', rating: 4.9, type: 'hospital', state: 'Maharashtra', city: 'Mumbai', coordinates: { lat: 19.1728, lng: 72.9560 } },
  { id: 3, name: 'Lilavati Hospital - Bandra', address: 'A-791, Bandra Reclamation, Mumbai - 400050', phone: '+91 22 2675 1000', hours: '24/7', status: 'open', rating: 4.7, type: 'hospital', state: 'Maharashtra', city: 'Mumbai', coordinates: { lat: 19.0521, lng: 72.8174 } },
  
  // Karnataka - Bangalore
  { id: 4, name: 'Apollo Pharmacy - MG Road', address: 'Shop No. 15, MG Road, Bangalore - 560001', phone: '+91 80 2558 9999', hours: '8:00 AM - 10:00 PM', status: 'open', rating: 4.8, type: 'pharmacy', state: 'Karnataka', city: 'Bangalore', coordinates: { lat: 12.9716, lng: 77.5946 } },
  { id: 5, name: 'Fortis Hospital - Koramangala', address: '14, Cunningham Road, Bangalore - 560052', phone: '+91 80 6621 4444', hours: '24/7', status: 'open', rating: 4.9, type: 'hospital', state: 'Karnataka', city: 'Bangalore', coordinates: { lat: 12.9698, lng: 77.5986 } },
  
  // Delhi
  { id: 6, name: 'AIIMS - New Delhi', address: 'Ansari Nagar, New Delhi - 110029', phone: '+91 11 2658 8500', hours: '24/7', status: 'open', rating: 4.9, type: 'hospital', state: 'Delhi', city: 'New Delhi', coordinates: { lat: 28.5672, lng: 77.2100 } },
  { id: 7, name: 'Apollo Pharmacy - Connaught Place', address: 'Block A, Connaught Place, New Delhi - 110001', phone: '+91 11 2341 5678', hours: '8:00 AM - 11:00 PM', status: 'open', rating: 4.6, type: 'pharmacy', state: 'Delhi', city: 'New Delhi', coordinates: { lat: 28.6315, lng: 77.2167 } },
  
  // Tamil Nadu - Chennai
  { id: 8, name: 'Apollo Hospital - Greams Road', address: '21, Greams Lane, Chennai - 600006', phone: '+91 44 2829 3333', hours: '24/7', status: 'open', rating: 4.8, type: 'hospital', state: 'Tamil Nadu', city: 'Chennai', coordinates: { lat: 13.0569, lng: 80.2426 } },
  { id: 9, name: 'MedPlus Pharmacy - T Nagar', address: '45, Pondy Bazaar, T Nagar, Chennai - 600017', phone: '+91 44 2434 5678', hours: '8:00 AM - 10:00 PM', status: 'open', rating: 4.5, type: 'pharmacy', state: 'Tamil Nadu', city: 'Chennai', coordinates: { lat: 13.0418, lng: 80.2341 } },
  
  // West Bengal - Kolkata
  { id: 10, name: 'AMRI Hospital - Salt Lake', address: 'JC-16 & 17, Salt Lake City, Kolkata - 700098', phone: '+91 33 6606 3800', hours: '24/7', status: 'open', rating: 4.7, type: 'hospital', state: 'West Bengal', city: 'Kolkata', coordinates: { lat: 22.5726, lng: 88.3639 } },
  
  // Rajasthan - Jaipur
  { id: 11, name: 'Fortis Escorts Hospital - Jaipur', address: 'Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur - 302017', phone: '+91 141 254 7000', hours: '24/7', status: 'open', rating: 4.6, type: 'hospital', state: 'Rajasthan', city: 'Jaipur', coordinates: { lat: 26.8467, lng: 75.8048 } },
  
  // Gujarat - Ahmedabad
  { id: 12, name: 'Apollo Pharmacy - SG Highway', address: 'Prahlad Nagar, SG Highway, Ahmedabad - 380015', phone: '+91 79 2970 0000', hours: '8:00 AM - 10:00 PM', status: 'open', rating: 4.4, type: 'pharmacy', state: 'Gujarat', city: 'Ahmedabad', coordinates: { lat: 23.0225, lng: 72.5714 } },
  
  // Telangana - Hyderabad
  { id: 13, name: 'Apollo Hospital - Jubilee Hills', address: 'Road No. 72, Jubilee Hills, Hyderabad - 500033', phone: '+91 40 2360 7777', hours: '24/7', status: 'open', rating: 4.8, type: 'hospital', state: 'Telangana', city: 'Hyderabad', coordinates: { lat: 17.4239, lng: 78.4738 } },
  
  // Uttar Pradesh - Lucknow
  { id: 14, name: 'King George Medical University', address: 'Chowk, Lucknow - 226003', phone: '+91 522 2257 450', hours: '24/7', status: 'open', rating: 4.5, type: 'hospital', state: 'Uttar Pradesh', city: 'Lucknow', coordinates: { lat: 26.8467, lng: 80.9462 } },
  
  // Punjab - Chandigarh
  { id: 15, name: 'PGI - Chandigarh', address: 'Sector 12, Chandigarh - 160012', phone: '+91 172 274 7585', hours: '24/7', status: 'open', rating: 4.7, type: 'hospital', state: 'Punjab', city: 'Chandigarh', coordinates: { lat: 30.7333, lng: 76.7794 } }
];

// Generate additional centers programmatically
const generateCenters = () => {
  const states = [
    'Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'West Bengal', 'Rajasthan', 
    'Gujarat', 'Telangana', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Madhya Pradesh',
    'Bihar', 'Odisha', 'Assam', 'Kerala', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand'
  ];
  
  const cities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    'Delhi': ['New Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh']
  };
  
  let currentId = 16;
  const additionalCenters = [];
  
  states.forEach(state => {
    const stateCities = cities[state] || [state];
    stateCities.forEach(city => {
      // Add 8-12 centers per city for better coverage
      const centerCount = Math.floor(Math.random() * 5) + 8;
      for (let i = 0; i < centerCount; i++) {
        const centerTypes = ['Apollo Pharmacy', 'MedPlus', 'Fortis Hospital', 'Max Hospital', 'Community Health Center', 'Manipal Hospital', 'Narayana Health', 'Care Hospital'];
        const centerType = centerTypes[Math.floor(Math.random() * centerTypes.length)];
        
        additionalCenters.push({
          id: currentId++,
          name: `${centerType} - ${city} ${i + 1}`,
          address: `${Math.floor(Math.random() * 999) + 1}, ${['Main Road', 'MG Road', 'Ring Road', 'Station Road', 'Market Street'][Math.floor(Math.random() * 5)]}, ${city} - ${Math.floor(Math.random() * 900000) + 100000}`,
          phone: `+91 ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
          hours: centerType.includes('Hospital') ? '24/7' : '8:00 AM - 10:00 PM',
          status: 'open',
          rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
          type: centerType.includes('Hospital') ? 'hospital' : 'pharmacy',
          state: state,
          city: city,
          coordinates: {
            lat: Math.round((Math.random() * 10 + 20) * 10000) / 10000,
            lng: Math.round((Math.random() * 20 + 70) * 10000) / 10000
          }
        });
      }
    });
  });
  
  return additionalCenters;
};

export const allCollectionCenters = [...collectionCenters, ...generateCenters()];

export const getStates = () => {
  return [...new Set(allCollectionCenters.map(center => center.state))].sort();
};

export const getCitiesByState = (state) => {
  return [...new Set(allCollectionCenters.filter(center => center.state === state).map(center => center.city))].sort();
};

export const filterCenters = (filters) => {
  return allCollectionCenters.filter(center => {
    const matchesSearch = !filters.search || 
      center.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      center.address.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesState = !filters.state || center.state === filters.state;
    const matchesCity = !filters.city || center.city === filters.city;
    const matchesType = !filters.type || filters.type === 'all' || center.type === filters.type;
    const matchesStatus = !filters.status || filters.status === 'all' || center.status === filters.status;
    
    return matchesSearch && matchesState && matchesCity && matchesType && matchesStatus;
  });
};
