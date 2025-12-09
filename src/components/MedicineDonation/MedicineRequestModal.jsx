import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt,
  FaUpload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
  FaEye,
  FaIdCard,
  FaEnvelope,
  FaStethoscope,
  FaPills,
  FaFileImage,
  FaCamera
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
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 1px solid #3b82f6;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const AvailableMedicines = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const MedicineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  }
  
  &.selected {
    border-color: #3b82f6;
    background: #eff6ff;
  }
`;

const MedicineRequestModal = ({ isOpen, onClose }) => {
  const { addMedicineRequest } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    city: '',
    aadharNumber: '',
    medicalCondition: '',
    urgency: 'medium',
    selectedMedicines: [],
    prescriptionFile: null,
    prescriptionPreview: null
  });

  // Comprehensive available medicines database
  const availableMedicines = [
    { name: 'Paracetamol 500mg', quantity: '150 tablets', expiry: '2025-12-31', category: 'Pain Relief', donated: '2024-08-15' },
    { name: 'Metformin 500mg', quantity: '80 tablets', expiry: '2025-10-15', category: 'Diabetes', donated: '2024-08-20' },
    { name: 'Amlodipine 5mg', quantity: '45 tablets', expiry: '2025-11-20', category: 'Hypertension', donated: '2024-08-18' },
    { name: 'Omeprazole 20mg', quantity: '60 capsules', expiry: '2025-09-30', category: 'Gastric', donated: '2024-08-22' },
    { name: 'Atorvastatin 10mg', quantity: '35 tablets', expiry: '2025-12-01', category: 'Cholesterol', donated: '2024-08-25' },
    { name: 'Aspirin 75mg', quantity: '200 tablets', expiry: '2026-01-15', category: 'Cardiology', donated: '2024-08-10' },
    { name: 'Insulin Glargine 100U/ml', quantity: '12 vials', expiry: '2025-11-30', category: 'Diabetes', donated: '2024-08-28' },
    { name: 'Lisinopril 10mg', quantity: '90 tablets', expiry: '2025-10-20', category: 'Hypertension', donated: '2024-08-12' },
    { name: 'Simvastatin 20mg', quantity: '70 tablets', expiry: '2025-12-15', category: 'Cholesterol', donated: '2024-08-30' },
    { name: 'Pantoprazole 40mg', quantity: '40 tablets', expiry: '2025-11-10', category: 'Gastric', donated: '2024-08-14' },
    { name: 'Clopidogrel 75mg', quantity: '55 tablets', expiry: '2025-10-25', category: 'Cardiology', donated: '2024-08-16' },
    { name: 'Losartan 50mg', quantity: '65 tablets', expiry: '2025-12-20', category: 'Hypertension', donated: '2024-08-19' },
    { name: 'Glimepiride 2mg', quantity: '85 tablets', expiry: '2025-11-05', category: 'Diabetes', donated: '2024-08-21' },
    { name: 'Telmisartan 40mg', quantity: '75 tablets', expiry: '2025-10-30', category: 'Hypertension', donated: '2024-08-23' },
    { name: 'Rosuvastatin 10mg', quantity: '50 tablets', expiry: '2025-12-10', category: 'Cholesterol', donated: '2024-08-26' },
    { name: 'Esomeprazole 40mg', quantity: '30 capsules', expiry: '2025-09-25', category: 'Gastric', donated: '2024-08-27' },
    { name: 'Bisoprolol 5mg', quantity: '95 tablets', expiry: '2025-11-15', category: 'Cardiology', donated: '2024-08-29' },
    { name: 'Gliclazide 80mg', quantity: '60 tablets', expiry: '2025-10-10', category: 'Diabetes', donated: '2024-08-31' },
    { name: 'Valsartan 80mg', quantity: '40 tablets', expiry: '2025-12-05', category: 'Hypertension', donated: '2024-09-01' },
    { name: 'Atenolol 50mg', quantity: '110 tablets', expiry: '2025-11-25', category: 'Cardiology', donated: '2024-09-02' },
    { name: 'Pioglitazone 15mg', quantity: '25 tablets', expiry: '2025-10-05', category: 'Diabetes', donated: '2024-09-03' },
    { name: 'Ramipril 5mg', quantity: '80 tablets', expiry: '2025-12-25', category: 'Hypertension', donated: '2024-09-04' },
    { name: 'Fenofibrate 160mg', quantity: '45 tablets', expiry: '2025-11-08', category: 'Cholesterol', donated: '2024-09-05' },
    { name: 'Rabeprazole 20mg', quantity: '35 tablets', expiry: '2025-09-20', category: 'Gastric', donated: '2024-09-06' },
    { name: 'Carvedilol 6.25mg', quantity: '70 tablets', expiry: '2025-10-15', category: 'Cardiology', donated: '2024-09-07' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicineSelect = (medicine) => {
    setFormData(prev => ({
      ...prev,
      selectedMedicines: [...prev.selectedMedicines, medicine.name]
    }));
  };

  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, prescriptionFile: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, prescriptionPreview: e.target.result }));
        setPrescriptionUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prescriptionUploaded) {
      alert('Please upload a prescription before submitting your request.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add request to user context
    addMedicineRequest({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      aadharNumber: formData.aadharNumber,
      medicalCondition: formData.medicalCondition,
      urgency: formData.urgency,
      selectedMedicines: formData.selectedMedicines,
      prescriptionFile: formData.prescriptionFile?.name || 'Uploaded'
    });
    
    alert(`Medicine request submitted successfully!\n\nRequest ID: REQ${Date.now()}\nSelected Medicines: ${formData.selectedMedicines.join(', ')}\nUrgency: ${formData.urgency}\nPrescription: ${formData.prescriptionFile?.name}\n\nYou will be notified once medicines are available.`);
    
    setIsSubmitting(false);
    onClose();
    setCurrentStep(1);
    setPrescriptionUploaded(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      state: '',
      city: '',
      aadharNumber: '',
      medicalCondition: '',
      urgency: 'medium',
      selectedMedicines: [],
      prescriptionFile: null,
      prescriptionPreview: null
    });
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
              <FaCheckCircle style={{ fontSize: '4rem', color: '#3b82f6', marginBottom: '1rem' }} />
            </motion.div>
            <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>Request Submitted!</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Your medicine request has been submitted successfully. 
              We will verify your request and contact you within 48 hours if medicines are available.
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
                <FaStethoscope style={{ color: '#3b82f6' }} />
                Request Medicines
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <InfoBox>
              <FaExclamationTriangle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
              <div>
                <strong>Note:</strong> This service is for those who genuinely cannot afford medicines. 
                Please provide accurate information and valid documentation for verification.
              </div>
            </InfoBox>

            <AvailableMedicines>
              <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaSearch />
                Available Medicines
              </h4>
              {availableMedicines.map((medicine, index) => (
                <MedicineItem
                  key={index}
                  className={formData.selectedMedicines.includes(medicine.name) ? 'selected' : ''}
                  onClick={() => handleMedicineSelect(medicine)}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{medicine.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Category: {medicine.category} • Donated: {medicine.donated}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Available: {medicine.quantity} • Expires: {medicine.expiry}
                    </div>
                  </div>
                  <div style={{ color: '#3b82f6', fontWeight: '600' }}>Select</div>
                </MedicineItem>
              ))}
              <div style={{ marginBottom: '1rem' }}>
                <strong>Selected Medicines:</strong> {formData.selectedMedicines.join(', ') || 'None'}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Prescription:</strong> {formData.prescriptionFile?.name || 'Not uploaded'}
              </div>
            </AvailableMedicines>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Patient Information */}
              {currentStep === 1 && (
                <>
                  <FormGroup>
                    <Label>
                      <FaUser style={{ marginRight: '0.5rem' }} />
                      Patient Name *
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter patient's full name"
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
                      placeholder="Enter 10-digit phone number"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaIdCard style={{ marginRight: '0.5rem' }} />
                      Aadhar Number *
                    </Label>
                    <Input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter 12-digit Aadhar number"
                      maxLength="12"
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
                      placeholder="Enter complete address"
                    />
                  </FormGroup>
                </>
              )}

              {/* Step 2: Prescription Upload */}
              {currentStep === 2 && (
                <>
                  <h3 style={{ 
                    color: '#1e293b', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FaUpload style={{ color: '#3b82f6' }} />
                    Upload Prescription
                  </h3>
                  
                  <div style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    background: prescriptionUploaded ? '#f0f9ff' : '#f8fafc',
                    borderColor: prescriptionUploaded ? '#3b82f6' : '#cbd5e1'
                  }}>
                    {!prescriptionUploaded ? (
                      <>
                        <FaFileImage style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '1rem' }} />
                        <h4 style={{ color: '#475569', marginBottom: '0.5rem' }}>Upload Prescription</h4>
                        <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                          Please upload a clear image of your prescription. Accepted formats: JPG, PNG, PDF
                        </p>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handlePrescriptionUpload}
                          style={{ display: 'none' }}
                          id="prescription-upload"
                        />
                        <label
                          htmlFor="prescription-upload"
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            border: 'none',
                            fontSize: '1rem'
                          }}
                        >
                          <FaCamera />
                          Choose File
                        </label>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }} />
                        <h4 style={{ color: '#059669', marginBottom: '0.5rem' }}>Prescription Uploaded Successfully!</h4>
                        <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
                          File: {formData.prescriptionFile?.name}
                        </p>
                        {formData.prescriptionPreview && (
                          <div style={{
                            maxWidth: '300px',
                            margin: '0 auto 1rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            overflow: 'hidden'
                          }}>
                            <img 
                              src={formData.prescriptionPreview} 
                              alt="Prescription preview" 
                              style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setPrescriptionUploaded(false);
                            setFormData(prev => ({ ...prev, prescriptionFile: null, prescriptionPreview: null }));
                          }}
                          style={{
                            background: 'transparent',
                            color: '#3b82f6',
                            border: '2px solid #3b82f6',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Upload Different File
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div style={{
                    background: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <FaExclamationTriangle style={{ color: '#d97706', marginTop: '0.2rem' }} />
                      <div>
                        <h5 style={{ color: '#92400e', margin: '0 0 0.5rem 0', fontWeight: '600' }}>Important Notes:</h5>
                        <ul style={{ color: '#92400e', margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
                          <li>Ensure prescription is clearly visible and readable</li>
                          <li>Include doctor's signature and clinic stamp</li>
                          <li>Prescription should be recent (within 30 days)</li>
                          <li>All requested medicines must be mentioned in prescription</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Step 3: Medicine Selection */}
              {currentStep === 3 && (
                <>
                  <h3 style={{ 
                    color: '#1e293b', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FaSearch style={{ color: '#3b82f6' }} />
                    Select Required Medicines
                  </h3>

                  <FormGroup>
                    <Label>Medical Condition *</Label>
                    <TextArea
                      name="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={handleInputChange}
                      required
                      placeholder="Briefly describe the medical condition requiring this medicine"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Urgency Level *</Label>
                    <Select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="low">Low - Can wait 1-2 weeks</option>
                      <option value="medium">Medium - Needed within a week</option>
                      <option value="high">High - Urgent, needed within 2-3 days</option>
                      <option value="critical">Critical - Emergency, needed immediately</option>
                    </Select>
                  </FormGroup>
                </>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <>
                  <h3 style={{ 
                    color: '#1e293b', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FaCheckCircle style={{ color: '#10b981' }} />
                    Review & Submit Request
                  </h3>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>Request Summary</h4>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Patient Name:</strong> {formData.name}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Phone:</strong> {formData.phone}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Medical Condition:</strong> {formData.medicalCondition}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Urgency:</strong> {formData.urgency}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Selected Medicines:</strong> {formData.selectedMedicines.join(', ') || 'None'}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Prescription:</strong> {formData.prescriptionFile?.name || 'Not uploaded'}
                    </div>
                  </div>

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
                        Submit Request
                      </>
                    )}
                  </SubmitButton>
                </>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', marginTop: '2rem' }}>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      style={{
                        background: 'transparent',
                        color: '#64748b',
                        border: '2px solid #e2e8f0',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Previous
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 2 && !prescriptionUploaded) {
                        alert('Please upload a prescription before proceeding.');
                        return;
                      }
                      setCurrentStep(currentStep + 1);
                    }}
                    disabled={currentStep === 2 && !prescriptionUploaded}
                    style={{
                      background: (currentStep === 2 && !prescriptionUploaded) ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: (currentStep === 2 && !prescriptionUploaded) ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      marginLeft: 'auto'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default MedicineRequestModal;
