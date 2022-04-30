const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Job = require('../models/Job');
const User = require('../models/User');

//welcome page
router.get('/',(req,res)=>{
     Job.find({}, function(err,jobs){
      res.render('welcome',{
         jobList: jobs
      })
 })
})
 
//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard', {
     name: req.user.name,
     email: req.user.email,
     id: req.user.id
}));
router.get('/edit', ensureAuthenticated, (req, res) => 
res.render('edit',{
     name: req.user.name,
     email: req.user.email,
     id: req.user.id,
     skill: req.user.skill,
     userData: req.user.body
}));
module.exports = router;