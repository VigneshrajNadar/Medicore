// Comprehensive Indian Health Data - Population Insights, Community Trends, Disease Alerts, Seasonal Recommendations
export const indianHealthData = {
  states: [
    {
      id: "DL",
      name: "Delhi",
      population: 32800000,
      area: 1484,
      density: 11320,
      cities: ["New Delhi", "Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad"]
    },
    {
      id: "MH",
      name: "Maharashtra",
      population: 123144000,
      area: 307713,
      density: 365,
      cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Navi Mumbai"]
    },
    {
      id: "UP",
      name: "Uttar Pradesh",
      population: 237882000,
      area: 243286,
      density: 828,
      cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad"]
    },
    {
      id: "WB",
      name: "West Bengal",
      population: 102552000,
      area: 88752,
      density: 1028,
      cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman"]
    },
    {
      id: "BR",
      name: "Bihar",
      population: 128500000,
      area: 94163,
      density: 1106,
      cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"]
    },
    {
      id: "TN",
      name: "Tamil Nadu",
      population: 82100000,
      area: 130058,
      density: 555,
      cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"]
    },
    {
      id: "RJ",
      name: "Rajasthan",
      population: 81000000,
      area: 342239,
      density: 200,
      cities: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur"]
    },
    {
      id: "MP",
      name: "Madhya Pradesh",
      population: 85300000,
      area: 308252,
      density: 236,
      cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"]
    },
    {
      id: "KA",
      name: "Karnataka",
      population: 67500000,
      area: 191791,
      density: 319,
      cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga"]
    },
    {
      id: "GJ",
      name: "Gujarat",
      population: 70400000,
      area: 196024,
      density: 308,
      cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"]
    },
    {
      id: "AP",
      name: "Andhra Pradesh",
      population: 53900000,
      area: 162975,
      density: 303,
      cities: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"]
    },
    {
      id: "OR",
      name: "Odisha",
      population: 47000000,
      area: 155707,
      density: 270,
      cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"]
    },
    {
      id: "TG",
      name: "Telangana",
      population: 39300000,
      area: 112077,
      density: 307,
      cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam"]
    },
    {
      id: "KL",
      name: "Kerala",
      population: 35600000,
      area: 38863,
      density: 860,
      cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Palakkad"]
    },
    {
      id: "JH",
      name: "Jharkhand",
      population: 39000000,
      area: 79716,
      density: 414,
      cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Phusro"]
    },
    {
      id: "AS",
      name: "Assam",
      population: 35600000,
      area: 78438,
      density: 398,
      cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"]
    },
    {
      id: "PB",
      name: "Punjab",
      population: 30100000,
      area: 50362,
      density: 551,
      cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"]
    },
    {
      id: "HR",
      name: "Haryana",
      population: 28900000,
      area: 44212,
      density: 573,
      cities: ["Chandigarh", "Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar"]
    },
    {
      id: "CT",
      name: "Chhattisgarh",
      population: 29400000,
      area: 135192,
      density: 189,
      cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh"]
    },
    {
      id: "JK",
      name: "Jammu and Kashmir",
      population: 13600000,
      area: 42241,
      density: 124,
      cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Punch"]
    }
  ],

  // Population Health Metrics by State
  populationHealthInsights: {
    "DL": {
      totalPopulation: 32800000,
      healthScore: 6.8,
      lifeExpectancy: 72.5,
      infantMortalityRate: 18,
      maternalMortalityRate: 45,
      doctorPatientRatio: "1:850",
      hospitalBedsPer1000: 2.8,
      vaccinationRate: 89,
      chronicDiseasePrevalence: {
        diabetes: 12.5,
        hypertension: 28.3,
        heartDisease: 8.7,
        cancer: 3.2,
        respiratory: 15.6
      },
      topHealthConcerns: ["Air Pollution", "Diabetes", "Mental Health", "Cardiovascular Diseases"],
      healthInfrastructureScore: 7.2
    },
    "MH": {
      totalPopulation: 123144000,
      healthScore: 7.1,
      lifeExpectancy: 73.8,
      infantMortalityRate: 16,
      maternalMortalityRate: 38,
      doctorPatientRatio: "1:1200",
      hospitalBedsPer1000: 1.9,
      vaccinationRate: 92,
      chronicDiseasePrevalence: {
        diabetes: 10.8,
        hypertension: 25.6,
        heartDisease: 7.4,
        cancer: 2.8,
        respiratory: 12.3
      },
      topHealthConcerns: ["Malnutrition", "Tuberculosis", "Mental Health", "Vector-borne Diseases"],
      healthInfrastructureScore: 6.8
    },
    "UP": {
      totalPopulation: 237882000,
      healthScore: 5.2,
      lifeExpectancy: 68.9,
      infantMortalityRate: 38,
      maternalMortalityRate: 98,
      doctorPatientRatio: "1:2500",
      hospitalBedsPer1000: 1.2,
      vaccinationRate: 78,
      chronicDiseasePrevalence: {
        diabetes: 8.9,
        hypertension: 22.1,
        heartDisease: 6.8,
        cancer: 2.1,
        respiratory: 18.7
      },
      topHealthConcerns: ["Malnutrition", "Anemia", "Respiratory Infections", "Water-borne Diseases"],
      healthInfrastructureScore: 4.5
    },
    "WB": {
      totalPopulation: 102552000,
      healthScore: 6.5,
      lifeExpectancy: 71.2,
      infantMortalityRate: 22,
      maternalMortalityRate: 62,
      doctorPatientRatio: "1:1800",
      hospitalBedsPer1000: 2.1,
      vaccinationRate: 85,
      chronicDiseasePrevalence: {
        diabetes: 11.2,
        hypertension: 26.8,
        heartDisease: 7.9,
        cancer: 2.9,
        respiratory: 14.5
      },
      topHealthConcerns: ["Malnutrition", "Tuberculosis", "Diabetes", "Mental Health"],
      healthInfrastructureScore: 6.2
    },
    "RJ": {
      totalPopulation: 81000000,
      healthScore: 6.3,
      lifeExpectancy: 70.8,
      infantMortalityRate: 32,
      maternalMortalityRate: 85,
      doctorPatientRatio: "1:2200",
      hospitalBedsPer1000: 1.5,
      vaccinationRate: 82,
      chronicDiseasePrevalence: {
        diabetes: 9.5,
        hypertension: 24.1,
        heartDisease: 7.2,
        cancer: 2.5,
        respiratory: 16.8
      },
      topHealthConcerns: ["Malnutrition", "Respiratory Diseases", "Maternal Health", "Water Quality"],
      healthInfrastructureScore: 5.8
    },
    "MP": {
      totalPopulation: 85300000,
      healthScore: 5.8,
      lifeExpectancy: 69.5,
      infantMortalityRate: 36,
      maternalMortalityRate: 92,
      doctorPatientRatio: "1:2800",
      hospitalBedsPer1000: 1.3,
      vaccinationRate: 76,
      chronicDiseasePrevalence: {
        diabetes: 8.2,
        hypertension: 21.5,
        heartDisease: 6.5,
        cancer: 2.2,
        respiratory: 17.9
      },
      topHealthConcerns: ["Malnutrition", "Anemia", "Tuberculosis", "Vector-borne Diseases"],
      healthInfrastructureScore: 5.2
    },
    "KA": {
      totalPopulation: 67500000,
      healthScore: 7.2,
      lifeExpectancy: 74.2,
      infantMortalityRate: 19,
      maternalMortalityRate: 42,
      doctorPatientRatio: "1:1100",
      hospitalBedsPer1000: 2.2,
      vaccinationRate: 91,
      chronicDiseasePrevalence: {
        diabetes: 11.8,
        hypertension: 27.2,
        heartDisease: 8.1,
        cancer: 3.1,
        respiratory: 13.2
      },
      topHealthConcerns: ["Diabetes", "Mental Health", "Lifestyle Diseases", "Infectious Diseases"],
      healthInfrastructureScore: 7.1
    },
    "GJ": {
      totalPopulation: 70400000,
      healthScore: 7.0,
      lifeExpectancy: 73.5,
      infantMortalityRate: 25,
      maternalMortalityRate: 58,
      doctorPatientRatio: "1:1300",
      hospitalBedsPer1000: 2.0,
      vaccinationRate: 88,
      chronicDiseasePrevalence: {
        diabetes: 10.5,
        hypertension: 25.8,
        heartDisease: 7.6,
        cancer: 2.9,
        respiratory: 14.1
      },
      topHealthConcerns: ["Industrial Pollution", "Diabetes", "Cardiovascular Diseases", "Cancer"],
      healthInfrastructureScore: 6.9
    },
    "AP": {
      totalPopulation: 53900000,
      healthScore: 6.7,
      lifeExpectancy: 72.1,
      infantMortalityRate: 28,
      maternalMortalityRate: 72,
      doctorPatientRatio: "1:1600",
      hospitalBedsPer1000: 1.8,
      vaccinationRate: 86,
      chronicDiseasePrevalence: {
        diabetes: 10.2,
        hypertension: 24.9,
        heartDisease: 7.3,
        cancer: 2.7,
        respiratory: 15.2
      },
      topHealthConcerns: ["Malnutrition", "Anemia", "Respiratory Infections", "Mental Health"],
      healthInfrastructureScore: 6.5
    },
    "OR": {
      totalPopulation: 47000000,
      healthScore: 6.1,
      lifeExpectancy: 70.2,
      infantMortalityRate: 35,
      maternalMortalityRate: 88,
      doctorPatientRatio: "1:1900",
      hospitalBedsPer1000: 1.6,
      vaccinationRate: 80,
      chronicDiseasePrevalence: {
        diabetes: 9.1,
        hypertension: 23.2,
        heartDisease: 6.9,
        cancer: 2.4,
        respiratory: 16.5
      },
      topHealthConcerns: ["Malnutrition", "Tribal Health", "Malarial Diseases", "Anemia"],
      healthInfrastructureScore: 5.9
    },
    "TG": {
      totalPopulation: 39300000,
      healthScore: 7.4,
      lifeExpectancy: 74.8,
      infantMortalityRate: 21,
      maternalMortalityRate: 48,
      doctorPatientRatio: "1:950",
      hospitalBedsPer1000: 2.4,
      vaccinationRate: 93,
      chronicDiseasePrevalence: {
        diabetes: 12.2,
        hypertension: 28.1,
        heartDisease: 8.4,
        cancer: 3.3,
        respiratory: 12.8
      },
      topHealthConcerns: ["Diabetes", "Urban Health Issues", "Mental Health", "Lifestyle Diseases"],
      healthInfrastructureScore: 7.3
    },
    "KL": {
      totalPopulation: 35600000,
      healthScore: 8.2,
      lifeExpectancy: 76.5,
      infantMortalityRate: 12,
      maternalMortalityRate: 28,
      doctorPatientRatio: "1:750",
      hospitalBedsPer1000: 3.1,
      vaccinationRate: 96,
      chronicDiseasePrevalence: {
        diabetes: 14.8,
        hypertension: 31.2,
        heartDisease: 9.8,
        cancer: 4.2,
        respiratory: 10.5
      },
      topHealthConcerns: ["Geriatric Care", "Cancer", "Mental Health", "Lifestyle Diseases"],
      healthInfrastructureScore: 8.5
    },
    "JH": {
      totalPopulation: 39000000,
      healthScore: 5.5,
      lifeExpectancy: 68.2,
      infantMortalityRate: 42,
      maternalMortalityRate: 108,
      doctorPatientRatio: "1:3200",
      hospitalBedsPer1000: 1.1,
      vaccinationRate: 74,
      chronicDiseasePrevalence: {
        diabetes: 7.8,
        hypertension: 20.1,
        heartDisease: 6.2,
        cancer: 2.0,
        respiratory: 19.2
      },
      topHealthConcerns: ["Malnutrition", "Tribal Health", "Respiratory Diseases", "Maternal Mortality"],
      healthInfrastructureScore: 4.8
    },
    "AS": {
      totalPopulation: 35600000,
      healthScore: 6.0,
      lifeExpectancy: 69.8,
      infantMortalityRate: 39,
      maternalMortalityRate: 95,
      doctorPatientRatio: "1:2100",
      hospitalBedsPer1000: 1.7,
      vaccinationRate: 79,
      chronicDiseasePrevalence: {
        diabetes: 8.7,
        hypertension: 22.8,
        heartDisease: 6.8,
        cancer: 2.3,
        respiratory: 17.1
      },
      topHealthConcerns: ["Malnutrition", "Vector-borne Diseases", "Respiratory Issues", "Maternal Health"],
      healthInfrastructureScore: 5.6
    },
    "PB": {
      totalPopulation: 30100000,
      healthScore: 7.5,
      lifeExpectancy: 75.2,
      infantMortalityRate: 18,
      maternalMortalityRate: 41,
      doctorPatientRatio: "1:850",
      hospitalBedsPer1000: 2.6,
      vaccinationRate: 94,
      chronicDiseasePrevalence: {
        diabetes: 13.2,
        hypertension: 29.8,
        heartDisease: 8.9,
        cancer: 3.6,
        respiratory: 11.8
      },
      topHealthConcerns: ["Diabetes", "Cancer", "Mental Health", "Agricultural Health"],
      healthInfrastructureScore: 7.4
    },
    "HR": {
      totalPopulation: 28900000,
      healthScore: 7.3,
      lifeExpectancy: 74.5,
      infantMortalityRate: 20,
      maternalMortalityRate: 45,
      doctorPatientRatio: "1:1000",
      hospitalBedsPer1000: 2.3,
      vaccinationRate: 92,
      chronicDiseasePrevalence: {
        diabetes: 12.1,
        hypertension: 27.8,
        heartDisease: 8.2,
        cancer: 3.2,
        respiratory: 12.9
      },
      topHealthConcerns: ["Diabetes", "Mental Health", "Urban Health", "Lifestyle Diseases"],
      healthInfrastructureScore: 7.2
    },
    "CT": {
      totalPopulation: 29400000,
      healthScore: 5.9,
      lifeExpectancy: 69.2,
      infantMortalityRate: 41,
      maternalMortalityRate: 102,
      doctorPatientRatio: "1:2600",
      hospitalBedsPer1000: 1.4,
      vaccinationRate: 77,
      chronicDiseasePrevalence: {
        diabetes: 8.4,
        hypertension: 21.8,
        heartDisease: 6.6,
        cancer: 2.1,
        respiratory: 18.3
      },
      topHealthConcerns: ["Malnutrition", "Tribal Health", "Malarial Diseases", "Respiratory Issues"],
      healthInfrastructureScore: 5.3
    },
    "JK": {
      totalPopulation: 13600000,
      healthScore: 6.4,
      lifeExpectancy: 71.5,
      infantMortalityRate: 26,
      maternalMortalityRate: 68,
      doctorPatientRatio: "1:1700",
      hospitalBedsPer1000: 1.9,
      vaccinationRate: 84,
      chronicDiseasePrevalence: {
        diabetes: 9.8,
        hypertension: 24.5,
        heartDisease: 7.1,
        cancer: 2.6,
        respiratory: 15.8
      },
      topHealthConcerns: ["Mental Health", "Respiratory Diseases", "Maternal Health", "Conflict-related Trauma"],
      healthInfrastructureScore: 6.1
    }
  },

  // Community Health Trends
  communityHealthTrends: {
    seasonalTrends: [
      {
        season: "Winter",
        period: "December-February",
        commonConditions: ["Respiratory Infections", "Flu", "Common Cold", "Asthma", "Joint Pain"],
        affectedPopulation: "35%",
        trend: "increasing",
        recommendations: ["Flu vaccination", "Warm clothing", "Indoor exercises", "Humidifier use"]
      },
      {
        season: "Summer",
        period: "March-May",
        commonConditions: ["Heat Stroke", "Dehydration", "Food Poisoning", "Skin Infections", "Diarrhea"],
        affectedPopulation: "28%",
        trend: "stable",
        recommendations: ["Hydration", "Light clothing", "Food hygiene", "Sunscreen"]
      },
      {
        season: "Monsoon",
        period: "June-September",
        commonConditions: ["Malaria", "Dengue", "Cholera", "Typhoid", "Leptospirosis"],
        affectedPopulation: "42%",
        trend: "increasing",
        recommendations: ["Mosquito prevention", "Clean water", "Hygiene", "Vaccination"]
      },
      {
        season: "Post-Monsoon",
        period: "October-November",
        commonConditions: ["Viral Fever", "Allergies", "Eye Infections", "Skin Allergies"],
        affectedPopulation: "25%",
        trend: "stable",
        recommendations: ["Hygiene", "Allergy medication", "Eye care", "Clean environment"]
      }
    ],

    ageGroupTrends: [
      {
        ageGroup: "Children (0-14)",
        commonConditions: ["Respiratory infections", "Diarrhea", "Malnutrition", "Vaccination-preventable diseases"],
        trend: "decreasing",
        affectedRate: "18%",
        focusAreas: ["Immunization", "Nutrition", "Hygiene education"]
      },
      {
        ageGroup: "Young Adults (15-29)",
        commonConditions: ["Mental health issues", "Lifestyle diseases", "Reproductive health", "Injuries"],
        trend: "increasing",
        affectedRate: "22%",
        focusAreas: ["Mental health awareness", "Lifestyle counseling", "Safe practices"]
      },
      {
        ageGroup: "Adults (30-59)",
        commonConditions: ["Diabetes", "Hypertension", "Heart disease", "Cancer", "Stress-related conditions"],
        trend: "increasing",
        affectedRate: "45%",
        focusAreas: ["Screening programs", "Lifestyle modification", "Early detection"]
      },
      {
        ageGroup: "Elderly (60+)",
        commonConditions: ["Chronic diseases", "Mobility issues", "Cognitive decline", "Multiple comorbidities"],
        trend: "increasing",
        affectedRate: "65%",
        focusAreas: ["Geriatric care", "Chronic disease management", "Palliative care"]
      }
    ]
  },

  // Disease Outbreak Alerts
  diseaseOutbreaks: [
    {
      id: "DEN-2024-001",
      disease: "Dengue",
      severity: "high",
      affectedAreas: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
      reportedCases: 15420,
      dateReported: "2024-09-15",
      trend: "increasing",
      hotspots: ["North Delhi", "South Mumbai", "Central Bangalore"],
      preventionMeasures: ["Eliminate stagnant water", "Use mosquito repellents", "Wear protective clothing"],
      symptoms: ["High fever", "Severe headache", "Joint pain", "Rash"],
      treatment: "Supportive care, hydration, pain management"
    },
    {
      id: "MAL-2024-002",
      disease: "Malaria",
      severity: "medium",
      affectedAreas: ["Odisha", "Chhattisgarh", "Jharkhand", "Assam"],
      reportedCases: 8930,
      dateReported: "2024-09-10",
      trend: "stable",
      hotspots: ["Sundargarh (Odisha)", "Dantewada (Chhattisgarh)"],
      preventionMeasures: ["Use bed nets", "Indoor spraying", "Antimalarial prophylaxis"],
      symptoms: ["Fever with chills", "Headache", "Nausea", "Fatigue"],
      treatment: "Antimalarial medications based on type"
    },
    {
      id: "TYP-2024-003",
      disease: "Typhoid",
      severity: "medium",
      affectedAreas: ["Uttar Pradesh", "Bihar", "West Bengal"],
      reportedCases: 6740,
      dateReported: "2024-09-08",
      trend: "decreasing",
      hotspots: ["Eastern UP", "Northern Bihar"],
      preventionMeasures: ["Safe water", "Food hygiene", "Vaccination"],
      symptoms: ["Prolonged fever", "Headache", "Abdominal pain", "Weakness"],
      treatment: "Antibiotics, supportive care"
    },
    {
      id: "HEP-2024-004",
      disease: "Hepatitis A",
      severity: "low",
      affectedAreas: ["Kerala", "Tamil Nadu", "Karnataka"],
      reportedCases: 2340,
      dateReported: "2024-09-05",
      trend: "stable",
      hotspots: ["Ernakulam (Kerala)", "Coimbatore (Tamil Nadu)"],
      preventionMeasures: ["Hand hygiene", "Safe food practices", "Vaccination"],
      symptoms: ["Jaundice", "Fatigue", "Nausea", "Abdominal pain"],
      treatment: "Supportive care, rest, nutrition"
    },
    {
      id: "CHK-2024-005",
      disease: "Chikungunya",
      severity: "medium",
      affectedAreas: ["Rajasthan", "Gujarat", "Madhya Pradesh"],
      reportedCases: 5620,
      dateReported: "2024-09-12",
      trend: "increasing",
      hotspots: ["Western Rajasthan", "Northern Gujarat"],
      preventionMeasures: ["Mosquito control", "Protective clothing", "Repellents"],
      symptoms: ["High fever", "Joint pain", "Headache", "Rash"],
      treatment: "Pain management, rest, fluids"
    }
  ],

  // Seasonal Health Recommendations
  seasonalRecommendations: {
    winter: {
      general: [
        "Keep warm and avoid cold exposure",
        "Maintain indoor humidity levels",
        "Get influenza vaccination",
        "Practice indoor exercises",
        "Consume warm, nutritious foods"
      ],
      vulnerableGroups: {
        elderly: ["Extra warmth precautions", "Regular health checkups", "Pneumonia vaccination"],
        children: ["Warm clothing", "Indoor activities", "Nutritious diet"],
        "chronic-patients": ["Medication compliance", "Regular monitoring", "Emergency preparedness"]
      },
      preventiveMeasures: ["Hand hygiene", "Avoid crowded places", "Adequate ventilation"]
    },
    summer: {
      general: [
        "Stay hydrated throughout the day",
        "Avoid direct sun exposure during peak hours",
        "Use sunscreen and protective clothing",
        "Consume light, water-rich foods",
        "Take cool showers regularly"
      ],
      vulnerableGroups: {
        elderly: ["Avoid heat exposure", "Regular fluid intake", "Cool environment"],
        children: ["Plenty of fluids", "Light clothing", "Indoor activities"],
        workers: ["Frequent breaks", "Shade access", "Hydration reminders"]
      },
      preventiveMeasures: ["ORS preparation", "Heat stroke awareness", "Emergency cooling methods"]
    },
    monsoon: {
      general: [
        "Maintain personal and food hygiene",
        "Use mosquito protection measures",
        "Avoid stagnant water accumulation",
        "Consume freshly cooked food",
        "Drink boiled or filtered water"
      ],
      vulnerableGroups: {
        elderly: ["Extra hygiene precautions", "Avoid water logging", "Regular health monitoring"],
        children: ["Hygiene education", "Mosquito protection", "Safe play areas"],
        pregnant: ["Extra care", "Regular checkups", "Mosquito prevention"]
      },
      preventiveMeasures: ["Vector control", "Water sanitation", "Food safety"]
    },
    postMonsoon: {
      general: [
        "Continue hygiene practices",
        "Get vaccinated for seasonal diseases",
        "Maintain clean surroundings",
        "Regular health checkups",
        "Balanced nutrition"
      ],
      vulnerableGroups: {
        elderly: ["Vaccination updates", "Regular monitoring", "Hygiene maintenance"],
        children: ["School hygiene", "Vaccination schedule", "Nutritious diet"],
        general: ["Allergy management", "Eye care", "Skin protection"]
      },
      preventiveMeasures: ["Allergy prevention", "Environmental hygiene", "Vaccination drives"]
    }
  },

  // Health Facilities with Ratings
  healthFacilities: [
    {
      id: "AIIMS-DL",
      name: "All India Institute of Medical Sciences",
      type: "Super Specialty Hospital",
      location: "New Delhi",
      state: "Delhi",
      rating: 4.8,
      totalReviews: 1250,
      specialties: ["Cardiology", "Neurology", "Oncology", "Nephrology", "Gastroenterology"],
      facilities: ["Emergency Care", "ICU", "Cath Lab", "MRI", "CT Scan", "Dialysis"],
      doctors: 450,
      beds: 2200,
      waitingTime: "15-30 mins",
      averageCost: "₹800-1500",
      insuranceAccepted: ["Star Health", "ICICI Lombard", "HDFC Ergo", "Bajaj Allianz"],
      contact: "011-26588500",
      address: "Ansari Nagar, New Delhi-110029"
    },
    {
      id: "APOLLO-MUM",
      name: "Apollo Hospitals",
      type: "Multi-Specialty Hospital",
      location: "Mumbai",
      state: "Maharashtra",
      rating: 4.6,
      totalReviews: 980,
      specialties: ["Cardiology", "Orthopedics", "Oncology", "Neurology"],
      facilities: ["Emergency", "ICU", "Robotic Surgery", "PET Scan"],
      doctors: 320,
      beds: 1500,
      waitingTime: "10-20 mins",
      averageCost: "₹1000-2000",
      insuranceAccepted: ["Star Health", "Apollo Munich", "Max Bupa"],
      contact: "022-33676767",
      address: "Plot No. 13, Parsik Hill Road, Sector 23, CBD Belapur, Navi Mumbai"
    },
    {
      id: "FORTIS-BLR",
      name: "Fortis Hospital",
      type: "Multi-Specialty Hospital",
      location: "Bangalore",
      state: "Karnataka",
      rating: 4.4,
      totalReviews: 756,
      specialties: ["Cardiology", "Orthopedics", "Neurology", "Gastroenterology"],
      facilities: ["Emergency", "ICU", "Cardiac Cath Lab", "MRI"],
      doctors: 280,
      beds: 1200,
      waitingTime: "20-35 mins",
      averageCost: "₹900-1800",
      insuranceAccepted: ["ICICI Lombard", "HDFC Ergo", "Reliance Health"],
      contact: "080-66214444",
      address: "154/9, Bannerghatta Road, Opposite IIM-B, Bangalore"
    },
    {
      id: "MAX-CHE",
      name: "Max Super Speciality Hospital",
      type: "Multi-Specialty Hospital",
      location: "Chennai",
      state: "Tamil Nadu",
      rating: 4.5,
      totalReviews: 892,
      specialties: ["Cardiology", "Oncology", "Orthopedics", "Nephrology"],
      facilities: ["Emergency", "ICU", "Liver Transplant", "Bone Marrow Transplant"],
      doctors: 350,
      beds: 1400,
      waitingTime: "15-25 mins",
      averageCost: "₹800-1600",
      insuranceAccepted: ["Star Health", "Max Bupa", "ICICI Lombard"],
      contact: "044-26223333",
      address: "No. 1, Press Enclave Road, Saket, New Delhi"
    },
    {
      id: "MEDANTA-GGN",
      name: "Medanta - The Medicity",
      type: "Super Specialty Hospital",
      location: "Gurgaon",
      state: "Haryana",
      rating: 4.7,
      totalReviews: 1105,
      specialties: ["Cardiology", "Neurology", "Oncology", "Transplant"],
      facilities: ["Emergency", "ICU", "Robotic Surgery", "CyberKnife"],
      doctors: 400,
      beds: 1800,
      waitingTime: "12-22 mins",
      averageCost: "₹1200-2500",
      insuranceAccepted: ["All major insurers"],
      contact: "0124-4141414",
      address: "CH Baktawar Singh Road, Sector 38, Gurgaon"
    }
  ],

  // Pharmacy Data by City
  pharmacies: [
    {
      id: "PHARM-001",
      name: "Apollo Pharmacy",
      city: "Mumbai",
      state: "Maharashtra",
      rating: 4.3,
      totalReviews: 245,
      address: "Shop No. 5, Ground Floor, Sunshine Building, Linking Road, Bandra West",
      phone: "022-26456789",
      services: ["Home Delivery", "Online Ordering", "Generic Medicines", "Health Checkup"],
      operatingHours: "8:00 AM - 10:00 PM",
      specializations: ["Cardiac Medicines", "Diabetic Care", "Baby Products"],
      averageDeliveryTime: "30-45 mins",
      minimumOrder: "₹100",
      paymentMethods: ["Cash", "Card", "UPI", "Paytm"]
    },
    {
      id: "PHARM-002",
      name: "MedPlus Pharmacy",
      city: "Bangalore",
      state: "Karnataka",
      rating: 4.1,
      totalReviews: 189,
      address: "No. 123, 1st Main Road, Koramangala 4th Block",
      phone: "080-41234567",
      services: ["Home Delivery", "Online Ordering", "Medicine Reminder", "Health Consultation"],
      operatingHours: "7:00 AM - 11:00 PM",
      specializations: ["Ayurvedic Medicines", "Personal Care", "Nutrition Supplements"],
      averageDeliveryTime: "25-40 mins",
      minimumOrder: "₹50",
      paymentMethods: ["Cash", "Card", "UPI", "PhonePe"]
    },
    {
      id: "PHARM-003",
      name: "Wellness Forever",
      city: "Delhi",
      state: "Delhi",
      rating: 4.4,
      totalReviews: 312,
      address: "Shop No. 15, Ground Floor, Connaught Place",
      phone: "011-23456789",
      services: ["Home Delivery", "Online Ordering", "Generic Medicines", "Pathology Collection"],
      operatingHours: "8:00 AM - 9:00 PM",
      specializations: ["Dermatology Products", "Orthopedic Aids", "Health Supplements"],
      averageDeliveryTime: "35-50 mins",
      minimumOrder: "₹200",
      paymentMethods: ["Cash", "Card", "UPI", "All Digital Wallets"]
    },
    {
      id: "PHARM-004",
      name: "Netmeds Pharmacy",
      city: "Chennai",
      state: "Tamil Nadu",
      rating: 4.2,
      totalReviews: 198,
      address: "No. 45, TTK Road, Alwarpet",
      phone: "044-45678901",
      services: ["Home Delivery", "Online Ordering", "Medicine Authentication", "Health Screening"],
      operatingHours: "6:00 AM - 12:00 AM",
      specializations: ["Cardiac Care", "Diabetic Medicines", "Elderly Care Products"],
      averageDeliveryTime: "20-35 mins",
      minimumOrder: "₹150",
      paymentMethods: ["Cash", "Card", "UPI", "Netmeds Wallet"]
    },
    {
      id: "PHARM-005",
      name: "1mg Pharmacy",
      city: "Hyderabad",
      state: "Telangana",
      rating: 4.5,
      totalReviews: 267,
      address: "Plot No. 123, Hi-Tech City, Madhapur",
      phone: "040-56789012",
      services: ["Home Delivery", "Online Ordering", "Medicine Subscription", "Doctor Consultation"],
      operatingHours: "24/7",
      specializations: ["Generic Medicines", "Wellness Products", "Medical Devices"],
      averageDeliveryTime: "15-30 mins",
      minimumOrder: "₹100",
      paymentMethods: ["Cash", "Card", "UPI", "1mg Wallet"]
    }
  ]
};

export default indianHealthData;
