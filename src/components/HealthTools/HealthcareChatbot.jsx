import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaCompress, FaRobot, FaUser, FaPaperPlane, FaMicrophone, FaBrain, FaShieldAlt, FaChartLine, FaDumbbell, FaAppleAlt, FaBed, FaThermometerHalf, FaEye, FaTooth, FaPills, FaHospital, FaClock } from 'react-icons/fa';
import Loader from '../common/Loader';
import './HealthcareChatbot.css';

const HealthcareChatbot = ({ size = 'normal', onSizeChange }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [dismissedDisclaimers, setDismissedDisclaimers] = useState([]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Load saved chat messages on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat messages:', error);
      }
    } else {
      // Initialize with welcome message
      setMessages([{
        id: 1,
        text: "Hello! I'm your AI health assistant. I can help answer general health questions, but remember that I'm not a substitute for professional medical advice. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Enhanced health knowledge base
  const healthKnowledgeBase = {
    'general health': {
      response: "Maintaining good health involves regular exercise, balanced nutrition, adequate sleep, and stress management. Regular check-ups with healthcare providers are also important for preventive care.",
      disclaimer: "This is general health advice. Consult with healthcare professionals for personalized recommendations."
    },
    'exercise': {
      response: "Regular physical activity helps maintain cardiovascular health, strengthens muscles, improves mental health, and helps with weight management. Aim for at least 150 minutes of moderate exercise per week.",
      disclaimer: "Exercise recommendations may vary based on individual health conditions. Consult a doctor before starting a new exercise program."
    },
    'nutrition': {
      response: "A balanced diet should include fruits, vegetables, whole grains, lean proteins, and healthy fats. Stay hydrated and limit processed foods, added sugars, and excessive salt intake.",
      disclaimer: "Nutritional needs vary by individual. Consider consulting a registered dietitian for personalized advice."
    },
    'sleep': {
      response: "Adults typically need 7-9 hours of quality sleep per night. Good sleep hygiene includes maintaining a regular schedule, creating a restful environment, and avoiding screens before bedtime.",
      disclaimer: "Sleep requirements can vary. Persistent sleep issues should be discussed with a healthcare provider."
    },
    'stress': {
      response: "Chronic stress can negatively impact health. Stress management techniques include meditation, deep breathing, regular exercise, adequate sleep, and seeking support from friends, family, or professionals.",
      disclaimer: "If stress is overwhelming or persistent, consider seeking help from a mental health professional."
    },
    'mental health': {
      response: "Mental health is as important as physical health. Signs of mental health concerns include persistent sadness, anxiety, changes in sleep or appetite, and withdrawal from activities. Professional help is available and effective.",
      disclaimer: "Mental health concerns should be addressed with qualified mental health professionals."
    },
    'preventive care': {
      response: "Preventive care includes regular check-ups, vaccinations, screenings, and lifestyle modifications. Early detection of health issues can lead to better outcomes and more effective treatment.",
      disclaimer: "Preventive care recommendations vary by age, gender, and risk factors. Consult your healthcare provider."
    },
    'medication': {
      response: "Always take medications as prescribed by your healthcare provider. Keep a list of all medications, including over-the-counter drugs and supplements. Report any side effects or concerns to your doctor.",
      disclaimer: "Never stop or change medications without consulting your healthcare provider."
    },
    'emergency': {
      response: "In medical emergencies, call emergency services immediately. Signs of emergency include chest pain, difficulty breathing, severe bleeding, sudden weakness, and loss of consciousness.",
      disclaimer: "This information is for general guidance. Always call emergency services for serious medical situations."
    },
    'chronic conditions': {
      response: "Chronic conditions require ongoing management through medication, lifestyle changes, and regular monitoring. Work closely with healthcare providers to develop and maintain an effective treatment plan.",
      disclaimer: "Management of chronic conditions should be supervised by healthcare professionals."
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message on component mount
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: "Hello! I'm your AI Healthcare Assistant. I can help you with health-related questions about exercise, nutrition, sleep, stress management, mental health, preventive care, medications, and general wellness topics. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      disclaimer: "I provide general health information only. For medical advice, always consult healthcare professionals.",
      topic: 'welcome'
    };
    setMessages([welcomeMessage]);
  }, []);

  const getHealthResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific health topics
    for (const [topic, data] of Object.entries(healthKnowledgeBase)) {
      if (lowerMessage.includes(topic)) {
        return {
          text: data.response,
          disclaimer: data.disclaimer,
          topic: topic
        };
      }
    }

    // General health guidance
    const generalResponses = [
      "I'm here to help with health-related questions. You can ask me about exercise, nutrition, sleep, stress management, mental health, preventive care, medications, or general wellness topics.",
      "For specific health concerns, it's always best to consult with healthcare professionals. I can provide general information and guidance on common health topics.",
      "Remember that I provide general health information only. Your healthcare provider can give you personalized medical advice based on your specific situation."
    ];

    return {
      text: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      disclaimer: "This is general health information. For medical advice, consult healthcare professionals.",
      topic: 'general'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = getHealthResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        disclaimer: botResponse.disclaimer,
        topic: botResponse.topic
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isDisclaimerDismissed = (topic) => {
    return dismissedDisclaimers.includes(topic);
  };

  const dismissDisclaimer = (topic) => {
    setDismissedDisclaimers(prev => [...prev, topic]);
  };

  const quickQuestions = [
    "How much exercise should I get?",
    "What's a healthy diet?",
    "How can I improve my sleep?",
    "How to manage stress?",
    "Mental health tips",
    "Preventive care advice"
  ];

  return (
    <div className="healthcare-chatbot-full">
      {/* Header */}
      <div className="chatbot-header">
        <div className="header-content">
          <FaRobot className="header-icon" />
          <div className="header-text">
            <h2>AI Healthcare Assistant</h2>
            <p>Get instant answers to your health questions with AI-powered guidance</p>
          </div>
        </div>
        <div className="header-features">
          <div className="feature-badge">
            <FaBrain className="feature-icon" />
            <span>AI-Powered</span>
          </div>
          <div className="feature-badge">
            <FaShieldAlt className="feature-icon" />
            <span>Privacy Safe</span>
          </div>
          <div className="feature-badge">
            <FaClock className="feature-icon" />
            <span>24/7 Available</span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="chatbot-main">
        <div className="chat-container">
          {/* Messages Area */}
          <motion.div 
            className="messages-area"
            ref={chatContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">
                    <div className="message-avatar">
                      {message.sender === 'user' ? (
                        <FaUser className="user-avatar" />
                      ) : (
                        <FaRobot className="bot-avatar" />
                      )}
                    </div>
                    <div className="message-bubble">
                      <p>{message.text}</p>
                      <span className="message-time">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Disclaimer for bot messages */}
                  {message.sender === 'bot' && message.disclaimer && !isDisclaimerDismissed(message.topic) && (
                    <motion.div 
                      className="chat-disclaimer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="disclaimer-header">
                        <FaShieldAlt className="disclaimer-icon" />
                        <span>Important Notice</span>
                        <button 
                          className="close-disclaimer"
                          onClick={() => dismissDisclaimer(message.topic)}
                        >
                          ×
                        </button>
                      </div>
                      <p>{message.disclaimer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                className="typing-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="loader-container">
                  <Loader />
                </div>
                <span>AI is analyzing your health query...</span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </motion.div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <motion.div 
              className="quick-questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Quick Questions</h3>
              <div className="questions-grid">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    className="quick-question-btn"
                    onClick={() => {
                      setInputMessage(question);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Section */}
          <motion.div 
            className="input-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about health, wellness, or medical topics..."
                rows="1"
                className="message-input"
              />
              <div className="input-actions">
                <motion.button
                  className="send-btn"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </div>
            
            {/* Enhanced Mode Indicator */}
            <div className="enhanced-mode">
              <FaBrain className="enhanced-icon" />
              <span>AI-Powered Health Guidance</span>
            </div>
          </motion.div>
        </div>

        {/* Sidebar with Health Topics */}
        <div className="chatbot-sidebar">
          <div className="sidebar-header">
            <h3>Health Topics</h3>
            <p>Click to learn more</p>
          </div>
          <div className="topics-list">
            {Object.keys(healthKnowledgeBase).map((topic, index) => (
              <motion.button
                key={topic}
                className="topic-btn"
                onClick={() => {
                  setInputMessage(`Tell me about ${topic}`);
                  setTimeout(() => handleSendMessage(), 100);
                }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
              >
                <span className="topic-icon">
                  {topic === 'exercise' && <FaDumbbell />}
                  {topic === 'nutrition' && <FaAppleAlt />}
                  {topic === 'sleep' && <FaBed />}
                  {topic === 'stress' && <FaBrain />}
                  {topic === 'mental health' && <FaShieldAlt />}
                  {topic === 'preventive care' && <FaChartLine />}
                  {topic === 'medication' && <FaPills />}
                  {topic === 'emergency' && <FaHospital />}
                  {topic === 'chronic conditions' && <FaThermometerHalf />}
                  {topic === 'general health' && <FaRobot />}
                </span>
                <span className="topic-text">{topic}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
    </div>
  );
};

export default HealthcareChatbot;
