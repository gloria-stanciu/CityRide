import { Request, Response } from 'express'
import { Stop } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const stops = await Stop.query()
    return res.status(200).send(stops)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const stop = await Stop.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .first()
    if (stop === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(stop)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
