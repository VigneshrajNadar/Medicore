const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'confirmed'] },
    payment_method: String,
    shipping_address: String,
    order_type: { type: String, default: 'pharmacy', enum: ['pharmacy', 'lab_test', 'subscription'] },
    patient_name: String,
    scheduled_date: Date,
    transaction_id: String,
    items: [{
        product_name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        item_id: String
    }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Order', OrderSchema);
