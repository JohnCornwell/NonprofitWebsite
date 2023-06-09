const db = require('../models/index');
const Hosts = db['hosts'];
/*
 * This file is responsible for sending SQL queries to the database.
 * The queries in this file pertain to the hosts table.
 */

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByProgId(ProgId) {
  return Hosts.findAll({
    where: {
      ProgID: ProgId
    }
  })
}

function findByEventId(EventId) {
  return Hosts.findAll({
    where: {
      EventID: EventId
    }
  })
}

function retrievePrograms(req, res) {
  return findByEventId(req.body.EventId)
    .then(Hosts => {
      if (Hosts.length == 0) {
        return res.status(404).send({
          message: 'No Program relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Hosts));
    })
    .catch(error => res.status(400).send(error));
}

function retrieveEvents(req, res) {
  return findByProgId(req.body.ProgId)
    .then(Hosts => {
      if (Hosts.length == 0) {
        return res.status(404).send({
          message: 'No Event relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Hosts));
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByProgId: function (ProgId) {
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
      .then(Hosts => res.status(200).send(JSON.stringify(Hosts)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Hosts
      .findAll()
      .then(Hosts => res.status(200).send(JSON.stringify(Hosts)))
      .catch(error => res.status(400).send(error));
  },

  retrievePrograms,

  retrieveEvents
};
