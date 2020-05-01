const bcrypt=require('bcryptjs');
const User=require('../models/user');

exports.index=((req,res,next)=>{
    const value=req.params.value
    if(!value){
        res.render('index',{
            formType:"none"
        });
    }
    else if(value==='login'){
        res.render('index',{
            formType:"loginForm",
            error:req.flash('error')
        })
    }
    else if(value==='signup'){
        res.render('index',{
            formType:"signupForm",
            error:req.flash('error')
        })
    }
})

exports.postLogin=((req,res,next)=>{
    const email=req.body.email;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            req.flash('error','invalid email');
            return res.redirect('/login');
        } 
        bcrypt.compare(req.body.password,user.password)
        .then(result=>{
            if(result){
                req.session.isLoggedIn=true;
                req.session.user=user;  
                req.session.save(err=>{ 
                    res.render('welcome',{    
                        User:user
                    });
                })
            }
            else{
                req.flash('error','invalid password');
                return res.redirect('/login');   
            }
        }) 
    })
    .catch(err=>{
        console.log(err);
    })
})

exports.postSignup=((req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email})
    .then(user=>{
        if(user){
            req.flash('error','User with same Email ID already exist try another one');
            return res.redirect('/signup');
        } else{
            return bcrypt.hash(password,12)
            .then(hashedPassword=>{ 
                const userNew=new User({
                    email:email,
                    password:hashedPassword,
                    name:name
                })
                return userNew.save();
            })
            .then(result=>{
                console.log('user saved to db');
                res.redirect('/login');
            });    
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

exports.postLogout=((req,res,next)=>{
    req.session.destroy((err)=>{
        res.render('index',{
            formType:"none"
        });
    });
})

exports.getSpecial=((req,res,next)=>{
    res.render('special',{
        name:req.session.user.name
    });
})

