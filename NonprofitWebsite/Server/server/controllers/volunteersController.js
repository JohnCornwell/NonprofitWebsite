const db = require('../models/index');
const Volunteers = db['volunteers'];
/*
 * This file is responsible for sending SQL queries to the database.
 * The queries in this file pertain to the  table.volunteers
 */

/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request
 */

function findByUser(id) {
  return Volunteers.findAll({
    where: {
      UserID: id
    }
  })
}

function findByEvent (id) {
  return Volunteers.findAll({
    where: {
      EventID: id
    }
  })
}

function findByUserAndEvent(UserId, EventId) {
  return Volunteers.findAll({
    where: {
      UserID: UserId,
      EventID: EventId
    }
  })
}

function retrieveEvents(req, res) {
  return findByUser(req.body.UserId)
    .then(Volunteers => {
      if (Volunteers.length == 0) {
        return res.status(404).send({
          message: 'No Event relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Volunteers));
    })
    .catch(error => res.status(400).send(error));
}

function retrieveUsers(req, res) {
  return findByEvent(req.body.EventId)
    .then(Volunteers => {
      if (Volunteers.length == 0) {
        return res.status(404).send({
          message: 'No User relationships found',
        });
      }
      return res.status(200).send(JSON.stringify(Volunteers));
    })
    .catch(error => res.status(400).send(error));
}

function update(req, res) {
  return findByUserAndEvent(req.body.UserId, req.body.EventId)
    .then(Volunteers => {
      if (Volunteers.length == 0) {
        return res.status(404).send({
          message: 'No User relationships found',
        });
      } else {
        return Volunteers[0].update({
          UserID: req.body.UserId,
          EventID: req.body.EventId,
          Deleted: req.body.Deleted
        })
        .then(volunteers => res.status(200).send(JSON.stringify(volunteers)))  // Send back the updated User.
        .catch((error) => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByUser: function (id) {
    return Volunteers.findAll({
      where: {
        UserID: id
      }
    })
  },

  findByEvent: function (id) {
    return Volunteers.findAll({
      where: {
        EventID: id
      }
    })
  },

  create(req, res) {
    return Volunteers
      .create({
        UserID: req.body.UserId,
        EventID: req.body.EventId,
        Deleted: req.body.Deleted
      })
      .then(Volunteers => res.status(200).send(JSON.stringify(Volunteers)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Volunteers
      .findAll()
      .then(Volunteers => res.status(200).send(JSON.stringify(Volunteers)))
      .catch(error => res.status(400).send(error));
  },

  retrieveEvents,

  retrieveUsers,

  update
};
