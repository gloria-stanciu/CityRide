import { Model, Modifiers } from 'objection'
import Trip from './Trip'
import Agency from './Agency'
import Feed from './Feed'


export default class Routes extends Model {
    id!:string
    feedId!:string
    agencyId!:string
    shortName:string|null
    longName:string|null
    desc:string|null
    type:number|null
    url:string|null
    color:string|null
    textColor:string|null

    trip?:Trip
    agency?:Agency
    feed?:Feed

    static tableName='routes'

    static modifiers:Modifiers = {
        idColumn(){
            return ['id', 'feedId', 'agencyId']
        }
    }

    static jsonSchema = {
        type: 'object',
        required: ['id', 'feedId', 'agencyId'],

        properties: {
            id: { type: 'string' },
            feedId: { type: 'string' },
            agencyId: { type: 'string' },
            shortName: { type: 'string' },
            longName: { type: 'string' },
            desc: { type: 'string' },
            type: { 
                type: 'number',
                //https://gtfs.org/reference/static/#routestxt
                enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            url: {type: 'string'},
            color: {type: 'string'},
            textColor: { type: 'string' }
        },
    }

    static relationMappings = () => ({
        trip: {
            relation: Model.HasManyRelation,
            modelClass: Trip,
            join: {
                from: 'routes.id',
                to: 'trips.routeId'
            }
        },
        agency: {
            relation: Model.BelongsToOneRelation,
            modelClass: Agency,
            join:{
                from: 'routes.agencyId',
                to: 'agency.id'
            }
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join:{
                from: 'routes.feedId',
                to: 'feed.id'
            }
        },
    })
}