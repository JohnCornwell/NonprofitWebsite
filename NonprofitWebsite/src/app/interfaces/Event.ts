/* File containing an interface for an Event. This class is used by
 * several components to represent the stored Event data in the
 * database as well as to organize information to display to the
 * user.
 */

export interface Event {
    EventID: number,
    Name: String,
    VolunteerNeed: number,
    DonationGoal: number,
    Month: number,
    Day: number,
    Year: number,
    StartHour: number,
    StartMinute: number,
    EndHour: number,
    EndMinute: number,
    Description: String,
    Deleted: boolean,
    MonthString: String,
    DayString: String,
    YearString: String,
    StartHourString: String
    StartMinuteString: String,
    EndHourString: String,
    EndMinuteString: String
  }
