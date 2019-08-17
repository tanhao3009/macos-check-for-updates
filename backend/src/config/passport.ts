import passport from 'passport';
import passportLocal from "passport-local";
import { User } from "../models/User";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, done) => {
  
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, { message: "Invalid email or password." });
    }

    return done(null, user);
  }).catch(done);
}));