const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');


async function newReturn(req){
  console.log('Made newReturn request')
  console.log(req)

  const rows = await db.query(
    `call dbo_uspupdatereturnedassetsingle ("${req.TrackingNumber}","${req.DevType}","${req.AssetNumber}","${req.SerialNumber}","${req.Company}","${req.Worker}", ${req.LateDelivery},"${req.Location}")`
  );
  const data = helper.emptyOrRows(rows);
  

  return {
    data
  }
}
  
async function returnsByDate(req){
  console.log('Made ReturnByDate request')
  delete req.submit
  let stringedJSON = JSON.stringify(req)
  console.log(stringedJSON)
  const rows = await db.query(
    `call dbo_uspreturnsprocessedbydate (${req.date}, ${req.company}`
  );
  const data = helper.emptyOrRows(rows[0]);
  console.log(data)
   return {
    data
  }
};


async function k12Return(req){
  console.log('Made new K12 Return request')
  console.log(req)

  const rows = await db.query(
    `call dbo_usprecordmiscreturn ("${req.SerialNumber}",'${req.TrackingNumber}',"${req.Company}")`
  );
  const data = helper.emptyOrRows(rows);
  

  return {
    data
  }
}

  module.exports = {
    returnsByDate,
    newReturn,
    k12Return
}
