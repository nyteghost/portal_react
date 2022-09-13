const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');

async function consumePeri(req){
  console.log('Made peri request')
  delete req.submit
  let stringedJSON = JSON.stringify(req)
  // console.log(stringedJSON)

  const rows = await db.query(
    `call dbo_uspaddconsumable(lower('${stringedJSON}'))`
  );
  const data = helper.emptyOrRows(rows);
  // console.log(data)
  return {
    data,
    req
  }
};

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
};



async function getSingleLoc(req){
    const rows = await db.query(
      `call dbo_uspassetlocationlookup (lower('{"Company":"${req.Company}","Argument":"${req.AssetID}"}'))`
    );
    const data = helper.emptyOrRows(rows);
    console.log(data)
    return {
      data
    }
};
  
module.exports = {
  consumePeri,
  getAllLoc,
  getSingleLoc
};