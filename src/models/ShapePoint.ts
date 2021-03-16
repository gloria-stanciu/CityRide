import { Model, Modifiers } from 'objection'
import Shape from './Shape'


export default class ShapePoint extends Model {
    id!:string
    shapeId:string|null
    lat!:string
    long!:string
    sequence!:string
    shape_dist_traveled:string|null

    shape?:Shape

    static tableName='shapePoints'

    static modifiers:Modifiers = {
        shapeForeignKey() {
            return ['shapeId', 'feedId']
        }
    }

    static relationMappings = () => ({
        shape: {
            relation: Model.BelongsToOneRelation,
            modelClass: Shape,
            join: {
                from: ['shapePoints.shapeId', 'shapePoints.feedId'],
                to: ['shapes.id', 'shapes.feedId']
            }
        }
    })
}