import { Request, Response } from 'express'
import { Service } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await Service.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .patch(req.body)
    return res.status(200).send('Service updated successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default update
