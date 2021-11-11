/* Interface describing the needs table in the database. This
 * interface is used to assist the donor pages in displaying
 * donations to events.
 */

export interface Needs {
  DonationID: number,
  EventID: number
}
