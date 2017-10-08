//creates enviromental variables - looks for .env file in the root folder and set'em up so they can be accessed by process.env object
require('dotenv').config()

const express = require("express");
const fs = require("fs");
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser')
var path = require('path');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(function(req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('connected to database')
});


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser({limit: '50mb'})); // get information from html forms
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('views', './app/views')
app.set('view engine', 'ejs')


var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://radstransfer.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: 'http://radstransfersapi.co.uk',
  issuer: "https://radstransfer.eu.auth0.com/",
  algorithms: ['RS256']
});

// Express only serves static assets in production, proxy dosen't work in production
if (process.env.NODE_ENV === "production") {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use(jwtCheck);



// import routes
require('./app/routes.js')(app);
require('./app/routesEmails.js')(app);




app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
