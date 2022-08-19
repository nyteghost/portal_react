const express = require('express'),
    router = express.Router(),
    { poolPromise } = require('../db'),
    controller = require('../services/assetController'),
    miscContacts = require('../resources/resources').miscContacts,
    { ensureAuthenticated } = require('../auth');

/** Gets asset info */
router.get('/', ensureAuthenticated, controller.getAssetInfo);

router.get('/new', ensureAuthenticated, (req,res) => res.render('asset/new'))

router.post('/new', ensureAuthenticated, (req,res)=> controller.createAsset(req,res))

router.get('/assignment/new', ensureAuthenticated, (req,res)=> res.render('asset/assignment/new', {miscContacts: miscContacts}))

router.post('/assignment/new', ensureAuthenticated, (req, res)=> controller.newAssignment(req, res))

// router.get('/location', ensureAuthenticated, (req,res)=> res.render('asset/location'))

// router.post('/location', ensureAuthenticated, (req, res)=> controller.newLocation(req, res))


module.exports = router;