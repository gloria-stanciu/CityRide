import { Model, Modifiers } from 'objection'
import Stop from './Stop'
import Trip from './Trip'
import Feed from './Feed'


export default class Transfer extends Model {
    fromStopId!:string
    tripId!:string
    toStopId!:string
    feedId!:string
    transferType:number|null
    minTransferTime:number|null

    stop1?:Stop
    stop2?:Stop
    trip?:Trip
    feed?:Feed

    static tableName='transfers'

    static modifiers:Modifiers = {
        idColumn(){
            return ['trip_id', 'feed_id', 'from_stop_id']
        }
    }

    // https://gtfs.org/reference/static/#transferstxt
    static jsonSchema = {
        type: 'object',
        required: ['trip_id', 'feed_id', 'from_stop_id'],

        properties: {
            fromStopId: {type: 'string' },
            tripId: {type: 'string' },
            toStopId: {type: 'string' },
            feedId: {type: 'string' },
            transferType: {
                type: 'number',
                enum: [0, 1, 2, 3]
            },
            minTransferTime: {type: 'number'},
        }
    }

    static relationMappings = () => ({
        stop1: {
            relation: Model.BelongsToOneRelation,
            modelClass: Stop,
            join: {
                from: 'transfers.fromStopId',
                to: 'stops.id'
            }
        },
        stop2: {
            relation: Model.BelongsToOneRelation,
            modelClass: Stop,
            join: 
                {
                    from: 'transfers.toStopId',
                    to: 'stop.id'
                },
        },
        trip: {
            relation: Model.BelongsToOneRelation,
            modelClass: Trip,
            join: 
                {
                    from: 'transfers.tripId',
                    to: 'trips.id'
                },
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: 
                {
                    from: 'transfers.feedId',
                    to: 'feed.id'
                },
        }
    })
}