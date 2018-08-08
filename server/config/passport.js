const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/keys');

// Passport-JWT Strategy Config
module.exports = function(passport){
  let opts = {};
  // This first line of code extracts Header from token
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // grabbing the secret key from config folder
  opts.secretOrKey = config.secret;
  // setting the strategy and gettomg payload
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}