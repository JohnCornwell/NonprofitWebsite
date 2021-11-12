const db = require('../models/index');
const Event = db['event'];
/*The req parameter is the incoming request from the client. The res
 * parameter is the response we're preparing to eventually send back to
 * the client in response to their request */

function findByName(name) {
  return Event.findAll({
    where: {
      EventName: name
    }
  })
}

function findById(id) {
  return Event.findAll({
    where: {
      EventID: id
    }
  })
}

function retrieveByName(req, res) {
  return findByName(req.body.EventName)
    .then(Event => {
      if (Event.length == 0) {
        return res.status(404).send({
          message: 'Event Not Found',
        });
      }
      return res.status(200).send(JSON.stringify(Event));
    })
    .catch(error => res.status(400).send(error));
}

function retrieveById(req, res) {
  return findById(req.body.EventId)
    .then(Event => {
      if (Event.length == 0) {
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
      if (Event.length == 0) {
        return res.status(404).send({
          message: 'Event Not Found',
        });
      }
      return Event[0]
        .update({
          Name: req.body.EventName || Event[0].Name,
          VolunteerNeed: req.body.VolunteerNeed || Event[0].VolunteerNeed,
          DonationGoal: req.body.DonationGoal || Event[0].DonationGoal,
          Month: req.body.Month || Event[0].Month,
          Day: req.body.Day || Event[0].Day,
          Year: req.body.Year || Event[0].Year,
          StartHour: req.body.StartHour || Event[0].StartHour,
          StartMinute: req.body.StartMinute || Event[0].StartMinute,
          EndHour: req.body.EndHour || Event[0].EndHour,
          EndMinute: req.body.EndMinute || Event[0].EndMinute,
          Description: req.body.Description || Event[0].Description
        })
        .then(event => res.status(200).send(JSON.stringify(event)))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function destroy(req, res) {
  return findByName(req.body.EventName)
    .then(Event => {
      if (Event.length == 0) {
        return res.status(400).send({
          message: 'Event Not Found',
        });
      }
      return Event[0]
        .destroy()
        .then(() => res.status(200).send({ message: 'Event deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}

function volunteer(req, res) {
  return findById(req.body.EventId)
    .then(Event => {
      if (Event.length == 0) {
        return res.status(400).send({
          message: "Event not found",
        });
      } else {
        return Event[0]
          .update({
            Name: Event[0].Name,
            VolunteerNeed: req.body.VolunteerNeed,
            DonationGoal: Event[0].DonationGoal,
            Month: Event[0].Month,
            Day: Event[0].Day,
            Year: Event[0].Year,
            StartHour: Event[0].StartHour,
            StartMinute: Event[0].StartMinute,
            EndHour: Event[0].EndHour,
            EndMinute: Event[0].EndMinute,
            Description: Event[0].Description
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
      if (Event.length == 0) {
        return res.status(400).send({
          message: "Event not found",
        });
      } else {
        return Event[0]
          .update({
            Name: Event[0].Name,
            VolunteerNeed: Event[0].VolunteerNeed,
            DonationGoal: req.body.DonationGoal,
            NightNeed: Event[0].NightNeed,
            Month: Event[0].Month,
            Day: Event[0].Day,
            Year: Event[0].Year,
            StartHour: Event[0].StartHour,
            StartMinute: Event[0].StartMinute,
            EndHour: Event[0].EndHour,
            EndMinute: Event[0].EndMinute,
            Description: Event[0].Description
          })
          .then(() => res.status(200).send({ message: 'Donated successfully.' }))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  findByName: function (name) {
    return Event.findAll({
      where: {
        EventName: name
      }
    })
  },

  findById: function (id) {
    return Event.findAll({
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

  retrieveByName,

  retrieveById,

  update,

  destroy,

  volunteer,

  donate
};
