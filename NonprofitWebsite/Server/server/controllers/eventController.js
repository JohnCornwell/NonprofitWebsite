const db = require('../models/index');
const Event = db['event'];

module.exports = {
  findByName: function (name) {
    return db.Event.findAll({
      where: {
        EventName: name
      }
    })
  },

  findById(req, res) {
    return Event.findAll({
      where: {
        EventId: req.body.EventId
      }
    }).then(Event => res.status.send(Event));
  },

  create(req, res) {
    return Event
      .create({
        Name: req.body.EventName,
        MorningNeed: req.body.MoriningNeed,
        AfternoonNeed: req.body.AfternoonNeed,
        NightNeed: req.body.NightNeed,
        Month: req.body.Month,
        Day: req.body.Day,
        Year: req.body.Year,
        StartHour: req.body.StartHour,
        StartMinute: req.body.StartMinute,
        EndHour: req.body.EndHour,
        EndMinute: req.body.EndMinute,
        Description: req.body.Description
      })
      .then(Event => res.status(201).send(Event))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Event
      .findAll()
      .then(Event => res.status(200).send(Event))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Event
      .findByName(req.params.EventName)
      .then(Event => {
        if (!Event) {
          return res.status(404).send({
            message: 'Event Not Found',
          });
        }
        return res.status(200).send(Event);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Event
      .findByName(req.params.EventName)
      .then(Event => {
        if (!Event) {
          return res.status(404).send({
            message: 'Event Not Found',
          });
        }
        return Event
          .update({
            Name: req.body.EventName || Event.Name,
            MorningNeed: req.body.MoriningNeed || Event.MoriningNeed,
            AfternoonNeed: req.body.AfternoonNeed || Event.AfternoonNeed,
            NightNeed: req.body.NightNeed || Event.NightNeed,
            Month: req.body.Month || Event.Month,
            Day: req.body.Day || Event.Day,
            Year: req.body.Year || Event.Year,
            StartHour: req.body.StartHour || Event.StartHour,
            StartMinute: req.body.StartMinute || Event.StartMinute,
            EndHour: req.body.EndHour || Event.EndHour,
            EndMinute: req.body.EndMinute || Event.EndMinute,
            Description: req.body.Description || Event.Description
          })
          .then(() => res.status(200).send(Event))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Event
      .findName(req.params.EventName)
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
  },

  volunter(req, res) {
    return Event
      .findById(req.params.EventId)
      .then(Event => {
        if (!Event) {
          return res.status(400).send({
            message: "Event not found",
          });
        }
        if (req.body.MoriningNeed) {
          return Event
            .update({
              Name: Event.Name,
              MorningNeed: req.body.MoriningNeed,
              AfternoonNeed: Event.AfternoonNeed,
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
        } else if (req.body.AfternoonNeed) {
          return Event
            .update({
              Name: Event.Name,
              MorningNeed: Event.MoriningNeed,
              AfternoonNeed: req.body.AfternoonNeed,
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
        } else {
          return Event
            .update({
              Name: Event.Name,
              MorningNeed: Event.MoriningNeed,
              AfternoonNeed: Event.AfternoonNeed,
              NightNeed: req.body.NightNeed,
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

};
