import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaExclamationTriangle, FaInfoCircle, FaUser, FaWeight, FaRuler, FaPills, FaClock, FaShieldAlt, FaCheckCircle, FaTimes, FaArrowRight, FaArrowLeft, FaBaby, FaChild, FaUserMd, FaFlask, FaThermometerHalf } from 'react-icons/fa';
import './DosageCalculator.css';

const DosageCalculator = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    condition: ''
  });
  const [medicationInfo, setMedicationInfo] = useState({
    name: '',
    concentration: '',
    unit: 'mg/kg',
    frequency: 'daily',
    maxDose: '',
    minDose: ''
  });
  const [calculationResult, setCalculationResult] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Load saved calculation history on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('dosageCalculationHistory');
    if (savedHistory) {
      try {
        setCalculationHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading dosage calculation history:', error);
      }
    }
  }, []);

  // Save calculation history whenever it changes
  useEffect(() => {
    if (calculationHistory.length > 0) {
      localStorage.setItem('dosageCalculationHistory', JSON.stringify(calculationHistory));
    }
  }, [calculationHistory]);

  const ageGroups = [
    { id: 'newborn', label: 'Newborn (0-28 days)', icon: FaBaby },
    { id: 'infant', label: 'Infant (1-12 months)', icon: FaBaby },
    { id: 'toddler', label: 'Toddler (1-3 years)', icon: FaChild },
    { id: 'preschool', label: 'Preschool (3-5 years)', icon: FaChild },
    { id: 'school', label: 'School Age (6-12 years)', icon: FaUser },
    { id: 'adolescent', label: 'Adolescent (13-18 years)', icon: FaUser },
    { id: 'adult', label: 'Adult (18+ years)', icon: FaUser }
  ];

  const commonMedications = [
    {
      name: 'Paracetamol (Acetaminophen)',
      concentration: '15',
      unit: 'mg/kg',
      frequency: 'every 4-6 hours',
      maxDose: '60',
      minDose: '10',
      maxDaily: '90',
      notes: 'For fever and pain relief'
    },
    {
      name: 'Ibuprofen',
      concentration: '10',
      unit: 'mg/kg',
      frequency: 'every 6-8 hours',
      maxDose: '40',
      minDose: '5',
      maxDaily: '40',
      notes: 'For fever, pain, and inflammation'
    },
    {
      name: 'Amoxicillin',
      concentration: '25',
      unit: 'mg/kg',
      frequency: 'twice daily',
      maxDose: '1000',
      minDose: '20',
      maxDaily: '2000',
      notes: 'Antibiotic for bacterial infections'
    },
    {
      name: 'Omeprazole',
      concentration: '1',
      unit: 'mg/kg',
      frequency: 'daily',
      maxDose: '20',
      minDose: '0.5',
      maxDaily: '20',
      notes: 'For acid reflux and ulcers'
    }
  ];

  const frequencyOptions = [
    { value: 'once', label: 'Once daily' },
    { value: 'twice', label: 'Twice daily' },
    { value: 'thrice', label: 'Three times daily' },
    { value: 'every4', label: 'Every 4 hours' },
    { value: 'every6', label: 'Every 6 hours' },
    { value: 'every8', label: 'Every 8 hours' },
    { value: 'every12', label: 'Every 12 hours' }
  ];

  const unitOptions = [
    { value: 'mg/kg', label: 'mg/kg' },
    { value: 'mcg/kg', label: 'mcg/kg' },
    { value: 'mg/m2', label: 'mg/m²' },
    { value: 'mg', label: 'mg' },
    { value: 'ml', label: 'ml' }
  ];

  const calculateDosage = () => {
    if (!patientInfo.weight || !medicationInfo.concentration) {
      alert('Please enter patient weight and medication concentration.');
      return;
    }

    const weight = parseFloat(patientInfo.weight);
    const concentration = parseFloat(medicationInfo.concentration);
    
    let calculatedDose = 0;
    let doseUnit = '';
    let frequency = '';
    let maxDailyDose = 0;

    // Calculate based on unit
    if (medicationInfo.unit === 'mg/kg') {
      calculatedDose = weight * concentration;
      doseUnit = 'mg';
    } else if (medicationInfo.unit === 'mcg/kg') {
      calculatedDose = weight * concentration;
      doseUnit = 'mcg';
    } else if (medicationInfo.unit === 'mg/m2') {
      // Calculate body surface area using Mosteller formula
      const height = parseFloat(patientInfo.height) || 0;
      if (height > 0) {
        const bsa = Math.sqrt((weight * height) / 3600);
        calculatedDose = bsa * concentration;
        doseUnit = 'mg';
      } else {
        alert('Height is required for mg/m² calculations.');
        return;
      }
    } else {
      calculatedDose = concentration;
      doseUnit = medicationInfo.unit;
    }

    // Get frequency information
    const frequencyOption = frequencyOptions.find(f => f.value === medicationInfo.frequency);
    frequency = frequencyOption ? frequencyOption.label : 'As prescribed';

    // Calculate max daily dose
    if (medicationInfo.maxDose) {
      maxDailyDose = parseFloat(medicationInfo.maxDose);
    }

    // Round to 2 decimal places
    calculatedDose = Math.round(calculatedDose * 100) / 100;

    const result = {
      calculatedDose,
      doseUnit,
      frequency,
      maxDailyDose,
      patientInfo: { ...patientInfo },
      medicationInfo: { ...medicationInfo },
      timestamp: new Date(),
      warnings: []
    };

    // Add warnings
    if (calculatedDose > maxDailyDose && maxDailyDose > 0) {
      result.warnings.push(`Calculated dose (${calculatedDose} ${doseUnit}) exceeds maximum daily dose (${maxDailyDose} ${doseUnit})`);
    }

    if (calculatedDose < parseFloat(medicationInfo.minDose) && medicationInfo.minDose) {
      result.warnings.push(`Calculated dose (${calculatedDose} ${doseUnit}) is below minimum dose (${medicationInfo.minDose} ${doseUnit})`);
    }

    if (weight < 5) {
      result.warnings.push('Patient weight is very low. Please verify calculations with a healthcare provider.');
    }

    setCalculationResult(result);
    setCalculationHistory(prev => [result, ...prev]);
    setCurrentStep('result');
  };

  const selectMedication = (medication) => {
    setMedicationInfo({
      name: medication.name,
      concentration: medication.concentration,
      unit: medication.unit,
      frequency: medication.frequency.includes('every') ? 'every6' : 'twice',
      maxDose: medication.maxDose,
      minDose: medication.minDose
    });
  };

  const resetCalculator = () => {
    setCurrentStep('welcome');
    setPatientInfo({
      age: '',
      weight: '',
      height: '',
      gender: '',
      condition: ''
    });
    setMedicationInfo({
      name: '',
      concentration: '',
      unit: 'mg/kg',
      frequency: 'daily',
      maxDose: '',
      minDose: ''
    });
    setCalculationResult(null);
  };

  const renderWelcome = () => (
    <motion.div 
      className="calculator-welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="welcome-header">
        <FaCalculator className="welcome-icon" />
        <h2>Dosage Calculator</h2>
        <p>Calculate pediatric and weight-based medication dosages with safety checks</p>
      </div>

      {showDisclaimer && (
        <motion.div 
          className="disclaimer-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaExclamationTriangle className="disclaimer-icon" />
          <div className="disclaimer-content">
            <strong>Important:</strong> This calculator is for educational purposes only. 
            Always verify dosages with a healthcare provider before administration. 
            Dosage calculations should be double-checked and approved by qualified medical professionals.
          </div>
          <button 
            className="close-disclaimer"
            onClick={() => setShowDisclaimer(false)}
          >
            <FaTimes />
          </button>
        </motion.div>
      )}

      <motion.button
        className="start-calculator-btn"
        onClick={() => setCurrentStep('patient-info')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowRight />
        Start Dosage Calculation
      </motion.button>
    </motion.div>
  );

  const renderPatientInfo = () => (
    <motion.div 
      className="patient-info-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="form-header">
        <h3>Patient Information</h3>
        <p>Enter patient details for accurate dosage calculation</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Age Group</label>
          <div className="age-groups">
            {ageGroups.map((group) => (
              <button
                key={group.id}
                className={`age-group-btn ${patientInfo.age === group.id ? 'active' : ''}`}
                onClick={() => setPatientInfo(prev => ({ ...prev, age: group.id }))}
              >
                <group.icon />
                <span>{group.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Weight (kg) *</label>
          <input
            type="number"
            value={patientInfo.weight}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, weight: e.target.value }))}
            placeholder="Enter weight in kg"
            min="0"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={patientInfo.height}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, height: e.target.value }))}
            placeholder="Enter height in cm"
            min="0"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={patientInfo.gender}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, gender: e.target.value }))}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Medical Condition</label>
          <input
            type="text"
            value={patientInfo.condition}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, condition: e.target.value }))}
            placeholder="e.g., Fever, Infection, Pain"
          />
        </div>
      </div>

      <div className="form-navigation">
        <button 
          className="nav-btn prev-btn"
          onClick={() => setCurrentStep('welcome')}
        >
          <FaArrowLeft />
          Back
        </button>
        
        <button 
          className="nav-btn next-btn"
          onClick={() => setCurrentStep('medication-info')}
          disabled={!patientInfo.weight}
        >
          Next
          <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );

  const renderMedicationInfo = () => (
    <motion.div 
      className="medication-info-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="form-header">
        <h3>Medication Information</h3>
        <p>Enter medication details or select from common medications</p>
      </div>

      <div className="common-medications">
        <h4>Common Medications</h4>
        <div className="medications-grid">
          {commonMedications.map((med, index) => (
            <motion.button
              key={index}
              className="medication-card"
              onClick={() => selectMedication(med)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="med-header">
                <FaPills className="med-icon" />
                <h5>{med.name}</h5>
              </div>
              <div className="med-details">
                <span className="dose-info">{med.concentration} {med.unit}</span>
                <span className="frequency">{med.frequency}</span>
                <span className="notes">{med.notes}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="custom-medication">
        <h4>Custom Medication</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Medication Name</label>
            <input
              type="text"
              value={medicationInfo.name}
              onChange={(e) => setMedicationInfo(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter medication name"
            />
          </div>

          <div className="form-group">
            <label>Concentration</label>
            <input
              type="number"
              value={medicationInfo.concentration}
              onChange={(e) => setMedicationInfo(prev => ({ ...prev, concentration: e.target.value }))}
              placeholder="Enter concentration"
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label>Unit</label>
            <select
              value={medicationInfo.unit}
              onChange={(e) => setMedicationInfo(prev => ({ ...prev, unit: e.target.value }))}
            >
              {unitOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Frequency</label>
            <select
              value={medicationInfo.frequency}
              onChange={(e) => setMedicationInfo(prev => ({ ...prev, frequency: e.target.value }))}
            >
              {frequencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Maximum Dose</label>
            <input
              type="number"
              value={medicationInfo.maxDose}
              onChange={(e) => setMedicationInfo(prev => ({ ...prev, maxDose: e.target.value }))}
              placeholder="Maximum dose"
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label>Minimum Dose</label>
            <input
              type="number"
              value={medicationInfo.minDose}
              onChange={(e) => setMedicationInfo(prev => ({ ...prev, minDose: e.target.value }))}
              placeholder="Minimum dose"
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div className="form-navigation">
        <button 
          className="nav-btn prev-btn"
          onClick={() => setCurrentStep('patient-info')}
        >
          <FaArrowLeft />
          Back
        </button>
        
        <button 
          className="nav-btn next-btn"
          onClick={calculateDosage}
          disabled={!medicationInfo.concentration}
        >
          Calculate Dosage
          <FaCalculator />
        </button>
      </div>
    </motion.div>
  );

  const renderResult = () => (
    <motion.div 
      className="calculation-result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="result-header">
        <h3>Dosage Calculation Result</h3>
        <div className="patient-summary">
          <span>Patient: {patientInfo.weight}kg, {ageGroups.find(g => g.id === patientInfo.age)?.label}</span>
          <span>Medication: {medicationInfo.name}</span>
        </div>
      </div>

      <div className="result-details">
        <div className="calculated-dose">
          <div className="dose-display">
            <span className="dose-value">{calculationResult.calculatedDose}</span>
            <span className="dose-unit">{calculationResult.doseUnit}</span>
          </div>
          <p className="dose-label">Calculated Dose</p>
        </div>

        <div className="dose-info-grid">
          <div className="info-item">
            <span className="label">Frequency:</span>
            <span className="value">{calculationResult.frequency}</span>
          </div>
          <div className="info-item">
            <span className="label">Patient Weight:</span>
            <span className="value">{patientInfo.weight} kg</span>
          </div>
          <div className="info-item">
            <span className="label">Concentration:</span>
            <span className="value">{medicationInfo.concentration} {medicationInfo.unit}</span>
          </div>
          {calculationResult.maxDailyDose > 0 && (
            <div className="info-item">
              <span className="label">Max Daily Dose:</span>
              <span className="value">{calculationResult.maxDailyDose} {calculationResult.doseUnit}</span>
            </div>
          )}
        </div>

        {calculationResult.warnings.length > 0 && (
          <div className="warnings-section">
            <h4>⚠️ Important Warnings</h4>
            <ul>
              {calculationResult.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="safety-notice">
        <FaShieldAlt className="safety-icon" />
        <div className="safety-content">
          <h4>Safety Reminders</h4>
          <ul>
            <li>Always verify this calculation with a healthcare provider</li>
            <li>Check for drug interactions and contraindications</li>
            <li>Monitor for adverse effects after administration</li>
            <li>Follow proper administration techniques</li>
          </ul>
        </div>
      </div>

      <div className="result-actions">
        <button
          className="new-calculation-btn"
          onClick={resetCalculator}
        >
          <FaCalculator />
          New Calculation
        </button>
        
        <button
          className="save-result-btn"
          onClick={() => {
            // In a real app, this would save to a database
            alert('Result saved to calculation history');
          }}
        >
          <FaCheckCircle />
          Save Result
        </button>
      </div>
    </motion.div>
  );

  const renderHistory = () => (
    <motion.div 
      className="calculation-history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Calculation History</h3>
      {calculationHistory.length === 0 ? (
        <div className="no-history">
          <FaCalculator className="no-history-icon" />
          <p>No previous calculations found.</p>
        </div>
      ) : (
        <div className="history-list">
          {calculationHistory.map((calc, index) => (
            <motion.div
              key={index}
              className="history-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="history-header">
                <span className="medication-name">{calc.medicationInfo.name}</span>
                <span className="calculation-date">
                  {calc.timestamp.toLocaleDateString()}
                </span>
              </div>
              <div className="history-details">
                <span className="dose-info">
                  {calc.calculatedDose} {calc.doseUnit} - {calc.frequency}
                </span>
                <span className="patient-info">
                  {calc.patientInfo.weight}kg, {ageGroups.find(g => g.id === calc.patientInfo.age)?.label}
                </span>
              </div>
              {calc.warnings.length > 0 && (
                <div className="history-warnings">
                  <FaExclamationTriangle />
                  <span>{calc.warnings.length} warning(s)</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="dosage-calculator">
      <div className="calculator-header">
        <FaCalculator className="header-icon" />
        <h2>Dosage Calculator</h2>
        <p>Safe and accurate medication dosage calculations for pediatric and weight-based dosing</p>
      </div>

      <div className="calculator-navigation">
        <button 
          className={`nav-tab ${currentStep === 'welcome' ? 'active' : ''}`}
          onClick={() => setCurrentStep('welcome')}
        >
          <FaInfoCircle />
          Welcome
        </button>
        <button 
          className={`nav-tab ${currentStep === 'patient-info' ? 'active' : ''}`}
          onClick={() => setCurrentStep('patient-info')}
        >
          <FaUser />
          Patient Info
        </button>
        <button 
          className={`nav-tab ${currentStep === 'medication-info' ? 'active' : ''}`}
          onClick={() => setCurrentStep('medication-info')}
        >
          <FaPills />
          Medication
        </button>
        <button 
          className={`nav-tab ${currentStep === 'result' ? 'active' : ''}`}
          onClick={() => setCurrentStep('result')}
          disabled={!calculationResult}
        >
          <FaCalculator />
          Result
        </button>
        <button 
          className={`nav-tab ${currentStep === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentStep('history')}
        >
          <FaClock />
          History
        </button>
      </div>

      <div className="calculator-content">
        {currentStep === 'welcome' && renderWelcome()}
        {currentStep === 'patient-info' && renderPatientInfo()}
        {currentStep === 'medication-info' && renderMedicationInfo()}
        {currentStep === 'result' && calculationResult && renderResult()}
        {currentStep === 'history' && renderHistory()}
      </div>
    </div>
  );
};

export default DosageCalculator;
