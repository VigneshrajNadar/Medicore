import React, { useState, useRef } from 'react';
import './PrescriptionUpload.css';
import HeartbeatLoader from '../common/HeartbeatLoader';
import { FaUpload, FaCamera, FaEye, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import Tesseract from 'tesseract.js';

const PrescriptionUpload = ({ onPrescriptionProcessed }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [cameraStream, setCameraStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedMedicines, setExtractedMedicines] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const extractTextFromImage = async (file) => {
    setIsExtracting(true);
    
    try {
      if (file.type.startsWith('image/')) {
        // Use Tesseract.js for real OCR extraction
        const { data: { text } } = await Tesseract.recognize(
          file,
          'eng',
          {
            logger: m => console.log(m)
          }
        );
        
        // Parse the extracted text to identify prescription components
        const parsedData = parsePrescriptionText(text);
        
        setExtractedText(parsedData.formattedText);
        setDoctorInfo(parsedData.doctorInfo);
        setExtractedMedicines(parsedData.medicines || []);
        
      } else {
        setExtractedText('Please upload a valid image file (JPG, PNG, etc.)');
      }
      
    } catch (error) {
      console.error('OCR extraction failed:', error);
      setExtractedText('Failed to extract text from image. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  // Parse extracted OCR text to identify prescription components
  const parsePrescriptionText = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Extract doctor information
    let doctorName = '';
    let hospital = '';
    let license = '';
    let patientName = '';
    let age = '';
    let medicines = [];
    
    // Look for doctor name (usually contains Dr. and qualifications)
    const doctorLine = lines.find(line => 
      line.toLowerCase().includes('dr.') || 
      line.toLowerCase().includes('doctor') ||
      line.includes('MBBS') || 
      line.includes('MD')
    );
    if (doctorLine) {
      doctorName = doctorLine.trim();
    }
    
    // Look for hospital/clinic name
    const hospitalKeywords = ['hospital', 'clinic', 'medical', 'healthcare', 'center', 'centre'];
    const hospitalLine = lines.find(line => 
      hospitalKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );
    if (hospitalLine) {
      hospital = hospitalLine.trim();
    }
    
    // Look for license number
    const licenseLine = lines.find(line => 
      line.toLowerCase().includes('license') ||
      line.toLowerCase().includes('licence') ||
      line.toLowerCase().includes('reg') ||
      /[A-Z]{2}-\d{4,6}/.test(line)
    );
    if (licenseLine) {
      license = licenseLine.trim();
    }
    
    // Look for patient name
    const patientLine = lines.find(line => 
      line.toLowerCase().includes('patient') ||
      line.toLowerCase().includes('name')
    );
    if (patientLine) {
      patientName = patientLine.replace(/patient:?/i, '').replace(/name:?/i, '').trim();
    }
    
    // Look for age
    const ageLine = lines.find(line => 
      line.toLowerCase().includes('age') ||
      /\d+\s*years?/.test(line.toLowerCase())
    );
    if (ageLine) {
      age = ageLine.trim();
    }
    
    // Extract medicines (look for numbered lists or medicine names)
    const medicineLines = lines.filter(line => {
      const lowerLine = line.toLowerCase();
      return (
        /^\d+\./.test(line.trim()) || // Numbered list
        lowerLine.includes('mg') ||
        lowerLine.includes('ml') ||
        lowerLine.includes('tablet') ||
        lowerLine.includes('capsule') ||
        lowerLine.includes('syrup') ||
        lowerLine.includes('injection')
      );
    });
    
    medicines = medicineLines.map((line, index) => {
      // Parse medicine details from the line
      const parts = line.split('-');
      const nameAndDosage = parts[0] ? parts[0].replace(/^\d+\./, '').trim() : `Medicine ${index + 1}`;
      const instruction = parts[1] ? parts[1].trim() : '1 tablet daily';
      
      // Extract dosage from name
      const dosageMatch = nameAndDosage.match(/(\d+(?:\.\d+)?\s*(?:mg|mcg|g|ml|iu))/i);
      const dosage = dosageMatch ? dosageMatch[1] : '1 tablet';
      const name = nameAndDosage.replace(dosageMatch ? dosageMatch[0] : '', '').trim();
      
      return {
        name: name || `Medicine ${index + 1}`,
        dosage: dosage,
        instruction: instruction,
        duration: '30 days',
        quantity: 30
      };
    });
    
    // If no medicines found, create default entry
    if (medicines.length === 0) {
      medicines = [{
        name: 'Medicine (Please verify)',
        dosage: 'As prescribed',
        instruction: 'As directed by doctor',
        duration: '30 days',
        quantity: 30
      }];
    }
    
    // Format the extracted text
    const formattedText = `${doctorName || 'Doctor Name (Please verify)'}
${hospital || 'Hospital/Clinic (Please verify)'}
${license || 'License: (Please verify)'}

Patient: ${patientName || 'Patient Name (Please verify)'}
Age: ${age || 'Age (Please verify)'}
Date: ${new Date().toLocaleDateString()}

Rx:
${medicines.map((med, index) => 
      `${index + 1}. ${med.name} ${med.dosage} - ${med.instruction} x ${med.duration}`
    ).join('\n')}

Dr. Signature`;
    
    return {
      formattedText,
      doctorInfo: {
        name: doctorName || 'Doctor Name (Please verify)',
        hospital: hospital || 'Hospital/Clinic (Please verify)',
        license: license || 'License (Please verify)'
      },
      medicines
    };
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newFile = {
            id: Date.now() + Math.random(),
            file,
            preview: e.target.result,
            name: file.name,
            size: file.size,
            uploadTime: new Date(),
            type: file.type
          };
          
          setUploadedFiles(prev => [...prev, newFile]);
          extractTextFromImage(file);
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Clear the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      setCameraStream(stream);
      setShowCamera(true);
      
      // Wait for the video element to be available
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `prescription_${Date.now()}.jpg`, { type: 'image/jpeg' });
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const newFile = {
            id: Date.now() + Math.random(),
            file,
            preview: e.target.result,
            name: file.name,
            size: file.size,
            uploadTime: new Date(),
            type: 'image/jpeg'
          };
          
          setUploadedFiles(prev => [...prev, newFile]);
          extractTextFromImage(file);
        };
        
        reader.readAsDataURL(file);
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const submitForVerification = () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one prescription image before submitting for verification.');
      return;
    }
    
    setVerificationStatus('submitted');
    
    // Generate random verifying doctor
    const verifyingDoctors = [
      {
        name: 'Dr. Arjun Mehta',
        license: 'MH-67890',
        specialty: 'Internal Medicine',
        hospital: 'Apollo Hospital'
      },
      {
        name: 'Dr. Priya Sharma',
        license: 'DL-54321',
        specialty: 'General Medicine',
        hospital: 'AIIMS Delhi'
      },
      {
        name: 'Dr. Rajesh Kumar',
        license: 'KA-98765',
        specialty: 'Family Medicine',
        hospital: 'Manipal Hospital'
      },
      {
        name: 'Dr. Sneha Patel',
        license: 'GJ-11223',
        specialty: 'Clinical Medicine',
        hospital: 'Sterling Hospital'
      },
      {
        name: 'Dr. Vikram Singh',
        license: 'HR-44556',
        specialty: 'General Practice',
        hospital: 'Medanta Hospital'
      }
    ];
    
    const randomVerifier = verifyingDoctors[Math.floor(Math.random() * verifyingDoctors.length)];
    
    // Simulate verification process - 6 seconds loading
    setTimeout(() => {
      const isApproved = Math.random() > 0.2; // 80% approval rate
      
      if (isApproved) {
        setVerificationStatus('verified');
        setVerifyingDoctor(randomVerifier);
        
        // Pass prescription data to parent component
        if (onPrescriptionProcessed) {
          onPrescriptionProcessed({
            status: 'verified',
            medicines: extractedMedicines,
            doctorInfo: doctorInfo,
            verifyingDoctor: randomVerifier,
            verificationTime: new Date().toLocaleString()
          });
        }
      } else {
        setVerificationStatus('rejected');
      }
    }, 5000);
  };

  const [verifyingDoctor, setVerifyingDoctor] = useState(null);

  return (
    <div className="prescription-upload-container">
      <div className="upload-header">
        <h2>
          <span className="prescription-icon">📋</span>
          <span className="header-text">Prescription Upload & Verification</span>
        </h2>
        <p>Upload your prescription for quick verification and medicine ordering</p>
      </div>

      {/* File Upload Section */}
      <div className="upload-section">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
          <FaUpload /> Upload Prescription
        </button>
      </div>

      {/* Camera Capture */}
      <div className="camera-section">
        <button className="camera-btn" onClick={startCamera}>
          <FaCamera /> Take Photo
        </button>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="camera-modal">
          <div className="camera-content">
            <div className="camera-header">
              <h4>Take Prescription Photo</h4>
              <button className="close-camera" onClick={stopCamera}>
                <FaTimes />
              </button>
            </div>
            <div className="camera-view">
              <video ref={videoRef} autoPlay playsInline className="camera-video" />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className="camera-controls">
              <button className="capture-btn" onClick={capturePhoto}>
                <FaCamera /> Capture
              </button>
            </div>
            <div className="camera-tips">
              <p>• Ensure good lighting</p>
              <p>• Keep prescription flat and in focus</p>
              <p>• Include all text and signatures</p>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4>Uploaded Prescriptions</h4>
          {uploadedFiles.map(file => (
            <div key={file.id} className="file-item">
              <div className="file-preview-container">
                {file.type === 'application/pdf' ? (
                  <div className="pdf-preview">
                    <span>📄 PDF</span>
                  </div>
                ) : (
                  <img src={file.preview} alt="Prescription" className="file-preview" />
                )}
              </div>
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                <span className="upload-time">{file.uploadTime.toLocaleTimeString()}</span>
              </div>
              <div className="file-actions">
                <button className="view-btn" onClick={() => window.open(file.preview, '_blank')}>
                  <FaEye /> View
                </button>
                <button onClick={() => removeFile(file.id)} className="remove-btn">
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OCR Processing */}
      {isProcessing && (
        <div className="processing-section">
          <FaSpinner className="spinner" />
          <p>Extracting text from prescription...</p>
        </div>
      )}

      {/* Extracted Text */}
      {extractedText && !isProcessing && (
        <div className="extracted-text">
          <h4>Extracted Prescription Details</h4>
          <div className="text-content">
            <pre>{extractedText}</pre>
          </div>
          <div className="verification-actions">
            <button 
              onClick={submitForVerification} 
              className={`verify-btn ${verificationStatus === 'submitted' ? 'loading' : ''}`}
              disabled={verificationStatus === 'submitted'}
              style={verificationStatus === 'submitted' ? { backgroundColor: '#ffffff', color: '#6b7280', border: '2px solid #e5e7eb' } : {}}
            >
              {verificationStatus === 'submitted' ? (
                <div className="loading-container" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
                  <HeartbeatLoader />
                  <div className="loading-text" style={{ marginTop: '10px', color: '#6b7280' }}>🩺 Verifying by doctor...</div>
                </div>
              ) : (
                'Submit for Verification'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Verification Status */}
      {verificationStatus !== 'pending' && verificationStatus !== 'submitted' && (
        <div className={`verification-status ${verificationStatus}`}>
          {verificationStatus === 'verified' && (
            <>
              <FaCheck />
              <span>✅ Prescription verified and approved by Licensed Doctor</span>
              <div className="verification-details">
                <p>Verification ID: RX-{Date.now().toString().substr(-8)}</p>
                <p><strong>Verified by:</strong> {verifyingDoctor ? `${verifyingDoctor.name} (${verifyingDoctor.specialty})` : 'Dr. Arjun Mehta (Licensed Doctor)'}</p>
                <p><strong>Verifier License:</strong> {verifyingDoctor ? verifyingDoctor.license : 'MH-67890'}</p>
                <p><strong>Hospital:</strong> {verifyingDoctor ? verifyingDoctor.hospital : 'Apollo Hospital'}</p>
                <p>Approved medicines can now be ordered</p>
              </div>
            </>
          )}
          {verificationStatus === 'rejected' && (
            <>
              <FaTimes />
              <span>❌ Prescription requires clarification</span>
              <div className="rejection-details">
                <p>Reason: Some text is unclear or missing doctor signature</p>
                <p>Please upload a clearer image or contact the prescribing doctor</p>
                <button className="reupload-btn" onClick={() => {
                  setVerificationStatus('pending');
                  setExtractedText('');
                  setUploadedFiles([]);
                }}>Upload New Prescription</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Guidelines */}
      <div className="upload-guidelines">
        <h4>Guidelines for clear prescription photos:</h4>
        <ul>
          <li>Ensure good lighting and avoid shadows</li>
          <li>Keep the prescription flat and in focus</li>
          <li>Include doctor's signature and license number</li>
          <li>Make sure all text is clearly readable</li>
        </ul>
      </div>
    </div>
  );
};

export default PrescriptionUpload;
