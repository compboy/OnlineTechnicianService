const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');
const { redirect } = require('express/lib/response');
//job schema
const Job = require('../models/Job');

//Login page
router.get('/login', (req, res) => res.render('login'));

//Register page
router.get('/register', (req, res) => res.render('register'));
//addjob
router.get('/addjob', (req, res) => res.render('addjob'));

//add job route

//addjob Handle
router.post('/addJob', (req, res) => {
    console.log(req.body)
    const { name, phone, deviceType, device, problem, location } = req.body;
    let errors = [];

    //check reqruied fields 
    if (!name || !phone || !deviceType || !device || !problem || !location) {
        //console.log('Please fiill in the all fields.');
        errors.push({ msg: 'Please fill in the all fields' });
    }
    const newJob = new Job({
        name,
        phone,
        deviceType,
        device,
        problem,
        location
    });
    newJob.save()
        .then(job => {
            req.flash('success_msg', ' New job added.');
            res.redirect('/users/addJob');
        })
        .catch(err => console.log(err));
});

//Register Handle
router.post('/register', (req, res) => {
    console.log(req.body)
    const { name, email, phone, technicianType, skill, qualification, password, password2 } = req.body;
    let errors = [];

    //check reqruied fields 
    if (!name || !email || !password || !password2 || !phone || !skill || !technicianType || !qualification) {
        //console.log('Please fiill in the all fields.');
        errors.push({ msg: 'Please fill in the all fields' });
    }

    //check passwords match
    if (password !== password2) {
        //console.log('Password do not match');
        errors.push({ msg: 'Passwords do not match.' });
    }

    //password lenth required
    if (password.length < 3) {
        errors.push({ msg: 'Password should be 3 characters.' });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            phone,
            technicianType,
            skill,
            qualification,
            password,
            password2
        });
    } else {
        //Validation pass
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //User exist
                    errors.push({ msg: 'Email is already registered.' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        phone,
                        technicianType,
                        skill,
                        qualification,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        phone,
                        technicianType,
                        skill,
                        qualification,
                        password
                    });
                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //password to hash
                            newUser.password = hash;
                            //saving user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can login now.');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
});
//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect('/users/login');
});

//Route about
router.get('/about', (res, req) => {
    res.renderer('about');
});


module.exports = router;