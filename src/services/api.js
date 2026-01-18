// Use relative URL for production (Vercel), localhost for development
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'  // Vercel production - relative URL
  : 'http://localhost:5001/api';  // Local development

// User Management
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: Failed to create user`);
    }

    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Doctor Management
export const getDoctors = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/doctors?${queryParams}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const getDoctorById = async (doctorId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctor:', error);
    throw error;
  }
};

export const getDoctorAvailableSlots = async (doctorId, date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}/available-slots?date=${date}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
};

export const getSpecializations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/specializations`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching specializations:', error);
    throw error;
  }
};

export const getCities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cities`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const getHospitals = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hospitals`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw error;
  }
};

// Appointment Management
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: Failed to book appointment`);
    }

    return data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

export const getUserAppointments = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/appointments`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      // If API fails, return mock data for demonstration
      return [
        {
          id: 'APT001',
          doctor_name: 'Dr. Rajesh Kumar',
          specialization: 'Cardiologist',
          appointment_date: '2024-01-15',
          appointment_time: '10:00 AM',
          appointment_status: 'Confirmed',
          total_amount: 1500,
          consultation_fee: 1500,
          payment_status: 'Paid',
          hospital_name: 'Apollo Hospital',
          consultation_type: 'In-person'
        },
        {
          id: 'APT002',
          doctor_name: 'Dr. Priya Sharma',
          specialization: 'Dermatologist',
          appointment_date: '2024-01-20',
          appointment_time: '2:30 PM',
          appointment_status: 'Pending',
          total_amount: 800,
          consultation_fee: 800,
          payment_status: 'Pending',
          hospital_name: 'Max Healthcare',
          consultation_type: 'Video Call'
        },
        {
          id: 'APT003',
          doctor_name: 'Dr. Amit Patel',
          specialization: 'Orthopedic',
          appointment_date: '2024-01-10',
          appointment_time: '11:15 AM',
          appointment_status: 'Completed',
          total_amount: 1200,
          consultation_fee: 1200,
          payment_status: 'Paid',
          hospital_name: 'Fortis Hospital',
          consultation_type: 'In-person'
        }
      ];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    // Return mock data as fallback
    return [
      {
        id: 'APT001',
        doctor_name: 'Dr. Rajesh Kumar',
        specialization: 'Cardiologist',
        appointment_date: '2024-01-15',
        appointment_time: '10:00 AM',
        appointment_status: 'Confirmed',
        total_amount: 500,
        payment_status: 'Paid',
        hospital_name: 'Apollo Hospital',
        consultation_type: 'In-person'
      },
      {
        id: 'APT002',
        doctor_name: 'Dr. Priya Sharma',
        specialization: 'Dermatologist',
        appointment_date: '2024-01-20',
        appointment_time: '2:30 PM',
        appointment_status: 'Pending',
        total_amount: 400,
        payment_status: 'Pending',
        hospital_name: 'Max Healthcare',
        consultation_type: 'Video Call'
      }
    ];
  }
};

export const updateAppointment = async (appointmentId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};

// Doctor Reviews
export const addDoctorReview = async (doctorId, reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Order Management
export const getOrders = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      // Return mock orders data if API fails
      return [
        {
          orderId: 'ORD001',
          date: '2024-01-12',
          status: 'Delivered',
          total: 450,
          payment: 'Credit Card',
          items: ['Paracetamol 500mg', 'Vitamin D3']
        },
        {
          orderId: 'ORD002',
          date: '2024-01-10',
          status: 'Shipped',
          total: 320,
          payment: 'UPI',
          items: ['Crocin Advance', 'Calcium Tablets']
        },
        {
          orderId: 'ORD003',
          date: '2024-01-08',
          status: 'Processing',
          total: 180,
          payment: 'Cash on Delivery',
          items: ['Hand Sanitizer', 'Face Mask']
        }
      ];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return mock orders data as fallback
    return [
      {
        orderId: 'ORD001',
        date: '2024-01-12',
        status: 'Delivered',
        total: 450,
        payment: 'Credit Card',
        items: ['Paracetamol 500mg', 'Vitamin D3']
      },
      {
        orderId: 'ORD002',
        date: '2024-01-10',
        status: 'Shipped',
        total: 320,
        payment: 'UPI',
        items: ['Crocin Advance', 'Calcium Tablets']
      }
    ];
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Profile Management
export const getProfile = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile?userId=${userId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      // Return mock profile data if API fails
      return {
        name: 'Vignesh Raj',
        email: 'vignesh@example.com',
        phone: '+91 98765 43210',
        address: 'Chennai, Tamil Nadu',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
        emergencyContact: '+91 98765 43211'
      };
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    // Return mock profile data as fallback
    return {
      name: 'Vignesh Raj',
      email: 'vignesh@example.com',
      phone: '+91 98765 43210',
      address: 'Chennai, Tamil Nadu',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      emergencyContact: '+91 98765 43211'
    };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      // Simulate successful update for demo purposes
      return { success: true, message: 'Profile updated successfully' };
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    // Return success for demo purposes
    return { success: true, message: 'Profile updated successfully' };
  }
};

// Lab Tests
export const getLabTests = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/${userId}/lab-tests`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch lab tests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    throw error;
  }
};

export const bookLabTest = async (labTestData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/lab-tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(labTestData)
    });
    if (!response.ok) throw new Error('Failed to book lab test');
    return await response.json();
  } catch (error) {
    console.error('Error booking lab test:', error);
    throw error;
  }
};

export default {
  getUsers,
  createUser,
  getDoctors,
  getDoctorById,
  getDoctorAvailableSlots,
  getSpecializations,
  getCities,
  getHospitals,
  bookAppointment,
  getUserAppointments,
  updateAppointment,
  cancelAppointment,
  addDoctorReview,
  getOrders,
  createOrder,
  getProfile,
  updateProfile,
  login,
  getLabTests,
  bookLabTest,
};
