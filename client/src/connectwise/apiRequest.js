import { ManageAPI } from 'connectwise-rest';
// import dotenv from 'dotenv'
// dotenv.config();

const cwm = new ManageAPI({
    companyId: 'scaatl',
    companyUrl: 'api-na.myconnectwise.net',
    publicKey: '5HPOQqt77KgNCrAp',
    privateKey: 'TTLNVioe23gFf8cL',
    clientId: '7f5b88ef-40ef-47ed-ad81-a2fadfab69fe',
    entryPoint: 'v2022_1', // optional, defaults to 'v4_6_release'
    apiVersion: '3.0.0',        // optional, defaults to '3.0.0'
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

  cwm.ServiceAPI.getServiceTicketsById(388867 )
  .then((ticket) => { console.log(ticket.id, ticket.summary, ticket.status.name); })
  .catch((err) => { console.log(err); });