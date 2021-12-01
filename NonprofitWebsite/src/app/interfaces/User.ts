/* Interface describing the user table in the database. This
 * interface is used to assist the admin, donor, and vlunteer
 * pages in displaying user info.
 */

export interface User {
  UserID: number,
  //we will not store the user password in memory
    Username: String,
  FirstName: String,
  MiddleName: String,
  LastName: String,
  UserType: String,
    Deleted: boolean
  }
