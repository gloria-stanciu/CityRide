import { Request, Response } from 'express'
import { Transfer } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Transfer.query().insert({
      fromStopId: req.body.fromStopId,
      tripId: req.body.tripId,
      toStopId: req.body.toStopId,
      feedId: req.body.feedId,
      transferType: req.body.transferType,
      minTransferTime: req.body.minTransferTime,
    })
    return res.status(200).send('Transfer created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
