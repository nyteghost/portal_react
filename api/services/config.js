const fs = require('fs');
require("dotenv").config({path: './services/.env'});

const config = {
    db: {
      host     : process.env.AZURESERVER,
      user     : process.env.AZUREUSER,
      password : process.env.AZUREPASS,
      database : process.env.DBNAME,
      port     : 3306,
      waitForConnections: true,
      connectionLimit : 20,
      queueLimit: 0,
      ssl:{ca:fs.readFileSync("C:\\cert\\DigiCertGlobalRootCA.crt.pem")},
    },
    listPerPage: 10,
  };

  // console.log(config)
module.exports = config;