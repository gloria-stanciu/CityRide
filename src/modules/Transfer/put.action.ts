import { Request, Response } from 'express'
import { Transfer } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await Transfer.query()
      .whereComposite(
        ['tripId', 'feedId', 'fromStopId'],
        [req.params.tripId, req.params.feedId, req.params.fromStopId]
      )
      .patch(req.body)
    return res.status(200).send('Transfer updated successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default update
