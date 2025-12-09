import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaTimesCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaStethoscope
} from 'react-icons/fa';
import styled from 'styled-components';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
`;

const ModalTitle = styled.h2`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #1e293b;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${props => props.type === 'allowed' ? '#dcfce7' : props.type === 'prohibited' ? '#fef2f2' : '#f0f9ff'};
  border-radius: 8px;
  border-left: 4px solid ${props => props.type === 'allowed' ? '#16a34a' : props.type === 'prohibited' ? '#dc2626' : '#3b82f6'};
`;

const GuidelineText = styled.div`
  color: #374151;
  line-height: 1.6;
  
  strong {
    color: #1e293b;
    font-weight: 600;
  }
`;

const ImportantNote = styled.div`
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const GuidelinesModal = ({ isOpen, onClose, type = 'donation' }) => {
  const donationGuidelines = {
    allowed: [
      {
        text: "Unopened medicine packages with at least 6 months until expiry date",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Prescription medicines with valid doctor's prescription copy",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Over-the-counter medicines in original packaging",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Medicines stored in proper temperature and humidity conditions",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      }
    ],
    prohibited: [
      {
        text: "Expired medicines or those expiring within 6 months",
        icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Opened medicine bottles or damaged packaging",
        icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Controlled substances or narcotic medicines",
        icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Medicines requiring refrigeration without proper cold chain",
        icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      }
    ],
    process: [
      {
        text: "Fill out the donation form with accurate medicine details",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Choose pickup from collection center or home pickup option",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Our team will verify the medicines before acceptance",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Receive donation certificate and tax exemption receipt",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      }
    ]
  };

  const requestGuidelines = {
    eligibility: [
      {
        text: "Valid government-issued ID proof (Aadhar, PAN, etc.)",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Medical prescription or doctor's recommendation",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Income certificate or proof of financial need",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Complete medical history and current condition details",
        icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      }
    ],
    process: [
      {
        text: "Submit request form with all required documents",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Our medical team will verify your request within 48 hours",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "If approved, you'll receive pickup location and timing",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "Collect medicines from designated center with ID proof",
        icon: <FaInfoCircle style={{ color: '#3b82f6', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      }
    ],
    restrictions: [
      {
        text: "Maximum 3 requests per month per family",
        icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "No reselling or commercial use of donated medicines",
        icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      },
      {
        text: "False information will result in permanent ban",
        icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.2rem', marginTop: '0.1rem' }} />
      }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                {type === 'donation' ? (
                  <>
                    <FaHandHoldingHeart style={{ color: '#10b981' }} />
                    Medicine Donation Guidelines
                  </>
                ) : (
                  <>
                    <FaStethoscope style={{ color: '#3b82f6' }} />
                    Medicine Request Guidelines
                  </>
                )}
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            {type === 'donation' ? (
              <>
                <ImportantNote>
                  <FaShieldAlt style={{ color: '#f59e0b', fontSize: '1.5rem', marginTop: '0.2rem' }} />
                  <div>
                    <strong>Important:</strong> Medicine donation helps save lives and reduces healthcare costs. 
                    Please ensure all donated medicines meet safety standards to protect recipients.
                  </div>
                </ImportantNote>

                <Section>
                  <SectionTitle>
                    <FaCheckCircle style={{ color: '#16a34a' }} />
                    Acceptable Medicines
                  </SectionTitle>
                  {donationGuidelines.allowed.map((item, index) => (
                    <GuidelineItem key={index} type="allowed">
                      {item.icon}
                      <GuidelineText dangerouslySetInnerHTML={{ __html: item.text }} />
                    </GuidelineItem>
                  ))}
                </Section>

                <Section>
                  <SectionTitle>
                    <FaTimesCircle style={{ color: '#dc2626' }} />
                    Not Acceptable
                  </SectionTitle>
                  {donationGuidelines.prohibited.map((item, index) => (
                    <GuidelineItem key={index} type="prohibited">
                      {item.icon}
                      <GuidelineText dangerouslySetInnerHTML={{ __html: item.text }} />
                    </GuidelineItem>
                  ))}
                </Section>

                <Section>
                  <SectionTitle>
                    <FaInfoCircle style={{ color: '#3b82f6' }} />
                    Donation Process
                  </SectionTitle>
                  {donationGuidelines.process.map((item, index) => (
                    <GuidelineItem key={index} type="info">
                      {item.icon}
                      <GuidelineText dangerouslySetInnerHTML={{ __html: item.text }} />
                    </GuidelineItem>
                  ))}
                </Section>
              </>
            ) : (
              <>
                <ImportantNote>
                  <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: '1.5rem', marginTop: '0.2rem' }} />
                  <div>
                    <strong>Note:</strong> This service is for those genuinely in need. 
                    Misuse of this system deprives others who truly need help. All requests are verified.
                  </div>
                </ImportantNote>

                <Section>
                  <SectionTitle>
                    <FaCheckCircle style={{ color: '#16a34a' }} />
                    Eligibility Requirements
                  </SectionTitle>
                  {requestGuidelines.eligibility.map((item, index) => (
                    <GuidelineItem key={index} type="allowed">
                      {item.icon}
                      <GuidelineText dangerouslySetInnerHTML={{ __html: item.text }} />
                    </GuidelineItem>
                  ))}
                </Section>

                <Section>
                  <SectionTitle>
                    <FaInfoCircle style={{ color: '#3b82f6' }} />
                    Request Process
                  </SectionTitle>
                  {requestGuidelines.process.map((item, index) => (
                    <GuidelineItem key={index} type="info">
                      {item.icon}
                      <GuidelineText dangerouslySetInnerHTML={{ __html: item.text }} />
                    </GuidelineItem>
                  ))}
                </Section>

                <Section>
                  <SectionTitle>
                    <FaTimesCircle style={{ color: '#dc2626' }} />
                    Restrictions & Rules
                  </SectionTitle>
                  {requestGuidelines.restrictions.map((item, index) => (
                    <GuidelineItem key={index} type="prohibited">
                      {item.icon}
                      <GuidelineText dangerouslySetInnerHTML={{ __html: item.text }} />
                    </GuidelineItem>
                  ))}
                </Section>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default GuidelinesModal;
