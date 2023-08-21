const passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config()

passport.use(new GitHubStrategy({
    clientID: 'eedb7b0de4cfd16f8bba',
    clientSecret: '26697a4c148cff2453c529185054fb503b88e3ac',
    callbackURL: 'https://expresscheck.onrender.com/api/v1/auth/github/redirect',
}, async (accessToken, refreshToken, profile, done)=> {
    console.log(accessToken, refreshToken);
    console.log(profile);
}));