const express=require('express');

const router=express.Router();

const userController=require('../controller/user');

const isAuth=require('../middlewares/authentication');

router.get('/special',isAuth,userController.getSpecial);

router.get('/',userController.index);

router.get('/:value',userController.index); 

router.post('/login',userController.postLogin);

router.post('/signup',userController.postSignup);

router.post('/logout',userController.postLogout);

module.exports=router;