import { Request, Response } from 'express'
import { Calendar } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const calendars = await Calendar.query()
    return res.status(200).send(calendars)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const calendar = await Calendar.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .first()
    if (calendar === undefined) return res.status(404).send()
    else return res.status(200).send(calendar)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
