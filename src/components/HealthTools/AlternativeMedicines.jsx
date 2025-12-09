import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { 
  FaPills, FaSearch, FaFilter, FaStar, FaExclamationTriangle, 
  FaTimes, FaFlask, FaInfoCircle, FaShoppingCart, FaHeart,
  FaCheckCircle, FaTimesCircle, FaShieldAlt, FaUserMd, 
  FaBookmark, FaArrowRight, FaMoneyBillWave 
} from 'react-icons/fa';
import './AlternativeMedicines.css';

const AlternativeMedicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const [medicineDatabase, setMedicineDatabase] = useState([]);

  const fallbackMedicineDatabase = [
    {
      id: 1,
      name: 'Paracetamol',
      brand: 'Crocin',
      generic: 'Acetaminophen',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Dolo 650', price: '₹5-10', strength: '650mg' },
        { name: 'Calpol', price: '₹8-15', strength: '500mg' },
        { name: 'Metacin', price: '₹4-8', strength: '500mg' }
      ],
      uses: 'Fever, Headache, Body Pain',
      sideEffects: 'Nausea, Allergic reactions (rare)',
      price: '₹5-15',
      strength: '500mg',
      availability: 'Over the counter',
      rating: 4.5,
      reviews: 1250
    },
    {
      id: 2,
      name: 'Ibuprofen',
      brand: 'Brufen',
      generic: 'Ibuprofen',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Combiflam', price: '₹15-25', strength: '400mg' },
        { name: 'Advil', price: '₹20-30', strength: '200mg' },
        { name: 'Nurofen', price: '₹25-35', strength: '400mg' }
      ],
      uses: 'Inflammation, Pain, Fever',
      sideEffects: 'Stomach upset, Dizziness',
      price: '₹10-30',
      strength: '400mg',
      availability: 'Over the counter',
      rating: 4.2,
      reviews: 890
    },
    {
      id: 3,
      name: 'Aspirin',
      brand: 'Disprin',
      generic: 'Acetylsalicylic Acid',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Ecosprin', price: '₹3-8', strength: '75mg' },
        { name: 'Loprin', price: '₹5-12', strength: '75mg' },
        { name: 'Delisprin', price: '₹4-10', strength: '325mg' }
      ],
      uses: 'Heart Attack Prevention, Pain, Fever',
      sideEffects: 'Stomach irritation, Bleeding risk',
      price: '₹3-15',
      strength: '325mg',
      availability: 'Over the counter',
      rating: 4.1,
      reviews: 650
    },
    {
      id: 4,
      name: 'Diclofenac',
      brand: 'Voveran',
      generic: 'Diclofenac Sodium',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Voltaren', price: '₹25-40', strength: '50mg' },
        { name: 'Diclomax', price: '₹20-35', strength: '50mg' },
        { name: 'Dynapar', price: '₹18-30', strength: '50mg' }
      ],
      uses: 'Arthritis, Joint Pain, Muscle Pain',
      sideEffects: 'Stomach upset, Dizziness, Headache',
      price: '₹15-40',
      strength: '50mg',
      availability: 'Prescription required',
      rating: 4.3,
      reviews: 420
    },
    {
      id: 5,
      name: 'Omeprazole',
      brand: 'Prilosec',
      generic: 'Omeprazole',
      category: 'Gastric',
      alternatives: [
        { name: 'Pantoprazole', price: '₹25-40', strength: '40mg' },
        { name: 'Rabeprazole', price: '₹30-50', strength: '20mg' },
        { name: 'Esomeprazole', price: '₹35-60', strength: '40mg' }
      ],
      uses: 'Acid Reflux, GERD, Stomach Ulcers',
      sideEffects: 'Headache, Nausea, Diarrhea',
      price: '₹20-50',
      strength: '20mg',
      availability: 'Prescription required',
      rating: 4.3,
      reviews: 650
    },
    {
      id: 6,
      name: 'Ranitidine',
      brand: 'Zantac',
      generic: 'Ranitidine',
      category: 'Gastric',
      alternatives: [
        { name: 'Famotidine', price: '₹15-25', strength: '40mg' },
        { name: 'Cimetidine', price: '₹12-20', strength: '400mg' },
        { name: 'Nizatidine', price: '₹20-35', strength: '150mg' }
      ],
      uses: 'Heartburn, Acid Indigestion, Stomach Ulcers',
      sideEffects: 'Headache, Constipation, Diarrhea',
      price: '₹10-25',
      strength: '150mg',
      availability: 'Over the counter',
      rating: 4.0,
      reviews: 380
    },
    {
      id: 7,
      name: 'Domperidone',
      brand: 'Motilium',
      generic: 'Domperidone',
      category: 'Gastric',
      alternatives: [
        { name: 'Metoclopramide', price: '₹8-15', strength: '10mg' },
        { name: 'Ondansetron', price: '₹25-40', strength: '4mg' },
        { name: 'Itopride', price: '₹30-50', strength: '150mg' }
      ],
      uses: 'Nausea, Vomiting, Bloating',
      sideEffects: 'Dry mouth, Headache, Diarrhea',
      price: '₹12-30',
      strength: '10mg',
      availability: 'Prescription required',
      rating: 4.2,
      reviews: 290
    },
    {
      id: 8,
      name: 'Cetirizine',
      brand: 'Zyrtec',
      generic: 'Cetirizine',
      category: 'Allergy',
      alternatives: [
        { name: 'Loratadine', price: '₹15-25', strength: '10mg' },
        { name: 'Fexofenadine', price: '₹20-35', strength: '120mg' },
        { name: 'Levocetirizine', price: '₹18-30', strength: '5mg' }
      ],
      uses: 'Allergic Rhinitis, Hives, Itching',
      sideEffects: 'Drowsiness, Dry mouth',
      price: '₹12-25',
      strength: '10mg',
      availability: 'Over the counter',
      rating: 4.4,
      reviews: 720
    },
    {
      id: 9,
      name: 'Montelukast',
      brand: 'Singulair',
      generic: 'Montelukast',
      category: 'Allergy',
      alternatives: [
        { name: 'Zafirlukast', price: '₹40-60', strength: '20mg' },
        { name: 'Zileuton', price: '₹50-80', strength: '600mg' },
        { name: 'Pranlukast', price: '₹35-55', strength: '225mg' }
      ],
      uses: 'Asthma, Allergic Rhinitis',
      sideEffects: 'Headache, Stomach pain, Fatigue',
      price: '₹25-50',
      strength: '10mg',
      availability: 'Prescription required',
      rating: 4.1,
      reviews: 450
    },
    {
      id: 10,
      name: 'Chlorpheniramine',
      brand: 'Piriton',
      generic: 'Chlorpheniramine Maleate',
      category: 'Allergy',
      alternatives: [
        { name: 'Diphenhydramine', price: '₹10-18', strength: '25mg' },
        { name: 'Promethazine', price: '₹15-25', strength: '25mg' },
        { name: 'Hydroxyzine', price: '₹20-35', strength: '25mg' }
      ],
      uses: 'Allergies, Cold symptoms, Itching',
      sideEffects: 'Drowsiness, Dry mouth, Blurred vision',
      price: '₹8-20',
      strength: '4mg',
      availability: 'Over the counter',
      rating: 3.9,
      reviews: 320
    },
    {
      id: 11,
      name: 'Metformin',
      brand: 'Glucophage',
      generic: 'Metformin',
      category: 'Diabetes',
      alternatives: [
        { name: 'Glimepiride', price: '₹40-60', strength: '2mg' },
        { name: 'Pioglitazone', price: '₹50-80', strength: '15mg' },
        { name: 'Sitagliptin', price: '₹80-120', strength: '100mg' }
      ],
      uses: 'Type 2 Diabetes, PCOS',
      sideEffects: 'Nausea, Diarrhea, Metallic taste',
      price: '₹30-70',
      strength: '500mg',
      availability: 'Prescription required',
      rating: 4.1,
      reviews: 980
    },
    {
      id: 12,
      name: 'Glibenclamide',
      brand: 'Daonil',
      generic: 'Glibenclamide',
      category: 'Diabetes',
      alternatives: [
        { name: 'Gliclazide', price: '₹25-45', strength: '80mg' },
        { name: 'Glipizide', price: '₹30-50', strength: '5mg' },
        { name: 'Tolbutamide', price: '₹20-35', strength: '500mg' }
      ],
      uses: 'Type 2 Diabetes',
      sideEffects: 'Hypoglycemia, Weight gain, Nausea',
      price: '₹15-40',
      strength: '5mg',
      availability: 'Prescription required',
      rating: 3.8,
      reviews: 340
    },
    {
      id: 13,
      name: 'Insulin',
      brand: 'Humulin',
      generic: 'Human Insulin',
      category: 'Diabetes',
      alternatives: [
        { name: 'Lantus', price: '₹800-1200', strength: '100IU/ml' },
        { name: 'Novolog', price: '₹900-1300', strength: '100IU/ml' },
        { name: 'Humalog', price: '₹850-1250', strength: '100IU/ml' }
      ],
      uses: 'Type 1 & Type 2 Diabetes',
      sideEffects: 'Hypoglycemia, Injection site reactions',
      price: '₹700-1300',
      strength: '100IU/ml',
      availability: 'Prescription required',
      rating: 4.5,
      reviews: 1200
    },
    {
      id: 14,
      name: 'Amlodipine',
      brand: 'Norvasc',
      generic: 'Amlodipine',
      category: 'Blood Pressure',
      alternatives: [
        { name: 'Telmisartan', price: '₹25-45', strength: '40mg' },
        { name: 'Enalapril', price: '₹20-35', strength: '10mg' },
        { name: 'Losartan', price: '₹30-50', strength: '50mg' }
      ],
      uses: 'High Blood Pressure, Chest Pain',
      sideEffects: 'Swelling, Dizziness, Headache',
      price: '₹12-30',
      strength: '5mg',
      availability: 'Prescription required',
      rating: 4.0,
      reviews: 380
    },
    {
      id: 15,
      name: 'Atenolol',
      brand: 'Tenormin',
      generic: 'Atenolol',
      category: 'Blood Pressure',
      alternatives: [
        { name: 'Metoprolol', price: '₹20-35', strength: '50mg' },
        { name: 'Propranolol', price: '₹15-25', strength: '40mg' },
        { name: 'Bisoprolol', price: '₹25-40', strength: '5mg' }
      ],
      uses: 'High Blood Pressure, Angina, Heart Attack Prevention',
      sideEffects: 'Fatigue, Cold hands/feet, Slow heart rate',
      price: '₹10-25',
      strength: '50mg',
      availability: 'Prescription required',
      rating: 4.2,
      reviews: 520
    },
    {
      id: 16,
      name: 'Lisinopril',
      brand: 'Prinivil',
      generic: 'Lisinopril',
      category: 'Blood Pressure',
      alternatives: [
        { name: 'Ramipril', price: '₹30-50', strength: '5mg' },
        { name: 'Captopril', price: '₹20-35', strength: '25mg' },
        { name: 'Perindopril', price: '₹40-60', strength: '4mg' }
      ],
      uses: 'High Blood Pressure, Heart Failure',
      sideEffects: 'Dry cough, Dizziness, Hyperkalemia',
      price: '₹25-45',
      strength: '10mg',
      availability: 'Prescription required',
      rating: 4.1,
      reviews: 410
    },
    {
      id: 17,
      name: 'Simvastatin',
      brand: 'Zocor',
      generic: 'Simvastatin',
      category: 'Blood Pressure',
      alternatives: [
        { name: 'Atorvastatin', price: '₹40-70', strength: '20mg' },
        { name: 'Rosuvastatin', price: '₹50-80', strength: '10mg' },
        { name: 'Pravastatin', price: '₹35-60', strength: '40mg' }
      ],
      uses: 'High Cholesterol, Heart Disease Prevention',
      sideEffects: 'Muscle pain, Liver problems, Headache',
      price: '₹30-60',
      strength: '20mg',
      availability: 'Prescription required',
      rating: 4.0,
      reviews: 680
    },
    {
      id: 18,
      name: 'Amoxicillin',
      brand: 'Amoxil',
      generic: 'Amoxicillin',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Ampicillin', price: '₹25-40', strength: '500mg' },
        { name: 'Penicillin V', price: '₹20-35', strength: '250mg' },
        { name: 'Cephalexin', price: '₹40-60', strength: '500mg' }
      ],
      uses: 'Bacterial Infections, Respiratory Tract Infections',
      sideEffects: 'Nausea, Diarrhea, Allergic reactions',
      price: '₹30-50',
      strength: '500mg',
      availability: 'Prescription required',
      rating: 4.3,
      reviews: 890
    },
    {
      id: 19,
      name: 'Azithromycin',
      brand: 'Zithromax',
      generic: 'Azithromycin',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Clarithromycin', price: '₹60-90', strength: '500mg' },
        { name: 'Erythromycin', price: '₹40-65', strength: '500mg' },
        { name: 'Roxithromycin', price: '₹50-75', strength: '150mg' }
      ],
      uses: 'Respiratory Infections, Skin Infections',
      sideEffects: 'Nausea, Diarrhea, Abdominal pain',
      price: '₹80-120',
      strength: '500mg',
      availability: 'Prescription required',
      rating: 4.2,
      reviews: 560
    },
    {
      id: 20,
      name: 'Ciprofloxacin',
      brand: 'Cipro',
      generic: 'Ciprofloxacin',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Levofloxacin', price: '₹80-120', strength: '500mg' },
        { name: 'Ofloxacin', price: '₹60-90', strength: '200mg' },
        { name: 'Norfloxacin', price: '₹40-70', strength: '400mg' }
      ],
      uses: 'UTI, Respiratory Infections, Skin Infections',
      sideEffects: 'Nausea, Diarrhea, Dizziness',
      price: '₹50-90',
      strength: '500mg',
      availability: 'Prescription required',
      rating: 4.1,
      reviews: 720
    },
    // Additional 80 medicines to reach 100 total
    {
      id: 21,
      name: 'Doxycycline',
      brand: 'Vibramycin',
      generic: 'Doxycycline',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Tetracycline', price: '₹30-50', strength: '250mg' },
        { name: 'Minocycline', price: '₹60-90', strength: '100mg' },
        { name: 'Oxytetracycline', price: '₹25-45', strength: '250mg' }
      ],
      uses: 'Acne, Respiratory Infections, Malaria Prevention',
      sideEffects: 'Nausea, Photosensitivity, Diarrhea',
      price: '₹40-70',
      strength: '100mg',
      availability: 'Prescription required',
      rating: 4.0,
      reviews: 480
    },
    {
      id: 22,
      name: 'Prednisolone',
      brand: 'Prelone',
      generic: 'Prednisolone',
      category: 'Pain Relief',
      alternatives: [
        { name: 'Prednisone', price: '₹20-35', strength: '5mg' },
        { name: 'Methylprednisolone', price: '₹40-60', strength: '4mg' },
        { name: 'Hydrocortisone', price: '₹15-30', strength: '10mg' }
      ],
      uses: 'Inflammation, Allergies, Autoimmune disorders',
      sideEffects: 'Weight gain, Mood changes, Increased appetite',
      price: '₹25-45',
      strength: '5mg',
      availability: 'Prescription required',
      rating: 3.9,
      reviews: 360
    },
    // Continue adding medicines 23-100
    { id: 23, name: 'Fluconazole', brand: 'Diflucan', generic: 'Fluconazole', category: 'Pain Relief', alternatives: [{ name: 'Itraconazole', price: '₹80-120', strength: '100mg' }, { name: 'Ketoconazole', price: '₹40-70', strength: '200mg' }], uses: 'Fungal Infections', sideEffects: 'Nausea, Headache', price: '₹60-100', strength: '150mg', availability: 'Prescription required', rating: 4.2, reviews: 340 },
    { id: 24, name: 'Acyclovir', brand: 'Zovirax', generic: 'Acyclovir', category: 'Pain Relief', alternatives: [{ name: 'Valacyclovir', price: '₹150-250', strength: '500mg' }, { name: 'Famciclovir', price: '₹200-300', strength: '250mg' }], uses: 'Herpes, Chickenpox', sideEffects: 'Nausea, Diarrhea', price: '₹80-150', strength: '400mg', availability: 'Prescription required', rating: 4.1, reviews: 280 },
    { id: 25, name: 'Warfarin', brand: 'Coumadin', generic: 'Warfarin', category: 'Blood Pressure', alternatives: [{ name: 'Rivaroxaban', price: '₹300-500', strength: '10mg' }, { name: 'Dabigatran', price: '₹400-600', strength: '110mg' }], uses: 'Blood Clot Prevention', sideEffects: 'Bleeding, Bruising', price: '₹20-40', strength: '5mg', availability: 'Prescription required', rating: 3.8, reviews: 450 },
    { id: 26, name: 'Digoxin', brand: 'Lanoxin', generic: 'Digoxin', category: 'Blood Pressure', alternatives: [{ name: 'Amiodarone', price: '₹80-120', strength: '200mg' }, { name: 'Verapamil', price: '₹30-50', strength: '80mg' }], uses: 'Heart Failure, Arrhythmias', sideEffects: 'Nausea, Visual disturbances', price: '₹15-30', strength: '0.25mg', availability: 'Prescription required', rating: 3.9, reviews: 320 },
    { id: 27, name: 'Furosemide', brand: 'Lasix', generic: 'Furosemide', category: 'Blood Pressure', alternatives: [{ name: 'Hydrochlorothiazide', price: '₹10-20', strength: '25mg' }, { name: 'Spironolactone', price: '₹25-40', strength: '25mg' }], uses: 'Edema, High Blood Pressure', sideEffects: 'Dehydration, Electrolyte imbalance', price: '₹8-18', strength: '40mg', availability: 'Prescription required', rating: 4.0, reviews: 380 },
    { id: 28, name: 'Levothyroxine', brand: 'Synthroid', generic: 'Levothyroxine', category: 'Diabetes', alternatives: [{ name: 'Liothyronine', price: '₹100-150', strength: '25mcg' }, { name: 'Armour Thyroid', price: '₹200-300', strength: '60mg' }], uses: 'Hypothyroidism', sideEffects: 'Palpitations, Insomnia', price: '₹50-80', strength: '100mcg', availability: 'Prescription required', rating: 4.3, reviews: 720 },
    { id: 29, name: 'Allopurinol', brand: 'Zyloprim', generic: 'Allopurinol', category: 'Pain Relief', alternatives: [{ name: 'Febuxostat', price: '₹150-250', strength: '80mg' }, { name: 'Probenecid', price: '₹80-120', strength: '500mg' }], uses: 'Gout, Kidney Stones', sideEffects: 'Skin rash, Nausea', price: '₹20-40', strength: '100mg', availability: 'Prescription required', rating: 4.1, reviews: 290 },
    { id: 30, name: 'Colchicine', brand: 'Colcrys', generic: 'Colchicine', category: 'Pain Relief', alternatives: [{ name: 'Indomethacin', price: '₹30-50', strength: '25mg' }, { name: 'Naproxen', price: '₹20-35', strength: '250mg' }], uses: 'Gout Attacks', sideEffects: 'Diarrhea, Nausea', price: '₹80-120', strength: '0.6mg', availability: 'Prescription required', rating: 3.9, reviews: 180 },
    // Medicines 31-100
    { id: 31, name: 'Tramadol', brand: 'Ultram', generic: 'Tramadol', category: 'Pain Relief', alternatives: [{ name: 'Codeine', price: '₹40-60', strength: '30mg' }, { name: 'Morphine', price: '₹100-150', strength: '10mg' }], uses: 'Moderate to Severe Pain', sideEffects: 'Drowsiness, Nausea', price: '₹50-80', strength: '50mg', availability: 'Prescription required', rating: 4.0, reviews: 520 },
    { id: 32, name: 'Gabapentin', brand: 'Neurontin', generic: 'Gabapentin', category: 'Pain Relief', alternatives: [{ name: 'Pregabalin', price: '₹80-120', strength: '75mg' }, { name: 'Carbamazepine', price: '₹30-50', strength: '200mg' }], uses: 'Neuropathic Pain, Epilepsy', sideEffects: 'Dizziness, Fatigue', price: '₹60-100', strength: '300mg', availability: 'Prescription required', rating: 4.1, reviews: 410 },
    { id: 33, name: 'Alprazolam', brand: 'Xanax', generic: 'Alprazolam', category: 'Pain Relief', alternatives: [{ name: 'Lorazepam', price: '₹20-35', strength: '1mg' }, { name: 'Clonazepam', price: '₹15-30', strength: '0.5mg' }], uses: 'Anxiety, Panic Disorders', sideEffects: 'Drowsiness, Memory problems', price: '₹25-45', strength: '0.5mg', availability: 'Prescription required', rating: 3.8, reviews: 680 },
    { id: 34, name: 'Sertraline', brand: 'Zoloft', generic: 'Sertraline', category: 'Pain Relief', alternatives: [{ name: 'Fluoxetine', price: '₹40-70', strength: '20mg' }, { name: 'Paroxetine', price: '₹50-80', strength: '20mg' }], uses: 'Depression, Anxiety', sideEffects: 'Nausea, Sexual dysfunction', price: '₹60-100', strength: '50mg', availability: 'Prescription required', rating: 4.2, reviews: 890 },
    { id: 35, name: 'Escitalopram', brand: 'Lexapro', generic: 'Escitalopram', category: 'Pain Relief', alternatives: [{ name: 'Citalopram', price: '₹30-50', strength: '20mg' }, { name: 'Venlafaxine', price: '₹60-90', strength: '75mg' }], uses: 'Depression, Generalized Anxiety', sideEffects: 'Nausea, Insomnia', price: '₹70-110', strength: '10mg', availability: 'Prescription required', rating: 4.3, reviews: 750 },
    { id: 36, name: 'Risperidone', brand: 'Risperdal', generic: 'Risperidone', category: 'Pain Relief', alternatives: [{ name: 'Olanzapine', price: '₹100-150', strength: '5mg' }, { name: 'Quetiapine', price: '₹80-120', strength: '25mg' }], uses: 'Schizophrenia, Bipolar Disorder', sideEffects: 'Weight gain, Drowsiness', price: '₹90-140', strength: '2mg', availability: 'Prescription required', rating: 3.9, reviews: 320 },
    { id: 37, name: 'Lithium', brand: 'Lithobid', generic: 'Lithium Carbonate', category: 'Pain Relief', alternatives: [{ name: 'Valproate', price: '₹40-70', strength: '250mg' }, { name: 'Lamotrigine', price: '₹60-100', strength: '25mg' }], uses: 'Bipolar Disorder', sideEffects: 'Tremor, Thirst, Nausea', price: '₹20-40', strength: '300mg', availability: 'Prescription required', rating: 3.7, reviews: 280 },
    { id: 38, name: 'Phenytoin', brand: 'Dilantin', generic: 'Phenytoin', category: 'Pain Relief', alternatives: [{ name: 'Valproic Acid', price: '₹30-50', strength: '250mg' }, { name: 'Levetiracetam', price: '₹80-120', strength: '500mg' }], uses: 'Epilepsy, Seizures', sideEffects: 'Gum overgrowth, Dizziness', price: '₹15-30', strength: '100mg', availability: 'Prescription required', rating: 4.0, reviews: 390 },
    { id: 39, name: 'Levodopa', brand: 'Sinemet', generic: 'Levodopa/Carbidopa', category: 'Pain Relief', alternatives: [{ name: 'Pramipexole', price: '₹150-250', strength: '0.25mg' }, { name: 'Ropinirole', price: '₹100-180', strength: '1mg' }], uses: 'Parkinson Disease', sideEffects: 'Nausea, Dyskinesia', price: '₹200-300', strength: '25/100mg', availability: 'Prescription required', rating: 4.1, reviews: 450 },
    { id: 40, name: 'Donepezil', brand: 'Aricept', generic: 'Donepezil', category: 'Pain Relief', alternatives: [{ name: 'Rivastigmine', price: '₹200-300', strength: '3mg' }, { name: 'Galantamine', price: '₹250-350', strength: '8mg' }], uses: 'Alzheimer Disease', sideEffects: 'Nausea, Diarrhea', price: '₹300-450', strength: '10mg', availability: 'Prescription required', rating: 3.9, reviews: 210 },
    // Medicines 41-100 (60 more medicines)
    { id: 41, name: 'Salbutamol', brand: 'Ventolin', generic: 'Salbutamol', category: 'Allergy', alternatives: [{ name: 'Terbutaline', price: '₹30-50', strength: '2.5mg' }, { name: 'Formoterol', price: '₹80-120', strength: '12mcg' }], uses: 'Asthma, COPD', sideEffects: 'Tremor, Palpitations', price: '₹40-70', strength: '100mcg', availability: 'Prescription required', rating: 4.2, reviews: 650 },
    { id: 42, name: 'Budesonide', brand: 'Pulmicort', generic: 'Budesonide', category: 'Allergy', alternatives: [{ name: 'Fluticasone', price: '₹100-150', strength: '125mcg' }, { name: 'Beclomethasone', price: '₹60-90', strength: '100mcg' }], uses: 'Asthma, Allergic Rhinitis', sideEffects: 'Throat irritation, Hoarseness', price: '₹120-180', strength: '200mcg', availability: 'Prescription required', rating: 4.1, reviews: 420 },
    { id: 43, name: 'Theophylline', brand: 'Theo-Dur', generic: 'Theophylline', category: 'Allergy', alternatives: [{ name: 'Aminophylline', price: '₹20-35', strength: '100mg' }, { name: 'Doxofylline', price: '₹40-60', strength: '400mg' }], uses: 'Asthma, COPD', sideEffects: 'Nausea, Insomnia', price: '₹25-45', strength: '200mg', availability: 'Prescription required', rating: 3.8, reviews: 290 },
    { id: 44, name: 'Ipratropium', brand: 'Atrovent', generic: 'Ipratropium', category: 'Allergy', alternatives: [{ name: 'Tiotropium', price: '₹200-300', strength: '18mcg' }, { name: 'Glycopyrrolate', price: '₹150-250', strength: '15.6mcg' }], uses: 'COPD, Bronchospasm', sideEffects: 'Dry mouth, Cough', price: '₹80-120', strength: '20mcg', availability: 'Prescription required', rating: 4.0, reviews: 180 },
    { id: 45, name: 'Montelukast', brand: 'Singulair', generic: 'Montelukast', category: 'Allergy', alternatives: [{ name: 'Zafirlukast', price: '₹40-60', strength: '20mg' }, { name: 'Zileuton', price: '₹50-80', strength: '600mg' }], uses: 'Asthma, Allergic Rhinitis', sideEffects: 'Headache, Stomach pain', price: '₹25-50', strength: '10mg', availability: 'Prescription required', rating: 4.1, reviews: 450 },
    { id: 46, name: 'Lansoprazole', brand: 'Prevacid', generic: 'Lansoprazole', category: 'Gastric', alternatives: [{ name: 'Dexlansoprazole', price: '₹80-120', strength: '30mg' }, { name: 'Pantoprazole', price: '₹25-40', strength: '40mg' }], uses: 'GERD, Peptic Ulcers', sideEffects: 'Headache, Diarrhea', price: '₹40-70', strength: '30mg', availability: 'Prescription required', rating: 4.2, reviews: 580 },
    { id: 47, name: 'Sucralfate', brand: 'Carafate', generic: 'Sucralfate', category: 'Gastric', alternatives: [{ name: 'Misoprostol', price: '₹30-50', strength: '200mcg' }, { name: 'Bismuth', price: '₹20-35', strength: '262mg' }], uses: 'Peptic Ulcers', sideEffects: 'Constipation, Nausea', price: '₹25-45', strength: '1g', availability: 'Prescription required', rating: 3.9, reviews: 220 },
    { id: 48, name: 'Loperamide', brand: 'Imodium', generic: 'Loperamide', category: 'Gastric', alternatives: [{ name: 'Diphenoxylate', price: '₹40-60', strength: '2.5mg' }, { name: 'Bismuth subsalicylate', price: '₹30-50', strength: '262mg' }], uses: 'Diarrhea', sideEffects: 'Constipation, Dizziness', price: '₹15-30', strength: '2mg', availability: 'Over the counter', rating: 4.0, reviews: 340 },
    { id: 49, name: 'Simethicone', brand: 'Gas-X', generic: 'Simethicone', category: 'Gastric', alternatives: [{ name: 'Activated Charcoal', price: '₹10-20', strength: '250mg' }, { name: 'Beano', price: '₹25-40', strength: '150mg' }], uses: 'Gas, Bloating', sideEffects: 'None significant', price: '₹12-25', strength: '40mg', availability: 'Over the counter', rating: 3.8, reviews: 280 },
    { id: 50, name: 'Glipizide', brand: 'Glucotrol', generic: 'Glipizide', category: 'Diabetes', alternatives: [{ name: 'Glyburide', price: '₹15-30', strength: '5mg' }, { name: 'Glimepiride', price: '₹40-60', strength: '2mg' }], uses: 'Type 2 Diabetes', sideEffects: 'Hypoglycemia, Weight gain', price: '₹20-40', strength: '5mg', availability: 'Prescription required', rating: 4.0, reviews: 420 }
  ];

  // Generate additional 50 medicines programmatically to reach 100 total
  const additionalMedicines = [
    { id: 51, name: 'Pioglitazone', brand: 'Actos', generic: 'Pioglitazone', category: 'Diabetes', alternatives: [{ name: 'Rosiglitazone', price: '₹60-90', strength: '4mg' }], uses: 'Type 2 Diabetes', sideEffects: 'Weight gain, Edema', price: '₹50-80', strength: '15mg', availability: 'Prescription required', rating: 3.9, reviews: 310 },
    { id: 52, name: 'Sitagliptin', brand: 'Januvia', generic: 'Sitagliptin', category: 'Diabetes', alternatives: [{ name: 'Saxagliptin', price: '₹100-150', strength: '5mg' }], uses: 'Type 2 Diabetes', sideEffects: 'Upper respiratory infection', price: '₹80-120', strength: '100mg', availability: 'Prescription required', rating: 4.2, reviews: 480 },
    { id: 53, name: 'Canagliflozin', brand: 'Invokana', generic: 'Canagliflozin', category: 'Diabetes', alternatives: [{ name: 'Dapagliflozin', price: '₹200-300', strength: '10mg' }], uses: 'Type 2 Diabetes', sideEffects: 'UTI, Dehydration', price: '₹250-350', strength: '100mg', availability: 'Prescription required', rating: 4.0, reviews: 290 },
    { id: 54, name: 'Repaglinide', brand: 'Prandin', generic: 'Repaglinide', category: 'Diabetes', alternatives: [{ name: 'Nateglinide', price: '₹80-120', strength: '120mg' }], uses: 'Type 2 Diabetes', sideEffects: 'Hypoglycemia', price: '₹60-100', strength: '1mg', availability: 'Prescription required', rating: 3.8, reviews: 220 },
    { id: 55, name: 'Acarbose', brand: 'Precose', generic: 'Acarbose', category: 'Diabetes', alternatives: [{ name: 'Miglitol', price: '₹70-110', strength: '50mg' }], uses: 'Type 2 Diabetes', sideEffects: 'Flatulence, Diarrhea', price: '₹50-90', strength: '50mg', availability: 'Prescription required', rating: 3.7, reviews: 180 },
    { id: 56, name: 'Nifedipine', brand: 'Adalat', generic: 'Nifedipine', category: 'Blood Pressure', alternatives: [{ name: 'Felodipine', price: '₹40-70', strength: '5mg' }], uses: 'High Blood Pressure, Angina', sideEffects: 'Ankle swelling, Flushing', price: '₹20-40', strength: '10mg', availability: 'Prescription required', rating: 4.0, reviews: 450 },
    { id: 57, name: 'Diltiazem', brand: 'Cardizem', generic: 'Diltiazem', category: 'Blood Pressure', alternatives: [{ name: 'Verapamil', price: '₹30-50', strength: '80mg' }], uses: 'High Blood Pressure, Angina', sideEffects: 'Constipation, Dizziness', price: '₹25-45', strength: '60mg', availability: 'Prescription required', rating: 3.9, reviews: 380 },
    { id: 58, name: 'Hydralazine', brand: 'Apresoline', generic: 'Hydralazine', category: 'Blood Pressure', alternatives: [{ name: 'Minoxidil', price: '₹50-80', strength: '10mg' }], uses: 'High Blood Pressure', sideEffects: 'Headache, Palpitations', price: '₹15-30', strength: '25mg', availability: 'Prescription required', rating: 3.8, reviews: 250 },
    { id: 59, name: 'Clonidine', brand: 'Catapres', generic: 'Clonidine', category: 'Blood Pressure', alternatives: [{ name: 'Methyldopa', price: '₹20-35', strength: '250mg' }], uses: 'High Blood Pressure, ADHD', sideEffects: 'Drowsiness, Dry mouth', price: '₹18-35', strength: '0.1mg', availability: 'Prescription required', rating: 3.7, reviews: 190 },
    { id: 60, name: 'Isosorbide', brand: 'Imdur', generic: 'Isosorbide Mononitrate', category: 'Blood Pressure', alternatives: [{ name: 'Nitroglycerin', price: '₹30-50', strength: '0.4mg' }], uses: 'Angina Prevention', sideEffects: 'Headache, Dizziness', price: '₹25-45', strength: '20mg', availability: 'Prescription required', rating: 4.1, reviews: 320 },
    { id: 61, name: 'Clopidogrel', brand: 'Plavix', generic: 'Clopidogrel', category: 'Blood Pressure', alternatives: [{ name: 'Prasugrel', price: '₹200-300', strength: '10mg' }], uses: 'Blood Clot Prevention', sideEffects: 'Bleeding, Bruising', price: '₹150-250', strength: '75mg', availability: 'Prescription required', rating: 4.2, reviews: 680 },
    { id: 62, name: 'Ezetimibe', brand: 'Zetia', generic: 'Ezetimibe', category: 'Blood Pressure', alternatives: [{ name: 'Colesevelam', price: '₹300-450', strength: '625mg' }], uses: 'High Cholesterol', sideEffects: 'Diarrhea, Joint pain', price: '₹200-300', strength: '10mg', availability: 'Prescription required', rating: 4.0, reviews: 420 },
    { id: 63, name: 'Fenofibrate', brand: 'Tricor', generic: 'Fenofibrate', category: 'Blood Pressure', alternatives: [{ name: 'Gemfibrozil', price: '₹80-120', strength: '600mg' }], uses: 'High Triglycerides', sideEffects: 'Stomach pain, Headache', price: '₹100-150', strength: '160mg', availability: 'Prescription required', rating: 3.9, reviews: 290 },
    { id: 64, name: 'Nicotinic Acid', brand: 'Niacor', generic: 'Niacin', category: 'Blood Pressure', alternatives: [{ name: 'Niaspan', price: '₹150-250', strength: '500mg' }], uses: 'High Cholesterol', sideEffects: 'Flushing, Itching', price: '₹50-90', strength: '500mg', availability: 'Over the counter', rating: 3.6, reviews: 180 },
    { id: 65, name: 'Spironolactone', brand: 'Aldactone', generic: 'Spironolactone', category: 'Blood Pressure', alternatives: [{ name: 'Amiloride', price: '₹30-50', strength: '5mg' }], uses: 'Heart Failure, Edema', sideEffects: 'Hyperkalemia, Gynecomastia', price: '₹25-40', strength: '25mg', availability: 'Prescription required', rating: 4.0, reviews: 350 },
    { id: 66, name: 'Ketoconazole', brand: 'Nizoral', generic: 'Ketoconazole', category: 'Pain Relief', alternatives: [{ name: 'Terbinafine', price: '₹80-120', strength: '250mg' }], uses: 'Fungal Infections', sideEffects: 'Liver toxicity, Nausea', price: '₹40-70', strength: '200mg', availability: 'Prescription required', rating: 3.9, reviews: 280 },
    { id: 67, name: 'Griseofulvin', brand: 'Grifulvin', generic: 'Griseofulvin', category: 'Pain Relief', alternatives: [{ name: 'Itraconazole', price: '₹80-120', strength: '100mg' }], uses: 'Fungal Skin Infections', sideEffects: 'Headache, Nausea', price: '₹60-100', strength: '500mg', availability: 'Prescription required', rating: 3.8, reviews: 190 },
    { id: 68, name: 'Nystatin', brand: 'Mycostatin', generic: 'Nystatin', category: 'Pain Relief', alternatives: [{ name: 'Clotrimazole', price: '₹30-50', strength: '1%' }], uses: 'Oral Thrush, Yeast Infections', sideEffects: 'Nausea, Diarrhea', price: '₹25-45', strength: '100000 units', availability: 'Prescription required', rating: 4.1, reviews: 320 },
    { id: 69, name: 'Amphotericin B', brand: 'Fungizone', generic: 'Amphotericin B', category: 'Pain Relief', alternatives: [{ name: 'Caspofungin', price: '₹2000-3000', strength: '50mg' }], uses: 'Serious Fungal Infections', sideEffects: 'Kidney toxicity, Fever', price: '₹1500-2500', strength: '50mg', availability: 'Prescription required', rating: 3.7, reviews: 120 },
    { id: 70, name: 'Voriconazole', brand: 'Vfend', generic: 'Voriconazole', category: 'Pain Relief', alternatives: [{ name: 'Posaconazole', price: '₹1000-1500', strength: '100mg' }], uses: 'Invasive Fungal Infections', sideEffects: 'Visual disturbances, Liver toxicity', price: '₹800-1200', strength: '200mg', availability: 'Prescription required', rating: 4.0, reviews: 150 },
    { id: 71, name: 'Chloroquine', brand: 'Aralen', generic: 'Chloroquine', category: 'Pain Relief', alternatives: [{ name: 'Hydroxychloroquine', price: '₹50-80', strength: '200mg' }], uses: 'Malaria, Autoimmune diseases', sideEffects: 'Nausea, Retinal toxicity', price: '₹30-60', strength: '250mg', availability: 'Prescription required', rating: 3.8, reviews: 240 },
    { id: 72, name: 'Mefloquine', brand: 'Lariam', generic: 'Mefloquine', category: 'Pain Relief', alternatives: [{ name: 'Atovaquone', price: '₹200-300', strength: '250mg' }], uses: 'Malaria Prevention', sideEffects: 'Neuropsychiatric effects', price: '₹150-250', strength: '250mg', availability: 'Prescription required', rating: 3.5, reviews: 180 },
    { id: 73, name: 'Artemether', brand: 'Coartem', generic: 'Artemether/Lumefantrine', category: 'Pain Relief', alternatives: [{ name: 'Artesunate', price: '₹300-450', strength: '60mg' }], uses: 'Malaria Treatment', sideEffects: 'Nausea, Dizziness', price: '₹250-400', strength: '20/120mg', availability: 'Prescription required', rating: 4.1, reviews: 220 },
    { id: 74, name: 'Quinine', brand: 'Qualaquin', generic: 'Quinine Sulfate', category: 'Pain Relief', alternatives: [{ name: 'Quinidine', price: '₹100-150', strength: '200mg' }], uses: 'Malaria, Leg Cramps', sideEffects: 'Tinnitus, Nausea', price: '₹80-120', strength: '324mg', availability: 'Prescription required', rating: 3.7, reviews: 160 },
    { id: 75, name: 'Primaquine', brand: 'Primaquine', generic: 'Primaquine', category: 'Pain Relief', alternatives: [{ name: 'Tafenoquine', price: '₹500-800', strength: '150mg' }], uses: 'Malaria Prevention', sideEffects: 'Hemolysis in G6PD deficiency', price: '₹40-70', strength: '15mg', availability: 'Prescription required', rating: 3.9, reviews: 140 },
    { id: 76, name: 'Metronidazole', brand: 'Flagyl', generic: 'Metronidazole', category: 'Pain Relief', alternatives: [{ name: 'Tinidazole', price: '₹60-90', strength: '500mg' }], uses: 'Bacterial/Parasitic Infections', sideEffects: 'Metallic taste, Nausea', price: '₹20-40', strength: '400mg', availability: 'Prescription required', rating: 4.0, reviews: 520 },
    { id: 77, name: 'Albendazole', brand: 'Albenza', generic: 'Albendazole', category: 'Pain Relief', alternatives: [{ name: 'Mebendazole', price: '₹30-50', strength: '100mg' }], uses: 'Parasitic Worm Infections', sideEffects: 'Abdominal pain, Nausea', price: '₹25-45', strength: '400mg', availability: 'Prescription required', rating: 4.1, reviews: 280 },
    { id: 78, name: 'Praziquantel', brand: 'Biltricide', generic: 'Praziquantel', category: 'Pain Relief', alternatives: [{ name: 'Niclosamide', price: '₹80-120', strength: '500mg' }], uses: 'Schistosomiasis, Tapeworms', sideEffects: 'Dizziness, Abdominal pain', price: '₹100-150', strength: '600mg', availability: 'Prescription required', rating: 3.9, reviews: 160 },
    { id: 79, name: 'Ivermectin', brand: 'Stromectol', generic: 'Ivermectin', category: 'Pain Relief', alternatives: [{ name: 'Thiabendazole', price: '₹60-90', strength: '500mg' }], uses: 'Parasitic Infections, Scabies', sideEffects: 'Nausea, Dizziness', price: '₹50-80', strength: '3mg', availability: 'Prescription required', rating: 4.2, reviews: 340 },
    { id: 80, name: 'Pyrantel', brand: 'Pin-X', generic: 'Pyrantel Pamoate', category: 'Pain Relief', alternatives: [{ name: 'Levamisole', price: '₹40-60', strength: '50mg' }], uses: 'Pinworm, Roundworm', sideEffects: 'Nausea, Abdominal cramps', price: '₹20-35', strength: '250mg', availability: 'Over the counter', rating: 4.0, reviews: 220 },
    { id: 81, name: 'Hydroxyzine', brand: 'Atarax', generic: 'Hydroxyzine', category: 'Allergy', alternatives: [{ name: 'Cyproheptadine', price: '₹15-25', strength: '4mg' }], uses: 'Anxiety, Allergies, Itching', sideEffects: 'Drowsiness, Dry mouth', price: '₹20-35', strength: '25mg', availability: 'Prescription required', rating: 4.0, reviews: 380 },
    { id: 82, name: 'Desloratadine', brand: 'Clarinex', generic: 'Desloratadine', category: 'Allergy', alternatives: [{ name: 'Levocetirizine', price: '₹18-30', strength: '5mg' }], uses: 'Allergic Rhinitis, Hives', sideEffects: 'Fatigue, Dry mouth', price: '₹25-45', strength: '5mg', availability: 'Prescription required', rating: 4.2, reviews: 450 },
    { id: 83, name: 'Azelastine', brand: 'Astelin', generic: 'Azelastine', category: 'Allergy', alternatives: [{ name: 'Olopatadine', price: '₹80-120', strength: '0.1%' }], uses: 'Allergic Rhinitis, Conjunctivitis', sideEffects: 'Bitter taste, Drowsiness', price: '₹60-100', strength: '0.1%', availability: 'Prescription required', rating: 4.1, reviews: 280 },
    { id: 84, name: 'Cromolyn', brand: 'Intal', generic: 'Cromolyn Sodium', category: 'Allergy', alternatives: [{ name: 'Nedocromil', price: '₹100-150', strength: '2mg' }], uses: 'Asthma Prevention, Allergies', sideEffects: 'Throat irritation, Cough', price: '₹80-120', strength: '20mg', availability: 'Prescription required', rating: 3.9, reviews: 190 },
    { id: 85, name: 'Epinephrine', brand: 'EpiPen', generic: 'Epinephrine', category: 'Allergy', alternatives: [{ name: 'Epinephrine auto-injector', price: '₹3000-5000', strength: '0.3mg' }], uses: 'Severe Allergic Reactions', sideEffects: 'Palpitations, Anxiety', price: '₹4000-6000', strength: '0.3mg', availability: 'Prescription required', rating: 4.8, reviews: 520 },
    { id: 86, name: 'Prednisone', brand: 'Deltasone', generic: 'Prednisone', category: 'Allergy', alternatives: [{ name: 'Prednisolone', price: '₹25-45', strength: '5mg' }], uses: 'Inflammation, Allergies', sideEffects: 'Weight gain, Mood changes', price: '₹20-35', strength: '5mg', availability: 'Prescription required', rating: 3.9, reviews: 680 },
    { id: 87, name: 'Betamethasone', brand: 'Celestone', generic: 'Betamethasone', category: 'Allergy', alternatives: [{ name: 'Dexamethasone', price: '₹15-30', strength: '0.5mg' }], uses: 'Severe Inflammation, Allergies', sideEffects: 'Immunosuppression, Weight gain', price: '₹30-50', strength: '0.5mg', availability: 'Prescription required', rating: 4.0, reviews: 290 },
    { id: 88, name: 'Triamcinolone', brand: 'Kenalog', generic: 'Triamcinolone', category: 'Allergy', alternatives: [{ name: 'Fluocinolone', price: '₹60-90', strength: '0.025%' }], uses: 'Skin Inflammation, Allergies', sideEffects: 'Skin thinning, Burning', price: '₹40-70', strength: '0.1%', availability: 'Prescription required', rating: 4.1, reviews: 320 },
    { id: 89, name: 'Mometasone', brand: 'Nasonex', generic: 'Mometasone', category: 'Allergy', alternatives: [{ name: 'Fluticasone', price: '₹100-150', strength: '50mcg' }], uses: 'Allergic Rhinitis, Asthma', sideEffects: 'Nasal irritation, Headache', price: '₹120-180', strength: '50mcg', availability: 'Prescription required', rating: 4.2, reviews: 480 },
    { id: 90, name: 'Beclomethasone', brand: 'Qvar', generic: 'Beclomethasone', category: 'Allergy', alternatives: [{ name: 'Ciclesonide', price: '₹150-250', strength: '80mcg' }], uses: 'Asthma, Allergic Rhinitis', sideEffects: 'Throat irritation, Hoarseness', price: '₹60-90', strength: '100mcg', availability: 'Prescription required', rating: 4.0, reviews: 350 },
    { id: 91, name: 'Misoprostol', brand: 'Cytotec', generic: 'Misoprostol', category: 'Gastric', alternatives: [{ name: 'Prostaglandin E1', price: '₹100-150', strength: '200mcg' }], uses: 'Peptic Ulcer Prevention', sideEffects: 'Diarrhea, Abdominal pain', price: '₹80-120', strength: '200mcg', availability: 'Prescription required', rating: 3.8, reviews: 240 },
    { id: 92, name: 'Octreotide', brand: 'Sandostatin', generic: 'Octreotide', category: 'Gastric', alternatives: [{ name: 'Lanreotide', price: '₹5000-8000', strength: '90mg' }], uses: 'Acromegaly, Carcinoid Tumors', sideEffects: 'Nausea, Injection site pain', price: '₹3000-5000', strength: '100mcg', availability: 'Prescription required', rating: 4.1, reviews: 180 },
    { id: 93, name: 'Alosetron', brand: 'Lotronex', generic: 'Alosetron', category: 'Gastric', alternatives: [{ name: 'Eluxadoline', price: '₹400-600', strength: '100mg' }], uses: 'IBS with Diarrhea', sideEffects: 'Constipation, Ischemic colitis', price: '₹300-500', strength: '0.5mg', availability: 'Prescription required', rating: 3.7, reviews: 120 },
    { id: 94, name: 'Lubiprostone', brand: 'Amitiza', generic: 'Lubiprostone', category: 'Gastric', alternatives: [{ name: 'Linaclotide', price: '₹500-800', strength: '290mcg' }], uses: 'Chronic Constipation, IBS', sideEffects: 'Nausea, Diarrhea', price: '₹400-700', strength: '24mcg', availability: 'Prescription required', rating: 3.9, reviews: 200 },
    { id: 95, name: 'Rifaximin', brand: 'Xifaxan', generic: 'Rifaximin', category: 'Gastric', alternatives: [{ name: 'Neomycin', price: '₹30-50', strength: '500mg' }], uses: 'Traveler Diarrhea, Hepatic Encephalopathy', sideEffects: 'Nausea, Dizziness', price: '₹200-350', strength: '550mg', availability: 'Prescription required', rating: 4.0, reviews: 280 },
    { id: 96, name: 'Ursodeoxycholic Acid', brand: 'Actigall', generic: 'Ursodiol', category: 'Gastric', alternatives: [{ name: 'Chenodeoxycholic acid', price: '₹300-500', strength: '250mg' }], uses: 'Gallstones, Primary Biliary Cirrhosis', sideEffects: 'Diarrhea, Hair thinning', price: '₹200-350', strength: '300mg', availability: 'Prescription required', rating: 4.1, reviews: 190 },
    { id: 97, name: 'Lactulose', brand: 'Enulose', generic: 'Lactulose', category: 'Gastric', alternatives: [{ name: 'Polyethylene glycol', price: '₹40-70', strength: '17g' }], uses: 'Constipation, Hepatic Encephalopathy', sideEffects: 'Bloating, Cramping', price: '₹30-60', strength: '10g', availability: 'Over the counter', rating: 3.8, reviews: 320 },
    { id: 98, name: 'Psyllium', brand: 'Metamucil', generic: 'Psyllium Husk', category: 'Gastric', alternatives: [{ name: 'Methylcellulose', price: '₹25-45', strength: '500mg' }], uses: 'Constipation, IBS', sideEffects: 'Bloating, Gas', price: '₹20-40', strength: '3.4g', availability: 'Over the counter', rating: 4.0, reviews: 450 },
    { id: 99, name: 'Docusate', brand: 'Colace', generic: 'Docusate Sodium', category: 'Gastric', alternatives: [{ name: 'Mineral oil', price: '₹15-25', strength: '15ml' }], uses: 'Constipation', sideEffects: 'Stomach cramps, Diarrhea', price: '₹12-25', strength: '100mg', availability: 'Over the counter', rating: 3.9, reviews: 280 },
    { id: 100, name: 'Senna', brand: 'Senokot', generic: 'Senna', category: 'Gastric', alternatives: [{ name: 'Bisacodyl', price: '₹10-20', strength: '5mg' }], uses: 'Constipation', sideEffects: 'Cramping, Diarrhea', price: '₹8-18', strength: '8.6mg', availability: 'Over the counter', rating: 3.7, reviews: 380 }
  ];

  // Combine original medicines with additional ones
  const completeMedicineDatabase = [...fallbackMedicineDatabase, ...additionalMedicines];

  useEffect(() => {
    // Import and use the comprehensive alternative medicines data
    import('../../data/alternativeMedicinesData').then(module => {
      const medicinesData = module.default;
      // If the imported data doesn't have alternatives property, use complete fallback database
      if (medicinesData && medicinesData.length > 0 && !medicinesData[0].alternatives) {
        setMedicineDatabase(completeMedicineDatabase);
      } else {
        setMedicineDatabase(medicinesData);
      }
    }).catch(() => {
      // If import fails, use complete fallback database with 100 medicines
      setMedicineDatabase(completeMedicineDatabase);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories', icon: FaPills },
    { id: 'Pain Relief', name: 'Pain Relief', icon: FaPills },
    { id: 'Gastric', name: 'Gastric', icon: FaFlask },
    { id: 'Allergy', name: 'Allergy', icon: FaShieldAlt },
    { id: 'Diabetes', name: 'Diabetes', icon: FaUserMd },
    { id: 'Blood Pressure', name: 'Blood Pressure', icon: FaHeart }
  ];

  const filterMedicines = useCallback(() => {
    let filtered = medicineDatabase;

    if (searchTerm) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }

    setFilteredMedicines(filtered);
  }, [medicineDatabase, searchTerm, selectedCategory]);

  useEffect(() => {
    filterMedicines();
  }, [filterMedicines]);

  const toggleFavorite = (medicineId) => {
    setFavorites(prev =>
      prev.includes(medicineId)
        ? prev.filter(id => id !== medicineId)
        : [...prev, medicineId]
    );
  };

  const openMedicineDetails = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const closeMedicineDetails = () => {
    setSelectedMedicine(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="alternative-medicines">
      <div className="medicines-header">
        <FaPills className="header-icon" />
        <h2>Alternative Medicines</h2>
        <p>Find generic medicines and cost-effective alternatives with the same composition</p>
      </div>

      {showDisclaimer && (
        <motion.div 
          className="disclaimer-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaExclamationTriangle className="disclaimer-icon" />
          <div className="disclaimer-content">
            <strong>Important:</strong> This tool provides information about generic medicines and alternatives. 
            Always consult with your healthcare provider before switching medications. 
            Generic medicines have the same active ingredients but may have different inactive ingredients.
          </div>
          <button 
            className="close-disclaimer"
            onClick={() => setShowDisclaimer(false)}
          >
            <FaTimes />
          </button>
        </motion.div>
      )}

      <div className="search-filters">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search medicines, brands, or generics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="results-info">
        <p>Found {filteredMedicines.length} medicines</p>
        {favorites.length > 0 && (
          <span className="favorites-count">
            <FaBookmark />
            {favorites.length} in favorites
          </span>
        )}
      </div>

      <div className="medicines-grid">
        {filteredMedicines.map((medicine) => (
          <motion.div
            key={medicine.id}
            className="medicine-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card-header">
              <div className="medicine-info">
                <h3>{medicine.name}</h3>
                <p className="brand-name">{medicine.brand}</p>
                <span className="generic-name">Generic: {medicine.generic}</span>
              </div>
              <div className="card-actions">
                <button
                  className={`favorite-btn ${favorites.includes(medicine.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(medicine.id)}
                >
                  <FaHeart />
                </button>
                <span className="category-badge">{medicine.category}</span>
              </div>
            </div>

            <div className="medicine-details">
              <div className="detail-row">
                <span className="label">Composition:</span>
                <span className="value">{medicine.composition}</span>
              </div>
              <div className="detail-row">
                <span className="label">Uses:</span>
                <span className="value">{medicine.uses}</span>
              </div>
              <div className="detail-row">
                <span className="label">Price Range:</span>
                <span className="value price">{medicine.price}</span>
              </div>
              <div className="detail-row">
                <span className="label">Availability:</span>
                <span className={`value availability ${medicine.availability === 'Over the counter' ? 'otc' : 'prescription'}`}>
                  {medicine.availability}
                </span>
              </div>
            </div>

            <div className="rating-section">
              <div className="stars">
                {renderStars(medicine.rating)}
                <span className="rating-text">{medicine.rating}</span>
              </div>
              <span className="reviews">({medicine.reviews} reviews)</span>
            </div>

            {medicine.alternatives && medicine.alternatives.length > 0 && (
              <div className="alternatives-preview">
                <h4>Alternatives:</h4>
                <div className="alternatives-list">
                  {medicine.alternatives.slice(0, 2).map((alt, index) => (
                    <span key={index} className="alternative-tag">
                      {alt.name} - {alt.price}
                    </span>
                  ))}
                  {medicine.alternatives.length > 2 && (
                    <span className="more-alternatives">
                      +{medicine.alternatives.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <motion.button
              className="view-details-btn"
              onClick={() => openMedicineDetails(medicine)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaArrowRight />
              View Details & Alternatives
            </motion.button>
          </motion.div>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="no-results">
          <FaSearch className="no-results-icon" />
          <h3>No medicines found</h3>
          <p>Try adjusting your search terms or category filter</p>
        </div>
      )}

      {/* Medicine Details Modal */}
      {selectedMedicine && ReactDOM.createPortal(
        <div 
          className="medicine-modal-overlay"
          onClick={closeMedicineDetails}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 999999,
            backdropFilter: 'blur(10px)',
            margin: 0
          }}
        >
          <motion.div 
            className="medicine-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '25px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="modal-header">
              <div className="modal-title">
                <h2>{selectedMedicine.name}</h2>
                <p className="brand-name">{selectedMedicine.brand}</p>
              </div>
              <button className="close-modal" onClick={closeMedicineDetails}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-content">
              <div className="medicine-overview">
                <div className="overview-grid">
                  <div className="overview-item">
                    <span className="label">Generic Name:</span>
                    <span className="value">{selectedMedicine.generic}</span>
                  </div>
                  <div className="overview-item">
                    <span className="label">Category:</span>
                    <span className="value">{selectedMedicine.category}</span>
                  </div>
                  <div className="overview-item">
                    <span className="label">Composition:</span>
                    <span className="value">{selectedMedicine.composition}</span>
                  </div>
                  <div className="overview-item">
                    <span className="label">Strength:</span>
                    <span className="value">{selectedMedicine.strength}</span>
                  </div>
                  <div className="overview-item">
                    <span className="label">Price Range:</span>
                    <span className="value price">{selectedMedicine.price}</span>
                  </div>
                  <div className="overview-item">
                    <span className="label">Availability:</span>
                    <span className={`value availability ${selectedMedicine.availability === 'Over the counter' ? 'otc' : 'prescription'}`}>
                      {selectedMedicine.availability}
                    </span>
                  </div>
                </div>

                <div className="rating-overview">
                  <div className="stars">
                    {renderStars(selectedMedicine.rating)}
                    <span className="rating-text">{selectedMedicine.rating}</span>
                  </div>
                  <span className="reviews">({selectedMedicine.reviews} reviews)</span>
                </div>
              </div>

              <div className="medicine-details-section">
                <h3>Uses & Side Effects</h3>
                <div className="details-grid">
                  <div className="detail-card">
                    <h4>Uses</h4>
                    <p>{selectedMedicine.uses}</p>
                  </div>
                  <div className="detail-card">
                    <h4>Side Effects</h4>
                    <p>{selectedMedicine.sideEffects}</p>
                  </div>
                </div>
              </div>

              {selectedMedicine.alternatives && selectedMedicine.alternatives.length > 0 && (
                <div className="alternatives-section">
                  <h3>Alternative Medicines</h3>
                  <p className="section-description">
                    These medicines contain the same active ingredient ({selectedMedicine.generic}) and can be used as alternatives:
                  </p>
                  
                  <div className="alternatives-grid">
                    {selectedMedicine.alternatives.map((alt, index) => (
                      <motion.div
                        key={index}
                        className="alternative-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="alt-header">
                          <h4>{alt.name}</h4>
                          <span className="alt-strength">{alt.strength}</span>
                        </div>
                        <div className="alt-price">
                          <FaMoneyBillWave />
                          <span>{alt.price}</span>
                        </div>
                        <div className="alt-composition">
                          <FaFlask />
                          <span>{selectedMedicine.generic} {alt.strength}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="safety-notice">
                <FaExclamationTriangle className="notice-icon" />
                <div className="notice-content">
                  <h4>Important Safety Information</h4>
                  <ul>
                    <li>Always consult your doctor before switching medications</li>
                    <li>Generic medicines have the same active ingredients but may contain different inactive ingredients</li>
                    <li>Some people may be allergic to specific inactive ingredients</li>
                    <li>Prices may vary based on location and pharmacy</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AlternativeMedicines;
