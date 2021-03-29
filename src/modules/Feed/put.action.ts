import { Request, Response } from 'express'
import { Feed } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await Feed.query().where('id', req.params.id).update(req.body)
    return res.status(200).send('Feed updated successfully')
  } catch (err) {
    res.status(500).send(err)
  }
}

export default update
