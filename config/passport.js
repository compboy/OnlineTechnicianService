const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user Model 
const User = require('../models/User');
module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: 'email'},  (email, password, done)=>{
            //match user
            User.findOne({email: email})
            .then(user =>{
              if(!user){
                 return done(null, false, {message: 'That email is not registered.'});
              } 
              //Match Password
              bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) throw err;
                if (isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message: 'Password incorrenct'});
                }
              });
            })
            .catch(err=> console.log(err));
        })
    );
    //Passport serialize
    passport.serializeUser((user, done) => {
        done(null, user.id); 
       // where is this user.id going? Are we supposed to access this anywhere?
    });
    
    // used to deserialize the user
    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
            done(err, user);
        });
    });
}  