// Health Blog Data - Similar to PharmEasy Blog

// Blog templates for generating articles
const blogTemplates = {
  nutrition: [
    { title: "10 Foods That Can Help Lower Your Blood Pressure Naturally", excerpt: "Discover natural ways to manage hypertension through diet. Learn about foods rich in potassium, magnesium, and other nutrients that support heart health." },
    { title: "Complete Guide to Vitamins and Minerals", excerpt: "Everything you need to know about essential vitamins, minerals, and their role in maintaining optimal health." },
    { title: "Healthy Eating Habits for Weight Management", excerpt: "Evidence-based strategies for maintaining a healthy weight through balanced nutrition and mindful eating." },
    { title: "Superfoods You Should Include in Your Diet", excerpt: "Discover nutrient-dense foods that can boost your health and prevent chronic diseases." },
    { title: "Understanding Macronutrients: Proteins, Carbs, and Fats", excerpt: "Learn about the three main macronutrients and their importance in your daily diet." },
    { title: "Plant-Based Diet: Benefits and Getting Started", excerpt: "Explore the health benefits of plant-based eating and practical tips for transitioning." },
    { title: "Hydration: How Much Water Do You Really Need?", excerpt: "Understanding your body's hydration needs and the importance of drinking enough water." },
    { title: "Foods to Boost Your Immune System", excerpt: "Nutritional strategies to strengthen your immune system naturally through diet." },
    { title: "Meal Planning for Busy Professionals", excerpt: "Time-saving strategies for healthy eating when you have a hectic schedule." },
    { title: "Understanding Food Labels and Nutrition Facts", excerpt: "Learn how to read and interpret nutrition labels to make informed food choices." }
  ],
  wellness: [
    { title: "Boost Your Immunity: 15 Science-Backed Tips", excerpt: "Strengthen your immune system naturally with these evidence-based strategies including nutrition, exercise, sleep, and stress management techniques." },
    { title: "Morning Routines for Better Health", excerpt: "Discover effective morning habits that can transform your health and productivity." },
    { title: "The Importance of Regular Health Checkups", excerpt: "Why preventive healthcare matters and what screenings you should get at every age." },
    { title: "Yoga for Beginners: Complete Guide", excerpt: "Start your yoga journey with this comprehensive guide covering basics, benefits, and beginner poses." },
    { title: "Meditation Techniques for Stress Relief", excerpt: "Learn various meditation practices that can help reduce stress and improve mental clarity." },
    { title: "Building Healthy Habits That Last", excerpt: "Science-based strategies for creating and maintaining positive lifestyle changes." },
    { title: "The Power of Positive Thinking", excerpt: "How optimism and positive mindset can impact your physical and mental health." },
    { title: "Work-Life Balance: Tips for Modern Living", excerpt: "Practical strategies for maintaining balance between professional and personal life." },
    { title: "Digital Detox: Why and How to Unplug", excerpt: "Understanding the importance of taking breaks from technology for mental wellness." },
    { title: "Holistic Health: Mind, Body, and Spirit", excerpt: "Exploring the interconnection between physical, mental, and spiritual well-being." }
  ],
  "mental-health": [
    { title: "Mental Health Matters: Recognizing Signs of Depression and Anxiety", excerpt: "Learn to identify symptoms of common mental health conditions and discover when to seek professional help. Breaking the stigma around mental wellness." },
    { title: "Managing Stress: Techniques for a Calmer Mind", excerpt: "Explore effective stress management techniques including meditation, breathing exercises, and mindfulness practices for better mental health." },
    { title: "Understanding Anxiety Disorders", excerpt: "Comprehensive guide to different types of anxiety disorders, their symptoms, and treatment options." },
    { title: "Coping with Depression: A Practical Guide", excerpt: "Evidence-based strategies and resources for managing depression and seeking help." },
    { title: "The Importance of Mental Health Days", excerpt: "Why taking time off for mental health is crucial and how to use these days effectively." },
    { title: "Mindfulness in Daily Life", excerpt: "Simple mindfulness practices you can incorporate into your everyday routine." },
    { title: "Therapy: Types and How to Choose", excerpt: "Understanding different therapy approaches and finding the right therapist for you." },
    { title: "Supporting Loved Ones with Mental Health Issues", excerpt: "How to help family and friends dealing with mental health challenges." },
    { title: "Workplace Mental Health: Creating a Supportive Environment", excerpt: "Strategies for maintaining mental wellness in professional settings." },
    { title: "Sleep and Mental Health Connection", excerpt: "Understanding the bidirectional relationship between sleep quality and mental well-being." }
  ],
  "chronic-conditions": [
    { title: "Understanding Diabetes: Types, Symptoms, and Management", excerpt: "A comprehensive guide to diabetes mellitus, including type 1, type 2, and gestational diabetes. Learn about symptoms, risk factors, and lifestyle modifications." },
    { title: "Living with Hypertension: Complete Guide", excerpt: "Everything you need to know about high blood pressure, its management, and lifestyle changes." },
    { title: "Asthma Management: Tips and Treatments", excerpt: "Comprehensive guide to managing asthma, recognizing triggers, and using medications effectively." },
    { title: "Arthritis: Types, Symptoms, and Relief", excerpt: "Understanding different types of arthritis and strategies for pain management." },
    { title: "Thyroid Disorders: What You Need to Know", excerpt: "Guide to hypothyroidism, hyperthyroidism, and maintaining thyroid health." },
    { title: "Managing Chronic Pain Naturally", excerpt: "Non-pharmacological approaches to managing persistent pain conditions." },
    { title: "COPD: Understanding and Management", excerpt: "Comprehensive information about chronic obstructive pulmonary disease and living well with it." },
    { title: "Kidney Disease: Prevention and Care", excerpt: "Understanding kidney health, risk factors, and preventive measures." },
    { title: "Migraine Management Strategies", excerpt: "Identifying triggers and effective treatments for chronic migraines." },
    { title: "Autoimmune Diseases: Overview and Support", excerpt: "Understanding autoimmune conditions and strategies for managing symptoms." }
  ],
  "heart-health": [
    { title: "Heart Disease Prevention: Lifestyle Changes That Matter", excerpt: "Learn about cardiovascular health and how simple lifestyle modifications can significantly reduce your risk of heart disease and stroke." },
    { title: "Understanding Cholesterol: Good vs Bad", excerpt: "Learn about different types of cholesterol and how to maintain healthy levels." },
    { title: "Heart-Healthy Diet: What to Eat", excerpt: "Nutritional guidelines for maintaining cardiovascular health and preventing heart disease." },
    { title: "Exercise for Heart Health", excerpt: "Best exercises for strengthening your heart and improving cardiovascular fitness." },
    { title: "Recognizing Heart Attack Symptoms", excerpt: "Critical signs of a heart attack and when to seek emergency care." },
    { title: "Managing High Blood Pressure Naturally", excerpt: "Lifestyle modifications and natural approaches to controlling hypertension." },
    { title: "Heart Health After 50: What Changes", excerpt: "Understanding cardiovascular changes with age and how to maintain heart health." },
    { title: "Stress and Heart Disease Connection", excerpt: "How chronic stress affects your heart and strategies for protection." },
    { title: "Cardiac Rehabilitation: Recovery Guide", excerpt: "What to expect during cardiac rehab and tips for successful recovery." },
    { title: "Women and Heart Disease: Unique Risks", excerpt: "Understanding gender-specific risk factors and symptoms in women." }
  ],
  "womens-health": [
    { title: "Pregnancy Care: Essential Tips for Expecting Mothers", excerpt: "A comprehensive guide to prenatal care, nutrition during pregnancy, and preparing for childbirth. Expert advice for a healthy pregnancy journey." },
    { title: "Menopause: Symptoms and Management", excerpt: "Understanding menopause, its symptoms, and strategies for managing this life transition." },
    { title: "PCOS: Diagnosis and Treatment", excerpt: "Comprehensive guide to polycystic ovary syndrome, its symptoms, and management options." },
    { title: "Breast Health: Self-Examination Guide", excerpt: "How to perform breast self-exams and understanding breast health screening." },
    { title: "Prenatal Vitamins: What You Need", excerpt: "Essential nutrients for pregnancy and choosing the right prenatal supplements." },
    { title: "Postpartum Depression: Recognition and Support", excerpt: "Understanding postpartum mood disorders and seeking help." },
    { title: "Fertility: Understanding Your Options", excerpt: "Guide to fertility awareness, challenges, and available treatments." },
    { title: "Women's Heart Health: Special Considerations", excerpt: "Unique cardiovascular risk factors and prevention strategies for women." },
    { title: "Bone Health for Women", excerpt: "Preventing osteoporosis and maintaining strong bones throughout life." },
    { title: "Hormonal Health: Balance and Wellness", excerpt: "Understanding hormones and maintaining hormonal balance naturally." }
  ],
  fitness: [
    { title: "Fitness After 40: Staying Active and Healthy", excerpt: "Age-appropriate exercise routines and fitness tips for maintaining strength, flexibility, and overall health as you age." },
    { title: "Strength Training for Beginners", excerpt: "Complete guide to starting a strength training program safely and effectively." },
    { title: "Cardio Workouts: Finding What Works", excerpt: "Different types of cardiovascular exercise and choosing the right one for you." },
    { title: "Flexibility and Stretching Guide", excerpt: "Importance of flexibility and effective stretching routines for all fitness levels." },
    { title: "Home Workouts: No Equipment Needed", excerpt: "Effective exercises you can do at home without any special equipment." },
    { title: "Running for Health: Beginner's Guide", excerpt: "How to start running safely and build endurance gradually." },
    { title: "Fitness Myths Debunked", excerpt: "Separating fact from fiction in common fitness beliefs." },
    { title: "Recovery and Rest: Why They Matter", excerpt: "Understanding the importance of rest days and recovery in fitness." },
    { title: "Core Strength: Building a Strong Foundation", excerpt: "Exercises and techniques for developing core stability and strength." },
    { title: "Fitness Goals: Setting and Achieving", excerpt: "How to set realistic fitness goals and stay motivated." }
  ],
  "skin-care": [
    { title: "Skin Care Essentials: Dermatologist-Approved Tips", excerpt: "Get expert advice on maintaining healthy skin, choosing the right products, and addressing common skin concerns from acne to aging." },
    { title: "Understanding Your Skin Type", excerpt: "How to identify your skin type and choose appropriate skincare products." },
    { title: "Anti-Aging Skincare: What Really Works", excerpt: "Evidence-based approaches to preventing and treating signs of aging." },
    { title: "Acne Treatment: Complete Guide", excerpt: "Understanding acne causes and effective treatment options for clear skin." },
    { title: "Sun Protection: More Than Just Sunscreen", excerpt: "Comprehensive guide to protecting your skin from UV damage." },
    { title: "Natural Skincare Remedies", excerpt: "Safe and effective natural ingredients for healthy skin." },
    { title: "Skincare Routine: Morning and Night", excerpt: "Building an effective daily skincare routine for your skin type." },
    { title: "Dealing with Sensitive Skin", excerpt: "Tips for managing sensitive skin and avoiding irritation." },
    { title: "Hydration for Healthy Skin", excerpt: "The role of water and moisturizers in maintaining skin health." },
    { title: "Common Skin Conditions Explained", excerpt: "Understanding eczema, psoriasis, rosacea, and other skin conditions." }
  ],
  allergies: [
    { title: "Understanding Allergies: Causes and Treatment Options", excerpt: "Learn about different types of allergies, their triggers, and effective management strategies including medications and lifestyle changes." },
    { title: "Seasonal Allergies: Prevention and Relief", excerpt: "Managing hay fever and seasonal allergy symptoms effectively." },
    { title: "Food Allergies: Identification and Management", excerpt: "Understanding food allergies, reading labels, and avoiding triggers." },
    { title: "Allergy Testing: What to Expect", excerpt: "Different types of allergy tests and what they can reveal." },
    { title: "Living with Pet Allergies", excerpt: "Strategies for managing pet allergies while keeping your furry friends." },
    { title: "Asthma and Allergies: The Connection", excerpt: "Understanding the relationship between allergies and asthma." },
    { title: "Indoor Allergens: Dust Mites and Mold", excerpt: "Reducing indoor allergens for better respiratory health." },
    { title: "Allergy Medications: Options and Side Effects", excerpt: "Understanding different allergy medications and choosing the right one." },
    { title: "Immunotherapy for Allergies", excerpt: "How allergy shots and sublingual immunotherapy can provide long-term relief." },
    { title: "Emergency Allergy Response: Anaphylaxis", excerpt: "Recognizing severe allergic reactions and using epinephrine." }
  ]
};

