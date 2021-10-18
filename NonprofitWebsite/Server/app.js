const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./server/models/index');
const User = db['user'];
//database connection defined in models
// a variable to save a session
var session; //WE NEED A SESSION STORE

// Set up the express app
const app = express();

// Set up session info
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "n0r0kvjnoi0lnfifnj9824n09hon209f",
  //store: 
  cookie: { maxAge: oneDay },
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

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('localhost:4200/');
});

app.post('/login', (req, res) => {
  session.regenerate((err) => {
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
          session.User = User;
        } else {
          res.status(400).send("Incorrect Password");
        }
      }
    }
});

app.post('/signup', function (req, res) {
  if (!req.body.id || !req.body.password) {
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
            .then(User => res.redirect('/'))
            .catch(error => res.status(400).send(error));
        } else {
          // user exists, so give error

        }
      });
  }
});

/* authenticate user before fufilling request */
app.all('/api/', (req, res, next) => {
  if (!req.session || !req.session.Username) {
    res.status(401).send();
  } else {
    next();
  }
});

require('./server/routes')(app);

// Setup a default catch-all route
app.get('*', (req, res) => {
  res.redirect('/');
});

  module.exports = app;
