const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore=require('connect-mongodb-session')(session);
const flash=require('connect-flash'); 
const csrf=require('csurf');

const authRoutes=require('./routes/authroutes');

const url='user your mongo DB URL';

const app=express();
const store=new MongoDbStore({  
    uri:url,
    collection:'sessions'   
})

const csrfProtection=csrf();
const flashMessages=flash(); 

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({secret:'saitejachelluboina',
    resave:false,
    saveUninitialized:false,
    store:store   
  })
)  

app.use(csrfProtection);
app.use(flashMessages);

app.use((req,res,next)=>{
  res.locals.isLoggedIn=req.session.isLoggedIn, 
  res.locals.csrfToken=req.csrfToken(),
  next();
})

app.use(authRoutes);

mongoose
  .connect(url, { useNewUrlParser: true,useUnifiedTopology: true })
  .then(result => {
    console.log('successfully connected to DB')
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
