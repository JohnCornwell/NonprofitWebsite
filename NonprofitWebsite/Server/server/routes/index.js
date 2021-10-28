const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const programController = require('../controllers/programController');
const donationController = require('../controllers/donationController');
const hostsController = require('../controllers/hostsController');
const donatesController = require('../controllers/donatesController');
const volunteersController = require('../controllers/volunteersController');
const needsController = require('../controllers/needsController');

module.exports = (app) => {

  ////////////////////////USER SECTION/////////////////////////////
  app.all('/user/retrieve', (req, res, next) => {
    if (req.session.User.UserID != req.body.UserID && req.session.User.UserType != 'Admin') {
      //cannot view another user's info unless you are an admin
      res.status(401).send("Need to be an admin for this request.");
    } else {
      next();
    }
  });

  app.get('/user/retrieve', userController.retrieve);

  app.all('/user/update', (req, res, next) => {
    if ((req.session.User.UserID != req.body.UserID && req.session.User.UserType != 'Admin') ||
        (req.session.UserType != null && req.session.User.UserType != req.body.UserType)) {
      //cannot update someone else or change your own permissions
      res.status(401).send("Need to be an admin for this request.");
    } else {
      next();
    }
  });
  app.put('/user/update', userController.update);

  /* all user functions after this point require admin status */
  app.all('/user/*', (req, res, next) => {
    if (req.session.User.UserType != 'Admin') {
      res.status(401).send("Need to be an admin for this request.");
    } else {
      next();
    }
  });

  app.post('/user/create', userController.create);  //used to create admins
  app.get('/user/list', userController.list); // get all
  app.delete('/user/delete', userController.destroy); //do not call this. Use update to soft delete

  ////////////////////////Event SECTION/////////////////////////////

  //event retrieve already covered
  //event list already covered

  app.all('/event/volunteer', (req, res, next) => {
    if (req.session.User.UserType != 'Volunteer') {
      res.status(401).send("Need to be an volunteer for this request.");
    } else {
      next();
    }
  });

  app.post('event/volunteer', eventController.volunteer) //volunteer for a time slot

  /* all user functions after this point require admin status */
  app.all('/event/*', (req, res, next) => {
    if (req.session.User.UserType != 'Admin') {
      res.status(401).send("Need to be an admin for this request.");
    } else {
      next();
    }
  });

  app.post('/event/create', eventController.create);  //used to create events by admins
  app.delete('/user/delete', eventController.destroy); //do not call this. Use update to soft delete
};
