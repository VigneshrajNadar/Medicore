import React, { useState, useEffect } from 'react';
import { FaSearch, FaStethoscope, FaThermometerHalf, FaHeartbeat } from 'react-icons/fa';
import Loader from '../common/Loader';
import './SymptomSearch.css';

const SymptomSearch = ({ onMedicinesSuggested }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [medicineSuggestions, setMedicineSuggestions] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDoctorConsultation, setShowDoctorConsultation] = useState(false);

  // Comprehensive symptom to medicine mapping with enhanced data
  const symptomMedicineMap = {
    'headache': [
      { name: 'Paracetamol', dosage: '500mg', type: 'OTC', reason: 'Pain relief', price: 15, rating: 4.5, sideEffects: 'Minimal when used as directed' },
      { name: 'Ibuprofen', dosage: '400mg', type: 'OTC', reason: 'Anti-inflammatory', price: 25, rating: 4.3, sideEffects: 'May cause stomach upset' },
      { name: 'Aspirin', dosage: '325mg', type: 'OTC', reason: 'Pain relief', price: 12, rating: 4.2, sideEffects: 'Avoid if allergic to salicylates' },
      { name: 'Sumatriptan', dosage: '50mg', type: 'Prescription', reason: 'Migraine relief', price: 180, rating: 4.7, sideEffects: 'May cause drowsiness' }
    ],
    'fever': [
      { name: 'Paracetamol', dosage: '650mg', type: 'OTC', reason: 'Fever reduction', price: 15, rating: 4.6, sideEffects: 'Safe when used as directed' },
      { name: 'Ibuprofen', dosage: '400mg', type: 'OTC', reason: 'Fever & inflammation', price: 25, rating: 4.4, sideEffects: 'Take with food' },
      { name: 'Crocin', dosage: '500mg', type: 'OTC', reason: 'Fever relief', price: 18, rating: 4.3, sideEffects: 'Minimal side effects' },
      { name: 'Mefenamic Acid', dosage: '250mg', type: 'Prescription', reason: 'High fever', price: 45, rating: 4.1, sideEffects: 'May cause dizziness' }
    ],
    'cold': [
      { name: 'Cetirizine', dosage: '10mg', type: 'OTC', reason: 'Antihistamine', price: 22, rating: 4.4, sideEffects: 'May cause drowsiness' },
      { name: 'Phenylephrine', dosage: '10mg', type: 'OTC', reason: 'Nasal decongestant', price: 35, rating: 4.2, sideEffects: 'Avoid if hypertensive' },
      { name: 'Dextromethorphan', dosage: '15mg', type: 'OTC', reason: 'Cough suppressant', price: 28, rating: 4.0, sideEffects: 'May cause mild sedation' },
      { name: 'Vitamin C', dosage: '500mg', type: 'Supplement', reason: 'Immune support', price: 20, rating: 4.3, sideEffects: 'Generally safe' }
    ],
    'cough': [
      { name: 'Dextromethorphan', dosage: '15mg', type: 'OTC', reason: 'Dry cough', price: 28, rating: 4.1, sideEffects: 'Avoid with MAO inhibitors' },
      { name: 'Guaifenesin', dosage: '200mg', type: 'OTC', reason: 'Expectorant', price: 32, rating: 3.9, sideEffects: 'Drink plenty of water' },
      { name: 'Honey Lozenges', dosage: '1 piece', type: 'Natural', reason: 'Throat soothing', price: 15, rating: 4.2, sideEffects: 'None known' },
      { name: 'Codeine Syrup', dosage: '5ml', type: 'Prescription', reason: 'Severe cough', price: 85, rating: 4.5, sideEffects: 'May cause drowsiness' }
    ],
    'diabetes': [
      { name: 'Metformin', dosage: '500mg', type: 'Prescription', reason: 'Blood sugar control', price: 45, rating: 4.6, sideEffects: 'May cause GI upset initially' },
      { name: 'Glimepiride', dosage: '2mg', type: 'Prescription', reason: 'Insulin stimulation', price: 65, rating: 4.4, sideEffects: 'Monitor for hypoglycemia' },
      { name: 'Insulin Glargine', dosage: '10 units', type: 'Prescription', reason: 'Long-acting insulin', price: 320, rating: 4.7, sideEffects: 'Injection site reactions' },
      { name: 'Sitagliptin', dosage: '100mg', type: 'Prescription', reason: 'DPP-4 inhibitor', price: 180, rating: 4.3, sideEffects: 'Generally well tolerated' }
    ],
    'hypertension': [
      { name: 'Amlodipine', dosage: '5mg', type: 'Prescription', reason: 'Calcium channel blocker', price: 35, rating: 4.5, sideEffects: 'May cause ankle swelling' },
      { name: 'Lisinopril', dosage: '10mg', type: 'Prescription', reason: 'ACE inhibitor', price: 28, rating: 4.4, sideEffects: 'May cause dry cough' },
      { name: 'Metoprolol', dosage: '50mg', type: 'Prescription', reason: 'Beta blocker', price: 42, rating: 4.3, sideEffects: 'May cause fatigue' },
      { name: 'Losartan', dosage: '50mg', type: 'Prescription', reason: 'ARB medication', price: 55, rating: 4.6, sideEffects: 'Generally well tolerated' }
    ],
    'acidity': [
      { name: 'Omeprazole', dosage: '20mg', type: 'OTC', reason: 'Acid reducer', price: 38, rating: 4.5, sideEffects: 'Long-term use may affect B12' },
      { name: 'Ranitidine', dosage: '150mg', type: 'OTC', reason: 'H2 blocker', price: 25, rating: 4.2, sideEffects: 'Generally safe' },
      { name: 'Antacid', dosage: '2 tablets', type: 'OTC', reason: 'Immediate relief', price: 12, rating: 4.0, sideEffects: 'May cause constipation' },
      { name: 'Pantoprazole', dosage: '40mg', type: 'Prescription', reason: 'Severe acid reflux', price: 65, rating: 4.6, sideEffects: 'Take before meals' }
    ],
    'allergy': [
      { name: 'Cetirizine', dosage: '10mg', type: 'OTC', reason: 'Antihistamine', price: 22, rating: 4.4, sideEffects: 'May cause drowsiness' },
      { name: 'Loratadine', dosage: '10mg', type: 'OTC', reason: 'Non-drowsy antihistamine', price: 28, rating: 4.5, sideEffects: 'Minimal drowsiness' },
      { name: 'Prednisolone', dosage: '5mg', type: 'Prescription', reason: 'Severe allergic reactions', price: 45, rating: 4.3, sideEffects: 'Short-term use recommended' },
      { name: 'Fexofenadine', dosage: '120mg', type: 'OTC', reason: 'Seasonal allergies', price: 35, rating: 4.6, sideEffects: 'Non-sedating' }
    ],
    'pain': [
      { name: 'Diclofenac', dosage: '50mg', type: 'Prescription', reason: 'Anti-inflammatory', price: 32, rating: 4.4, sideEffects: 'Take with food' },
      { name: 'Tramadol', dosage: '50mg', type: 'Prescription', reason: 'Moderate to severe pain', price: 55, rating: 4.2, sideEffects: 'May cause dizziness' },
      { name: 'Paracetamol', dosage: '500mg', type: 'OTC', reason: 'Mild to moderate pain', price: 15, rating: 4.5, sideEffects: 'Safe when used correctly' },
      { name: 'Morphine', dosage: '10mg', type: 'Prescription', reason: 'Severe pain', price: 120, rating: 4.7, sideEffects: 'Highly regulated, addiction risk' }
    ],
    'insomnia': [
      { name: 'Melatonin', dosage: '3mg', type: 'OTC', reason: 'Sleep regulation', price: 25, rating: 4.3, sideEffects: 'May cause morning grogginess' },
      { name: 'Diphenhydramine', dosage: '25mg', type: 'OTC', reason: 'Sleep aid', price: 18, rating: 3.9, sideEffects: 'May cause dry mouth' },
      { name: 'Zolpidem', dosage: '10mg', type: 'Prescription', reason: 'Sleep induction', price: 85, rating: 4.4, sideEffects: 'Short-term use only' },
      { name: 'Trazodone', dosage: '50mg', type: 'Prescription', reason: 'Sleep disorders', price: 42, rating: 4.2, sideEffects: 'May cause drowsiness next day' }
    ],
    'anxiety': [
      { name: 'Alprazolam', dosage: '0.5mg', type: 'Prescription', reason: 'Anxiety relief', price: 65, rating: 4.3, sideEffects: 'Addiction potential' },
      { name: 'Sertraline', dosage: '50mg', type: 'Prescription', reason: 'Long-term anxiety', price: 75, rating: 4.5, sideEffects: 'Takes 2-4 weeks to work' },
      { name: 'Ashwagandha', dosage: '300mg', type: 'Natural', reason: 'Stress relief', price: 35, rating: 4.1, sideEffects: 'Generally safe' }
    ],
    'nausea': [
      { name: 'Ondansetron', dosage: '4mg', type: 'Prescription', reason: 'Severe nausea', price: 85, rating: 4.6, sideEffects: 'May cause constipation' },
      { name: 'Domperidone', dosage: '10mg', type: 'Prescription', reason: 'Nausea & vomiting', price: 28, rating: 4.3, sideEffects: 'Take before meals' },
      { name: 'Ginger Capsules', dosage: '250mg', type: 'Natural', reason: 'Motion sickness', price: 22, rating: 4.0, sideEffects: 'Generally safe' }
    ],
    'diarrhea': [
      { name: 'Loperamide', dosage: '2mg', type: 'OTC', reason: 'Diarrhea control', price: 18, rating: 4.4, sideEffects: 'May cause constipation' },
      { name: 'ORS Packets', dosage: '1 packet', type: 'OTC', reason: 'Rehydration', price: 8, rating: 4.6, sideEffects: 'None known' },
      { name: 'Probiotics', dosage: '1 capsule', type: 'Supplement', reason: 'Gut health', price: 45, rating: 4.2, sideEffects: 'Generally safe' }
    ]
  };

  // Comprehensive symptom database
  const symptomDatabase = [
    // Neurological Symptoms
    { name: 'Headache', icon: '🤕', category: 'Neurological' },
    { name: 'Migraine', icon: '😵‍💫', category: 'Neurological' },
    { name: 'Dizziness', icon: '😵', category: 'Neurological' },
    { name: 'Vertigo', icon: '🌀', category: 'Neurological' },
    { name: 'Memory Loss', icon: '🧠', category: 'Neurological' },
    { name: 'Confusion', icon: '😕', category: 'Neurological' },
    { name: 'Seizures', icon: '⚡', category: 'Neurological' },
    { name: 'Numbness', icon: '🤲', category: 'Neurological' },
    { name: 'Tingling', icon: '✨', category: 'Neurological' },
    { name: 'Tremors', icon: '🤝', category: 'Neurological' },
    
    // Respiratory Symptoms
    { name: 'Cough', icon: '😷', category: 'Respiratory' },
    { name: 'Dry Cough', icon: '🤧', category: 'Respiratory' },
    { name: 'Wet Cough', icon: '💧', category: 'Respiratory' },
    { name: 'Sore Throat', icon: '😣', category: 'Respiratory' },
    { name: 'Runny Nose', icon: '🤧', category: 'Respiratory' },
    { name: 'Stuffy Nose', icon: '😤', category: 'Respiratory' },
    { name: 'Shortness of Breath', icon: '😮‍💨', category: 'Respiratory' },
    { name: 'Wheezing', icon: '🌬️', category: 'Respiratory' },
    { name: 'Chest Congestion', icon: '🫁', category: 'Respiratory' },
    { name: 'Sneezing', icon: '🤧', category: 'Respiratory' },
    { name: 'Hoarse Voice', icon: '🗣️', category: 'Respiratory' },
    
    // Digestive Symptoms
    { name: 'Nausea', icon: '🤢', category: 'Digestive' },
    { name: 'Vomiting', icon: '🤮', category: 'Digestive' },
    { name: 'Stomach Pain', icon: '😖', category: 'Digestive' },
    { name: 'Abdominal Pain', icon: '🤰', category: 'Digestive' },
    { name: 'Diarrhea', icon: '💩', category: 'Digestive' },
    { name: 'Constipation', icon: '🚽', category: 'Digestive' },
    { name: 'Bloating', icon: '🎈', category: 'Digestive' },
    { name: 'Gas', icon: '💨', category: 'Digestive' },
    { name: 'Heartburn', icon: '🔥', category: 'Digestive' },
    { name: 'Acid Reflux', icon: '⬆️', category: 'Digestive' },
    { name: 'Loss of Appetite', icon: '🍽️', category: 'Digestive' },
    { name: 'Indigestion', icon: '😵', category: 'Digestive' },
    
    // General Symptoms
    { name: 'Fever', icon: '🤒', category: 'General' },
    { name: 'Chills', icon: '🥶', category: 'General' },
    { name: 'Fatigue', icon: '😴', category: 'General' },
    { name: 'Weakness', icon: '😮‍💨', category: 'General' },
    { name: 'Weight Loss', icon: '⚖️', category: 'General' },
    { name: 'Weight Gain', icon: '📈', category: 'General' },
    { name: 'Night Sweats', icon: '💦', category: 'General' },
    { name: 'Dehydration', icon: '🏜️', category: 'General' },
    { name: 'Malaise', icon: '😞', category: 'General' },
    
    // Musculoskeletal Symptoms
    { name: 'Back Pain', icon: '🤕', category: 'Musculoskeletal' },
    { name: 'Neck Pain', icon: '😬', category: 'Musculoskeletal' },
    { name: 'Joint Pain', icon: '🦴', category: 'Musculoskeletal' },
    { name: 'Muscle Pain', icon: '💪', category: 'Musculoskeletal' },
    { name: 'Muscle Cramps', icon: '⚡', category: 'Musculoskeletal' },
    { name: 'Stiffness', icon: '🔒', category: 'Musculoskeletal' },
    { name: 'Swelling', icon: '🎈', category: 'Musculoskeletal' },
    { name: 'Bruising', icon: '🟣', category: 'Musculoskeletal' },
    
    // Cardiovascular Symptoms
    { name: 'Chest Pain', icon: '💔', category: 'Cardiovascular' },
    { name: 'Heart Palpitations', icon: '💓', category: 'Cardiovascular' },
    { name: 'Rapid Heartbeat', icon: '⚡', category: 'Cardiovascular' },
    { name: 'Slow Heartbeat', icon: '🐌', category: 'Cardiovascular' },
    { name: 'High Blood Pressure', icon: '📈', category: 'Cardiovascular' },
    { name: 'Low Blood Pressure', icon: '📉', category: 'Cardiovascular' },
    
    // Dermatological Symptoms
    { name: 'Rash', icon: '🔴', category: 'Dermatological' },
    { name: 'Itching', icon: '🤏', category: 'Dermatological' },
    { name: 'Hives', icon: '🟡', category: 'Dermatological' },
    { name: 'Dry Skin', icon: '🏜️', category: 'Dermatological' },
    { name: 'Acne', icon: '🔴', category: 'Dermatological' },
    { name: 'Eczema', icon: '🟤', category: 'Dermatological' },
    { name: 'Psoriasis', icon: '⚪', category: 'Dermatological' },
    { name: 'Sunburn', icon: '☀️', category: 'Dermatological' },
    
    // Eye Symptoms
    { name: 'Eye Pain', icon: '👁️', category: 'Ophthalmological' },
    { name: 'Blurred Vision', icon: '👓', category: 'Ophthalmological' },
    { name: 'Double Vision', icon: '👀', category: 'Ophthalmological' },
    { name: 'Dry Eyes', icon: '💧', category: 'Ophthalmological' },
    { name: 'Red Eyes', icon: '🔴', category: 'Ophthalmological' },
    { name: 'Itchy Eyes', icon: '👁️', category: 'Ophthalmological' },
    { name: 'Light Sensitivity', icon: '☀️', category: 'Ophthalmological' },
    
    // Ear Symptoms
    { name: 'Ear Pain', icon: '👂', category: 'ENT' },
    { name: 'Hearing Loss', icon: '🔇', category: 'ENT' },
    { name: 'Ringing in Ears', icon: '🔔', category: 'ENT' },
    { name: 'Ear Discharge', icon: '💧', category: 'ENT' },
    
    // Urological Symptoms
    { name: 'Frequent Urination', icon: '🚽', category: 'Urological' },
    { name: 'Painful Urination', icon: '😣', category: 'Urological' },
    { name: 'Blood in Urine', icon: '🩸', category: 'Urological' },
    { name: 'Kidney Pain', icon: '🫘', category: 'Urological' },
    
    // Mental Health Symptoms
    { name: 'Anxiety', icon: '😰', category: 'Mental Health' },
    { name: 'Depression', icon: '😢', category: 'Mental Health' },
    { name: 'Stress', icon: '😤', category: 'Mental Health' },
    { name: 'Insomnia', icon: '😴', category: 'Mental Health' },
    { name: 'Mood Swings', icon: '🎭', category: 'Mental Health' },
    { name: 'Irritability', icon: '😠', category: 'Mental Health' },
    
    // Women's Health
    { name: 'Menstrual Cramps', icon: '🩸', category: 'Women\'s Health' },
    { name: 'Irregular Periods', icon: '📅', category: 'Women\'s Health' },
    { name: 'Hot Flashes', icon: '🔥', category: 'Women\'s Health' },
    { name: 'Breast Pain', icon: '🤱', category: 'Women\'s Health' },
    
    // Pediatric Symptoms
    { name: 'Teething Pain', icon: '👶', category: 'Pediatric' },
    { name: 'Diaper Rash', icon: '🍼', category: 'Pediatric' },
    { name: 'Colic', icon: '😭', category: 'Pediatric' },
    
    // Allergic Reactions
    { name: 'Allergic Reaction', icon: '🤧', category: 'Allergic' },
    { name: 'Food Allergy', icon: '🥜', category: 'Allergic' },
    { name: 'Seasonal Allergies', icon: '🌸', category: 'Allergic' },
    { name: 'Drug Allergy', icon: '💊', category: 'Allergic' }
  ];

  const commonSymptoms = [
    // Most Common Symptoms (Daily Occurrences)
    { name: 'Headache', icon: '🤕', category: 'Neurological', frequency: 'Very Common' },
    { name: 'Fever', icon: '🤒', category: 'General', frequency: 'Very Common' },
    { name: 'Cough', icon: '😷', category: 'Respiratory', frequency: 'Very Common' },
    { name: 'Fatigue', icon: '😴', category: 'General', frequency: 'Very Common' },
    { name: 'Nausea', icon: '🤢', category: 'Digestive', frequency: 'Very Common' },
    { name: 'Back Pain', icon: '🤕', category: 'Musculoskeletal', frequency: 'Very Common' },
    { name: 'Sore Throat', icon: '😣', category: 'Respiratory', frequency: 'Very Common' },
    { name: 'Runny Nose', icon: '🤧', category: 'Respiratory', frequency: 'Very Common' },
    { name: 'Stomach Pain', icon: '😖', category: 'Digestive', frequency: 'Very Common' },
    { name: 'Dizziness', icon: '😵', category: 'Neurological', frequency: 'Very Common' },
    { name: 'Joint Pain', icon: '🦴', category: 'Musculoskeletal', frequency: 'Very Common' },
    { name: 'Heartburn', icon: '🔥', category: 'Digestive', frequency: 'Very Common' },
    
    // Common Symptoms (Weekly Occurrences)
    { name: 'Migraine', icon: '😵‍💫', category: 'Neurological', frequency: 'Common' },
    { name: 'Chest Pain', icon: '💔', category: 'Cardiovascular', frequency: 'Common' },
    { name: 'Shortness of Breath', icon: '😮‍💨', category: 'Respiratory', frequency: 'Common' },
    { name: 'Rash', icon: '🔴', category: 'Dermatological', frequency: 'Common' },
    { name: 'Itching', icon: '🤏', category: 'Dermatological', frequency: 'Common' },
    { name: 'Constipation', icon: '🚽', category: 'Digestive', frequency: 'Common' },
    { name: 'Diarrhea', icon: '💩', category: 'Digestive', frequency: 'Common' },
    { name: 'Bloating', icon: '🎈', category: 'Digestive', frequency: 'Common' },
    { name: 'Muscle Pain', icon: '💪', category: 'Musculoskeletal', frequency: 'Common' },
    { name: 'Eye Pain', icon: '👁️', category: 'Ophthalmological', frequency: 'Common' },
    { name: 'Ear Pain', icon: '👂', category: 'ENT', frequency: 'Common' },
    { name: 'Anxiety', icon: '😰', category: 'Mental Health', frequency: 'Common' },
    { name: 'Insomnia', icon: '😴', category: 'Mental Health', frequency: 'Common' },
    { name: 'Allergic Reaction', icon: '🤧', category: 'Allergic', frequency: 'Common' },
    
    // Seasonal/Periodic Symptoms
    { name: 'Seasonal Allergies', icon: '🌸', category: 'Allergic', frequency: 'Seasonal' },
    { name: 'Dry Skin', icon: '🏜️', category: 'Dermatological', frequency: 'Seasonal' },
    { name: 'Chills', icon: '🥶', category: 'General', frequency: 'Seasonal' },
    { name: 'Stuffy Nose', icon: '😤', category: 'Respiratory', frequency: 'Seasonal' },
    { name: 'Sneezing', icon: '🤧', category: 'Respiratory', frequency: 'Seasonal' },
    
    // Women's Health (Monthly/Periodic)
    { name: 'Menstrual Cramps', icon: '🩸', category: 'Women\'s Health', frequency: 'Monthly' },
    { name: 'Mood Swings', icon: '🎭', category: 'Mental Health', frequency: 'Periodic' },
    { name: 'Breast Pain', icon: '🤱', category: 'Women\'s Health', frequency: 'Periodic' },
    
    // Age-Related Symptoms
    { name: 'Memory Loss', icon: '🧠', category: 'Neurological', frequency: 'Age-Related' },
    { name: 'Joint Stiffness', icon: '🔒', category: 'Musculoskeletal', frequency: 'Age-Related' },
    { name: 'Hearing Loss', icon: '🔇', category: 'ENT', frequency: 'Age-Related' },
    { name: 'Blurred Vision', icon: '👓', category: 'Ophthalmological', frequency: 'Age-Related' },
    
    // Chronic Conditions (Ongoing)
    { name: 'High Blood Pressure', icon: '📈', category: 'Cardiovascular', frequency: 'Chronic' },
    { name: 'Diabetes Symptoms', icon: '🩸', category: 'Endocrine', frequency: 'Chronic' },
    { name: 'Arthritis Pain', icon: '🦴', category: 'Musculoskeletal', frequency: 'Chronic' },
    { name: 'Acid Reflux', icon: '⬆️', category: 'Digestive', frequency: 'Chronic' },
    
    // Stress-Related Symptoms
    { name: 'Stress', icon: '😤', category: 'Mental Health', frequency: 'Stress-Related' },
    { name: 'Tension Headache', icon: '🤕', category: 'Neurological', frequency: 'Stress-Related' },
    { name: 'Muscle Tension', icon: '💪', category: 'Musculoskeletal', frequency: 'Stress-Related' },
    { name: 'Irritability', icon: '😠', category: 'Mental Health', frequency: 'Stress-Related' },
    
    // Lifestyle-Related Symptoms
    { name: 'Dehydration', icon: '🏜️', category: 'General', frequency: 'Lifestyle' },
    { name: 'Weight Gain', icon: '📈', category: 'General', frequency: 'Lifestyle' },
    { name: 'Weight Loss', icon: '⚖️', category: 'General', frequency: 'Lifestyle' },
    { name: 'Night Sweats', icon: '💦', category: 'General', frequency: 'Lifestyle' },
    
    // Emergency Symptoms (Rare but Critical)
    { name: 'Chest Tightness', icon: '💔', category: 'Cardiovascular', frequency: 'Emergency' },
    { name: 'Severe Headache', icon: '🤕', category: 'Neurological', frequency: 'Emergency' },
    { name: 'Difficulty Breathing', icon: '😮‍💨', category: 'Respiratory', frequency: 'Emergency' },
    { name: 'Severe Abdominal Pain', icon: '🤰', category: 'Digestive', frequency: 'Emergency' },
    { name: 'Insomnia', icon: '😴', category: 'Sleep', frequency: 'Common' },
    { name: 'Anxiety', icon: '😰', category: 'Mental Health', frequency: 'Common' },
    { name: 'Nausea', icon: '🤢', category: 'Digestive', frequency: 'Common' },
    { name: 'Diarrhea', icon: '💩', category: 'Digestive', frequency: 'Common' },
    { name: 'Back Pain', icon: '🦴', category: 'Pain', frequency: 'Very Common' },
    { name: 'Skin Rash', icon: '🔴', category: 'Dermatology', frequency: 'Common' },
    { name: 'Joint Pain', icon: '🦵', category: 'Orthopedic', frequency: 'Common' }
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = commonSymptoms.filter(symptom =>
        symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSymptomSelect = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      const newSymptoms = [...selectedSymptoms, symptom];
      setSelectedSymptoms(newSymptoms);
      
      // Trigger AI analysis
      performAIAnalysis(newSymptoms);
      
      // Get medicine suggestions for all selected symptoms
      const allMedicines = [];
      newSymptoms.forEach(sym => {
        const medicines = symptomMedicineMap[sym.toLowerCase()];
        if (medicines) {
          allMedicines.push(...medicines);
        }
      });
      
      // Remove duplicates and sort by rating
      const uniqueMedicines = allMedicines.filter((medicine, index, self) => 
        index === self.findIndex(m => m.name === medicine.name)
      ).sort((a, b) => b.rating - a.rating);
      
      setMedicineSuggestions(uniqueMedicines);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const performAIAnalysis = (symptoms) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const analysisResult = generateAIAnalysis(symptoms);
      setAiAnalysis(analysisResult);
      setIsAnalyzing(false);
      
      // Show doctor consultation if serious symptoms detected
      if (analysisResult.severity === 'serious' || analysisResult.severity === 'urgent') {
        setShowDoctorConsultation(true);
      }
    }, 2000);
  };

  const generateAIAnalysis = (symptoms) => {
    const symptomList = symptoms.map(s => s.toLowerCase());
    
    // Serious symptoms that require immediate medical attention
    const seriousSymptoms = ['chest pain', 'difficulty breathing', 'severe headache', 'high fever', 'blood in stool', 'severe abdominal pain'];
    const urgentSymptoms = ['unconsciousness', 'seizure', 'severe bleeding', 'heart attack', 'stroke'];
    
    // Check for urgent conditions
    if (symptomList.some(s => urgentSymptoms.some(us => s.includes(us)))) {
      return {
        severity: 'urgent',
        possibleConditions: ['Emergency Medical Condition'],
        recommendation: 'SEEK IMMEDIATE EMERGENCY MEDICAL ATTENTION',
        confidence: 'high',
        safetyMessage: '🚨 Call emergency services immediately. Do not delay medical treatment.',
        otcSuggestions: [],
        doctorRequired: true
      };
    }
    
    // Check for serious conditions
    if (symptomList.some(s => seriousSymptoms.some(ss => s.includes(ss)))) {
      return {
        severity: 'serious',
        possibleConditions: ['Requires Medical Evaluation'],
        recommendation: 'Consult a doctor within 24 hours',
        confidence: 'high',
        safetyMessage: '⚠️ These symptoms may indicate a condition requiring professional medical evaluation.',
        otcSuggestions: [],
        doctorRequired: true
      };
    }
    
    // Common conditions analysis
    const commonConditions = {
      'cold': ['headache', 'fever', 'cough', 'runny nose'],
      'flu': ['fever', 'headache', 'body aches', 'fatigue'],
      'allergies': ['runny nose', 'sneezing', 'itchy eyes', 'rash'],
      'migraine': ['severe headache', 'nausea', 'sensitivity to light'],
      'indigestion': ['stomach pain', 'nausea', 'bloating', 'heartburn']
    };
    
    let bestMatch = { condition: '', score: 0 };
    Object.entries(commonConditions).forEach(([condition, conditionSymptoms]) => {
      const matchScore = symptomList.filter(s => 
        conditionSymptoms.some(cs => s.includes(cs) || cs.includes(s))
      ).length;
      if (matchScore > bestMatch.score) {
        bestMatch = { condition, score: matchScore };
      }
    });
    
    if (bestMatch.score > 0) {
      return {
        severity: 'mild',
        possibleConditions: [bestMatch.condition.charAt(0).toUpperCase() + bestMatch.condition.slice(1)],
        recommendation: 'Consider OTC treatment and monitor symptoms',
        confidence: bestMatch.score >= 2 ? 'high' : 'moderate',
        safetyMessage: '💡 These appear to be common symptoms. OTC medicines may help, but consult a doctor if symptoms persist or worsen.',
        otcSuggestions: getOTCSuggestions(bestMatch.condition),
        doctorRequired: false
      };
    }
    
    return {
      severity: 'unknown',
      possibleConditions: ['Unclear Pattern'],
      recommendation: 'Monitor symptoms and consult healthcare provider if concerned',
      confidence: 'low',
      safetyMessage: '🤔 Symptom pattern is unclear. Please consult a healthcare provider for proper evaluation.',
      otcSuggestions: [],
      doctorRequired: true
    };
  };

  const getOTCSuggestions = (condition) => {
    const otcMap = {
      'cold': ['Paracetamol (fever/pain)', 'Cetirizine (runny nose)', 'Cough syrup'],
      'flu': ['Paracetamol (fever/body aches)', 'Rest and fluids', 'Throat lozenges'],
      'allergies': ['Cetirizine (antihistamine)', 'Loratadine (non-drowsy)', 'Nasal decongestant'],
      'migraine': ['Paracetamol', 'Ibuprofen', 'Rest in dark room'],
      'indigestion': ['Antacid', 'Omeprazole (acid reducer)', 'Digestive enzymes']
    };
    return otcMap[condition] || [];
  };

  const handleRemoveSymptom = (symptomToRemove) => {
    const newSymptoms = selectedSymptoms.filter(symptom => symptom.name !== symptomToRemove);
    setSelectedSymptoms(newSymptoms);
    
    if (newSymptoms.length === 0) {
      setMedicineSuggestions([]);
      setAiAnalysis(null);
      setShowDoctorConsultation(false);
    } else {
      // Recalculate medicine suggestions and AI analysis
      performAIAnalysis(newSymptoms);
      
      const allMedicines = [];
      newSymptoms.forEach(sym => {
        const medicines = symptomMedicineMap[sym.toLowerCase()];
        if (medicines) {
          allMedicines.push(...medicines);
        }
      });
      
      const uniqueMedicines = allMedicines.filter((medicine, index, self) => 
        index === self.findIndex(m => m.name === medicine.name)
      ).sort((a, b) => b.rating - a.rating);
      
      setMedicineSuggestions(uniqueMedicines);
    }
  };

  return (
    <div className="symptom-search">
      <div className="search-header modern-header">
        <div className="header-content">
          <div className="header-icon-wrapper">
            <FaStethoscope className="header-icon" />
          </div>
          <div className="header-text">
            <h3>🩺 AI-Powered Symptom Analysis</h3>
            <p>Describe your symptoms and get personalized medicine recommendations with detailed information</p>
          </div>
        </div>
        <div className="health-stats">
          <div className="stat-card">
            <span className="stat-number">15+</span>
            <span className="stat-label">Conditions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">98%</span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      {/* Modern Search Input */}
      <div className="search-input-container modern-search">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Describe your symptoms in detail (e.g., severe headache with nausea)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="symptom-input modern-input"
          />
          <div className="search-suggestions">
            <span className="quick-search" onClick={() => setSearchTerm('headache')}>Headache</span>
            <span className="quick-search" onClick={() => setSearchTerm('fever')}>Fever</span>
            <span className="quick-search" onClick={() => setSearchTerm('cold')}>Cold</span>
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((symptom, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSymptomSelect(symptom.name)}
            >
              <span className="symptom-icon">{symptom.icon}</span>
              <div className="symptom-info">
                <span className="symptom-name">{symptom.name}</span>
                <span className="symptom-category">{symptom.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Common Symptoms */}
      <div className="common-symptoms">
        <h4>Common Symptoms</h4>
        <div className="symptoms-grid">
          {commonSymptoms.map((symptom, index) => (
            <button
              key={index}
              className={`symptom-chip ${selectedSymptoms.find(s => s.name === symptom.name) ? 'selected' : ''}`}
              onClick={() => {
                const isSelected = selectedSymptoms.find(s => s.name === symptom.name);
                if (isSelected) {
                  handleRemoveSymptom(symptom.name);
                } else {
                  handleSymptomSelect(symptom.name);
                }
              }}
            >
              <span className="chip-icon">{symptom.icon}</span>
              {symptom.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="selected-symptoms">
          <h4>Selected Symptoms</h4>
          <div className="selected-chips">
            {selectedSymptoms.map((symptom, index) => (
              <div key={index} className="selected-chip">
                <span className="chip-icon">{symptom.icon}</span>
                {symptom.name}
                <button
                  className="remove-chip"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveSymptom(symptom.name);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Analysis Results */}
      {isAnalyzing && (
        <div className="ai-analysis-loading">
          <Loader />
          <div className="loading-text">
            🤖 AI is analyzing your symptoms
          </div>
          <p className="analysis-details">
            Processing medical data and symptom patterns...
          </p>
        </div>
      )}

      {aiAnalysis && (
        <div className={`ai-analysis-result ${aiAnalysis.severity}`}>
          <div className="analysis-header">
            <h4>🧠 AI Analysis Results</h4>
            <span className={`confidence-badge ${aiAnalysis.confidence}`}>
              {aiAnalysis.confidence} confidence
            </span>
          </div>
          
          <div className="analysis-content">
            <div className="possible-conditions">
              <h5>Possible Conditions:</h5>
              <ul>
                {aiAnalysis.possibleConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
            
            <div className="recommendation">
              <h5>Recommendation:</h5>
              <p>{aiAnalysis.recommendation}</p>
            </div>
            
            <div className="safety-message">
              <p>{aiAnalysis.safetyMessage}</p>
            </div>
            
            {aiAnalysis.otcSuggestions.length > 0 && (
              <div className="otc-suggestions">
                <h5>OTC Treatment Options:</h5>
                <ul>
                  {aiAnalysis.otcSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="doctor-consultation-prompt">
              <button 
                className="consult-doctor-btn"
                onClick={() => {
                  // Pass AI analysis results to doctor consultation
                  const analysisData = {
                    symptoms: selectedSymptoms,
                    analysis: aiAnalysis,
                    timestamp: new Date().toISOString()
                  };
                  localStorage.setItem('consultationData', JSON.stringify(analysisData));
                  window.location.href = '/doctors';
                }}
              >
                🩺 Consult Doctor Now
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Disclaimer */}
      <div className="medical-disclaimer">
        <p><strong>Medical Disclaimer:</strong> This is for informational purposes only. Always consult with a healthcare professional before taking any medication. In case of emergency, contact your doctor immediately.</p>
      </div>
    </div>
  );
};

export default SymptomSearch;
