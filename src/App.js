

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainRoutes from "./routes/MainRoutes";
import { UserProvider } from "./contexts/UserContext";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Ultra Advanced 3D animation variants
  const particleVariants = {
    animate: {
      y: [0, -60, 30, -20, 0],
      x: [0, 25, -15, 10, 0],
      z: [0, 50, -30, 20, 0],
      rotateX: [0, 180, 360, 180, 0],
      rotateY: [0, 270, 180, 90, 0],
      rotateZ: [0, 90, 180, 270, 360],
      opacity: [0.2, 1, 0.5, 0.8, 0.2],
      scale: [0.5, 1.5, 0.7, 1.2, 0.5],
      filter: [
        "blur(0px) brightness(1) saturate(1)",
        "blur(1px) brightness(1.3) saturate(1.5)",
        "blur(0.5px) brightness(0.8) saturate(0.8)",
        "blur(1.5px) brightness(1.1) saturate(1.2)",
        "blur(0px) brightness(1) saturate(1)"
      ],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    }
  };

  const morphingShapeVariants = {
    animate: {
      borderRadius: ["50%", "15%", "85%", "25%", "65%", "50%"],
      rotate: [0, 90, 180, 270, 360, 450],
      rotateX: [0, 60, -30, 45, -60, 0],
      rotateY: [0, -45, 90, -60, 30, 0],
      rotateZ: [0, 30, -45, 60, -30, 0],
      scale: [1, 1.6, 0.6, 1.3, 0.8, 1],
      background: [
        "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(225deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(315deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(405deg, #ff6b6b 0%, #feca57 100%)",
        "linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
      ],
      boxShadow: [
        "0 30px 60px rgba(102, 126, 234, 0.4), inset 0 0 30px rgba(255,255,255,0.1)",
        "0 40px 80px rgba(245, 87, 108, 0.5), inset 0 0 40px rgba(255,255,255,0.15)",
        "0 50px 100px rgba(79, 172, 254, 0.4), inset 0 0 35px rgba(255,255,255,0.12)",
        "0 35px 70px rgba(67, 233, 123, 0.5), inset 0 0 45px rgba(255,255,255,0.18)",
        "0 45px 90px rgba(255, 107, 107, 0.4), inset 0 0 50px rgba(255,255,255,0.2)",
        "0 30px 60px rgba(102, 126, 234, 0.4), inset 0 0 30px rgba(255,255,255,0.1)"
      ],
      filter: [
        "blur(0px) brightness(1) contrast(1)",
        "blur(0.5px) brightness(1.2) contrast(1.1)",
        "blur(1px) brightness(0.9) contrast(1.2)",
        "blur(0.3px) brightness(1.1) contrast(0.9)",
        "blur(0.8px) brightness(1.3) contrast(1.3)",
        "blur(0px) brightness(1) contrast(1)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingElementsVariants = {
    animate: {
      y: [0, -50, 30, 0],
      x: [0, 25, -15, 0],
      rotate: [0, 15, -10, 0],
      rotateX: [0, 20, -15, 0],
      rotateY: [0, -25, 10, 0],
      scale: [1, 1.3, 0.9, 1],
      filter: [
        "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3))",
        "drop-shadow(0 15px 30px rgba(139, 92, 246, 0.4))",
        "drop-shadow(0 20px 40px rgba(16, 185, 129, 0.3))",
        "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3))"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    animate: {
      rotateY: [0, 180, 360, 540, 720],
      rotateX: [0, 90, 180, 270, 360],
      rotateZ: [0, 45, 90, 135, 180],
      scale: [1, 1.5, 0.8, 1.3, 0.9, 1],
      textShadow: [
        "0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(59, 130, 246, 0.4)",
        "0 0 40px rgba(139, 92, 246, 1), 0 0 80px rgba(139, 92, 246, 0.5)",
        "0 0 35px rgba(16, 185, 129, 0.8), 0 0 70px rgba(16, 185, 129, 0.3)",
        "0 0 45px rgba(245, 101, 101, 0.9), 0 0 90px rgba(245, 101, 101, 0.4)",
        "0 0 50px rgba(251, 191, 36, 1), 0 0 100px rgba(251, 191, 36, 0.5)",
        "0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(59, 130, 246, 0.4)"
      ],
      filter: [
        "blur(0px) brightness(1) saturate(1) hue-rotate(0deg)",
        "blur(0.5px) brightness(1.3) saturate(1.4) hue-rotate(30deg)",
        "blur(1px) brightness(0.9) saturate(1.2) hue-rotate(60deg)",
        "blur(0.3px) brightness(1.2) saturate(1.6) hue-rotate(90deg)",
        "blur(0.8px) brightness(1.1) saturate(1.3) hue-rotate(120deg)",
        "blur(0px) brightness(1) saturate(1) hue-rotate(0deg)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      borderWidth: ["3px", "6px", "3px"],
      transition: {
        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        borderWidth: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="app-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Advanced 3D Background Particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  background: `linear-gradient(${Math.random() * 360}deg, 
                    hsl(${Math.random() * 360}, 70%, 60%) 0%, 
                    hsl(${Math.random() * 360}, 80%, 70%) 100%)`,
                  borderRadius: '50%',
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 20 + 10}px`,
                  filter: 'blur(0.5px)',
                  zIndex: Math.floor(Math.random() * 10)
                }}
                variants={particleVariants}
                animate="animate"
              />
            ))}


            {/* Floating Elements */}
            <motion.div
              className="floating-element floating-element-1"
              variants={floatingElementsVariants}
              animate="animate"
              initial={{ y: 50, opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              🩺
            </motion.div>
            <motion.div
              className="floating-element floating-element-2"
              variants={floatingElementsVariants}
              animate="animate"
            >
              💊
            </motion.div>
            <motion.div
              className="floating-element floating-element-3"
              variants={floatingElementsVariants}
              animate="animate"
            >
              🏥
            </motion.div>

            <motion.div
              className="loading-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              
              <motion.h1
                className="loading-title"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  M
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  e
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  d
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                >
                  i
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                >
                  c
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                >
                  o
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.3 }}
                >
                  r
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                >
                  e
                </motion.span>
              </motion.h1>
              
              <motion.p
                className="loading-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                Your Health, Our Priority
              </motion.p>
              

              {/* Enhanced 3D Progress Bar */}
              <motion.div
                className="progress-bar"
                initial={{ width: 0, rotateX: -45 }}
                animate={{ 
                  width: "100%", 
                  rotateX: [0, 10, -5, 0],
                  boxShadow: [
                    "0 10px 30px rgba(100, 181, 246, 0.6)",
                    "0 15px 40px rgba(139, 92, 246, 0.7)",
                    "0 20px 50px rgba(16, 185, 129, 0.6)",
                    "0 10px 30px rgba(100, 181, 246, 0.6)"
                  ]
                }}
                transition={{ 
                  width: { duration: 3, ease: "easeInOut" },
                  rotateX: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="app-main"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <UserProvider>
              <MainRoutes />
            </UserProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
