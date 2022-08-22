const express = require('express'),
    router = express.Router(),
    returnController = require('../services/returnController'),
    resources = require('../resources/resources'),
    { ensureAuthenticated } = require('../auth');

//Currently just redirects to the new route, but will be an index endpoint for  searching returns in the future
router.get('/', ensureAuthenticated, (req, res)=>{
    res.redirect('/return/new');
})

// Shows the form for entering a new asset assignment to the Returned Equipment user
router.get('/new', ensureAuthenticated, async (req, res)=>{
    try {
        let returns =  await returnController.getReturns(req, res);
        res.render('return/new', {returns : returns[0]});
    } catch (error) {
        res.status(400).render('error', {err: error})
    }
    
});




// Shows the form for entering a notag return. This is the same as a regular return, but includes the device type field
router.get('/notag', ensureAuthenticated, async (req,res)=>{
    try {
        let returns =  await returnController.getReturns(req, res);
        res.render('return/notag', {returns :  returns[0], deviceTypes : resources.deviceTypes});
    } catch (error) {
        res.status(400).render('error', {err: error})
    }
})

// Shows the form for entering a K12 returned device
router.get('/k12', ensureAuthenticated, (req, res)=>{
    try{
        res.render('return/k12')
    } catch(error){
        res.status(400).render('error', {err: error})
    }
})

//Shows the form for selecting a date to view returns
router.get('/search?', ensureAuthenticated, async (req, res)=>{
    try{
        let returns = await returnController.getReturnsByDate(req, res);
        res.render('return/search', {returns :  returns[0]})
    } catch(error) {
        res.status(400). render('error', {err : error})
    }
})

//Shows the form for entering FID and retrieving QR code for SCA warehouse tracking number
router.get('/QR?', ensureAuthenticated, async (req, res)=>{
    try{
        let familyResults = await returnController.getQR(req, res);
        let familyID = familyResults.recordset[0];
        res.render('return/qr', {familyID : familyID})
    } catch(error){
        res.status(400).render('error', {err: error})
    }
})

// Post a new k12 return
router.post('/k12', ensureAuthenticated, (req,res)=>{
    try {
        returnController.newK12Return(req,res)
    } catch (error) {
        res.status(400).render('error', {err: error})
    }
});

    

// Post a return to the Database
router.post('/new',  ensureAuthenticated, returnController.newReturn)


module.exports = router;