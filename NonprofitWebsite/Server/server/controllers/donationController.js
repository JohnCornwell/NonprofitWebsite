const db = require('../models/index');
const Donation = db['donation'];
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
      if (!Donation) {
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
      if (!Donation) {
        return res.status(404).send({
          message: 'Donation Not Found',
        });
      }
      return Donation
        .update({
          Type: req.body.Type || Donation.Type,
          Month: req.body.Month || Donation.Month,
          Day: req.body.Day || Donation.Day,
          Year: req.body.Year || Donation.Year,
          Amount: req.body.Amount || Donation.Amount,
          Description: req.body.Description || Donation.Description
        })
        .then(() => res.status(200).send(JSON.stringify(Donation)))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function destroy(req, res) {
  return findByDonationId(req.body.DonationId)
    .then(Donation => {
      if (!Donation) {
        return res.status(400).send({
          message: 'Donation Not Found',
        });
      }
      return Donation
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
