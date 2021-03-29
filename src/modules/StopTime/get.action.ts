import { Request, Response } from 'express'
import { StopTime } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const stopTimes = await StopTime.query()
    return res.status(200).send(stopTimes)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const stopTime = await StopTime.query()
      .whereComposite(
        ['tripId', 'feedId', 'stopId'],
        [req.params.tripId, req.params.feedId, req.params.stopId]
      )
      .first()
    return res.status(200).send(stopTime)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
