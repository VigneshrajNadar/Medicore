# MediCore - Advanced Healthcare Management System

MediCore is a full-stack digital healthcare ecosystem that integrates doctor consultations, pharmacy services, AI health tools, lab tests, subscriptions, analytics dashboards, and medicine donation systems into a single unified platform.
Built using React.js and Node.js, MediCore aims to bridge healthcare accessibility gaps in India by offering affordable, secure, and technology-driven healthcare services.

![MediCore](https://img.shields.io/badge/MediCore-Healthcare-blue)
![React](https://img.shields.io/badge/React-18.1.0-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)

---

## ✨ Features

### Feature Overview

![Feature Overview](./docs/images/feature_overview_1765276765076.png)



🌟 Key Highlights

10,000+ verified medicines across 12 categories
277+ verified doctors across specializations
AI-powered symptom analysis & health insights
Real-time pharmacist & doctor consultations
Subscription model with 15–20% savings
Donation & request system for unused medicines
Advanced analytics dashboards (User + Admin)

🏥 Doctor Consultation Services

Doctor search by specialization, city, hospital, rating & price
Appointment booking, rescheduling & cancellation
Doctor reviews & ratings

💊 Pharmacy Services

Large medicine catalog (Prescription + OTC)
Prescription upload with OCR verification
Pharmacist real-time chat
Order tracking & delivery status
Medicine authenticity verification

🎁 Medicine Donation & Request

Donate unused medicines
Request medicines if unaffordable
Automatic assignment to nearest collection centers
Donation chain tracking & impact analytics

🧪 Lab & Diagnostic Services

Browse & book lab tests
Home sample collection
Test reports upload & history

📚 Health Awareness

Health blogs & articles
Seasonal health recommendations
Disease outbreak alerts

🤖 AI Symptom Checker 

AI-powered symptom checker that analyzes user-reported symptoms to provide preliminary health insights, 
possible conditions, risk levels, and recommended next steps such as self-care or doctor consultation.


## 🧰 Healthcare Tools Module (15 Tools - Detailed Explanation)

The Healthcare Tools module in MediCore provides users with preventive, analytical, and decision-support health utilities. These tools help users monitor daily health, make informed medical decisions, and maintain long-term wellness without constant hospital visits.

Each tool is independent, data-driven, and integrated with dashboards, consultations, and health history tracking.

---

### 1️⃣ BMI Health Calculator

Purpose:
Calculates Body Mass Index (BMI) using height, weight, age, and gender.

Features:

 BMI classification (Underweight, Normal, Overweight, Obese)
 Health risk indication
 Personalized lifestyle recommendations
 Historical BMI trend tracking

Benefit:
Helps users understand weight-related health risks and maintain a healthy body composition.

---

### 2️⃣ AI Healthcare Assistant

Purpose:
An AI-powered virtual assistant for instant medical guidance.

Features:

 Answers common health queries
 First-level medical guidance
 Medication usage explanations
 Symptom clarification support

Benefit:
Provides 24/7 healthcare assistance and reduces unnecessary doctor visits.

---

### 3️⃣ Nutrition & Diet Planner

Purpose:
Helps users plan balanced meals based on personal health data.

Features:

 BMR (Basal Metabolic Rate) calculation
 Diet plans based on age, weight, and goals
 Macro & calorie tracking
 Food recommendations for medical conditions

Benefit:
Encourages healthy eating habits and personalized nutrition planning.

---

### 4️⃣ Workout & Exercise Guide

Purpose:
Provides fitness routines and exercise guidance.

Features:

 Beginner to advanced workout plans
 Exercise tutorials
 Daily fitness tracking
 Goal-based workout suggestions

Benefit:
Promotes physical activity and supports overall wellness.

---

### 5️⃣ Sleep Quality Analyzer

Purpose:
Analyzes sleep duration and sleep patterns.

Features:

 Sleep duration tracking
 Quality analysis (deep/light sleep)
 Sleep improvement tips
 Trend visualization

Benefit:
Improves sleep hygiene and helps prevent fatigue-related health issues.

---

### 6️⃣ Vital Signs Monitor

Purpose:
Monitors essential body vitals.

Tracks:

 Blood pressure
 Heart rate
 Body temperature
 Oxygen levels (manual input)

Features:

 Abnormal value alerts
 Historical data visualization
 Doctor consultation integration

Benefit:
Early detection of potential health problems.

---

### 7️⃣ Vision Health Checker

Purpose:
Supports basic eye health monitoring.

Features:

 Screen time tracking
 Eye strain assessment
 Vision care recommendations
 Preventive eye health tips

Benefit:
Protects users from digital eye strain and vision-related issues.

---

### 8️⃣ Dental Health Guide

Purpose:
Promotes oral hygiene awareness and dental care.

Features:

 Dental care routines
 Common dental issue guidance
 Oral hygiene reminders
 Dentist visit recommendations

Benefit:
Prevents dental diseases through education and regular care reminders.

---

### 9️⃣ Medication Tracker

Purpose:
Ensures proper medication adherence.

Features:

 Medicine schedule management
 Dosage reminders
 Missed dose alerts
 Medication history logs

Benefit:
Improves treatment effectiveness and prevents missed doses.

---

### 🔟 Hospital Finder & Reviews

Purpose:
Helps users find nearby healthcare facilities.

Features:

 Location-based hospital search
 Hospital ratings & reviews
 Specialty-based filtering
 Appointment booking integration

Benefit:
Enables quick access to trusted medical facilities.

---

### 1️⃣1️⃣ Symptom Checker

Purpose:
AI-powered preliminary symptom analysis tool.

Features:

 Symptom-based health suggestions
 Severity assessment
 Emergency alerts
 Doctor recommendation integration

Benefit:
Helps users decide when medical consultation is necessary.

---

### 1️⃣2️⃣ Alternative Medicines

Purpose:
Suggests safe alternatives for prescribed medicines.

Features:

 Generic medicine suggestions
 Cost-effective alternatives
 Pharmacist verification
 Safety & interaction checks

Benefit:
Reduces medicine costs while maintaining treatment effectiveness.

1️⃣4️⃣ Dosage Calculator 

Purpose: 
Calculates safe medicine dosage based on user data.

Key Features:
Pediatric & adult dosage calculation
Weight and age-based dosing
Overdose prevention alerts
Pharmacist/doctor reference support

User Benefit:

Prevents medication errors and ensures safe drug consumption.
---

1️⃣5️⃣ Side Effect Tracker 

Purpose: Monitors and records medicine side effects experienced by users.

Key Features:
Side effect logging
Severity tracking
Pattern detection
Doctor & pharmacist alert integration

User Benefit:
Improves patient safety and enables timely medical intervention.


🧑‍⚕️ Health Dashboard

Overview of vitals, medications & trends

Personalized health recommendations

Progress visualization with charts


📈 Health History Dashboard

Chronological health records

Trend comparison & analytics

Export & sharing options for doctors


📦 Orders & Subscriptions Dashboard

Medicine & lab order history

Subscription usage, savings & renewals


🎁 Donation Dashboard

Donation/request history

Impact tracking & status updates


🔐 Admin Dashboards

🛠 Admin Dashboard Overview

Platform usage statistics

User, doctor & pharmacist verification

Revenue & order metrics


💊 Pharmacy Order Management

Prescription verification

Order status tracking

Returns & refunds


🧪 Lab Test Management

Report uploads

Patient notifications

Compliance tracking


👥 User Management

Role-based access control

User activity monitoring

Account moderation


📦 Inventory Management

Stock tracking

Expiry alerts

Auto-reorder system


📊 Advanced Analytics & Reports

User engagement analytics

Financial reports

Predictive insights


🎁 Donation Management Panel

Donation verification

Center allocation

Community outreach metrics


## 🛠️ Tech Stack

### Technology Stack Visualization

![Tech Stack](./docs/images/tech_stack_1765276789860.png)

*Modern technology stack with React frontend, Node.js backend, and MongoDB Atlas database*

### Frontend
- **React** 18.1.0 - UI library
- **React Router DOM** 6.3.0 - Routing
- **Styled Components** 5.3.11 - CSS-in-JS styling
- **Framer Motion** 12.23.12 - Animations
- **GSAP** 3.13.0 - Advanced animations
- **Lottie React** 2.4.1 - Lottie animations
- **Axios** 1.7.7 - HTTP client
- **React Icons** 4.12.0 - Icon library
- **jsPDF** 3.0.1 - PDF generation
- **Tesseract.js** 6.0.1 - OCR for prescription reading

### Backend
- **Node.js** - Runtime environment
- **Express** 4.18.2 - Web framework
- **MongoDB Atlas** - Cloud database (via Mongoose 9.1.4)
- **Mongoose** 9.1.4 - MongoDB object modeling
- **bcrypt** 6.0.0 - Password hashing
- **jsonwebtoken** 9.0.3 - JWT authentication
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 17.2.3 - Environment variables

### Authentication
- **Firebase** 9.6.7 - Phone authentication (OTP)
- **LocalStorage** - Client-side user session management

---

## 📁 Project Structure

### System Architecture

![System Architecture](./docs/images/system_architecture_1765276632002.png)

*Three-tier architecture with React frontend, Express backend, and SQLite database*

### Component Hierarchy

![Component Hierarchy](./docs/images/component_hierarchy_1765277102699.png)

*React component tree showing the complete application structure*

### State Management

![State Management](./docs/images/state_management_1765277143469.png)

*UserContext architecture with localStorage persistence and component consumption*

```
sem5-project-main/
├── public/                      # Static files
│   ├── index.html
│   └── assets/
├── server/                      # Backend server
│   ├── index.js                # Express server entry point
│   ├── db-fixed.js            # Database connection and schema
│   ├── apollo.db              # SQLite database file
│   ├── seed.js                # Database seeding script
│   ├── seedUsers.js           # User seeding
│   ├── seedDoctors.js         # Doctor seeding
│   ├── seedAppointments.js    # Appointment seeding
│   ├── seedOrders.js          # Order seeding
│   └── seedReviews.js         # Review seeding
├── src/                        # Frontend source
│   ├── App.js                 # Main app component
│   ├── index.js               # React entry point
│   ├── Authentication/        # Auth components
│   │   ├── Login.jsx          # Phone OTP login
│   │   ├── LoginForm.jsx      # Login form
│   │   ├── Auth.jsx           # Auth wrapper
│   │   └── Details.jsx        # User details form
│   ├── components/            # React components
│   │   ├── Admin/             # Admin dashboard
│   │   │   └── AdminDashboard.jsx
│   │   ├── Auth/              # Authentication
│   │   │   ├── EmailLogin.jsx # Email/password login
│   │   │   └── Signup.jsx     # User registration
│   │   ├── Doctors/           # Doctor features
│   │   │   ├── DoctorList.jsx
│   │   │   ├── DoctorDetail.jsx
│   │   │   ├── AppointmentBooking.jsx
│   │   │   └── DoctorFilters.jsx
│   │   ├── Pharmacy/          # Pharmacy features
│   │   │   ├── MedicineList.jsx
│   │   │   ├── MedicineDetail.jsx
│   │   │   └── Cart.jsx
│   │   ├── Profile/           # User profile
│   │   │   ├── UserProfilePage.jsx
│   │   │   └── ProfileSettings.jsx
│   │   ├── Dashboard/         # User dashboard
│   │   │   └── Dashboard.jsx
│   │   ├── HealthHistory/     # Health records
│   │   │   ├── HealthHistory.jsx
│   │   │   └── VitalsTracking.jsx
│   │   ├── MedicineDonation/  # Donation system
│   │   │   ├── DonateMedicine.jsx
│   │   │   └── RequestMedicine.jsx
│   │   ├── Payment/           # Payment processing
│   │   │   └── PaymentGateway.jsx
│   │   └── Notifications/     # Notifications
│   │       └── NotificationCenter.jsx
│   ├── Core/                  # Core UI components
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── LabTest.jsx
│   │   └── homepage/
│   │       └── Homepage.jsx
│   ├── contexts/              # React contexts
│   │   └── UserContext.jsx    # User state management
│   ├── utils/                 # Utility functions
│   │   ├── userDatabase.js    # LocalStorage user DB
│   │   └── userManager.js     # User management utilities
│   ├── services/              # API services
│   │   └── api.js             # API client
│   ├── data/                  # Static data
│   │   └── Data.json          # App data
│   ├── routes/                # Route definitions
│   │   └── MainRoutes.jsx     # Main routing
│   └── styles/                # Global styles
│       └── global.css
├── package.json               # Dependencies
└── README.md                  # This file
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sem5-project-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database** (Optional - database is pre-seeded)
   ```bash
   cd server
   node db-fixed.js
   node seedUsers.js
   node seedDoctors.js
   node seedAppointments.js
   ```

---

## ▶️ Running the Application

### Development Mode

You need to run both the backend server and frontend application:

**Terminal 1 - Backend Server:**
```bash
npm run server
```
Server will start on `http://localhost:5001`

**Terminal 2 - Frontend Application:**
```bash
npm start
```
Frontend will start on `http://localhost:3000`

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deployment Architecture

![Deployment Architecture](./docs/images/deployment_architecture_1765277189829.png)

*Production deployment options with CDN, load balancer, and database configuration*

---

## 🔐 Authentication

### Authentication Flow

![Authentication Flow](./docs/images/authentication_flow_1765277056544.png)

*Complete authentication flow showing email/password login, phone OTP login, and admin access*

### Admin Login
- **URL**: `http://localhost:3000/login`
- **Email**: `admin@medicore.com`
- **Password**: `admin123`
- **Access**: Admin Dashboard with full management capabilities

### Demo User Accounts
All demo users use password: `password123`

| Name | Email | Role |
|------|-------|------|
| Vignesh Raj | vignesh@example.com | User |
| Priya Sharma | priya@example.com | User |
| Rahul Kumar | rahul@example.com | User |
| Anjali Patel | anjali@example.com | User |
| Suresh Reddy | suresh@example.com | User |

### Authentication Methods
1. **Email/Password Login**: Standard email and password authentication
2. **Phone OTP Login**: Firebase-based phone authentication with OTP
3. **LocalStorage Session**: Client-side session management
4. **Secure Password Hashing**: All passwords are now hashed using **bcrypt**.
   - **Legacy Support**: Accounts with plain-text passwords are automatically migrated to hashed passwords upon their first successful login.

### Deployment
This repository is connected to Vercel for continuous deployment. Pushes to the `main` branch trigger automatic builds and updates to the live application.

## 📡 API Documentation

### API Request/Response Flow

![API Flow](./docs/images/api_flow_1765276739369.png)

*Sequence diagram showing client-server-database interaction for API requests*

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### Doctors

**GET /api/doctors**
- Get all active doctors with optional filters
- Query Parameters:
  - `specialization` - Filter by specialization
  - `city` - Filter by city
  - `hospital` - Filter by hospital name
  - `minRating` - Minimum rating (1-5)
  - `maxPrice` - Maximum consultation fee
  - `availableDay` - Filter by available day
  - `search` - Search by name, specialization, or hospital

**GET /api/doctors/:id**
- Get doctor details by ID
- Includes doctor reviews

**GET /api/doctors/:id/available-slots**
- Get available time slots for a doctor
- Query Parameters:
  - `date` - Date in YYYY-MM-DD format

**GET /api/specializations**
- Get list of all specializations

**GET /api/cities**
- Get list of all cities with doctors

**GET /api/hospitals**
- Get list of all hospitals

#### Appointments

**POST /api/appointments**
- Create a new appointment
- Body:
  ```json
  {
    "user_id": "string",
    "doctor_id": "number",
    "appointment_date": "YYYY-MM-DD",
    "appointment_time": "HH:MM",
    "consultation_type": "in-person|video",
    "symptoms": "string",
    "notes": "string"
  }
  ```

**GET /api/users/:userId/appointments**
- Get all appointments for a user

**PATCH /api/appointments/:id**
- Update appointment status or payment status
- Body:
  ```json
  {
    "appointment_status": "pending|confirmed|completed|cancelled",
    "payment_status": "pending|paid|failed"
  }
  ```

**DELETE /api/appointments/:id**
- Cancel an appointment (soft delete)

#### Reviews

**POST /api/doctors/:id/reviews**
- Add a review for a doctor
- Body:
  ```json
  {
    "user_id": "string",
    "appointment_id": "number",
    "rating": 1-5,
    "review_text": "string"
  }
  ```

#### Users

**GET /api/users**
- Get all users

**POST /api/users**
- Create a new user
- Body:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "password": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "pincode": "string",
    "date_of_birth": "YYYY-MM-DD",
    "gender": "Male|Female|Other",
    "blood_group": "string",
    "emergency_contact": "string",
    "emergency_contact_relation": "string"
  }
  ```

#### Orders

**GET /api/orders**
- Get all orders

**POST /api/orders**
- Create a new order
- Body:
  ```json
  {
    "user_id": "string",
    "total_amount": "number",
    "status": "pending|processing|shipped|delivered",
    "payment_method": "string",
    "shipping_address": "string"
  }
  ```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

![Database Schema](./docs/images/database_schema_1765276658734.png)

*Complete database schema showing all tables and relationships*

### Data Flow Diagram (Level 1)

![Data Flow Diagram](./docs/images/data_flow_diagram_1765277340655.png)

*DFD showing processes, data stores, and external entities with data flows*

### Tables

#### users
- `id` - Primary key
- `name` - User full name
- `email` - Unique email
- `phone` - Phone number
- `password` - Hashed password
- `address`, `city`, `state`, `pincode` - Address details
- `date_of_birth` - Date of birth
- `gender` - Gender
- `blood_group` - Blood group
- `emergency_contact` - Emergency contact number
- `emergency_contact_relation` - Relation
- `created_at` - Timestamp
- `updated_at` - Timestamp

#### doctors
- `id` - Primary key
- `name` - Doctor name
- `specialization` - Medical specialization
- `qualification` - Educational qualifications
- `experience` - Years of experience
- `consultation_fee` - Consultation fee
- `rating` - Average rating (1-5)
- `total_reviews` - Total number of reviews
- `hospital_name` - Hospital name
- `hospital_address` - Hospital address
- `city`, `state` - Location
- `available_days` - Available days (comma-separated)
- `available_time_slots` - Available time slots
- `profile_image` - Profile image URL
- `is_active` - Active status
- `created_at`, `updated_at` - Timestamps

#### appointments
- `id` - Primary key
- `user_id` - Foreign key to users
- `doctor_id` - Foreign key to doctors
- `appointment_date` - Appointment date
- `appointment_time` - Appointment time
- `consultation_type` - in-person or video
- `symptoms` - Patient symptoms
- `notes` - Additional notes
- `appointment_status` - pending, confirmed, completed, cancelled
- `total_amount` - Total amount
- `payment_status` - pending, paid, failed
- `created_at`, `updated_at` - Timestamps

#### doctor_reviews
- `id` - Primary key
- `user_id` - Foreign key to users
- `doctor_id` - Foreign key to doctors
- `appointment_id` - Foreign key to appointments
- `rating` - Rating (1-5)
- `review_text` - Review text
- `review_date` - Review date

#### orders
- `id` - Primary key
- `user_id` - Foreign key to users
- `total_amount` - Total order amount
- `status` - Order status
- `payment_method` - Payment method
- `shipping_address` - Shipping address
- `created_at`, `updated_at` - Timestamps

---

## 🔄 MongoDB Migration

**MediCore has been migrated from SQLite to MongoDB Atlas** for better scalability, cloud compatibility, and production deployment on Vercel.

### Why MongoDB?

- ✅ **Cloud-Native**: Works seamlessly with Vercel serverless deployment
- ✅ **Scalable**: Handles growing user base and data
- ✅ **Persistent**: Data survives across deployments (unlike SQLite on serverless)
- ✅ **Free Tier**: MongoDB Atlas M0 cluster provides 512MB free storage
- ✅ **Better Performance**: Optimized for production workloads

### Migration Details

| Aspect | Before (SQLite) | After (MongoDB) |
|--------|----------------|-----------------|
| **Database** | SQLite3 (file-based) | MongoDB Atlas (cloud) |
| **ORM/ODM** | Raw SQL queries | Mongoose ODM |
| **Deployment** | Not compatible with Vercel | Fully compatible |
| **Data Persistence** | Lost on serverless | Persists across deployments |
| **Schemas** | 6 tables | 5 Mongoose models |

### Models Created

- `User.js` - User accounts with authentication
- `Doctor.js` - Doctor profiles and availability
- `Appointment.js` - Appointment bookings
- `DoctorReview.js` - Doctor ratings and reviews
- `Order.js` - Medicine orders

### Seed Scripts

```bash
# Seed demo users
npm run seed:users

# Seed sample doctors
npm run seed:doctors

# Seed both (recommended for first-time setup)
npm run seed
```

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Configuration (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medicore?retryWrites=true&w=majority

# JWT Secret (Required for authentication)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Server Configuration
PORT=5001
NODE_ENV=development

# Frontend Configuration (Optional)
CI=false
DISABLE_ESLINT_PLUGIN=true

# Firebase Configuration (Optional - for phone auth)
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**: [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. **Create a Cluster**: Choose M0 (Free tier - 512MB)
3. **Create Database User**: Set username and password
4. **Whitelist IP**: Add `0.0.0.0/0` for all IPs or your specific IP
5. **Get Connection String**: Replace `<username>`, `<password>`, and cluster URL in `MONGODB_URI`
6. **Seed Database**:
   ```bash
   npm run seed
   ```

### Vercel Deployment Environment Variables

For Vercel deployment, add these environment variables in your Vercel project settings:

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Random secret key for JWT tokens
- `NODE_ENV` - Set to `production`

See `VERCEL_ENV_SETUP.md` for detailed deployment instructions.

---

## 🎯 Key Features Implementation

### User Journey - Appointment Booking

![User Flow](./docs/images/user_flow_1765276694460.png)

*Step-by-step user flow for booking doctor appointments*

### Medicine Donation & Request System

![Medicine Donation Flow](./docs/images/medicine_donation_flow_1765277244555.png)

*Parallel flows for medicine donation and request processes with center assignment*

### Admin Dashboard Capabilities

![Admin Workflow](./docs/images/admin_dashboard_workflow_1765277287694.png)

*Hub-and-spoke diagram showing all admin management capabilities*

### LocalStorage-Based User Management
The application uses a sophisticated localStorage-based user management system (`userDatabase.js`) that provides:
- User authentication and session management
- Health records storage
- Appointment history
- Order tracking
- Notifications
- User preferences

### Real-Time Appointment Booking
- Check doctor availability in real-time
- Prevent double-booking with slot validation
- Automatic appointment confirmation
- Email/SMS notifications (configurable)

### Health Data Tracking
- Comprehensive vitals monitoring
- Historical health data visualization
- Medication reminders
- Lab result storage
- Vaccination records

### Medicine Donation System
- Donate unused medicines
- Request medicines in need
- Automatic center assignment based on location
- Track donation and request status

---

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

---

## 🎨 UI/UX Features

- **Modern Holographic Design**: Futuristic UI with holographic effects
- **Smooth Animations**: GSAP and Framer Motion animations
- **Interactive Elements**: Hover effects, micro-interactions
- **Dark Mode Support**: (Configurable in user preferences)
- **Accessibility**: ARIA labels, keyboard navigation
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages

---

## 🔧 Development

### Available Scripts

```bash
# Start frontend development server
npm start

# Start backend server
npm run server

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

### Code Structure Best Practices

- **Component-based architecture**: Reusable React components
- **Context API**: Global state management
- **Custom hooks**: Reusable logic
- **Styled components**: Scoped CSS
- **API services**: Centralized API calls
- **Error boundaries**: Graceful error handling

---

## 🐛 Troubleshooting

### Common Issues

**1. Login not working**
- Clear browser localStorage: `localStorage.clear()`
- Use correct credentials (password is `demo123` for users)
- Check if both frontend and backend are running

**2. Database errors**
- Delete `apollo.db` and run seed scripts again
- Check if SQLite3 is properly installed

**3. Port already in use**
- Change port in `server/index.js` (backend)
- Frontend port can be changed in package.json

**4. Firebase authentication errors**
- Check Firebase configuration in `Authentication/firebase.js`
- Ensure Firebase project is set up correctly

---

## 📊 Performance Optimization

- **Code splitting**: React.lazy and Suspense
- **Image optimization**: Lazy loading images
- **Memoization**: React.memo for expensive components
- **Debouncing**: Search and filter operations
- **Caching**: API response caching
- **Bundle optimization**: Tree shaking and minification

---

## 🔒 Security

- **Password hashing**: bcrypt for password security
- **JWT tokens**: Secure authentication tokens
- **Input validation**: Frontend and backend validation
- **SQL injection prevention**: Parameterized queries
- **XSS protection**: React's built-in XSS protection
- **CORS configuration**: Controlled cross-origin requests






