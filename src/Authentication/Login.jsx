import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LoginAnimation.css";
import Lottie from "lottie-react";
import medicineLottie from "./medicine-lottie.json";

function Login() {
  const [phone, setPhone] = useState("");
  const [toggle, setToggle] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };
  const handleChange = (e) => {
    setPhone("+91" + " " + e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setIsLoading(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setPhone(" ");
          setTimeout(() => {
            setIsLoading(false);
            setToggle(true);
          }, 1500);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      alert("Enter Correct Mobile Number");
    }
  };
  const otpChange = (e) => {
    setOtp(e.target.value);
  };
  const submitOtp = (e) => {
    e.preventDefault();
    if (otp.length == 6) {
      setOtpLoading(true);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          setOtp(" ");
          setTimeout(() => {
            setOtpLoading(false);
            alert("Login successful!");
            if (user) {
              navigate("/Details");
            }
          }, 2000);
        })
        .catch((error) => {
          setOtpLoading(false);
        });
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className={`modern-login-container ${fadeIn ? 'fade-in' : ''}`}>
      {/* Futuristic Holographic Background */}
      <div className="modern-animated-bg">
        {/* Holographic Neural Network */}
        <div className="neural-network">
          {Array.from({length: 20}, (_, i) => (
            <div key={`node-${i}`} 
                 className="neural-node" 
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 3}s`
                 }}>
            </div>
          ))}
          {Array.from({length: 15}, (_, i) => (
            <div key={`connection-${i}`} 
                 className="neural-connection" 
                 style={{
                   left: `${Math.random() * 80}%`,
                   top: `${Math.random() * 80}%`,
                   width: `${50 + Math.random() * 100}px`,
                   transform: `rotate(${Math.random() * 360}deg)`,
                   animationDelay: `${Math.random() * 2}s`
                 }}>
            </div>
          ))}
        </div>

        {/* Holographic Medical Scanner */}
        <div className="medical-scanner">
          <div className="scanner-line"></div>
        </div>

        {/* Holographic Grid */}
        <div className="holographic-grid"></div>
        
        {/* Floating Medical Icons with Holographic Effect */}
        <div className="floating-medical-icon icon-1">💊</div>
        <div className="floating-medical-icon icon-2">🩺</div>
        <div className="floating-medical-icon icon-3">🏥</div>
        <div className="floating-medical-icon icon-4">⚕️</div>
        <div className="floating-medical-icon icon-5">💉</div>
        <div className="floating-medical-icon icon-6">🔬</div>
        <div className="floating-medical-icon icon-7">🧬</div>
        <div className="floating-medical-icon icon-8">❤️</div>
        
        {/* Geometric Shapes */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
        <div className="floating-shape shape-6"></div>
        <div className="floating-shape shape-7"></div>
        
        {/* Holographic Gradient Orbs */}
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
        
        {/* Enhanced Particle System */}
        <div className="particle-system">
          {Array.from({length: 40}, (_, i) => (
            <div key={i} className={`particle particle-${i % 5 + 1}`}
                 style={{
                   left: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 12}s`,
                   animationDuration: `${8 + Math.random() * 8}s`
                 }}>
            </div>
          ))}
          {Array.from({length: 25}, (_, i) => (
            <div key={`quantum-${i}`} className="quantum-particle"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 8}s`
                 }}>
            </div>
          ))}
        </div>
        
        {/* DNA Helix Animation */}
        <div className="dna-helix">
          <div className="dna-strand strand-1"></div>
          <div className="dna-strand strand-2"></div>
        </div>
        
        {/* Medical Cross Animation */}
        <div className="medical-cross cross-1">+</div>
        <div className="medical-cross cross-2">+</div>
        <div className="medical-cross cross-3">+</div>
      </div>
      <div className="login-content">
        {/* Modern header section */}
        <div className="login-header">
          <div className="logo-animation">
            <Lottie animationData={medicineLottie} loop={true} className="lottie-logo" />
          </div>
          <h1 className="brand-title">MediCore</h1>
          <p className="brand-subtitle">Advanced Healthcare Solutions</p>
          <div className="brand-tagline">Transforming Healthcare with Technology</div>
        </div>
        <div className="login-main">
          <div className="login-illustration">
            <img
              className="hero-image"
              src="https://newassets.apollo247.com/images/login_ap.png"
              alt="Medical Illustration"
            />
          </div>
          <div className="modern-login-card">
            {toggle === false ? (
              <div className="login-form-container">
                <div className="form-header">
                  <h2 className="form-title">Welcome Back!</h2>
                  <p className="form-subtitle">
                    Please enter your mobile number to continue
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="modern-form">
                  <div className="input-group">
                    <input
                      className="modern-input"
                      placeholder="Enter Mobile Number"
                      type="number"
                      onChange={handleChange}
                      required
                    />
                    <span className="input-highlight"></span>
                  </div>
                  <button className={`modern-btn ${isLoading ? 'loading' : ''}`} type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="btn-spinner"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </form>
                <div className="terms-section">
                  <p className="terms-text">
                    OTP will be sent via SMS and WhatsApp.<br />
                    By continuing, you agree to MediCore's
                    <a href="/" className="terms-link"> Privacy Policy</a> and
                    <a href="/" className="terms-link"> Terms of Service</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="otp-form-container">
                <div className="form-header">
                  <h2 className="form-title">Verify OTP</h2>
                  <p className="form-subtitle">
                    Enter the verification code sent to your mobile
                  </p>
                </div>
                <form onSubmit={submitOtp} className="modern-form">
                  <div className="input-group">
                    <input
                      className="modern-input otp-input"
                      type="number"
                      placeholder="Enter 6-digit OTP"
                      onChange={otpChange}
                      required
                      maxLength="6"
                    />
                    <span className="input-highlight"></span>
                  </div>
                  <button className={`modern-btn ${otpLoading ? 'loading' : ''}`} type="submit" disabled={otpLoading}>
                    {otpLoading ? (
                      <>
                        <div className="btn-spinner"></div>
                        <span>Verifying...</span>
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                </form>
                <div className="divider">
                  <span>or</span>
                </div>
                <div className="alternative-actions">
                  <button type="button" className="link-btn">Resend OTP</button>
                  <button type="button" className="modern-btn secondary">
                    Get OTP On Call
                  </button>
                </div>
              </div>
            )}
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
