import { Model, Modifiers } from 'objection'
import CalendarDate from './CalendarDate'
import Trip from './Trip'
import Calendar from './Calendar'
import Feed from './Feed'

export default class Service extends Model {
    id!:string
    feedId!:string

    calendarDate?:CalendarDate
    trip?:Trip
    calendar?:Calendar
    feed?:Feed

    static tableName='services'

    static modifiers:Modifiers = {
        idPrimaryKey(){
            return ['id', 'feedId']
        }
    }

    static relationMappings = () => ({
        calendarDate: {
            relation: Model.HasManyRelation,
            modelClass: CalendarDate,
            join: {
                from: ['services.id', 'services.feedId'],
                to: ['calendarDates.serviceId', 'calendarDates.feedId']
            }
        },
        trip: {
            relation: Model.HasManyRelation,
            modelClass: Trip,
            join:{
                from: ['services.id', 'services.feedId'],
                to: ['trips.serviceId', 'trips.feedId']
            }
        },
        calendar: {
            relation: Model.HasManyRelation,
            modelClass: Calendar,
            join:{
                from: ['services.id', 'services.feedId'],
                to: ['calendars.serviceId', 'calendars.feedId']
            }
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join:{
                from: 'services.feedId',
                to: 'feeds.id'
            }
        }
    })
}