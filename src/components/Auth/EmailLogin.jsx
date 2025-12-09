import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .floating-icon {
    position: absolute;
    font-size: 2.5rem;
    animation: holographicFloat 12s infinite ease-in-out;
    filter: drop-shadow(0 0 20px currentColor);
    background: linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  }
  
  .icon-1 { top: 10%; left: 5%; animation-delay: 0s; }
  .icon-2 { top: 20%; right: 10%; animation-delay: -2s; }
  .icon-3 { bottom: 30%; left: 8%; animation-delay: -4s; }
  .icon-4 { top: 60%; right: 15%; animation-delay: -6s; }
  .icon-5 { bottom: 10%; left: 20%; animation-delay: -8s; }
  .icon-6 { top: 40%; left: 3%; animation-delay: -10s; }
  .icon-7 { bottom: 50%; right: 5%; animation-delay: -12s; }
  .icon-8 { top: 80%; left: 50%; animation-delay: -14s; }
  
  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.9) 0%, rgba(255, 0, 255, 0.5) 50%, transparent 100%);
    border-radius: 50%;
    animation: holographicParticle 12s linear infinite;
    box-shadow: 0 0 10px currentColor;
  }
  
  .quantum-particle {
    position: absolute;
    width: 1px;
    height: 1px;
    background: #00ffff;
    border-radius: 50%;
    animation: quantumFloat 8s ease-in-out infinite;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.4);
  }
  
  .neural-node {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #00ffff 0%, transparent 70%);
    border-radius: 50%;
    animation: neuralPulse 3s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  }
  
  .neural-connection {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #00ffff 50%, transparent 100%);
    animation: dataFlow 2s linear infinite;
    opacity: 0.6;
    transform-origin: left center;
  }
  
  .particle-1 { left: 10%; animation-delay: 0s; }
  .particle-2 { left: 30%; animation-delay: -1s; }
  .particle-3 { left: 50%; animation-delay: -2s; }
  .particle-4 { left: 70%; animation-delay: -3s; }
  .particle-5 { left: 90%; animation-delay: -4s; }
  
  @keyframes holographicFloat {
    0%, 100% {
      transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
      opacity: 0.9;
      filter: hue-rotate(0deg) brightness(1) blur(0px);
      text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    }
    16.66% {
      transform: translateY(-40px) rotateX(60deg) rotateY(60deg) rotateZ(60deg) scale(1.3);
      opacity: 1;
      filter: hue-rotate(60deg) brightness(1.4) blur(1px);
      text-shadow: 0 0 40px rgba(255, 0, 255, 0.7);
    }
    33.33% {
      transform: translateY(-80px) rotateX(120deg) rotateY(120deg) rotateZ(120deg) scale(0.7);
      opacity: 0.8;
      filter: hue-rotate(120deg) brightness(0.8) blur(2px);
      text-shadow: 0 0 50px rgba(0, 255, 127, 0.6);
    }
    50% {
      transform: translateY(-60px) rotateX(180deg) rotateY(180deg) rotateZ(180deg) scale(1.1);
      opacity: 0.6;
      filter: hue-rotate(180deg) brightness(1.2) blur(1px);
      text-shadow: 0 0 35px rgba(255, 255, 0, 0.8);
    }
    66.66% {
      transform: translateY(-30px) rotateX(240deg) rotateY(240deg) rotateZ(240deg) scale(1.2);
      opacity: 0.9;
      filter: hue-rotate(240deg) brightness(1.1) blur(0.5px);
      text-shadow: 0 0 45px rgba(255, 127, 0, 0.7);
    }
    83.33% {
      transform: translateY(-15px) rotateX(300deg) rotateY(300deg) rotateZ(300deg) scale(0.9);
      opacity: 1;
      filter: hue-rotate(300deg) brightness(1.3) blur(1.5px);
      text-shadow: 0 0 55px rgba(127, 0, 255, 0.9);
    }
  }
  
  @keyframes holographicParticle {
    0% {
      transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0);
      opacity: 0;
      filter: hue-rotate(0deg);
    }
    10% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      transform: translateY(50vh) translateX(50px) rotate(180deg) scale(1.5);
      opacity: 0.8;
      filter: hue-rotate(180deg);
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-10vh) translateX(100px) rotate(360deg) scale(0);
      opacity: 0;
      filter: hue-rotate(360deg);
    }
  }
  
  @keyframes quantumFloat {
    0%, 100% {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      transform: translateX(200px) translateY(-300px) scale(2);
      opacity: 0.8;
      box-shadow: 0 0 25px rgba(0, 255, 255, 1), 0 0 50px rgba(255, 0, 255, 0.6);
    }
    90% {
      opacity: 1;
    }
  }
  
  @keyframes neuralPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.8;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
    }
    50% {
      transform: scale(2);
      opacity: 1;
      box-shadow: 0 0 40px rgba(0, 255, 255, 1), 0 0 80px rgba(255, 0, 255, 0.5);
    }
  }
  
  @keyframes dataFlow {
    0% {
      background: linear-gradient(90deg, transparent 0%, transparent 100%);
    }
    50% {
      background: linear-gradient(90deg, transparent 0%, #00ffff 50%, transparent 100%);
    }
    100% {
      background: linear-gradient(90deg, transparent 0%, transparent 100%);
    }
  }
  
  .floating-shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(10px);
    animation: float 20s infinite linear;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .shape-1 {
    width: 80px;
    height: 80px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  .shape-2 {
    width: 60px;
    height: 60px;
    top: 70%;
    right: 20%;
    animation-delay: -4s;
  }
  
  .shape-3 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 15%;
    animation-delay: -8s;
  }
  
  .shape-4 {
    width: 70px;
    height: 70px;
    top: 30%;
    right: 30%;
    animation-delay: -12s;
  }
  
  .shape-5 {
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    animation-delay: -16s;
  }
  
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    animation: pulse 4s ease-in-out infinite;
  }
  
  .orb-1 {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }
  
  .orb-2 {
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, #f093fb, #f5576c);
    bottom: 30%;
    right: 25%;
    animation-delay: -2s;
  }
  
  .orb-3 {
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    top: 60%;
    left: 60%;
    animation-delay: -1s;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-30px) rotate(120deg);
    }
    66% {
      transform: translateY(30px) rotate(240deg);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.9;
    }
  }
