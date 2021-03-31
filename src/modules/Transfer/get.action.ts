import { Request, Response } from 'express'
import { Transfer } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const transfers = await Transfer.query()
    return res.status(200).send(transfers)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    console.log(req.params)
    const transfer = await Transfer.query()
      .whereComposite(
        ['tripId', 'feedId', 'fromStopId'],
        [req.params.tripId, req.params.feedId, req.params.fromStopId]
      )
      .first()
    if (transfer === undefined) return res.status(404).send()
    else return res.status(200).send(transfer)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

export { getAll, getById }
