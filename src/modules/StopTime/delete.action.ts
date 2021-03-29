import { Request, Response } from 'express'
import { StopTime } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await StopTime.query()
      .delete()
      .whereComposite(
        ['tripId', 'feedId', 'stopId'],
        [req.params.tripId, req.params.feedId, req.params.stopId]
      )
    return res.status(200).send('Stop time deleted successfully')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

export default remove
