const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;

    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
    }

    try {
        let user = await User.findById(req.user.id);

        if (user) {
            user = await User.findByIdAndUpdate(
                req.user.id,
                { $set: userFields },
                { new: true }
            );

            return res.json(user);
        }

        res.status(404).send('User not found');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
