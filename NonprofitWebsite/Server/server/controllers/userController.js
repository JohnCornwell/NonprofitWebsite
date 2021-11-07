const db = require('../models/index');
const User = db['user'];

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByUsername (username) {
  return User.findAll({
    where: {
      Username: username
    }
  })
}

function retrieve(req, res) {
  return findByUsername(req.body.Username)
    .then(User => {
      if (!User) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(JSON.stringify(User));
    })
    .catch(error => res.status(400).send(error));
}

function update(req, res) {
  return findByUsername(req.body.Username)
    .then(User => {
      if (!User) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return User
        .update({
          Username: req.body.Username || User.Username,
          Password: req.body.Password || User.Password,
          FirstName: req.body.FirstName || User.FirstName,
          MiddleName: req.body.MiddleName || User.MiddleName,
          LastName: req.body.LastName || User.LastName,
          UserType: req.body.UserType || User.UserType,
          Deleted: req.body.Deleted || User.Deleted,
        })
        .then(() => res.status(200).send(JSON.stringify(User)))  // Send back the updated User.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function destroy(req, res) {
  return findByUsername(req.body.Username)
    .then(User => {
      if (!User) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return User
        .destroy()
        .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByUsername: function (username) {
    return User.findAll({
      where: {
        Username: username
      }
    })
  },
  create(req, res) {
    return User
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName || '',
        LastName: req.body.LastName,
        UserType: req.body.UserType,
        Deleted: req.body.Deleted,
      })
      .then(User => res.status(200).send(JSON.stringify(User)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return User
      .findAll()
      .then(User => res.status(200).send(JSON.stringify(User)))
      .catch(error => res.status(400).send(error));
  },

  retrieve,

  update,

  destroy
};
