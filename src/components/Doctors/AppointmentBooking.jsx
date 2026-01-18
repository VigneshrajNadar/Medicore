import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCreditCard,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getDoctorById,
  getDoctorAvailableSlots,
  bookAppointment
} from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import './AppointmentBooking.css';

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    symptoms: '',
    notes: '',
    consultationType: 'in-person'
  });
  const [errors, setErrors] = useState({});
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const { currentUser, addHealthRecord, addNotification } = useUser();

  useEffect(() => {
    loadDoctorData();
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate && doctor) {
      loadAvailableSlots();
    }
  }, [selectedDate, doctorId, doctor]);

  const loadDoctorData = async () => {
    try {
      const doctorData = await getDoctorById(doctorId);
      setDoctor(doctorData);
    } catch (error) {
      console.error('Error loading doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = () => {
    // Generate slots using handleDateChange logic
    if (doctor?.available_time_slots) {
      const slots = generateTimeSlotsFromDoctor(doctor.available_time_slots);
      setAvailableSlots(slots);
    } else {
      // Fallback: Generate default time slots (9 AM to 5 PM)
      const defaultSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        defaultSlots.push(`${hour.toString().padStart(2, '0')}:00`);
        if (hour < 17) {
          defaultSlots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
      }
      setAvailableSlots(defaultSlots);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.patientPhone)) {
      newErrors.patientPhone = 'Please enter a valid phone number';
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Please enter a valid email';
    }

    if (!selectedDate) {
      newErrors.date = 'Please select a date';
    }

    if (!selectedTime) {
      newErrors.time = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!currentUser) {
      setErrors({ submit: 'Please login to book appointments' });
      return;
    }

    setBookingLoading(true);
    try {
      const appointmentData = {
        user_id: currentUser.id,
        doctor_id: doctorId,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        consultation_type: formData.consultationType,
        symptoms: formData.symptoms,
        notes: formData.notes
      };

      const result = await bookAppointment(appointmentData);

      // Add to user's health records
      addHealthRecord('appointment', {
        type: 'Doctor Appointment',
        doctor: doctor?.name || 'Dr. Unknown',
        hospital: doctor?.hospital_name || doctor?.hospital || 'Medical Center',
        date: selectedDate,
        time: selectedTime,
        status: 'scheduled',
        notes: `Consultation: ${formData.consultationType}. Symptoms: ${formData.symptoms}`,
        consultationType: formData.consultationType,
        symptoms: formData.symptoms,
        appointmentId: result?.id,
        consultation_fee: doctor?.consultation_fee || 0,
        total_amount: doctor?.consultation_fee || 0
      });

      // Add notification
      addNotification({
        title: 'Appointment Booked Successfully',
        message: `Your appointment with ${doctor?.name || 'the doctor'} has been scheduled for ${selectedDate} at ${selectedTime}`,
        type: 'success'
      });

      setBookingDetails(result);
      setBookingSuccess(true);
      setBookingStep(3);
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to book appointment. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setErrors(prev => ({ ...prev, date: '', time: '' }));

    // Generate time slots based on doctor's availability
    if (doctor?.available_time_slots) {
      const slots = generateTimeSlotsFromDoctor(doctor.available_time_slots);
      setAvailableSlots(slots);
    } else {
      // Fallback: Generate default time slots (9 AM to 5 PM)
      const defaultSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        defaultSlots.push(`${hour.toString().padStart(2, '0')}:00`);
        if (hour < 17) {
          defaultSlots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
      }
      setAvailableSlots(defaultSlots);
    }
  };

  // Helper function to parse doctor's time slots
  const generateTimeSlotsFromDoctor = (timeSlotString) => {
    const slots = [];
    try {
      // Parse time ranges like "09:00-13:00,16:00-19:00"
      const ranges = timeSlotString.split(',');
      ranges.forEach(range => {
        const [start, end] = range.trim().split('-');
        const [startHour] = start.split(':').map(Number);
        const [endHour] = end.split(':').map(Number);

        for (let hour = startHour; hour < endHour; hour++) {
          slots.push(`${hour.toString().padStart(2, '0')}:00`);
          slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
      });
    } catch (error) {
      console.error('Error parsing time slots:', error);
      // Return default slots on error
      for (let hour = 9; hour <= 17; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        if (hour < 17) {
          slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
      }
    }
    return slots;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Check if the day is available (simple check - can be enhanced)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (doctor && doctor.available_days.includes(dayName)) {
        dates.push(date);
      }
    }

    return dates;
  };

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'next') {
        newMonth.setMonth(prev.getMonth() + 1);
      } else {
        newMonth.setMonth(prev.getMonth() - 1);
      }
      return newMonth;
    });
  };

  const isDateSelectable = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return selectedDate === date.toISOString().split('T')[0];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time;
  };

  if (loading) {
    return (
      <div className="appointment-booking-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="appointment-booking-error">
        <FaExclamationTriangle />
        <h3>Doctor not found</h3>
        <p>Unable to load doctor details. Please try again.</p>
        <button onClick={() => navigate('/doctors')}>Close</button>
      </div>
    );
  }

  return (
    <div className="appointment-booking">
      <div className="booking-header">
        <button className="back-btn" onClick={() => navigate('/doctors')}>
          <FaArrowLeft />
          Back
        </button>
        <h2>Book Appointment</h2>
      </div>

      <div className="doctor-summary">
        <img src={doctor.profile_image} alt={doctor.name} />
        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
          <p>{doctor.hospital_name}</p>
          <div className="fee">
            <FaRupeeSign />
            <span>₹{doctor.consultation_fee}</span>
          </div>
        </div>
      </div>

      <div className="booking-steps">
        <div className={`step ${bookingStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Select Date & Time</span>
        </div>
        <div className={`step ${bookingStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Patient Details</span>
        </div>
        <div className={`step ${bookingStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Confirmation</span>
        </div>
      </div>

      {bookingStep === 1 && (
        <motion.div
          className="booking-step-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Select Date & Time</h3>

          <div className="date-selection">
            <h4>Select Date</h4>

            {/* Calendar Header */}
            <div className="calendar-header">
              <button
                className="calendar-nav-btn"
                onClick={() => changeMonth('prev')}
              >
                <FaChevronLeft />
              </button>
              <h5 className="calendar-month">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h5>
              <button
                className="calendar-nav-btn"
                onClick={() => changeMonth('next')}
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {/* Day Headers */}
              <div className="calendar-day-header">Sun</div>
              <div className="calendar-day-header">Mon</div>
              <div className="calendar-day-header">Tue</div>
              <div className="calendar-day-header">Wed</div>
              <div className="calendar-day-header">Thu</div>
              <div className="calendar-day-header">Fri</div>
              <div className="calendar-day-header">Sat</div>

              {/* Calendar Days */}
              {getCalendarDays().map((date, index) => (
                <div
                  key={index}
                  className={`calendar-day ${!date ? 'empty' : ''} ${date && isDateSelectable(date) ? 'selectable' : ''} ${date && isDateSelected(date) ? 'selected' : ''}`}
                  onClick={() => date && isDateSelectable(date) && setSelectedDate(date.toISOString().split('T')[0])}
                >
                  {date && date.getDate()}
                </div>
              ))}
            </div>

            {errors.date && <p className="error">{errors.date}</p>}
          </div>

          {selectedDate && (
            <div className="time-selection">
              <h4>Available Time Slots</h4>
              <div className="time-grid">
                {availableSlots.length > 0 ? (
                  availableSlots.map((time) => (
                    <button
                      key={time}
                      className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <FaClock />
                      <span>{formatTime(time)}</span>
                    </button>
                  ))
                ) : (
                  <p className="no-slots">No available slots for this date</p>
                )}
              </div>
              {errors.time && <p className="error">{errors.time}</p>}
            </div>
          )}

          <div className="step-actions">
            <button
              className="next-btn"
              onClick={() => setBookingStep(2)}
              disabled={!selectedDate || !selectedTime}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {bookingStep === 2 && (
        <motion.div
          className="booking-step-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Patient Details</h3>

          <form onSubmit={handleSubmit} className="patient-form">
            <div className="form-group">
              <label>
                <FaUser />
                Patient Name *
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                placeholder="Enter patient's full name"
                className={errors.patientName ? 'error' : ''}
              />
              {errors.patientName && <p className="error">{errors.patientName}</p>}
            </div>

            <div className="form-group">
              <label>
                <FaPhone />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                placeholder="Enter phone number"
                className={errors.patientPhone ? 'error' : ''}
              />
              {errors.patientPhone && <p className="error">{errors.patientPhone}</p>}
            </div>

            <div className="form-group">
              <label>
                <FaUser />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.patientEmail}
                onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                placeholder="Enter email address"
                className={errors.patientEmail ? 'error' : ''}
              />
              {errors.patientEmail && <p className="error">{errors.patientEmail}</p>}
            </div>

            <div className="form-group">
              <label>Consultation Type</label>
              <select
                value={formData.consultationType}
                onChange={(e) => handleInputChange('consultationType', e.target.value)}
              >
                <option value="in-person">In-Person</option>
                <option value="video">Video Consultation</option>
                <option value="phone">Phone Consultation</option>
              </select>
            </div>

            <div className="form-group">
              <label>Symptoms (Optional)</label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                placeholder="Describe your symptoms..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Additional Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information..."
                rows="3"
              />
            </div>

            {errors.submit && <p className="error">{errors.submit}</p>}

            <div className="step-actions">
              <button
                type="button"
                className="back-btn"
                onClick={() => setBookingStep(1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="book-btn"
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {bookingStep === 3 && bookingSuccess && (
        <motion.div
          className="booking-step-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="success-message">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h3>Appointment Booked Successfully!</h3>
            <p>Your appointment has been confirmed.</p>
          </div>

          <div className="booking-details">
            <h4>Appointment Details</h4>
            <div className="detail-item">
              <strong>Appointment ID:</strong> #{bookingDetails.id}
            </div>
            <div className="detail-item">
              <strong>Doctor:</strong> {doctor.name}
            </div>
            <div className="detail-item">
              <strong>Date:</strong> {selectedDate}
            </div>
            <div className="detail-item">
              <strong>Time:</strong> {selectedTime}
            </div>
            <div className="detail-item">
              <strong>Patient:</strong> {formData.patientName}
            </div>
            <div className="detail-item">
              <strong>Fee:</strong> ₹{doctor.consultation_fee}
            </div>
          </div>

          <div className="step-actions">
            <button
              className="close-btn"
              onClick={() => navigate('/doctors')}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Animated Footer */}
      <motion.footer
        className="appointment-footer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="footer-content">
          <div className="footer-section">
            <h4>Need Help?</h4>
            <p>Contact our support team for assistance</p>
            <div className="footer-links">
              <a href="#" className="footer-link">
                <FaPhone />
                Support
              </a>
              <a href="#" className="footer-link">
                <FaEnvelope />
                Email
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">FAQ</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="#" className="social-link">
                <FaEnvelope />
              </a>
              <a href="#" className="social-link">
                <FaPhone />
              </a>
              <a href="#" className="social-link">
                <FaUser />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Apollo 247. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default AppointmentBooking;
