# MediCore - Advanced Healthcare Management System

A comprehensive healthcare management platform built with React and Node.js, featuring doctor appointments, pharmacy services, health tracking, and medicine donation/request systems.

![MediCore](https://img.shields.io/badge/MediCore-Healthcare-blue)
![React](https://img.shields.io/badge/React-18.1.0-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57)

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

*Comprehensive feature set covering healthcare services, pharmacy, health tracking, and more*

### 🏥 Healthcare Services
- **Doctor Appointments**: Browse, filter, and book appointments with doctors
- **Specialization Search**: Find doctors by specialization, city, hospital, rating, and price
- **Video Consultations**: Support for both in-person and video consultations
- **Appointment Management**: View, reschedule, and cancel appointments
- **Doctor Reviews**: Rate and review doctors after consultations

### 💊 Pharmacy Services
- **Medicine Catalog**: Browse and search medicines
- **Shopping Cart**: Add medicines to cart and checkout
- **Order Tracking**: Track medicine orders and delivery status
- **Prescription Upload**: Upload prescriptions for medicine orders

### 🎁 Medicine Donation & Request
- **Donate Medicines**: Donate unused medicines to help others
- **Request Medicines**: Request medicines if you cannot afford them
- **Center Assignment**: Automatic assignment to nearest collection/distribution centers
- **Donation History**: Track your donations and requests

### 📊 Health Management
- **Health Dashboard**: Comprehensive health overview
- **Vitals Tracking**: Monitor heart rate, blood pressure, weight, temperature, blood sugar
- **Health Records**: Store and manage medical records, lab results, vaccinations
- **Medication Tracking**: Keep track of current medications and prescriptions
- **Health History**: View complete health history and trends

### 👤 User Features
- **User Profiles**: Manage personal information and health data
- **Notifications**: Real-time notifications for appointments, orders, and health reminders
- **Favorites**: Save favorite doctors and medicines
- **Order History**: View past orders and reorder easily
- **Emergency Contacts**: Store emergency contact information

### 🔐 Admin Portal
- **Admin Dashboard**: Comprehensive admin panel
- **User Management**: View and manage user accounts
- **Doctor Management**: Add, edit, and manage doctor profiles
- **Order Management**: Process and track medicine orders
- **Analytics**: View platform statistics and insights

---

## 🛠️ Tech Stack

### Technology Stack Visualization

![Tech Stack](./docs/images/tech_stack_1765276789860.png)

*Modern technology stack with React frontend, Node.js backend, and SQLite database*

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
- **SQLite3** 5.1.7 - Database
- **CORS** 2.8.5 - Cross-origin resource sharing
- **bcrypt** 6.0.0 - Password hashing
- **jsonwebtoken** 9.0.2 - JWT authentication

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
All demo users use password: `demo123`

| Name | Email | Phone | Blood Group |
|------|-------|-------|-------------|
| Vignesh Raj | vignesh@example.com | +91 9876543210 | O+ |
| Priya Sharma | priya@example.com | +91 9876543211 | A+ |
| Rajesh Kumar | rajesh@example.com | +91 9876543212 | B+ |

### Authentication Methods
1. **Email/Password Login**: Standard email and password authentication
2. **Phone OTP Login**: Firebase-based phone authentication with OTP
3. **LocalStorage Session**: Client-side session management

---

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

## 🌐 Environment Variables

Create a `.env` file in the root directory (optional):

```env
# Server Configuration
PORT=5001

# Frontend URL
REACT_APP_API_URL=http://localhost:5001

# Firebase Configuration (for phone auth)
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

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

---



---




