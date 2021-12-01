/* Interface describing the user table in the database. This
 * interface is used to assist the admin, donor, and vlunteer
 * pages in displaying user info.
 */

export interface User {
  UserID: number,
  Username: String,
  //we will not save the user password in memory
  FirstName: String,
  MiddleName: String,
  LastName: String,
  UserType: String,
  Deleted: boolean
}
