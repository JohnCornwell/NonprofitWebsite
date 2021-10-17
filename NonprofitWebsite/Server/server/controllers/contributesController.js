const db = require('../models/index');
const Contributes = db['contributes'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */
module.exports = {
  findByUser: function (id) {
    return Contributes.findAll({
      where: {
        UserId: id
      }
    })
  },

  findByOrg: function (id) {
    return Contributes.findAll({
      where: {
        OrgId: id
      }
    })
  },

  create(req, res) {
    return Contributes
      .create({
        UserId: req.body.UserId,
        OrgId: req.body.OrgId
      })
      .then(Contributes => res.status(201).send(Contributes))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Contributes
      .findAll()
      .then(Contributes => res.status(200).send(Contributes))
      .catch(error => res.status(400).send(error));
  },

  retrieveOrgs(req, res) {
    return Contributes
      .findByUser(req.params.UserId)
      .then(Contributes => {
        if (!Contributes) {
          return res.status(404).send({
            message: 'No Organization relationships found',
          });
        }
        return res.status(200).send(Contributes);
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveUsers(req, res) {
    return Contributes
      .findByOrg(req.params.OrgId)
      .then(Contributes => {
        if (!Contributes) {
          return res.status(404).send({
            message: 'No User relationships found',
          });
        }
        return res.status(200).send(Contributes);
      })
      .catch(error => res.status(400).send(error));
  },
};
