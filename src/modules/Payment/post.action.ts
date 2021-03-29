import { Request, Response } from 'express'
import { Payment } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Payment.query().insert({
      userId: req.body.userId,
      agencyId: req.body.agencyId,
      feedId: req.body.feedId,
      fare: req.body.fare,
      currencyId: req.body.currencyId,
      dateTime: req.body.date,
    })
    return res.status(200).send('Payment created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
}
export default create
