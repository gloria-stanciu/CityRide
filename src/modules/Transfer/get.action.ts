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
        ['feedId', 'toStopId', 'fromStopId'],
        [req.params.feedId, req.params.toStopId, req.params.fromStopId]
      )
      .first()
    if (transfer === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(transfer)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

async function getFromStopId(req: Request, res: Response) {
  try {
    const transfer = await Transfer.query()
      .where('feedId', req.params.feedId)
      .andWhere('fromStopId', req.params.fromStopId)
    if (transfer === undefined)
      return res.status(404).send({ message: 'Rows not found' })
    else return res.status(200).send(transfer)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

export { getAll, getById, getFromStopId }
