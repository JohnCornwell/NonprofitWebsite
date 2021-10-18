const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const orgController = require('../controllers/organizationController');
const donationController = require('../controllers/donationController');
const hostsController = require('../controllers/hostsController');
const supportsController = require('../controllers/supportsController');
const donatesController = require('../controllers/donatesController');
const contributesController = require('../controllers/contributesController');
const needsController = require('../controllers/needsController');

module.exports = (app) => {


  app.get('/api', (req, res) => res.status(200).send({
    message: 'This is the database API.',
  }));

  app.post('/api/user/create', userController.create(req, res));

  app.post('/api/user/getUsername', userController.retrieve(req, res));

  app.get('/api/user', userController.list(req, res)); // get all
  app.get('/api/user/:Username', userController.retrieve(req, res));
  app.put('/api/todos/:Username', userController.update(req, res));
  app.delete('/api/todos/:Username', userController.destroy(req, res));

  app.post('/api/event', eventController.create(req, res));
  app.get('/api/event', eventController.list(req, res));
};
