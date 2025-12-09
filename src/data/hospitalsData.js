// Comprehensive Hospitals Database with Reviews
export const hospitalsData = [
  // Metro Cities - Delhi
  {
    id: 1,
    name: "All India Institute of Medical Sciences (AIIMS)",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Emergency Medicine"],
    rating: 4.8,
    totalReviews: 15420,
    address: "Ansari Nagar, New Delhi - 110029",
    phone: "+91-11-26588500",
    emergencyServices: true,
    bedCount: 2478,
    established: 1956,
    accreditation: ["NABH", "JCI"],
    reviews: [
      {
        id: 1,
        patientName: "Rajesh Kumar",
        rating: 5,
        comment: "Excellent medical care and world-class facilities. The doctors are highly experienced.",
        date: "2024-08-15",
        department: "Cardiology"
      },
      {
        id: 2,
        patientName: "Priya Sharma",
        rating: 4,
        comment: "Good treatment but long waiting times. Staff is professional and caring.",
        date: "2024-08-10",
        department: "Neurology"
      }
    ]
  },
  {
    id: 2,
    name: "Fortis Hospital",
    city: "New Delhi",
    state: "Delhi",
    type: "Private",
    specialties: ["Cardiac Surgery", "Transplant", "Oncology", "Neurosurgery"],
    rating: 4.6,
    totalReviews: 8950,
    address: "Sector B, Pocket 1, Aruna Asaf Ali Marg, Vasant Kunj, New Delhi - 110070",
    phone: "+91-11-42776222",
    emergencyServices: true,
    bedCount: 262,
    established: 1996,
    accreditation: ["NABH", "JCI"],
    reviews: [
      {
        id: 3,
        patientName: "Amit Singh",
        rating: 5,
        comment: "Outstanding cardiac surgery department. Dr. Trehan's team is exceptional.",
        date: "2024-08-20",
        department: "Cardiac Surgery"
      }
    ]
  },
  {
    id: 3,
    name: "Max Super Speciality Hospital",
    city: "New Delhi",
    state: "Delhi",
    type: "Private",
    specialties: ["Orthopedics", "Gastroenterology", "Pulmonology", "Dermatology"],
    rating: 4.5,
    totalReviews: 7230,
    address: "1, Press Enclave Road, Saket, New Delhi - 110017",
    phone: "+91-11-26515050",
    emergencyServices: true,
    bedCount: 500,
    established: 2006,
    accreditation: ["NABH", "JCI"],
    reviews: [
      {
        id: 4,
        patientName: "Sunita Gupta",
        rating: 4,
        comment: "Clean facilities and good medical care. Billing could be more transparent.",
        date: "2024-08-18",
        department: "Orthopedics"
      }
    ]
  },

  // Mumbai Hospitals
  {
    id: 4,
    name: "Tata Memorial Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Government",
    specialties: ["Oncology", "Radiation Therapy", "Surgical Oncology", "Medical Oncology"],
    rating: 4.7,
    totalReviews: 12340,
    address: "Dr. E Borges Road, Parel, Mumbai - 400012",
    phone: "+91-22-24177000",
    emergencyServices: true,
    bedCount: 629,
    established: 1941,
    accreditation: ["NABH", "ISO"],
    reviews: [
      {
        id: 5,
        patientName: "Meera Patel",
        rating: 5,
        comment: "Best cancer treatment facility in India. Compassionate care and advanced technology.",
        date: "2024-08-22",
        department: "Oncology"
      }
    ]
  },
  {
    id: 5,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Private",
    specialties: ["Neurology", "Cardiology", "Transplant", "Robotic Surgery"],
    rating: 4.6,
    totalReviews: 9870,
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bunglows, Andheri West, Mumbai - 400053",
    phone: "+91-22-42696969",
    emergencyServices: true,
    bedCount: 750,
    established: 2009,
    accreditation: ["NABH", "JCI"],
    reviews: [
      {
        id: 6,
        patientName: "Ravi Mehta",
        rating: 5,
        comment: "State-of-the-art facilities and excellent doctors. Premium healthcare experience.",
        date: "2024-08-19",
        department: "Neurology"
      }
    ]
  },

  // Bangalore Hospitals
  {
    id: 6,
    name: "Narayana Health City",
    city: "Bangalore",
    state: "Karnataka",
    type: "Private",
    specialties: ["Cardiac Surgery", "Neurosurgery", "Oncology", "Transplant"],
    rating: 4.5,
    totalReviews: 11250,
    address: "258/A, Bommasandra Industrial Area, Anekal Taluk, Bangalore - 560099",
    phone: "+91-80-71222222",
    emergencyServices: true,
    bedCount: 1400,
    established: 2000,
    accreditation: ["NABH", "JCI"],
    reviews: [
      {
        id: 7,
        patientName: "Lakshmi Reddy",
        rating: 4,
        comment: "Good cardiac care at reasonable costs. Dr. Shetty's vision of affordable healthcare.",
        date: "2024-08-17",
        department: "Cardiac Surgery"
      }
    ]
  },
  {
    id: 7,
    name: "Manipal Hospital",
    city: "Bangalore",
    state: "Karnataka",
    type: "Private",
    specialties: ["Orthopedics", "Gastroenterology", "Nephrology", "Emergency Medicine"],
    rating: 4.4,
    totalReviews: 8760,
    address: "98, Rustom Bagh, Airport Road, Bangalore - 560017",
    phone: "+91-80-25023344",
    emergencyServices: true,
    bedCount: 650,
    established: 1991,
    accreditation: ["NABH"],
    reviews: [
      {
        id: 8,
        patientName: "Kiran Kumar",
        rating: 4,
        comment: "Professional staff and good treatment. Emergency services are efficient.",
        date: "2024-08-16",
        department: "Emergency Medicine"
      }
    ]
  },

  // Chennai Hospitals
  {
    id: 8,
    name: "Apollo Hospital",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    specialties: ["Cardiology", "Transplant", "Oncology", "Neurology"],
    rating: 4.6,
    totalReviews: 13450,
    address: "21, Greams Lane, Off Greams Road, Chennai - 600006",
    phone: "+91-44-28290200",
    emergencyServices: true,
    bedCount: 550,
    established: 1983,
    accreditation: ["NABH", "JCI"],
    reviews: [
      {
        id: 9,
        patientName: "Venkat Subramanian",
        rating: 5,
        comment: "Pioneer in private healthcare. Excellent doctors and international standards.",
        date: "2024-08-21",
        department: "Cardiology"
      }
    ]
  },
  {
    id: 9,
    name: "Fortis Malar Hospital",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    specialties: ["Cardiac Surgery", "Neurosurgery", "Orthopedics", "Gastroenterology"],
    rating: 4.5,
    totalReviews: 7890,
    address: "52, 1st Main Road, Gandhi Nagar, Adyar, Chennai - 600020",
    phone: "+91-44-42289999",
    emergencyServices: true,
    bedCount: 180,
    established: 1992,
    accreditation: ["NABH"],
    reviews: [
      {
        id: 10,
        patientName: "Deepa Iyer",
        rating: 4,
        comment: "Good medical care and clean facilities. Nursing staff is very caring.",
        date: "2024-08-14",
        department: "Gastroenterology"
      }
    ]
  },

  // Hyderabad Hospitals
  {
    id: 10,
    name: "Yashoda Hospitals",
    city: "Hyderabad",
    state: "Telangana",
    type: "Private",
    specialties: ["Oncology", "Neurology", "Cardiology", "Orthopedics"],
    rating: 4.4,
    totalReviews: 9560,
    address: "Behind Hari Hara Kala Bhavan, S.P. Road, Secunderabad - 500003",
    phone: "+91-40-23770000",
    emergencyServices: true,
    bedCount: 350,
    established: 1989,
    accreditation: ["NABH"],
    reviews: [
      {
        id: 11,
        patientName: "Srinivas Rao",
        rating: 4,
        comment: "Reliable healthcare with experienced doctors. Good value for money.",
        date: "2024-08-13",
        department: "Oncology"
      }
    ]
  },

  // Kolkata Hospitals
  {
    id: 11,
    name: "AMRI Hospital",
    city: "Kolkata",
    state: "West Bengal",
    type: "Private",
    specialties: ["Cardiology", "Neurology", "Oncology", "Emergency Medicine"],
    rating: 4.3,
    totalReviews: 6780,
    address: "P-4 & 5, CIT Scheme LXXII, Near Kankurgachi, Kolkata - 700054",
    phone: "+91-33-66800000",
    emergencyServices: true,
    bedCount: 400,
    established: 1996,
    accreditation: ["NABH"],
    reviews: [
      {
        id: 12,
        patientName: "Anita Banerjee",
        rating: 4,
        comment: "Good medical facilities in East India. Doctors are knowledgeable and helpful.",
        date: "2024-08-12",
        department: "Cardiology"
      }
    ]
  },

  // Pune Hospitals
  {
    id: 12,
    name: "Ruby Hall Clinic",
    city: "Pune",
    state: "Maharashtra",
    type: "Private",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology"],
    rating: 4.4,
    totalReviews: 8920,
    address: "40, Sassoon Road, Pune - 411001",
    phone: "+91-20-26127100",
    emergencyServices: true,
    bedCount: 750,
    established: 1959,
    accreditation: ["NABH", "JCI"],
    reviews: [
      {
        id: 13,
        patientName: "Suresh Patil",
        rating: 4,
        comment: "Heritage hospital with modern facilities. Good reputation in Pune.",
        date: "2024-08-11",
        department: "Orthopedics"
      }
    ]
  },

  // Ahmedabad Hospitals
  {
    id: 13,
    name: "Sterling Hospital",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "Private",
    specialties: ["Cardiology", "Neurology", "Oncology", "Transplant"],
    rating: 4.3,
    totalReviews: 7450,
    address: "Off Gurukul Road, Behind Drive-in Cinema, Memnagar, Ahmedabad - 380052",
    phone: "+91-79-30013000",
    emergencyServices: true,
    bedCount: 400,
    established: 2001,
    accreditation: ["NABH"],
    reviews: [
      {
        id: 14,
        patientName: "Jignesh Shah",
        rating: 4,
        comment: "Modern hospital with good facilities. Staff is professional and courteous.",
        date: "2024-08-10",
        department: "Cardiology"
      }
    ]
  },

  // Jaipur Hospitals
  {
    id: 14,
    name: "Fortis Escorts Hospital",
    city: "Jaipur",
    state: "Rajasthan",
    type: "Private",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Emergency Medicine"],
    rating: 4.2,
    totalReviews: 6890,
    address: "Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur - 302017",
    phone: "+91-141-2547000",
    emergencyServices: true,
    bedCount: 355,
    established: 1994,
    accreditation: ["NABH"],
    reviews: [
      {
        id: 15,
        patientName: "Rajesh Agarwal",
        rating: 4,
        comment: "Good healthcare facility in Rajasthan. Doctors are experienced.",
        date: "2024-08-09",
        department: "Neurology"
      }
    ]
  },

  // Lucknow Hospitals
  {
    id: 15,
    name: "Sahara Hospital",
    city: "Lucknow",
    state: "Uttar Pradesh",
    type: "Private",
    specialties: ["Cardiology", "Orthopedics", "Gastroenterology", "Emergency Medicine"],
    rating: 4.1,
    totalReviews: 5670,
    address: "Viraj Khand, Gomti Nagar, Lucknow - 226010",
    phone: "+91-522-6707000",
    emergencyServices: true,
    bedCount: 200,
    established: 2005,
    accreditation: ["NABH"],
    reviews: [
      {
        id: 16,
        patientName: "Neha Srivastava",
        rating: 4,
        comment: "Clean hospital with good medical care. Staff is helpful and caring.",
        date: "2024-08-08",
        department: "Gastroenterology"
      }
    ]
  }
];

