/* Interface describing the volunteers table in the database. This
 * interface is used to assist the volunteer pages in diplaying
 * events that the volunter had signed up for at some time.
 */

export interface Volunteers {
  UserID: number,
  EventID: number,
  Deleted: boolean
}
