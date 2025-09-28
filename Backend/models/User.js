const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
  timestamps: true // optional: adds createdAt and updatedAt
});

// Add indexes for better query performance
userSchema.index({ createdAt: -1 });
userSchema.index({ username: 1 });

module.exports = mongoose.model('User', userSchema);