const db = require('../models/index');
const Event = db['event'];
/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByName(name) {
  return db.Event.findAll({
    where: {
      EventName: name
    }
  })
}

function findById(id) {
  return db.Event.findAll({
    where: {
      EventID: id
    }
  })
}

function retrieve(req, res) {
  return findByName(req.body.EventName)
    .then(Event => {
      if (!Event) {
        return res.status(404).send({
          message: 'Event Not Found',
        });
      }
      return res.status(200).send(JSON.stringify(Event));
    })
    .catch(error => res.status(400).send(error));
}

function update(req, res) {
  return findByName(req.body.EventName)
    .then(Event => {
      if (!Event) {
        return res.status(404).send({
          message: 'Event Not Found',
        });
      }
      return Event
        .update({
          Name: req.body.EventName || Event.Name,
          VolunteerNeed: req.body.VolunteerNeed || Event.VolunteerNeed,
          DonationGoal: req.body.DonationGoal || Event.DonationGoal,
          Month: req.body.Month || Event.Month,
          Day: req.body.Day || Event.Day,
          Year: req.body.Year || Event.Year,
          StartHour: req.body.StartHour || Event.StartHour,
          StartMinute: req.body.StartMinute || Event.StartMinute,
          EndHour: req.body.EndHour || Event.EndHour,
          EndMinute: req.body.EndMinute || Event.EndMinute,
          Description: req.body.Description || Event.Description
        })
        .then(() => res.status(200).send(JSON.stringify(Event)))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function destroy(req, res) {
  return findByName(req.body.EventName)
    .then(Event => {
      if (!Event) {
        return res.status(400).send({
          message: 'Event Not Found',
        });
      }
      return Event
        .destroy()
        .then(() => res.status(200).send({ message: 'Event deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}

function volunteer(req, res) {
  return findById(req.body.EventId)
    .then(Event => {
      if (!Event) {
        return res.status(400).send({
          message: "Event not found",
        });
      } else {
        return Event
          .update({
            Name: Event.Name,
            VolunteerNeed: req.body.VolunteerNeed,
            DonationGoal: Event.DonationGoal,
            NightNeed: Event.NightNeed,
            Month: Event.Month,
            Day: Event.Day,
            Year: Event.Year,
            StartHour: Event.StartHour,
            StartMinute: Event.StartMinute,
            EndHour: Event.EndHour,
            EndMinute: Event.EndMinute,
            Description: Event.Description
          })
          .then(() => res.status(200).send({ message: 'Volunteered successfully.' }))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
}

function donate(req, res) {
  return findById(req.body.EventId)
    .then(Event => {
      if (!Event) {
        return res.status(400).send({
          message: "Event not found",
        });
      } else {
        return Event
          .update({
            Name: Event.Name,
            VolunteerNeed: Event.VolunteerNeed,
            DonationGoal: req.body.DonationGoal,
            NightNeed: Event.NightNeed,
            Month: Event.Month,
            Day: Event.Day,
            Year: Event.Year,
            StartHour: Event.StartHour,
            StartMinute: Event.StartMinute,
            EndHour: Event.EndHour,
            EndMinute: Event.EndMinute,
            Description: Event.Description
          })
          .then(() => res.status(200).send({ message: 'Volunteered successfully.' }))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByName: function (name) {
    return db.Event.findAll({
      where: {
        EventName: name
      }
    })
  },

  findById: function (id) {
    return db.Event.findAll({
      where: {
        EventID: id
      }
    })
  },

  create(req, res) {
    return Event
      .create({
        Name: req.body.EventName,
        VolunteerNeed: req.body.VolunteerNeed,
        DonationGoal: req.body.DonationGoal,
        Month: req.body.Month,
        Day: req.body.Day,
        Year: req.body.Year,
        StartHour: req.body.StartHour,
        StartMinute: req.body.StartMinute,
        EndHour: req.body.EndHour,
        EndMinute: req.body.EndMinute,
        Description: req.body.Description
      })
      .then(Event => res.status(200).send(JSON.stringify(Event)))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Event
      .findAll()
      .then(Event => res.status(200).send(JSON.stringify(Event)))
      .catch(error => res.status(400).send(error));
  },

  retrieve,

  update,

  destroy,

  volunteer,

  donate
};
