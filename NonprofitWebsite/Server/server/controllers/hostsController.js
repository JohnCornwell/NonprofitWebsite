const db = require('../models/index');
const Hosts = db['hosts'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */
module.exports = {
  findByOrgID: function (OrgId) {
    return Hosts.findAll({
      where: {
        OrgId: OrgId
      }
    })
  },

  findByEventId: function (EventId) {
    return Hosts.findAll({
      where: {
        EventId: EventId
      }
    })
  },

  create(req, res) {
    return Hosts
      .create({
        OrgId: req.body.OrgId,
        EventId: req.body.EventId
      })
      .then(Donates => res.status(201).send(Hosts))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Hosts
      .findAll()
      .then(Hosts => res.status(200).send(Hosts))
      .catch(error => res.status(400).send(error));
  },

  retrieveOrganizations(req, res) {
    return Hosts
      .findByEventId(req.params.EventId)
      .then(Hosts => {
        if (!Hosts) {
          return res.status(404).send({
            message: 'No Organization relationships found',
          });
        }
        return res.status(200).send(Hosts);
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveEvents(req, res) {
    return Hosts
      .findByOrgID(req.params.OrgId)
      .then(Hosts => {
        if (!Hosts) {
          return res.status(404).send({
            message: 'No Event relationships found',
          });
        }
        return res.status(200).send(Hosts);
      })
      .catch(error => res.status(400).send(error));
  },
};
