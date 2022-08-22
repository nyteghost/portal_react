const express = require('express'),
    router = express.Router(),
    controller = require('../services/asapController'),
    { ensureAuthenticated } = require('../auth');


router.get('/', ensureAuthenticated, (req, res)=> res.render('asap/index'))

router.post('/generateLabels', ensureAuthenticated, (req, res)=> controller.generateLabels(req, res))

router.get('/label', ensureAuthenticated, (req, res)=> res.render('asap/shippinglabel', {date : new Date().toLocaleDateString()}))

router.get('/renderlabel', ensureAuthenticated, (req, res)=> controller.renderLabel(req, res))

module.exports = router