;

/* Additional holographic animations */
@keyframes holographicTitle {
  0%, 100% {
    background-position: 0% 50%;
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  }
  25% {
    background-position: 100% 50%;
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
  }
  50% {
    background-position: 200% 50%;
    transform: perspective(1000px) rotateX(0deg) rotateY(10deg);
  }
  75% {
    background-position: 300% 50%;
    transform: perspective(1000px) rotateX(-5deg) rotateY(5deg);
  }
}

@keyframes titleGlow {
  0% {
    text-shadow: 
      0 0 20px rgba(0, 255, 255, 0.8),
      0 0 40px rgba(255, 0, 255, 0.6),
      0 0 60px rgba(0, 255, 127, 0.4);
    filter: brightness(1);
  }
  100% {
    text-shadow: 
      0 0 30px rgba(0, 255, 255, 1),
      0 0 60px rgba(255, 0, 255, 0.8),
      0 0 90px rgba(0, 255, 127, 0.6),
      0 0 120px rgba(255, 255, 0, 0.4);
    filter: brightness(1.2);
  }
}

/* Neural Network Styles */
.neural-network {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.neural-node {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #00ffff 0%, #0080ff 50%, transparent 100%);
  border-radius: 50%;
  animation: neuralPulse 3s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
}

.neural-connection {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(0, 255, 255, 0.3) 20%, 
    rgba(0, 255, 255, 0.8) 50%, 
    rgba(0, 255, 255, 0.3) 80%, 
    transparent 100%);
  animation: dataFlow 2s linear infinite;
  transform-origin: left center;
}

@keyframes neuralPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes dataFlow {
  0% {
    background-position: -100px 0;
  }
  100% {
    background-position: 200px 0;
  }
}

/* Quantum Particles */
.quantum-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.quantum-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #ff00ff 0%, #00ffff 100%);
  border-radius: 50%;
  animation: quantumFloat 4s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.8);
}

@keyframes quantumFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
    opacity: 1;
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
    opacity: 0.8;
  }
}

/* Holographic Scanner */
.holographic-scanner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(0, 255, 127, 0.8) 50%, 
    transparent 100%);
  animation: scannerSweep 4s linear infinite;
  box-shadow: 0 0 20px rgba(0, 255, 127, 0.6);
}

@keyframes scannerSweep {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Holographic Grid */
.holographic-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridPulse 3s ease-in-out infinite;
}

