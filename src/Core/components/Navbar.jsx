import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUserTie,
  faContactCard,
  faBell,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../footer/Footer";
import HomePage from "../homepage/HomePage";
import { useState, useEffect } from "react";
import "./Navbar.css";
import Slider from "../Slider/Slider";
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  z-index: 100;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 0 8px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  img {
    height: 48px;
    width: auto;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  @media (max-width: 768px) {
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: #02475b;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  &.active, &:hover {
    background: #e3f0ff;
    color: #0087ba;
  }
`;

const NavIcon = styled(FontAwesomeIcon)`
  margin-right: 6px;
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s;
  color: #02475b;
  
  &:hover {
    background: #e3f0ff;
    color: #0087ba;
  }
`;

const LogoutButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #ff0000;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);
  }
`;

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    
    // Check login status
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userProfile');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <NavbarContainer>
      <Logo to="/">
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{
            width: '48px', 
            height: '48px', 
            background: 'linear-gradient(135deg, #02475b, #0087ba)', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(2, 71, 91, 0.3)'
          }}>
            <span style={{color: 'white', fontSize: '24px', fontWeight: '800'}}>M+</span>
          </div>
          <span style={{fontSize: '1.5rem', fontWeight: '700', color: '#02475b'}}>MediCore</span>
        </div>
      </Logo>
      <NavLinks>
        <NavLinkStyled to="/home">Home</NavLinkStyled>
        <NavLinkStyled to="/doctors">Doctor Appointment</NavLinkStyled>
        <NavLinkStyled to="/pharmacy">Pharmacy</NavLinkStyled>
        <NavLinkStyled to="/labtest">Lab Test</NavLinkStyled>
        <NavLinkStyled to="/subscriptions">Subscription</NavLinkStyled>
        <NavLinkStyled to="/HealthTools">Health Tools</NavLinkStyled>
        <NavLinkStyled to="/cart" style={{position: 'relative'}}>
          <NavIcon icon={faCartShopping} />Cart
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#ff6900',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {cartCount}
            </span>
          )}
        </NavLinkStyled>
        <NavLinkStyled to="/dashboard">Dashboard</NavLinkStyled>
        <NavLinkStyled to="/account">Account</NavLinkStyled>
        
        {isLoggedIn && (
          <LogoutButton onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </LogoutButton>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
