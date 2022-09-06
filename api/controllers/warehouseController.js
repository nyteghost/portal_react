const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');


async function assignAssetToPacked(req){
  console.log('Made  request')
  delete req.submit
  let stringedJSON = JSON.stringify(req)
  // console.log(stringedJSON)

  const rows = await db.query(
    `call dbo_uspportpackass(lower('${stringedJSON}'))`
  );
  const data = helper.emptyOrRows(rows);
  // console.log(data)
  return {
    data,
    req
  }
};

async function getProccessedForDay(){
    const rows = await db.query(
      `call dbo_uspwhopprocessedforday('Null','GCA')`
    );
    const data = helper.emptyOrRows(rows);
    return {
      data
    }
};
  
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
};

async function miscAssignment(req){
  delete req.submit;
  let stringedJSON = JSON.stringify(req);
  console.log(stringedJSON);
  console.log(req.type)
  if(req.type == 'asapPickup'){
    console.log('Made asapPickup request')
    const rows = await db.query(
      `call isolatedsafety.dbo_uspasap_pickup (lower('${stringedJSON}'))`
    );
    const data = helper.emptyOrRows(rows);
    console.log(rows);
    return {
      data
    };
  } else { 
    console.log('Made miscAssignUpdate request')
    const rows = await db.query(
      `call isolatedsafety.dbo_uspportalmiscassignupdate (lower('${stringedJSON}'))`
    );
    const data = helper.emptyOrRows(rows);
    console.log(rows);
    return {
      data
    };
  };
};

async function newAssetLocation(req){
  console.log('Made new asset location request')
  delete req.submit
  let stringedJSON = JSON.stringify(req)
  // console.log(stringedJSON)
  console.log(stringedJSON)
  const rows = await db.query(
    `call dbo_uspupdateassetwhloc (lower('${stringedJSON}'))`
  );
  console.log(rows)
  const data = helper.emptyOrRows(rows);
  // console.log(data)
  return {
    data,
    req
  }
};

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
};

module.exports = {
    assignAssetToPacked,
    getProccessedForDay,
    markEtched,
    miscAssignment,
    opAssignment,
    newAssetLocation
    
};

