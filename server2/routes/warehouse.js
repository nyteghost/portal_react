const express = require('express'),
    router = express.Router(),
    warehouseController = require('../services/warehouseController'),
    resources = require('../resources/resources'),
    { ensureAuthenticated } = require('../auth');



// Shows the page for creating a new warehouse status update
router.get('/new', ensureAuthenticated, async (req, res)=>{
    try{
        let warehouseOps = await warehouseController.getWarehouseOps(req);
        res.render('warehouse/new', {warehouseContacts : resources.warehouseContacts, warehouseOps : warehouseOps, warehouseLocations : resources.warehouseLocations, warehouseOperations : resources.warehouseOperations})
    } catch(error){
        console.log(error)
        res.status(400).render('error', {error: error})
    }
})

// Creates new assignment record for processes in the warehouse
router.post('/new', ensureAuthenticated, (req, res)=> {
    warehouseController.newAssignment(req, res);
});

router.get('/getTable', ensureAuthenticated, async (req, res)=>{
    try{
        let table = await warehouseController.getTable(req, res)
        console.log(table)
        res.render('partials/dailyWarehouseOpsTable', {warehouseOps : table[0]})
    } catch(error){
        res.status(400).render('error', {error : error})
    }
    
})


router.get('/location', ensureAuthenticated, (req,res)=> res.render('warehouse/location'))

router.post('/location', ensureAuthenticated, (req, res)=> warehouseController.newLocation(req, res))

router.get('/getScansTable', ensureAuthenticated, async (req, res)=>{
    try{
        let scansTable = await warehouseController.getScansTable(req, res)
        // console.log('getScansTable')
        // console.log(table)
        res.render('partials/assLocTable', {warehouse : scansTable})
        console.log(scansTable)
    } catch(error){
        res.status(400).render('error', {err : error})
    }
    
})


router.get('/etch', ensureAuthenticated, (req, res)=>{
    try{
        res.render('warehouse/etch')
    } catch(error){
        res.status(400).render('error', {error : error})
    }
})

router.post('/etch', ensureAuthenticated, (req, res)=>{
    try{
        warehouseController.markEtched(req, res)
    } catch(error){
        res.status(400).render('error', {error : error})
    }
})

router.get('/assetlabel', ensureAuthenticated, (reg, res)=>{
    try{
        res.render('warehouse/assetlabel', {labelTypes: resources.labelTypes, missingPeripherals: resources.missingPeripherals, packagedLocations : resources.packagedLocations})
    } catch(error){
        res.status(400).render('error', {error : error})
    }
})

router.get('/createAssetlabel', ensureAuthenticated, (req, res)=>{
    try{
        let asset = req.query.assetID;
        let ltype = req.query.ltype;
        let missingPeriph = req.query.missingPeriph;
        let staffName = req.query.staffName;
        warehouseController.assignAssetToPacked(req, res);
        
    } catch(error){
        res.status(400).render('error', {error : error})
    }
})





router.get('/assetLocationSearch', ensureAuthenticated, (req,res)=> res.render('warehouse/assetLocationSearch'))

router.post('/assetLocationSearch', ensureAuthenticated, (req, res)=> warehouseController.requestPage(req, res))


module.exports = router;

