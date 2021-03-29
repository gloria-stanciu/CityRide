import { Request, Response } from 'express'
import { Calendar } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Calendar.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
      serviceId: req.body.serviceId,
      desc: req.body.desc,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    })
    return res.status(200).send('Calendar created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
