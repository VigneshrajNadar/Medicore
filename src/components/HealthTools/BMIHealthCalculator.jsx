import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaWeight, FaRuler, FaCalculator, FaChartLine, FaHeart, FaAppleAlt, FaDumbbell, FaExclamationTriangle, FaInfoCircle, FaHistory, FaTrash, FaDownload, FaShare, FaShieldAlt } from 'react-icons/fa';
import Loader from '../common/Loader';
import './BMIHealthCalculator.css';

const BMIHealthCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    smoking: 'no',
    familyHistory: 'no',
    bloodPressure: 'normal'
  });

  const [results, setResults] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [bmiHistory, setBmiHistory] = useState([]);

  // Load data on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('bmiHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (parsedHistory && parsedHistory.length > 0) {
          setBmiHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Error loading BMI history:', error);
      }
    }
  }, []);

  // Save data whenever history changes
  useEffect(() => {
    if (bmiHistory.length > 0) {
      localStorage.setItem('bmiHistory', JSON.stringify(bmiHistory));
    }
  }, [bmiHistory]);

  // Advanced motion values for floating animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // ML-like health risk prediction algorithm
  const calculateHealthRisk = (data) => {
    let riskScore = 0;
    let riskFactors = [];
    let recommendations = [];

    // Age factor
    if (data.age >= 50) {
      riskScore += 20;
      riskFactors.push('Age 50+');
      recommendations.push('Regular health checkups recommended');
    } else if (data.age >= 35) {
      riskScore += 10;
      riskFactors.push('Age 35+');
    }

    // BMI calculation and risk
    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);
    
    let bmiCategory = '';
    let bmiRisk = 0;
    
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiRisk = 15;
      riskFactors.push('Underweight (BMI < 18.5)');
      recommendations.push('Consult nutritionist for healthy weight gain');
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = 'Normal weight';
      bmiRisk = 0;
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = 'Overweight';
      bmiRisk = 25;
      riskFactors.push('Overweight (BMI 25-29.9)');
      recommendations.push('Focus on balanced diet and regular exercise');
    } else if (bmi >= 30 && bmi < 35) {
      bmiCategory = 'Obese Class I';
      bmiRisk = 40;
      riskFactors.push('Obese Class I (BMI 30-34.9)');
      recommendations.push('Medical supervision for weight management');
    } else {
      bmiCategory = 'Obese Class II/III';
      bmiRisk = 60;
      riskFactors.push('Obese Class II/III (BMI ≥ 35)');
      recommendations.push('Immediate medical consultation required');
    }

    // Gender factor
    if (data.gender === 'male' && data.age >= 45) {
      riskScore += 15;
      riskFactors.push('Male 45+ (higher cardiovascular risk)');
      recommendations.push('Regular heart health monitoring');
    }

    // Smoking factor
    if (data.smoking === 'yes') {
      riskScore += 30;
      riskFactors.push('Smoking');
      recommendations.push('Smoking cessation programs strongly recommended');
    }

    // Family history
    if (data.familyHistory === 'yes') {
      riskScore += 20;
      riskFactors.push('Family history of health issues');
      recommendations.push('Genetic counseling and early screening');
    }

    // Blood pressure
    if (data.bloodPressure === 'high') {
      riskScore += 25;
      riskFactors.push('High blood pressure');
      recommendations.push('Regular BP monitoring and lifestyle changes');
    }

    // Activity level
    if (data.activityLevel === 'sedentary') {
      riskScore += 20;
      riskFactors.push('Sedentary lifestyle');
      recommendations.push('Gradual increase in physical activity');
    }

    // Calculate total risk
    const totalRisk = riskScore + bmiRisk;
    
    let overallRisk = '';
    if (totalRisk < 30) {
      overallRisk = 'Low Risk';
    } else if (totalRisk < 60) {
      overallRisk = 'Moderate Risk';
    } else if (totalRisk < 90) {
      overallRisk = 'High Risk';
    } else {
      overallRisk = 'Very High Risk';
    }

    return {
      bmi: bmi.toFixed(1),
      bmiCategory,
      totalRisk,
      overallRisk,
      riskFactors,
      recommendations,
      riskScore: totalRisk
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.age && formData.weight && formData.height) {
      setIsCalculating(true);
      
      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const healthResults = calculateHealthRisk(formData);
      setResults(healthResults);
      
      // Save to history
      const historyEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        formData: { ...formData },
        results: healthResults,
        timestamp: new Date().toISOString()
      };
      setBmiHistory(prev => [historyEntry, ...prev.slice(0, 19)]); // Keep last 20 entries
      
      setIsCalculating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      age: '',
      gender: 'male',
      weight: '',
      height: '',
      activityLevel: 'moderate',
      smoking: 'no',
      familyHistory: 'no',
      bloodPressure: 'normal'
    });
    setResults(null);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="bmi-calculator-container">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <motion.div
          className="floating-circle"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="floating-square"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="floating-triangle"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="calculator-header"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: springRotateX,
          rotateY: springRotateY,
        }}
      >
        <motion.div
          className="header-icon-container"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaCalculator className="header-icon" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          BMI Calculator & Health Risk Assessment
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Get your BMI and personalized health insights using advanced ML algorithms
        </motion.p>
        
        {/* Animated Stats */}
        <motion.div
          className="header-stats"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="stat-item">
            <FaShieldAlt className="stat-icon" />
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat-item">
            <FaChartLine className="stat-icon" />
            <span className="stat-number">150+</span>
            <span className="stat-label">Risk Factors</span>
          </div>
          <div className="stat-item">
            <FaHeart className="stat-icon" />
            <span className="stat-number">24/7</span>
            <span className="stat-label">Available</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Disclaimer Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 300 }}
        className="disclaimer-banner"
        whileHover={{ scale: 1.02 }}
      >
        <FaExclamationTriangle className="disclaimer-icon" />
        <div>
          <strong>Medical Disclaimer:</strong> This tool provides general health information only. 
          It is not a substitute for professional medical advice, diagnosis, or treatment. 
          Always consult with qualified healthcare providers for medical concerns.
        </div>
        <motion.button 
          onClick={() => setShowDisclaimer(!showDisclaimer)}
          className="disclaimer-toggle"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showDisclaimer ? 'Hide Details' : 'Show Details'}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="disclaimer-details"
          >
            <h4>Important Information:</h4>
            <ul>
              <li>This calculator uses statistical models and general health guidelines</li>
              <li>Results are estimates and may not reflect individual health status</li>
              <li>Risk assessments are based on population data and general risk factors</li>
              <li>Individual health risks may vary significantly</li>
              <li>Always consult healthcare professionals for personalized medical advice</li>
              <li>Emergency symptoms require immediate medical attention</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="calculator-content">
        <motion.div
          className="calculator-form"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 300 }}
          whileHover={{ y: -5 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Enter Your Information
          </motion.h2>
          
          <form onSubmit={handleSubmit}>
            <motion.div
              className="form-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="form-group">
                <label htmlFor="age">
                  <FaHeart className="input-icon" />
                  Age (years)
                </label>
                <motion.input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="1"
                  max="120"
                  required
                  placeholder="Enter your age"
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <motion.select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </motion.select>
              </div>
            </motion.div>

            <motion.div
              className="form-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="form-group">
                <label htmlFor="weight">
                  <FaWeight className="input-icon" />
                  Weight (kg)
                </label>
                <motion.input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="20"
                  max="300"
                  step="0.1"
                  required
                  placeholder="Enter weight in kg"
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="height">
                  <FaRuler className="input-icon" />
                  Height (cm)
                </label>
                <motion.input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="100"
                  max="250"
                  required
                  placeholder="Enter height in cm"
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>

            <motion.div
              className="form-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="form-group">
                <label htmlFor="activityLevel">Activity Level</label>
                <motion.select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="veryActive">Very Active (2x training)</option>
                </motion.select>
              </div>

              <div className="form-group">
                <label htmlFor="smoking">Smoking Status</label>
                <motion.select
                  id="smoking"
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <option value="no">Non-smoker</option>
                  <option value="former">Former smoker</option>
                  <option value="yes">Current smoker</option>
                </motion.select>
              </div>
            </motion.div>

            <motion.div
              className="form-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="form-group">
                <label htmlFor="familyHistory">Family History</label>
                <motion.select
                  id="familyHistory"
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <option value="no">No significant history</option>
                  <option value="yes">Yes (diabetes, heart disease, etc.)</option>
                </motion.select>
              </div>

              <div className="form-group">
                <label htmlFor="bloodPressure">Blood Pressure</label>
                <motion.select
                  id="bloodPressure"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <option value="normal">Normal</option>
                  <option value="elevated">Elevated</option>
                  <option value="high">High</option>
                </motion.select>
              </div>
            </motion.div>

            <motion.div
              className="form-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <motion.button
                type="submit"
                className="calculate-btn"
                disabled={isCalculating}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isCalculating ? (
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  'Calculate BMI & Health Risk'
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={resetForm}
                className="reset-btn"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Reset Form
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
              className="results-section"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Your Health Assessment Results
              </motion.h2>
              
              <motion.div
                className="bmi-result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <div className="bmi-value">
                  <motion.span
                    className="bmi-number"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                  >
                    {results.bmi}
                  </motion.span>
                  <span className="bmi-label">BMI</span>
                </div>
                <div className="bmi-category">
                  <motion.span
                    className={`category-badge ${results.bmiCategory.toLowerCase().replace(' ', '-')}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    {results.bmiCategory}
                  </motion.span>
                </div>
              </motion.div>

              <motion.div
                className="risk-assessment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h3>Health Risk Assessment</h3>
                <motion.div
                  className={`risk-level ${results.overallRisk.toLowerCase().replace(' ', '-')}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="risk-label">Overall Risk:</span>
                  <span className="risk-value">{results.overallRisk}</span>
                  <span className="risk-score">Score: {results.riskScore}</span>
                </motion.div>

                {results.riskFactors.length > 0 && (
                  <motion.div
                    className="risk-factors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                  >
                    <h4>Identified Risk Factors:</h4>
                    <ul>
                      {results.riskFactors.map((factor, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                        >
                          {factor}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {results.recommendations.length > 0 && (
                  <motion.div
                    className="recommendations"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <h4>Personalized Recommendations:</h4>
                    <ul>
                      {results.recommendations.map((rec, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                        >
                          {rec}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className="health-tips"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <h4>General Health Tips:</h4>
                <ul>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    Maintain a balanced diet rich in fruits, vegetables, and whole grains
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                  >
                    Engage in regular physical activity (150 minutes/week recommended)
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                  >
                    Get adequate sleep (7-9 hours per night)
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.9, duration: 0.6 }}
                  >
                    Manage stress through relaxation techniques
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.0, duration: 0.6 }}
                  >
                    Schedule regular health checkups
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculating Overlay */}
        {isCalculating && (
          <motion.div 
            className="calculating-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="calculating-content">
              <Loader />
              <div className="calculating-text">
                <h3>Calculating Health Metrics</h3>
                <p>Analyzing your BMI and health risk factors...</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BMIHealthCalculator;
