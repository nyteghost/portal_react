const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config.json');
const controllers = require("./controllers");
const router = express.Router();
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
require("dotenv").config({path: '../services/.env'});




/*
SQL Procs found in controllers -> controlhelper
Remove < passport.authenticate('oauth-bearer', {session: false}), > to test without MS Authorization
*/

// const assetLocations = require('./controllers/controlhelper');

const asapController = require('./controllers/asapController');
const assetController = require('./controllers/assetController');
const connectwiseController = require('./controllers/connectwise');
const returnController = require('./controllers/returnController.js');
const warehouseController = require('./controllers/warehouseController');

const options = {
    identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
    issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID, // audience is this application
    validateIssuer: config.settings.validateIssuer,
    passReqToCallback: config.settings.passReqToCallback,
    loggingLevel: config.settings.loggingLevel,
    scope: config.protectedRoutes.hello.scopes,

};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
        // Send user info using the second argument
        done(null, {}, token);
    }
);

const app = express();

app.use(morgan('dev'));

app.use(passport.initialize());

passport.use(bearerStrategy);

// enable CORS (in production, modify as to allow only designated origins)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest');
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });

// exposed API endpoint
app.get('/hello',
    passport.authenticate('oauth-bearer', {session: false}),
    (req, res) => {
        console.log('Validated claims: ', req.authInfo);

        // Service relies on the name claim.  
        res.status(200).json({
            'name': req.authInfo['name'],
            'issued-by': req.authInfo['iss'],
            'issued-for': req.authInfo['aud'],
            'scope': req.authInfo['scp']
        });
    }
);

app.get('/testAPI',
    passport.authenticate('oauth-bearer', {session: false}),
    (req, res) => {
        console.log('Validated claims: ', req.authInfo);

        // Service relies on the name claim.  
        res.status(200).json({
            'Statement': "Did it"
        });
    }
);

// const snapp = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
 

app.get('/getAssetLoc/:Company/:AssetID', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.params;
            res.json(await assetController.getSingleLoc(req.params));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);



app.get('/getASAPLabel', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.query;
            res.json(await warehouseController.getProccessedForDay(req.query.page));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);

app.post('/getCWTicket', 
    // passport.authenticate('oauth-bearer', {session: false}),
    async function(req, res, next) {
        try {
            req.body;
            console.log(req.body)
            res.json(await connectwiseController.getTicket(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/getProccessedForDay', 
    passport.authenticate('oauth-bearer', {session: false}),
    async function(req, res, next) {
        try {
            req.body;
            console.log(req.body)
            res.json(await warehouseController.getProccessedForDay(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);

app.post('/postAssetLabel', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await warehouseController.assignAssetToPacked(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);
app.post('/postConsumePeri', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await assetController.consumePeri(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);
app.post('/postEtched', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await warehouseController.markEtched(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);

app.post('/postK12Return', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await returnController.k12Return(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);

app.post('/postMiscAssignment', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await warehouseController.miscAssignment(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);

app.post('/postNewAssetLocation', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await warehouseController.newAssetLocation(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);

app.post('/postNewReturn', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await returnController.newReturn(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);

app.post('/postWarehouseOps', 
    passport.authenticate('oauth-bearer', {session: false}), 
    async function(req, res, next) {
        try {
            req.body;
            res.json(await warehouseController.opAssignment(req.body));
        } catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    }
);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });



const port = process.env.PORT || 5000;


const secureOptions = {
    key : fs.readFileSync(process.env.CERTKEY),
    cert: fs.readFileSync(process.env.CERT),
}

https.createServer(secureOptions, app)
.listen(port, () => {
    console.log('Listening on port ' + port);
});

// app.listen(port, () => {
//     console.log('Listening on port ' + port);
// });

module.exports = app, router;