const Discount = require('../models/Discount');

exports.createDiscount = async (req, res) => {
    const { code, type, value, expiryDate } = req.body;
    try {
        const discount = new Discount({ code, type, value, expiryDate });
        await discount.save();
        res.json(discount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.json(discounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.applyDiscount = async (req, res) => {
    const { code } = req.body;
    try {
        const discount = await Discount.findOne({ code, isActive: true, expiryDate: { $gte: new Date() } });
        if (!discount) return res.status(400).json({ msg: 'Invalid or expired discount code' });
        res.json(discount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
