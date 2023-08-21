const passport = require('passport');
const GithubUser = require('../database/schemas/GithubUser');
var GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config()

passport.serializeUser((user, done) => {
    console.log('...Serializing user');
    console.log(user);
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    console.log('...deserializing user');
    console.log(id);

    try {
        const user = await GithubUser.findById(id);
        console.log(user);
        if(!user) throw new Error('User not found');
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
})


passport.use(new GitHubStrategy({
    clientID: 'eedb7b0de4cfd16f8bba',
    clientSecret: '26697a4c148cff2453c529185054fb503b88e3ac',
    callbackURL: 'https://expresscheck.onrender.com/api/v1/auth/github/redirect',
}, async (accessToken, refreshToken, profile, done)=> {

    console.log(accessToken, refreshToken);
    console.log(profile);
    try {
        const githubUser = await GithubUser.findOne({ githubId: profile.id });
        if(githubUser) {
            console.log("exist");
            return done(null, githubUser)
        } else {
            console.log("not exist new user");
            const newUser = await GithubUser.create({ githubId: profile.id });
            return done(null, newUser);
        }
    } catch (error) {
        console.log(error);
        return done(error, null); 
    }
}));