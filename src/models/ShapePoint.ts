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

    static tableName='shapes'

    static modifiers:Modifiers = {
        idColumn(){
            return 'id'
        }
    }

    static relationMappings = () => ({
        shape: {
            relation: Model.BelongsToOneRelation,
            modelClass: Shape,
            join: {
                from: 'shapePoints.shapeId',
                to: 'shapes.id'
            }
        }
    })
}