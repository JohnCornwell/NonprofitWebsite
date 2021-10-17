const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
//database connection defined in models

// Set up the express app
const app = express();

// Set up session info
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "n0r0kvjnoi0lnfifnj9824n09hon209f",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Invalid request.',
}));

module.exports = app;
