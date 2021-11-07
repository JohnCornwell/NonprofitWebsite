const db = require('../models/index');
const Donates = db['donates'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByUserId(id) {
  return Donates.findAll({
    where: {
      UserID: id
    }
  })
}

function findByDonationId(id) {
  return Donates.findAll({
    where: {
      DonationID: id
    }
  })
}

function retrieveDonations(req, res) {
  return findByUserId(req.body.UserId)
    .then(Donates => {
      if (!Donates) {
        return res.status(404).send({
          message: 'No Donation relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Donates));
    })
    .catch(error => res.status(400).send(error));
}

function retrieveUsers(req, res) {
  return findByDonationId(req.body.DonationId)
    .then(Donates => {
      if (!Donates) {
        return res.status(404).send({
          message: 'No User relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Donates));
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByUserId: function (id) {
    return Donates.findAll({
      where: {
        UserID: id
      }
    })
  },

  findByDonationId: function (id) {
    return Donates.findAll({
      where: {
        DonationID: id
      }
    })
  },

  create(req, res) {
    return Donates
      .create({
        UserID: req.body.UserId,
        DonationID: req.body.DonationId
      })
      .then(Donates => res.status(201).send(JSON.stringify(Donates)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Donates
      .findAll()
      .then(Donates => res.status(200).send(JSON.stringify(Donates)))
      .catch(error => res.status(400).send(error));
  },

  retrieveDonations,

  retrieveUsers
};
