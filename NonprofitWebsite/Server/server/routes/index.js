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

  app.use('/user')
  app.post('/api/user/create', userController.create);
  app.post('/api/user/getUsername', userController.retrieve);

  app.get('/api/user/list', userController.list); // get all
  app.get('/api/user/retrieve', userController.retrieve);
  app.put('/api/user/update', userController.update);
  app.delete('/api/user/delete', userController.destroy); //do not call this. Use update to soft delete

  app.post('/api/event', eventController.create);
  app.get('/api/event', eventController.list);
};
