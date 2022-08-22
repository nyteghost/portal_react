const mysql = require("mysql2");
const mysql2 = require('mysql2/promise');
const fs = require('fs');
const config = require('./config');
require("dotenv").config({path: './services/.env'});


const pool = mysql.createPool(config.db);


pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }
   
  
    return
  });


async function query(sql, params) {
  const connection = await mysql2.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}






module.exports = {
  query
}




 