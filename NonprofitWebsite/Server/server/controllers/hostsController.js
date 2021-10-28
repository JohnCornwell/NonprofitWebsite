const db = require('../models/index');
const Hosts = db['hosts'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */
module.exports = {
  findByProgID: function (ProgId) {
    return Hosts.findAll({
      where: {
        ProgID: ProgId
      }
    })
  },

  findByEventId: function (EventId) {
    return Hosts.findAll({
      where: {
        EventID: EventId
      }
    })
  },

  create(req, res) {
    return Hosts
      .create({
        ProgID: req.body.ProgId,
        EventID: req.body.EventId
      })
      .then(Hosts => res.status(201).send(JSON.stringify(Hosts)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Hosts
      .findAll()
      .then(Hosts => res.status(200).send(JSON.stringify(Hosts)))
      .catch(error => res.status(400).send(error));
  },

  retrievePrograms(req, res) {
    return Hosts
      .findByEventId(req.params.EventId)
      .then(Hosts => {
        if (!Hosts) {
          return res.status(404).send({
            message: 'No Program relationships found',
          });
        }
        return res.status(200).send(JSON.stringify(Hosts));
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveEvents(req, res) {
    return Hosts
      .findByProgID(req.params.ProgId)
      .then(Hosts => {
        if (!Hosts) {
          return res.status(404).send({
            message: 'No Event relationships found',
          });
        }
        return res.status(200).send(JSON.stringify(Hosts));
      })
      .catch(error => res.status(400).send(error));
  },
};
