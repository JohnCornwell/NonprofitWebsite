var DataTypes = require("sequelize").DataTypes;
var _contributes = require("./contributes");
var _donates = require("./donates");
var _donation = require("./donation");
var _event = require("./event");
var _hosts = require("./hosts");
var _needs = require("./needs");
var _organization = require("./organization");
var _supports = require("./supports");
var _user = require("./user");

function initModels(sequelize) {
  var contributes = _contributes(sequelize, DataTypes);
  var donates = _donates(sequelize, DataTypes);
  var donation = _donation(sequelize, DataTypes);
  var event = _event(sequelize, DataTypes);
  var hosts = _hosts(sequelize, DataTypes);
  var needs = _needs(sequelize, DataTypes);
  var organization = _organization(sequelize, DataTypes);
  var supports = _supports(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  donates.belongsTo(donation, { as: "Donation", foreignKey: "DonationID"});
  donation.hasMany(donates, { as: "donates", foreignKey: "DonationID"});
  needs.belongsTo(donation, { as: "Donation", foreignKey: "DonationID"});
  donation.hasMany(needs, { as: "needs", foreignKey: "DonationID"});
  contributes.belongsTo(event, { as: "Event", foreignKey: "EventID"});
  event.hasMany(contributes, { as: "contributes", foreignKey: "EventID"});
  hosts.belongsTo(event, { as: "Event", foreignKey: "EventID"});
  event.hasMany(hosts, { as: "hosts", foreignKey: "EventID"});
  needs.belongsTo(event, { as: "Event", foreignKey: "EventID"});
  event.hasMany(needs, { as: "needs", foreignKey: "EventID"});
  donation.belongsTo(organization, { as: "Org", foreignKey: "OrgID"});
  organization.hasMany(donation, { as: "donations", foreignKey: "OrgID"});
  hosts.belongsTo(organization, { as: "Org", foreignKey: "OrgID"});
  organization.hasMany(hosts, { as: "hosts", foreignKey: "OrgID"});
  supports.belongsTo(organization, { as: "Org", foreignKey: "OrgID"});
  organization.hasMany(supports, { as: "supports", foreignKey: "OrgID"});
  contributes.belongsTo(user, { as: "User", foreignKey: "UserID"});
  user.hasMany(contributes, { as: "contributes", foreignKey: "UserID"});
  donates.belongsTo(user, { as: "User", foreignKey: "UserID"});
  user.hasMany(donates, { as: "donates", foreignKey: "UserID"});
  donation.belongsTo(user, { as: "User", foreignKey: "UserID"});
  user.hasMany(donation, { as: "donations", foreignKey: "UserID"});
  supports.belongsTo(user, { as: "User", foreignKey: "UserID"});
  user.hasMany(supports, { as: "supports", foreignKey: "UserID"});

  return {
    contributes,
    donates,
    donation,
    event,
    hosts,
    needs,
    organization,
    supports,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
