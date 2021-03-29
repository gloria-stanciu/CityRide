import { Request, Response } from 'express'
import { CalendarDates } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await CalendarDates.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
      serviceId: req.body.serviceId,
      dateTime: req.body.dateTime,
      exceptionType: req.body.exceptionType,
    })
    return res.status(200).send('Calendar dates created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
