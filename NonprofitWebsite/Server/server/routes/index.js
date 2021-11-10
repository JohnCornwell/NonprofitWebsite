const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const programController = require('../controllers/programController');
const donationController = require('../controllers/donationController');
const hostsController = require('../controllers/hostsController');
const donatesController = require('../controllers/donatesController');
const volunteersController = require('../controllers/volunteersController');
const needsController = require('../controllers/needsController');

/* This is the routing file that describes certain paths to server operations.
 * Some of these operations require authentication before they can be accessed.
 * Some of these operations can only be called through specific HTML methods such
 * as GET or POST.
 */

module.exports = (app) => {

  ////////////////////////USER SECTION/////////////////////////////
  app.all('/user/retrieve', (req, res, next) => {
    if (req.session.User == null || (req.session.User.UserID != req.body.UserId &&
        req.session.User.UserType != 'Admin')) {
      //cannot view another user's info unless you are an admin
      res.status(401).send({ message: "Need to be an admin for this request." });
    } else {
      next();
    }
  });

  app.get('/user/retrieve', userController.retrieve);

  app.all('/user/update', (req, res, next) => {
    if (req.session.UserType == null || req.session.User.UserType != req.body.UserType ||
       (req.session.User.UserID != req.body.UserId && req.session.User.UserType != 'Admin')) {
      //cannot update someone else or change your own permissions
      res.status(401).send({ message: "Need to be an admin for this request." });
    } else {
      next();
    }
  });
  app.put('/user/update', userController.update);

  /* all user functions after this point require admin status */
  app.all('/user/*', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Admin') {
      res.status(401).send({ message: "Need to be an admin for this request." });
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
    if (req.session.User == null || req.session.User.UserType != 'Volunteer') {
      res.status(401).send({ message: "Need to be a volunteer for this request." });
    } else {
      next();
    }
  });

  app.post('/event/volunteer', eventController.volunteer) //volunteer for a time slot

  app.all('/event/donate', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Donor') {
      res.status(401).send({ message: "Need to be a donor for this request." });
    } else {
      next();
    }
  });

  app.post('/event/donate', eventController.donate) //restricted donation to event


  /* all user functions after this point require admin status */
  app.all('/event/*', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Admin') {
      res.status(401).send({ message: "Need to be an admin for this request." });
    } else {
      next();
    }
  });

  app.post('/event/create', eventController.create);  //used to create events by admins
  app.delete('/user/delete', eventController.destroy); //this should probably never be called

////////////////////////Program SECTION/////////////////////////////

//program retrieve already covered
//program list already covered

/* all program functions after this point require admin status */
app.all('/program/*', (req, res, next) => {
  if (req.session.User == null || req.session.User.UserType != 'Admin') {
    res.status(401).send({ message: "Need to be an admin for this request." });
  } else {
    next();
  }
});

app.put('/program/update', programController.update);
app.post('/program/create', programController.create);  //used to create admins
app.delete('/program/delete', programController.destroy); //would need to delete hosts table entries first

////////////////////////Donation SECTION/////////////////////////////

app.all('/donation/create', (req, res, next) => {
  if (req.session.User == null || req.session.User.UserType != 'Donor') {
    res.status(401).send({ message: "Need to be a donor for this request." });
  } else {
    next();
  }
});

  app.post('/donation/create', donationController.create);

  app.all('/donation/retrieve', (req, res, next) => {
    if (req.session.User == null || (req.session.User.UserType != 'Donor' &&
      req.session.User.UserType != 'Admin')) {
      res.status(401).send({ message: "Need to be a donor or admin for this request." });
    } else {
      next();
    }
  });

  app.post('/donation/retrieve', donationController.retrieve); //need DonationId

/* all user functions after this point require admin status */
app.all('/donation/*', (req, res, next) => {
  if (req.session.User == null || req.session.User.UserType != 'Admin') {
    res.status(401).send({ message: "Need to be an admin for this request." });
  } else {
    next();
  }
});

