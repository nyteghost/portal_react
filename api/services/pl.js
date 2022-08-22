const db = require('./db');
const helper = require('../helper');
const config = require('./config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT assetid, serialnumber,assignment_timestamp, assignment_reason FROM gcaassetmgmt_2_0.asset_vwcurrentlocation LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}