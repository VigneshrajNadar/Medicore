import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaPlay, FaPause, FaStop, FaClock, FaFire, FaHeart, FaChartLine, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import './WorkoutExerciseGuide.css';

const WorkoutExerciseGuide = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [userStats, setUserStats] = useState({
    totalWorkouts: 0,
    totalTime: 0,
    favoriteWorkout: 'Full Body'
  });
  const [customWorkouts, setCustomWorkouts] = useState([]);
  const [showCustomWorkoutForm, setShowCustomWorkoutForm] = useState(false);
  const [newCustomWorkout, setNewCustomWorkout] = useState({
    name: '',
    difficulty: 'Beginner',
    exercises: [],
    category: 'Strength'
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    const savedStats = localStorage.getItem('userWorkoutStats');
    const savedCustomWorkouts = localStorage.getItem('customWorkouts');
    
    if (savedHistory) {
      try {
        setWorkoutHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading workout history:', error);
      }
    }
    
    if (savedStats) {
      try {
        setUserStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading user stats:', error);
      }
    }
    
    if (savedCustomWorkouts) {
      try {
        setCustomWorkouts(JSON.parse(savedCustomWorkouts));
      } catch (error) {
        console.error('Error loading custom workouts:', error);
      }
    }
  }, []);

  // Save workout history whenever it changes
  useEffect(() => {
    if (workoutHistory.length > 0) {
      localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    }
  }, [workoutHistory]);

  // Save user stats whenever they change
  useEffect(() => {
    localStorage.setItem('userWorkoutStats', JSON.stringify(userStats));
  }, [userStats]);

  // Save custom workouts whenever they change
  useEffect(() => {
    if (customWorkouts.length > 0) {
      localStorage.setItem('customWorkouts', JSON.stringify(customWorkouts));
    }
  }, [customWorkouts]);

  const exerciseLibrary = {
    'Push-ups': {
      category: 'Strength',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      difficulty: 'Beginner',
      instructions: 'Start in plank position, lower body until chest nearly touches ground, push back up',
      sets: 3,
      reps: 10,
      restTime: 60,
      calories: 8
    },
    'Squats': {
      category: 'Strength',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      difficulty: 'Beginner',
      instructions: 'Stand with feet shoulder-width apart, lower hips back and down, return to standing',
      sets: 3,
      reps: 15,
      restTime: 60,
      calories: 10
    },
    'Plank': {
      category: 'Core',
      muscleGroups: ['Abs', 'Lower Back', 'Shoulders'],
      difficulty: 'Beginner',
      instructions: 'Hold body in straight line from head to heels, engage core muscles',
      sets: 3,
      duration: 30,
      restTime: 45,
      calories: 5
    },
    'Burpees': {
      category: 'Cardio',
      muscleGroups: ['Full Body'],
      difficulty: 'Intermediate',
      instructions: 'Squat down, jump back to plank, do push-up, jump forward, jump up',
      sets: 3,
      reps: 8,
      restTime: 90,
      calories: 15
    },
    'Lunges': {
      category: 'Strength',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      difficulty: 'Beginner',
      instructions: 'Step forward with one leg, lower hips until both knees are bent at 90 degrees',
      sets: 3,
      reps: 12,
      restTime: 60,
      calories: 8
    },
    'Mountain Climbers': {
      category: 'Cardio',
      muscleGroups: ['Core', 'Shoulders', 'Cardiovascular'],
      difficulty: 'Intermediate',
      instructions: 'Start in plank position, alternate bringing knees toward chest rapidly',
      sets: 3,
      duration: 45,
      restTime: 60,
      calories: 12
    },
    'Jumping Jacks': {
      category: 'Cardio',
      muscleGroups: ['Full Body', 'Cardiovascular'],
      difficulty: 'Beginner',
      instructions: 'Jump while spreading legs and raising arms overhead, return to starting position',
      sets: 3,
      reps: 20,
      restTime: 45,
      calories: 10
    },
    'High Knees': {
      category: 'Cardio',
      muscleGroups: ['Legs', 'Core', 'Cardiovascular'],
      difficulty: 'Beginner',
      instructions: 'Run in place while lifting knees as high as possible',
      sets: 3,
      duration: 30,
      restTime: 45,
      calories: 8
    },
    'Diamond Push-ups': {
      category: 'Strength',
      muscleGroups: ['Triceps', 'Chest', 'Shoulders'],
      difficulty: 'Advanced',
      instructions: 'Push-ups with hands forming diamond shape, targets triceps more',
      sets: 3,
      reps: 8,
      restTime: 75,
      calories: 10
    },
    'Tricep Dips': {
      category: 'Strength',
      muscleGroups: ['Triceps', 'Shoulders'],
      difficulty: 'Intermediate',
      instructions: 'Using chair or bench, lower body by bending arms, push back up',
      sets: 3,
      reps: 12,
      restTime: 60,
      calories: 8
    },
    'Pike Push-ups': {
      category: 'Strength',
      muscleGroups: ['Shoulders', 'Triceps', 'Core'],
      difficulty: 'Intermediate',
      instructions: 'In downward dog position, lower head toward ground, push back up',
      sets: 3,
      reps: 10,
      restTime: 60,
      calories: 9
    },
    'Wall Sits': {
      category: 'Strength',
      muscleGroups: ['Quadriceps', 'Glutes'],
      difficulty: 'Beginner',
      instructions: 'Sit against wall with thighs parallel to ground, hold position',
      sets: 3,
      duration: 45,
      restTime: 60,
      calories: 6
    },
    'Calf Raises': {
      category: 'Strength',
      muscleGroups: ['Calves'],
      difficulty: 'Beginner',
      instructions: 'Rise up on toes, lower slowly, repeat',
      sets: 3,
      reps: 20,
      restTime: 45,
      calories: 5
    },
    'Crunches': {
      category: 'Core',
      muscleGroups: ['Abs'],
      difficulty: 'Beginner',
      instructions: 'Lie on back, lift shoulders off ground using abs',
      sets: 3,
      reps: 20,
      restTime: 45,
      calories: 6
    },
    'Russian Twists': {
      category: 'Core',
      muscleGroups: ['Abs', 'Obliques'],
      difficulty: 'Intermediate',
      instructions: 'Sit with knees bent, lean back, rotate torso side to side',
      sets: 3,
      reps: 30,
      restTime: 45,
      calories: 8
    },
    'Leg Raises': {
      category: 'Core',
      muscleGroups: ['Lower Abs', 'Hip Flexors'],
      difficulty: 'Intermediate',
      instructions: 'Lie on back, lift straight legs up and down without touching ground',
      sets: 3,
      reps: 15,
      restTime: 60,
      calories: 7
    }
  };

  const workoutPlans = {
    'Full Body': {
      description: 'Complete full body workout targeting all major muscle groups',
      difficulty: 'Intermediate',
      estimatedTime: 45,
      exercises: ['Push-ups', 'Squats', 'Plank', 'Lunges', 'Burpees'],
      category: 'Strength'
    },
    'Cardio Blast': {
      description: 'High-intensity cardio workout to boost heart rate and burn calories',
      difficulty: 'Advanced',
      estimatedTime: 30,
      exercises: ['Burpees', 'Mountain Climbers', 'Jumping Jacks', 'High Knees'],
      category: 'Cardio'
    },
    'Core Focus': {
      description: 'Targeted core workout for strong abs and back',
      difficulty: 'Beginner',
      estimatedTime: 25,
      exercises: ['Plank', 'Crunches', 'Russian Twists', 'Leg Raises'],
      category: 'Core'
    },
    'Upper Body': {
      description: 'Focus on chest, arms, and shoulders',
      difficulty: 'Intermediate',
      estimatedTime: 35,
      exercises: ['Push-ups', 'Diamond Push-ups', 'Tricep Dips', 'Pike Push-ups'],
      category: 'Strength'
    },
    'Lower Body': {
      description: 'Build strong legs and glutes',
      difficulty: 'Intermediate',
      estimatedTime: 30,
      exercises: ['Squats', 'Lunges', 'Wall Sits', 'Calf Raises'],
      category: 'Strength'
    }
  };

  const startWorkout = (workoutName) => {
    setSelectedWorkout(workoutPlans[workoutName]);
    setIsWorkoutActive(true);
    setCurrentExerciseIndex(0);
    setWorkoutTimer(0);
  };

  const pauseWorkout = () => {
    setIsWorkoutActive(false);
  };

  const resumeWorkout = () => {
    setIsWorkoutActive(true);
  };

  const stopWorkout = () => {
    if (selectedWorkout) {
      const workoutSession = {
        name: selectedWorkout.name || 'Custom Workout',
        duration: workoutTimer,
        date: new Date().toISOString(),
        exercises: selectedWorkout.exercises
      };
      setWorkoutHistory(prev => [...prev, workoutSession]);
      setUserStats(prev => ({
        ...prev,
        totalWorkouts: prev.totalWorkouts + 1,
        totalTime: prev.totalTime + workoutTimer
      }));
    }
    setIsWorkoutActive(false);
    setSelectedWorkout(null);
    setCurrentExerciseIndex(0);
    setWorkoutTimer(0);
  };

  const nextExercise = () => {
    if (selectedWorkout && currentExerciseIndex < selectedWorkout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  const getCurrentExercise = () => {
    if (!selectedWorkout) return null;
    const exerciseName = selectedWorkout.exercises[currentExerciseIndex];
    return exerciseLibrary[exerciseName];
  };

  const getWorkoutProgress = () => {
    if (!selectedWorkout) return 0;
    return ((currentExerciseIndex + 1) / selectedWorkout.exercises.length) * 100;
  };

  // Timer effect would be implemented with useEffect in a real app
  React.useEffect(() => {
    let interval;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const createCustomWorkout = () => {
    if (!newCustomWorkout.name || newCustomWorkout.exercises.length === 0) return;

    const customWorkout = {
      ...newCustomWorkout,
      id: Date.now(),
      estimatedTime: calculateEstimatedTime(newCustomWorkout.exercises),
      isCustom: true
    };

    setCustomWorkouts(prev => [...prev, customWorkout]);
    setNewCustomWorkout({
      name: '',
      description: '',
      difficulty: 'Beginner',
      exercises: [],
      category: 'Strength'
    });
    setShowCustomWorkoutForm(false);
  };

  const calculateEstimatedTime = (exercises) => {
    let totalTime = 0;
    exercises.forEach(exerciseName => {
      const exercise = exerciseLibrary[exerciseName];
      if (exercise) {
        const exerciseTime = exercise.duration ? exercise.duration : (exercise.reps * 2); // 2 seconds per rep
        totalTime += (exerciseTime * exercise.sets) + (exercise.restTime * (exercise.sets - 1));
      }
    });
    return Math.round(totalTime / 60); // Convert to minutes
  };

  const toggleExerciseInCustomWorkout = (exerciseName) => {
    setNewCustomWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.includes(exerciseName)
        ? prev.exercises.filter(e => e !== exerciseName)
        : [...prev.exercises, exerciseName]
    }));
  };

  const removeCustomWorkout = (id) => {
    setCustomWorkouts(prev => prev.filter(workout => workout.id !== id));
  };

  const getAllWorkouts = () => {
    const defaultWorkouts = Object.entries(workoutPlans).map(([name, plan]) => ({
      name,
      ...plan,
      isCustom: false
    }));
    return [...defaultWorkouts, ...customWorkouts];
  };

  return (
    <motion.div 
      className="workout-guide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="guide-header">
        <FaDumbbell className="header-icon" />
        <h2>Workout & Exercise Guide</h2>
        <p>Choose your workout plan, track progress, and achieve your fitness goals</p>
      </div>

      <div className="guide-content">
        {/* Workout Plans */}
        <motion.div 
          className="workout-plans-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header">
            <h3>Available Workout Plans</h3>
            <motion.button
              className="create-workout-btn"
              onClick={() => setShowCustomWorkoutForm(!showCustomWorkoutForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> {showCustomWorkoutForm ? 'Cancel' : 'Create Custom Workout'}
            </motion.button>
          </div>

          {/* Custom Workout Form */}
          {showCustomWorkoutForm && (
            <motion.div 
              className="custom-workout-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Workout Name:</label>
                  <input
                    type="text"
                    value={newCustomWorkout.name}
                    onChange={(e) => setNewCustomWorkout(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Custom Workout"
                  />
                </div>
                <div className="form-group">
                  <label>Difficulty:</label>
                  <select
                    value={newCustomWorkout.difficulty}
                    onChange={(e) => setNewCustomWorkout(prev => ({ ...prev, difficulty: e.target.value }))}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={newCustomWorkout.category}
                    onChange={(e) => setNewCustomWorkout(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Core">Core</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Description:</label>
                  <textarea
                    value={newCustomWorkout.description}
                    onChange={(e) => setNewCustomWorkout(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your custom workout..."
                    rows="2"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Select Exercises ({newCustomWorkout.exercises.length} selected):</label>
                  <div className="exercise-selection-grid">
                    {Object.entries(exerciseLibrary).map(([name, exercise]) => (
                      <motion.div
                        key={name}
                        className={`exercise-select-card ${newCustomWorkout.exercises.includes(name) ? 'selected' : ''}`}
                        onClick={() => toggleExerciseInCustomWorkout(name)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Object.keys(exerciseLibrary).indexOf(name) * 0.05 }}
                      >
                        <div className="exercise-card-header">
                          <FaDumbbell className="exercise-icon" />
                          <div className="exercise-info">
                            <h4 className="exercise-name">{name}</h4>
                            <span className={`difficulty-badge ${exercise.difficulty.toLowerCase()}`}>
                              {exercise.difficulty}
                            </span>
                          </div>
                          {newCustomWorkout.exercises.includes(name) && (
                            <FaCheck className="selected-icon" />
                          )}
                        </div>
                        <div className="exercise-meta">
                          <span className="category">{exercise.category}</span>
                          <span className="muscles">{exercise.muscleGroups.slice(0, 2).join(', ')}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.button
                className="create-btn"
                onClick={createCustomWorkout}
                disabled={!newCustomWorkout.name || newCustomWorkout.exercises.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus /> Create Workout
              </motion.button>
            </motion.div>
          )}

          <div className="workout-grid">
            {getAllWorkouts().map((workout) => (
              <motion.div
                key={workout.isCustom ? workout.id : workout.name}
                className={`workout-card ${workout.isCustom ? 'custom' : ''}`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startWorkout(workout.isCustom ? workout.id : workout.name)}
              >
                <div className="workout-header">
                  <h4>{workout.name}</h4>
                  <div className="workout-badges">
                    <span className={`difficulty ${workout.difficulty.toLowerCase()}`}>
                      {workout.difficulty}
                    </span>
                    {workout.isCustom && <span className="custom-badge">Custom</span>}
                  </div>
                </div>
                <p className="workout-description">{workout.description}</p>
                <div className="workout-meta">
                  <span className="meta-item">
                    <FaClock /> {workout.estimatedTime} min
                  </span>
                  <span className="meta-item">
                    <FaFire /> {workout.category}
                  </span>
                  <span className="meta-item">
                    <FaDumbbell /> {workout.exercises.length} exercises
                  </span>
                </div>
                <div className="workout-actions">
                  <motion.button
                    className="start-workout-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Workout
                  </motion.button>
                  {workout.isCustom && (
                    <motion.button
                      className="delete-workout-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomWorkout(workout.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Workout */}
        {selectedWorkout && (
          <motion.div 
            className="active-workout-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="workout-header">
              <h3>{selectedWorkout.name || 'Custom Workout'}</h3>
              <div className="workout-controls">
                {!isWorkoutActive ? (
                  <motion.button
                    className="control-btn resume"
                    onClick={resumeWorkout}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPlay /> Resume
                  </motion.button>
                ) : (
                  <motion.button
                    className="control-btn pause"
                    onClick={pauseWorkout}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPause /> Pause
                  </motion.button>
                )}
                <motion.button
                  className="control-btn stop"
                  onClick={stopWorkout}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaStop /> Stop
                </motion.button>
              </div>
            </div>

            {/* Workout Progress */}
            <div className="workout-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getWorkoutProgress()}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Exercise {currentExerciseIndex + 1} of {selectedWorkout.exercises.length}
              </div>
            </div>

            {/* Current Exercise */}
            {getCurrentExercise() && (
              <div className="current-exercise">
                <h4>Current Exercise: {selectedWorkout.exercises[currentExerciseIndex]}</h4>
                <div className="exercise-details">
                  <div className="exercise-info">
                    <p><strong>Instructions:</strong> {getCurrentExercise().instructions}</p>
                    <div className="exercise-meta">
                      <span className="meta-item">
                        <FaDumbbell /> {getCurrentExercise().category}
                      </span>
                      <span className="meta-item">
                        <FaHeart /> {getCurrentExercise().muscleGroups.join(', ')}
                      </span>
                      <span className="meta-item">
                        <FaFire /> {getCurrentExercise().calories} cal
                      </span>
                    </div>
                  </div>
                  <div className="exercise-sets">
                    <h5>Sets & Reps</h5>
                    <div className="sets-info">
                      <span>Sets: {getCurrentExercise().sets}</span>
                      {getCurrentExercise().reps ? (
                        <span>Reps: {getCurrentExercise().reps}</span>
                      ) : (
                        <span>Duration: {getCurrentExercise().duration}s</span>
                      )}
                      <span>Rest: {getCurrentExercise().restTime}s</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exercise Navigation */}
            <div className="exercise-navigation">
              <motion.button
                className="nav-btn prev"
                onClick={previousExercise}
                disabled={currentExerciseIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Previous
              </motion.button>
              <motion.button
                className="nav-btn next"
                onClick={nextExercise}
                disabled={currentExerciseIndex === selectedWorkout.exercises.length - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </div>

            {/* Workout Timer */}
            <div className="workout-timer">
              <FaClock className="timer-icon" />
              <span className="timer-display">{formatTime(workoutTimer)}</span>
            </div>
          </motion.div>
        )}

        {/* Exercise Library */}
        <motion.div 
          className="exercise-library-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Exercise Library</h3>
          <div className="exercise-grid">
            {Object.entries(exerciseLibrary).map(([name, exercise]) => (
              <motion.div
                key={name}
                className="exercise-card"
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="exercise-header">
                  <h4>{name}</h4>
                  <span className={`difficulty ${exercise.difficulty.toLowerCase()}`}>
                    {exercise.difficulty}
                  </span>
                </div>
                <p className="exercise-description">{exercise.instructions}</p>
                <div className="exercise-details">
                  <div className="muscle-groups">
                    <strong>Muscles:</strong> {exercise.muscleGroups.join(', ')}
                  </div>
                  <div className="exercise-stats">
                    <span>Sets: {exercise.sets}</span>
                    {exercise.reps ? (
                      <span>Reps: {exercise.reps}</span>
                    ) : (
                      <span>Time: {exercise.duration}s</span>
                    )}
                    <span>Rest: {exercise.restTime}s</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* User Stats */}
        <motion.div 
          className="user-stats-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3>Your Fitness Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <FaChartLine className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{userStats.totalWorkouts}</span>
                <span className="stat-label">Total Workouts</span>
              </div>
            </div>
            <div className="stat-card">
              <FaClock className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{formatTime(userStats.totalTime)}</span>
                <span className="stat-label">Total Time</span>
              </div>
            </div>
            <div className="stat-card">
              <FaHeart className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{userStats.favoriteWorkout}</span>
                <span className="stat-label">Favorite Workout</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workout History */}
        {workoutHistory.length > 0 && (
          <motion.div 
            className="workout-history-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3>Recent Workouts</h3>
            <div className="history-list">
              {workoutHistory.slice(-5).reverse().map((workout, index) => (
                <motion.div
                  key={index}
                  className="history-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="history-info">
                    <h4>{workout.name}</h4>
                    <span className="history-date">
                      {new Date(workout.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="history-stats">
                    <span className="stat">
                      <FaClock /> {formatTime(workout.duration)}
                    </span>
                    <span className="stat">
                      <FaDumbbell /> {workout.exercises.length} exercises
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkoutExerciseGuide;
