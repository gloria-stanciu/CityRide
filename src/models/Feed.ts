import { Model } from 'objection'
import Agency from './Agency'
import Route from './Route'
import Trip from './Trip'
import Shape from './Shape'
import Stop from './Stop'
import Calendar from './Calendar'
import StopTime from './StopTime'
import Transfer from './Transfer'

export default class Feeds extends Model {
  id!: string
  publisherName: string | null
  publisherUrl: string | null
  lang: string | null
  version: string | null
  startDate: string | null
  endDate: string | null

  agency?: Agency
  route?: Route
  trip?: Trip
  shape?: Shape
  stop?: Stop
  calendar?: Calendar
  stopTime?: StopTime
  transfer?: Transfer

  static tableName = 'feeds'

  static relationMappings = () => ({
    agency: {
      relation: Model.HasManyRelation,
      modelClass: Agency,
      join: {
        from: 'feeds.id',
        to: 'agencies.feedId',
      },
    },
    route: {
      relation: Model.HasManyRelation,
      modelClass: Route,
      join: {
        from: 'feeds.id',
        to: 'routes.feedId',
      },
    },
    trip: {
      relation: Model.HasManyRelation,
      modelClass: Trip,
      join: {
        from: 'feeds.id',
        to: 'trips.feedId',
      },
    },
    shape: {
      relation: Model.HasManyRelation,
      modelClass: Shape,
      join: {
        from: 'feeds.id',
        to: 'shapes.feedId',
      },
    },
    stop: {
      relation: Model.HasManyRelation,
      modelClass: Stop,
      join: {
        from: 'feeds.id',
        to: 'stops.feedId',
      },
    },
    calendar: {
      relation: Model.HasManyRelation,
      modelClass: Calendar,
      join: {
        from: 'feeds.id',
        to: 'calendars.feedId',
      },
    },
    stopTime: {
      relation: Model.HasManyRelation,
      modelClass: StopTime,
      join: {
        from: 'feeds.id',
        to: 'stopTimes.feedId',
      },
    },
    tarnsfer: {
      relation: Model.HasManyRelation,
      modelClass: Transfer,
      join: {
        from: 'feeds.id',
        to: 'transfers.feedId',
      },
    },
  })
}
