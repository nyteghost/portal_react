const db = require('../services/db');
const helper = require('./helper');
const config = require('../services/config');

async function generateASAPLabels(req){
    console.log('Made warehouseops request')
    delete req.submit
    let stringedJSON = JSON.stringify(req)
    console.log(stringedJSON)
    const rows = await db.query(
      `call dbo_uspasaplistingsforlabels (lower('${stringedJSON}'))`
    );
    const data = helper.emptyOrRows(rows);
    console.log(data)
     return {
      data
    }
  };


async function generateASAPLabels(req){
    let record = JSON.parse(req);
    record.date = new Date().toLocaleDateString();
    return {
        record
      };
};

module.exports = {
    generateASAPLabels,
};