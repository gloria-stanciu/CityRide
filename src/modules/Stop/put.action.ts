import { Request, Response } from 'express'
import { Stop } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await Stop.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .patch(req.body)
    return res.status(200).send('Stop updated successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default update
