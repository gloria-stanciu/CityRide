import { Request, Response } from 'express'
import { StopTime } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await StopTime.query()
      .whereComposite(
        ['tripId', 'feedId', 'stopId'],
        [req.params.tripId, req.params.feedId, req.params.stopId]
      )
      .patch(req.body)
    return res.status(200).send('Stop time updated successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default update
