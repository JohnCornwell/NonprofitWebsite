const db = require('../models/index');
const Needs = db['needs'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByEventId(EventId) {
  return Needs.findAll({
    where: {
      EventID: EventId
    }
  })
}

function findByDonationId (id) {
  return Needs.findAll({
    where: {
      DonationID: id
    }
  })
}

function retrieveDonations(req, res) {
  return findByEventId(req.body.EventId)
    .then(Needs => {
      if (!Needs) {
        return res.status(404).send({
          message: 'No Donation relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Needs));
    })
    .catch(error => res.status(400).send(error));
}

function retrieveEvents(req, res) {
  return findByDonationId(req.body.DonationId)
    .then(Needs => {
      if (!Needs) {
        return res.status(404).send({
          message: 'No Event relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Needs));
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByEventId: function (EventId) {
    return Needs.findAll({
      where: {
        EventID: EventId
      }
    })
  },

  findByDonationId: function (id) {
    return Needs.findAll({
      where: {
        DonationID: id
      }
    })
  },

  create(req, res) {
    return Needs
      .create({
        EventID: req.body.EventId,
        DonationID: req.body.DonationId
      })
      .then(Needs => res.status(200).send(JSON.stringify(Needs)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Needs
      .findAll()
      .then(Needs => res.status(200).send(JSON.stringify(Needs)))
      .catch(error => res.status(400).send(error));
  },

  retrieveDonations,

  retrieveEvents
};
