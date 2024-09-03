const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // e.g., percentage, fixed
    value: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Discount', DiscountSchema);
