const mongoose = require('mongoose');

const DoctorReviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review_text: String,
    review_date: { type: Date, default: Date.now },
    is_verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('DoctorReview', DoctorReviewSchema);
