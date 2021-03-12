import { Model, Modifiers } from 'objection'
import Agency from './Agency'
import Route from './Route'
import Trip from './Trip'
import Shape from './Shape'
import Stop from './Stop'
import Calendar from './Calendar'
import StopTime from './StopTime'
import Transfer from './Transfer'


export default class Feed extends Model {
    id!:string
    publisherName:string|null
    publisherUrl:string|null
    lang:string|null
    version:string|null
    startDate:string|null
    endDate:string|null

    agency?:Agency
    route?:Route
    trip?:Trip
    shape?:Shape
    stop?:Stop
    calendar?:Calendar
    stopTime?:StopTime
    transfer?:Transfer

    static tableName='feed'

    static modifiers:Modifiers = {
        idColumn(){
            return 'id'
        }
    }

    static relationMappings = () => ({
        agency: {
            relation: Model.HasManyRelation,
            modelClass: Agency,
            join: {
                from: 'feed.id',
                to: 'agency.feedId'
            }
        },
        route: {
            relation: Model.HasManyRelation,
            modelClass: Route,
            join: {
                from: 'feed.id',
                to: 'routes.feedId'
            }
        },
        trip: {
            relation: Model.HasManyRelation,
            modelClass: Trip,
            join: {
                from: 'feed.id',
                to: 'trips.feedId'
            }
        },
        shape: {
            relation: Model.HasManyRelation,
            modelClass: Shape,
            join: {
                from: 'feed.id',
                to: 'shapes.feedId'
            }
        },
        stop: {
            relation: Model.HasManyRelation,
            modelClass: Stop,
            join: {
                from: 'feed.id',
                to: 'stops.feedId'
            }
        },
        calendar: {
            relation: Model.HasManyRelation,
            modelClass: Calendar,
            join: {
                from: 'feed.id',
                to: 'calendar.feedId'
            }
        },
        stopTime: {
            relation: Model.HasManyRelation,
            modelClass: StopTime,
            join: {
                from: 'feed.id',
                to: 'stopTimes.feedId'
            }
        },
        tarnsfer: {
            relation: Model.HasManyRelation,
            modelClass: Transfer,
            join: {
                from: 'feed.id',
                to: 'transfer.feedId'
            }
        },
    })
}