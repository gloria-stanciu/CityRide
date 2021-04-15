import { Model, Modifiers } from 'objection'
import Stop from './Stop'
import Trip from './Trip'
import Feed from './Feed'

export default class Transfer extends Model {
  fromStopId!: string
  toStopId!: string
  feedId!: string
  transferType: number | null
  minTransferTime: number | null

  stopFrom?: Stop
  stopTo?: Stop
  feed?: Feed

  static tableName = 'transfers'

  static get idColumn() {
    return ['feedId', 'toStopId', 'fromStopId']
  }

  static modifiers: Modifiers = {
    idPrimaryKey() {
      return ['feedId', 'toStopId', 'fromStopId']
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
    required: ['tripId', 'feedId', 'fromStopId'],

    properties: {
      fromStopId: { type: 'string' },
      toStopId: { type: 'string' },
      feedId: { type: 'string' },
      transferType: {
        type: 'number',
        enum: [0, 1, 2, 3],
      },
      minTransferTime: { type: 'number' },
    },
  }

  static relationMappings = () => ({
    stopFrom: {
      relation: Model.BelongsToOneRelation,
      modelClass: Stop,
      join: {
        from: ['transfers.fromStopId', 'transfers.feedId'],
        to: ['stops.id', 'stops.feedId'],
      },
    },
    stopTo: {
      relation: Model.BelongsToOneRelation,
      modelClass: Stop,
      join: {
        from: ['transfers.toStopId', 'transfers.feedId'],
        to: ['stops.id', 'stops.feedId'],
      },
    },
    feed: {
      relation: Model.BelongsToOneRelation,
      modelClass: Feed,
      join: {
        from: 'transfers.feedId',
        to: 'feeds.id',
      },
    },
  })
}
