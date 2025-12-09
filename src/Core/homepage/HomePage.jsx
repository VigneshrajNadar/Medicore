import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPhone,
  faMessage,
  faStethoscope,
  faHeartbeat,
  faPills,
  faUserMd,
  faShieldAlt,
  faAmbulance,
  faMicroscope,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../footer/Footer";
import Slider from "../Slider/Slider";
import styled, { keyframes } from 'styled-components';

// Enhanced Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(0deg); }
  75% { transform: translateY(-5px) rotate(-5deg); }
`;

const floatReverse = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(5px) rotate(-3deg); }
  50% { transform: translateY(15px) rotate(0deg); }
  75% { transform: translateY(8px) rotate(3deg); }
`;

const rotateFloat = keyframes`
  0% { transform: rotate(0deg) translateY(0px); }
  25% { transform: rotate(90deg) translateY(-10px); }
  50% { transform: rotate(180deg) translateY(0px); }
  75% { transform: rotate(270deg) translateY(-5px); }
  100% { transform: rotate(360deg) translateY(0px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const bounceIn = keyframes`
  0% { opacity: 0; transform: scale(0.3); }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const WhyChooseSection = styled.section`
  padding: 48px 16px;
  background: #fff;
`;

const TestimonialsSection = styled.section`
  padding: 48px 16px;
  background: #f8fafc;
  position: relative;
  overflow: hidden;
`;

const NewsletterSection = styled.section`
  background: linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%);
  padding: 48px 16px;
  text-align: center;
`;

const heroFadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to { opacity: 1; transform: none; }
`;
const floatSVG = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
  100% { transform: translateY(0); }
`;
const HeroSection = styled.section`
  width: 100%;
  min-height: 500px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0 60px 0;
  position: relative;
  overflow: hidden;
  animation: ${heroFadeIn} 1s 0.1s cubic-bezier(0.23, 1, 0.32, 1) both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(59, 130, 246, 0.05) 0%,
      transparent 50%,
      rgba(14, 165, 233, 0.05) 100%
    );
    animation: ${shimmer} 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 0 40px 0;
    min-height: 400px;
  }
`;
const FloatingSVG = styled.img`
  position: absolute;
  width: 70px;
  opacity: 0.18;
  z-index: 0;
  pointer-events: none;
  animation: ${floatSVG} 4s ease-in-out infinite;
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin-right: 48px;
  z-index: 2;
  position: relative;
  @media (max-width: 768px) {
    margin-right: 0;
    text-align: center;
  }
`;

const HeroButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 32px;
  animation: ${slideInLeft} 1s 0.4s ease-out both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroPrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
  }
`;

const HeroSecondaryButton = styled(Link)`
  background: white;
  color: #3b82f6;
  padding: 16px 32px;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3b82f6;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #02475b 0%, #0087ba 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  font-family: 'Inter', 'Roboto', sans-serif;
  animation: ${slideInLeft} 1s ease-out;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: #374151;
  margin-bottom: 40px;
  line-height: 1.6;
  animation: ${slideInLeft} 1s 0.2s ease-out both;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroImageContainer = styled.div`
  width: 400px;
  height: 400px;
  max-width: 90vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${slideInRight} 1s 0.3s ease-out both;
  
  @media (max-width: 768px) {
    margin-top: 32px;
    width: 300px;
    height: 300px;
  }
`;

const DoctorIcon = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: white;
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.4);
  animation: ${pulse} 2s ease-in-out infinite, ${glow} 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 50%;
    opacity: 0.3;
    animation: ${pulse} 2s ease-in-out infinite reverse;
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    font-size: 4rem;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FloatingElement = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #3b82f6;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  
  &:nth-child(1) {
    top: 15%;
    right: 15%;
    animation: ${float} 4s ease-in-out infinite, ${bounceIn} 1s ease-out;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    bottom: 25%;
    left: 10%;
    animation: ${floatReverse} 3.5s ease-in-out infinite, ${bounceIn} 1s ease-out;
    animation-delay: 1s;
  }
  
  &:nth-child(3) {
    top: 65%;
    right: 25%;
    animation: ${rotateFloat} 6s linear infinite, ${bounceIn} 1s ease-out;
    animation-delay: 2s;
  }
  
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  margin: 48px auto 0 auto;
  max-width: 1100px;
  padding: 0 16px;
