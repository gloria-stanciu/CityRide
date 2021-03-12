import { Model, Modifiers } from 'objection'
import Trip from './Trip'
import Feed from './Feed'
import ShapePoint from './ShapePoint'



export default class Shape extends Model {
    id!:string
    feedId!:string

    trip?:Trip
    feed?:Feed
    shapePoint?:ShapePoint

    static tableName='shapes'

    static modifiers:Modifiers = {
        idColumn(){
            return ['id', 'feedId']
        }
    }

    static relationMappings = () => ({
        trip: {
            relation: Model.HasManyRelation,
            modelClass: Trip,
            join: {
                from: 'shapes.id',
                to: 'trips.shapeId'
            }
        },
        shapePoint: {
            relation: Model.HasManyRelation,
            modelClass: ShapePoint,
            join:{
                from: 'shapes.id',
                to: 'shapePoints.shapeId'
            }
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join:{
                from: 'shapes.feedId',
                to: 'feed.id'
            }
        }
    })
}