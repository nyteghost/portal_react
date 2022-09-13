const { ManageAPI } = require('connectwise-rest');
require("dotenv").config({path: './services/.env'});


const cwm = new ManageAPI({
    companyId: process.env.COMPANYID,
    companyUrl: process.env.COMPANYURL,
    publicKey: process.env.PUBLICKEY,
    privateKey: process.env.PRIVATEKEY,
    clientId: process.env.CLIENTID,
    entryPoint: process.env.ENTRYPOINT, // optional, defaults to 'v4_6_release'
    apiVersion: process.env.APIVERSION,        // optional, defaults to '3.0.0'
    timeout: 20000,             // optional, request connection timeout in ms, defaults to 20000
    retry: false,               // optional, defaults to false
    retryOptions: {             // optional, override retry behavior, defaults as shown
      retries: 4,               // maximum number of retries
      minTimeout: 50,           // number of ms to wait between retries
      maxTimeout: 20000,        // maximum number of ms between retries
      randomize: true,          // randomize delay between retries on timeouts
    },
    debug: false,               // optional, enable debug logging
    logger: (level, text, meta) => { } // optional, pass in logging function
});


async function getTicket(req){
  const ticket = await cwm.ServiceAPI.getServiceTicketsById(388867)
  const data = {
    "id":ticket.id,
    "summary":ticket.summary,
    "status":ticket.status.name
  }
  return data;
}

module.exports = {
    getTicket,
};