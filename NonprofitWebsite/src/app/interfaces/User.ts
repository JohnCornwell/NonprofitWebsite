/* Interface describing the user table in the database. This
 * interface is used to assist the admin, donor, and vlunteer
 * pages in displaying user info.
 */

export interface User {
    UserID: number,
    Username: number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    UserType: string,
    Deleted: boolean,
    Password: string
  }