/* Interface describing an entry in the volunteers table in the 
 * database. This interface is used to assist the volunteer 
 * pages in displaying events that the volunter had signed 
 * up for at some time.
 */

export interface Volunteer {
    UserID: number,
    EventID: number,
    Deleted: boolean
}