
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose =require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const ejs = require('ejs');
const passport= require('passport');
const path = require('path');
const jade =require('jade');
const usersRoute = require('./routes/users.js');

//Fetch
const User = require('./models/User');
const { executionAsyncId } = require('async_hooks');
const { ensureIndexes } = require('./models/User');
const { ensureAuthenticated } = require('./config/auth');
const Job =  require('./models/Job');

const app = express();
//Passport config
require('./config/passport')(passport);


//Fetching data


//DB Config
const db =require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db,{useNewUrlParser: true})
    .then(() =>console.log('MongoDB Connected....'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs','jade');
app.set('views', path.join(__dirname,'views'));
app.use('/css',express.static(__dirname  + '/public/css'))
app.use('/img',express.static(__dirname  + '/public/img'))

//Bodyparser
app.use(express.urlencoded({ extended: false}));

// Express session middlewire
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//Route
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));



//Route about
app.get('/about',(req, res)=>{
    res.render('about')
})
//Route contacts page
app.get('/contact',(req, res)=>{
    res.render('contact')
})
//Route contacts page
app.get('/faqs',(req, res)=>{
    res.render('faqs')
})
app.get('/technician',(req, res)=>{
    res.render('technician')
})
app.get('/edit',(req, res)=>{
        res.render('edit');
})
app.get('/location',(req, res)=>{
    res.render('location');
})

//showing all technicians 
app.get('/allTechnician',(req,res)=>{
    User.find({}, function(err,users){
     res.render('allTechnician',{
        technicianList: users
     })
    })
})

//Showing all jobs
app.get('/allJob',(req,res)=>{
    Job.find({}, function(err,jobs){
     res.render('allJob',{
        jobList: jobs
     })
    })
})





//edit user
app.get('/edit',ensureAuthenticated, async(req, res)=>{
  try{
      const id = req.users.id;
      const userData = await User.findById({ _id:id });
      if(userData){
        res.render('/edit',{ user: userData})
      }else{
          res.redirect('/')
      }


  }catch(err){

  }  
})
app.post('/edit', async (req,res)=>{
   try{
    if(req.file){
        const userData = await User.findByIdAndUpdate({ _id: req.body.user_id},{$set:{name:req.body.name, phone:req.body.phone,
            skill: req.body.skill}});

    }else {
        const userData = await User.findByIdAndUpdate({ _id: req.body.user_id},{$set:{name:req.body.name, phone:req.body.phone,
        skill: req.body.skill}});
    }
    res.redirect('/dashboard');
   }
   catch(err){
       User.findById()
   }
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));