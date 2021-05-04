import { Model, Modifiers } from 'objection'
import Transfer from './Transfer'
import Feed from './Feed'
import Route from './Route'
import Service from './Service'
import Shape from './Shape'
import StopTime from './StopTime'

export default class Trip extends Model {
  id!: string
  feedId!: string
  routeId: string | null
  serviceId: string | null
  headsign: string | null
  shortName: string | null
  directionId: number | null
  blockId: string | null
  shapeId: string | null
  wheelchairAccessible: number | null
  bikesAllowed: number | null
  isVisible: boolean

  feed?: Feed
  route?: Route
  service?: Service
  shape?: Shape
  stopTime?: StopTime

  static tableName = 'trips'

  static modifiers: Modifiers = {
    idPrimaryKey() {
      return ['id', 'feedId']
    },
    routeForeignKey() {
      return ['routeId', 'feedId']
    },
    serviceForeignKey() {
      return ['serviceId', 'feedId']
    },
    shapeForeignKey() {
      return ['shapeId', 'feedId']
    },
    defaultSelects(builder) {
      builder.select('id', 'wheelchairAccessible', 'bikesAllowed')
    },
  }

  //https://gtfs.org/reference/static/#tripstxt
  static jsonSchema = {
    type: 'object',
    required: ['id', 'feedId'],

    properties: {
      id: { type: 'string' },
      feedId: { type: 'string' },
      routeId: { type: 'string' },
      serviceId: { type: 'string' },
      headsign: { type: 'string' },
      shortName: { type: 'string' },
      directionId: {
        type: 'number',
        enum: [0, 1],
      },
      blockId: { type: 'string' },
      shapeId: { type: 'string' },
      wheelchairAccesible: {
        type: 'number',
        enum: [0, 1, 2],
      },
      bikesAllowed: {
        type: 'number',
        enum: [0, 1, 2],
      },
      isVisible: { type: 'boolean', default: true },
    },
  }

  static relationMappings = () => ({
    feed: {
      relation: Model.BelongsToOneRelation,
      modelClass: Feed,
      join: {
        from: 'trips.feedId',
        to: 'feeds.id',
      },
    },
    route: {
      relation: Model.BelongsToOneRelation,
      modelClass: Route,
      join: {
        from: ['trips.routeId', 'trips.feedId'],
        to: ['routes.id', 'routes.feedId'],
      },
    },
    service: {
      relation: Model.BelongsToOneRelation,
      modelClass: Service,
      join: {
        from: ['trips.serviceId', 'trips.feedId'],
        to: ['services.id', 'services.feedId'],
      },
    },
    shape: {
      relation: Model.BelongsToOneRelation,
      modelClass: Shape,
      join: {
        from: ['trips.shapeId', 'trips.feedId'],
        to: ['shapes.id', 'shapes.feedId'],
      },
    },
    stopTime: {
      relation: Model.HasManyRelation,
      modelClass: StopTime,
      join: {
        from: ['trips.id', 'trips.feedId'],
        to: ['stopTimes.tripId', 'stopTimes.feedId'],
      },
    },
  })
}
