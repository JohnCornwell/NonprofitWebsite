const userController = require('../controllers').User;
const eventController = require('../controllers').Event;
const orgController = require('../controllers').Org;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'This is the database API.',
  }));

  app.post('/api/user', userController.create);
  app.get('/api/user', userController.list); // get all
  app.get('/api/user/:Username', userController.retrieve);
  app.put('/api/todos/:Username', userController.update);
  app.delete('/api/todos/:Username', userController.destroy);

  app.post('/api/event', eventController.create);
  app.get('/api/event', eventController.list);
};
