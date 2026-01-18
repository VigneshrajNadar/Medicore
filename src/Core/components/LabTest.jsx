import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaUser, FaCheck, FaTimes, FaDownload, FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import api from '../../services/api';
import PaymentModal from '../../components/Payment/PaymentModal';
import SubscriptionBadge from '../../components/Subscription/SubscriptionBadge';
import './LabTest.css';
import styled from 'styled-components';
import { labTestDatabase, categories as testCategories, priceRanges, fastingOptions, durationOptions } from '../../data/labTestDatabase';

const ADMIN_PASSWORD = 'admin123'; // Simple password for demo

// Filter and Search Components
const FilterSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e3e3e3;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #02475b;
  font-weight: 500;
  
  &:focus {
    border-color: #0087ba;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 135, 186, 0.1);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e3e3e3;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 16px;
  
  &:focus {
    border-color: #0087ba;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 135, 186, 0.1);
  }
`;

const ResultsCount = styled.div`
  text-align: center;
  color: #0087ba;
  font-weight: 600;
  margin-bottom: 24px;
  font-size: 1.1rem;
`;

const PageContainer = styled.div`
  padding: 48px 16px 32px 16px;
  background: linear-gradient(120deg, #f8fafc 60%, #e3f0ff 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 64px;
  padding: 32px 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  margin: 0 auto 64px auto;
`;

const HeroTitle = styled.h1`
  color: #02475b;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #02475b, #0087ba);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  color: #0087ba;
  font-size: 1.2rem;
  margin-bottom: 24px;
  font-weight: 500;
`;

const HeroFeatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-top: 24px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #02475b;
  font-weight: 600;
  font-size: 1rem;
`;

const Title = styled.h1`
  color: #02475b;
  text-align: center;
  margin-bottom: 48px;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #02475b, #0087ba);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CategorySection = styled.section`
  margin-bottom: 48px;
`;

const CategoryTitle = styled.h2`
  color: #02475b;
  font-size: 1.8rem;
  margin-bottom: 32px;
  text-align: center;
  font-weight: 700;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #0087ba, #24c6dc);
    border-radius: 2px;
  }
`;

const TestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
`;

const TestCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 135, 186, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0087ba, #24c6dc);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(0, 135, 186, 0.2);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const TestIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(0, 135, 186, 0.1), rgba(36, 198, 220, 0.1));
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const TestName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #02475b;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.3;
`;

const TestDesc = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.5;
  flex-grow: 1;
`;

const TestPrice = styled.div`
  font-size: 1.3rem;
  color: #0087ba;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #0087ba, #24c6dc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BookButton = styled.button`
  background: linear-gradient(135deg, #02475b, #0087ba);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(2, 71, 91, 0.3);
  }
`;

const TestMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 8px 0;
`;

const MetaItem = styled.span`
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 32px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 135, 186, 0.1);
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 12px;
`;

const FeatureTitle = styled.h3`
  color: #02475b;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const FeatureDesc = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 40px 32px;
  min-width: 400px;
  max-width: 90vw;
  box-shadow: 0 12px 48px rgba(0,0,0,0.2);
  position: relative;
  border: 1px solid rgba(0, 135, 186, 0.1);
`;
const ModalTitle = styled.h2`
  color: #02475b;
  margin-bottom: 16px;
`;
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ModalInput = styled.input`
  padding: 10px 12px;
  border: 1.5px solid #e3e3e3;
  border-radius: 7px;
  font-size: 1rem;
  &:focus {
    border: 1.5px solid #0087ba;
    outline: none;
    box-shadow: 0 0 0 2px #e3f0ff;
  }
`;
const ModalButton = styled.button`
  background: linear-gradient(90deg, #0087ba 0%, #24c6dc 100%);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #24c6dc 0%, #0087ba 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;
const SuccessMsg = styled.div`
  color: #008060;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 16px;
`;

const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 32px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
`;
const AdminTh = styled.th`
  background: #0087ba;
  color: #fff;
  padding: 12px;
  font-weight: 700;
`;
const AdminTd = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid #e3e3e3;
  text-align: center;
  cursor: pointer;
`;
const AdminTr = styled.tr``;
const AdminTitle = styled.h2`
  color: #02475b;
  text-align: center;
  margin: 32px 0 16px 0;
`;
const ClearBtn = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin: 16px 8px 32px 8px;
  display: inline-block;
  transition: background 0.2s;
  &:hover { background: #c0392b; }
`;
const ExportBtn = styled.button`
  background: #0087ba;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin: 16px 8px 32px 8px;
  display: inline-block;
  transition: background 0.2s;
  &:hover { background: #02475b; }
`;
const StatusSelect = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e3e3e3;
  font-size: 1rem;
  background: #f8fafc;
`;
const SearchBar = styled.input`
  width: 300px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px solid #e3e3e3;
  font-size: 1rem;
  margin: 0 auto 24px auto;
  display: block;
  &:focus { border: 1.5px solid #0087ba; outline: none; }
`;
const DetailsModal = styled(ModalContent)`
  min-width: 340px;
`;
const DetailsRow = styled.div`
  margin-bottom: 10px;
  font-size: 1.05rem;
`;
const DetailsLabel = styled.span`
  color: #888;
  font-weight: 600;
  margin-right: 8px;
`;
const AuthModal = styled(ModalOverlay)`
  z-index: 2000;
`;
const AuthBox = styled(ModalContent)`
  min-width: 320px;
  text-align: center;
`;
const AuthInput = styled.input`
  padding: 10px 12px;
  border: 1.5px solid #e3e3e3;
  border-radius: 7px;
  font-size: 1rem;
  margin-bottom: 16px;
  width: 100%;
`;
const AuthBtn = styled(ModalButton)`
  width: 100%;
`;
const AuthError = styled.div`
  color: #e74c3c;
  margin-bottom: 10px;
`;

const LabTest = () => {
  const { currentUser, addHealthRecord, addNotification, addOrder } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [form, setForm] = useState({ name: '', mobile: '', address: '', date: '' });
  const [success, setSuccess] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [detailsBooking, setDetailsBooking] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    category: 'All Tests',
    priceRange: { min: 0, max: 10000 },
    fasting: 'all',
    duration: 'all'
  });

  // Filtered tests using useMemo for performance
  const filteredTests = useMemo(() => {
    let filtered = labTestDatabase;

    // Search filter
    if (search.trim()) {
      filtered = filtered.filter(test =>
        test.name.toLowerCase().includes(search.toLowerCase()) ||
        test.desc.toLowerCase().includes(search.toLowerCase()) ||
        test.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All Tests') {
      filtered = filtered.filter(test => test.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter(test =>
      test.price >= filters.priceRange.min && test.price <= filters.priceRange.max
    );

    // Fasting filter
    if (filters.fasting === 'fasting') {
      filtered = filtered.filter(test => test.fasting === true);
    } else if (filters.fasting === 'non-fasting') {
      filtered = filtered.filter(test => test.fasting === false);
    }

    // Duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(test => test.duration === filters.duration);
    }

    return filtered;
  }, [search, filters]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get('admin') === '1');
    if (params.get('admin') === '1') {
      const stored = JSON.parse(localStorage.getItem('labBookings') || '[]');
      setBookings(stored);
    }
  }, []);

  // Admin authentication
  useEffect(() => {
    if (isAdmin && !adminAuth) {
      setTimeout(() => setAdminAuth(false), 0);
    }
  }, [isAdmin, adminAuth]);

  const handleBookTest = (test) => {
    setSelectedTest(test);
    setModalOpen(true);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All Tests',
      priceRange: { min: 0, max: 10000 },
      fasting: 'all',
      duration: 'all'
    });
    setSearch('');
  };

  const getSubscriptionDiscount = () => {
    let subscription = currentUser?.subscription;

    // If currentUser.subscription is empty or missing, try fallback
    if (!subscription || Object.keys(subscription).length === 0) {
      subscription = JSON.parse(localStorage.getItem('userSubscription'));
    }

    if (!subscription || subscription.status !== 'active') return 0;
    if (subscription.endDate && new Date(subscription.endDate) < new Date()) return 0;

    // Discount based on plan
    const planId = (subscription.planId || '').toLowerCase();
    if (planId === 'basic') return 0.05; // 5%
    if (planId === 'premium') return 0.15; // 15%
    if (planId === 'elite') return 0.25; // 25%
    return 0;
  };

  const calculateDiscountedPrice = (price) => {
    const discount = getSubscriptionDiscount();
    return Math.floor(price * (1 - discount));
  };

  const openModal = (test) => {
    setSelectedTest(test);
    setModalOpen(true);
    setForm({ name: '', mobile: '', address: '', date: '' });
    setSuccess(false);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedTest(null);
    setSuccess(false);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please login to book lab tests');
      return;
    }

    const booking = {
      test: selectedTest?.name,
      name: form.name,
      mobile: form.mobile,
      address: form.address,
      date: form.date,
      time: new Date().toLocaleString(),
      status: 'pending',
    };

    // Store booking data for payment
    setPendingBooking(booking);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    if (!pendingBooking) return;

    try {
      const userId = currentUser?.id || currentUser?._id;

      // 1. Prepare Lab Test Data for MongoDB
      const finalPrice = calculateDiscountedPrice(selectedTest?.price || 0);
      const labTestData = {
        user_id: userId,
        test_id: selectedTest?.id || Date.now(),
        test_name: selectedTest?.name,
        patient_name: pendingBooking.name,
        patient_mobile: pendingBooking.mobile,
        patient_address: pendingBooking.address,
        scheduled_date: pendingBooking.date,
        price: finalPrice,
        original_price: selectedTest?.price,
        discount_applied: selectedTest?.price - finalPrice,
        transaction_id: paymentData.transactionId,
        payment_method: paymentData.method,
        status: 'scheduled'
      };

      // 2. Book Lab Test via API
      const labResult = await api.bookLabTest(labTestData);

      // 3. Add to UserContext/MockDB for immediate UI feedback
      addHealthRecord('labResult', {
        testName: selectedTest?.name,
        patientName: pendingBooking.name,
        mobile: pendingBooking.mobile,
        address: pendingBooking.address,
        scheduledDate: pendingBooking.date,
        status: 'scheduled',
        testType: 'lab_booking',
        id: labResult?._id || labResult?.id
      });

      // 4. Add persistent Order for the lab test
      const orderData = {
        items: [{
          item_id: selectedTest?.id || Date.now(),
          product_name: selectedTest?.name,
          quantity: 1,
          price: finalPrice
        }],
        total_amount: finalPrice,
        savings: selectedTest?.price - finalPrice,
        order_type: 'lab_test',
        patient_name: pendingBooking.name,
        scheduled_date: pendingBooking.date,
        shipping_address: pendingBooking.address,
        payment_method: paymentData.method,
        transaction_id: paymentData.transactionId,
        status: 'confirmed'
      };

      const order = await addOrder(orderData);

      // 5. Success UI state
      addNotification({
        title: 'Lab Test Booked',
        message: `Your ${selectedTest?.name} test has been scheduled for ${pendingBooking.date}.`,
        type: 'success'
      });

      setSuccess(true);
      setPendingBooking(null);

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.error('Error completing lab test booking:', error);
      addNotification({
        title: 'Booking Error',
        message: 'Payment was successful but we failed to register the booking. Please contact support.',
        type: 'error'
      });
      setShowPaymentModal(false);
    }
  };

  const handlePaymentFailure = (error) => {
    console.error('Payment failed:', error);
    addNotification({
      title: 'Payment Failed',
      message: 'Your payment could not be processed. Please try again.',
      type: 'error'
    });
    setPendingBooking(null);
  };
  const handleClear = () => {
    localStorage.removeItem('labBookings');
    setBookings([]);
  };
  const handleExport = () => {
    const csvRows = [
      ['Test', 'Name', 'Mobile', 'Address', 'Date', 'Booked At', 'Status'],
      ...bookings.map(b => [b.test, b.name, b.mobile, b.address, b.date, b.time, b.status || 'pending'])
    ];
    const csv = csvRows.map(row => row.map(x => '"' + (x || '') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lab_bookings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleStatusChange = (idx, status) => {
    const updated = bookings.map((b, i) => i === idx ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('labBookings', JSON.stringify(updated));
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const openDetails = (booking) => {
    setDetailsBooking(booking);
    setDetailsModal(true);
  };
  const closeDetails = () => {
    setDetailsModal(false);
    setDetailsBooking(null);
  };
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuth(true);
      setAuthError('');
      const stored = JSON.parse(localStorage.getItem('labBookings') || '[]');
      setBookings(stored);
    } else {
      setAuthError('Incorrect password');
    }
  };

  // Admin view
  if (isAdmin) {
    if (!adminAuth) {
      return (
        <AuthModal>
          <AuthBox>
            <ModalTitle>Admin Login</ModalTitle>
            {authError && <AuthError>{authError}</AuthError>}
            <form onSubmit={handleAdminLogin}>
              <AuthInput type="password" placeholder="Enter admin password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
              <AuthInput type="password" placeholder="Enter admin password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
              <button type="submit" className="submit-btn" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #02475b, #0087ba)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Login to Dashboard
              </button>
            </form>
          </AuthBox>
        </AuthModal>
      );
    }
    const filtered = bookings.filter(b =>
      (b.test || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.mobile || '').includes(search) ||
      (b.address || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.date || '').includes(search) ||
      (b.status || '').toLowerCase().includes(search.toLowerCase())
    );
    return (
      <PageContainer>
        <AdminTitle>Lab Test Bookings (Admin View)</AdminTitle>
        <SearchBar placeholder="Search bookings..." value={search} onChange={handleSearch} />
        <ExportBtn onClick={handleExport}>Export to CSV</ExportBtn>
        <ClearBtn onClick={handleClear}>Clear All Bookings</ClearBtn>
        <AdminTable>
          <thead>
            <AdminTr>
              <AdminTh>Test</AdminTh>
              <AdminTh>Name</AdminTh>
              <AdminTh>Mobile</AdminTh>
              <AdminTh>Address</AdminTh>
              <AdminTh>Date</AdminTh>
              <AdminTh>Booked At</AdminTh>
              <AdminTh>Status</AdminTh>
            </AdminTr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <AdminTr><AdminTd colSpan={7}>No bookings found.</AdminTd></AdminTr>
            ) : (
              filtered.map((b, i) => (
                <AdminTr key={i}>
                  <AdminTd onClick={() => openDetails(b)}>{b.test}</AdminTd>
                  <AdminTd onClick={() => openDetails(b)}>{b.name}</AdminTd>
                  <AdminTd onClick={() => openDetails(b)}>{b.mobile}</AdminTd>
                  <AdminTd onClick={() => openDetails(b)}>{b.address}</AdminTd>
                  <AdminTd onClick={() => openDetails(b)}>{b.date}</AdminTd>
                  <AdminTd onClick={() => openDetails(b)}>{b.time}</AdminTd>
                  <AdminTd>
                    <StatusSelect value={b.status || 'pending'} onChange={e => handleStatusChange(i, e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </StatusSelect>
                  </AdminTd>
                </AdminTr>
              ))
            )}
          </tbody>
        </AdminTable>
        {detailsBooking && (
          <ModalOverlay>
            <DetailsModal>
              <CloseButton onClick={closeDetails} title="Close">×</CloseButton>
              <ModalTitle>Booking Details</ModalTitle>
              <DetailsRow><DetailsLabel>Test:</DetailsLabel>{detailsBooking.test}</DetailsRow>
              <DetailsRow><DetailsLabel>Name:</DetailsLabel>{detailsBooking.name}</DetailsRow>
              <DetailsRow><DetailsLabel>Mobile:</DetailsLabel>{detailsBooking.mobile}</DetailsRow>
              <DetailsRow><DetailsLabel>Address:</DetailsLabel>{detailsBooking.address}</DetailsRow>
              <DetailsRow><DetailsLabel>Date:</DetailsLabel>{detailsBooking.date}</DetailsRow>
              <DetailsRow><DetailsLabel>Booked At:</DetailsLabel>{detailsBooking.time}</DetailsRow>
              <DetailsRow><DetailsLabel>Status:</DetailsLabel>{detailsBooking.status || 'pending'}</DetailsRow>
            </DetailsModal>
          </ModalOverlay>
        )}
      </PageContainer>
    );
  }

  // Regular user view
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Lab Tests & Health Checkups</HeroTitle>
          <HeroSubtitle>Book lab tests from the comfort of your home with certified labs and quick results</HeroSubtitle>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>🏠</FeatureIcon>
              <FeatureTitle>Home Collection</FeatureTitle>
              <FeatureDesc>Free sample collection at your doorstep</FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Quick Results</FeatureTitle>
              <FeatureDesc>Get reports within 24-48 hours</FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🏥</FeatureIcon>
              <FeatureTitle>Certified Labs</FeatureTitle>
              <FeatureDesc>NABL accredited laboratory network</FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <FeatureTitle>Digital Reports</FeatureTitle>
              <FeatureDesc>Access reports anytime on your phone</FeatureDesc>
            </FeatureCard>
          </FeatureGrid>
        </HeroContent>
      </HeroSection>

      {/* Subscription Badge */}
      <div style={{ marginBottom: '20px' }}>
        <SubscriptionBadge inline={true} />
      </div>

      {/* Filter Section */}
      <FilterSection>
        <SearchInput
          type="text"
          placeholder="Search for lab tests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterGrid>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#02475b' }}>
              Category
            </label>
            <FilterSelect
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="All Tests">All Tests</option>
              {testCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </FilterSelect>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#02475b' }}>
              Price Range
            </label>
            <FilterSelect
              value={`${filters.priceRange.min}-${filters.priceRange.max}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                handlePriceRangeChange({ min, max });
              }}
            >
              {priceRanges.map(range => (
                <option key={`${range.min}-${range.max}`} value={`${range.min}-${range.max}`}>
                  {range.label}
                </option>
              ))}
            </FilterSelect>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#02475b' }}>
              Fasting Required
            </label>
            <FilterSelect
              value={filters.fasting}
              onChange={(e) => handleFilterChange('fasting', e.target.value)}
            >
              {fastingOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#02475b' }}>
              Report Duration
            </label>
            <FilterSelect
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </div>
        </FilterGrid>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={clearFilters}
            style={{
              background: 'linear-gradient(135deg, #02475b, #0087ba)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Clear All Filters
          </button>
        </div>
      </FilterSection>

      <ResultsCount>
        Showing {filteredTests.length} of {labTestDatabase.length} lab tests
      </ResultsCount>

      {/* Test Grid using filtered tests */}
      <TestGrid>
        {filteredTests.map((test, idx) => (
          <TestCard key={idx}>
            <TestIcon>{test.icon}</TestIcon>
            <TestName>{test.name}</TestName>
            <TestDesc>{test.desc}</TestDesc>
            <TestPrice>
              {getSubscriptionDiscount() > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ textDecoration: 'line-through', fontSize: '0.9rem', color: '#666', opacity: 0.7 }}>₹{test.price}</span>
                  <span style={{ color: '#0087ba', fontWeight: '800' }}>₹{calculateDiscountedPrice(test.price)}</span>
                </div>
              ) : (
                `₹${test.price}`
              )}
            </TestPrice>
            <TestMeta>
              <MetaItem>⏱️ {test.duration}</MetaItem>
              <MetaItem>{test.fasting ? '🍽️ Fasting' : '🚫 No Fasting'}</MetaItem>
            </TestMeta>
            <BookButton onClick={() => openModal(test)}>Book Now</BookButton>
          </TestCard>
        ))}
      </TestGrid>

      {filteredTests.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#666',
          fontSize: '1.2rem'
        }}>
          No tests found matching your criteria. Try adjusting your filters.
        </div>
      )}

      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal} title="Close">×</CloseButton>
            <ModalTitle>Book {selectedTest?.name}</ModalTitle>
            <ModalForm onSubmit={handleSubmit}>
              <ModalInput name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <ModalInput name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required pattern="[0-9]{10}" maxLength={10} />
              <ModalInput name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
              <ModalInput name="date" type="date" value={form.date} onChange={handleChange} required />
              <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Original Price</span>
                  <span style={{ fontWeight: '500', textDecoration: getSubscriptionDiscount() > 0 ? 'line-through' : 'none' }}>₹{selectedTest?.price}</span>
                </div>
                {getSubscriptionDiscount() > 0 && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#10b981', fontWeight: 'bold' }}>
                      <span>👑 Member Discount ({(getSubscriptionDiscount() * 100).toFixed(0)}%)</span>
                      <span>-₹{selectedTest?.price - calculateDiscountedPrice(selectedTest?.price)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                      <span style={{ fontWeight: 'bold', color: '#02475b' }}>Final Price</span>
                      <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#0087ba' }}>₹{calculateDiscountedPrice(selectedTest?.price)}</span>
                    </div>
                  </>
                )}
              </div>
              <ModalButton type="submit">Confirm Booking & Pay ₹{calculateDiscountedPrice(selectedTest?.price)}</ModalButton>
            </ModalForm>
            {success && <SuccessMsg>Booking successful! We'll contact you soon.</SuccessMsg>}
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setPendingBooking(null);
        }}
        orderData={{
          total: calculateDiscountedPrice(selectedTest?.price || 0),
          originalTotal: selectedTest?.price || 0,
          discount: selectedTest?.price - calculateDiscountedPrice(selectedTest?.price || 0),
          orderType: 'lab_test',
          testName: selectedTest?.name,
          patientName: pendingBooking?.name
        }}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailure={handlePaymentFailure}
      />
    </PageContainer>
  );
};

export default LabTest;