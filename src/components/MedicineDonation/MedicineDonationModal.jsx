import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaPills, 
  FaCalendarAlt, 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt,
  FaUpload,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import styled from 'styled-components';
import { useUser } from '../../contexts/UserContext';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
`;

const ModalTitle = styled.h2`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const FileUpload = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.05);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const WarningBox = styled.div`
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const MedicineDonationModal = ({ isOpen, onClose, type = 'donate' }) => {
  const { addMedicineDonation } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    donorName: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    city: '',
    medicineName: '',
    quantity: '',
    expiryDate: '',
    condition: 'unopened',
    notes: '',
    pickupPreference: 'center'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add donation to user context
    addMedicineDonation({
      donorName: formData.donorName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      medicine: formData.medicineName,
      quantity: formData.quantity,
      expiryDate: formData.expiryDate,
      condition: formData.condition,
      notes: formData.notes,
      pickupPreference: formData.pickupPreference,
      pickupCenter: formData.pickupPreference === 'center' ? 'Apollo Pharmacy - MG Road' : 'Home Pickup Scheduled',
      value: '₹' + Math.floor(Math.random() * 500 + 100)
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({
        donorName: '',
        phone: '',
        email: '',
        address: '',
        state: '',
        city: '',
        medicineName: '',
        quantity: '',
        expiryDate: '',
        condition: 'unopened',
        notes: '',
        pickupPreference: 'center'
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <AnimatePresence>
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ textAlign: 'center', padding: '3rem' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
            </motion.div>
            <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>Thank You!</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Your medicine donation request has been submitted successfully. 
              Our team will contact you within 24 hours to arrange collection.
            </p>
          </ModalContent>
        </ModalOverlay>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                <FaPills style={{ color: '#10b981' }} />
                {type === 'donate' ? 'Donate Medicines' : 'Request Medicines'}
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <WarningBox>
              <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: '1.2rem', marginTop: '0.1rem' }} />
              <div>
                <strong>Important:</strong> Only donate medicines that are unopened, unexpired, and stored properly. 
                We cannot accept opened bottles or expired medications for safety reasons.
              </div>
            </WarningBox>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>
                  <FaUser style={{ marginRight: '0.5rem' }} />
                  Full Name *
                </Label>
                <Input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaPhone style={{ marginRight: '0.5rem' }} />
                  Phone Number *
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                />
              </FormGroup>

              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
                  State *
                </Label>
                <Select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi">Delhi</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>City *</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your city"
                />
              </FormGroup>

              <FormGroup>
                <Label>Address *</Label>
                <TextArea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your complete address"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaPills style={{ marginRight: '0.5rem' }} />
                  Medicine Name *
                </Label>
                <Input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter medicine name and strength"
                />
              </FormGroup>

              <FormGroup>
                <Label>Quantity *</Label>
                <Input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 1 bottle, 10 tablets, 2 strips"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                  Expiry Date *
                </Label>
                <Input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Medicine Condition *</Label>
                <Select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                >
                  <option value="unopened">Unopened/Sealed</option>
                  <option value="partial">Partially Used (Strips/Blister Packs)</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Pickup Preference *</Label>
                <Select
                  name="pickupPreference"
                  value={formData.pickupPreference}
                  onChange={handleInputChange}
                  required
                >
                  <option value="center">Drop at Collection Center</option>
                  <option value="home">Home Pickup</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Additional Notes</Label>
                <TextArea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information about the medicines or special instructions"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ width: '20px', height: '20px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%' }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Submit Donation
                  </>
                )}
              </SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default MedicineDonationModal;
