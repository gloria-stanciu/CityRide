import { Request, Response } from 'express'
import { Feed } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await Feed.query().where('id', req.params.id).del()
    return res.status(200).send('Feed deleted successfully')
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default remove
