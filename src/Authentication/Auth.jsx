import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-40px); }
`;

// Add more keyframes for variety
const float4 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-35px) rotate(12deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float5 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(-14deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float6 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(8deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float7 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-22px) rotate(7deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float8 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-28px) rotate(-10deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float9 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float10 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-32px) rotate(13deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

// Light healthcare theme background
const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f8fafc 60%, #e3f0ff 100%);
  position: relative;
  overflow: hidden;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  padding: 48px 36px 36px 36px;
  min-width: 340px;
  max-width: 380px;
  animation: ${props => props.animateIn ? slideIn : slideOut} 0.5s;
  transition: box-shadow 0.2s, transform 0.3s;
  position: relative;
  border: 1px solid #e3e3e3;
`;

const Title = styled.h2`
  color: #02475b;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #0087ba;
  font-size: 1.1rem;
  margin-bottom: 24px;
`;

const ToggleText = styled.p`
  color: #888;
  font-size: 1rem;
  margin-top: 24px;
  text-align: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #0087ba;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 4px;
  transition: color 0.2s;
  &:hover { color: #02475b; }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 10px;
  margin-bottom: 18px;
  border: 1.5px solid #e3e3e3;
  border-radius: 7px;
  font-size: 1rem;
  transition: border 0.2s, box-shadow 0.3s;
  &:focus {
    border: 1.5px solid #0087ba;
    outline: none;
    box-shadow: 0 0 0 2px #e3f0ff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #0087ba 0%, #24c6dc 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 7px;
  margin-top: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(36,198,220,0.08);
  &:hover {
    background: linear-gradient(90deg, #24c6dc 0%, #0087ba 100%);
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 20px rgba(36,198,220,0.15);
  }
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  font-size: 0.98rem;
  margin-bottom: 10px;
  text-align: center;
`;

