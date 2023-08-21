const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schemas/User");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
    console.log('...Serializing user');
    console.log(user);
    done(null, user._id)
});

passport.deserializeUser(async (_id, done) => {
    console.log('...deserializing user');
    console.log(_id);

    try {
        const user = await User.findById(_id);
        console.log(user);
        if(!user) throw new Error('User not found');
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
})

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);
      try {
        if (!email || !password) {
          return done(null, false, {message:'Unable to login, No Credentials'});
        }
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return done(null, false, {message:'User not found'});
        }

        const isPasswordValid = await comparePassword(
          password,
          userDB.password
        );

        if (isPasswordValid) {
          done(null, userDB);
          console.log('Logged in successfully');
        } else {
            console.log('Incorrect password');
          done(null, null);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);
