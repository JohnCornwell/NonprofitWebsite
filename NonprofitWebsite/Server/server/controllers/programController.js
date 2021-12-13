const db = require('../models/index');
const Program = db['program'];
/*
 * This file is responsible for sending SQL queries to the database.
 * The queries in this file pertain to the program table.
 */

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByName (name) {
  return Program.findAll({
    where: {
      Name: name
    }
  })
}

function retrieve(req, res) {
  return findByName(req.body.Name)
    .then(Program => {
      if (Program.length == 0) {
        return res.status(404).send({
          message: 'Program Not Found',
        });
      }
      return res.status(200).send(JSON.stringify(Program));
    })
    .catch(error => res.status(400).send(error));
}

function update(req, res) {
  return findByName(req.body.Name)
    .then(Name => {
      if (Name.length == 0) {
        return res.status(404).send({
          message: 'Program Not Found',
        });
      }
      return Program[0]
        .update({
          Name: req.body.Name || Program[0].Name,
          About: req.body.About || Program[0].About
        })
        .then(() => res.status(200).send(JSON.stringify(Program[0])))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function destroy(req, res) {
  return findByName(req.body.Name)
    .then(Program => {
      if (Program.length == 0) {
        return res.status(400).send({
          message: 'Program Not Found',
        });
      }
      return Program[0]
        .destroy()
        .then(() => res.status(200).send({ message: 'Program deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}


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
      .then(Program => res.status(200).send(JSON.stringify(Program)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Program
      .findAll()
      .then(Program => res.status(200).send(JSON.stringify(Program)))
      .catch(error => res.status(400).send(error));
  },

  retrieve,

  update,

  destroy
};
