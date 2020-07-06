const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models').User;
var config = require('./main');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done){
        var isValidPassword = function(userpass, password){
            return bCrypt.compareSync(password, userpass);
        }
        return User.findOne({ where: { email : email }})
                    .then(function(user){
                        if(!user){
                            return done(null, false, {
                                message: 'Email does not exit'
                            });
                        }
                        if(!isValidPassword(user.password, password)){
                            return done(null, false, {
                                message: 'Incorrect password.'
                            });
                        }
                        var userinfo = user.get();
                        return done(null, userinfo);
                    }).catch(function(err){
                        // console.log('Error:', err);
                        return done(null, false, {
                            message: 'Something went wrong with your Signin'
                        });
                    });
    })
);

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
    function (jwtPayload, cb){
        return User.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    })
);