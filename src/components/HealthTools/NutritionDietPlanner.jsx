import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAppleAlt, FaUtensils, FaCalculator, FaChartLine, FaLeaf, FaWater, FaClock, FaPlus, FaTrash } from 'react-icons/fa';
import './NutritionDietPlanner.css';

const NutritionDietPlanner = () => {
  const [userProfile, setUserProfile] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintain'
  });

  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  const [selectedFood, setSelectedFood] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  // Load saved data on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('nutritionProfile');
    const savedMeals = localStorage.getItem('nutritionMeals');
    
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading nutrition profile:', error);
      }
    }
    
    if (savedMeals) {
      try {
        setMeals(JSON.parse(savedMeals));
      } catch (error) {
        console.error('Error loading meals:', error);
      }
    }
  }, []);

  // Save profile data whenever it changes
  useEffect(() => {
    if (userProfile.age || userProfile.weight || userProfile.height) {
      localStorage.setItem('nutritionProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  // Save meals data whenever it changes
  useEffect(() => {
    const hasMeals = Object.values(meals).some(mealArray => mealArray.length > 0);
    if (hasMeals) {
      localStorage.setItem('nutritionMeals', JSON.stringify(meals));
    }
  }, [meals]);

  const foodDatabase = {
    'apple': { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
    'banana': { calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
    'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    'salmon': { calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0 },
    'brown rice': { calories: 216, protein: 4.5, carbs: 45, fat: 1.8, fiber: 3.6 },
    'broccoli': { calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.2 },
    'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
    'eggs': { calories: 70, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
    'oatmeal': { calories: 150, protein: 6, carbs: 27, fat: 3, fiber: 4 },
    'yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0 },
    'almonds': { calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5 },
    'sweet potato': { calories: 103, protein: 2, carbs: 24, fat: 0.2, fiber: 3.8 }
  };

  const calculateBMR = () => {
    if (!userProfile.age || !userProfile.weight || !userProfile.height) return 0;
    
    // Mifflin-St Jeor Equation
    const bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
    return Math.round(bmr);
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    return Math.round(bmr * activityMultipliers[userProfile.activityLevel]);
  };

  const calculateGoalCalories = () => {
    const tdee = calculateTDEE();
    const goalAdjustments = {
      lose: 0.8,
      maintain: 1,
      gain: 1.2
    };
    return Math.round(tdee * goalAdjustments[userProfile.goal]);
  };

  const addFoodToMeal = () => {
    if (!selectedFood || !foodDatabase[selectedFood]) return;

    const food = foodDatabase[selectedFood];
    const newFoodItem = {
      name: selectedFood,
      ...food,
      id: Date.now()
    };

    setMeals(prev => ({
      ...prev,
      [selectedMeal]: [...prev[selectedMeal], newFoodItem]
    }));

    setSelectedFood('');
  };

  const removeFoodFromMeal = (mealType, foodId) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(food => food.id !== foodId)
    }));
  };

  const getMealTotals = (mealType) => {
    return meals[mealType].reduce((totals, food) => ({
      calories: totals.calories + food.calories,
      protein: totals.protein + food.protein,
      carbs: totals.carbs + food.carbs,
      fat: totals.fat + food.fat,
      fiber: totals.fiber + food.fiber
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  };

  const getDailyTotals = () => {
    const allMeals = ['breakfast', 'lunch', 'dinner', 'snacks'];
    return allMeals.reduce((totals, mealType) => {
      const mealTotals = getMealTotals(mealType);
      return {
        calories: totals.calories + mealTotals.calories,
        protein: totals.protein + mealTotals.protein,
        carbs: totals.carbs + mealTotals.carbs,
        fat: totals.fat + mealTotals.fat,
        fiber: totals.fiber + mealTotals.fiber
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  };

  const getNutritionAdvice = () => {
    const dailyTotals = getDailyTotals();
    const goalCalories = calculateGoalCalories();
    const advice = [];

    if (dailyTotals.calories < goalCalories * 0.8) {
      advice.push("Consider adding more calories to meet your daily needs");
    } else if (dailyTotals.calories > goalCalories * 1.2) {
      advice.push("You may be consuming more calories than needed for your goal");
    }

    if (dailyTotals.protein < userProfile.weight * 0.8) {
      advice.push("Increase protein intake to support muscle maintenance");
    }

    if (dailyTotals.fiber < 25) {
      advice.push("Add more fiber-rich foods like fruits, vegetables, and whole grains");
    }

    return advice.length > 0 ? advice : ["Great job! Your nutrition is well-balanced"];
  };

  return (
    <motion.div 
      className="nutrition-planner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="planner-header">
        <FaAppleAlt className="header-icon" />
        <h2>Nutrition & Diet Planner</h2>
        <p>Plan your meals, track nutrition, and achieve your health goals</p>
      </div>

      <div className="planner-content">
        {/* User Profile Section */}
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Your Profile</h3>
          <div className="profile-inputs">
            <div className="input-group">
              <label>Age:</label>
              <input
                type="number"
                value={userProfile.age}
                onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value }))}
                placeholder="25"
              />
            </div>
            <div className="input-group">
              <label>Weight (kg):</label>
              <input
                type="number"
                value={userProfile.weight}
                onChange={(e) => setUserProfile(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="70"
              />
            </div>
            <div className="input-group">
              <label>Height (cm):</label>
              <input
                type="number"
                value={userProfile.height}
                onChange={(e) => setUserProfile(prev => ({ ...prev, height: e.target.value }))}
                placeholder="170"
              />
            </div>
            <div className="input-group">
              <label>Activity Level:</label>
              <select
                value={userProfile.activityLevel}
                onChange={(e) => setUserProfile(prev => ({ ...prev, activityLevel: e.target.value }))}
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="veryActive">Extremely Active</option>
              </select>
            </div>
            <div className="input-group">
              <label>Goal:</label>
              <select
                value={userProfile.goal}
                onChange={(e) => setUserProfile(prev => ({ ...prev, goal: e.target.value }))}
              >
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
          </div>

          {/* Calorie Calculations */}
          <div className="calorie-calculations">
            <div className="calc-item">
              <FaCalculator className="calc-icon" />
              <div>
                <span className="calc-label">BMR:</span>
                <span className="calc-value">{calculateBMR()} cal</span>
              </div>
            </div>
            <div className="calc-item">
              <FaChartLine className="calc-icon" />
              <div>
                <span className="calc-label">TDEE:</span>
                <span className="calc-value">{calculateTDEE()} cal</span>
              </div>
            </div>
            <div className="calc-item">
              <FaLeaf className="calc-icon" />
              <div>
                <span className="calc-label">Goal Calories:</span>
                <span className="calc-value">{calculateGoalCalories()} cal</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Meal Planning Section */}
        <motion.div 
          className="meal-planning-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Meal Planning</h3>
          
          <div className="add-food-section">
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="food-select"
            >
              <option value="">Select a food item</option>
              {Object.keys(foodDatabase).map(food => (
                <option key={food} value={food}>{food.charAt(0).toUpperCase() + food.slice(1)}</option>
              ))}
            </select>
            
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="meal-select"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
            
            <motion.button
              className="add-food-btn"
              onClick={addFoodToMeal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> Add Food
            </motion.button>
          </div>

          {/* Meals Display */}
          <div className="meals-container">
            {Object.entries(meals).map(([mealType, foods]) => (
              <div key={mealType} className="meal-type">
                <h4 className="meal-title">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
                {foods.length === 0 ? (
                  <p className="empty-meal">No foods added yet</p>
                ) : (
                  <div className="food-items">
                    {foods.map(food => (
                      <motion.div
                        key={food.id}
                        className="food-item"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="food-info">
                          <span className="food-name">{food.name}</span>
                          <span className="food-calories">{food.calories} cal</span>
                        </div>
                        <div className="food-macros">
                          <span>P: {food.protein}g</span>
                          <span>C: {food.carbs}g</span>
                          <span>F: {food.fat}g</span>
                        </div>
                        <motion.button
                          className="remove-food-btn"
                          onClick={() => removeFoodFromMeal(mealType, food.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {/* Meal Totals */}
                {foods.length > 0 && (
                  <div className="meal-totals">
                    <span>Total: {getMealTotals(mealType).calories} cal</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily Summary */}
        <motion.div 
          className="daily-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Daily Summary</h3>
          <div className="summary-stats">
            {(() => {
              const dailyTotals = getDailyTotals();
              return (
                <>
                  <div className="stat-item">
                    <span className="stat-label">Total Calories</span>
                    <span className="stat-value">{dailyTotals.calories}</span>
                    <span className="stat-target">/ {calculateGoalCalories()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Protein</span>
                    <span className="stat-value">{dailyTotals.protein}g</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Carbs</span>
                    <span className="stat-value">{dailyTotals.carbs}g</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Fat</span>
                    <span className="stat-value">{dailyTotals.fat}g</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Fiber</span>
                    <span className="stat-value">{dailyTotals.fiber}g</span>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Nutrition Advice */}
          <div className="nutrition-advice">
            <h4>Nutrition Advice</h4>
            <div className="advice-items">
              {getNutritionAdvice().map((advice, index) => (
                <motion.div
                  key={index}
                  className="advice-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <FaLeaf className="advice-icon" />
                  <span>{advice}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NutritionDietPlanner;
