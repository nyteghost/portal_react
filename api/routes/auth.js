const express = require('express'),
    passport = require('passport'),
    config = require('../config')
    router = express.Router();


//Login Page
router.get('/login', attemptLogin, (req, res)=>{
    res.redirect('/')

})

router.post('/openid/return', (req, res, next)=>{
    passport.authenticate('azuread-openidconnect', 
        { 
        response: res,
        failureRedirect: '/'  
        }
    )(req, res, next);
    },
    function(req, res) {
    res.redirect('/');
})

router.get('/openid/return', (req, res, next)=>{
    passport.authenticate('azuread-openidconnect', 
        { 
        response: res,
        failureRedirect: '/'  
        }
    )(req, res, next);
    },
    function(req, res) {
    res.redirect('/');
})


router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        req.logOut()
        res.redirect(config.destroySessionUrl)
    })
})


//Attempt to login
function attemptLogin(req, res, next){
    passport.authenticate('azuread-openidconnect',
        {
            response: res,
            //resourceURL: config.resouceURL, These are two options that we 
            //customState: 'my_state',        are not using
            failureRedirect:'/'
        }
    )(req, res, next);

}

module.exports = router;
