// Healthcare Data Persistence Utility
// Handles localStorage operations for all healthcare tools

const STORAGE_KEYS = {
  DENTAL_RECORDS: 'apolloClone_dentalRecords',
  WORKOUT_HISTORY: 'apolloClone_workoutHistory',
  WORKOUT_STATS: 'apolloClone_workoutStats',
  CUSTOM_WORKOUTS: 'apolloClone_customWorkouts',
  VISION_TESTS: 'apolloClone_visionTests',
  SCREEN_TIME_DATA: 'apolloClone_screenTimeData',
  BMI_HISTORY: 'apolloClone_bmiHistory',
  SYMPTOM_HISTORY: 'apolloClone_symptomHistory',
  MEDICATION_SCHEDULES: 'apolloClone_medicationSchedules',
  MEDICATION_HISTORY: 'apolloClone_medicationHistory',
  DOSAGE_CALCULATIONS: 'apolloClone_dosageCalculations',
  SLEEP_RECORDS: 'apolloClone_sleepRecords',
  NUTRITION_PLANS: 'apolloClone_nutritionPlans',
  MEAL_HISTORY: 'apolloClone_mealHistory',
  CHAT_HISTORY: 'apolloClone_chatHistory',
  USER_PREFERENCES: 'apolloClone_userPreferences'
};

class HealthDataPersistence {
  constructor() {
    this.isSupported = this.checkLocalStorageSupport();
  }

