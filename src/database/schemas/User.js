const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: new Date()
    },

});

module.exports = mongoose.model('users', UserScheme);