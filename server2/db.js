import mysql from 'mysql2/promise';
import fs from 'fs';
import * as dotenv from 'dotenv'
dotenv.config()
import inquirer from 'inquirer';

const db = mysql.createPool({
    host     : process.env.AZURESERVER,
    user     : process.env.AZUREUSER,
    password : process.env.AZUREPASS,
    database : process.env.DBNAME,
    port     : 3306,
    waitForConnections: true,
    connectionLimit : 20,
    queueLimit: 0,
    ssl:{ca:fs.readFileSync("C:\\cert\\DigiCertGlobalRootCA.crt.pem")},
});

db.getConnection((err, connection) => {
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
})

export function execute(query) {
  db.execute(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
    inquire();
  });
}

function inquire() {
  inquirer
    .prompt([
      {
        name: 'statement',
        message: 'mysql>',
      },
    ])
    .then((answer) => {
      if (answer.statement === 'quit') {
        console.log('Disconnected and exit');
        connection.end();
      } else {
        query(answer.statement);
      }
    });
}
  
export function connect() {
  connection.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Connected to SQL');
      inquire();
    }
  });
}


