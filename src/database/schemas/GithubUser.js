const mongoose = require("mongoose");

const GithubUserScheme = new mongoose.Schema({
    githubId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: new Date()
    },

});

module.exports = mongoose.model('github_users', GithubUserScheme);