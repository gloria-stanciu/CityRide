import { Model, Modifiers } from 'objection'
import StopTime from './StopTime'
import Transfer from './Transfer'
import Feed from './Feed'
import Trip from './Trip'

export default class Stop extends Model {
  id!: string
  feedId!: string
  code: string | null
  name: string | null
  desc: string | null
  lat!: string
  long!: string
  zoneId: number | null
  stopUrl: string | null
  locationType: number | null
  parentStation: string | null
  stopTimezone: Date | null
  wheelchairBoarding: number | null

  stopTime?: StopTime
  transferFrom?: Transfer
  transferTo?: Transfer
  feed?: Feed
  trip?: Trip

  static tableName = 'stops'

  static modifiers: Modifiers = {
    idPrimaryKey() {
      return ['id', 'feed_id']
    },
    defaultSelects(builder) {
      builder.select('id', 'name', 'stopSequence').orderBy('stopSequence')
    },
  }

  static jsonSchema = {
    type: 'object',
    required: ['id', 'feedId', 'lat', 'long'],

    properties: {
      id: { type: 'string' },
      feedId: { type: 'string' },
      code: { type: 'string' },
      name: { type: 'string' },
      desc: { type: 'string' },
      lat: { type: 'string' },
      long: { type: 'string' },
      zoneId: { type: 'number' },
      stopUrl: { type: 'string' },
      locationType: {
        type: 'number',
        enum: [0, 1, 2, 3, 4],
      },
      parentStation: { type: 'string' },
      stopTimezone: { type: 'string' },
      wheelchairBoarding: {
        type: 'number',
        enum: [0, 1, 2],
      },
    },
  }

  static relationMappings = () => ({
    stopTime: {
      relation: Model.HasManyRelation,
      modelClass: StopTime,
      join: {
        from: ['stops.id', 'stops.feedId'],
        to: ['stopTimes.stopId', 'stopTimes.feedId'],
      },
    },
    transferFrom: {
      relation: Model.HasManyRelation,
      modelClass: Transfer,
      join: {
        from: ['stops.id', 'stops.feedId'],
        to: ['transfers.fromStopId', 'transfers.feedId'],
      },
    },
    transferTo: {
      relation: Model.HasManyRelation,
      modelClass: Transfer,
      join: {
        from: ['stops.id', 'stops.feedId'],
        to: ['transfers.toStopId', 'transfers.feedId'],
      },
    },
    feed: {
      relation: Model.BelongsToOneRelation,
      modelClass: Feed,
      join: {
        from: 'stops.feedId',
        to: 'feed.id',
      },
    },
    trip: {
      relation: Model.ManyToManyRelation,
      modelClass: Trip,
      join: {
        from: 'stops.id',
        through: {
          from: 'stopTimes.stopId',
          to: 'stopTimes.tripId',
          extra: ['stopSequence'],
        },
        to: 'trips.id',
      },
    },
  })
}