// Generate articles programmatically
const generateArticles = () => {
  const articles = [];
  let id = 1;
  const authors = [
    { name: "Dr. Priya Sharma", role: "Nutritionist" },
    { name: "Dr. Rajesh Kumar", role: "Endocrinologist" },
    { name: "Dr. Anjali Mehta", role: "General Physician" },
    { name: "Dr. Vikram Singh", role: "Psychiatrist" },
    { name: "Dr. Sneha Patel", role: "Nutritionist" },
    { name: "Dr. Arjun Reddy", role: "Sleep Specialist" },
    { name: "Dr. Kavita Desai", role: "Gynecologist" },
    { name: "Dr. Amit Verma", role: "Cardiologist" },
    { name: "Dr. Neha Gupta", role: "Psychologist" },
    { name: "Dr. Ritu Sharma", role: "Dermatologist" },
    { name: "Dr. Sanjay Malhotra", role: "Sports Medicine" },
    { name: "Dr. Pooja Iyer", role: "Allergist" },
    { name: "Dr. Rahul Khanna", role: "Orthopedic Surgeon" },
    { name: "Dr. Meera Nair", role: "Pediatrician" },
    { name: "Dr. Anil Kapoor", role: "Gastroenterologist" }
  ];

  const images = [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
    "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80",
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=80",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
  ];

  const categoryMap = {
    nutrition: "Nutrition",
    wellness: "Wellness",
    "mental-health": "Mental Health",
    "chronic-conditions": "Chronic Conditions",
    "heart-health": "Heart Health",
    "womens-health": "Women's Health",
    fitness: "Fitness",
    "skin-care": "Skin Care",
    allergies: "Allergies"
  };

  const tagMap = {
    nutrition: [["Diet", "Nutrition", "Health"], ["Vitamins", "Minerals", "Supplements"], ["Weight Loss", "Healthy Eating", "Wellness"]],
    wellness: [["Wellness", "Health Tips", "Prevention"], ["Immunity", "Lifestyle", "Self-Care"], ["Holistic Health", "Balance", "Mindfulness"]],
    "mental-health": [["Mental Health", "Depression", "Anxiety"], ["Stress", "Meditation", "Mindfulness"], ["Therapy", "Counseling", "Support"]],
    "chronic-conditions": [["Diabetes", "Blood Sugar", "Lifestyle"], ["Chronic Disease", "Management", "Treatment"], ["Health Conditions", "Prevention", "Care"]],
    "heart-health": [["Heart Health", "Cardiovascular", "Prevention"], ["Blood Pressure", "Cholesterol", "Heart Disease"], ["Cardiac Care", "Exercise", "Diet"]],
    "womens-health": [["Women's Health", "Pregnancy", "Prenatal Care"], ["Menopause", "Hormones", "Wellness"], ["Reproductive Health", "Fertility", "Care"]],
    fitness: [["Fitness", "Exercise", "Workout"], ["Strength Training", "Cardio", "Health"], ["Active Lifestyle", "Physical Health", "Training"]],
    "skin-care": [["Skin Care", "Beauty", "Dermatology"], ["Anti-Aging", "Acne", "Treatment"], ["Skincare Routine", "Healthy Skin", "Wellness"]],
    allergies: [["Allergies", "Treatment", "Prevention"], ["Allergy Relief", "Symptoms", "Management"], ["Immunology", "Health", "Wellness"]]
  };

  // Generate 50+ articles per category
  Object.keys(blogTemplates).forEach((category, catIndex) => {
    const templates = blogTemplates[category];
    const articlesPerTemplate = Math.ceil(55 / templates.length);
    
    templates.forEach((template, templateIndex) => {
      for (let i = 0; i < articlesPerTemplate && id <= 500; i++) {
        const author = authors[Math.floor(Math.random() * authors.length)];
        const tagSet = tagMap[category][Math.floor(Math.random() * tagMap[category].length)];
        const daysAgo = Math.floor(Math.random() * 180);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        
        articles.push({
          id: id++,
          title: template.title + (i > 0 ? ` - Part ${i + 1}` : ""),
          excerpt: template.excerpt,
          category: categoryMap[category],
          author: author.name,
          authorRole: author.role,
          readTime: `${Math.floor(Math.random() * 8) + 3} min read`,
          date: date.toISOString().split('T')[0],
          image: images[Math.floor(Math.random() * images.length)],
          tags: tagSet,
          featured: id <= 3
        });
      }
    });
  });

  return articles.slice(0, 500);
};

export const healthBlogs = generateArticles();

export const blogCategories = [
  { id: 'all', name: 'All Articles', icon: '📚' },
  { id: 'nutrition', name: 'Nutrition', icon: '🥗' },
  { id: 'wellness', name: 'Wellness', icon: '🧘' },
  { id: 'mental-health', name: 'Mental Health', icon: '🧠' },
  { id: 'chronic-conditions', name: 'Chronic Conditions', icon: '💊' },
  { id: 'heart-health', name: 'Heart Health', icon: '❤️' },
  { id: 'womens-health', name: "Women's Health", icon: '👩' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
  { id: 'skin-care', name: 'Skin Care', icon: '✨' },
  { id: 'allergies', name: 'Allergies', icon: '🤧' }
];
