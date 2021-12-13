const db = require('../models/index');
const Donation = db['donation'];
/*
 * This file is responsible for sending SQL queries to the database.
 * The queries in this file pertain to the donation table.
 */

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByDonationId(DonationId) {
  return Donation.findAll({
    where: {
      DonationID: DonationId
    }
  })
}

function retrieve(req, res) {
  return findByDonationId(req.body.DonationId)
    .then(Donation => {
      if (Donation.length == 0) {
        return res.status(404).send({
          message: 'Donation Not Found',
        });
      }
      return res.status(200).send(JSON.stringify(Donation));
    })
    .catch(error => res.status(400).send(error));
}

function update(req, res) {
  return findByDonationId(req.body.DonationId)
    .then(Donation => {
      if (Donation.length == 0) {
        return res.status(404).send({
          message: 'Donation Not Found',
        });
      }
      return Donation[0]
        .update({
          Type: req.body.Type || Donation[0].Type,
          Month: req.body.Month || Donation[0].Month,
          Day: req.body.Day || Donation[0].Day,
          Year: req.body.Year || Donation[0].Year,
          Amount: req.body.Amount || Donation[0].Amount,
          Description: req.body.Description || Donation[0].Description
        })
        .then(donation => res.status(200).send(JSON.stringify(donation)))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function destroy(req, res) {
  return findByDonationId(req.body.DonationId)
    .then(Donation => {
      if (Donation.length == 0) {
        return res.status(400).send({
          message: 'Donation Not Found',
        });
      }
      return Donation[0]
        .destroy()
        .then(() => res.status(200).send({ message: 'Donation deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByDonationId: function (DonationId) {
    return Donation.findAll({
      where: {
        DonationID: DonationId
      }
    })
  },
  create(req, res) {
    return Donation
      .create({
        Type: req.body.Type,
        Month: req.body.Month,
        Day: req.body.Day,
        Year: req.body.Year,
        Amount: req.body.Amount,
        Description: req.body.Description
      })
      .then(Donation => res.status(200).send(JSON.stringify(Donation)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Donation
      .findAll()
      .then(Donation => res.status(200).send(JSON.stringify(Donation)))
      .catch(error => res.status(400).send(error));
  },

  retrieve,

  update,

  destroy
};
