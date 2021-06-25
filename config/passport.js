const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const mongoose = require ('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => { 
  passport.use(new JwtStrategy(options, (jwt_payload, done)=> {
  	console.log(jwt_payload);
  	done();
  }))
} 


/*module.exports = function(passport) {
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
      User.findById(jwt_payload._id, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};*/

/*module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = keys.secretOrKey;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.data, (err, User) => {
        if(err){
          return done(err, false);
        }
  
        if(User){
          return done(null, User);
        } else {
          return done(null, false);
        }
      });
    }));
  }*/