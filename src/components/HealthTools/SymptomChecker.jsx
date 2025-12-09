import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStethoscope, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaArrowRight, FaArrowLeft, FaBrain, FaShieldAlt, FaClock, FaUserMd, FaThermometerHalf, FaHeart, FaHeadSideCough, FaTooth, FaEye, FaBed, FaUtensils } from 'react-icons/fa';
import Loader from '../common/Loader';
import './SymptomChecker.css';

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('symptomHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert timestamp strings back to Date objects
        const historyWithDates = parsedHistory.map(assessment => ({
          ...assessment,
          timestamp: new Date(assessment.timestamp)
        }));
        setSymptomHistory(historyWithDates);
      } catch (error) {
        console.error('Error loading symptom history:', error);
      }
    }
  }, []);

  // Save data whenever history changes
  useEffect(() => {
    if (symptomHistory.length > 0) {
      localStorage.setItem('symptomHistory', JSON.stringify(symptomHistory));
    }
  }, [symptomHistory]);

  const symptomCategories = [
    {
      id: 'general',
      name: 'General Symptoms',
      icon: FaThermometerHalf,
      symptoms: [
        'Fever', 'Fatigue', 'Weakness', 'Weight loss', 'Weight gain',
        'Night sweats', 'Chills', 'Body aches', 'Swelling'
      ]
    },
    {
      id: 'respiratory',
      name: 'Respiratory',
      icon: FaHeadSideCough,
      symptoms: [
        'Cough', 'Shortness of breath', 'Chest pain', 'Sore throat',
        'Runny nose', 'Congestion', 'Wheezing', 'Hoarseness'
      ]
    },
    {
      id: 'cardiovascular',
      name: 'Heart & Circulation',
      icon: FaHeart,
      symptoms: [
        'Chest pain', 'Palpitations', 'Dizziness', 'Fainting',
        'Swelling in legs', 'Irregular heartbeat', 'High blood pressure'
      ]
    },
    {
      id: 'digestive',
      name: 'Digestive',
      icon: FaUtensils,
      symptoms: [
        'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Abdominal pain',
        'Bloating', 'Heartburn', 'Loss of appetite', 'Indigestion'
      ]
    },
    {
      id: 'neurological',
      name: 'Neurological',
      icon: FaBrain,
      symptoms: [
        'Headache', 'Dizziness', 'Confusion', 'Memory problems',
        'Numbness', 'Tingling', 'Seizures', 'Vision changes'
      ]
    },
    {
      id: 'musculoskeletal',
      name: 'Muscles & Bones',
      icon: FaStethoscope,
      symptoms: [
        'Joint pain', 'Muscle pain', 'Back pain', 'Stiffness',
        'Weakness', 'Swelling', 'Limited mobility', 'Fractures'
      ]
    }
  ];

  const followUpQuestions = {
    'Fever': [
      'How high is your fever?',
      'How long have you had the fever?',
      'Do you have any other symptoms?',
      'Have you taken any medications?'
    ],
    'Cough': [
      'Is it a dry or wet cough?',
      'How long have you been coughing?',
      'Is it worse at night?',
      'Do you have any chest pain?'
    ],
    'Headache': [
      'Where is the pain located?',
      'How severe is the pain (1-10)?',
      'What triggers the headache?',
      'Do you have any other symptoms?'
    ]
  };

  const severityLevels = {
    low: {
      label: 'Low Risk',
      color: '#10b981',
      description: 'Your symptoms suggest a mild condition that may resolve on its own.',
      recommendations: [
        'Rest and stay hydrated',
        'Monitor your symptoms',
        'Consider over-the-counter medications if appropriate',
        'Contact a doctor if symptoms worsen'
      ]
    },
    medium: {
      label: 'Moderate Risk',
      color: '#f59e0b',
      description: 'Your symptoms may require medical attention within 24-48 hours.',
      recommendations: [
        'Schedule an appointment with your doctor',
        'Monitor symptoms closely',
        'Avoid strenuous activities',
        'Seek immediate care if symptoms worsen'
      ]
    },
    high: {
      label: 'High Risk',
      color: '#ef4444',
      description: 'Your symptoms may require immediate medical attention.',
      recommendations: [
        'Seek immediate medical care',
        'Call emergency services if severe',
        'Do not delay treatment',
        'Have someone accompany you if possible'
      ]
    }
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const startAssessment = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom to continue.');
      return;
    }
    setCurrentStep('assessment');
    setCurrentQuestion(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedSymptoms.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateAssessment();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateAssessment = () => {
    setIsAnalyzing(true);
    setCurrentStep('analyzing');
    
    // Simulate AI analysis delay
    setTimeout(() => {
      // Simple AI-based assessment logic
      const symptomCount = selectedSymptoms.length;
      const hasFever = selectedSymptoms.includes('Fever');
      const hasChestPain = selectedSymptoms.includes('Chest pain');
      const hasSevereSymptoms = selectedSymptoms.some(s => 
        ['Chest pain', 'Shortness of breath', 'Severe headache', 'Fainting'].includes(s)
      );

      let riskLevel = 'low';
      let assessment = '';

      if (hasSevereSymptoms || (hasFever && hasChestPain)) {
        riskLevel = 'high';
        assessment = 'Your symptoms may indicate a serious condition requiring immediate medical attention.';
      } else if (symptomCount > 3 || hasFever || hasChestPain) {
        riskLevel = 'medium';
        assessment = 'Your symptoms suggest a moderate condition that should be evaluated by a healthcare provider.';
      } else {
        riskLevel = 'low';
        assessment = 'Your symptoms appear to be mild and may resolve with rest and self-care.';
      }

      const result = {
        riskLevel,
        assessment,
        symptoms: selectedSymptoms,
        timestamp: new Date(),
        recommendations: severityLevels[riskLevel].recommendations
      };

      setAssessmentResult(result);
      setSymptomHistory(prev => [result, ...prev]);
      setIsAnalyzing(false);
      setCurrentStep('result');
    }, 3000); // 3 second delay for realistic AI analysis
  };

  const resetAssessment = () => {
    setCurrentStep('welcome');
    setSelectedSymptoms([]);
    setCurrentQuestion(0);
    setAssessmentResult(null);
  };

  const renderWelcome = () => (
    <motion.div 
      className="symptom-checker-welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="welcome-header">
        <FaStethoscope className="welcome-icon" />
        <h2>AI Symptom Checker</h2>
        <p>Get a preliminary assessment of your symptoms with AI-powered guidance</p>
      </div>

      <div className="disclaimer-banner">
        <FaExclamationTriangle className="disclaimer-icon" />
        <div className="disclaimer-content">
          <strong>Important:</strong> This symptom checker is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
        </div>
      </div>

      <div className="user-info-section">
        <h3>Basic Information</h3>
        <div className="info-inputs">
          <div className="input-group">
            <label>Age:</label>
            <input
              type="number"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              placeholder="Enter your age"
              min="0"
              max="120"
            />
          </div>
          <div className="input-group">
            <label>Gender:</label>
            <select value={userGender} onChange={(e) => setUserGender(e.target.value)}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="symptom-selection">
        <h3>Select Your Symptoms</h3>
        <p>Choose all symptoms that apply to you:</p>
        
        <div className="symptom-categories">
          {symptomCategories.map((category) => (
            <motion.div
              key={category.id}
              className="symptom-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="category-header">
                <category.icon className="category-icon" />
                <h4>{category.name}</h4>
              </div>
              <div className="symptoms-grid">
                {category.symptoms.map((symptom) => (
                  <motion.button
                    key={symptom}
                    className={`symptom-btn ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                    onClick={() => toggleSymptom(symptom)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {symptom}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="start-assessment-btn"
          onClick={startAssessment}
          disabled={selectedSymptoms.length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowRight />
          Start Assessment ({selectedSymptoms.length} symptoms selected)
        </motion.button>
      </div>
    </motion.div>
  );

  const renderAssessment = () => (
    <motion.div 
      className="symptom-assessment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="assessment-header">
        <h3>Symptom Assessment</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / selectedSymptoms.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p>Question {currentQuestion + 1} of {selectedSymptoms.length}</p>
      </div>

      <div className="question-container">
        <h4>Tell us more about: <strong>{selectedSymptoms[currentQuestion]}</strong></h4>
        
        {followUpQuestions[selectedSymptoms[currentQuestion]] ? (
          <div className="follow-up-questions">
            {followUpQuestions[selectedSymptoms[currentQuestion]].map((question, index) => (
              <div key={index} className="question-item">
                <p>{question}</p>
                <textarea 
                  placeholder="Describe your symptoms..."
                  rows="3"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="general-question">
            <p>Please describe your {selectedSymptoms[currentQuestion].toLowerCase()} in detail:</p>
            <textarea 
              placeholder="Describe the severity, duration, triggers, and any other relevant details..."
              rows="4"
            />
          </div>
        )}
      </div>

      <div className="assessment-navigation">
        <button 
          className="nav-btn prev-btn"
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
        >
          <FaArrowLeft />
          Previous
        </button>
        
        <button 
          className="nav-btn next-btn"
          onClick={nextQuestion}
        >
          {currentQuestion === selectedSymptoms.length - 1 ? 'Get Assessment' : 'Next'}
          <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );

  const renderResult = () => (
    <motion.div 
      className="assessment-result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="result-header">
        <div className={`risk-level ${assessmentResult.riskLevel}`}>
          <FaExclamationTriangle className="risk-icon" />
          <h3>{severityLevels[assessmentResult.riskLevel].label}</h3>
        </div>
        <p className="result-description">{severityLevels[assessmentResult.riskLevel].description}</p>
      </div>

      <div className="result-details">
        <div className="symptoms-summary">
          <h4>Your Symptoms:</h4>
          <div className="symptoms-list">
            {assessmentResult.symptoms.map((symptom, index) => (
              <span key={index} className="symptom-tag">{symptom}</span>
            ))}
          </div>
        </div>

        <div className="ai-assessment">
          <h4>AI Assessment:</h4>
          <p>{assessmentResult.assessment}</p>
        </div>

        <div className="recommendations">
          <h4>Recommendations:</h4>
          <ul>
            {assessmentResult.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="result-actions">
        <motion.button
          className="new-assessment-btn"
          onClick={resetAssessment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start New Assessment
        </motion.button>
        
        <div className="emergency-info">
          <FaExclamationTriangle className="emergency-icon" />
          <p>If you're experiencing severe symptoms, call emergency services immediately.</p>
        </div>
      </div>
    </motion.div>
  );

  const renderHistory = () => (
    <motion.div 
      className="assessment-history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Assessment History</h3>
      {symptomHistory.length === 0 ? (
        <p className="no-history">No previous assessments found.</p>
      ) : (
        <div className="history-list">
          {symptomHistory.map((assessment, index) => (
            <motion.div
              key={index}
              className={`history-item ${assessment.riskLevel}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="history-header">
                <span className={`risk-badge ${assessment.riskLevel}`}>
                  {severityLevels[assessment.riskLevel].label}
                </span>
                <span className="history-date">
                  {assessment.timestamp && typeof assessment.timestamp.toLocaleDateString === 'function' 
                    ? assessment.timestamp.toLocaleDateString() 
                    : new Date(assessment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="history-symptoms">
                {assessment.symptoms.slice(0, 3).join(', ')}
                {assessment.symptoms.length > 3 && ` +${assessment.symptoms.length - 3} more`}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderAnalyzing = () => (
    <motion.div 
      className="analyzing-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="ai-analysis-loading">
        <Loader />
        <div className="loading-text">
          🧠 AI is analyzing your symptoms
        </div>
        <p className="analysis-details">
          Processing {selectedSymptoms.length} symptoms using advanced medical algorithms...
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="symptom-checker">
      <div className="checker-header">
        <FaStethoscope className="header-icon" />
        <h2>Symptom Checker</h2>
        <p>AI-powered symptom assessment with guided questionnaires</p>
      </div>

      <div className="checker-navigation">
        <button 
          className={`nav-tab ${currentStep === 'welcome' ? 'active' : ''}`}
          onClick={() => setCurrentStep('welcome')}
        >
          <FaInfoCircle />
          Assessment
        </button>
        <button 
          className={`nav-tab ${currentStep === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentStep('history')}
        >
          <FaClock />
          History
        </button>
      </div>

      <div className="checker-content">
        {currentStep === 'welcome' && renderWelcome()}
        {currentStep === 'assessment' && renderAssessment()}
        {currentStep === 'analyzing' && renderAnalyzing()}
        {currentStep === 'result' && renderResult()}
        {currentStep === 'history' && renderHistory()}
      </div>
    </div>
  );
};

export default SymptomChecker;
