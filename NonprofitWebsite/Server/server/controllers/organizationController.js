const Organization = require('../models/organization');

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */
module.exports = {
  findByName: function (name) {
    return Organization.findAll({
      where: {
        Name: name
      }
    })
  },
  create(req, res) {
    return Organization
      .create({
        Name: req.body.Name,
        About: req.body.About
      })
      .then(Organization => res.status(201).send(Organization))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Organization
      .findAll()
      .then(Organization => res.status(200).send(Organization))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Organization
      .findByName(req.params.Name)
      .then(Organizaion => {
        if (!Organization) {
          return res.status(404).send({
            message: 'Organization Not Found',
          });
        }
        return res.status(200).send(Organization);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Organization
      .findByName(req.params.Name)
      .then(Name => {
        if (!Name) {
          return res.status(404).send({
            message: 'Organization Not Found',
          });
        }
        return Organization
          .update({
            Name: req.body.Name || Orgainzation.Name,
            About: req.body.About || Orgainzation.About
          })
          .then(() => res.status(200).send(Organization))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Organization
      .findByName(req.params.Name)
      .then(Organization => {
        if (!Organization) {
          return res.status(400).send({
            message: 'Organization Not Found',
          });
        }
        return Organization
          .destroy()
          .then(() => res.status(200).send({ message: 'Organization deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
