const express = require('express'),
    router = express.Router(),
    { ensureAuthenticated } = require('../auth');


//Loads home page
router.get('/', (req, res)=>{
    res.render('index')
  });

module.exports = router;
