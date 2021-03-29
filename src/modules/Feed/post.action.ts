import { Request, Response } from 'express'
import { Feed } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Feed.query().insert({
      id: req.body.id,
      publisherName: req.body.publisherName,
      publisherUrl: req.body.publisherUrl,
      lang: req.body.lang,
      version: req.body.version,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    })
    return res.status(200).send('Feed created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
}
export default create
