/* Interface describing the doantion table in the database. This
 * interface is used to assist the donor pages in displaying
 * donor has made.
 */

export interface Donation {
  DonationID: number,
  Amount: number,
  Description: String,
  Type: String,
  Deleted: boolean,
  Month: number,
  Day: number,
  Year: number,
  MonthString: String,
  DayString: String,
  YearString: String,
  EventName: String //name of associated event of this is a restricted donation
}
