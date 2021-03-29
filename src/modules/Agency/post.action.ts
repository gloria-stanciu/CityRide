import { Request, Response } from 'express'
import { Agency } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Agency.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
      name: req.body.name,
      url: req.body.url,
      timezone: req.body.timezone,
      lang: req.body.lang,
      phone: req.body.phone,
      fareUrl: req.body.fareUrl,
      email: req.body.email,
    })
    return res.status(200).send('Agency created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
}
export default create
