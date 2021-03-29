import { Request, Response } from 'express'
import { Transfer } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await Transfer.query()
      .delete()
      .whereComposite(
        ['tripId', 'feedId', 'fromStopId'],
        [req.params.tripId, req.params.feedId, req.params.fromStopId]
      )
    return res.status(200).send('Transfer deleted successfully')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

export default remove
