import { Request, Response } from 'express'
import { StopTime } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await StopTime.query().insert({
      tripId: req.body.tripId,
      feedId: req.body.feedId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      stopId: req.body.stopId,
      stopSequence: req.body.stopSequence,
      stopHeadsign: req.body.stopHeadsign,
      pickupType: req.body.pickupType,
      dropoffType: req.body.dropoffType,
      timepoint: req.body.timepoint,
      shapeDistTraveled: req.body.shapeDistTraveled,
    })
    return res.status(200).send('Stop time created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
