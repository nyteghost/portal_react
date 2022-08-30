const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');


async function newReturn(req){
  console.log('Made newReturn request')
  console.log(req)

  const rows = await db.query(
    `call dbo_uspupdatereturnedassetsingle ('${req.TrackingNumber}','${req.DevType}','${req.AssetNumber}','${req.SerialNumber}','${req.Company}','${req.Worker}', ${req.LateDelivery},'${req.Location}')`
  );
  const data = helper.emptyOrRows(rows);
  

  return {
    data
  }
}
  

async function k12Return(req){
  console.log('Made newReturn request')
  console.log(req)

  const rows = await db.query(
    `call dbo_usprecordmiscreturn ('${req.SerialNumber}','${req.TrackingNumber}','${req.Company}')`
  );
  const data = helper.emptyOrRows(rows);
  

  return {
    data
  }
}

  module.exports = {
    newReturn
}
