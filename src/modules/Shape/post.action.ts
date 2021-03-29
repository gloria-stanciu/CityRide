import { Request, Response } from 'express'
import { Shape } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Shape.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
    })
    return res.status(200).send('Shape created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
}
export default create
