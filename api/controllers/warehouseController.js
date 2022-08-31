const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');

async function getProccessedForDay(){

    const rows = await db.query(
      `call dbo_uspwhopprocessedforday('Null','GCA')`
    );
    const data = helper.emptyOrRows(rows);
    
  
    return {
      data
    }
}
  

async function opAssignment(req){
    console.log('Made warehouseops request')
    delete req.submit
    let stringedJSON = JSON.stringify(req)
    
    console.log(stringedJSON)

    
    const rows = await db.query(
      `call dbo_uspupdatewarehouseopscan(lower('${stringedJSON}'))`
    );
    const data = helper.emptyOrRows(rows);
    console.log(data)
    return {
      data
    }
}
  
async function markEtched(req){
    console.log('Made warehouseops request')
    delete req.submit
    // let stringedJSON = JSON.stringify(req)
    
    // console.log(stringedJSON)
    console.log(req)
    const rows = await db.query(
      `call dbo_uspupdateasetched("${req.assetid}","${req.Worker}","${req.Company}")`
    );
    const data = helper.emptyOrRows(rows);
    console.log(data)
    return {
      data
    }
}


module.exports = {
    getProccessedForDay,
    opAssignment,
    markEtched
}