// Medicine-themed animated icons
const float1 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float2 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-40px) rotate(-8deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const float3 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(6deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const AnimatedIcon = styled.img`
  position: absolute;
  z-index: 1;
  opacity: 0.18;
  pointer-events: none;
  user-select: none;
  animation: ${props => props.floatAnim} 5s ease-in-out infinite;
  width: ${props => props.size || '60px'};
  left: ${props => props.left};
  top: ${props => props.top};
`;

const AdminLoginCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
`;
const LockIcon = styled(FaLock)`
  color: #0087ba;
  font-size: 2.5rem;
  margin-bottom: 18px;
`;
const AdminInput = styled(Input)`
  font-size: 1.2rem;
  padding: 16px 12px;
  margin-bottom: 24px;
`;

const ADMIN_PASSWORD = 'admin123';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [animateIn, setAnimateIn] = useState(true);
  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);
  // Signup states
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
    gender: ""
  });
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  // Animation toggle
  const handleToggle = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimateIn(true);
      setLoginError("");
      setSignupError("");
    }, 400);
  };

  // Login logic (email/password or admin)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginAsAdmin) {
      if (password === ADMIN_PASSWORD) {
        setLoginError("");
        navigate("/admin");
      } else {
        setLoginError("Invalid admin password.");
        // Do not clear password field
      }
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      setLoginError("");
      navigate("/Details");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  // Signup logic
  const handleSignupChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!signupData.firstname || !signupData.lastname || !signupData.email || !signupData.password) {
      setSignupError("Please fill all required fields.");
      return;
    }
    // Save to localStorage (simulate registration)
    localStorage.setItem("user", JSON.stringify(signupData));
    setSignupError("");
    alert("Signup successful! Please login.");
    handleToggle();
  };

  return (
    <AuthContainer>
      {/* Medicine-themed animated icons */}
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
        floatAnim={float1}
        size="60px"
        left="8%"
        top="12%"
        alt="pill"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972187.png"
        floatAnim={float2}
        size="48px"
        left="80%"
        top="18%"
        alt="capsule"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972186.png"
        floatAnim={float3}
        size="54px"
        left="60%"
        top="80%"
        alt="medicine bottle"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972188.png"
        floatAnim={float2}
        size="44px"
        left="20%"
        top="70%"
        alt="syringe"
      />
      {/* New animated objects */}
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972190.png" // bandage
        floatAnim={float4}
        size="52px"
        left="88%"
        top="60%"
        alt="bandage"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972189.png" // stethoscope
        floatAnim={float5}
        size="60px"
        left="35%"
        top="8%"
        alt="stethoscope"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/833/833472.png" // heart
        floatAnim={float6}
        size="40px"
        left="70%"
        top="50%"
        alt="heart"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972191.png" // thermometer
        floatAnim={float4}
        size="38px"
        left="12%"
        top="60%"
        alt="thermometer"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972192.png" // dropper
        floatAnim={float5}
        size="38px"
        left="55%"
        top="20%"
        alt="dropper"
      />
      {/* New: First aid kit */}
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png" // first aid kit
        floatAnim={float7}
        size="54px"
        left="45%"
        top="90%"
        alt="first aid kit"
      />
      {/* New: Doctor */}
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" // doctor
        floatAnim={float8}
        size="60px"
        left="5%"
        top="45%"
        alt="doctor"
      />
      {/* New: Ambulance */}
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2965/2965568.png" // ambulance
        floatAnim={float9}
        size="56px"
        left="90%"
        top="40%"
        alt="ambulance"
      />
      {/* New: Prescription pad */}
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972193.png" // prescription
        floatAnim={float10}
        size="44px"
        left="30%"
        top="60%"
        alt="prescription"
      />
      {/* New: More pills/capsules */}
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972184.png" // pill 2
        floatAnim={float7}
        size="38px"
        left="75%"
        top="75%"
        alt="pill2"
      />
      <AnimatedIcon
        src="https://cdn-icons-png.flaticon.com/512/2972/2972183.png" // capsule 2
        floatAnim={float8}
        size="40px"
        left="15%"
        top="30%"
        alt="capsule2"
      />
      <div id="recaptcha-container" style={{position:'absolute', left: -9999}}></div>
      {isLogin ? (
        loginAsAdmin ? (
          <AdminLoginCard animateIn={animateIn}>
            <LockIcon />
            <Title>Admin Login</Title>
            <Subtitle>Enter admin password to access the panel</Subtitle>
            {loginError && <ErrorMsg>{loginError}</ErrorMsg>}
            <form onSubmit={handleLoginSubmit} style={{width:'100%'}}>
              <AdminInput
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
              />
              <Button type="submit">Login as Admin</Button>
            </form>
            <ToggleText>
              <ToggleButton onClick={()=>setLoginAsAdmin(false)}>Login as User</ToggleButton>
            </ToggleText>
          </AdminLoginCard>
        ) : (
          <Card animateIn={animateIn}>
            <Title>Login</Title>
            <Subtitle>Login with your email and password</Subtitle>
            <div style={{display:'flex', justifyContent:'center', gap:16, marginBottom:16}}>
              <label style={{cursor:'pointer', fontWeight: loginAsAdmin ? 400 : 700}}>
                <input type="radio" checked={!loginAsAdmin} onChange={()=>setLoginAsAdmin(false)} /> User
              </label>
              <label style={{cursor:'pointer', fontWeight: loginAsAdmin ? 700 : 400}}>
                <input type="radio" checked={loginAsAdmin} onChange={()=>setLoginAsAdmin(true)} /> Admin
              </label>
            </div>
            {loginError && <ErrorMsg>{loginError}</ErrorMsg>}
            <form onSubmit={handleLoginSubmit}>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Button type="submit">Login</Button>
            </form>
            <ToggleText>
              Don't have an account?
              <ToggleButton onClick={handleToggle}>Sign up</ToggleButton>
            </ToggleText>
          </Card>
        )
      ) : (
          <>
            <Title>Sign Up</Title>
            <Subtitle>Create your account</Subtitle>
            {signupError && <ErrorMsg>{signupError}</ErrorMsg>}
            <form onSubmit={handleSignupSubmit}>
              <Input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={signupData.firstname}
                onChange={handleSignupChange}
              />
              <Input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={signupData.lastname}
                onChange={handleSignupChange}
              />
              <Input
                type="date"
                name="age"
                placeholder="Date of Birth"
                value={signupData.age}
                onChange={handleSignupChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <Input
                as="select"
                name="gender"
                value={signupData.gender}
                onChange={handleSignupChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Input>
              <Button type="submit">Sign Up</Button>
            </form>
            <ToggleText>
              Already have an account?
              <ToggleButton onClick={handleToggle}>Login</ToggleButton>
            </ToggleText>
          </>
        )}
    </AuthContainer>
  );
};

export default Auth; 