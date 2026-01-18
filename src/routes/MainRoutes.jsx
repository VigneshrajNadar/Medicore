
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Details1 } from "../Pharmacy/Details";
import Pharmacy from "../Pharmacy/Pharmacy";
import Navbar from "../Core/components/Navbar"
import Cart from "../Pharmacy/Cart";
import ProductDetails from "../components/Pharmacy/ProductDetails";
import ModernCart from "../components/Cart/ModernCart";
import HomePage from "../Core/homepage/HomePage";
import Login from '../Authentication/Login';
import EmailLogin from '../components/Auth/EmailLogin';
import Signup from '../components/Auth/Signup';
import Details from '../Authentication/Details';
import Auth from '../Authentication/Auth';
import Payment from "../PaymentGateway/Payment"
import Sucess from "../PaymentGateway/Sucess";
import LabTest from '../Core/components/LabTest';
import Healthcare from '../Core/components/Healthcare';
import AdminPanel from '../Core/components/AdminPanel';
import WidgetSystem from '../components/Widgets/WidgetSystem';
import NotificationPreferences from '../components/Notifications/NotificationPreferences';
import FeatureDemo from '../components/FeatureShowcase/FeatureDemo';
import UserProfile from '../components/Profile/UserProfile';
import UserProfilePage from '../components/Profile/UserProfilePage';
import AccountPage from '../components/Account/AccountPage';
import HealthToolsPage from '../components/HealthTools/HealthToolsPage';
import DoctorDirectory from '../components/Doctors/DoctorDirectory';
import AppointmentBooking from '../components/Doctors/AppointmentBooking';
import HealthHistory from '../components/HealthHistory/HealthHistory';
import AdminDashboard from '../components/Admin/AdminDashboard';
import SubscriptionPlans from '../components/Subscription/SubscriptionPlans';
import SubscriptionDashboard from '../components/Subscription/SubscriptionDashboard';
import AnalyticsDashboard from '../components/Subscription/AnalyticsDashboard';

// Enhanced page transition variants with smoother animations
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1
    }
  },
  out: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const pageTransition = {
  type: "tween",
  ease: [0.6, -0.05, 0.01, 0.99],
  duration: 0.6
};

// Advanced Animated Route component with better performance
const AnimatedRoute = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence 
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit={["out", "exit"]}
        variants={pageVariants}
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Auth wrapper for protected routes
function RequireAuth({ children }) {
  const location = useLocation();
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }
  return children;
}

// Admin Auth wrapper
function RequireAdmin({ children }) {
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}

const MainRoutes = () => {
  const location = useLocation();
  
  // Add a small delay to prevent flash of unstyled content
  const [isReady, setIsReady] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [location]);

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--color-bg)'
      }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={
          <AnimatedRoute>
            <EmailLogin />
          </AnimatedRoute>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-login" element={<EmailLogin />} />
        <Route path="/Login" element={
          <AnimatedRoute>
            <EmailLogin />
          </AnimatedRoute>
        } />
        <Route path="/auth" element={
          <AnimatedRoute>
            <Auth />
          </AnimatedRoute>
        } />
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><HomePage /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/pharmacy/*" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><Pharmacy /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/pharmacy/:id" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><Details1 /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/pharmacy/product/:productId" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><ProductDetails /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/cart" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><ModernCart /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/payment" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><Payment /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/sucess" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><Sucess /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/labtest" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><LabTest /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/LabTest" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><LabTest /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/Healthcare" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><Healthcare /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/admin" element={
          <RequireAdmin>
            <AnimatedRoute>
              <AdminPanel />
            </AnimatedRoute>
          </RequireAdmin>
        } />
        <Route path="/dashboard" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><HealthHistory /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/admin-dashboard" element={
          <RequireAdmin>
            <AnimatedRoute>
              <AdminDashboard />
            </AnimatedRoute>
          </RequireAdmin>
        } />
        <Route path="/notifications" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><NotificationPreferences /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/account" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><AccountPage /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/feature-demo" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><FeatureDemo /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/HealthTools" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><HealthToolsPage /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/health-tools" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><HealthToolsPage /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/doctors" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><DoctorDirectory /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/book-appointment/:doctorId" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><AppointmentBooking /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/health-history" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><HealthHistory /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/subscription" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><SubscriptionPlans /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/subscriptions" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><SubscriptionPlans /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/subscription-dashboard" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><SubscriptionDashboard /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
        <Route path="/subscription-analytics" element={
          <RequireAuth>
            <AnimatedRoute>
              <><Navbar /><AnalyticsDashboard /></>
            </AnimatedRoute>
          </RequireAuth>
        } />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
    </AnimatePresence>
  );
}

export default MainRoutes;








// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { Details } from "../Pharmacy/Details";
// import Pharmacy from "../Pharmacy/Pharmacy";
// import Navbar from "./Navbar";
// import Cart from "../Pharmacy/Cart";
// import DoctorsDetails from '../Healthcare/DoctorsData/DoctorsDetails'
// import DoctorSpecialities from "../Healthcare/DoctorsData/DoctorSpecialities"

// import VideoConsult from '../Healthcare/DoctorsData/VideoConsult'


// const Mainroutes = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="pharmacy/*" element={<Pharmacy></Pharmacy>} />
//         <Route path="pharmacy/:id" element={<Details />} />
//         <Route path="/cart" element={<Cart />}></Route>


//             <Route path="/*" element={<DoctorSpecialities/>} />
//             <Route path="DoctorSpecialities/:id" element={<DoctorsDetails></DoctorsDetails>} />
//             <Route path='videoConsult' element={<VideoConsult></VideoConsult>} />
    
//       </Routes>
//     </div>
//   );
// };

// export default Mainroutes;
