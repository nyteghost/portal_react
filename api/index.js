const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config.json');
const controllers = require("./controllers");
const router = express.Router();
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
// const assetLocationsRouter = require('./routes/pl');

const options = {
    identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
    issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID, // audience is this application
    validateIssuer: config.settings.validateIssuer,
    passReqToCallback: config.settings.passReqToCallback,
    loggingLevel: config.settings.loggingLevel,
    scope: config.protectedRoutes.hello.scopes
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
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
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

// app.get('/getAssetLocation',
//     passport.authenticate('oauth-bearer', {session: false}),
//     (req, res) => {
//         console.log('Validated claims: ', req.authInfo);

//         // Service relies on the name claim.  
//         res.status(200).json({
//             'Statement': "Did it"
//         });
//     }
// );


// const snapp = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use('/getAssetLocations', assetLocationsRouter);
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({ message: err.message });
//     return;
//   });



const assetLocations = require('./services/pl');
 
app.get('/getAssetLocations', 
passport.authenticate('oauth-bearer', {session: false}), async function(req, res, next) {
try {
    res.json(await assetLocations.getMultiple(req.query.page));
} catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
}
});

app.get('/getAssetLocation', 
passport.authenticate('oauth-bearer', {session: false}), async function(req, res, next) {
try {
    req.query;
    console.log(req.query);
    res.json(await assetLocations.getSingle(req.query));
} catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
}
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });


// app.route("/getAssetLocation").get(controllers.getAllAssetLocations).post(controllers.createAssetLocation);
// router
//  .route("/:id")
//  .get(controllers.getAssetLocation)
//  .put(controllers.updateAssetLocation)
//  .delete(controllers.deleteTodo);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

module.exports = app, router;