app.post('/donation/list', donationController.list);
app.post('/donation/update', donationController.update);
app.delete('/donation/delete', donationController.destroy); //do not call, provided for completeness

 ////////////////////////Donates SECTION/////////////////////////////
app.all('/donates/create', (req, res, next) => {
  if (req.session.User == null || req.session.User.UserType != 'Donor') {
    res.status(401).send({ message: "Need to be a donor for this request." });
  } else {
   next();
  }
});

  app.post('/donates/create', donatesController.create);

  app.all('/donates/retrieveDonations', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Donor' ||
      (req.body.UserId != req.session.User.UserID && req.session.User.UserType != 'Admin')) {
      // cannot get donations of other users unless you are an admin
      res.status(401).send({ message: "Need to be a donor or admin for this request." });
    } else {
      next();
    }
  });

  app.post('/donates/retrieveDonations', donatesController.retrieveDonations);

/* all user functions after this point require admin status */
 app.all('/donates/*', (req, res, next) => {
   if (req.session.User == null || req.session.User.UserType != 'Admin') {
     res.status(401).send({ message: "Need to be an admin for this request." });
   } else {
     next();
   }
 });

  app.get('/donates/list', donatesController.list);
  app.post('/donates/retrieveUsers', donatesController.retrieveUsers);

  ////////////////////////Hosts SECTION/////////////////////////////

  //getPrograms and getEvents are already covered in app.js

  /* all user functions after this point require admin status */
  app.post('/hosts/list', hostsController.list);

  app.all('/hosts/*', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Admin') {
      res.status(401).send({ message: "Need to be an admin for this request." });
    } else {
      next();
    }
  });

  app.post('/hosts/create', hostsController.create);

  ////////////////////////Needs SECTION/////////////////////////////
  app.all('/needs/create', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Donor') {
      res.status(401).send({ message: "Need to be a donor for this request." });
    } else {
      next();
    }
  });

  app.post('/needs/create', needsController.create); //add donation to event

  /* all user functions after this point require admin status */
  app.all('/needs/*', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Admin') {
      res.status(401).send({ message: "Need to be an admin for this request." });
    } else {
      next();
    }
  });

  app.get('/needs/list', needsController.list);
  app.post('/needs/retrieveEvents', needsController.retrieveEvents);
  app.post('/needs/retrieveDonations', needsController.retrieveDonations);

  ////////////////////////Volunteers SECTION/////////////////////////////
  app.all('/volunteers/create', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Volunteer') {
      res.status(401).send({ message: "Need to be a volunteer for this request." });
    } else {
      next();
    }
  });

  app.post('/volunteers/create', volunteersController.create); //volunteer for event

  app.all('/volunteers/retrieveEvents', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType == 'Donor' ||
      (req.body.UserId != req.session.User.UserID && req.session.User.UserType != 'Admin')) {
      res.status(401).send({ message: "Need to be a volunteer or admin for this request." });
    } else {
      next();
    }
  });

  app.post('/volunteers/retrieveEvents', volunteersController.retrieveEvents);

  app.all('/volunteers/update', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType == 'Donor' ||
      (req.body.UserId != req.session.User.UserID && req.session.User.UserType != 'Admin')) {
      res.status(401).send({ message: "Need to be a volunteer or admin for this request." });
    } else {
      next();
    }
  });

  app.post('/volunteers/update', volunteersController.update);

  /* all user functions after this point require admin status */
  app.all('/volunteers/*', (req, res, next) => {
    if (req.session.User == null || req.session.User.UserType != 'Admin') {
      res.status(401).send({ message: "Need to be an admin for this request." });
    } else {
      next();
    }
  });

  app.get('/volunteers/list', volunteersController.list);
  app.post('/needs/retrieveUsers', volunteersController.retrieveUsers);

};
