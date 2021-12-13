var DataTypes = require("sequelize").DataTypes;
var _donates = require("./donates");
var _donation = require("./donation");
var _event = require("./event");
var _hosts = require("./hosts");
var _needs = require("./needs");
var _program = require("./program");
var _user = require("./user");
var _volunteers = require("./volunteers");

function initModels(sequelize) {
  var donates = _donates(sequelize, DataTypes);
  var donation = _donation(sequelize, DataTypes);
  var event = _event(sequelize, DataTypes);
  var hosts = _hosts(sequelize, DataTypes);
  var needs = _needs(sequelize, DataTypes);
  var program = _program(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var volunteers = _volunteers(sequelize, DataTypes);

  /*
   * This file defines relationships between tables.
   */

  donates.belongsTo(donation, { as: "Donation", foreignKey: "DonationID"});
  donation.hasMany(donates, { as: "donates", foreignKey: "DonationID"});
  needs.belongsTo(donation, { as: "Donation", foreignKey: "DonationID"});
  donation.hasMany(needs, { as: "needs", foreignKey: "DonationID"});
  hosts.belongsTo(event, { as: "Event", foreignKey: "EventID"});
  event.hasMany(hosts, { as: "hosts", foreignKey: "EventID"});
  needs.belongsTo(event, { as: "Event", foreignKey: "EventID"});
  event.hasMany(needs, { as: "needs", foreignKey: "EventID"});
  volunteers.belongsTo(event, { as: "Event", foreignKey: "EventID"});
  event.hasMany(volunteers, { as: "volunteers", foreignKey: "EventID"});
  hosts.belongsTo(program, { as: "Prog", foreignKey: "ProgID"});
  program.hasMany(hosts, { as: "hosts", foreignKey: "ProgID"});
  donates.belongsTo(user, { as: "User", foreignKey: "UserID"});
  user.hasMany(donates, { as: "donates", foreignKey: "UserID"});
  volunteers.belongsTo(user, { as: "User", foreignKey: "UserID"});
  user.hasMany(volunteers, { as: "volunteers", foreignKey: "UserID"});

  return {
    donates,
    donation,
    event,
    hosts,
    needs,
    program,
    user,
    volunteers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