// Generate additional hospitals programmatically
const generateAdditionalHospitals = () => {
  const cities = [
    { name: "Chandigarh", state: "Punjab" },
    { name: "Indore", state: "Madhya Pradesh" },
    { name: "Bhopal", state: "Madhya Pradesh" },
    { name: "Nagpur", state: "Maharashtra" },
    { name: "Surat", state: "Gujarat" },
    { name: "Vadodara", state: "Gujarat" },
    { name: "Kochi", state: "Kerala" },
    { name: "Thiruvananthapuram", state: "Kerala" },
    { name: "Coimbatore", state: "Tamil Nadu" },
    { name: "Madurai", state: "Tamil Nadu" },
    { name: "Visakhapatnam", state: "Andhra Pradesh" },
    { name: "Vijayawada", state: "Andhra Pradesh" },
    { name: "Bhubaneswar", state: "Odisha" },
    { name: "Guwahati", state: "Assam" },
    { name: "Dehradun", state: "Uttarakhand" },
    { name: "Shimla", state: "Himachal Pradesh" },
    { name: "Jammu", state: "Jammu & Kashmir" },
    { name: "Ranchi", state: "Jharkhand" },
    { name: "Patna", state: "Bihar" },
    { name: "Raipur", state: "Chhattisgarh" }
  ];

  const hospitalNames = [
    "City Hospital", "Care Hospital", "Medanta Hospital", "Continental Hospital",
    "Global Hospital", "Sunshine Hospital", "Rainbow Hospital", "Lifeline Hospital",
    "Metro Hospital", "Prime Hospital", "Elite Hospital", "Crown Hospital",
    "Star Hospital", "Unity Hospital", "Apex Hospital", "Zenith Hospital",
    "Paramount Hospital", "Supreme Hospital", "Royal Hospital", "Imperial Hospital",
    "Crystal Hospital", "Diamond Hospital", "Platinum Hospital", "Golden Hospital",
    "Silver Hospital", "Pearl Hospital", "Emerald Hospital", "Sapphire Hospital",
    "Ruby Hospital", "Opal Hospital", "Jade Hospital", "Coral Hospital"
  ];

  const specialties = [
    ["Cardiology", "Neurology", "Orthopedics", "Emergency Medicine"],
    ["Oncology", "Gastroenterology", "Pulmonology", "Dermatology"],
    ["Pediatrics", "Gynecology", "Urology", "ENT"],
    ["Ophthalmology", "Psychiatry", "Nephrology", "Endocrinology"],
    ["General Surgery", "Plastic Surgery", "Anesthesiology", "Radiology"]
  ];

  const patientNames = [
    "Arjun Sharma", "Kavya Nair", "Rohit Gupta", "Sneha Patel", "Vikram Singh",
    "Pooja Agarwal", "Manish Kumar", "Divya Reddy", "Arun Joshi", "Priyanka Mehta",
    "Sanjay Yadav", "Ritu Bansal", "Deepak Verma", "Swati Jain", "Rahul Saxena",
    "Nisha Kapoor", "Ajay Mishra", "Shilpa Rao", "Nitin Pandey", "Ananya Das"
  ];

  const comments = [
    "Excellent medical care and professional staff. Highly recommended.",
    "Good facilities and experienced doctors. Clean and well-maintained hospital.",
    "Professional healthcare services with modern equipment and caring staff.",
    "Reliable medical treatment with reasonable costs. Good patient care.",
    "Clean hospital with good infrastructure. Doctors are knowledgeable.",
    "Efficient emergency services and quality healthcare. Staff is helpful.",
    "Modern facilities with experienced medical professionals. Good experience.",
    "Quality healthcare services with compassionate care. Well-organized hospital.",
    "Good medical treatment and clean environment. Professional approach.",
    "Experienced doctors and modern facilities. Good value for healthcare."
  ];

  const departments = ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology", "Emergency Medicine", "Oncology"];

  const additionalHospitals = [];
  let currentId = 16;

  // Generate hospitals for each city
  cities.forEach((city, cityIndex) => {
    const hospitalsPerCity = Math.floor(Math.random() * 15) + 10; // 10-24 hospitals per city
    
    for (let i = 0; i < hospitalsPerCity && currentId <= 300; i++) {
      const hospital = {
        id: currentId,
        name: hospitalNames[Math.floor(Math.random() * hospitalNames.length)],
        city: city.name,
        state: city.state,
        type: Math.random() > 0.3 ? "Private" : "Government",
        specialties: specialties[Math.floor(Math.random() * specialties.length)],
        rating: parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
        totalReviews: Math.floor(Math.random() * 10000) + 1000,
        address: `${Math.floor(Math.random() * 999) + 1}, Medical District, ${city.name} - ${Math.floor(Math.random() * 900000) + 100000}`,
        phone: `+91-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90000000) + 10000000}`,
        emergencyServices: Math.random() > 0.1,
        bedCount: Math.floor(Math.random() * 800) + 100,
        established: Math.floor(Math.random() * 40) + 1980,
        accreditation: Math.random() > 0.5 ? ["NABH"] : Math.random() > 0.7 ? ["NABH", "JCI"] : ["ISO"],
        reviews: []
      };

      // Generate 1-3 reviews per hospital
      const reviewCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < reviewCount; j++) {
        hospital.reviews.push({
          id: currentId * 10 + j,
          patientName: patientNames[Math.floor(Math.random() * patientNames.length)],
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          comment: comments[Math.floor(Math.random() * comments.length)],
          date: `2024-0${Math.floor(Math.random() * 8) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          department: departments[Math.floor(Math.random() * departments.length)]
        });
      }

      additionalHospitals.push(hospital);
      currentId++;
    }
  });

  return additionalHospitals;
};

// Generate all additional hospitals
const additionalHospitals = generateAdditionalHospitals();

// Combine base hospitals with generated ones
export const allHospitals = [...hospitalsData, ...additionalHospitals];

// Log the total count for verification
console.log(`Total Hospitals: ${allHospitals.length}`);

// Helper functions
export const getHospitalsByCity = (city) => {
  return allHospitals.filter(hospital => 
    hospital.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const getHospitalsBySpecialty = (specialty) => {
  return allHospitals.filter(hospital => 
    hospital.specialties.some(spec => 
      spec.toLowerCase().includes(specialty.toLowerCase())
    )
  );
};

export const getTopRatedHospitals = (limit = 10) => {
  return allHospitals
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const searchHospitals = (query) => {
  const searchTerm = query.toLowerCase();
  return allHospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm) ||
    hospital.city.toLowerCase().includes(searchTerm) ||
    hospital.specialties.some(spec => spec.toLowerCase().includes(searchTerm))
  );
};

export default allHospitals;
