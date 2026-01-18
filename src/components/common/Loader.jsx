import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="spinner-container">
        <div className="spinner"></div>
        <div className="spinner-center"></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .spinner-container {
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 8px solid rgba(0, 135, 186, 0.1);
    border-top-color: #0087ba;
    border-right-color: #02475b;
    animation: spin 1s linear infinite;
  }

  .spinner-center {
    position: absolute;
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #02475b 0%, #0087ba 100%);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 135, 186, 0.5);
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }
`;

export default Loader;
