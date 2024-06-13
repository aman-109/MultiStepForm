const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true 
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
