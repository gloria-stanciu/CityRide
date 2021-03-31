import { Request, Response } from 'express'
import { Trip } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const trips = await Trip.query()
    return res.status(200).send(trips)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const trip = await Trip.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .first()
    if (trip === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(trip)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
