const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./server/models/index');
let User = db['user'];
//database connection defined in models

// Set up the express app
const app = express();

// Set up session info
const ONEDAY = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "n0r0kvjnoi0lnfifnj9824n09hon209f",
  saveUninitialized: false,
  cookie: { maxAge: ONEDAY },
  resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));
app.use(cookieParser());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Search for route from top to bottom

app.all('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('localhost:4200/');
});

app.post('/login', (req, res) => {
  req.session.regenerate((err) => {
    if (err) {
      res.send("Unable to create session.");
    } else {
      person = null;
      person = User.findByUsername(req.body.Username)
      if (!person) {
        // user does not exist
        res.status(400).send("User does not exist");
      } else {
        // user exists
        if (User.Password == req.body.Password) {
          req.session.User = User;
        } else {
          res.status(400).send("Incorrect Password");
        }
      }
    }
  })
});

app.post('/signup', function (req, res) {
  if (!req.body.Username || !req.body.Password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    //see if user exists
    User = null;
    User
      .findByUsername(req.params.Username)
      .then(User => {
        if (!User) {
          // user does not exist, so create it
          User.create({
            Username: req.body.Username,
            Password: req.body.Password,
            FirstName: req.body.FirstName,
            MiddleName: req.body.MiddleName || '',
            LastName: req.body.LastName,
            UserType: req.body.UserType,
            Deleted: req.body.Deleted,
          })
            .then(User => req.session.user = User.Username)
            .catch(error => res.status(400).send(error));
        } else {
          // user exists, so give error
          res.status(400).send("User already exists.");
        }
      });
  }
});

app.get('/api', (req, res, next) => {
  res.send({ message: "Welcome to the API" });
});

const hostsController = require('./server/controllers/hostsController');
const eventController = require('./server/controllers/eventController');
const programController = require('./server/controllers/programController');
//call /getHosts once, then getEventById for each Id returned
app.post('/hosts/retrievePrograms', hostsController.retrievePrograms); //req.body needs EventId
app.post('/hosts/retrieveEvents', hostsController.retrieveEvents); //req.body needs ProgId
app.post('/getEventById', (req, res, next) => {//req.body needs EventId
  res.send(JSON.stringify(eventController.findById(req.body.EventId)));
});

app.post('/event/retrieve', eventController.retrieve); //anyone can retrieve an event by name
app.get('/event/list', eventController.list) //anyone can view any event
app.post('/program/retrieve', programController.retrieve); //anyone can retrieve a program by name
app.get('/program/list', programController.list) //anyone can view any program

/* authenticate user is logged in before fufilling request */
app.all('/*', (req, res, next) => {
  if (!req.session || !req.session.User || !req.session.User.Username) {
    res.status(401).send("Need to be logged in for this request.");
  } else {
    next();
  }
});

//these methods will check for specific user permissions before executing
require('./server/routes')(app);

module.exports = app;
