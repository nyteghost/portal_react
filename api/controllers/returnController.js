const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');


async function newReturn(req){
    console.log('Made newReturn request')
    console.log(req)

    const rows = await db.query(
      `call dbo_uspupdatereturnedassetsingle ('${req.TrackingNumber}','${req.DevType}','${req.AssetNumber}','${req.SerialNumber}','GCA','Mark Brown', ${req.LateDelivery},'${req.Location}')`
    );
    const data = helper.emptyOrRows(rows);
    
  
    return {
      data
    }
  }
  

  module.exports = {
    newReturn
}