`;

const cardFadeIn = keyframes`
  from { opacity: 0; transform: translateY(32px) scale(0.97); }
  to { opacity: 1; transform: none; }
`;
const FeatureCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 0;
  transform: translateY(32px) scale(0.97);
  animation: ${cardFadeIn} 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: var(--delay, 0s);
  border: 1px solid rgba(59, 130, 246, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(59, 130, 246, 0.1),
      transparent
    );
    transition: left 0.6s;
  }
  
  &:hover {
    box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15);
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(59, 130, 246, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const CardIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  animation: ${bounceIn} 1s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    animation: ${pulse} 1s ease-in-out infinite;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #02475b;
  margin-bottom: 8px;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  color: #0087ba;
  text-align: center;
`;

const SearchSection = styled.div`
  background: #fff;
  padding: 32px 16px;
  margin: 32px auto;
  max-width: 800px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px 20px;
  border: 2px solid #e3e3e3;
  transition: border 0.2s;
  &:focus-within {
    border: 2px solid #0087ba;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  outline: none;
  &::placeholder {
    color: #888;
  }
`;

const SearchButton = styled.button`
  background: #0087ba;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #02475b;
  }
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #02475b 0%, #0087ba 50%, #3b82f6 100%);
  color: #fff;
  padding: 80px 16px;
  margin: 80px 0;
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
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
    animation: ${shimmer} 4s ease-in-out infinite;
  }
`;
const AnimatedStat = styled.div`
  animation: ${fadeInUp} 1s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation-delay: var(--delay, 0s);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const StatItem = styled.div`
  animation: ${bounceIn} 1s ease-out;
  animation-delay: var(--delay, 0s);
  
  h3 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  p {
    font-size: 1.2rem;
    opacity: 0.95;
    font-weight: 500;
  }
`;


const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  position: relative;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: var(--delay, 0s);
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: #3b82f6;
    opacity: 0.3;
    font-family: serif;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(59, 130, 246, 0.15);
  }
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #374151;
  margin-bottom: 20px;
  line-height: 1.8;
  font-size: 1.1rem;
  position: relative;
  z-index: 2;
`;

const TestimonialAuthor = styled.div`
  font-weight: 700;
  color: #3b82f6;
  font-size: 1.1rem;
  position: relative;
  z-index: 2;
`;


const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: 24px;
`;

const BenefitIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  animation: ${bounceIn} 1s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    animation: ${pulse} 1s ease-in-out infinite;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #02475b;
  margin-bottom: 48px;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #02475b 0%, #0087ba 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 1s ease-out;
`;


const NewsletterForm = styled.form`
  display: flex;
  gap: 12px;
  max-width: 400px;
  margin: 24px auto 0;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border: 1px solid #0087ba;
  }
`;

const NewsletterButton = styled.button`
  background: #0087ba;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #02475b;
  }
`;

const ClickableCard = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const AnimatedSection = styled.section`
  animation: ${fadeInUp} 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;
const AnimatedCardGrid = styled(CardGrid)`
  animation: ${fadeInUp} 1s 0.2s cubic-bezier(0.23, 1, 0.32, 1) both;
`;
const AnimatedStatsSection = styled(StatsSection)`
  animation: ${fadeInUp} 1s 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
`;

const AnimatedWhyChooseSection = styled(WhyChooseSection)`
  animation: ${fadeInUp} 1s 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
`;
const AnimatedTestimonialsSection = styled(TestimonialsSection)`
  animation: ${fadeInUp} 1s 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
`;
const AnimatedNewsletterSection = styled(NewsletterSection)`
  animation: ${fadeInUp} 1s 1s cubic-bezier(0.23, 1, 0.32, 1) both;
