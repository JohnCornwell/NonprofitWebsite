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

const cors = require('cors');
app.use(cors({
  origin: '*'
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
  res.status(200).send({ message: "Goodbye!" });
});

app.post('/login', (req, res) => {
  req.session.regenerate((err) => {
    if (err) {
      res.status(400).send({ message: "Unable to create session." });
    } else {
      let username = req.body.Username || '';
      let password = req.body.Password || '';
      userController.findByUsername(username)
        .then(person => {
          if (person.length == 0) {
            // user does not exist
            res.status(404).send({ message: "User does not exist" });
          } else {
            // user exists
            //hash the password before adding it to the database
            const crypto = require('crypto');
            const secret = 'n0r0kvjnoi0lnfifnj9824n09hon209f';
            const hash = crypto.createHmac('sha256', secret)
              .update(req.body.Password)
              .digest('hex');
            console.log(hash);
            //check the stored password against the hash
            //todo
            if (person[0].Password == password) {
              req.session.User = person[0];
              res.status(200).send(person[0])
            } else {
              res.status(400).send({ message: "Incorrect Password" });
            }
          }})
    }
  })
});

app.post('/signup', function (req, res) {
  if (req.body.Username == undefined || req.body.Password == undefined) {
    res.status(400).send({ message: "Invalid details!" });
  } else {
    //see if user exists
    User.count({
      where: {
        Username: req.body.Username
      }
    })
      .then(User => {
        if (User == 0) {
          //the user exists

          //hash the password before adding it to the database
          const crypto = require('crypto');
          const secret = 'n0r0kvjnoi0lnfifnj9824n09hon209f';
          const hash = crypto.createHmac('sha256', secret)
            .update(req.body.Password)
            .digest('hex');
          console.log(hash);
          //set the password to the generated hash
          //todo
          userController.create(req, res)
        } else {
          // user exists, so give error
          res.status(400).send({ message: "User already exists." });
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
const userController = require('./server/controllers/userController');
//call /getHosts once, then getEventById for each Id returned
app.post('/hosts/retrievePrograms', hostsController.retrievePrograms); //req.body needs EventId
app.post('/hosts/retrieveEvents', hostsController.retrieveEvents); //req.body needs ProgId
app.post('/getEventById', (req, res, next) => {//req.body needs EventId
  res.send(JSON.stringify(eventController.findById(req.body.EventId)));
});

//anyone can retrieve an event by name or id
app.post('/event/retrieveByName', eventController.retrieveByName);
app.post('/event/retrieveById', eventController.retrieveById); 
app.get('/event/list', eventController.list) //anyone can view any event
app.post('/program/retrieve', programController.retrieve); //anyone can retrieve a program by name
app.get('/program/list', programController.list) //anyone can view any program

/* authenticate user is logged in before fufilling request */
app.all('/*', (req, res, next) => {
  if (!req.session || !req.session.User || !req.session.User.Username) {
    res.status(401).send({ message: "Need to be logged in for this request." });
  } else {
    next();
  }
});

//these methods will check for specific user permissions before executing
require('./server/routes')(app);

module.exports = app;
