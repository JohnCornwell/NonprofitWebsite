const Event = require('../models').Event;

module.exports = {
  create(req, res) {
    return Event
      .create({
        Name: req.body.Name,
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
};
