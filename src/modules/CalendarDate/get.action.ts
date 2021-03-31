import { Request, Response } from 'express'
import { CalendarDates } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const calendarDates = await CalendarDates.query()
    return res.status(200).send(calendarDates)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const calendarDate = await CalendarDates.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .first()
    if (calendarDate === undefined) return res.status(404).send()
    else return res.status(200).send(calendarDate)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
