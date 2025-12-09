import React, { useState } from 'react';
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
  FaChartLine
} from 'react-icons/fa';
import styled from 'styled-components';

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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  margin: 0;
  line-height: 1.6;
`;

const FeatureDemo = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 'notifications',
      title: 'Smart Notifications',
      description: 'Comprehensive notification system with customizable preferences for order updates, health tips, and promotional offers.',
      icon: <FaBell />,
      iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      demo: () => {
        alert('🔔 Smart Notifications Demo!\n\nFeatures:\n• Order confirmations\n• Health tips\n• Promotional offers\n• Customizable preferences\n• Multi-channel delivery\n\nCheck console for demo notification!');
        console.log('📧 Email/SMS Demo!\n\nFeatures:\n• Order confirmations\n• Health tips\n• Promotional offers\n\nCheck console for demo notification!');
      }
    },
    {
      id: 'health-tools',
      title: 'Health Tools Suite',
      description: 'Comprehensive health management tools including symptom checker, medication tracker, and wellness calculators.',
      icon: <FaHeart />,
      iconBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      demo: () => {
        alert('🏥 Health Tools Demo!\n\nAvailable Tools:\n• Vision Health Checker\n• Dental Health Guide\n• Medication Tracker\n• Hospital Finder\n• Symptom Checker\n• Alternative Medicines\n• Side Effect Tracker\n• Dosage Calculator\n• And more...\n\nNavigate to /HealthTools to explore!');
      }
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy Management',
      description: 'Complete pharmacy solution with medicine search, cart management, and secure payment processing.',
      icon: <FaShoppingCart />,
      iconBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      demo: () => {
        alert('💊 Pharmacy Demo!\n\nFeatures:\n• Medicine search & catalog\n• Shopping cart\n• Secure payments\n• Order tracking\n• Prescription management\n\nNavigate to /pharmacy to explore!');
      }
    },
    {
      id: 'user-profile',
      title: 'User Profile Management',
      description: 'Comprehensive user profile system with health records, order history, and personalized settings.',
      icon: <FaUser />,
      iconBg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      demo: () => {
        alert('👤 User Profile Demo!\n\nFeatures:\n• Personal information\n• Health records\n• Order history\n• Notification preferences\n• Security settings\n\nNavigate to /profile to explore!');
      }
    },
    {
      id: 'admin-panel',
      title: 'Admin Dashboard',
      description: 'Powerful admin panel for managing users, orders, inventory, and system analytics.',
      icon: <FaCog />,
      iconBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      demo: () => {
        alert('⚙️ Admin Panel Demo!\n\nFeatures:\n• User management\n• Order tracking\n• Inventory control\n• Analytics dashboard\n• System settings\n\nNavigate to /admin to explore!');
      }
    },
    {
      id: 'widgets',
      title: 'Widget System',
      description: 'Modular widget system for customizable dashboards with real-time data and interactive components.',
      icon: <FaChartLine />,
      iconBg: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      demo: () => {
        alert('📊 Widget System Demo!\n\nFeatures:\n• Customizable dashboards\n• Real-time data\n• Interactive widgets\n• Drag & drop interface\n• Multiple layouts\n\nNavigate to /dashboard to explore!');
      }
    }
  ];

  return (
    <Container>
      <Header>
        <Title>Feature Showcase</Title>
        <Subtitle>Explore the powerful features of Apollo Clone</Subtitle>
      </Header>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={feature.demo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FeatureHeader>
              <FeatureIcon style={{ background: feature.iconBg }}>
                {feature.icon}
              </FeatureIcon>
              <div>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </div>
            </FeatureHeader>
            
            <div style={{
              padding: '1rem',
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ color: '#667eea', fontWeight: '600', fontSize: '0.9rem' }}>
                Click to see demo →
              </div>
            </div>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Container>
  );
};

export default FeatureDemo;
