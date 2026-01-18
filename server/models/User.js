const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    address: String,
    city: String,
    state: String,
    pincode: String,
    date_of_birth: String,
    gender: String,
    blood_group: String,
    emergency_contact: String,
    emergency_contact_relation: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', UserSchema);
