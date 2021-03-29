import { Request, Response } from 'express'
import { Feed } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const feeds = await Feed.query()
    return res.status(200).send(feeds)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const feed = await Feed.query().findById(req.params.id)
    return res.status(200).send(feed)
  } catch (err) {
    res.status(500).send(err)
  }
}

export { getAll, getById }
