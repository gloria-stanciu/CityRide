import { getDay, isAfter, set } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { Request, Response } from 'express'
import { Route, Stop } from '../../models/index'

interface StopRoute {
  stopId: string
  stopLat: string
  stopLong: string
  stopName: string
  arrivalTime: string
  departureTime: string
  tripId: string
  directionId: 0 | 1
  shapeId: string
  routeId: string
  shortName: string
  startDate: string
  endDate: string
}

interface Direction {
  shapeId: string
  arrivalTime: string
  departureTime: string
  shortName: string
}

interface StopsWithRoutes {
  routeId: string
  stopId: string
  stopLat: string
  stopLong: string
  stopName: string
  startDate: string
  endDate: string
  tripId: string
  inbound: Direction[]
  outbound: Direction[]
}

async function getAll(req: Request, res: Response) {
  try {
    const stops = await Stop.query().select('id', 'name', 'lat', 'long')
    return res.status(200).send(stops)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const stop = await Stop.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .first()
    if (stop === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(stop)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

async function getRoutes(req: Request, res: Response) {
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

    const stopId = req.params.id

    const query = Route.knex()

    const routesQuery = query
      .from('routes')
      .distinct<StopRoute[]>(
        query.raw('stops.id as stop_id'),
        query.raw('stops.lat as stop_lat'),
        query.raw('stops.long as stop_long'),
        query.raw('stops.name as stop_name'),
        'stopTimes.arrivalTime',
        'stopTimes.departureTime',
        query.raw('trips.id as trip_id'),
        'trips.directionId',
        'trips.shapeId',
        query.raw('routes.id as route_id'),
        'routes.shortName',
        'calendars.startDate',
        'calendars.endDate'
      )
      .innerJoin('trips', 'routes.id', 'trips.routeId')
      .innerJoin('stopTimes', 'trips.id', 'stopTimes.tripId')
      .innerJoin('stops', 'stopTimes.stopId', 'stops.id')
      .innerJoin('services', 'trips.serviceId', 'services.id')
      .innerJoin('calendars', 'services.id', 'calendars.serviceId')
      .where('stops.id', stopId)
      .where(`calendars.${weekDays[currentDay]}`, 1)
      .orderByRaw('stop_times.arrival_time')

    const routes = await routesQuery

    const nextRoutes = Array.from(new Set(routes.map((obj) => obj.routeId)))

    const filteredRoutes: StopRoute[] = []

    for (const nextRoute of nextRoutes) {
      const times = routes.filter((obj) => obj.routeId === nextRoute)

      for (const time of times) {
        const [h, m, s] = time.arrivalTime.split(':')
        const arrivalDateTime = set(date, {
          hours: +h,
          minutes: +m,
          seconds: +s,
        })
        if (isAfter(arrivalDateTime, date)) {
          filteredRoutes.push(time)
        }
      }
    }

    const finalRoutes = filteredRoutes.reduce<StopsWithRoutes[]>(
      (result, route) => {
        const index = result?.findIndex((r) => r.routeId === route.routeId)

        const direction = route.directionId === 1 ? 'inbound' : 'outbound'

        const thisRoute = {
          shapeId: route.shapeId,
          arrivalTime: route.arrivalTime,
          departureTime: route.departureTime,
          shortName: route.shortName,
        }

        console.log(route.routeId)

        if (index !== -1) {
          if (result[index].routeId === route.routeId) {
            result[index][direction].push(thisRoute)
          } else {
            result.push({
              routeId: route.routeId,
              stopId: route.stopId,
              stopLat: route.stopLat,
              stopLong: route.stopLong,
              stopName: route.stopName,
              startDate: route.startDate,
              endDate: route.endDate,
              tripId: route.tripId,
              inbound: [],
              outbound: [],
            })
          }
        } else {
          const nr = result.push({
            routeId: route.routeId,
            stopId: route.stopId,
            stopLat: route.stopLat,
            stopLong: route.stopLong,
            stopName: route.stopName,
            startDate: route.startDate,
            endDate: route.endDate,
            tripId: route.tripId,
            inbound: [],
            outbound: [],
          })
          console.log(result[nr - 1])
          result[nr - 1][direction].push(thisRoute)
        }
        return result
      },
      []
    )

    return res.status(200).send(finalRoutes)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById, getRoutes }
