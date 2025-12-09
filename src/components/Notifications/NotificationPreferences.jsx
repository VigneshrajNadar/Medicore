import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBell, 
  FaEnvelope, 
  FaSms, 
  FaMobile, 
  FaDesktop, 
  FaCog,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaExclamationTriangle,
  FaClock,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaGift
} from 'react-icons/fa';
import styled from 'styled-components';
import NotificationService from './NotificationService';

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
`;

const PreferencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PreferenceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
`;

const ToggleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToggleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.2);
  }
`;

const ToggleLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ToggleIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const ToggleText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToggleTitle = styled.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
`;

const ToggleDescription = styled.span`
  color: #64748b;
  font-size: 0.85rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #cbd5e1;
  transition: 0.3s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const TestButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    email: {
      orderUpdates: true,
      healthTips: true,
      promotionalOffers: true
    },
    sms: {
      orderUpdates: true,
      healthTips: true,
      promotionalOffers: true
    },
    push: {
      orderUpdates: true,
      healthTips: true,
      promotionalOffers: true
    }
  });

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const notificationService = new NotificationService();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'user_123';
      const userPrefs = await notificationService.getUserPreferences(userId);
      setPreferences(userPrefs);
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const updatePreference = async (channel, type, value) => {
    try {
      const newPreferences = {
        ...preferences,
        [channel]: {
          ...preferences[channel],
          [type]: value
        }
      };
      
      setPreferences(newPreferences);
      
      const userId = localStorage.getItem('userId') || 'user_123';
      await notificationService.updateUserPreferences(userId, newPreferences);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const testNotification = async (type) => {
    setTesting(true);
    setTestResult(null);
    
    try {
      const userId = localStorage.getItem('userId') || 'user_123';
      const result = await notificationService.testNotification(userId, type);
      setTestResult({ success: true, message: `Test ${type} notification sent successfully!` });
    } catch (error) {
      setTestResult({ success: false, message: `Failed to send test notification: ${error.message}` });
    } finally {
      setTesting(false);
    }
  };

  const notificationTypes = [
    {
      key: 'orderUpdates',
      title: 'Order Updates',
      description: 'Get notified about order status changes',
      icon: <FaShoppingCart />,
      iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        testType: 'order'
      },
      {
        key: 'healthTips',
        title: 'Health Tips',
      description: 'Receive daily health tips and wellness advice',
      icon: <FaHeart />,
      iconBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        testType: 'health'
      },
      {
      key: 'promotionalOffers',
      title: 'Promotional Offers',
      description: 'Get notified about special offers and discounts',
      icon: <FaGift />,
      iconBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      testType: 'promotional'
    }
  ];

  const channels = [
    {
      key: 'email',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: <FaEnvelope />,
      iconBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    {
      key: 'sms',
      title: 'SMS Notifications',
      description: 'Receive notifications via SMS',
      icon: <FaSms />,
      iconBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      key: 'push',
      title: 'Push Notifications',
      description: 'Receive notifications in your browser',
      icon: <FaBell />,
      iconBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    }
  ];

  return (
    <Container>
      <Header>
        <Title>Notification Preferences</Title>
        <Subtitle>Customize how you receive notifications from Apollo Clone</Subtitle>
      </Header>

      <PreferencesGrid>
        {channels.map((channel) => (
          <PreferenceCard
            key={channel.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CardIcon style={{ background: channel.iconBg }}>
                {channel.icon}
              </CardIcon>
              <div>
                <CardTitle>{channel.title}</CardTitle>
                <CardDescription>{channel.description}</CardDescription>
              </div>
            </CardHeader>

            <ToggleGroup>
              {notificationTypes.map((type) => (
                <ToggleItem key={type.key}>
                  <ToggleLabel>
                    <ToggleIcon style={{ background: type.iconBg }}>
                      {type.icon}
                    </ToggleIcon>
                    <ToggleText>
                      <ToggleTitle>{type.title}</ToggleTitle>
                      <ToggleDescription>{type.description}</ToggleDescription>
                    </ToggleText>
                  </ToggleLabel>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                      checked={preferences[channel.key][type.key]}
                      onChange={(e) => updatePreference(channel.key, type.key, e.target.checked)}
                />
                    <ToggleSlider />
              </ToggleSwitch>
                </ToggleItem>
              ))}
            </ToggleGroup>

            <TestButton
              onClick={() => testNotification('order')}
              disabled={testing}
            >
              {testing ? 'Testing...' : 'Test Notifications'}
                </TestButton>

            {testResult && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '10px',
                background: testResult.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${testResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                color: testResult.success ? '#059669' : '#dc2626'
              }}>
                {testResult.message}
              </div>
            )}
          </PreferenceCard>
        ))}
      </PreferencesGrid>
    </Container>
  );
};

export default NotificationPreferences;
