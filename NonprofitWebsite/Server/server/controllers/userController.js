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

function findById(id) {
  return User.findAll({
    where: {
      UserID: id
    }
  })
}

function retrieve(req, res) {
  return findByUsername(req.body.Username)
    .then(User => {
      if (User.length == 0) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(JSON.stringify(User));
    })
    .catch(error => res.status(400).send(error));
}

function retrieveById(req, res) {
  return findById(req.body.UserId)
    .then(User => {
      if (User.length == 0) {
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
      if (User.length == 0) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return User[0]
        .update({
          Username: req.body.Username || User[0].Username,
          Password: req.body.Password || User[0].Password,
          FirstName: req.body.FirstName || User[0].FirstName,
          MiddleName: req.body.MiddleName || User[0].MiddleName,
          LastName: req.body.LastName || User[0].LastName,
          UserType: req.body.UserType || User[0].UserType,
          Deleted: req.body.Deleted || User[0].Deleted,
        })
        .then(user => res.status(200).send(JSON.stringify(user)))  // Send back the updated User.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function del(req, res) {
  return findById(req.body.UserId)
    .then(User => {
      if (User.length == 0) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return User[0]
        .update({
          Username: User[0].Username,
          Password: User[0].Password,
          FirstName: User[0].FirstName,
          MiddleName: User[0].MiddleName,
          LastName: User[0].LastName,
          UserType: User[0].UserType,
          //used for both delete and renew
          Deleted: req.body.Deleted
        })
        .then(user => res.status(200).send(JSON.stringify(user)))  // Send back the updated User.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
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

  retrieveById,

  update,

  del
};
