import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalculator,
  FaBrain,
  FaAppleAlt,
  FaDumbbell,
  FaBed,
  FaHeartbeat,
  FaEye,
  FaTooth,
  FaPills,
  FaHospital,
  FaSearch,
  FaLeaf,
  FaUtensils,
  FaSyringe,
  FaTimes,
  FaPlus,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaUserMd,
  FaThermometerHalf,
  FaTint,
  FaWeight,
  FaRuler,
  FaInfoCircle,
  FaExpand,
  FaCompress,
  FaClock,
  FaUserMd as FaUserMd2,
  FaFlask,
  FaMicrophone,
  FaEye as FaEye2,
  FaTooth as FaTooth2,
  FaAmbulance,
  FaChartLine,
  FaHeart,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt as FaShieldAlt2,
  FaUserMd as FaUserMd3,
  FaTooth as FaTooth3,
  FaBed as FaBed2,
  FaWater,
  FaClock as FaClock2,
  FaInfoCircle as FaInfoCircle2,
  FaArrowRight as FaArrowRight2,
  FaArrowLeft,
  FaWeight as FaWeight2,
  FaRuler as FaRuler2,
  FaUserMd as FaUserMd4,
  FaFlask as FaFlask2,
  FaThermometerHalf as FaThermometerHalf2,
  FaExclamationTriangle as FaExclamationTriangle2,
  FaCheckCircle as FaCheckCircle2,
  FaShieldAlt as FaShieldAlt3,
  FaUserMd as FaUserMd5,
  FaTooth as FaTooth4,
  FaEye as FaEye3,
  FaBed as FaBed3,
  FaInfoCircle as FaInfoCircle3,
  FaExpand as FaExpand2,
  FaCompress as FaCompress2,
  FaClock as FaClock3,
  FaUserMd as FaUserMd6,
  FaChartLine as FaChartLine2,
  FaHeart as FaHeart2,
  FaTint as FaTint2,
  FaPlus as FaPlus2,
  FaTrash,
  FaCheck,
  FaGift,
  FaTrophy,
  FaMedal,
  FaCertificate,
  FaAward,
  FaRibbon,
  FaCrown,
  FaGem,
  FaDiamond,
  FaCoins,
  FaBitcoin,
  FaEthereum,
  FaDollarSign,
  FaEuro,
  FaPoundSign,
  FaYenSign,
  FaRupeeSign
} from 'react-icons/fa';
import './HealthToolsPage.css';

// Import all health tool components
import BMIHealthCalculator from './BMIHealthCalculator';
import HealthcareChatbot from './HealthcareChatbot';
import NutritionDietPlanner from './NutritionDietPlanner';
import WorkoutExerciseGuide from './WorkoutExerciseGuide';
import SleepQualityAnalyzer from './SleepQualityAnalyzer';
import VitalSignsMonitor from './VitalSignsMonitor';
import VisionHealthChecker from './VisionHealthChecker';
import DentalHealthGuide from './DentalHealthGuide';
import MedicationTracker from './MedicationTracker';
import HospitalFinderReviews from './HospitalFinderReviews';
import SymptomChecker from './SymptomChecker';
import AlternativeMedicines from './AlternativeMedicines';
import SideEffectTracker from './SideEffectTracker';
import DosageCalculator from './DosageCalculator';

const HealthToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);

  const healthTools = [
    {
      id: 'bmi-calculator',
      title: 'BMI Health Calculator',
      description: 'Calculate BMI, body fat percentage, and get personalized health recommendations',
      icon: <FaCalculator />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      component: BMIHealthCalculator
    },
    {
      id: 'ai-assistant',
      title: 'AI Healthcare Assistant',
      description: 'Get instant health advice and answers to your medical questions',
      icon: <FaBrain />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      component: HealthcareChatbot
    },
    {
      id: 'nutrition-planner',
      title: 'Nutrition & Diet Planner',
      description: 'Plan meals, track nutrition, and get personalized diet recommendations',
      icon: <FaAppleAlt />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      component: NutritionDietPlanner
    },
    {
      id: 'workout-guide',
      title: 'Workout & Exercise Guide',
      description: 'Access workout routines, exercise tutorials, and fitness tracking',
      icon: <FaDumbbell />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      component: WorkoutExerciseGuide
    },
    {
      id: 'sleep-analyzer',
      title: 'Sleep Quality Analyzer',
      description: 'Track sleep patterns, analyze quality, and get improvement tips',
      icon: <FaBed />,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      component: SleepQualityAnalyzer
    },
    {
      id: 'vital-signs',
      title: 'Vital Signs Monitor',
      description: 'Monitor blood pressure, heart rate, temperature, and other vital signs',
      icon: <FaHeartbeat />,
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      component: VitalSignsMonitor
    },
    {
      id: 'vision-checker',
      title: 'Vision Health Checker',
      description: 'Screen time tracking, vision tests, and eye health recommendations',
      icon: <FaEye />,
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      component: VisionHealthChecker
    },
    {
      id: 'dental-guide',
      title: 'Dental Health Guide',
      description: 'Track oral hygiene, monitor dental health, and get expert care tips',
      icon: <FaTooth />,
      gradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
      component: DentalHealthGuide
    },
    {
      id: 'medication-tracker',
      title: 'Medication Tracker',
      description: 'Manage medications, track dosages, and never miss a dose',
      icon: <FaPills />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      component: MedicationTracker
    },
    {
      id: 'hospital-finder',
      title: 'Hospital Finder & Reviews',
      description: 'Find nearby hospitals, read reviews, and book appointments',
      icon: <FaHospital />,
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      component: HospitalFinderReviews
    },
    {
      id: 'symptom-checker',
      title: 'Symptom Checker',
      description: 'AI-powered symptom analysis and health recommendations',
      icon: <FaSearch />,
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      component: SymptomChecker
    },
    {
      id: 'alternative-medicines',
      title: 'Alternative Medicines',
      description: 'Discover generic alternatives and substitute medicines',
      icon: <FaLeaf />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      component: AlternativeMedicines
    },
    {
      id: 'side-effect-tracker',
      title: 'Side Effect Tracker',
      description: 'Track and monitor medication side effects',
      icon: <FaUtensils />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      component: SideEffectTracker
    },
    {
      id: 'dosage-calculator',
      title: 'Dosage Calculator',
      description: 'Calculate pediatric and weight-based medication dosages',
      icon: <FaSyringe />,
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      component: DosageCalculator
    }
  ];

  const visibleTools = healthTools;

  const renderToolContent = () => {
    if (!selectedTool) return null;

    const tool = healthTools.find(t => t.id === selectedTool);
    if (!tool) return null;

    const ToolComponent = tool.component;

    return (
      <motion.div
        className="tool-fullscreen"
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="tool-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="tool-header-content">
            <div className="tool-title-section">
              <motion.div
                className="tool-icon"
                style={{ background: tool.gradient }}
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                {tool.icon}
              </motion.div>
              <div>
                <h1 className="tool-title">{tool.title}</h1>
                <p className="tool-subtitle">{tool.description}</p>
              </div>
            </div>
            <motion.button
              className="tool-close-btn"
              onClick={() => setSelectedTool(null)}
              whileHover={{
                scale: 1.2,
                rotate: 90,
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="tool-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <ToolComponent />
        </motion.div>
      </motion.div>
    );
  };

  if (selectedTool) {
    return (
      <div className="health-tools-fullscreen">
        <AnimatePresence mode="wait">
          {renderToolContent()}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="health-tools-page">
      {/* Advanced Floating Background Elements */}
      <div className="floating-elements">
        <motion.div
          className="floating-element element-1"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.2, 1],
            borderRadius: ["50%", "30%", "50%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="floating-element element-2"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -15, 0],
            scale: [1, 0.8, 1],
            borderRadius: ["50%", "60%", "50%"]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="floating-element element-3"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 20, 0],
            scale: [1, 1.3, 1],
            borderRadius: ["50%", "40%", "50%"]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="floating-element element-4"
          animate={{
            y: [0, 35, 0],
            rotate: [0, -25, 0],
            scale: [1, 0.7, 1],
            borderRadius: ["50%", "70%", "50%"]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="floating-element element-5"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1],
            borderRadius: ["50%", "45%", "50%"]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Additional Floating Elements */}
        <motion.div
          className="floating-element element-6"
          animate={{
            y: [0, -45, 0],
            rotate: [0, 30, 0],
            scale: [1, 1.4, 1],
            borderRadius: ["50%", "25%", "50%"]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="floating-element element-7"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -35, 0],
            scale: [1, 0.6, 1],
            borderRadius: ["50%", "80%", "50%"]
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div
          className="floating-element element-8"
          animate={{
            y: [0, -35, 0],
            rotate: [0, 25, 0],
            scale: [1, 1.25, 1],
            borderRadius: ["50%", "35%", "50%"]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        <motion.div
          className="floating-element element-9"
          animate={{
            y: [0, 50, 0],
            rotate: [0, -20, 0],
            scale: [1, 0.9, 1],
            borderRadius: ["50%", "55%", "50%"]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
          }}
        />
        <motion.div
          className="floating-element element-10"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 40, 0],
            scale: [1, 1.15, 1],
            borderRadius: ["50%", "50%", "50%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4.5
          }}
        />

        {/* Animated Geometric Shapes */}
        <motion.div
          className="geometric-shape shape-1"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="geometric-shape shape-2"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        <motion.div
          className="geometric-shape shape-3"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
        />

        {/* Particle Effects */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Sparkle Effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 1,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div
              className="sparkle-icon"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaStar />
            </motion.div>
            Health Tools Hub
            <motion.div
              className="sparkle-icon"
              animate={{
                rotate: [0, -360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5
              }}
            >
              <FaStar />
            </motion.div>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Your comprehensive health companion with {visibleTools.length} powerful tools
          </motion.p>

          <motion.div
            className="hero-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="feature-tag">🏥 AI-Powered</div>
            <div className="feature-tag">🔒 Privacy-First</div>
            <div className="feature-tag">📱 Mobile-Friendly</div>
            <div className="feature-tag">⚡ Real-Time</div>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.div
              className="stat-item"
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                transition: { duration: 0.3 }
              }}
            >
              <span className="stat-number">{visibleTools.length}</span>
              <span className="stat-label">Health Tools</span>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{
                scale: 1.1,
                rotateY: -10,
                transition: { duration: 0.3 }
              }}
            >
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available</span>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                transition: { duration: 0.3 }
              }}
            >
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Main Disclaimer Banner */}
      <motion.div
        className="main-disclaimer-banner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <div className="disclaimer-content">
          <motion.div
            className="disclaimer-icon"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaShieldAlt />
          </motion.div>
          <div className="disclaimer-text">
            <h3>Medical Disclaimer</h3>
            <p>These tools are for informational purposes only and should not replace professional medical advice.</p>
          </div>
          <motion.button
            className="disclaimer-toggle"
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
          >
            {showDisclaimer ? <FaCompress /> : <FaExpand />}
          </motion.button>
        </div>

        <AnimatePresence>
          {showDisclaimer && (
            <motion.div
              className="disclaimer-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>Always consult with qualified healthcare professionals for medical decisions. These tools provide general information and should be used as supplementary resources only.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>



      {/* Features Overview Section */}
      <motion.section
        className="features-overview-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="features-overview-content">
          <motion.h2
            className="features-overview-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Why Choose Health Tools Hub?
          </motion.h2>

          <div className="features-overview-grid">
            <motion.div
              className="feature-overview-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="feature-overview-icon">🤖</div>
              <h3>AI-Powered Insights</h3>
              <p>Advanced machine learning algorithms provide personalized health recommendations and intelligent symptom analysis.</p>
              <ul>
                <li>Smart symptom checker</li>
                <li>Personalized recommendations</li>
                <li>Predictive health insights</li>
              </ul>
            </motion.div>

            <motion.div
              className="feature-overview-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="feature-overview-icon">🔒</div>
              <h3>Privacy & Security</h3>
              <p>Your health data is protected with enterprise-grade security and HIPAA-compliant privacy measures.</p>
              <ul>
                <li>End-to-end encryption</li>
                <li>Local data processing</li>
                <li>No data sharing</li>
              </ul>
            </motion.div>

            <motion.div
              className="feature-overview-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="feature-overview-icon">📊</div>
              <h3>Comprehensive Analytics</h3>
              <p>Track your health progress with detailed analytics, trends, and insights over time.</p>
              <ul>
                <li>Health trend analysis</li>
                <li>Progress tracking</li>
                <li>Customizable reports</li>
              </ul>
            </motion.div>

            <motion.div
              className="feature-overview-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="feature-overview-icon">🌐</div>
              <h3>Cross-Platform Access</h3>
              <p>Access your health tools seamlessly across all devices - web, mobile, and tablet.</p>
              <ul>
                <li>Responsive design</li>
                <li>Offline capabilities</li>
                <li>Sync across devices</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tools Section */}
      <section className="tools-section">
        <motion.div
          className="tools-section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <h2 className="tools-section-title">Available Health Tools</h2>
          <p className="tools-section-subtitle">
            Explore our comprehensive suite of {visibleTools.length} health management tools designed to empower your wellness journey
          </p>
        </motion.div>

        <motion.div
          className="tools-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.6 }}
        >
          {visibleTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className="tool-card"
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
              animate={{
                opacity: 1,
                y: [0, -5, 0],
                scale: 1,
                rotateX: 0,
                rotateZ: [0, 1, -1, 0]
              }}
              transition={{
                delay: 1.5 + (index * 0.1),
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                },
                rotateZ: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }
              }}
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredTool(tool.id)}
              onHoverEnd={() => setHoveredTool(null)}
            >
              <div className="tool-card-header">
                <motion.div
                  className="tool-card-icon"
                  style={{ background: tool.gradient }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  {tool.icon}
                </motion.div>
              </div>

              <div className="tool-card-info">
                <h3 className="tool-card-title">{tool.title}</h3>
                <p className="tool-card-description">{tool.description}</p>
              </div>

              <div className="tool-card-footer">
                <motion.button
                  className="tool-card-action"
                  onClick={() => setSelectedTool(tool.id)}
                  whileHover={{
                    scale: 1.1,
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span>Open Tool</span>
                  <motion.div
                    animate={{ x: hoveredTool === tool.id ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.button>
              </div>

              {/* Advanced Glow Effect */}
              <motion.div
                className="tool-card-glow"
                style={{ background: tool.gradient }}
                animate={{
                  opacity: hoveredTool === tool.id ? 0.2 : 0,
                  scale: hoveredTool === tool.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Particle Trail Effect */}
              {hoveredTool === tool.id && (
                <motion.div
                  className="particle-trail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="trail-particle"
                      style={{ background: tool.gradient }}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        opacity: 0
                      }}
                      animate={{
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Statistics Section */}
      <motion.section
        className="statistics-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}
      >
        <div className="statistics-content">
          <motion.h2
            className="statistics-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            Health Tools Hub Impact
          </motion.h2>

          <div className="statistics-grid">
            <motion.div
              className="statistic-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="statistic-number">50K+</div>
              <div className="statistic-label">Active Users</div>
              <div className="statistic-description">Trusted by healthcare professionals and individuals worldwide</div>
            </motion.div>

            <motion.div
              className="statistic-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="statistic-number">1M+</div>
              <div className="statistic-label">Health Checks</div>
              <div className="statistic-description">Comprehensive health assessments completed</div>
            </motion.div>

            <motion.div
              className="statistic-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="statistic-number">99.9%</div>
              <div className="statistic-label">Uptime</div>
              <div className="statistic-description">Reliable service available 24/7</div>
            </motion.div>

            <motion.div
              className="statistic-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="statistic-number">4.9★</div>
              <div className="statistic-label">User Rating</div>
              <div className="statistic-description">Highly rated by our community</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        className="info-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9, duration: 0.6 }}
      >
        <div className="info-grid">
          <motion.div
            className="info-card"
            whileHover={{
              y: -10,
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="info-icon"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaUserMd />
            </motion.div>
            <h3>Professional Grade</h3>
            <p>Tools designed with medical professionals in mind</p>
          </motion.div>

          <motion.div
            className="info-card"
            whileHover={{
              y: -10,
              scale: 1.05,
              rotateY: -5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="info-icon"
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <FaShieldAlt />
            </motion.div>
            <h3>Privacy First</h3>
            <p>Your health data is secure and private</p>
          </motion.div>

          <motion.div
            className="info-card"
            whileHover={{
              y: -10,
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="info-icon"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <FaClock />
            </motion.div>
            <h3>Always Available</h3>
            <p>Access your health tools anytime, anywhere</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="health-tools-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <p>© {new Date().getFullYear()} MediCore - Health Tools Hub. Empowering your health journey.</p>
      </motion.footer>
    </div>
  );
};

export default HealthToolsPage;
