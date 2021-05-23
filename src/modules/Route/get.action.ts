import { Request, Response } from 'express'
import { Route, StopTime } from '../../models/index'
import { format, getDay, set } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { fn, raw } from 'objection'

interface RouteStop {
  stopId: string
  routeId: string
  stopName: string
  directionId: 0 | 1
  longName: string
  stopSequence: number
  shapeId: string
  shortName: string
  lat: string
  long: string
  type: number
}

interface Direction {
  shapeId: string
  stops: {
    id: string
    name: string
    sequence: number
    routeId: string
    lat: string
    long: string
  }[]
}

interface RoutesWithStops {
  id: string
  longName: string
  shortName: string
  outbound: Direction
  inbound: Direction
  type: number
}

async function getAll(req: Request<any, any, { type: string }>, res: Response) {
  try {
    const query = Route.knex()

    const stopsQuery = query
      .from('trips')
      .distinct<RouteStop[]>([
        'stops.id as stop_id',
        'routes.id as route_id',
        'stops.name as stop_name',
        'trips.direction_id',
        'routes.long_name',
        'routes.short_name',
        'trips.shape_id as shape_id',
        'stops.lat',
        'stops.long',
        'routes.type',
        query.raw('coalesce(stop_times.stop_sequence, 0) as stop_sequence'),
      ])
      .innerJoin('routes', 'trips.route_id', 'routes.id')
      .innerJoin('stop_times', 'stop_times.trip_id', 'trips.id')
      .innerJoin('stops', 'stops.id', 'stop_times.stop_id')
      .orderBy('stop_sequence')

    req.query.type
      ? stopsQuery.where('routes.type', req.query.type as string)
      : null

    const stops = await stopsQuery

    const routes = stops.reduce<RoutesWithStops[]>((result, stop) => {
      const index = result?.findIndex((r) => r.id === stop.routeId)

      const direction = stop.directionId === 1 ? 'inbound' : 'outbound'

      const thisStop = {
        id: stop.stopId,
        name: stop.stopName,
        sequence: stop.stopSequence,
        routeId: stop.routeId,
        lat: stop.lat,
        long: stop.long,
      }

      if (index !== -1) {
        if (result[index][direction]) {
          result[index][direction].stops.push(thisStop)
        } else {
          result[index][direction] = {
            shapeId: stop.shapeId,
            stops: [thisStop],
          }
        }
      } else {
        const nr = result.push({
          id: stop.routeId,
          longName: stop.longName,
          shortName: stop.shortName,
          type: stop.type,
          inbound: null,
          outbound: null,
        })

        result[nr - 1][direction] = {
          shapeId: stop.shapeId,
          stops: [thisStop],
        }
      }

      return result
    }, [])

    return res.status(200).send(routes)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const route = await Route.query()
      .whereComposite(
        ['id', 'feedId', 'agencyId'],
        [req.params.id, req.params.feedId, req.params.agencyId]
      )
      .first()
    if (route === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(route)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

async function getRouteTypes(req: Request, res: Response) {
  try {
    const route = await Route.query().distinctOn('type').select('type')
    if (route === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(route)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

async function getTimetable(req: Request, res: Response) {
  const weekDays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  try {
    const currentDateTime = req.query.time as string
    const date = utcToZonedTime(currentDateTime, 'Europe/Bucharest')

    const currentDay = getDay(date)

    const direction = req.query.direction as string

    const routeId = req.params.id

    const stopTimes = await StopTime.query()
      .distinct(
        'stopTimes.tripId',
        'stopTimes.arrivalTime',
        'stopTimes.departureTime',
        'stopTimes.stopId',
        raw('coalesce(stop_times.stop_sequence, 0)').as('stopSequence'),
        'stopTimes.shapeDistTraveled',
        'trips.serviceId',
        'trips.directionId',
        'calendars.startDate',
        'calendars.endDate',
        'stops.name',
        'stops.lat',
        'stops.long'
      )
      .innerJoin('trips', 'stopTimes.tripId', 'trips.id')
      .innerJoin('services', 'trips.serviceId', 'services.id')
      .innerJoin('calendars', 'services.id', 'calendars.serviceId')
      .innerJoin('stops', 'stopTimes.stopId', 'stops.id')
      .where('trips.routeId', routeId)
      .where('directionId', direction)
      .where(`calendars.${weekDays[currentDay]}`, 1)
      .orderBy('stopSequence')
      .orderByRaw('stop_times.arrival_time')

    const stopSequence = Array.from(
      new Set(stopTimes.map((obj) => obj.stopSequence))
    )

    const finalTimes: StopTime[] = []

    for (const stop of stopSequence) {
      const times = stopTimes.filter((obj) => obj.stopSequence === stop)

      for (const time of times) {
        const [h, m, s] = time.arrivalTime.split(':')
        const arrivalDateTime = set(date, {
          hours: +h,
          minutes: +m,
          seconds: +s,
        })
        if (arrivalDateTime >= date) {
          finalTimes.push(time)
          break
        }
      }
    }

    return res.status(200).send(finalTimes)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById, getRouteTypes, getTimetable }
