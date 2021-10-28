const db = require('../models/index');
const Program = db['program'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */
module.exports = {
  findByName: function (name) {
    return Program.findAll({
      where: {
        Name: name
      }
    })
  },
  create(req, res) {
    return Program
      .create({
        Name: req.body.Name,
        About: req.body.About
      })
      .then(Program => res.status(201).send(JSON.stringify(Program)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Program
      .findAll()
      .then(Program => res.status(200).send(JSON.stringify(Program)))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Program
      .findByName(req.params.Name)
      .then(Organizaion => {
        if (!Program) {
          return res.status(404).send({
            message: 'Program Not Found',
          });
        }
        return res.status(200).send(JSON.stringify(Program));
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Program
      .findByName(req.params.Name)
      .then(Name => {
        if (!Name) {
          return res.status(404).send({
            message: 'Program Not Found',
          });
        }
        return Program
          .update({
            Name: req.body.Name || Orgainzation.Name,
            About: req.body.About || Orgainzation.About
          })
          .then(() => res.status(200).send(JSON.stringify(Program)))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Program
      .findByName(req.params.Name)
      .then(Program => {
        if (!Program) {
          return res.status(400).send({
            message: 'Program Not Found',
          });
        }
        return Program
          .destroy()
          .then(() => res.status(200).send({ message: 'Program deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
