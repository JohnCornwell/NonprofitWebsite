/* Interface describing the users table in the database. This
 * interface is used to assist the admin pages in displaying
 * the system users.
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