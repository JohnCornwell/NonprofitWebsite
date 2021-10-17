const userController = require('./userController');
const eventController = require('./eventController');
const donatesController = require('./donatesController');
const dontationController = require('./donationController');
const organizationController = require('./organizationController');
const supportsController = require('./supportsController');
const hostsController = require('./hostsController');
const needsController = require('./needsController');
const contributesController = require('./contributesController');

module.exports = {
  userController,
  donatesController,
  dontationController,
  organizationController,
  supportsController,
  hostsController,
  needsController,
  contributesController
};
