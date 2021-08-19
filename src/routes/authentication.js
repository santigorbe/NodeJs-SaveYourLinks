const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../lib/auth');
const {isNotLoggedIn} = require('../lib/auth');
//Para renderizar el formulario
router.get('/singup',isNotLoggedIn, (req,res) =>{

    res.render('auth/singup');
});
//Para recibir los datos del formulario
router.post('/singup', isNotLoggedIn, passport.authenticate('local.singup', {
        successRedirect: '/profile',
        failureRedirect: '/singup',
        failureFlash: true
    })
);

router.get('/singin',isNotLoggedIn, (req,res) =>{
    res.render('auth/singin');
});
router.post('/singin',isNotLoggedIn, (req,res,next) =>{
     passport.authenticate('local.singin', {
         successRedirect: '/profile',
         failureRedirect: '/singin',
         failureFlash: true
     })(req,res,next)
})

router.get('/profile', isLoggedIn, (req,res) =>{
    res.render('profile');

});

router.get('/logout', (req,res) =>{
    req.logOut();
    res.redirect('/singin')
});

module.exports = router;