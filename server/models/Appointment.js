const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointment_date: { type: Date, required: true },
    appointment_time: { type: String, required: true },
    appointment_status: { type: String, default: 'scheduled', enum: ['scheduled', 'confirmed', 'completed', 'cancelled'] },
    consultation_type: { type: String, default: 'in-person', enum: ['in-person', 'video', 'phone'] },
    symptoms: String,
    notes: String,
    total_amount: { type: Number, required: true },
    payment_status: { type: String, default: 'pending', enum: ['pending', 'paid', 'refunded'] },
    payment_method: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
