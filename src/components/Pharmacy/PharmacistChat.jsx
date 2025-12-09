import React, { useState, useEffect, useRef } from 'react';
import { 
  FaComments, 
  FaTimes, 
  FaWindowMinimize, 
  FaExpand, 
  FaCompress,
  FaPaperPlane, 
  FaCheck, 
  FaCheckDouble,
  FaUser
} from 'react-icons/fa';
import './PharmacistChat.css';

const PharmacistChat = ({ selectedMedicine, userQuery, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const [pharmacistOnline, setPharmacistOnline] = useState(true);
  const messagesEndRef = useRef(null);

  // Mock pharmacist data
  const pharmacists = [
    {
      id: 1,
      name: 'Dr. Meera Patel',
      license: 'PharmD-MH-12345',
      experience: '8 years',
      specialization: 'Clinical Pharmacy',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
      status: 'online'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      license: 'PharmD-DL-67890',
      experience: '12 years',
      specialization: 'Hospital Pharmacy',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      status: 'online'
    },
    { 
      id: 3, 
      name: 'Dr. Priya Sharma', 
      license: 'PH789012', 
      experience: '8 years', 
      specialization: 'Pediatric Pharmacy',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      isOnline: true 
    },
    {
      id: 4,
      name: 'Dr. Amit Singh',
      license: 'PharmD-UP-98765',
      experience: '10 years',
      specialization: 'Geriatric Pharmacy',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
      status: 'online'
    },
    {
      id: 5,
      name: 'Dr. Kavya Reddy',
      license: 'PharmD-TG-13579',
      experience: '7 years',
      specialization: 'Oncology Pharmacy',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face',
      status: 'online'
    }
  ];

  const [selectedPharmacist, setSelectedPharmacist] = useState(pharmacists[0]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      document.body.classList.remove('modal-open');
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Initialize chat session
  useEffect(() => {
    const sessionId = `CHAT_${Date.now()}`;
    setChatSession({
      id: sessionId,
      startTime: new Date(),
      pharmacist: selectedPharmacist,
      status: 'active'
    });

    // Welcome message
    const welcomeMessage = {
      id: Date.now(),
      sender: 'pharmacist',
      message: `Hello! I'm ${selectedPharmacist.name}, a licensed pharmacist. I'm here to help you with any questions about medicines, dosages, side effects, or drug interactions. How can I assist you today?`,
      timestamp: new Date(),
      status: 'delivered'
    };

    setMessages([welcomeMessage]);

    // If there's a selected medicine, add context
    if (selectedMedicine) {
      setTimeout(() => {
        const contextMessage = {
          id: Date.now() + 1,
          sender: 'pharmacist',
          message: `I see you're looking at ${selectedMedicine.name}. Do you have any specific questions about this medication?`,
          timestamp: new Date(),
          status: 'delivered'
        };
        setMessages(prev => [...prev, contextMessage]);
      }, 1000);
    }

    // If there's a user query, add it
    if (userQuery) {
      setTimeout(() => {
        const userMessage = {
          id: Date.now() + 2,
          sender: 'user',
          message: userQuery,
          timestamp: new Date(),
          status: 'sent'
        };
        setMessages(prev => [...prev, userMessage]);
        handlePharmacistResponse(userQuery);
      }, 1500);
    }
  }, [selectedMedicine, userQuery, selectedPharmacist]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pharmacist response logic
  const handlePharmacistResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getPharmacistResponse(userMessage);
      const responseMessage = {
        id: Date.now(),
        sender: 'pharmacist',
        message: response,
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000); // 2-4 seconds delay
  };

  // Generate contextual responses
  const generatePharmacistResponse = (message) => {
    const responses = {
      // Dosage questions
      dosage: [
        "The recommended dosage depends on your age, weight, and medical condition. Always follow your doctor's prescription or the package instructions. Would you like me to explain the specific dosage for your medication?",
        "Dosage can vary based on several factors. Can you tell me your age and the specific condition you're treating? This will help me provide more accurate guidance."
      ],
      
      // Side effects
      'side effect': [
        "Side effects can vary from person to person. Common side effects include nausea, dizziness, or stomach upset. Serious side effects are rare but should be reported to your doctor immediately. What specific side effects are you concerned about?",
        "Most medications have potential side effects, but not everyone experiences them. I can provide detailed information about the side effects of your specific medication. Which medicine are you asking about?"
      ],
      
      // Drug interactions
      interaction: [
        "Drug interactions can be serious. It's important to tell your pharmacist and doctor about all medications, supplements, and herbal products you're taking. Are you currently taking any other medications?",
        "I can check for potential interactions. Please list all the medications you're currently taking, including over-the-counter drugs and supplements."
      ],
      
      // Pregnancy/breastfeeding
      pregnan: [
        "Medication safety during pregnancy is crucial. Many medications are not recommended during pregnancy or breastfeeding. Please consult your doctor before taking any medication if you're pregnant or planning to become pregnant.",
        "This is an important safety concern. I recommend speaking with your obstetrician or primary care doctor about safe medication options during pregnancy."
      ],
      
      // Storage
      storage: [
        "Proper storage is important for medication effectiveness. Most medications should be stored in a cool, dry place away from direct sunlight. Some require refrigeration. Check the label for specific storage instructions.",
        "Storage conditions can affect medication potency. Keep medications in their original containers, away from heat and moisture. Never store medications in bathrooms or cars."
      ],
      
      // Generic vs brand
      generic: [
        "Generic medications contain the same active ingredients as brand-name drugs and are equally effective. They're often more affordable. The FDA ensures generic drugs meet the same quality standards as brand-name medications.",
        "Generic drugs are bioequivalent to brand-name drugs, meaning they work the same way in your body. They're a cost-effective option with the same therapeutic benefits."
      ]
    }
  };

  // Comprehensive medicine database for detailed responses
  const medicineDatabase = {
    'paracetamol': {
      name: 'Paracetamol (Acetaminophen)',
      genericNames: ['Acetaminophen', 'N-acetyl-p-aminophenol'],
      brandNames: ['Tylenol', 'Panadol', 'Crocin', 'Dolo', 'Calpol'],
      composition: 'Active ingredient: Paracetamol 500mg/650mg',
      category: 'Analgesic, Antipyretic',
      dosage: 'Adults: 500-1000mg every 4-6 hours, maximum 4g daily. Children: 10-15mg/kg every 4-6 hours',
      sideEffects: ['Rare: skin rash', 'Overdose: liver damage', 'Nausea (uncommon)', 'Allergic reactions (rare)'],
      allergies: ['Hypersensitivity to paracetamol', 'Severe liver disease'],
      interactions: ['Warfarin (increased bleeding risk)', 'Alcohol (liver toxicity)', 'Carbamazepine', 'Phenytoin'],
      contraindications: ['Severe liver impairment', 'Alcohol dependence', 'G6PD deficiency (high doses)'],
      storage: 'Store below 25°C, keep dry, protect from light',
      warnings: ['Do not exceed recommended dose', 'Avoid alcohol', 'Check other medicines for paracetamol content'],
      uses: ['Pain relief', 'Fever reduction', 'Headache', 'Muscle pain', 'Arthritis pain'],
      mechanismOfAction: 'Inhibits COX enzymes in the brain, reducing pain and fever',
      onsetOfAction: '30-60 minutes oral, peak effect 1-3 hours',
      duration: '4-6 hours',
      pregnancy: 'Category B - Generally safe during pregnancy',
      breastfeeding: 'Safe - minimal transfer to breast milk'
    },
    'ibuprofen': {
      name: 'Ibuprofen',
      genericNames: ['Ibuprofen', '2-(4-isobutylphenyl)propionic acid'],
      brandNames: ['Advil', 'Motrin', 'Brufen', 'Combiflam', 'Ibugesic'],
      composition: 'Active ingredient: Ibuprofen 200mg/400mg/600mg',
      category: 'NSAID (Non-Steroidal Anti-Inflammatory Drug)',
      dosage: 'Adults: 200-400mg every 4-6 hours, maximum 1200mg daily. Children: 5-10mg/kg every 6-8 hours',
      sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Headache', 'Rash', 'Fluid retention'],
      allergies: ['NSAIDs allergy', 'Aspirin sensitivity', 'Asthma (some patients)', 'Nasal polyps'],
      interactions: ['Warfarin', 'ACE inhibitors', 'Diuretics', 'Methotrexate', 'Lithium', 'Digoxin'],
      contraindications: ['Peptic ulcer', 'Severe heart failure', 'Severe kidney disease', 'Active bleeding'],
      storage: 'Store below 25°C, protect from light and moisture',
      warnings: ['Take with food', 'Avoid in pregnancy (3rd trimester)', 'Monitor blood pressure', 'Kidney function'],
      uses: ['Pain relief', 'Inflammation reduction', 'Fever reduction', 'Arthritis', 'Menstrual cramps'],
      mechanismOfAction: 'Inhibits COX-1 and COX-2 enzymes, reducing inflammation and pain',
      onsetOfAction: '30-60 minutes, peak effect 1-2 hours',
      duration: '4-6 hours',
      pregnancy: 'Category C/D - Avoid in 3rd trimester',
      breastfeeding: 'Safe - low levels in breast milk'
    },
    'aspirin': {
      name: 'Aspirin (Acetylsalicylic Acid)',
      genericNames: ['Acetylsalicylic acid', 'ASA'],
      brandNames: ['Bayer', 'Ecosprin', 'Disprin', 'Loprin', 'Ascard'],
      composition: 'Active ingredient: Acetylsalicylic acid 75mg/100mg/325mg',
      category: 'NSAID, Antiplatelet agent',
      dosage: 'Pain relief: 300-600mg every 4 hours. Cardioprotective: 75-100mg daily. Max: 4g daily',
      sideEffects: ['Stomach irritation', 'Bleeding', 'Tinnitus', 'Allergic reactions', 'Bruising'],
      allergies: ['Salicylate hypersensitivity', 'Asthma', 'Nasal polyps', 'NSAID allergy'],
      interactions: ['Warfarin', 'Methotrexate', 'Diabetes medications', 'ACE inhibitors', 'Heparin'],
      contraindications: ['Active bleeding', 'Children under 16 (Reye\'s syndrome)', 'Severe asthma', 'Hemophilia'],
      storage: 'Store in cool, dry place, protect from moisture, check for vinegar smell',
      warnings: ['Take with food', 'Avoid alcohol', 'Stop before surgery', 'Not for children under 16'],
      uses: ['Pain relief', 'Heart attack prevention', 'Stroke prevention', 'Inflammation', 'Fever reduction'],
      mechanismOfAction: 'Irreversibly inhibits COX enzymes, prevents platelet aggregation',
      onsetOfAction: '30 minutes, peak effect 1-2 hours',
      duration: '4-6 hours (antiplatelet effect lasts days)',
      pregnancy: 'Category C/D - Avoid in 3rd trimester',
      breastfeeding: 'Use with caution - monitor infant'
    },
    'metformin': {
      name: 'Metformin Hydrochloride',
      genericNames: ['Metformin HCl', 'Dimethylbiguanide'],
      brandNames: ['Glucophage', 'Glycomet', 'Obimet', 'Formet', 'Diabex'],
      composition: 'Active ingredient: Metformin Hydrochloride 500mg/850mg/1000mg',
      category: 'Antidiabetic (Biguanide)',
      dosage: 'Initial: 500mg twice daily with meals. Maximum: 2000-2550mg daily in divided doses',
      sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste', 'Vitamin B12 deficiency (long-term)', 'Lactic acidosis (rare)'],
      allergies: ['Hypersensitivity to metformin', 'Severe kidney disease', 'Metabolic acidosis'],
      interactions: ['Contrast dyes', 'Alcohol', 'Diuretics', 'Corticosteroids', 'Cimetidine'],
      contraindications: ['Severe kidney disease', 'Liver disease', 'Heart failure', 'Alcoholism', 'Dehydration'],
      storage: 'Store at room temperature (15-30°C), protect from moisture and light',
      warnings: ['Take with meals', 'Regular kidney function tests', 'Stop before contrast procedures', 'Monitor B12 levels'],
      uses: ['Type 2 diabetes', 'PCOS', 'Prediabetes', 'Weight management in diabetes'],
      mechanismOfAction: 'Decreases glucose production by liver, improves insulin sensitivity',
      onsetOfAction: 'Several days to weeks for full effect',
      duration: '12-24 hours (extended release)',
      pregnancy: 'Category B - Generally safe, consult doctor',
      breastfeeding: 'Compatible - low levels in breast milk'
    },
    'amlodipine': {
      name: 'Amlodipine Besylate',
      genericNames: ['Amlodipine besylate', 'Amlodipine maleate'],
      brandNames: ['Norvasc', 'Amlong', 'Amlip', 'S-Amlip', 'Stamlo'],
      composition: 'Active ingredient: Amlodipine besylate 2.5mg/5mg/10mg',
      category: 'Calcium Channel Blocker (Dihydropyridine)',
      dosage: 'Initial: 2.5-5mg once daily. Maximum: 10mg once daily. Elderly: Start with 2.5mg',
      sideEffects: ['Ankle swelling', 'Flushing', 'Palpitations', 'Dizziness', 'Fatigue', 'Gum hyperplasia'],
      allergies: ['Hypersensitivity to amlodipine', 'Severe aortic stenosis', 'Dihydropyridine allergy'],
      interactions: ['Simvastatin', 'Grapefruit juice', 'CYP3A4 inhibitors', 'Cyclosporine'],
      contraindications: ['Cardiogenic shock', 'Severe hypotension', 'Severe aortic stenosis', 'Unstable angina'],
      storage: 'Store below 25°C, protect from light and moisture, original container',
      warnings: ['Rise slowly from sitting', 'Avoid grapefruit', 'Regular blood pressure monitoring', 'Dental hygiene'],
      uses: ['Hypertension', 'Angina', 'Coronary artery disease', 'Raynaud\'s phenomenon'],
      mechanismOfAction: 'Blocks calcium channels in blood vessels, causing vasodilation',
      onsetOfAction: '6-12 hours, peak effect 6-12 hours',
      duration: '24 hours',
      pregnancy: 'Category C - Use only if benefit outweighs risk',
      breastfeeding: 'Use with caution - limited data available'
    },
    'amoxicillin': {
      name: 'Amoxicillin',
      genericNames: ['Amoxicillin trihydrate', 'α-amino-p-hydroxybenzylpenicillin'],
      brandNames: ['Amoxil', 'Augmentin', 'Moxikind', 'Novamox', 'Zemox'],
      composition: 'Active ingredient: Amoxicillin trihydrate 250mg/500mg/875mg',
      category: 'Antibiotic (Penicillin)',
      dosage: 'Adults: 250-500mg every 8 hours or 500-875mg every 12 hours. Children: 20-40mg/kg/day',
      sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Rash', 'Allergic reactions', 'C. diff colitis'],
      allergies: ['Penicillin allergy', 'Beta-lactam allergy', 'Cephalosporin cross-reactivity'],
      interactions: ['Warfarin', 'Methotrexate', 'Oral contraceptives', 'Allopurinol'],
      contraindications: ['Penicillin allergy', 'Infectious mononucleosis', 'Severe kidney disease'],
      storage: 'Store at room temperature, liquid form refrigerated, complete full course',
      warnings: ['Complete full course', 'Take with food if stomach upset', 'Report severe diarrhea'],
      uses: ['Bacterial infections', 'Pneumonia', 'UTI', 'Skin infections', 'Dental infections'],
      mechanismOfAction: 'Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins',
      onsetOfAction: '1-2 hours, peak levels 1-2 hours',
      duration: '8-12 hours depending on formulation',
      pregnancy: 'Category B - Generally safe during pregnancy',
      breastfeeding: 'Safe - minimal levels in breast milk'
    },
    'omeprazole': {
      name: 'Omeprazole',
      genericNames: ['Omeprazole magnesium', '5-methoxy-2-[[(4-methoxy-3,5-dimethyl-2-pyridinyl)methyl]sulfinyl]-1H-benzimidazole'],
      brandNames: ['Prilosec', 'Omez', 'Ocid', 'Omepral', 'Losec'],
      composition: 'Active ingredient: Omeprazole 10mg/20mg/40mg',
      category: 'Proton Pump Inhibitor (PPI)',
      dosage: 'Adults: 20-40mg once daily before breakfast. GERD: 20mg daily. Ulcers: 20-40mg daily',
      sideEffects: ['Headache', 'Diarrhea', 'Nausea', 'Abdominal pain', 'Vitamin B12 deficiency (long-term)'],
      allergies: ['Hypersensitivity to omeprazole', 'Benzimidazole allergy'],
      interactions: ['Clopidogrel', 'Warfarin', 'Digoxin', 'Atazanavir', 'Iron supplements'],
      contraindications: ['Hypersensitivity to PPIs', 'Concurrent use with rilpivirine'],
      storage: 'Store at room temperature, protect from light and moisture, swallow whole',
      warnings: ['Do not crush tablets', 'Long-term use monitoring', 'Gradual discontinuation'],
      uses: ['GERD', 'Peptic ulcers', 'H. pylori eradication', 'Zollinger-Ellison syndrome'],
      mechanismOfAction: 'Irreversibly inhibits H+/K+-ATPase (proton pump) in gastric parietal cells',
      onsetOfAction: '1-2 hours, peak effect 2-6 hours',
      duration: '24-72 hours (due to irreversible binding)',
      pregnancy: 'Category C - Use if benefit outweighs risk',
      breastfeeding: 'Use with caution - limited data'
    },
    'atorvastatin': {
      name: 'Atorvastatin Calcium',
      genericNames: ['Atorvastatin calcium trihydrate'],
      brandNames: ['Lipitor', 'Atorlip', 'Atocor', 'Storvas', 'Tonact'],
      composition: 'Active ingredient: Atorvastatin calcium 10mg/20mg/40mg/80mg',
      category: 'HMG-CoA Reductase Inhibitor (Statin)',
      dosage: 'Initial: 10-20mg once daily. Maximum: 80mg daily. Take in evening',
      sideEffects: ['Muscle pain', 'Headache', 'Diarrhea', 'Liver enzyme elevation', 'Memory problems'],
      allergies: ['Hypersensitivity to atorvastatin', 'Active liver disease'],
      interactions: ['Grapefruit juice', 'Cyclosporine', 'Gemfibrozil', 'Warfarin', 'Digoxin'],
      contraindications: ['Active liver disease', 'Pregnancy', 'Breastfeeding', 'Unexplained elevated liver enzymes'],
      storage: 'Store at room temperature, protect from light and moisture',
      warnings: ['Monitor liver function', 'Report muscle pain', 'Avoid grapefruit', 'Pregnancy prevention'],
      uses: ['High cholesterol', 'Cardiovascular disease prevention', 'Familial hypercholesterolemia'],
      mechanismOfAction: 'Inhibits HMG-CoA reductase, reducing cholesterol synthesis',
      onsetOfAction: '2 weeks for lipid effects, peak 2-4 weeks',
      duration: '20-30 hours half-life',
      pregnancy: 'Category X - Contraindicated in pregnancy',
      breastfeeding: 'Contraindicated - discontinue nursing or drug'
    }
  };

  // Enhanced pharmacist responses with detailed medicine information
  const getPharmacistResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced medicine matching - check for partial matches and brand names
    const findMedicine = () => {
      // First, try exact matches
      let found = Object.keys(medicineDatabase).find(med => 
        lowerMessage.includes(med) || lowerMessage.includes(medicineDatabase[med].name.toLowerCase())
      );
      
      if (found) return found;
      
      // Then try brand name matches
      for (const [key, medicine] of Object.entries(medicineDatabase)) {
        const brandMatch = medicine.brandNames.some(brand => 
          lowerMessage.includes(brand.toLowerCase())
        );
        if (brandMatch) return key;
      }
      
      // Finally try generic name matches
      for (const [key, medicine] of Object.entries(medicineDatabase)) {
        const genericMatch = medicine.genericNames.some(generic => 
          lowerMessage.includes(generic.toLowerCase())
        );
        if (genericMatch) return key;
      }
      
      return null;
    };
    
    const mentionedMedicine = findMedicine();
    
    if (mentionedMedicine) {
      const medicine = medicineDatabase[mentionedMedicine];
      
      // Brand names and generic alternatives
      if (lowerMessage.includes('brand') || lowerMessage.includes('generic') || lowerMessage.includes('alternative')) {
        return `${medicine.name} - Brand Names & Alternatives:\n\n🏷️ **Brand Names**:\n${medicine.brandNames.map(brand => `• ${brand}`).join('\n')}\n\n🧬 **Generic Names**:\n${medicine.genericNames.map(generic => `• ${generic}`).join('\n')}\n\n💰 **Cost-saving tip**: Generic versions contain the same active ingredient and are equally effective but often cost 30-80% less than brand names.`;
      }
      
      // Composition and category
      if (lowerMessage.includes('composition') || lowerMessage.includes('ingredient') || lowerMessage.includes('what is')) {
        return `${medicine.name} - Detailed Information:\n\n🧪 **Composition**: ${medicine.composition}\n📂 **Category**: ${medicine.category}\n\n🎯 **Uses**:\n${medicine.uses.map(use => `• ${use}`).join('\n')}\n\n⚙️ **How it works**: ${medicine.mechanismOfAction}\n\n⏱️ **Onset**: ${medicine.onsetOfAction}\n⏳ **Duration**: ${medicine.duration}`;
      }
      
      // Pregnancy and breastfeeding
      if (lowerMessage.includes('pregnancy') || lowerMessage.includes('pregnant') || lowerMessage.includes('breastfeeding') || lowerMessage.includes('nursing')) {
        return `${medicine.name} - Pregnancy & Breastfeeding Safety:\n\n🤰 **Pregnancy**: ${medicine.pregnancy}\n🤱 **Breastfeeding**: ${medicine.breastfeeding}\n\n⚠️ **Important**: Always consult your healthcare provider before taking any medication during pregnancy or while breastfeeding. They can assess the benefits vs risks for your specific situation.`;
      }
      
      // Dosage information
      if (lowerMessage.includes('dosage') || lowerMessage.includes('dose') || lowerMessage.includes('how much') || lowerMessage.includes('how often')) {
        return `${medicine.name} - Dosage Information:\n\n📋 **Dosage**: ${medicine.dosage}\n\n⏱️ **Timing**: ${medicine.onsetOfAction}\n⏳ **Duration**: ${medicine.duration}\n\n⚠️ **Important Warnings**:\n${medicine.warnings.map(warning => `• ${warning}`).join('\n')}\n\nAlways follow your doctor's prescription and never exceed the recommended dose.`;
      }
      
      // Side effects
      if (lowerMessage.includes('side effect') || lowerMessage.includes('adverse') || lowerMessage.includes('reaction')) {
        return `${medicine.name} - Side Effects:\n\n🔸 **Possible Side Effects**:\n${medicine.sideEffects.map(effect => `• ${effect}`).join('\n')}\n\n🚨 **When to seek immediate help**:\n• Severe allergic reactions (rash, swelling, difficulty breathing)\n• Unusual or severe symptoms\n• Signs of toxicity\n\n💡 **Tip**: Most side effects are mild and temporary. Contact your healthcare provider if you're concerned.`;
      }
      
      // Allergies and contraindications
      if (lowerMessage.includes('allergy') || lowerMessage.includes('allergic') || lowerMessage.includes('contraindication')) {
        return `${medicine.name} - Allergy & Contraindication Information:\n\n🚫 **Avoid if you have**:\n${medicine.allergies.map(allergy => `• ${allergy}`).join('\n')}\n\n⛔ **Contraindications**:\n${medicine.contraindications.map(contra => `• ${contra}`).join('\n')}\n\n⚠️ **Critical**: Always inform your healthcare provider about all allergies, medical conditions, and medications before starting any new treatment.`;
      }
      
      // Drug interactions
      if (lowerMessage.includes('interaction') || lowerMessage.includes('other medicine') || lowerMessage.includes('drug interaction')) {
        return `${medicine.name} - Drug Interactions:\n\n⚠️ **May interact with**:\n${medicine.interactions.map(drug => `• ${drug}`).join('\n')}\n\n🔍 **What to do**:\n• Tell your pharmacist about ALL medications you take\n• Include prescription drugs, over-the-counter medicines, vitamins, and herbal supplements\n• Check with your pharmacist before starting any new medication\n\n💡 **Tip**: Keep an updated list of all your medications to show healthcare providers.`;
      }
      
      // Storage instructions
      if (lowerMessage.includes('storage') || lowerMessage.includes('store') || lowerMessage.includes('keep') || lowerMessage.includes('expire')) {
        return `${medicine.name} - Storage Instructions:\n\n🏠 **Storage**: ${medicine.storage}\n\n📝 **General Storage Tips**:\n• Keep in original container with label\n• Store away from children and pets\n• Don't store in bathroom or car (heat/humidity)\n• Check expiry dates regularly\n• Dispose of expired medicines safely at pharmacy\n\n🌡️ **Temperature matters**: Improper storage can reduce effectiveness or make medicine harmful.`;
      }
      
      // Uses and indications
      if (lowerMessage.includes('use') || lowerMessage.includes('treat') || lowerMessage.includes('indication') || lowerMessage.includes('condition')) {
        return `${medicine.name} - Uses & Indications:\n\n🎯 **Primary Uses**:\n${medicine.uses.map(use => `• ${use}`).join('\n')}\n\n⚙️ **How it works**: ${medicine.mechanismOfAction}\n\n📂 **Drug Category**: ${medicine.category}\n\n⏱️ **Expected Results**: ${medicine.onsetOfAction}\n\n💡 **Note**: This medication should only be used as prescribed by your healthcare provider for your specific condition.`;
      }
      
      // General comprehensive information
      return `${medicine.name} - Complete Information:\n\n🧪 **Composition**: ${medicine.composition}\n📂 **Category**: ${medicine.category}\n\n💊 **Dosage**: ${medicine.dosage}\n🏠 **Storage**: ${medicine.storage}\n\n🎯 **Main Uses**: ${medicine.uses.slice(0, 3).join(', ')}\n⚠️ **Key Warnings**: ${medicine.warnings.slice(0, 2).join(', ')}\n\nWhat specific aspect would you like to know more about? I can provide details on:\n• Dosage & timing\n• Side effects & safety\n• Drug interactions\n• Pregnancy/breastfeeding\n• Storage & handling\n• Brand alternatives`;
    }
    
    // General responses for non-specific queries
    if (lowerMessage.includes('dosage') || lowerMessage.includes('dose')) {
      return `For proper dosage information:\n\n📋 **Always follow**:\n• Your doctor's prescription\n• Package instructions\n• Pharmacist's guidance\n\n⚠️ **Never**:\n• Exceed recommended dose\n• Share medications\n• Stop suddenly without consulting doctor\n\nWhich specific medication are you asking about? I can provide detailed dosage information.`;
    }
    
    if (lowerMessage.includes('side effect')) {
      return `Understanding side effects:\n\n🔸 **Common types**:\n• Mild: nausea, dizziness, headache\n• Moderate: rash, stomach upset\n• Severe: difficulty breathing, severe allergic reactions\n\n📞 **When to seek help**:\n• Severe or persistent symptoms\n• Signs of allergic reaction\n• Unusual or concerning effects\n\nWhich medication's side effects are you concerned about?`;
    }
    
    if (lowerMessage.includes('interaction')) {
      return `Drug interactions can be serious:\n\n⚠️ **Always inform healthcare providers about**:\n• All prescription medications\n• Over-the-counter drugs\n• Vitamins and supplements\n• Herbal products\n• Recreational substances\n\n🔍 **Common interaction types**:\n• Blood thinners + pain relievers\n• Heart medications + certain antibiotics\n• Diabetes drugs + steroids\n\nWhat medications are you taking? I can help check for interactions.`;
    }
    
    if (lowerMessage.includes('allergy') || lowerMessage.includes('allergic')) {
      return `Medication allergies are serious:\n\n🚨 **Allergic reaction signs**:\n• Skin rash or hives\n• Swelling (face, lips, tongue)\n• Difficulty breathing\n• Severe dizziness\n\n📝 **Important steps**:\n• Keep a list of all known allergies\n• Wear medical alert bracelet\n• Inform all healthcare providers\n• Carry emergency medication if prescribed\n\nDo you have any known drug allergies I should be aware of?`;
    }
    
    if (lowerMessage.includes('pregnancy') || lowerMessage.includes('pregnant')) {
      return `Medication safety during pregnancy:\n\n⚠️ **Important guidelines**:\n• Consult doctor before taking ANY medication\n• Some medicines can harm the baby\n• Benefits vs risks must be evaluated\n• Natural doesn't always mean safe\n\n📞 **Always check with healthcare provider**:\n• Before starting new medications\n• If you become pregnant while taking medication\n• For safe alternatives\n\nWhat medication are you concerned about during pregnancy?`;
    }
    
    if (lowerMessage.includes('elderly') || lowerMessage.includes('senior')) {
      return `Medication considerations for elderly patients:\n\n👴 **Special considerations**:\n• Slower drug processing\n• Higher risk of side effects\n• More drug interactions\n• Memory issues with dosing\n\n💡 **Safety tips**:\n• Use pill organizers\n• Regular medication reviews\n• Monitor for confusion or falls\n• Keep updated medication list\n\nWhat specific concerns do you have about elderly medication use?`;
    }
    
    return `I'm here to help with comprehensive medication guidance:\n\n💊 **I can provide information about**:\n• Dosage and administration\n• Side effects and warnings\n• Drug interactions\n• Allergy information\n• Storage instructions\n• Safety during pregnancy/breastfeeding\n\n🔍 **Available medicines in our database**:\nParacetamol, Ibuprofen, Aspirin, Metformin, Amlodipine, and many more.\n\nWhat specific medication or health concern would you like to discuss?`;
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: inputMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    handlePharmacistResponse(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    // Prevent page scroll when typing
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay">
      <div className={`pharmacist-chat-modal ${isMinimized ? 'minimized' : ''} ${isFullscreen ? 'fullscreen' : ''}`}>
        <div className="chat-header">
          <div className="header-left">
            <img src={selectedPharmacist.image} alt={selectedPharmacist.name} className="pharmacist-avatar" />
            <div className="pharmacist-details">
              <h3>{selectedPharmacist.name}</h3>
              <p className="pharmacist-title">{selectedPharmacist.specialization}</p>
              <div className="online-status">
                <div className="status-dot online"></div>
                <span>Online now</span>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              onClick={onClose}
              className="modal-control-btn close-btn"
              title="Close Chat"
            >
            </button>
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="modal-control-btn minimize-btn"
              title={isMinimized ? "Restore" : "Minimize"}
            >
            </button>
            <button 
              className="modal-control-btn fullscreen-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="pharmacist-selector">
              <h4>Switch Pharmacist</h4>
              <div className="pharmacist-list">
                {pharmacists.map(pharmacist => (
                  <div 
                    key={pharmacist.id}
                    className={`pharmacist-option ${selectedPharmacist.id === pharmacist.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPharmacist(pharmacist)}
                  >
                    <img src={pharmacist.image} alt={pharmacist.name} className="pharmacist-thumb" />
                    <div className="pharmacist-info-mini">
                      <span className="pharmacist-name">{pharmacist.name}</span>
                      <span className="pharmacist-spec">{pharmacist.specialization}</span>
                      <div className="status-indicator online"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!isMinimized && (
          <>
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.sender === 'pharmacist' && (
                    <img src={selectedPharmacist.image} alt="Pharmacist" className="message-avatar" />
                  )}
                  <div className="message-bubble">
                    <p>{message.message}</p>
                    <div className="message-meta">
                      <span className="message-time">{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && (
                        <div className="message-status">
                          {message.status === 'sent' && <FaCheck />}
                          {message.status === 'delivered' && <FaCheckDouble />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message pharmacist">
                <div className="message-content">
                  <img src={selectedPharmacist.image} alt="Pharmacist" className="message-avatar" />
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="typing-text">{selectedPharmacist.name} is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about dosage, side effects, interactions..."
                rows="1"
                className="message-input"
                style={{ maxHeight: '120px', overflow: 'auto' }}
              />
              <button 
                onClick={sendMessage}
                className="send-button"
                disabled={!inputMessage.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>

          <div className="chat-disclaimer">
            <p><strong>Disclaimer:</strong> This chat is for informational purposes only. For medical emergencies, contact your doctor or emergency services immediately.</p>
          </div>

          <div className="quick-questions">
            <h4>Quick Questions</h4>
            <div className="question-chips">
              <button onClick={() => {
                const message = "What are the side effects of paracetamol?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Side Effects
              </button>
              <button onClick={() => {
                const message = "What's the correct dosage for ibuprofen?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Dosage Instructions
              </button>
              <button onClick={() => {
                const message = "Can I take aspirin with other medications?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Drug Interactions
              </button>
              <button onClick={() => {
                const message = "How should I store metformin?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Storage Instructions
              </button>
              <button onClick={() => {
                const message = "What allergies should I know about amlodipine?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Allergy Information
              </button>
              <button onClick={() => {
                const message = "Is paracetamol safe during pregnancy?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Pregnancy Safety
              </button>
              <button onClick={() => {
                const message = "What should elderly patients know about medications?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Elderly Care
              </button>
              <button onClick={() => {
                const message = "What are contraindications for ibuprofen?";
                setInputMessage(message);
                setTimeout(() => sendMessage(), 100);
              }}>
                Contraindications
              </button>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PharmacistChat;
