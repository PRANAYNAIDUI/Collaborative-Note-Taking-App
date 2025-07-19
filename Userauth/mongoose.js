// src/models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric and can contain underscores']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to validate password
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function() {
    const token = jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
};

module.exports = mongoose.model('User', userSchema);
