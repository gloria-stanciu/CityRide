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
        idColumn(){
            return ['id', 'feedId']
        }
    }

    static relationMappings = () => ({
        calendarDate: {
            relation: Model.HasManyRelation,
            modelClass: CalendarDate,
            join: {
                from: 'service.id',
                to: 'calendarDates.serviceId'
            }
        },
        trip: {
            relation: Model.HasManyRelation,
            modelClass: Trip,
            join:{
                from: 'service.id',
                to: 'trip.serviceId'
            }
        },
        calendar: {
            relation: Model.HasManyRelation,
            modelClass: Calendar,
            join:{
                from: 'service.id',
                to: 'calendar.serviceId'
            }
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join:{
                from: 'service.feedId',
                to: 'feed.id'
            }
        }
    })
}