  checkLocalStorageSupport() {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage is not supported');
      return false;
    }
  }

  // Generic save function
  saveData(key, data) {
    if (!this.isSupported) return false;
    
    try {
      const dataToSave = {
        data: data,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(key, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error(`Error saving data for ${key}:`, error);
      return false;
    }
  }

  // Generic load function
  loadData(key, defaultValue = null) {
    if (!this.isSupported) return defaultValue;
    
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return defaultValue;
      
      const parsed = JSON.parse(stored);
      return parsed.data || defaultValue;
    } catch (error) {
      console.error(`Error loading data for ${key}:`, error);
      return defaultValue;
    }
  }

  // Generic clear function
  clearData(key) {
    if (!this.isSupported) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error clearing data for ${key}:`, error);
      return false;
    }
  }

  // Dental Health Guide Methods
  saveDentalRecords(records) {
    return this.saveData(STORAGE_KEYS.DENTAL_RECORDS, records);
  }

  loadDentalRecords() {
    return this.loadData(STORAGE_KEYS.DENTAL_RECORDS, []);
  }

  // Workout & Exercise Guide Methods
  saveWorkoutHistory(history) {
    return this.saveData(STORAGE_KEYS.WORKOUT_HISTORY, history);
  }

  loadWorkoutHistory() {
    return this.loadData(STORAGE_KEYS.WORKOUT_HISTORY, []);
  }

  saveWorkoutStats(stats) {
    return this.saveData(STORAGE_KEYS.WORKOUT_STATS, stats);
  }

  loadWorkoutStats() {
    return this.loadData(STORAGE_KEYS.WORKOUT_STATS, {
      totalWorkouts: 0,
      totalMinutes: 0,
      caloriesBurned: 0,
      currentStreak: 0,
      longestStreak: 0,
      favoriteWorkout: 'None'
    });
  }

  saveCustomWorkouts(workouts) {
    return this.saveData(STORAGE_KEYS.CUSTOM_WORKOUTS, workouts);
  }

  loadCustomWorkouts() {
    return this.loadData(STORAGE_KEYS.CUSTOM_WORKOUTS, []);
  }

  // Vision Health Checker Methods
  saveVisionTests(tests) {
    return this.saveData(STORAGE_KEYS.VISION_TESTS, tests);
  }

  loadVisionTests() {
    return this.loadData(STORAGE_KEYS.VISION_TESTS, []);
  }

  saveScreenTimeData(data) {
    return this.saveData(STORAGE_KEYS.SCREEN_TIME_DATA, data);
  }

  loadScreenTimeData() {
    return this.loadData(STORAGE_KEYS.SCREEN_TIME_DATA, []);
  }

  // BMI Health Calculator Methods
  saveBMIHistory(history) {
    return this.saveData(STORAGE_KEYS.BMI_HISTORY, history);
  }

  loadBMIHistory() {
    return this.loadData(STORAGE_KEYS.BMI_HISTORY, []);
  }

  // Symptom Checker Methods
  saveSymptomHistory(history) {
    return this.saveData(STORAGE_KEYS.SYMPTOM_HISTORY, history);
  }

  loadSymptomHistory() {
    return this.loadData(STORAGE_KEYS.SYMPTOM_HISTORY, []);
  }

  // Medication Tracker Methods
  saveMedicationSchedules(schedules) {
    return this.saveData(STORAGE_KEYS.MEDICATION_SCHEDULES, schedules);
  }

  loadMedicationSchedules() {
    return this.loadData(STORAGE_KEYS.MEDICATION_SCHEDULES, []);
  }

  saveMedicationHistory(history) {
    return this.saveData(STORAGE_KEYS.MEDICATION_HISTORY, history);
  }

  loadMedicationHistory() {
    return this.loadData(STORAGE_KEYS.MEDICATION_HISTORY, []);
  }

  // Dosage Calculator Methods
  saveDosageCalculations(calculations) {
    return this.saveData(STORAGE_KEYS.DOSAGE_CALCULATIONS, calculations);
  }

  loadDosageCalculations() {
    return this.loadData(STORAGE_KEYS.DOSAGE_CALCULATIONS, []);
  }

  // Sleep Quality Analyzer Methods
  saveSleepRecords(records) {
    return this.saveData(STORAGE_KEYS.SLEEP_RECORDS, records);
  }

  loadSleepRecords() {
    return this.loadData(STORAGE_KEYS.SLEEP_RECORDS, []);
  }

  // Nutrition Diet Planner Methods
  saveNutritionPlans(plans) {
    return this.saveData(STORAGE_KEYS.NUTRITION_PLANS, plans);
  }

  loadNutritionPlans() {
    return this.loadData(STORAGE_KEYS.NUTRITION_PLANS, []);
  }

  saveMealHistory(history) {
    return this.saveData(STORAGE_KEYS.MEAL_HISTORY, history);
  }

  loadMealHistory() {
    return this.loadData(STORAGE_KEYS.MEAL_HISTORY, []);
  }

  // Healthcare Chatbot Methods
  saveChatHistory(history) {
    return this.saveData(STORAGE_KEYS.CHAT_HISTORY, history);
  }

  loadChatHistory() {
    return this.loadData(STORAGE_KEYS.CHAT_HISTORY, []);
  }

  // User Preferences Methods
  saveUserPreferences(preferences) {
    return this.saveData(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  loadUserPreferences() {
    return this.loadData(STORAGE_KEYS.USER_PREFERENCES, {
      theme: 'light',
      notifications: true,
      dataRetention: 30, // days
      autoSave: true,
      units: 'metric'
    });
  }

  // Utility Methods
  exportAllData() {
    if (!this.isSupported) return null;

    const allData = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      const data = this.loadData(key);
      if (data) {
        allData[key] = data;
      }
    });

    return {
      exportDate: new Date().toISOString(),
      version: '1.0',
      data: allData
    };
  }

  importAllData(importData) {
    if (!this.isSupported || !importData || !importData.data) return false;

    try {
      Object.entries(importData.data).forEach(([key, data]) => {
        if (Object.values(STORAGE_KEYS).includes(key)) {
          this.saveData(key, data);
        }
      });
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  clearAllData() {
    if (!this.isSupported) return false;

    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        this.clearData(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  }

  getStorageInfo() {
    if (!this.isSupported) return null;

    try {
      let totalSize = 0;
      const itemSizes = {};

      Object.values(STORAGE_KEYS).forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          const size = new Blob([item]).size;
          itemSizes[key] = size;
          totalSize += size;
        }
      });

      return {
        totalSize: totalSize,
        itemSizes: itemSizes,
        totalItems: Object.keys(itemSizes).length,
        isSupported: this.isSupported
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return null;
    }
  }

  // Auto-cleanup old data (call periodically)
  cleanupOldData(retentionDays = 30) {
    if (!this.isSupported) return;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    Object.values(STORAGE_KEYS).forEach(key => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.timestamp && new Date(parsed.timestamp) < cutoffDate) {
            this.clearData(key);
          }
        }
      } catch (error) {
        console.error(`Error cleaning up ${key}:`, error);
      }
    });
  }
}

// Create singleton instance
const healthDataPersistence = new HealthDataPersistence();

// Auto-cleanup on initialization (once per session)
if (typeof window !== 'undefined') {
  const lastCleanup = localStorage.getItem('apolloClone_lastCleanup');
  const today = new Date().toDateString();
  
  if (lastCleanup !== today) {
    healthDataPersistence.cleanupOldData();
    localStorage.setItem('apolloClone_lastCleanup', today);
  }
}

export default healthDataPersistence;
export { STORAGE_KEYS };
