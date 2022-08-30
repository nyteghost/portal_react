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
  
module.exports = {
    getProccessedForDay
}

