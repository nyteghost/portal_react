const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');



async function getAllLoc(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM gcaassetmgmt_2_0.asset_vwcurrentlocation LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }


async function getSingleLoc(req){
    console.log(req)
    const rows = await db.query(
      `call gcaassetmgmt_2_0.asset_uspassetlocationlookup (lower('{"Company":"GCA","Argument":"${req.assetid}"}'))`
    );
    const data = helper.emptyOrRows(rows);
    return {
      data
    }
  }
  

  module.exports = {
    getAllLoc
    ,getSingleLoc

}