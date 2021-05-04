import { Model, Modifiers } from 'objection'
import Shape from './Shape'

export default class ShapePoint extends Model {
  id: number | null
  shapeId: string | null
  feedId: string | null
  lat!: string
  long!: string
  sequence!: string
  shapeDistTraveled: string | null

  shape?: Shape

  static tableName = 'shapePoints'

  static modifiers: Modifiers = {
    shapeForeignKey() {
      return ['shapeId', 'feedId']
    },
    defaultSelects(builder) {
      builder.select('shapeId', 'lat', 'long')
    },
  }

  static relationMappings = () => ({
    shape: {
      relation: Model.BelongsToOneRelation,
      modelClass: Shape,
      join: {
        from: ['shapePoints.shapeId', 'shapePoints.feedId'],
        to: ['shapes.id', 'shapes.feedId'],
      },
    },
  })
}
