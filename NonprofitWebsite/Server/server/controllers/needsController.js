const Needs = require('../models/needs');

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */
module.exports = {
  findByEventId: function (EventId) {
    return Needs.findAll({
      where: {
        EventId: EventId
      }
    })
  },

  findByDonationId: function (id) {
    return Needs.findAll({
      where: {
        DonationId: id
      }
    })
  },

  create(req, res) {
    return Needs
      .create({
        EventId: req.body.EventId,
        DonationId: req.body.DonationId
      })
      .then(Needs => res.status(201).send(Needs))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Needs
      .findAll()
      .then(Needs => res.status(200).send(Needs))
      .catch(error => res.status(400).send(error));
  },

  retrieveDonations(req, res) {
    return Needs
      .findByEventId(req.params.EventId)
      .then(Needs => {
        if (!Needs) {
          return res.status(404).send({
            message: 'No Donation relationships found',
          });
        }
        return res.status(200).send(Needs);
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveEvents(req, res) {
    return Needs
      .findByDonationId(req.params.DonationId)
      .then(Needs => {
        if (!Needs) {
          return res.status(404).send({
            message: 'No Event relationships found',
          });
        }
        return res.status(200).send(Needs);
      })
      .catch(error => res.status(400).send(error));
  },
};