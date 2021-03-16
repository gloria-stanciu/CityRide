import { Model, Modifiers } from 'objection'
import Trip from './Trip'
import Feed from './Feed'
import ShapePoint from './ShapePoint'



export default class Shapes extends Model {
    id!:string
    feedId!:string

    trip?:Trip
    feed?:Feed
    shapePoint?:ShapePoint

    static tableName='shapes'

    static modifiers:Modifiers = {
        idPrimaryKey(){
            return ['id', 'feedId']
        }
    }

    static relationMappings = () => ({
        trip: {
            relation: Model.HasManyRelation,
            modelClass: Trip,
            join: {
                from: ['shapes.id', 'shapes.feedId'],
                to: ['trips.shapeId', 'trips.feedId']
            }
        },
        shapePoint: {
            relation: Model.HasManyRelation,
            modelClass: ShapePoint,
            join:{
                from: ['shapes.id', 'shapes.feedId'],
                to: ['shapePoints.shapeId', 'shapePoints.feedId']
            }
        },
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join:{
                from: 'shapes.feedId',
                to: 'feeds.id'
            }
        }
    })
}