@keyframes gridPulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'Orbitron', 'Segoe UI', sans-serif;
  perspective: 1000px;
  
  &::after {
    content: '';
    position: absolute;
    top: -20%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 50%, transparent 70%);
    border-radius: 50%;
    animation: complexFloat 20s ease-in-out infinite;
    filter: blur(1px);
  }
  
  /* Additional gradient orbs */
  &::before {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(79, 172, 254, 0.25) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%);
    border-radius: 50%;
    animation: complexFloat 25s ease-in-out infinite reverse;
    filter: blur(2px);
  }
  
  
  @keyframes complexFloat {
    0%, 100% { 
      transform: translate(0, 0) scale(1) rotate(0deg);
      filter: blur(1px) hue-rotate(0deg);
    }
    25% { 
      transform: translate(30px, -40px) scale(1.2) rotate(90deg);
      filter: blur(2px) hue-rotate(90deg);
    }
    50% { 
      transform: translate(-20px, -60px) scale(0.9) rotate(180deg);
      filter: blur(1.5px) hue-rotate(180deg);
    }
    75% { 
      transform: translate(-40px, 20px) scale(1.1) rotate(270deg);
      filter: blur(2.5px) hue-rotate(270deg);
    }
  }
  
`;

const LoginCard = styled(motion.div)`
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(26, 26, 46, 0.8) 100%),
    radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 70%);
  backdrop-filter: blur(40px) saturate(180%);
  border-radius: 32px;
  padding: 2rem 3.5rem 3.5rem 3.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 
    0 0 60px rgba(0, 255, 255, 0.3),
    0 0 120px rgba(255, 0, 255, 0.2),
    inset 0 0 60px rgba(0, 255, 127, 0.1);
  border: 2px solid;
  border-image: linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f, #ffff00) 1;
  position: relative;
  z-index: 10;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-15px) scale(1.03) rotateX(5deg) rotateY(5deg);
    box-shadow: 
      0 0 80px rgba(0, 255, 255, 0.5),
      0 0 160px rgba(255, 0, 255, 0.3),
      0 40px 120px rgba(0, 0, 0, 0.4),
      inset 0 0 80px rgba(0, 255, 127, 0.2);
    border-image: linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f, #ffff00, #00ffff) 1;
  }
  
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 5%;
    right: 5%;
    height: 4px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(59, 130, 246, 0.4), 
      rgba(16, 185, 129, 0.4), 
      rgba(245, 158, 11, 0.4),
      transparent
    );
    border-radius: 3px;
    animation: gradientShift 4s ease-in-out infinite;
  }
  
  @keyframes medicorePulse {
    0%, 100% { 
      transform: translateX(-50%) scale(1) rotate(0deg);
      box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.6),
        0 0 60px rgba(255, 0, 255, 0.4),
        inset 0 0 20px rgba(0, 255, 127, 0.2);
    }
    50% { 
      transform: translateX(-50%) scale(1.1) rotate(5deg);
      box-shadow: 
        0 0 40px rgba(0, 255, 255, 0.8),
        0 0 80px rgba(255, 0, 255, 0.6),
        inset 0 0 30px rgba(0, 255, 127, 0.3);
    }
  }
  
  @keyframes gradientShift {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const Title = styled(motion.h1)`
  text-align: center;
  color: #00ffff;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  background: linear-gradient(45deg, #00ffff 0%, #ff00ff 25%, #00ff7f 50%, #ffff00 75%, #00ffff 100%);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  overflow: visible;
  width: 100%;
  max-width: none;
  background-clip: text;
  text-shadow: 0 0 50px rgba(0, 255, 255, 0.8), 0 0 100px rgba(255, 0, 255, 0.6);
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: holographicTitle 3s ease-in-out infinite, titleGlow 2s ease-in-out infinite alternate;
  
  &::before {
    content: '⚕️ ';
    font-size: 2rem;
    margin-right: 0.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '💊 🩺 💉';
    display: block;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    opacity: 0.6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1.25rem 1rem 1.25rem 3.5rem;
  border: 2px solid;
  border-image: linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3), rgba(0, 255, 127, 0.3)) 1;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 46, 0.7) 100%),
    radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 70%);
  color: #00ffff;
  backdrop-filter: blur(15px) saturate(180%);
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 5px currentColor;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  position: relative;

  &:focus {
    outline: none;
    border-image: linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f, #ffff00) 1;
    box-shadow: 
      0 0 30px rgba(0, 255, 255, 0.5),
      0 0 60px rgba(255, 0, 255, 0.3),
      inset 0 0 30px rgba(0, 255, 127, 0.2);
    background: 
      linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(26, 26, 46, 0.8) 100%),
      radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    color: #ffffff;
    text-shadow: 0 0 10px currentColor;
    transform: translateY(-3px) scale(1.02);
  }

  &:hover {
    border-color: #0ea5e9;
    transform: translateY(-1px) scale(1.01);
    box-shadow: 
      0 6px 20px rgba(14, 165, 233, 0.15),
      inset 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  &::placeholder {
    color: rgba(0, 255, 255, 0.6);
    font-weight: 500;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
  
  &:focus::placeholder {
    color: #cbd5e1;
    transform: translateY(-2px);
  }
  
  @keyframes inputGlow {
    0%, 100% {
      box-shadow: 
        0 0 0 6px rgba(14, 165, 233, 0.12),
        0 12px 35px rgba(14, 165, 233, 0.2),
        inset 0 2px 4px rgba(0, 0, 0, 0.02);
    }
    50% {
      box-shadow: 
        0 0 0 8px rgba(14, 165, 233, 0.15),
        0 15px 40px rgba(14, 165, 233, 0.25),
        inset 0 2px 4px rgba(0, 0, 0, 0.02),
        0 0 30px rgba(14, 165, 233, 0.15);
    }
  }
`;

const InputIcon = styled(motion.div)`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #0ea5e9;
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(16, 185, 129, 0.1));
  padding: 0.5rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
  
  &:hover {
    transform: translateY(-50%) scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(16, 185, 129, 0.15));
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
    animation: iconBounce 0.6s ease-in-out;
  }
  
  @keyframes iconBounce {
    0%, 100% { transform: translateY(-50%) scale(1.1) rotate(5deg); }
    25% { transform: translateY(-50%) scale(1.2) rotate(-5deg); }
    50% { transform: translateY(-50%) scale(1.15) rotate(10deg); }
    75% { transform: translateY(-50%) scale(1.1) rotate(-2deg); }
  }
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  animation: holographicFloat 6s ease-in-out infinite;
  filter: drop-shadow(0 0 10px currentColor);
  z-index: 3;
  pointer-events: none;
  
  @keyframes holographicFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.7;
    }
    25% {
      transform: translateY(-20px) rotate(5deg);
      opacity: 0.9;
    }
    50% {
      transform: translateY(-10px) rotate(-5deg);
      opacity: 1;
    }
    75% {
      transform: translateY(-30px) rotate(3deg);
      opacity: 0.8;
    }
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 1.1rem;
  
  &:hover {
    color: #667eea;
  }
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem 2rem;
  background: 
    linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 50%, rgba(0, 255, 127, 0.1) 100%),
    rgba(0, 0, 0, 0.8);
  color: #00ffff;
  border: 2px solid;
  border-image: linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f) 1;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.4),
    0 0 60px rgba(255, 0, 255, 0.2),
    inset 0 0 30px rgba(0, 255, 127, 0.1);
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 10px currentColor;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &::before {
    content: '🔐';
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.3rem;
    animation: lockRotate 4s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover::after {
    left: 100%;
  }

  &:hover {
    transform: translateY(-6px) scale(1.05) rotateX(5deg);
    box-shadow: 
      0 0 50px rgba(0, 255, 255, 0.6),
      0 0 100px rgba(255, 0, 255, 0.4),
      0 20px 60px rgba(0, 0, 0, 0.3),
      inset 0 0 50px rgba(0, 255, 127, 0.2);
    background: 
      linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 50%, rgba(0, 255, 127, 0.2) 100%),
      rgba(0, 0, 0, 0.9);
    color: #ffffff;
    text-shadow: 0 0 20px currentColor;
    border-image: linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f, #ffff00, #00ffff) 1;
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
    transition: all 0.1s ease;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
    
    &:hover {
      transform: none;
      box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);
      animation: none;
    }
  }
  
  @keyframes lockRotate {
    0%, 100% { transform: translateY(-50%) rotate(0deg); }
    25% { transform: translateY(-50%) rotate(-10deg) scale(1.1); }
    50% { transform: translateY(-50%) rotate(0deg) scale(1); }
    75% { transform: translateY(-50%) rotate(10deg) scale(1.1); }
  }
  
  @keyframes buttonPulse {
    0%, 100% {
      box-shadow: 
        0 30px 50px -5px rgba(14, 165, 233, 0.5),
        0 20px 25px -5px rgba(16, 185, 129, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    50% {
      box-shadow: 
        0 35px 60px -5px rgba(14, 165, 233, 0.6),
        0 25px 35px -5px rgba(16, 185, 129, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 0 50px rgba(14, 165, 233, 0.3);
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
`;


const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isAdminLogin) {
        // Admin login logic
        if (email === 'admin@medicore.com' && password === 'admin123') {
          localStorage.setItem('adminUser', JSON.stringify({
            id: 'admin_001',
            email: 'admin@medicore.com',
            name: 'MediCore Admin',
            role: 'admin',
            loginTime: new Date().toISOString()
          }));
          navigate('/admin-dashboard');
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        // Regular user login
        const result = await login(email, password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.message || 'Login failed');
        }
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };


  return (
    <LoginContainer>
      <FloatingElements>
        <div className="floating-icon icon-1">💊</div>
        <div className="floating-icon icon-2">🩺</div>
        <div className="floating-icon icon-3">🏥</div>
        <div className="floating-icon icon-4">⚕️</div>
        <div className="floating-icon icon-5">💉</div>
        <div className="floating-icon icon-6">🔬</div>
        <div className="floating-icon icon-7">🧬</div>
        <div className="floating-icon icon-8">❤️</div>
        
        {Array.from({length: 30}, (_, i) => (
          <div key={i} className={`particle particle-${(i % 5) + 1}`}></div>
        ))}
        
        {/* Additional floating shapes */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
        
        {/* Gradient orbs */}
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </FloatingElements>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          MediCore
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: -20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            type: "spring",
            stiffness: 80
          }}
        >
          {isAdminLogin ? 'Admin Portal Access' : 'Advanced Healthcare Solutions'}
        </Subtitle>
        
        {/* Admin/User Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6,
            type: "spring",
            stiffness: 100
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            gap: '0.5rem'
          }}
        >
          <button
            type="button"
            onClick={() => setIsAdminLogin(false)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              background: !isAdminLogin ? 'linear-gradient(135deg, #0ea5e9, #3b82f6)' : 'rgba(248, 250, 252, 0.8)',
              color: !isAdminLogin ? 'white' : '#64748b',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: !isAdminLogin ? '0 4px 15px rgba(14, 165, 233, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
              border: !isAdminLogin ? 'none' : '2px solid #e2e8f0'
            }}
          >
            👤 User Login
          </button>
          <button
            type="button"
            onClick={() => setIsAdminLogin(true)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              background: isAdminLogin ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'rgba(248, 250, 252, 0.8)',
              color: isAdminLogin ? 'white' : '#64748b',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isAdminLogin ? '0 4px 15px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
              border: isAdminLogin ? 'none' : '2px solid #e2e8f0'
            }}
          >
            🔐 Admin Login
          </button>
        </motion.div>
        {!isAdminLogin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: '#64748b',
              fontSize: '0.95rem'
            }}
          >
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign Up
            </Link>
          </motion.div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -50, rotateZ: -10 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
            whileHover={{ scale: 1.02 }}
          >
            <InputGroup>
              <InputIcon
                whileHover={{ scale: 1.1, color: '#3b82f6' }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                placeholder={isAdminLogin ? 'Admin Email (admin@medicore.com)' : 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </InputGroup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, rotateZ: 10 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 1.0,
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
            whileHover={{ scale: 1.02 }}
          >
            <InputGroup>
              <InputIcon
                whileHover={{ scale: 1.1, color: '#3b82f6' }}
                transition={{ duration: 0.2 }}
              >
                <FaLock />
              </InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            <LoginButton
              type="submit"
              disabled={loading}
              whileHover={{ 
                scale: 1.03,
                rotateZ: 1,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.97,
                rotateZ: -1,
                transition: { duration: 0.1 }
              }}
              animate={loading ? {
                scale: [1, 1.02, 1],
                rotateZ: [0, 2, -2, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {}}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </LoginButton>
          </motion.div>
        </Form>

        {/* Neural Network Background */}
        <div className="neural-network">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`node-${i}`}
              className="neural-node"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`connection-${i}`}
              className="neural-connection"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Quantum Particles */}
        <div className="quantum-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="quantum-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Holographic Medical Scanner */}
        <div className="holographic-scanner">
          <div className="scanner-line" />
        </div>

        {/* Holographic Grid Overlay */}
        <div className="holographic-grid" />

        {/* Floating Icons */}
        <FloatingIcon 
          style={{ 
            top: '10%', 
            left: '10%', 
            animationDelay: '0s',
            color: '#00ffff'
          }}
        >
          🏥
        </FloatingIcon>
        <FloatingIcon 
          style={{ 
            top: '20%', 
            right: '15%', 
            animationDelay: '2s',
            color: '#ff00ff'
          }}
        >
          💊
        </FloatingIcon>
        <FloatingIcon 
          style={{ 
            bottom: '20%', 
            left: '15%', 
            animationDelay: '4s',
            color: '#00ff7f'
          }}
        >
          🩺
        </FloatingIcon>
        <FloatingIcon 
          style={{ 
            bottom: '10%', 
            right: '10%', 
            animationDelay: '6s',
            color: '#ffff00'
          }}
        >
          ⚕️
        </FloatingIcon>

      </LoginCard>
    </LoginContainer>
  );
};

export default EmailLogin;
