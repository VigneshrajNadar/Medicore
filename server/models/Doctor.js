const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience_years: { type: Number, required: true },
    hospital_name: { type: String, required: true },
    hospital_address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: String,
    latitude: Number,
    longitude: Number,
    consultation_fee: { type: Number, required: true },
    consultation_duration: { type: Number, default: 30 },
    available_days: { type: String, required: true },
    available_time_slots: { type: String, required: true },
    languages: String,
    about: String,
    education: String,
    awards: String,
    publications: String,
    profile_image: String,
    rating: { type: Number, default: 0.0 },
    total_reviews: { type: Number, default: 0 },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