`;

const AnimatedFeatureCard = styled(FeatureCard)`
  transition: box-shadow 0.2s, transform 0.2s;
  will-change: transform;
  &:hover {
    box-shadow: 0 12px 36px rgba(0,0,0,0.16);
    transform: scale(1.045) rotate(-1deg);
    background: linear-gradient(90deg, #f8fafc 60%, #e3f0ff 100%);
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s;
    background: linear-gradient(120deg, rgba(36,198,220,0.08) 0%, rgba(2,71,91,0.08) 100%);
  }
  &:hover::after {
    opacity: 1;
  }
`;


const HomePage = () => {
  // Animated stats
  const [stats, setStats] = useState({ doctors: 0, specialities: 0, available: 0, patients: 0 });
  useEffect(() => {
    let d = 0, s = 0, a = 0, p = 0;
    const interval = setInterval(() => {
      d = Math.min(d + 80, 4000);
      s = Math.min(s + 2, 58);
      a = Math.min(a + 2, 24);
      p = Math.min(p + 25000, 1000000);
      setStats({ doctors: d, specialities: s, available: a, patients: p });
      if (d === 4000 && s === 58 && a === 24 && p === 1000000) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, []);

  // Testimonials carousel
  const testimonials = [
    { text: "MediCore made it so easy to consult with doctors from home. The service is excellent!", author: "- Sarah Johnson" },
    { text: "Fast medicine delivery and genuine products. Highly recommended for all healthcare needs.", author: "- Rajesh Kumar" },
    { text: "The lab test at home service saved me so much time. Professional and reliable!", author: "- Priya Sharma" },
  ];
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTestimonialIdx(i => (i+1)%testimonials.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeroSection>
        <FloatingSVG src="https://www.svgrepo.com/show/354380/medicine.svg" style={{top:30,left:30}} />
        <FloatingSVG src="https://www.svgrepo.com/show/354378/heart.svg" style={{top:80,right:60,animationDelay:'1.2s'}} />
        <FloatingSVG src="https://www.svgrepo.com/show/354386/stethoscope.svg" style={{bottom:40,left:120,animationDelay:'2.1s'}} />
        <HeroContent>
          <HeroTitle>Your Trusted Healthcare Partner</HeroTitle>
          <HeroSubtitle>Book doctor appointments, order medicines online, and access comprehensive healthcare services - all in one platform designed for your family's wellbeing</HeroSubtitle>
          <HeroButtonGroup>
            <HeroPrimaryButton to="/pharmacy">
              <FontAwesomeIcon icon={faPills} style={{marginRight: '8px'}} />
              Order Medicines
            </HeroPrimaryButton>
            <HeroSecondaryButton to="/doctors">
              <FontAwesomeIcon icon={faUserMd} style={{marginRight: '8px'}} />
              Consult Doctor
            </HeroSecondaryButton>
          </HeroButtonGroup>
        </HeroContent>
        <HeroImageContainer>
          <DoctorIcon>
            <FontAwesomeIcon icon={faUserMd} />
          </DoctorIcon>
          <FloatingElements>
            <FloatingElement>
              <FontAwesomeIcon icon={faStethoscope} />
            </FloatingElement>
            <FloatingElement>
              <FontAwesomeIcon icon={faHeartbeat} />
            </FloatingElement>
            <FloatingElement>
              <FontAwesomeIcon icon={faPills} />
            </FloatingElement>
          </FloatingElements>
        </HeroImageContainer>
      </HeroSection>

      <AnimatedSection as={SearchSection}>
        <SearchBar>
          <SearchInput placeholder="Search for medicines, doctors, or health services..." />
          <SearchButton>Search</SearchButton>
        </SearchBar>
      </AnimatedSection>

      <AnimatedCardGrid>
        <ClickableCard to="/pharmacy">
          <AnimatedFeatureCard>
            <CardIconWrapper>
              <FontAwesomeIcon icon={faPills} />
            </CardIconWrapper>
            <CardTitle>Online Pharmacy</CardTitle>
            <CardDesc>Order medicines online with home delivery, prescription upload, and authentic products</CardDesc>
          </AnimatedFeatureCard>
        </ClickableCard>
        <ClickableCard to="/doctors">
          <AnimatedFeatureCard>
            <CardIconWrapper>
              <FontAwesomeIcon icon={faUserMd} />
            </CardIconWrapper>
            <CardTitle>Doctor Appointments</CardTitle>
            <CardDesc>Book appointments with qualified doctors across multiple specialties for consultations</CardDesc>
          </AnimatedFeatureCard>
        </ClickableCard>
        <ClickableCard to="/labtest">
          <AnimatedFeatureCard>
            <CardIconWrapper>
              <FontAwesomeIcon icon={faMicroscope} />
            </CardIconWrapper>
            <CardTitle>Lab Tests</CardTitle>
            <CardDesc>Book lab tests with home sample collection and get your reports digitally</CardDesc>
          </AnimatedFeatureCard>
        </ClickableCard>
        <ClickableCard to="/health-tools">
          <AnimatedFeatureCard>
            <CardIconWrapper>
              <FontAwesomeIcon icon={faHeartbeat} />
            </CardIconWrapper>
            <CardTitle>Health Tools</CardTitle>
            <CardDesc>Access health calculators, symptom checker, and wellness tracking tools</CardDesc>
          </AnimatedFeatureCard>
        </ClickableCard>
      </AnimatedCardGrid>

      <AnimatedStatsSection>
        <StatsGrid>
          <StatItem style={{'--delay': '0.1s'}}>
            <h3>1000+</h3>
            <p>Qualified Doctors</p>
          </StatItem>
          <StatItem style={{'--delay': '0.2s'}}>
            <h3>25+</h3>
            <p>Medical Specialties</p>
          </StatItem>
          <StatItem style={{'--delay': '0.3s'}}>
            <h3>24/7</h3>
            <p>Online Support</p>
          </StatItem>
          <StatItem style={{'--delay': '0.4s'}}>
            <h3>50K+</h3>
            <p>Happy Patients</p>
          </StatItem>
        </StatsGrid>
      </AnimatedStatsSection>

      <AnimatedWhyChooseSection>
        <SectionTitle>Why Choose MediCore?</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIconWrapper>
              <FontAwesomeIcon icon={faShieldAlt} />
            </BenefitIconWrapper>
            <h3 style={{color: '#02475b', marginBottom: '8px', fontSize: '1.3rem'}}>Trusted Platform</h3>
            <p style={{color: '#666', lineHeight: '1.6'}}>Secure and reliable healthcare platform with verified doctors and authentic medicines</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIconWrapper>
              <FontAwesomeIcon icon={faAmbulance} />
            </BenefitIconWrapper>
            <h3 style={{color: '#02475b', marginBottom: '8px', fontSize: '1.3rem'}}>Quick Delivery</h3>
            <p style={{color: '#666', lineHeight: '1.6'}}>Fast medicine delivery and easy appointment booking for your convenience</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIconWrapper>
              <FontAwesomeIcon icon={faStethoscope} />
            </BenefitIconWrapper>
            <h3 style={{color: '#02475b', marginBottom: '8px', fontSize: '1.3rem'}}>Expert Doctors</h3>
            <p style={{color: '#666', lineHeight: '1.6'}}>Qualified doctors across multiple specialties available for consultations</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIconWrapper>
              <FontAwesomeIcon icon={faCalendarCheck} />
            </BenefitIconWrapper>
            <h3 style={{color: '#02475b', marginBottom: '8px', fontSize: '1.3rem'}}>Easy Booking</h3>
            <p style={{color: '#666', lineHeight: '1.6'}}>Simple appointment booking system with flexible scheduling options</p>
          </BenefitCard>
        </BenefitsGrid>
      </AnimatedWhyChooseSection>

      <AnimatedTestimonialsSection>
        <SectionTitle>What Our Patients Say</SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard style={{'--delay': '0.1s'}}>
            <TestimonialText>"MediCore made it so easy to book doctor appointments online. The platform is user-friendly and doctors are very professional."</TestimonialText>
            <TestimonialAuthor>- Sarah Johnson, Patient</TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard style={{'--delay': '0.2s'}}>
            <TestimonialText>"Fast medicine delivery and genuine products. The prescription upload feature is very convenient for ordering medicines."</TestimonialText>
            <TestimonialAuthor>- Rajesh Kumar, Regular Customer</TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard style={{'--delay': '0.3s'}}>
            <TestimonialText>"The lab test booking service is excellent. Home sample collection saved me time and the digital reports are very detailed."</TestimonialText>
            <TestimonialAuthor>- Priya Sharma, Working Mother</TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsGrid>
      </AnimatedTestimonialsSection>

      <AnimatedNewsletterSection>
        <SectionTitle style={{color: '#02475b'}}>Stay Updated with Health Insights</SectionTitle>
        <p style={{color: '#666', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.6'}}>Receive personalized health tips, medical breakthroughs, and exclusive offers from our expert team</p>
        <NewsletterForm>
          <NewsletterInput type="email" placeholder="Enter your email address" />
          <NewsletterButton type="submit">Subscribe</NewsletterButton>
        </NewsletterForm>
      </AnimatedNewsletterSection>

          <Footer />
    </>
  );
};

export default HomePage;
