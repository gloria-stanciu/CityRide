import { Request, Response } from 'express'
import { Route } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await Route.query()
      .whereComposite(
        ['id', 'feedId', 'agencyId'],
        [req.params.id, req.params.feedId, req.params.agencyId]
      )
      .patch(req.body)
    return res.status(200).send('Route updated successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default update
