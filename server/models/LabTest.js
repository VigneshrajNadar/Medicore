// Lab Test Model
const mongoose = require('mongoose');

const LabTestSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    test_name: { type: String, required: true },
    test_date: { type: Date, required: true },
    test_time: { type: String },
    test_type: { type: String },
    status: { type: String, default: 'scheduled', enum: ['scheduled', 'sample_collected', 'processing', 'completed', 'cancelled'] },
    notes: String,
    home_collection: { type: Boolean, default: false },
    collection_address: String,
    total_amount: { type: Number, required: true },
    payment_status: { type: String, default: 'pending', enum: ['pending', 'paid', 'refunded'] },
    payment_method: String,
    resultFile: {
        name: String,
        data: String,
        type: String,
        size: Number,
        uploadDate: Date
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('LabTest', LabTestSchema);
