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

    stopFrom?:Stop
    stopTo?:Stop
    trip?:Trip
    feed?:Feed

    static tableName='transfers'

    static modifiers:Modifiers = {
        idPrimaryKey(){
            return ['trip_id', 'feed_id', 'from_stop_id']
        },
        tripForeignKey() {
            return ['tripId', 'feedId']
        },
        fromStopForeignKey() {
            return ['fromStopId', 'feedId']
        },
        toStopForeignKey() {
            return ['toStopId', 'feedId']
        },
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
        stopFrom: {
            relation: Model.BelongsToOneRelation,
            modelClass: Stop,
            join: {
                from: ['transfers.fromStopId', 'transfers.feedId'],
                to: ['stops.id', 'stops.feedId']
            }
        },
        stopTo: {
            relation: Model.BelongsToOneRelation,
            modelClass: Stop,
            join: 
                {
                    from: ['transfers.toStopId', 'transfers.feedId'],
                    to: ['stops.id', 'stops.feedId']
                },
        },
        trip: {
            relation: Model.BelongsToOneRelation,
            modelClass: Trip,
            join: 
                {
                    from: ['transfers.tripId', 'transfers.feedId'],
                    to: ['trips.id', 'trips.feedId']
                },
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: 
                {
                    from: 'transfers.feedId',
                    to: 'feeds.id'
                },
        }
    })
}