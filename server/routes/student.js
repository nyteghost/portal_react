const express = require('express'),
    router = express.Router(),
    { poolPromise } = require('../db'),
    studentController = require('../services/studentController'),
    { ensureAuthenticated } = require('../auth');

//Gathers information about student and renders student page
router.get('/', ensureAuthenticated, (req, res) => {
    try {
        studentController.fullStudentPage(req,res);
    } catch (error) {
        res.status(500).render('error', {error: error})
    }
}); 

module.exports = router;