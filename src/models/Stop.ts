import { Model, Modifiers } from 'objection'
import StopTime from './StopTime'
import Transfer from './Transfer'
import Feed from './Feed'


export default class Stop extends Model {
    id!:string
    feedId!:string
    code:string|null
    name:string|null
    desc:string|null
    lat!:string
    long!:string
    zoneId:number|null
    stopUrl:string|null
    locationType:number|null
    parentStation:string|null
    stopTimezone:string|null
    wheelchairBoarding:number|null

    stopTime?:StopTime
    transfer1?:Transfer
    transfer2?:Transfer
    feed?:Feed

    static tableName='stops'

    static modifiers:Modifiers = {
        idColumn(){
            return ['id', 'feed_id']
        }
    }
    
    static jsonSchema = {
        type: 'object',
        required: ['id', 'feedId', 'lat', 'long'],

        properties: {
            id: {type: 'string' },
            feedId: {type: 'string' },
            code: {type: 'string' },
            name: {type: 'string' },
            desc: {type: 'string' },
            lat: {type: 'string' },
            long: {type: 'string' },
            zoneId: {type: 'number' },
            stopUrl: {type: 'string' },
            locationType: {
                type: 'number',
                enum: [0, 1, 2, 3, 4]
            },
            parentStation: {type: 'string' },
            stopTimezone: {type: 'string' },
            wheelchairBoarding: {
                type: 'number',
                enum: [0, 1, 2]
            }
        },
    }

    static relationMappings = () => ({
        stopTime: {
            relation: Model.HasManyRelation,
            modelClass: StopTime,
            join: {
                from: 'stops.id',
                to: 'stopTimes.stopId'
            }
        },
        transfer1: {
            relation: Model.HasManyRelation,
            modelClass: Transfer,
            join: 
                {
                    from: 'stops.id',
                    to: 'transfers.fromStopId'
                },
        },
        transfer2: {
            relation: Model.HasManyRelation,
            modelClass: Transfer,
            join: 
                {
                    from: 'stops.id',
                    to: 'transfers.toStopId'
                },
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: {
                from: 'stops.feedId',
                to: 'feed.id'
            }
        },
    })
}