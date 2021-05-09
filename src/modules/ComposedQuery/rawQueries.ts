import { Request, Response } from 'express'
import { Agency, Route, StopTime, Trip } from '../../models/index'
import { utcToZonedTime } from 'date-fns-tz'
import { format } from 'date-fns'
import { raw, fn } from 'objection'

async function justRandomFunction(req: Request, res: Response) {
  try {
    const currentTime = '14:30:00' || format(new Date(), 'HH:mm:ss')

    const knex = StopTime.knex()
    const stopTimes = await StopTime.query()
      .with('intervals', (q) => {
        return q
          .from('stop_times')
          .select(
            knex.raw('min(arrival_time::time) AS earliest'),
            knex.raw('max(arrival_time::time) AS latest'),
            'tripId'
          )
          .groupBy('trip_id')
          .whereNot('arrival_time', 'like', '24%')
          .andWhereRaw('trip_id in (SELECT id FROM trips WHERE route_id = ?)', [
            req.params.route,
          ])
      })
      .with('result', (q) => {
        return q
          .from('intervals')
          .select('*')
          .whereRaw(`time '${currentTime}' BETWEEN earliest AND latest`)
      })
      .select(
        knex.raw('min(coalesce(stop_sequence, 0)) AS first'),
        knex.raw('max(stop_sequence) AS last'),
        'tripId'
      )
      .whereRaw('trip_id IN (SELECT trip_id FROM result)')
      .groupBy('tripId')
    return res.status(200).send(stopTimes)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

// const ends: number[] = Array.from(
//   // @ts-ignore
//   new Set(stopTimes.map((t) => t.last as number))
// )

// const routeEnds = await StopTime.query()
//   .whereIn(
//     'tripId',
//     stopTimes.map((t) => t.tripId)
//   )
//   .andWhereRaw(
//     `stop_sequence IS NULL OR stop_sequence IN (${ends.join(', ')})`
//   )
// const knex = StopTime.knex()
// const stopTimes = await knex
//   .with('intervals', (q) => {
//     return q
//       .from('stop_times')
//       .select(
//         knex.raw('min(arrival_time::time) AS earliest'),
//         knex.raw('max(arrival_time::time) AS latest'),
//         'tripId'
//       )
//       .groupBy('trip_id')
//       .whereNot('arrival_time', 'like', '24%')
//       .andWhereRaw('trip_id in (SELECT id FROM trips WHERE route_id = ?)', [
//         req.params.route,
//       ])
//   })
//   .with('result', (q) => {
//     return q
//       .from('intervals')
//       .select('*')
//       .whereRaw(`time '${currentTime}' BETWEEN earliest AND latest`)
//   })
//   .select(
//     knex.raw('min(coalesce(stop_sequence, 0)) AS first'),
//     knex.raw('max(stop_sequence) AS last'),
//     'trip_id'
//   )
//   .from('stop_times')
//   .whereRaw('trip_id IN (SELECT trip_id FROM result)')
//   .groupBy('trip_id')
