export default class Event {
  EventName: String;
  MorningNeed: number;
  AfternoonNeed: number;
  NightNeed: number;
  date: Date;
  Start: Date;
  End: Date;
  Description: String;

  constructor(EventName: String, MorningNeed: number, AfternoonNeed: number,
    NightNeed: number, date: Date, Start: Date, End: Date, Description: String) {
    this.EventName = EventName;
    this.MorningNeed = MorningNeed;
    this.AfternoonNeed = AfternoonNeed;
    this.NightNeed = NightNeed;
    this.date = date;
    this.Start = Start;
    this.End = End;
    this.Description = Description;
  }
}
