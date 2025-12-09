
import React from 'react'
import './Footer.css'
import { Link,navLink } from 'react-router-dom'
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0f2fe 100%);
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  padding: 80px 0 32px 0;
  margin-top: 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(59, 130, 246, 0.03) 0%,
      transparent 50%,
      rgba(14, 165, 233, 0.03) 100%
    );
    animation: shimmer 4s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 48px;
  padding: 0 24px;
  position: relative;
  z-index: 2;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeInUp 1s ease-out;
  animation-delay: var(--delay, 0s);
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const FooterLogo = styled.img`
  height: 48px;
  margin-bottom: 16px;
`;

const FooterHeading = styled.div`
  font-weight: 800;
  background: linear-gradient(135deg, #02475b 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  font-size: 1.3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 2px;
  }
`;

const FooterLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  position: relative;
  padding: 4px 0;
  
  &:hover {
    color: #3b82f6;
    transform: translateX(8px);
    
    &::before {
      width: 20px;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    transition: width 0.3s ease;
    border-radius: 1px;
  }
`;

const FooterCopyright = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  position: relative;
  z-index: 2;
  
  &::before {
    content: '♥';
    color: #ef4444;
    margin: 0 8px;
    animation: heartbeat 2s ease-in-out infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  animation: pulse 2s ease-in-out infinite;
  
  span {
    color: white;
    font-size: 28px;
    font-weight: 900;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const LogoText = styled.span`
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #02475b 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const SocialLink = styled.a`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f8fafc, #e0f2fe);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection style={{'--delay': '0.1s'}}>
          <LogoSection>
            <LogoIcon>
              <span>M+</span>
            </LogoIcon>
            <LogoText>MediCore</LogoText>
          </LogoSection>
          <p style={{color: '#6b7280', lineHeight: '1.6', marginBottom: '20px', fontSize: '1rem'}}>Revolutionizing healthcare with AI-powered diagnostics, 24/7 expert consultations, and seamless digital health management for millions across India.</p>
          <SocialLinks>
            <SocialLink href="#">📱</SocialLink>
            <SocialLink href="#">📧</SocialLink>
            <SocialLink href="#">🌐</SocialLink>
            <SocialLink href="#">📞</SocialLink>
          </SocialLinks>
        </FooterSection>
        <FooterSection style={{'--delay': '0.2s'}}>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLink to="/">About MediCore</FooterLink>
          <FooterLink to="/">Contact Support</FooterLink>
          <FooterLink to="/">Help Center</FooterLink>
          <FooterLink to="/">Privacy Policy</FooterLink>
          <FooterLink to="/">Terms of Service</FooterLink>
        </FooterSection>
        <FooterSection style={{'--delay': '0.3s'}}>
          <FooterHeading>Our Services</FooterHeading>
          <FooterLink to="/Doctor">Doctor Appointments</FooterLink>
          <FooterLink to="/pharmacy">Online Pharmacy</FooterLink>
          <FooterLink to="/labtest">Lab Tests</FooterLink>
          <FooterLink to="/healthcare">Health Tools</FooterLink>
        </FooterSection>
        <FooterSection style={{'--delay': '0.4s'}}>
          <FooterHeading>Popular Categories</FooterHeading>
          <FooterLink to="/pharmacy">Prescription Medicines</FooterLink>
          <FooterLink to="/pharmacy">Health Supplements</FooterLink>
          <FooterLink to="/pharmacy">Personal Care</FooterLink>
          <FooterLink to="/pharmacy">Baby Care</FooterLink>
        </FooterSection>
      </FooterContent>
      <FooterCopyright>
        © {new Date().getFullYear()} MediCore. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer