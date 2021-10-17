const db = require('../models/index');
const Supports = db['supports'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */
module.exports = {
  findByUserId: function (id) {
    return Supports.findAll({
      where: {
        UserId: id
      }
    })
  },

  findByOrgId: function (id) {
    return Supports.findAll({
      where: {
        OrgId: id
      }
    })
  },

  create(req, res) {
    return Supports
      .create({
        UserId: req.body.UserId,
        OrgId: req.body.OrgId
      })
      .then(Supports => res.status(201).send(Supports))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Supports
      .findAll()
      .then(Supports => res.status(200).send(Supports))
      .catch(error => res.status(400).send(error));
  },

  retrieveOrganizations(req, res) {
    return Supports
      .findByUserId(req.params.UserId)
      .then(Supports => {
        if (!Supports) {
          return res.status(404).send({
            message: 'No Organization relationships found',
          });
        }
        return res.status(200).send(Supports);
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveUsers(req, res) {
    return Supports
      .findByOrgId(req.params.OrgId)
      .then(Supports => {
        if (!Supports) {
          return res.status(404).send({
            message: 'No User relationships found',
          });
        }
        return res.status(200).send(Supports);
      })
      .catch(error => res.status(400).send(error));
  },
};
