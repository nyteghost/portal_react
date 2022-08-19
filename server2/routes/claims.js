const express = require('express'),
    router = express.Router(),
    { poolPromise } = require('../db'),
    upstrackingController = require('../services/upstrackingController'),
    { ensureAuthenticated } = require('../auth');

//Gathers information about student and renders student page
router.get('/', ensureAuthenticated, (req, res) => {
    try {
        upstrackingController.fullClaimsPage(req,res);
    } catch (error) {
        res.status(500).render('error', {error: error})
    }
});

module.exports = router;