import { Request, Response } from 'express'
import { Service } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Service.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
    })
    return res.status(200).send('Service created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
}
export default create
